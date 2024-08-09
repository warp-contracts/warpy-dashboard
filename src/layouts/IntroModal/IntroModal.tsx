import { Col, Row } from 'solid-bootstrap';
import ActionModal from '../../components/ActionModal/ActionModal';
import { Accessor, Component } from 'solid-js';
import './IntroModal.scss';

interface IntroModalProps {
  show: Accessor<boolean>;
  handleClose: () => boolean;
}

const IntroModal: Component<IntroModalProps> = (props) => {
  return (
    <ActionModal showModal={props.show()} handleCloseModal={props.handleClose} modalTitle="How to get started?">
      <Row class="pb-4">
        <Col xs={{ span: 9 }}>
          <div class="d-flex align-items-center intro-modal">
            <div class="intro-modal__bullet">
              <div class="intro-modal__bullet__content">1</div>
            </div>
            <div class="intro-modal__text">
              Join the RedStone{' '}
              <a class="intro-modal__link" href="https://discord.gg/redstonedefi" target="__blank">
                Discord Server
              </a>
            </div>
          </div>
          <div class="d-flex align-items-center intro-modal">
            <div class="intro-modal__bullet">
              <div class="intro-modal__bullet__content">2</div>
            </div>
            <div class="intro-modal__text">Accept the rules and get access to the rest of the server</div>
          </div>
          <div class="d-flex align-items-center intro-modal">
            <div class="intro-modal__bullet">
              <div class="intro-modal__bullet__content">3</div>
            </div>
            <div class="intro-modal__text">Go to the Warpy channel in the Miners category</div>
          </div>
          <div class="d-flex align-items-center intro-modal">
            <div class="intro-modal__bullet">
              <div class="intro-modal__bullet__content">4</div>
            </div>
            <div class="intro-modal__text">Use /linkwallet command to connect your EVM wallet</div>
          </div>
          <div class="d-flex align-items-center intro-modal">
            <div class="intro-modal__bullet">
              <div class="intro-modal__bullet__content">5</div>
            </div>
            <div class="intro-modal__text">
              Participate in special events to earn RSGs and special roles
              <br /> - find out more{' '}
              <a
                class="intro-modal__link"
                href="https://blog.redstone.finance/2023/10/31/redstone-is-launching-expedition"
                target="__blank"
              >
                here
              </a>
            </div>
          </div>
        </Col>
        <Col xs={{ span: 3 }}>
          <img class="intro-modal__img" src="/assets/mascot.svg"></img>
        </Col>
      </Row>
    </ActionModal>
  );
};

export default IntroModal;
