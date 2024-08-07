import { openDB } from 'idb';

const CONTRACT_ID = 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU';
const RANKING_LENGTH = 15;

export const getUserId = async (walletAddress: string) => {
  return (
    await cachedOrFetch(`warpy_dashboard_user_id`, async () => {
      return await fetch(`https://dre-warpy.warp.cc/warpy/user-id?address=${walletAddress}`).then((res) => res.json());
    })
  )[0]?.key;
};

export const getBalance = async (userId: string) => {
  if (!userId) {
    return { balances: null, boosts: null };
  }

  const [seasons, boosts, balance, userRoles] = await Promise.all([
    await cachedOrFetch(`warpy_dashboard_user_roles`, async () => {
      return await fetch(`https://api-warpy.warp.cc/v1/userRoles?id=${userId}`).then((res) => res.json());
    }),
    await fetch(`https://dre-warpy.warp.cc/warpy/user-balance?userId=${userId}`).then((res) => res.json()),
    await cachedOrFetch(`warpy_dashboard_seasons_boosts`, async () => {
      return await fetch(
        `https://dre-warpy.warp.cc/warpy/seasons-boosts?timestamp=${Math.round(Date.now() / 1000)}`
      ).then((res) => res.json());
    }),
  ]).then(async ([r, b, s]) => {
    const seasons = s[0]?.seasons;
    const boosts = s[0]?.boosts;
    const balance = b[0]?.balance;
    const userRoles = r;
    return [seasons, boosts, balance, userRoles];
  });

  const seasonBoosts = Object.keys(seasons)
    .filter((s) => (seasons[s].role ? userRoles.includes(seasons[s].role) : true))
    .map((s) => ({ name: seasons[s].boost, value: boosts[seasons[s].boost] }));

  return { balance: balance || '0', boosts: seasonBoosts.length > 0 ? seasonBoosts : null };
};

export const userLatestRewards = async (userId: string) => {
  if (!userId) {
    return null;
  }

  const latestRewardsResponse = await fetch(
    `https://dre-warpy.warp.cc/warpy/user-last-rewards?contractId=${CONTRACT_ID}&userId=${userId}&limit=5`
  );
  const latestRewardsResults = await latestRewardsResponse.json();
  const latestRewards = latestRewardsResults.result.map((r: any) => {
    return {
      name: formatTimestamp(r.block_timestamp),
      value: r.points < 0 ? r.points.substring(1) : r.points,
      link: `https://sonar.warp.cc/#/app/interaction/${r.tx_id}?network=mainnet&dre=dreWarpy`,
      valueSymbol: r.points < 0 ? '/assets/minus.svg' : '/assets/plus.svg',
    };
  });
  return latestRewards;
};

const formatTimestamp = (timestamp: number) => {
  // Convert the UNIX timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JS
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

export const getRanking = async (props: { walletAddress: string | null }) => {
  const { walletAddress } = props;

  const rankingResult = await cachedOrFetch(`warpy_dashboard_ranking_allTime`, async () => {
    return await fetch(
      `https://dre-warpy.warp.cc/warpy/user-ranking?${
        walletAddress ? `userId=${walletAddress}&` : ''
      }contractId=${CONTRACT_ID}&limit=15`
    ).then((res) => res.json());
  });

  const ids = rankingResult.map((r: any) => r.user_id);

  const idToRoles = (
    await fetch('https://api-warpy.warp.cc/v1/usersRoles', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    }).then((res) => res.json())
  ).id_to_roles;

  const usernamesResults = await cachedOrFetch(`warpy_dashboard_ranking_usernames`, async () => {
    return await fetch(`https://api-warpy.warp.cc/v1/usernames?ids=${ids.join(',')}`).then((res) => res.json());
  });

  let user: {
    rn: string;
    user_id: string;
    wallet_address: string;
    balance: string;
  } | null;

  if (walletAddress && rankingResult.length == RANKING_LENGTH + 1) {
    user = rankingResult.shift();
  } else {
    user = null;
  }

  const ranking = formatRanking(usernamesResults, idToRoles, rankingResult)!!;

  let userRanking;
  if (user) {
    userRanking = {
      lp: user.rn,
      address: user.wallet_address,
      discordHandle: `@${
        usernamesResults.find((u: { id: string; handler: string }) => u.id == user!!.user_id).handler
      }`,
      points: formatPoints(user.balance),
      roles: idToRoles[user.user_id].length,
    };
  } else {
    userRanking = null;
  }

  if (userRanking) {
    return [userRanking].concat(ranking);
  } else {
    return ranking;
  }
};

export const countdown = (timestamp: number) => {
  const now = new Date().getTime();
  const countDownDate = new Date(timestamp).getTime() * 1000;
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
};

const cachedOrFetch = async (name: string, fetchFunc: any) => {
  const db = await openDB(name, 1, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      if (!db.objectStoreNames.contains(name)) {
        const objectStore = db.createObjectStore(name, { keyPath: 'id' });
        objectStore.createIndex('name', 'name', { unique: true });
      }
    },
  });

  let tx = db.transaction(name, 'readwrite');
  let store = tx.objectStore(name);
  const value = await store.get('timestamp');
  if (!value || Date.now() > value.data + 300000) {
    await tx.done;
    const result = await fetchFunc();
    tx = db.transaction(name, 'readwrite');
    store = tx.objectStore(name);
    const data = [
      { id: 'timestamp', data: Date.now() },
      { id: 'data', data: result },
    ];
    for (let d of data) {
      await store.put(d);
    }
    await tx.done;
    return result;
  } else {
    const result = (await store.get('data')).data;
    await tx.done;
    return result;
  }
};

const formatRanking = (
  usernames: { id: string; handler: string }[],
  idToRoles: { [id: string]: string[] },
  rankingResult: {
    user_id: string;
    rn: string;
    balance: string;
    wallet_address: string;
  }[]
) => {
  let ranking = usernames
    .map((u: any) => {
      const user = rankingResult.find((r: any) => r.user_id == u.id);
      if (!user) {
        return;
      }
      const points = user.balance;
      const address = user.wallet_address;
      return {
        lp: user.rn,
        address: address.substr(0, 3) + '...' + address.substr(address.length - 3),
        discordHandle: `@${u.handler}`,
        points: formatPoints(points),
        roles: idToRoles[u.id].length,
      };
    })
    .sort((a: any, b: any) => a.lp - b.lp);

  ranking = ranking.filter((r: any) => !!r);
  return ranking;
};

const formatPoints = (points: string) => {
  return Math.abs(Number(points)) >= 1.0e9
    ? Math.round((Math.abs(Number(points)) / 1.0e9) * 10) / 10 + 'B'
    : Math.abs(Number(points)) >= 1.0e6
    ? Math.round((Math.abs(Number(points)) / 1.0e6) * 10) / 10 + 'M'
    : Math.abs(Number(points));
};
