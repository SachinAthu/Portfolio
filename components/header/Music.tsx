'use client';

import { useEffect, useRef, useState } from 'react';
import { RiMusicFill } from 'react-icons/ri';

export default function Music() {
  const player = useRef<HTMLAudioElement | null>(null);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    // play audio
    const p = document.createElement('audio');
    p.src = '/static/music/kaer_morhen.mp3';
    p.style.display = 'none';
    document.body.appendChild(p);

    p.onended = function () {
      p.play()
        .then()
        .catch((err) => {
          console.log(err);
        });
    };

    p
      ?.play()
      .then()
      .catch((err) => {
        console.log(err);
      });

    player.current = p;

    return () => {
      if (player.current) {
        player.current.pause();
        player.current.remove();
        player.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (play) {
      player.current?.pause();
    } else {
      player.current
        ?.play()
        .then()
        .catch((err) => {
          console.log(err);
        });
    }
    setPlay(!play);
  };

  return (
    <div className="hidden md:block">
      <div className="music | flex h-[var(--height)] items-center gap-2 rounded-full border border-solid border-text dark:border-d-text">
        <div className="wave | ml-3 mr-1 flex items-center gap-1" id="musicWave" data-play={play}>
          <div className="wave-1"></div>
          <div className="wave-2"></div>
          <div className="wave-3"></div>
          <div className="wave-4"></div>
          <div className="wave-5"></div>
          <div className="wave-6"></div>
          <div className="wave-7"></div>
          <div className="wave-8"></div>
          <div className="wave-9"></div>
          <div className="wave-10"></div>
        </div>

        <button
          type="button"
          className="control-btn | relative grid h-[var(--btn-height)] w-[var(--btn-width)] place-items-center rounded-full border border-solid border-text dark:border-d-text [&>svg]:h-[18px] [&>svg]:w-[18px]"
          onClick={togglePlay}
          data-play={play}>
          <RiMusicFill />
        </button>
      </div>
    </div>
  );
}
