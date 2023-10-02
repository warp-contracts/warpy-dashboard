import { Component, createSignal } from 'solid-js';
import './Main.scss';
import { Button, Col, Container, Row, Table } from 'solid-bootstrap';
import Card from '../../components/Card/Card';
import ButtonCard from '../../components/ButtonCard/ButtonCard';
import RowTable from '../../components/RowTable/RowTable';
import Footer from '../Footer/Footer';

const rewards = [
  { name: '28.10.23, 14:15', value: '30' },
  { name: '28.10.23, 10:12', value: '124' },
  { name: '27.10.23, 08:56', value: '17' },
  { name: '27.10.23, 08:56', value: '17' },
];
const boosts = [
  { name: 'Early Something', value: '2' },
  { name: 'GR15 Rank', value: '1.5' },
  { name: 'Season 0 NFT', value: '4' },
  { name: 'Season 1 NFT️', value: '1.2' },
];
const ranking = [
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
  { address: '0sx...827s', discordHandle: '@cryptoboy', points: 153833, rewards: { points: '2m', nft: 'OGNFT' } },
];
const radios = [
  { name: 'All Time', value: '1' },
  { name: 'Season', value: '2' },
];
const [radioValue, setRadioValue] = createSignal('1');

const Main: Component = () => (
  <Container class='main justify-content-center' fluid>
    <Row class='justify-content-center'>
      <Col md={{ span: 4 }}>
        <Card
          header='Your RSCP'
          tableName='Latest rewards'
          score={7823}
          scoreIcon='/assets/diamond.svg'
          tableIcon='/assets/link.svg'
          valueIcon='/assets/diamond.svg'
          values={rewards}
          valueSymbol='/assets/plus.svg'
        ></Card>
      </Col>
      <Col md={{ span: 4 }}>
        <Card header='Boost table' values={boosts} tableIcon='/assets/boost.svg' valueSymbol='/assets/cross.svg' />
      </Col>
    </Row>
    <Row class='justify-content-center mt-4'>
      <Col md={{ span: 4 }}>
        <ButtonCard title='Seasonal NFT – 10000 RSCP' buttonTitle='Mint NFT' subtitle='120/1405'></ButtonCard>
      </Col>
      <Col md={{ span: 4 }}>
        <ButtonCard
          title='Want to be up to date with Tasks?'
          buttonTitle='Join Discord'
          buttonWithIcon='/assets/discord.svg'
        ></ButtonCard>
      </Col>
    </Row>
    <Row class='justify-content-center mt-4'>
      <Col md={{ span: 8 }}>
        <RowTable
          tableIcon='/assets/link.svg'
          pointsIcon='/assets/diamond.svg'
          values={ranking}
          header='Ranking'
          radios={radios}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
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

export default Main;
