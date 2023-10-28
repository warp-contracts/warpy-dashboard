import { Modal } from 'solid-bootstrap';
import Button from '../Button/Button';
import { Component } from 'solid-js';
import './ActionModal.scss';

interface ActionModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

const ActionModal: Component<ActionModalProps> = (props) => (
  <Modal show={props.showModal} onHide={props.handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Action required</Modal.Title>
    </Modal.Header>
    <Modal.Body>Please connect to MetaMask!</Modal.Body>
    <Modal.Footer>
      <Button color='primary' handleClick={props.handleCloseModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ActionModal;
