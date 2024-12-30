import { Component, Show } from 'solid-js';
import './Header.scss';
import Button from '../../components/Button/Button';
import Ticker from '../../components/Ticker/Ticker';
import { Col, Container, Row } from 'solid-bootstrap';
import ButtonWithLink from '../../components/ButtonWithLink/ButtonWithLink';

interface HeaderProps {
  walletAddress: string | null;
  timestamp: number | null;
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <Container fluid>
      <Row class="linkbar">
        <Col class="d-flex align-middle justify-content-center">
          <div>
            Join our Discord to connect your wallet address to your profile and mine RSG through activity on the server
            -{' '}
            <a href="https://discord.gg/redstonedefi" target="_blank" class="linkbar__link">
              LINK
            </a>
          </div>
          <div></div>
        </Col>
      </Row>
      <Row class="header">
        <Col class="header__nav">
          <div class="header__nav__logo">
            <img src="/assets/header-logo.svg" />
          </div>
          <div class="header__nav__button">
            <appkit-button balance="false"></appkit-button>
          </div>
        </Col>
        <div class="header__main">
          <div class="header__main__title">
            RedStone
            <br />
            Expedition
          </div>
          <div class="header__main__season__title">The Final Countdown</div>
          <Show
            when={props.timestamp != null}
            fallback={<img class="header__main__season__img" src="/assets/diamond.svg" />}
          >
            <Ticker timestamp={props.timestamp as number} />
          </Show>
          <div class="header__main__links">
            <ButtonWithLink
              color="outline"
              link="https://blog.redstone.finance/2024/11/26/redstone-expedition-the-final-countdown/"
            >
              Learn more
            </ButtonWithLink>
            <ButtonWithLink
              link="https://discord.gg/redstonedefi"
              color="blue"
              class="d-flex justify-content-center align-items-center"
            >
              <div>Join Discord</div>
              <img src="/assets/discord.svg" class="button-card__button__img" />
            </ButtonWithLink>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Header;
