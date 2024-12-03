import { Component, onCleanup, createEffect } from 'solid-js';
import './VideoPlayer.scss';

const VideoPlayer: Component = () => {
  let videoRef: HTMLVideoElement | undefined;

  createEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          videoRef?.play();
        } else {
          videoRef?.pause();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef) {
      observer.observe(videoRef);
    }

    onCleanup(() => {
      if (videoRef) {
        observer.unobserve(videoRef);
      }
    });
  });

  return (
    <div>
      <video ref={videoRef!} loop muted class="video">
        <source src="/assets/videos/final_countdown.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
