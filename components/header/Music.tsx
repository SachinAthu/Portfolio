"use client";

import {
  useEffect,
  useRef,
  memo,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { RiMusicFill } from "react-icons/ri";
import { gsap } from "@/lib/gsap-config";
import { Howl, Howler } from "howler";

import { useLayoutContext } from "@/context/LayoutContext";
import { useMobileViewport, usePageVisible } from "@/lib/hooks";
import { cn } from "@/lib/common";
import { MUSIC_PLAYLIST } from "@/lib/data";
import { MusicTrackType } from "@/lib/types";

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

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext must be used within an MusicProvider");
  }
  return context;
};

MusicContext.displayName = "MusicContext";
MusicProvider.displayName = "MusicProvider";
/**/

const BAR_POSITIONS = Array.from({ length: 10 }, (_, i) => i * 5 + 0.425721);

const WaveBars = memo(function WaveBars({
  rectRefs,
}: {
  rectRefs: React.RefObject<SVGRectElement[]>;
}) {
  return (
    <>
      {BAR_POSITIONS.map((x, i) => (
        <rect
          key={i}
          ref={(el) => {
            if (el) rectRefs.current[i] = el;
          }}
          width="2"
          height="16"
          transform={`matrix(1 0 0 0.2 ${x} 7)`}
          strokeWidth="0"
        />
      ))}
    </>
  );
});

function MusicWave() {
  const isPageVisible = usePageVisible();
  const { isNavOpen } = useLayoutContext();
  const { isPlay } = useMusicContext();

  const wave = useRef<HTMLDivElement>(null);
  const rectRefs = useRef<SVGRectElement[]>([]);
  const tweens = useRef<gsap.core.Timeline[]>([]);
  const pauseTween = useRef<gsap.core.Tween | null>(null);

  const playWave = () => {
    if (pauseTween.current?.isActive) {
      pauseTween.current?.pause();
    }
    tweens.current?.forEach((t) => t.restart());
  };

  const stopWave = () => {
    tweens.current?.forEach((t) => t.pause());
    pauseTween.current?.restart();
  };

  useEffect(() => {
    // initialize tweens
    rectRefs.current.forEach((rect, i) => {
      tweens.current.push(
        gsap
          .timeline({
            paused: true,
            defaults: { repeat: -1, duration: 1.2, yoyo: true, ease: "none" },
          })
          .to(rect, {
            scaleY: 1,
            delay: i * 0.2,
            y: 0,
          })
          .to(rect, {
            scaleY: 0.2,
            y: 7,
          })
      );
    });

    pauseTween.current = gsap.to(rectRefs.current, {
      scaleY: 0.2,
      y: 7,
      paused: true,
      duration: 1,
    });

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
        className={
          isNavOpen
            ? "[&>rect]:fill-gray-300"
            : "[&>rect]:fill-gray-700 dark:[&>rect]:fill-gray-300"
        }>
        <WaveBars rectRefs={rectRefs} />
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
        "control-btn | relative grid h-(--btn-height) w-(--btn-width) place-items-center rounded-full border border-solid [&>svg]:h-[18px] [&>svg]:w-[18px]",
        isNavOpen
          ? "border-d-text after:bg-d-text [&>svg]:fill-d-text"
          : "border-text after:bg-text dark:border-d-text dark:after:bg-d-text [&>svg]:fill-text dark:[&>svg]:fill-d-text"
      )}
      onClick={onClick}
      data-play={isPlay}
      disabled={isDisable}
      aria-label="Toggle background music"
      aria-pressed={isPlay}>
      <RiMusicFill />
    </button>
  );
}

function MusicControl() {
  const isPageVisible = usePageVisible();
  const { isPlay, setIsPlay, setIsDisable } = useMusicContext();
  const sound = useRef<Howl | null>(null);

  function playMusic() {
    sound.current?.play();
  }

  function stopMusic() {
    sound.current?.pause();
  }

  const handleClick = () => {
    if (isPlay) {
      stopMusic();
    } else {
      playMusic();
    }
  };

  function handleAutoPlay() {
    if (!sound.current || isPlay) return;

    if (sound.current.state() === "loading") {
      sound.current.once("load", () => {
        playMusic();
      });
    }

    if (sound.current.state() === "loaded") {
      playMusic();
    }
  }

  useEffect(() => {
    // initialize
    Howler.volume(0.2);

    const s = new Howl({
      src: MUSIC_PLAYLIST.map((t) => t.path),
      loop: true,
      volume: 0.2,
    });

    sound.current = s;

    const handleLoad = () => setIsDisable(false);
    const handlePlay = () => setIsPlay(true);
    const handlePause = () => setIsPlay(false);

    s.on("load", handleLoad);
    s.on("play", handlePlay);
    s.on("pause", handlePause);

    return () => {
      s.off("load", handleLoad);
      s.off("play", handlePlay);
      s.off("pause", handlePause);

      s.unload();
    };
  }, []);

  useEffect(() => {
    if (!isPageVisible) {
      stopMusic();
    }
  }, [isPageVisible, stopMusic]);

  return (
    <>
      <button
        type="button"
        id="autoplayMusicBtn"
        tabIndex={-1}
        className="invisible"
        onClick={handleAutoPlay}></button>

      <TogglePlayBtn onClick={handleClick} />
    </>
  );
}

function Music() {
  const { isNavOpen } = useLayoutContext();

  return (
    <div className="hidden md:block">
      <div
        className={cn(
          "music | flex h-(--height) items-center gap-2 rounded-full border border-solid",
          isNavOpen ? "border-d-text" : "border-text dark:border-d-text"
        )}>
        <MusicWave />

        <MusicControl />
      </div>
    </div>
  );
}

export default function MusicWrapper() {
  const isMobile = useMobileViewport();

  if (isMobile) return null;

  return (
    <MusicProvider>
      <Music />
    </MusicProvider>
  );
}
