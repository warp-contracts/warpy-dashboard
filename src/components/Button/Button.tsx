import { ParentComponent } from 'solid-js';
import './Button.scss';

interface ButtonProps {
  color: string;
  class?: string;
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class={`${props.class} button ${
        props.color == 'primary' ? 'color--primary' : props.color == 'outline' ? 'color--outline' : ''
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
