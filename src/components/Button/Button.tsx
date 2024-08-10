import { ParentComponent } from 'solid-js';
import './Button.scss';

interface ButtonProps {
  color: string;
  class?: string;
  handleClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.handleClick}
      class={`${props.class} button ${props.disabled ? 'disabled' : ''} color--${props.color}`}
    >
      {props.loading ? (
        <>
          <span class="spinner-border spinner-border-sm button__spinner" role="status" aria-hidden="true"></span>
          <span class="sr-only button__spinner__text">Loading...</span>
        </>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
