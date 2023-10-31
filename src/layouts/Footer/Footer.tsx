import { Component } from 'solid-js';
import './Footer.scss';

const Footer: Component = () => {
  return (
    <div class='footer d-flex justify-content-between'>
      <div class='d-flex footer__links'>
        <div>© RedStone 2023</div>
        <div>
          <a href='https://discord.com/invite/PVxBZKFr46' target='__blank'>
            Contact
          </a>
        </div>
        <div>
          <a href='https://redstone.finance/team' target='__blank'>
            Team
          </a>
        </div>
        <div>
          <a href='https://blog.redstone.finance' target='__blank'>
            Blog
          </a>
        </div>
        <div>
          <a href='https://redstone.finance/privacy.html' target='__blank'>
            Privacy policy
          </a>
        </div>
        <div>
          <a href='https://redstone.finance/terms.html' target='__blank'>
            Terms of Use
          </a>
        </div>
      </div>
      <div class='footer__socials'>
        <a href='https://twitter.com/redstone_defi' target='__blank'>
          <img src='/assets/twitter.svg'></img>
        </a>
        <a href='https://discord.com/invite/PVxBZKFr46' target='__blank'>
          <img src='/assets/discord-2.svg'></img>
        </a>
        <a href='https://github.com/redstone-finance' target='__blank'>
          <img src='/assets/github.svg'></img>
        </a>
        <a href='https://www.linkedin.com/company/redstone-finance' target='__blank'>
          <img src='/assets/linkedin.svg'></img>
        </a>
        <a href='https://t.me/redstonefinance' target='__blank'>
          <img src='/assets/telegram.svg'></img>
        </a>
        <a href='https://lenster.xyz/u/redstone_oracles' target='__blank'>
          <img src='/assets/lenster.svg'></img>
        </a>
      </div>
    </div>
  );
};

export default Footer;
