import { ButtonProps, Col, Container, Row } from 'solid-bootstrap';
import { Component } from 'solid-js';
import './ButtonCard.scss';
import Button from '../Button/Button';

interface ButtonCardProps {
  title: string;
  buttonTitle: string;
  buttonWithIcon?: string;
  subtitle?: string;
}

const ButtonCard: Component<ButtonCardProps> = (props) => {
  return (
    <Col class='button-card'>
      <div class='button-card__title'>{props.title}</div>
      <div class='button-card__button d-flex justify-content-center'>
        <Button
          color='primary'
          class={`${props.buttonWithIcon ? 'd-flex justify-content-center align-items-center' : ''}`}
        >
          <div>{props.buttonTitle}</div>
          {props.buttonWithIcon && <img src={props.buttonWithIcon} class='button-card__button__img' />}
        </Button>
      </div>
      <div class='button-card__subtitle'>{props.subtitle}</div>
    </Col>
  );
};

export default ButtonCard;
