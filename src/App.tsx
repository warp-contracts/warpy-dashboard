import { Component, createResource, createSignal } from 'solid-js';
import Header from './layouts/Header/Header';
import './App.scss';
import Main from './layouts/Main/Main';
import { getBalance, userLatestRewards, getRanking } from './utils';
import detectEthereumProvider from '@metamask/detect-provider';
import ActionModal from './components/ActionModal/ActionModal';
import { getAddress } from 'ethers';

export const METAMASK_ADDRESS_KEY = 'warpy_dashboard_wallet';
const [walletAddress, setWalletAddress] = createSignal(localStorage.getItem(METAMASK_ADDRESS_KEY) || null);
const [loadingWalletAddress, setLoadingWalletAddress] = createSignal(false);
const [rankingType, setRankingType] = createSignal<'allTime' | 'season'>('allTime');
const [rsg, { mutate: mutateRsg }] = createResource(walletAddress, getBalance);
const [rewards, { mutate: mutateRewards }] = createResource(walletAddress, userLatestRewards);
const [ranking] = createResource(
  () => ({ rankingType: rankingType(), seasonName: 'warp', walletAddress: walletAddress() }),
  getRanking
);
const [showModal, setShowModal] = createSignal(false);
const [modalText, setModalText] = createSignal('');
const handleModalOpen = (modalText: string) => {
  setModalText(modalText);
  setShowModal(true);
};
const handleCloseModal = () => setShowModal(false);
const timestamp = null;

const radios = [
  { name: 'All Time', value: 'allTime' },
  { name: 'Season', value: 'season' },
];

export const connect = async () => {
  setLoadingWalletAddress(true);
  const provider = await detectEthereumProvider();
  if (provider) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((err: any) => {
      if (err.code === 4001) {
        handleModalOpen('Please connect to Metamask!');
        setLoadingWalletAddress(false);
        return;
      } else {
        console.error(err);
        handleModalOpen('Please connect to Metamask!');
        setLoadingWalletAddress(false);
      }
    });
    const address = getAddress(accounts[0]);
    setWalletAddress(address);
    localStorage.setItem(METAMASK_ADDRESS_KEY, address);
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    setLoadingWalletAddress(false);
  } else {
    handleModalOpen('Please install MetaMask!');
    setLoadingWalletAddress(false);
  }
};

const disconnect = () => {
  setWalletAddress(null);
  localStorage.removeItem(METAMASK_ADDRESS_KEY);
  mutateRsg();
  mutateRewards();
};

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== walletAddress()) {
    setWalletAddress(getAddress(accounts[0]));
    localStorage.setItem(METAMASK_ADDRESS_KEY, getAddress(accounts[0]));
  }
}

const App: Component = () => {
  return (
    <>
      <ActionModal handleCloseModal={handleCloseModal} showModal={showModal()} modalText={modalText()} />
      <Header
        walletAddress={walletAddress()}
        setWalletAddress={setWalletAddress}
        connect={connect}
        disconnect={disconnect}
        timestamp={timestamp}
        loadingWalletAddress={loadingWalletAddress()}
      />
      <Main
        rewards={rewards()}
        rsg={rsg()?.balance}
        userRewardsLoading={rsg.loading}
        boosts={rsg()?.boosts}
        connect={connect}
        disconnect={disconnect}
        ranking={ranking()}
        loading={ranking.loading}
        radios={radios}
        setRadioValue={setRankingType}
        radioValue={rankingType}
        walletAddress={walletAddress()}
        timestamp={timestamp}
        loadingWalletAddress={loadingWalletAddress()}
      />
    </>
  );
};

export default App;
