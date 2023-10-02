import { Component } from 'solid-js';
import './Footer.scss';

const Footer: Component = () => {
  return (
    <div class='footer d-flex justify-content-between'>
      <div class='d-flex footer__links'>
        <div>© RedStone 2023</div>
        <div>
          <a>Contact</a>
        </div>
        <div>
          <a>Team</a>
        </div>
        <div>
          <a>Blog</a>
        </div>
        <div>
          <a>Privacy policy</a>
        </div>
        <div>
          <a>Terms of Use</a>
        </div>
      </div>
      <div class='footer__socials'>
        <a href='/'>
          <img src='/assets/twitter.svg'></img>
        </a>
        <a href='/'>
          <img src='/assets/discord-2.svg'></img>
        </a>
        <a href='/'>
          <img src='/assets/github.svg'></img>
        </a>
        <a href='/'>
          <img src='/assets/linkedin.svg'></img>
        </a>
        <a href='/'>
          <img src='/assets/telegram.svg'></img>
        </a>
        <a href='/'>
          <img src='/assets/lenster.svg'></img>
        </a>
      </div>
    </div>
  );
};

export default Footer;
