import { Component, createEffect, createResource, createSignal } from 'solid-js';
import Header from './layouts/Header/Header';
import './App.scss';
import Main from './layouts/Main/Main';
import { getBalance, userLatestRewards, getRanking, getUserId } from './utils';
import detectEthereumProvider from '@metamask/detect-provider';
import ActionModal from './components/ActionModal/ActionModal';
import { getAddress } from 'ethers';

export const METAMASK_ADDRESS_KEY = 'warpy_dashboard_wallet';
const [walletAddress, setWalletAddress] = createSignal(localStorage.getItem(METAMASK_ADDRESS_KEY) || null);
const [shouldFetch, setShouldFetch] = createSignal(false);
const [registered, setRegistered] = createSignal(true);
const [userId, { mutate: mutateUserId }] = createResource(
  () => ({
    walletAddress: walletAddress(),
    shouldFetch: shouldFetch(),
    setRegistered: setRegistered,
  }),
  getUserId
);
const [loadingWalletAddress, setLoadingWalletAddress] = createSignal(false);
const [rsg, { mutate: mutateRsg }] = createResource(
  () => ({
    userId: userId(),
    shouldFetch: shouldFetch(),
  }),
  getBalance
);
const [rewards, { mutate: mutateRewards }] = createResource(
  () => ({
    userId: userId(),
    shouldFetch: shouldFetch(),
  }),
  userLatestRewards
);
const [ranking, { mutate: mutateRanking }] = createResource(
  () => ({
    walletAddress: walletAddress(),
    shouldFetch: shouldFetch(),
    userId: userId(),
  }),
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

const [showIntroModal, setShowIntroModal] = createSignal(false);
createEffect(() => {
  setShouldFetch(true);
  mutateRsg();
  mutateRewards();
  mutateRanking();
}, [userId()]);

createEffect(() => {
  if (!registered() && walletAddress() && !userId()) {
    setShowIntroModal(true);
  }
}, [walletAddress()]);

export const connect = async () => {
  setLoadingWalletAddress(true);
  const provider = await detectEthereumProvider();
  if (provider) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((err: any) => {
      if (err.code === 4001) {
        handleModalOpen('Please connect to Metamask!');
        mutateUserId();
        setLoadingWalletAddress(false);
        return;
      } else {
        console.error(err);
        handleModalOpen('Please connect to Metamask!');
        mutateUserId();
        setLoadingWalletAddress(false);
      }
    });
    const address = getAddress(accounts[0]);
    setWalletAddress(address);
    localStorage.setItem(METAMASK_ADDRESS_KEY, address);
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    mutateUserId();
    setLoadingWalletAddress(false);
  } else {
    handleModalOpen('Please install MetaMask!');
    mutateUserId();
    setLoadingWalletAddress(false);
  }
};

const disconnect = () => {
  setRegistered(true);
  setWalletAddress(null);
  localStorage.removeItem(METAMASK_ADDRESS_KEY);
  mutateUserId();
};

function handleAccountsChanged(accounts) {
  setRegistered(true);
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== walletAddress()) {
    setWalletAddress(getAddress(accounts[0]));
    localStorage.setItem(METAMASK_ADDRESS_KEY, getAddress(accounts[0]));
    mutateUserId();
  }
}

const App: Component = () => {
  return (
    <>
      <ActionModal handleCloseModal={handleCloseModal} showModal={showModal()} modalTitle="Action required">
        {modalText()}
      </ActionModal>
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
        walletAddress={walletAddress()}
        timestamp={timestamp}
        loadingWalletAddress={loadingWalletAddress()}
        showIntroModal={showIntroModal}
        setShowIntroModal={setShowIntroModal}
      />
    </>
  );
};

export default App;
