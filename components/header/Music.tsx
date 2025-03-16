'use client';

import { useCallback, useEffect, useRef, memo, useState, createContext, useContext, useMemo } from 'react';
import { RiMusicFill } from 'react-icons/ri';
import { gsap } from '@/lib/gsap-config';

import { useLayoutContext } from '@/context/LayoutContext';
import { useMobileViewport, usePageVisible } from '@/lib/hooks';
import { cn } from '@/lib/common';
import { MUSIC_PLAYLIST } from '@/lib/data';

/* music context */
export type MusicContextType = {
  isDisable: boolean;
  isPlay: boolean;

  setIsDisable: (isDisable: boolean) => void;
  setIsPlay: (isPlay: boolean) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDisable, setIsDisable] = useState(true);
  const [isPlay, setIsPlay] = useState(false);

  const value = useMemo(
    () => ({
      isDisable,
      isPlay,

      setIsDisable,
      setIsPlay,
    }),
    [isDisable, isPlay]
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within an MusicProvider');
  }
  return context;
};

MusicContext.displayName = 'MusicContext';
MusicProvider.displayName = 'MusicProvider';
/**/

function MusicWave() {
  const isPageVisible = usePageVisible();
  const { isNavOpen } = useLayoutContext();
  const { isPlay } = useMusicContext();

  const wave = useRef<HTMLDivElement>(null);
  const tweens = useRef<gsap.core.Timeline[]>([]);
  const pauseTween = useRef<gsap.core.Tween>();

  const playWave = useCallback(() => {
    if (pauseTween.current?.isActive) {
      pauseTween.current?.pause();
    }
    tweens.current?.forEach((t) => t.invalidate().restart());
  }, []);

  const stopWave = useCallback(() => {
    tweens.current?.forEach((t) => t.pause());
    pauseTween.current?.invalidate().restart();
  }, []);

  useEffect(() => {
    // initialize tweens
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
      tweens.current?.forEach((t) => t.kill());
      tweens.current = [];
      pauseTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isPageVisible) {
      if (isPlay) {
        playWave();
      } else {
        stopWave();
      }
    } else {
      stopWave();
    }
  }, [isPlay, isPageVisible, playWave, stopWave]);

  return (
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
  );
}

function TogglePlayBtn({ onClick }: { onClick: () => void }) {
  const { isNavOpen } = useLayoutContext();
  const { isDisable, isPlay } = useMusicContext();

  return (
    <button
      id="mainMusicPlayBtn"
      type="button"
      className={cn(
        'control-btn | relative grid h-[var(--btn-height)] w-[var(--btn-width)] place-items-center rounded-full border border-solid [&>svg]:h-[18px] [&>svg]:w-[18px]',
        isNavOpen
          ? 'border-d-text after:bg-d-text [&>svg]:fill-d-text'
          : 'border-text after:bg-text dark:border-d-text dark:after:bg-d-text [&>svg]:fill-text dark:[&>svg]:fill-d-text'
      )}
      onClick={onClick}
      data-play={isPlay}
      disabled={isDisable}
      aria-label="Toggle background music">
      <RiMusicFill />
    </button>
  );
}

function MusicControl() {
  const isPageVisible = usePageVisible();
  const { isPlay, setIsPlay } = useMusicContext();
  const player = useRef<HTMLAudioElement | null>(null);

  const playMusic = useCallback(() => {
    player.current
      ?.play()
      .then()
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const stopMusic = useCallback(() => {
    if (!player.current?.paused) {
      player.current?.pause();
    }
  }, []);

  const handleClick = () => {
    playMusic();
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    // initialize audio
    if (!player.current) {
      const p = new Audio(MUSIC_PLAYLIST[0].path);
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
    if (isPageVisible) {
      if (isPlay) {
        playMusic();
      } else {
        stopMusic();
      }
    } else {
      stopMusic();
    }
  }, [isPlay, isPageVisible, playMusic, stopMusic]);

  return <TogglePlayBtn onClick={handleClick} />;
}

const MusicControlMultiple = () => {
  const isPageVisible = usePageVisible();
  const { isPlay, setIsDisable, setIsPlay } = useMusicContext();
  const canPageVisibleStop = useRef(false);

  const workerRef = useRef<Worker | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const audioGain = useRef<GainNode | null>(null);
  const audioBuffer = useRef<AudioBuffer | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);

  const resumeMusic = useCallback(() => {
    // console.log('resume');

    audioContext.current?.resume();
    setIsPlay(true);
    canPageVisibleStop.current = true;
  }, [setIsPlay]);

  const pauseMusic = useCallback(() => {
    // console.log('pause');

    audioContext.current?.suspend();
    setIsPlay(false);
  }, [setIsPlay]);

  const playMusic = useCallback(() => {
    if (!audioContext.current || !audioGain.current || !audioBuffer.current) return;

    if (source.current) {
      resumeMusic();
    } else {
      // console.log('play');

      // Create a new audio source
      source.current = audioContext.current.createBufferSource();
      source.current.buffer = audioBuffer.current;
      source.current.connect(audioGain.current).connect(audioContext.current.destination);
      source.current.start(0);

      // Handle track end
      source.current.onended = () => {
        // console.log('ended', audioContext.current?.state);
        source.current?.stop();
        source.current = null;
        playMusic();
      };

      canPageVisibleStop.current = true;
      setIsPlay(true);
    }
  }, [setIsPlay, resumeMusic]);

  const onMessage = useCallback(
    (event: MessageEvent<any>) => {
      const { action, buffer, error } = event.data;

      if (action === 'loaded') {
        audioContext.current = new AudioContext();
        audioContext.current.decodeAudioData(buffer, (decodedBuffer) => {
          audioBuffer.current = decodedBuffer;
          // console.log('Track loaded and decoded');
          setIsDisable(false);

          // set the volume
          if (audioContext.current) {
            audioGain.current = audioContext.current.createGain();
            audioGain.current.gain.value = 0.2;
          }

          const isInitialMusic = sessionStorage.getItem('is-initial-music') === 'true';
          if (isInitialMusic) {
            playMusic();
          }
        });
      } else if (action === 'loadError') {
        console.error('Error loading music track', error);
        setIsDisable(true);
      } else {
        console.error(action, error);
        setIsDisable(true);
      }
    },
    [setIsDisable, playMusic]
  );

  const handleClick = () => {
    if (isPlay) {
      pauseMusic();
      canPageVisibleStop.current = false;
    } else {
      playMusic();
    }
  };

  const loadTrack = useCallback((track: string) => {
    // workerRef.current.postMessage({ data: { track: MUSIC_PLAYLIST[0].path } });
    workerRef.current?.postMessage(track);
  }, []);

  useEffect(() => {
    // Initialize the Web Worker
    workerRef.current = new Worker(new URL('@/lib/workers/audioWorker.ts', import.meta.url));

    // Listen for messages from the worker
    workerRef.current.addEventListener('message', onMessage);

    // only for development, because welcome screen disabled
    loadTrack('/static/music/output.mp3');

    return () => {
      workerRef.current?.terminate();
      audioContext.current?.close();
    };
  }, [loadTrack]);

  useEffect(() => {
    if (!canPageVisibleStop.current) return;

    if (isPageVisible) {
      resumeMusic();
    } else {
      pauseMusic();
    }
  }, [isPageVisible, pauseMusic, resumeMusic]);

  return (
    <>
      <button
        type="button"
        id="loadMusicBtn"
        tabIndex={-1}
        className="invisible"
        onClick={() => loadTrack('/static/music/output.mp3')}></button>

      <TogglePlayBtn onClick={handleClick} />
    </>
  );
};

const Music = memo(() => {
  const { isNavOpen } = useLayoutContext();

  return (
    <div className="hidden md:block">
      <div
        className={cn(
          'music | flex h-[var(--height)] items-center gap-2 rounded-full border border-solid',
          isNavOpen ? 'border-d-text' : 'border-text dark:border-d-text'
        )}>
        <MusicWave />

        {window.Worker ? <MusicControlMultiple /> : <MusicControl />}
      </div>
    </div>
  );
});
Music.displayName = 'Music';

export default function MusicWrapper() {
  const isMobile = useMobileViewport();

  if (isMobile) return null;

  return (
    <MusicProvider>
      <Music />
    </MusicProvider>
  );
}
