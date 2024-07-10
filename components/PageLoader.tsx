'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { useMobileViewport, useMounted } from '@/lib/hooks';
import { useLayoutContext } from '@/context/LayoutContext';

export default function PageLoader() {
  const loader = useRef<HTMLDivElement>(null);
  const loaderWrapper = useRef<HTMLDivElement>(null);
  const isMobile = useMobileViewport();
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
    function createGrid() {
      if (loader.current?.innerHTML) {
        loader.current.innerHTML = '';
      }

      const grid = isMobile ? { cols: 6, rows: 10 } : { cols: 16, rows: 10 };

      for (let i = 0; i < grid.cols * grid.rows; i++) {
        const d = document.createElement('div');
        d.className = 'box';
        loader.current?.appendChild(d);
      }
    }

    createGrid();

    // setup tweens
    openLoaderTween.current?.kill();
    closeLoaderTween.current?.kill();

    const grid: 'auto' | [number, number] | undefined = isMobile ? [10, 6] : [10, 16];

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
          grid,
          from: 'start',
        },
      })
      .to('.page-loader-inner', { gap: 0, duration: 0.2, delay: 0.2, ease: 'power2.out' });

    closeLoaderTween.current = gsap
      .timeline({
        paused: true,
      })
      .to('.page-loader-inner', { gap: isMobile ? 12 : 16, duration: 0.2, ease: 'power2.out' })
      .to('.page-loader-inner .box', {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.out',
        stagger: {
          amount: 1,
          grid,
          from: 'end',
        },
      })
      .set('.page-loader', { pointerEvents: 'none' });
  }, [isMobile]);

  // nav menu toggle
  useEffect(() => {
    if (!isMounted) return;

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
    <div ref={loaderWrapper} className="page-loader | pointer-events-none fixed left-0 top-0 z-30 h-lvh w-full">
      <div
        className="page-loader-inner | grid h-full w-full grid-cols-6 grid-rows-10 gap-3 sm:gap-4 md:grid-cols-[repeat(16,1fr)] md:grid-rows-10 [&>div]:border-none [&>div]:bg-nav [&>div]:opacity-0"
        ref={loader}></div>
    </div>
  );
}
