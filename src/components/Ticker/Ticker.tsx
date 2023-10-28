import { Component, createSignal, onCleanup } from 'solid-js';
import { countdown } from '../../utils';
import './Ticker.scss';

interface TickerProps {
  timestamp: number;
}

const Ticker: Component<TickerProps> = (props) => {
  const [timerDetails, setTimerDetails] = createSignal(countdown(props.timestamp));
  const timer = setInterval(() => {
    setTimerDetails(countdown(props.timestamp));
  }, 1000);

  onCleanup(() => clearInterval(timer));

  return <div class='timer'>{timerDetails()}</div>;
};

export default Ticker;
