'use client';

import { useEffect, useRef } from 'react';
import { RiMusicFill } from 'react-icons/ri';

import { useLayoutContext } from '@/context/LayoutContext';
import { useMobileViewport } from '@/lib/hooks';
import { cn } from '@/lib/common';

function Music() {
  const player = useRef<HTMLAudioElement | null>(null);
  const { isNavOpen, isPlay, setIsPlay } = useLayoutContext();

  useEffect(() => {
    // initialize audio

    if (!player.current) {
      const p = new Audio('/static/music/kaer_morhen.mp3');
      p.volume = 0.2;
      p.controls = false;
      p.autoplay = false;
      p.loop = true;

      player.current = p;
    }

    return () => {
      if (player.current) {
        player.current.pause();
        player.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlay) {
      player.current
        ?.play()
        .then()
        .catch((err) => {
          console.log(err);
        });
    } else {
      player.current?.pause();
    }
  }, [isPlay]);

  function togglePlay() {
    setIsPlay(!isPlay);
  }

  return (
    <div className="hidden md:block">
      {/* <audio ref={player} id='music-player' className='w-0 h-0 opacity-0' src="/static/music/kaer_morhen.mp3" autoPlay={false} controls={false} loop></audio> */}

      <div
        className={cn(
          'music | flex h-[var(--height)] items-center gap-2 rounded-full border border-solid',
          isNavOpen ? 'border-d-text' : 'border-text dark:border-d-text'
        )}>
        <div
          className={cn(
            'wave | ml-3 mr-1 flex items-center gap-1',
            isNavOpen ? '[&>div]:bg-gray-300' : '[&>div]:bg-gray-700 dark:[&>div]:bg-gray-300'
          )}
          id="musicWave"
          data-play={isPlay}>
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
          className={cn(
            'control-btn | relative grid h-[var(--btn-height)] w-[var(--btn-width)] place-items-center rounded-full border border-solid [&>svg]:h-[18px] [&>svg]:w-[18px]',
            isNavOpen
              ? 'border-d-text after:bg-d-text [&>svg]:fill-d-text'
              : 'border-text after:bg-text dark:border-d-text dark:after:bg-d-text [&>svg]:fill-text dark:[&>svg]:fill-d-text'
          )}
          onClick={togglePlay}
          data-play={isPlay}>
          <RiMusicFill />
        </button>
      </div>
    </div>
  );
}

export default function MusicWrapper() {
  const isMobile = useMobileViewport();

  if (isMobile) return null;

  return <Music />;
}
