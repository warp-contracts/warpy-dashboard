import { Component, Show } from 'solid-js';
import './Header.scss';
import Button from '../../components/Button/Button';
import Ticker from '../../components/Ticker/Ticker';
import { Col, Container, Row } from 'solid-bootstrap';
import ButtonWithLink from '../../components/ButtonWithLink/ButtonWithLink';

interface HeaderProps {
  walletAddress: string | null;
  setWalletAddress: (
    v: string | null | ((prev?: string | null) => string | null)
  ) => string | null;
  connect: () => void;
  disconnect: () => void;
  timestamp: number | null;
  loadingWalletAddress: boolean;
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <Container fluid>
      <Row class="linkbar">
        <Col class="d-flex align-middle justify-content-center">
          <div>
            Join our Discord to connect your wallet address to your profile and
            mine RSG through activity on the server -{' '}
            <a
              href="https://discord.gg/redstonedefi"
              target="_blank"
              class="linkbar__link"
            >
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
            {props.walletAddress ? (
              <div class="d-flex align-items-end align-items-md-center flex-column-reverse flex-md-row">
                <div class="header__nav__button__result pt-1 mt-md-0">
                  {props.walletAddress.substr(0, 3) +
                    '...' +
                    props.walletAddress.substr(props.walletAddress.length - 3)}
                </div>
                <Button
                  color="primary"
                  handleClick={props.disconnect}
                  loading={props.loadingWalletAddress}
                >
                  Disconnect wallet
                </Button>
              </div>
            ) : (
              <Button
                color="primary"
                handleClick={props.connect}
                loading={props.loadingWalletAddress}
              >
                Connect wallet
              </Button>
            )}
          </div>
        </Col>
        <div class="header__main">
          <div class="header__main__subtitle">Launch</div>
          <div class="header__main__title">
            RedStone
            <br />
            Expedition
          </div>
          <div class="header__main__season__title">Season 2</div>
          <Show
            when={props.timestamp != null}
            fallback={
              <img
                class="header__main__season__img"
                src="/assets/diamond.svg"
              />
            }
          >
            <Ticker timestamp={props.timestamp as number} />
          </Show>
          <div class="header__main__links">
            <ButtonWithLink
              color="outline"
              link="https://discord.gg/redstonedefi"
            >
              Register
            </ButtonWithLink>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Header;
