import { getAddress } from 'ethers';

const CONTRACT_ID = 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU';
export const stateFromDre = async () => {
  const response = await fetch(`https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}`);
  const results = await response.json();
  return results.state;
};

export const queryDre = async (walletAddress: string) => {
  const addressChecksum = getAddress(walletAddress);
  const response = await fetch(`https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}`);
  const results = await response.json();

  const gwAliveResponse = await fetch(`https://gw.warp.cc/gateway/gcp/alive`);
  const gwAliveResult = await gwAliveResponse.json();
  const currentBlockHeight = gwAliveResult.db.l1_last_interaction_height;

  const arweaveBlockResponse = await fetch(`https://arweave.net/block/height/${currentBlockHeight}`);
  const arweaveBlockResult = await arweaveBlockResponse.json();
  const currentBlockTimestamp = arweaveBlockResult.timestamp;

  const state = results.state;
  const balance = state.balances[addressChecksum];
  const currentSeasons = Object.keys(state.seasons).filter((s) => {
    return (
      state.seasons[s].from < state.seasons[s].to &&
      state.seasons[s].from <= currentBlockTimestamp &&
      state.seasons[s].to >= currentBlockTimestamp
    );
  });
  const boosts = currentSeasons.map((s) => {
    console.log(state.seasons[s]);
    return { name: s, value: state.boosts[state.seasons[s].boost] };
  });
  return { balance, boosts };
};

export const userLatestRewards = async (walletAddress: string) => {
  const contractStateResponse = await fetch(`https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}`);
  const contractStateResults = await contractStateResponse.json();
  const users = contractStateResults.state.users;
  const addressChecksum = getAddress(walletAddress);
  const userId = Object.keys(users).find((u) => users[u] == addressChecksum);
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

export const getAllTimeRanking = async () => {
  const response = await fetch(`https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}`);
  console.log(response);
  const results = await response.json();
  const balances = results.state.balances;
  const balancesArray: [string, number][] = Object.entries(balances);
  const balancesArraySorted = balancesArray.sort((a, b) => Number(b[1]) - Number(a[1]));
  const balancesArraySortedSliced = balancesArraySorted.slice(0, 15);
  const ids = balancesArraySortedSliced
    .map((b) => Object.keys(results.state.users).find((k) => results.state.users[k] == b[0]))
    .join(',');

  const usernamesResponse = await fetch(`https://api-warpy.warp.cc/v1/usernames?ids=${ids}`);
  const usernamesResults = await usernamesResponse.json();
  const ranking = usernamesResults
    .map((u: any) => {
      const address = results.state.users[u.id];
      return {
        address: address.substr(0, 3) + '...' + address.substr(address.length - 3),
        discordHandle: `@${u.handler}`,
        points: balancesArraySortedSliced.find((b) => b[0] == address)?.[1],
        rewards: { points: '', nft: 'TBA' },
      };
    })
    .sort((a: any, b: any) => Number(b.points) - Number(a.points));
  return ranking;
};

export const getSeasonRanking = async (seasonName: string) => {
  const seasonRankingResponse = await fetch(
    `https://dre-warpy.warp.cc/warpy/season-ranking?contractId=${CONTRACT_ID}&seasonName=${seasonName}&page=1&limit=15)`
  );
  const seasonRankingResults = await seasonRankingResponse.json();
  const users = (
    await fetch(`https://dre-warpy.warp.cc/contract?id=${CONTRACT_ID}&query=$.users`).then((res) => res.json())
  ).result[0];

  const ids = seasonRankingResults.ranking.map((r: any) => r.userId).join(',');

  const usernamesResponse = await fetch(`https://api-warpy.warp.cc/v1/usernames?ids=${ids}`);
  const usernamesResults = await usernamesResponse.json();
  const ranking = usernamesResults
    .map((u: any) => {
      const address = users[u.id];
      return {
        address: address.substr(0, 3) + '...' + address.substr(address.length - 3),
        discordHandle: `@${u.handler}`,
        points: seasonRankingResults.ranking.find((r: any) => r.userId == u.id).points,
        rewards: { points: '', nft: 'TBA' },
      };
    })
    .sort((a: any, b: any) => Number(b.points) - Number(a.points));

  return ranking;
};

export const getRanking = async (props: { rankingType: 'allTime' | 'season'; seasonName: string }) => {
  if (props.rankingType == 'allTime') {
    return await getAllTimeRanking();
  } else {
    return await getSeasonRanking(props.seasonName);
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
