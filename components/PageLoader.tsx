'use client';

import { useCallback, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { usePathname } from 'next/navigation';

import { useWindowResize } from '@/lib/hooks';
import { useLayoutContext } from '@/context/LayoutContext';
import { getAnimGridSize } from '@/lib/common';

export default function PageLoader() {
  const loader = useRef<HTMLDivElement>(null);
  const loaderWrapper = useRef<HTMLDivElement>(null);
  const { vw } = useWindowResize();
  const pathname = usePathname();
  const { isNavOpen, isPageLoading, setIsNavShow, setIsPageLoading, setIsNavOpen } = useLayoutContext();

  const openLoaderTween = useRef<gsap.core.Timeline | null>(null);
  const closeLoaderTween = useRef<gsap.core.Timeline | null>(null);

  const createGrid = useCallback(() => {
    if (!loader.current) return;

    const grid = getAnimGridSize(window.innerWidth);

    loader.current.style.gridTemplateColumns = `repeat(${grid.cols},1fr)`;
    loader.current.style.gridTemplateRows = `repeat(${grid.rows},1fr)`;

    for (let i = 0; i < grid.cols * grid.rows; i++) {
      const b = document.createElement('div');
      b.className = 'box';
      b.style.opacity = isNavOpen ? '1' : '0';
      loader.current?.appendChild(b);
    }
  }, [isNavOpen]);

  useEffect(() => {
    // create grid
    createGrid();

    // setup tweens
    openLoaderTween.current = gsap
      .timeline({
        paused: true,
      })
      .set(loaderWrapper.current, { pointerEvents: 'auto' })
      .to('.page-loader-inner .box', {
        opacity: 1,
        scale: 1.01,
        ease: 'power2.out',
        stagger: {
          amount: 1,
          grid: 'auto',
          from: 'start',
        },
      })
      .to(loader.current, { gap: 0, duration: 0.2, delay: 0.2, ease: 'power2.out' });

    closeLoaderTween.current = gsap
      .timeline({
        paused: true,
      })
      .to(loader.current, { gap: vw < 768 ? 12 : 16, duration: 0.2, ease: 'power2.out' })
      .to('.page-loader-inner .box', {
        opacity: 0,
        scale: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        stagger: {
          amount: 1,
          grid: 'auto',
          from: 'end',
        },
      })
      .set(loaderWrapper.current, { pointerEvents: 'none' });

    const loaderRef = loader.current;

    return () => {
      if (loaderRef?.innerHTML) {
        loaderRef.innerHTML = '';
      }
      openLoaderTween.current?.kill();
      closeLoaderTween.current?.kill();
      openLoaderTween.current = null;
      closeLoaderTween.current = null;
    };
  }, [vw]);

  useEffect(() => {
    if (vw >= 1536) {
      // close nav menu
      setIsNavOpen(false);
    }
  }, [vw, setIsNavOpen]);

  // nav menu toggle
  useEffect(() => {
    loaderWrapper.current?.classList.remove('z-[70]');
    console.log(isNavOpen);

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
  }, [isNavOpen, setIsNavShow]);

  // page load
  useEffect(() => {
    if (isPageLoading) {
      loaderWrapper.current?.classList.add('z-[70]');
      openLoaderTween.current?.invalidate().restart();
    } else {
      closeLoaderTween.current?.invalidate().restart();
      setTimeout(() => {
        loaderWrapper.current?.classList.remove('z-[70]');
      }, 1900);
    }
  }, [isPageLoading]);

  useEffect(() => {
    setIsPageLoading(false);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 5000);
  }, [pathname, setIsPageLoading]);

  return (
    <>
      <div ref={loaderWrapper} className="page-loader | pointer-events-none fixed left-0 top-0 z-30 h-lvh w-full">
        <div
          className="page-loader-inner | grid h-full w-full gap-3 sm:gap-4 [&>div]:scale-[0.8] [&>div]:border-none [&>div]:bg-nav"
          ref={loader}></div>
      </div>

      <div className="page-loader-2 | pointer-events-none fixed left-0 top-0 z-[80] h-lvh w-full bg-background opacity-0 dark:bg-d-background"></div>
    </>
  );
}
