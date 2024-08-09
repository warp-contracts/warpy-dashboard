import { Col } from 'solid-bootstrap';
import { Component, ParentComponent } from 'solid-js';
import './ButtonCardWrapper.scss';
import WithSlider from '../WithSlider/WithSlider';

interface ButtonCardWrapperProps {
  withSlider?: boolean;
}

const ButtonCardWrapper: ParentComponent<ButtonCardWrapperProps> = (props) => {
  return (
    <Col class={`button-card-wrapper d-flex align-items-center`}>
      {props.withSlider ? <WithSlider>{props.children}</WithSlider> : props.children}
    </Col>
  );
};

export default ButtonCardWrapper;
