import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";

const VideoPlayer = ({ videoSource }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = new Plyr(videoRef.current, {
      controls: [
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "fullscreen",
        "settings",
        "speed",
        "quality",
      ],
      autoplay: false,
      speed: { selected: 1, options: [0.5, 1, 1.25, 1.5, 2, 3] }, // Playback speed
      clickToPlay: true,
      keyboard: {
        focused: true,
        global: true,
      },
    });

    let hls = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSource);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (player) {
          // player.play();
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSource;
      videoRef.current.addEventListener("loadedmetadata", () => {
        if (player) {
          player.play();
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (player) {
        player.destroy();
      }
    };
  }, [videoSource]);

  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
};

export default VideoPlayer;
