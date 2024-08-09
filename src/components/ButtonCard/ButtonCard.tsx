import { Component } from 'solid-js';
import './ButtonCard.scss';
import Button from '../Button/Button';
import ButtonWithLink from '../ButtonWithLink/ButtonWithLink';

interface ButtonCardProps {
  title: string;
  buttonTitle: string;
  buttonWithIcon?: string;
  subtitle?: string;
  link?: string;
  disabled?: boolean;
  backgroundImage?: string;
}

const ButtonCard: Component<ButtonCardProps> = (props) => {
  return (
    <div class="d-flex flex-column justify-content-center button-card">
      {props.backgroundImage && <img class={`button-card__bg`} src={props.backgroundImage}></img>}
      <div class="button-card__title">{props.title}</div>
      <div class="button-card__button d-flex justify-content-center">
        {props.link ? (
          <ButtonWithLink
            link={props.link}
            disabled={props.disabled}
            color="primary"
            class={`${props.buttonWithIcon ? 'd-flex justify-content-center align-items-center' : ''}`}
          >
            <div>{props.buttonTitle}</div>
            {props.buttonWithIcon && <img src={props.buttonWithIcon} class="button-card__button__img" />}
          </ButtonWithLink>
        ) : (
          <Button
            disabled={props.disabled}
            color="primary"
            class={`${props.buttonWithIcon ? 'd-flex justify-content-center align-items-center' : ''}`}
          >
            <div>{props.buttonTitle}</div>
            {props.buttonWithIcon && <img src={props.buttonWithIcon} class="button-card__button__img" />}
          </Button>
        )}
      </div>
      <div class="button-card__subtitle">{props.subtitle}</div>
    </div>
  );
};

export default ButtonCard;
