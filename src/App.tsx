import { Component, createEffect, createResource, createSignal } from 'solid-js';
import Header from './layouts/Header/Header';
import './App.scss';
import Main from './layouts/Main/Main';
import { getBalance, userLatestRewards, getRanking, getUserId } from './utils';
import ActionModal from './components/ActionModal/ActionModal';
import { modal } from './walletConfig';

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

modal.subscribeEvents((event) => {
  switch (event?.data?.event) {
    case 'CONNECT_SUCCESS':
    case 'INITIALIZE': {
      setRegistered(true);
      const address = modal.getAddress();
      if (address) {
        setWalletAddress(address);
      }
      break;
    }
    case 'DISCONNECT_SUCCESS': {
      setRegistered(true);
      setWalletAddress(null);
      localStorage.removeItem(METAMASK_ADDRESS_KEY);
      mutateUserId();
      break;
    }
  }
});

const App: Component = () => {
  return (
    <>
      <ActionModal handleCloseModal={handleCloseModal} showModal={showModal()} modalTitle="Action required">
        {modalText()}
      </ActionModal>
      <Header walletAddress={walletAddress()} timestamp={timestamp} />
      <Main
        rewards={rewards()}
        rsg={rsg()?.balance}
        userRewardsLoading={rsg.loading}
        boosts={rsg()?.boosts}
        ranking={ranking()}
        loading={ranking.loading}
        walletAddress={walletAddress()}
        timestamp={timestamp}
        showIntroModal={showIntroModal}
        setShowIntroModal={setShowIntroModal}
      />
    </>
  );
};

export default App;
