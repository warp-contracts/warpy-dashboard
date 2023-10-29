import { ParentComponent } from 'solid-js';
import Button from '../Button/Button';
import './ButtonWithLink.scss';

interface ButtonWithLinkProps {
  color: string;
  class?: string;
  handleClick?: () => void;
  disabled?: boolean;
  link: string;
}

const ButtonWithLink: ParentComponent<ButtonWithLinkProps> = (props) => {
  return (
    <a href={props.link} class='button-with-link' target='__blank'>
      <Button color={props.color} class={props.class} handleClick={props.handleClick} disabled={props.disabled}>
        {props.children}
      </Button>
    </a>
  );
};

export default ButtonWithLink;
