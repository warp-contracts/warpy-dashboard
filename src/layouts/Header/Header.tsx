import { Component, Show } from 'solid-js';
import './Header.scss';
import Button from '../../components/Button/Button';
import Ticker from '../../components/Ticker/Ticker';

interface HeaderProps {
  walletAddress: string | null;
  setWalletAddress: (v: string | null | ((prev?: string | null) => string | null)) => string | null;
  connect: () => void;
  disconnect: () => void;
  timestamp: number | null;
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <>
      <div class='linkbar'>
        <div>
          Join our Discord to connect your wallet address to your profile and mine RSG through activity on the server -
        </div>
        <div>
          <a href='/' target='_blank' class='linkbar__link'>
            LINK
          </a>
        </div>
      </div>
      <div class='header'>
        <div class='header__nav'>
          <div class='header__nav__logo'>
            <img src='/assets/header-logo.svg' />
          </div>
          <div class='header__nav__button'>
            {props.walletAddress ? (
              <div class='d-flex align-items-center'>
                <div class='header__nav__button__result'>
                  {props.walletAddress.substr(0, 3) +
                    '...' +
                    props.walletAddress.substr(props.walletAddress.length - 3)}
                </div>
                <Button color='primary' handleClick={props.disconnect}>
                  Disconnect wallet
                </Button>
              </div>
            ) : (
              <Button color='primary' handleClick={props.connect}>
                Connect wallet
              </Button>
            )}
          </div>
        </div>
        <div class='header__main'>
          <div class='header__main__subtitle'>Launch</div>
          <div class='header__main__title'>
            RedStone
            <br />
            Expedition
          </div>
          <div class='header__main__season__title'>Season 1 coming soon</div>
          <Show when={props.timestamp != null} fallback={<img src='/assets/diamond.svg' class='pt-3' />}>
            <Ticker timestamp={props.timestamp as number} />
          </Show>
          <div class='header__main__links'>
            <Button color='outline'>Learn more</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
