import { Component } from 'solid-js';
import './Footer.scss';
import { Col, Row } from 'solid-bootstrap';

const Footer: Component = () => {
  return (
    <Row class='footer d-flex justify-content-between'>
      <Col class='d-flex footer__links flex-column flex-md-row justify-content-around justify-content-md-start'>
        <div class='pb-3 pb-md-0'>© RedStone 2023</div>
        <div class='pb-3 pb-md-0'>
          <a href='https://discord.com/invite/PVxBZKFr46' target='__blank'>
            Contact
          </a>
        </div>
        <div class='pb-3 pb-md-0'>
          <a href='https://redstone.finance/team' target='__blank'>
            Team
          </a>
        </div>
        <div class='pb-3 pb-md-0'>
          <a href='https://blog.redstone.finance' target='__blank'>
            Blog
          </a>
        </div>
        <div class='pb-3 pb-md-0'>
          <a href='https://redstone.finance/privacy.html' target='__blank'>
            Privacy policy
          </a>
        </div>
        <div class='pb-3 pb-md-0'>
          <a href='https://redstone.finance/terms.html' target='__blank'>
            Terms of Use
          </a>
        </div>
      </Col>
      <Col class='footer__socials d-flex justify-content-around justify-content-md-end flex-column flex-md-row align-items-end align-md-items-middle'>
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
      </Col>
    </Row>
  );
};

export default Footer;
