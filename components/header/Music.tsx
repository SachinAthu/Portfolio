'use client';

import { useEffect, useRef } from 'react';
import { RiMusicFill } from 'react-icons/ri';
import gsap from 'gsap';

import { useLayoutContext } from '@/context/LayoutContext';
import { useMobileViewport, usePageVisible } from '@/lib/hooks';
import { cn } from '@/lib/common';

function Music() {
  const player = useRef<HTMLAudioElement | null>(null);
  const wave = useRef<HTMLDivElement>(null);
  const { isNavOpen, isPlay, setIsPlay } = useLayoutContext();
  const tweens = useRef<gsap.core.Timeline[]>([]);
  const pauseTween = useRef<gsap.core.Tween>();
  const isPageVisible = usePageVisible();

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

    // initialize tween
    const wavebars = wave.current?.querySelectorAll('svg rect');
    wavebars?.forEach((r, i) => {
      tweens.current?.push(
        gsap
          .timeline({
            paused: true,
            defaults: { repeat: -1, duration: 1.2, yoyo: true, ease: 'none' },
          })
          .to(r, {
            scaleY: 1,
            delay: i * 0.2,
            y: 0,
          })
          .to(r, {
            scaleY: 0.2,
            y: 7,
          })
      );
    });

    pauseTween.current = gsap.to('.wave svg rect', { scaleY: 0.2, y: 7, paused: true, duration: 1 });

    return () => {
      if (player.current) {
        player.current.pause();
        player.current = null;
      }

      tweens.current?.forEach((t) => t.kill());
      tweens.current = [];
      pauseTween.current?.kill();
    };
  }, []);

  function playMusic() {
    player.current
      ?.play()
      .then()
      .catch((err) => {
        console.log(err);
      });

    if (pauseTween.current?.isActive) {
      pauseTween.current?.pause();
    }
    tweens.current?.forEach((t) => t.invalidate().restart());
  }

  function stopMusic() {
    if (!player.current?.paused) {
      player.current?.pause();
      stopMusic();
    }

    tweens.current?.forEach((t) => t.pause());
    pauseTween.current?.invalidate().restart();
  }

  useEffect(() => {
    if (isPageVisible) {
      if (isPlay) {
        playMusic();
      } else {
        stopMusic();
      }
    } else {
      stopMusic();
    }
  }, [isPlay, isPageVisible]);

  return (
    <div className="hidden md:block">
      {/* <audio ref={player} id='music-player' className='w-0 h-0 opacity-0' src="/static/music/kaer_morhen.mp3" autoPlay={false} controls={false} loop></audio> */}

      <div
        className={cn(
          'music | flex h-[var(--height)] items-center gap-2 rounded-full border border-solid',
          isNavOpen ? 'border-d-text' : 'border-text dark:border-d-text'
        )}>
        {/* <div
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
        </div> */}

        <div className="wave | ml-3 w-[60px]" ref={wave}>
          <svg
            id="musicWave"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 48 16"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            className={isNavOpen ? '[&>rect]:fill-gray-300' : '[&>rect]:fill-gray-700 dark:[&>rect]:fill-gray-300'}>
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 0.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 5.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 10.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 15.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 20.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 25.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 30.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 35.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 40.425721 7)" strokeWidth="0" />
            <rect width="2" height="16" transform="matrix(1 0 0 0.2 45.425721 7)" strokeWidth="0" />
          </svg>
        </div>

        <button
          type="button"
          className={cn(
            'control-btn | relative grid h-[var(--btn-height)] w-[var(--btn-width)] place-items-center rounded-full border border-solid [&>svg]:h-[18px] [&>svg]:w-[18px]',
            isNavOpen
              ? 'border-d-text after:bg-d-text [&>svg]:fill-d-text'
              : 'border-text after:bg-text dark:border-d-text dark:after:bg-d-text [&>svg]:fill-text dark:[&>svg]:fill-d-text'
          )}
          onClick={() => setIsPlay(!isPlay)}
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
