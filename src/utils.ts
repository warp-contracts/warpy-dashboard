import { getAddress } from 'ethers';

const CONTRACT_ID = 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU';
const SEASON_1_TIMESTAMP = 1705288536;
// 1711029600;

const cached: { [key: string]: { timestamp: number; data: any } } = {};

export const getBalance = async (walletAddress: string) => {
  const state = (
    await fetch(`https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}`).then(
      (res) => res.json()
    )
  ).state;

  const address = getUserAddress(state.users, walletAddress);
  if (!address) {
    return { balances: null, boosts: null };
  }
  const userId = Object.keys(state.users).find(
    (u) => state.users[u] == address
  );
  if (!userId) {
    return { balances: null, boosts: null };
  }
  const currentBlockHeight = (
    await fetch(`https://gw.warp.cc/gateway/gcp/alive`).then((res) =>
      res.json()
    )
  ).db.l1_last_interaction_height;

  const currentBlockTimestamp = (
    await fetch(`https://arweave.net/block/height/${currentBlockHeight}`).then(
      (res) => res.json()
    )
  ).timestamp;

  const userRoles = await fetch(
    `https://api-warpy.warp.cc/v1/userRoles?id=${userId}`
  ).then((res) => res.json());

  const balance = state.balances[address];
  const currentSeasons = Object.keys(state.seasons).filter((s) => {
    return (
      state.seasons[s].from < state.seasons[s].to &&
      state.seasons[s].from <= currentBlockTimestamp &&
      state.seasons[s].to >= currentBlockTimestamp &&
      (state.seasons[s].role ? userRoles.includes(state.seasons[s].role) : true)
    );
  });
  const seasonBoosts = currentSeasons.map((s) => {
    return {
      name: state.seasons[s].boost,
      value: state.boosts[state.seasons[s].boost],
    };
  });

  const userBoosts = state.counter[userId]
    ? state.counter[userId].boosts.map((b: any) => {
        return { name: b, value: state.boosts[b] };
      })
    : [];
  const boosts = seasonBoosts.concat(userBoosts);

  return { balance: balance || '0', boosts: boosts.length > 0 ? boosts : null };
};

export const userLatestRewards = async (walletAddress: string) => {
  const users = (
    await fetch(
      `https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}&query=$.users`
    ).then((res) => res.json())
  ).result[0];
  const addressChecksum = getAddress(walletAddress);
  const userId = Object.keys(users).find(
    (u) =>
      users[u] == addressChecksum ||
      users[u] == walletAddress ||
      users[u] == walletAddress.toLowerCase()
  );
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

export const getRanking = async (props: {
  walletAddress: string | null;
  rankingType: string;
}) => {
  const { walletAddress, rankingType } = props;
  let address;
  if (walletAddress) {
    const users = (
      await cachedOrFetch(
        `warpy_dashboard_ranking_users_${rankingType}`,
        async () => {
          return await fetch(
            `https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}&query=$.users`
          ).then((res) => res.json());
        }
      )
    ).result[0];

    address = getUserAddress(users, walletAddress);
  }

  const rankingResult = await fetch(
    `https://dre-warpy.warp.cc/warpy/${
      rankingType == 'allTime'
        ? `user-ranking?${address ? `userId=${address}&` : ''}`
        : `season-ranking?from=${SEASON_1_TIMESTAMP}&${
            address ? `&address=${address}&` : ''
          }`
    }contractId=${CONTRACT_ID}&limit=15`
  ).then((res) => res.json());

  const ids = rankingResult.map((r: any) => r.user_id).join(',');
  const usernamesResults = await cachedOrFetch(
    `warpy_dashboard_ranking_usernames_${rankingType}`,
    async () => {
      return await fetch(
        `https://api-warpy.warp.cc/v1/usernames?ids=${ids}`
      ).then((res) => res.json());
    }
  );

  let user: {
    rn: string;
    user_id: string;
    wallet_address: string;
    balance: string;
  } | null;

  if (address && rankingResult.length == 16) {
    user = rankingResult.shift();
  } else {
    user = null;
  }

  const ranking = formatRanking(usernamesResults, rankingResult)!!;

  let userRanking;
  if (user) {
    userRanking = {
      lp: user.rn,
      address: user.wallet_address,
      discordHandle: `@${
        usernamesResults.find(
          (u: { id: string; handler: string }) => u.id == user!!.user_id
        ).handler
      }`,
      points: user.balance,
      rewards: { points: '', nft: 'TBA' },
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
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
};

const getUserAddress = (users: any, address: string) => {
  const addressChecksum = getAddress(address);
  const usersValues = Object.values(users);
  const userAddress =
    usersValues.indexOf(addressChecksum) > -1
      ? addressChecksum
      : usersValues.indexOf(address) > -1
      ? address
      : usersValues.indexOf(address.toLowerCase()) > -1
      ? address.toLowerCase()
      : null;

  return userAddress;
};

const cachedOrFetch = async (name: string, fetchFunc: any) => {
  const cached = localStorage.getItem(name);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() < parsed.timestamp + 5 * 300000) {
      return parsed.data;
    }
  }

  const result = await fetchFunc();
  localStorage.setItem(
    name,
    JSON.stringify({
      timestamp: Date.now(),
      data: result,
    })
  );
  return result;
};

const formatRanking = (
  usernames: { id: string; handler: string }[],
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
        address:
          address.substr(0, 3) + '...' + address.substr(address.length - 3),
        discordHandle: `@${u.handler}`,
        points,
        rewards: { points: '', nft: 'TBA' },
      };
    })
    .sort((a: any, b: any) => a.lp - b.lp);

  ranking = ranking.filter((r: any) => !!r);
  return ranking;
};
