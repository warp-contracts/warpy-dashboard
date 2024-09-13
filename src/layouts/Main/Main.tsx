import { Accessor, Component, Setter, Show, createResource, createSignal } from 'solid-js';
import './Main.scss';
import { Col, Container, Modal, Row } from 'solid-bootstrap';
import Card from '../../components/Card/Card';
import ButtonCard from '../../components/ButtonCard/ButtonCard';
import RowTable from '../../components/RowTable/RowTable';
import Footer from '../Footer/Footer';
import Button from '../../components/Button/Button';
import { connect } from '../../App';
import ButtonCardWrapper from '../../components/ButtonCardWrapper/ButtonCardWrapper';
import IntroModal from '../IntroModal/IntroModal';

interface MainProps {
  rsg: number;
  boosts: { name: string; value: any }[] | undefined | null;
  rewards: { name: string; value: string }[] | undefined | null;
  connect: () => void;
  disconnect: () => void;
  ranking: {
    lp: number;
    address: string;
    discordHandle: string;
    points: number;
    rewards: { points: string; nft: string };
  }[];
  loading: boolean;
  walletAddress: string | null;
  userRewardsLoading: boolean;
  timestamp: string | null;
  loadingWalletAddress: boolean;
  showIntroModal: Accessor<boolean>;
  setShowIntroModal: Setter<boolean>;
}

const phantomRewards = [
  { name: '28.10.23, 14:15', value: '30' },
  { name: '28.10.23, 10:12', value: '124' },
  { name: '27.10.23, 08:56', value: '17' },
  { name: '27.10.23, 08:56', value: '17' },
];

const phantomBoosts = [
  { name: 'Early Something', value: '2' },
  { name: 'GR15 Rank', value: '1.5' },
  { name: 'Season 0 NFT', value: '4' },
  { name: 'Season 1 NFT️', value: '1.2' },
];

const phantomRsg = 1570;

const Main: Component<MainProps> = (props) => {
  return (
    <Container class="main justify-content-center" fluid>
      <IntroModal show={props.showIntroModal} handleClose={() => props.setShowIntroModal(false)} />
      <Row class="justify-content-center m-0">
        <Col md={{ span: 5 }} lg={{ span: 4 }} class="position-relative">
          <Card
            header="Your RSG"
            tableName="Latest rewards"
            score={!props.walletAddress || props.userRewardsLoading ? phantomRsg : props.rsg}
            scoreIcon="/assets/diamond.svg"
            tableIcon="/assets/link.svg"
            valueIcon="/assets/diamond.svg"
            values={!props.walletAddress || props.userRewardsLoading ? phantomRewards : props.rewards}
            valueSymbol="/assets/plus.svg"
            blurred={!props.walletAddress || props.userRewardsLoading}
          ></Card>
          <Show when={!props.walletAddress}>
            <div class="main__button-on-blur">
              <Button color="primary" handleClick={connect} loading={props.loadingWalletAddress}>
                Connect wallet
              </Button>
            </div>
          </Show>
        </Col>
        <Col md={{ span: 5 }} lg={{ span: 4 }} class="position-relative mt-4 mt-md-0">
          <Card
            header="Roles table"
            values={!props.walletAddress || props.userRewardsLoading ? phantomBoosts : props.boosts}
            tableIcon="/assets/boost.svg"
            valueSymbol="/assets/cross.svg"
            blurred={!props.walletAddress || props.userRewardsLoading}
          />
          <Show when={!props.walletAddress}>
            <div class="main__button-on-blur">
              <Button color="primary" handleClick={connect} loading={props.loadingWalletAddress}>
                Connect wallet
              </Button>
            </div>
          </Show>
        </Col>
      </Row>
      <Row class="justify-content-center mt-4">
        <Col lg={{ span: 8 }} md={{ span: 10 }} class="main__slider__bg">
          <ButtonCardWrapper withSlider={true}>
            <div class="slide slide1">
              <ButtonCard
                title="Pfp Campaign"
                buttonTitle="Participate"
                link="https://x.com/redstone_defi/status/1833868330039644161"
                subtitle=""
                backgroundImage="/assets/pfp.png"
              ></ButtonCard>
            </div>
            <div class="slide slide2">
              <ButtonCard
                title="Weekly Best Content"
                buttonTitle="Participate"
                link="https://discord.com/channels/786251205008949258/1206919012588585001/1206919012588585001"
                subtitle=""
                backgroundImage="/assets/background_weekly.png"
              ></ButtonCard>
            </div>
            <div class="slide slide3">
              <ButtonCard
                title="Hall of Fame"
                buttonTitle="Participate"
                link="https://discord.com/channels/786251205008949258/1140651744053956608/1140651744053956608"
                subtitle=""
                backgroundImage="/assets/background_hof.png"
              ></ButtonCard>
            </div>
            <div class="slide slide4">
              <ButtonCard
                title="RedStone Miners"
                buttonTitle="Participate"
                link="https://redstone-finance.notion.site/RedStone-Miners-Ambassador-Program-0b5c0ac2943549ac943243b693de7bc7"
                subtitle=""
                backgroundImage="/assets/background_miners.png"
              ></ButtonCard>
            </div>
          </ButtonCardWrapper>
        </Col>
      </Row>
      <Row class="justify-content-center mt-4">
        <Col lg={{ span: 8 }} md={{ span: 10 }}>
          <RowTable
            tableIcon="/assets/link.svg"
            pointsIcon="/assets/diamond.svg"
            values={props.ranking}
            header="Ranking"
            loading={props.loading}
            walletAddress={props.walletAddress}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
