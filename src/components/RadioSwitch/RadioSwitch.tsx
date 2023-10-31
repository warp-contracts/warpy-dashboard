import { ButtonGroup, ToggleButton } from 'solid-bootstrap';
import { Component, For } from 'solid-js';
import './RadioSwitch.scss';

interface RadioSwitchProps {
  radios: { name: string; value: string }[];
  radioValue: () => string;
  setRadioValue: (v: string | ((prev?: string) => string)) => string;
  disabledValue?: string;
}

const RadioSwitch: Component<RadioSwitchProps> = (props) => {
  return (
    <ButtonGroup class='radio-switch'>
      <For each={props.radios}>
        {(radio, idx) => (
          <ToggleButton
            id={`radio-${idx()}`}
            type='radio'
            variant='secondary'
            name='radio'
            value={radio.value}
            checked={props.radioValue() === radio.value}
            onChange={(e: any) => props.setRadioValue(e.currentTarget.value)}
            class={`${radio.value == props.disabledValue && 'disabled'}`}
          >
            {radio.name}
          </ToggleButton>
        )}
      </For>
    </ButtonGroup>
  );
};

export default RadioSwitch;
