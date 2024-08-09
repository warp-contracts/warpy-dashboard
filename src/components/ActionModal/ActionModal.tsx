import { Col, Modal, Row } from 'solid-bootstrap';
import Button from '../Button/Button';
import { Component, ParentComponent } from 'solid-js';
import './ActionModal.scss';

interface ActionModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  modalTitle: string;
}

const ActionModal: ParentComponent<ActionModalProps> = (props) => (
  <Modal show={props.showModal} onHide={props.handleCloseModal} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>{props.modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
  </Modal>
);

export default ActionModal;
