'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { useMounted, useWindowResize } from '@/lib/hooks';
import { useLayoutContext } from '@/context/LayoutContext';
import { getAnimGridSize } from '@/lib/common';

export default function PageLoader() {
  const loader = useRef<HTMLDivElement>(null);
  const loaderWrapper = useRef<HTMLDivElement>(null);
  const isNavOpenRef = useRef(false);
  const vw = useWindowResize();
  const isMounted = useMounted();
  const { isNavOpen, isPageLoading, setIsNavShow } = useLayoutContext();

  const openLoaderTween = useRef<gsap.core.Timeline>();
  const closeLoaderTween = useRef<gsap.core.Timeline>();

  useEffect(() => {
    return () => {
      openLoaderTween.current?.kill();
      closeLoaderTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    // create grid
    const grid = getAnimGridSize(vw);

    if (loader.current) {
      loader.current.style.gridTemplateColumns = `repeat(${grid.cols},1fr)`;
      loader.current.style.gridTemplateRows = `repeat(${grid.rows},1fr)`;

      for (let i = 0; i < grid.cols * grid.rows; i++) {
        const d = document.createElement('div');
        d.className = 'box';
        d.style.opacity = isNavOpenRef.current ? '1' : '0';
        loader.current?.appendChild(d);
      }
    }

    // setup tweens
    openLoaderTween.current = gsap
      .timeline({
        paused: true,
      })
      .set('.page-loader', { pointerEvents: 'auto' })
      .to('.page-loader-inner .box', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: {
          amount: 1,
          grid: [grid.rows, grid.cols],
          from: 'start',
        },
      })
      .to('.page-loader-inner', { gap: 0, duration: 0.2, delay: 0.2, ease: 'power2.out' });

    closeLoaderTween.current = gsap
      .timeline({
        paused: true,
      })
      .to('.page-loader-inner', { gap: vw < 768 ? 12 : 16, duration: 0.2, ease: 'power2.out' })
      .to('.page-loader-inner .box', {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.out',
        stagger: {
          amount: 1,
          grid: [grid.rows, grid.cols],
          from: 'end',
        },
      })
      .set('.page-loader', { pointerEvents: 'none' });

    return () => {
      if (loader.current?.innerHTML) {
        loader.current.innerHTML = '';
      }
      openLoaderTween.current?.kill();
      closeLoaderTween.current?.kill();
    };
  }, [vw]);

  // nav menu toggle
  useEffect(() => {
    if (!isMounted) return;

    isNavOpenRef.current = isNavOpen;
    loaderWrapper.current?.classList.remove('z-[70]');

    if (isNavOpen) {
      openLoaderTween.current?.invalidate().restart();
      setTimeout(() => {
        setIsNavShow(true);
      }, 2500);
    } else {
      setIsNavShow(false);
      setTimeout(() => {
        closeLoaderTween.current?.invalidate().restart();
      }, 2000);
    }
  }, [isNavOpen, isMounted]);

  // page load
  useEffect(() => {
    if (!isMounted) return;

    if (isPageLoading) {
      loaderWrapper.current?.classList.add('z-[70]');
      openLoaderTween.current?.invalidate().restart();
    } else {
      closeLoaderTween.current?.invalidate().restart();
      setTimeout(() => {
        loaderWrapper.current?.classList.remove('z-[70]');
      }, 1900);
    }
  }, [isPageLoading, isMounted]);

  return (
    <>
      <div ref={loaderWrapper} className="page-loader | pointer-events-none fixed left-0 top-0 z-30 h-lvh w-full">
        <div
          className="page-loader-inner | grid h-full w-full gap-3 sm:gap-4 [&>div]:border-none [&>div]:bg-nav"
          ref={loader}></div>
      </div>

      <div className="page-loader-2 | pointer-events-none fixed left-0 top-0 z-[80] h-lvh w-full bg-background opacity-0 dark:bg-d-background"></div>
    </>
  );
}
