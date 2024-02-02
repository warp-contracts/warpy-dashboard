import { getAddress } from 'ethers';

const CONTRACT_ID = 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU';

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

export const getAllTimeRanking = async (walletAddress: string | null) => {
  let address;
  if (walletAddress) {
    const users = (
      await fetch(
        `https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}&query=$.users`
      ).then((res) => res.json())
    ).result[0];
    address = getUserAddress(users, walletAddress);
  }

  const rankingResult = await fetch(
    `https://dre-warpy.warp.cc/warpy/user-ranking?contractId=${CONTRACT_ID}&limit=15${
      address ? `&userId=${address}` : ''
    }`
  ).then((res) => res.json());

  const ids = rankingResult.map((r: any) => r.user_id).join(',');
  const usernamesResponse = await fetch(
    `https://api-warpy.warp.cc/v1/usernames?ids=${ids}`
  );
  const usernamesResults = await usernamesResponse.json();
  let user: {
    rn: string;
    user_id: string;
    wallet_address: string;
    balance: string;
  } | null;
  let username: { id: string; handler: string };
  if (address && rankingResult.length == 16) {
    user = rankingResult.shift();
    username = usernamesResults
      .splice(
        usernamesResults.indexOf(
          usernamesResults.find(
            (u: { id: string; handle: string }) => u.id == user!!.user_id
          )
        ),
        1
      )
      .pop();
  } else {
    user = null;
  }

  const ranking = usernamesResults
    .map((u: any) => {
      const user = rankingResult.find((r: any) => r.user_id == u.id);
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

  let userRanking;
  if (user) {
    userRanking = {
      lp: user.rn,
      address: user.wallet_address,
      discordHandle: `@${username!!.handler}`,
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
  return ranking;
};

export const getSeasonRanking = async (
  seasonName: string,
  walletAddress: string | null
) => {
  const seasonRankingResponse = await fetch(
    `https://dre-warpy.warp.cc/warpy/season-ranking?contractId=${CONTRACT_ID}&seasonName=${seasonName}&page=1&limit=15)`
  );
  const seasonRankingResults = await seasonRankingResponse.json();
  const users = (
    await fetch(
      `https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}&query=$.users`
    ).then((res) => res.json())
  ).result[0];

  const ids = seasonRankingResults.ranking.map((r: any) => r.userId).join(',');

  const usernamesResponse = await fetch(
    `https://api-warpy.warp.cc/v1/usernames?ids=${ids}`
  );
  const usernamesResults = await usernamesResponse.json();
  const ranking = usernamesResults
    .map((u: any) => {
      const address = users[u.id];
      return {
        address,
        discordHandle: `@${u.handler}`,
        points: seasonRankingResults.ranking.find((r: any) => r.userId == u.id)
          .points,
        rewards: { points: '', nft: 'TBA' },
      };
    })
    .sort((a: any, b: any) => Number(b.points) - Number(a.points))
    .map((u: any, i: number) => {
      return {
        ...u,
        lp: i + 1,
      };
    });

  return ranking;
};

export const getRanking = async (props: {
  rankingType: 'allTime' | 'season';
  seasonName: string;
  walletAddress: string | null;
}) => {
  if (props.rankingType == 'allTime') {
    return await getAllTimeRanking(props.walletAddress);
  } else {
    return await getSeasonRanking(props.seasonName, props.walletAddress);
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
