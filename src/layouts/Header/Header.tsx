import { Component, createEffect, createSignal } from 'solid-js';
import './Header.scss';
import Button from '../../components/Button/Button';

const Header: Component = () => {
  return (
    <>
      <div class='linkbar'>
        <div>Some kind of important information</div>
        <div>
          <a href='/' target='_blank' class='linkbar__link'>
            Link
          </a>
        </div>
      </div>
      <div class='header'>
        <div class='header__nav'>
          <div class='header__nav__logo'>
            <img src='/assets/header-logo.svg' />
          </div>
          <div class='header__nav__button'>
            <Button color='primary'>Connect wallet</Button>
          </div>
        </div>
        <div class='header__main'>
          <div class='header__main__subtitle'>Season 1</div>
          <div class='header__main__title'>
            Journey to the
            <br />
            heart of RedStone
          </div>
          <div class='header__main__season__title'>Season of the Explorers</div>
          <div class='header__main__season__clock'>52:10:34</div>
          <div class='header__main__links'>
            <Button color='primary'>Join campaign</Button>
            <Button color='outline'>Learn more</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
