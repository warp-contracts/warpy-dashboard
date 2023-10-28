import { ParentComponent } from 'solid-js';
import './Button.scss';

interface ButtonProps {
  color: string;
  class?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.handleClick}
      class={`${props.class} button ${props.disabled ? 'disabled' : ''} ${
        props.color == 'primary' ? 'color--primary' : props.color == 'outline' ? 'color--outline' : ''
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
