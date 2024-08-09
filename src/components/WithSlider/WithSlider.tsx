import { createEffect, createSignal, ParentComponent } from 'solid-js';
import './WithSlider.scss';
import 'solid-slider/slider.css';
import { Slider, createSlider } from 'solid-slider';
//@ts-ignore
import { autoplay } from 'solid-slider/plugins/autoplay';

const WithSlider: ParentComponent = (props) => {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  const [pause, togglePause] = createSignal(false);
  const [slider, { current, next, prev, moveTo }] = createSlider(
    { loop: true, defaultAnimation: { duration: 1500 } },
    autoplay(10000, {
      pause,
      pauseOnDrag: true,
    })
  );
  slider;
  return (
    <>
      <div class="with-slider" use:slider>
        {props.children}
      </div>
      <img
        class="with-slider__icon with-slider__icon--right"
        height={50}
        width={50}
        src={`/assets/arrow${current() == children.length - 1 ? '-non' : ''}-highlight-right.png`}
        onClick={next}
        disabled={current() == children.length - 1}
      />
      <img
        class="with-slider__icon with-slider__icon--left"
        height={50}
        width={50}
        src={`/assets/arrow${current() == 0 ? '-non' : ''}-highlight-left.png`}
        onClick={prev}
        disabled={current() == 0}
      />
    </>
  );
};

export default WithSlider;
