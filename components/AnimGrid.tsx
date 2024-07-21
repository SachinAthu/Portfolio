'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { usePageVisible, useWindowResize } from '@/lib/hooks';
import { getAnimGridSize } from '@/lib/common';
import { useLayoutContext } from '@/context/LayoutContext';

export default function AnimGrid() {
  const animgrid = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const vw = useWindowResize();
  const isPageVisible = usePageVisible();
  const { activeSection } = useLayoutContext();

  const gridAnim = useRef<gsap.core.Timeline>();
  const increseOpa = useRef<gsap.core.Tween>();
  const decreseOpa = useRef<gsap.core.Tween>();

  useEffect(() => {
    increseOpa.current = gsap.to('.animgrid-inner', {
      opacity: 1,
      duration: 0.3,
      paused: true,
    });
    decreseOpa.current = gsap.to('.animgrid-inner', {
      opacity: 0.5,
      duration: 0.3,
      paused: true,
    });

    return () => {
      gridAnim.current?.kill();
      increseOpa.current?.kill();
      decreseOpa.current?.kill();
    };
  }, []);

  useEffect(() => {
    // create grid
    const grid = getAnimGridSize(vw);

    if (animgrid.current) {
      animgrid.current.style.gridTemplateColumns = `repeat(${grid.cols},1fr)`;
      animgrid.current.style.gridTemplateRows = `repeat(${grid.rows},1fr)`;

      for (let i = 0; i < grid.cols * grid.rows; i++) {
        const d = document.createElement('div');
        d.className = 'box';
        animgrid.current?.appendChild(d);
      }
    }

    // comment only for development

    // animate animgrid
    // gridAnim.current = gsap
    //   .timeline({ delay: 5, repeat: -1, repeatDelay: 10 })
    //   .to('.animgrid-inner .box', {
    //     opacity: 0.5,
    //     duration: 0.8,
    //     ease: 'power2.out',
    //     stagger: {
    //       amount: 2,
    //       grid: [grid.rows, grid.cols],
    //       from: 'start',
    //     },
    //   })
    //   .to(
    //     '.animgrid-inner .box',
    //     {
    //       opacity: 0.1,
    //       duration: 0.8,
    //       ease: 'power2.out',
    //       stagger: {
    //         amount: 2,
    //         grid: [grid.rows, grid.cols],
    //         from: 'start',
    //       },
    //     },
    //     '-=10%'
    //   );

    return () => {
      if (animgrid.current?.innerHTML) {
        animgrid.current.innerHTML = '';
      }
      gridAnim.current?.kill();
    };
  }, [vw]);

  // comment only for development

  // useEffect(() => {
  //   if (isPageVisible) {
  //     gridAnim.current?.resume();
  //   } else {
  //     gridAnim.current?.pause();
  //   }
  // }, [isPageVisible]);

  useEffect(() => {
    if (activeSection.id === 'hero') {
      increseOpa.current?.invalidate().restart();
    } else {
      decreseOpa.current?.invalidate().restart();
    }
  }, [activeSection]);

  return (
    <div className="animgrid | pointer-events-none fixed left-0 top-0 z-[-10] h-lvh w-full" ref={container}>
      <div
        className="animgrid-inner | grid h-full w-full gap-3 sm:gap-4 [&>div]:rounded-sm [&>div]:border [&>div]:border-text [&>div]:bg-transparent [&>div]:opacity-10 dark:[&>div]:border-d-text"
        ref={animgrid}></div>
    </div>
  );
}
