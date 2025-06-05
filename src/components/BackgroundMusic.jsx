import React, { useEffect } from 'react';

export default function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio('/music/background.mp3');
    audio.loop = true;
    audio.volume = 0.2;
    audio.play().catch(() => {
      // Autoplay might be blocked
      console.log('Audio playback blocked until user interaction');
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}
