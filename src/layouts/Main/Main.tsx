import { Component, Show, createResource, createSignal } from 'solid-js';
import './Main.scss';
import { Col, Container, Row } from 'solid-bootstrap';
import Card from '../../components/Card/Card';
import ButtonCard from '../../components/ButtonCard/ButtonCard';
import RowTable from '../../components/RowTable/RowTable';
import Footer from '../Footer/Footer';
import Button from '../../components/Button/Button';
import { connect } from '../../App';

interface MainProps {
  rsg: number;
  boosts: { name: string; value: any }[] | undefined;
  rewards: { name: string; value: string }[] | undefined;
  connect: () => void;
  disconnect: () => void;
  ranking: { address: string; discordHandle: string; points: number; rewards: { points: string; nft: string } }[];
  radios: { name: string; value: string }[];
  radioValue: () => string;
  setRadioValue: (v: string | ((prev?: string) => string)) => string;
  loading: boolean;
  walletAddress: string | null;
  userRewardsLoading: boolean;
}

const phantomRewards = [
  { name: '28.10.23, 14:15', value: '30' },
  { name: '28.10.23, 10:12', value: '124' },
  { name: '27.10.23, 08:56', value: '17' },
  { name: '27.10.23, 08:56', value: '17' },
];

const emptyRewards = [
  { name: '', value: '' },
  { name: '', value: '' },
  { name: '', value: '' },
  { name: '', value: '' },
];

const phantomBoosts = [
  { name: 'Early Something', value: '2' },
  { name: 'GR15 Rank', value: '1.5' },
  { name: 'Season 0 NFT', value: '4' },
  { name: 'Season 1 NFT️', value: '1.2' },
];

const SONAR_CONTRACT_STATE =
  'https://sonar.warp.cc/#/app/contract/p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU?network=mainnet&dre=dreWarpy#current-state';

const Main: Component<MainProps> = (props) => {
  return (
    <Container class='main justify-content-center' fluid>
      <Row class='justify-content-center'>
        <Col md={{ span: 4 }} class='position-relative'>
          <Card
            header='Your RSCP'
            tableName='Latest rewards'
            score={props.rsg}
            scoreIcon='/assets/diamond.svg'
            tableIcon='/assets/link.svg'
            valueIcon='/assets/diamond.svg'
            values={!props.walletAddress || props.userRewardsLoading ? phantomRewards : props.rewards}
            valueSymbol='/assets/plus.svg'
            link={SONAR_CONTRACT_STATE}
            blurred={!props.walletAddress || props.userRewardsLoading}
          ></Card>
          <Show when={!props.walletAddress}>
            <div class='main__button-on-blur'>
              <Button color='primary' handleClick={connect}>
                Connect wallet
              </Button>
            </div>
          </Show>
        </Col>
        <Col md={{ span: 4 }} class='position-relative'>
          <Card
            header='Boost table'
            values={!props.walletAddress || props.userRewardsLoading ? phantomBoosts : props.boosts}
            tableIcon='/assets/boost.svg'
            valueSymbol='/assets/cross.svg'
            link={SONAR_CONTRACT_STATE}
            blurred={!props.walletAddress || props.userRewardsLoading}
          />
          <Show when={!props.walletAddress}>
            <div class='main__button-on-blur'>
              <Button color='primary' handleClick={connect}>
                Connect wallet
              </Button>
            </div>
          </Show>
        </Col>
      </Row>
      <Row class='justify-content-center mt-4'>
        <Col md={{ span: 4 }}>
          <ButtonCard
            title='Seasonal NFT – coming soon'
            buttonTitle='Mint NFT'
            subtitle=''
            disabled={true}
          ></ButtonCard>
        </Col>
        <Col md={{ span: 4 }}>
          <ButtonCard
            title='Want to be up to date with Tasks?'
            buttonTitle='Join Discord'
            buttonWithIcon='/assets/discord.svg'
            link='https://discord.gg/redstonedefi'
          ></ButtonCard>
        </Col>
      </Row>
      <Row class='justify-content-center mt-4'>
        <Col md={{ span: 8 }}>
          <RowTable
            tableIcon='/assets/link.svg'
            pointsIcon='/assets/diamond.svg'
            values={props.ranking}
            header='Ranking'
            radios={props.radios}
            radioValue={props.radioValue}
            setRadioValue={props.setRadioValue}
            loading={props.loading}
            link={SONAR_CONTRACT_STATE}
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
