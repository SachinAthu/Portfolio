'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap-config';

import { useLayoutContext } from '@/context/LayoutContext';
import { cn } from '@/lib/common';

function MenuBtn() {
  const { isNavOpen, setIsNavOpen } = useLayoutContext();
  const openTimeline = useRef<gsap.core.Timeline>();
  const closeTimeline = useRef<gsap.core.Timeline>();
  const bar1 = useRef<HTMLDivElement>(null);
  const bar2 = useRef<HTMLDivElement>(null);
  const bar3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    openTimeline.current = gsap
      .timeline({ paused: true })
      .to(bar2.current, { scaleX: 0, duration: 0.1, ease: 'power1.in' })
      .to(bar1.current, { y: 12.5, duration: 0.2, ease: 'power1.in' }, '<')
      .to(bar3.current, { y: -12.5, duration: 0.2, ease: 'power1.in' }, '<')
      .to(bar1.current, { rotate: 45, duration: 0.6, ease: 'power2.out' })
      .to(bar3.current, { rotate: 135, duration: 0.6, ease: 'power2.out' }, '<');

    closeTimeline.current = gsap
      .timeline({ paused: true })
      .to(bar1.current, { rotate: 0, duration: 0.6, ease: 'power2.out' }, '<')
      .to(bar3.current, { rotate: 0, duration: 0.6, ease: 'power2.out' }, '<')
      .to(bar2.current, { scaleX: 1, duration: 0.1, ease: 'power1.in' })
      .to(bar1.current, { y: 0, duration: 0.2, ease: 'power1.in' }, '<')
      .to(bar3.current, { y: 0, duration: 0.2, ease: 'power1.in' }, '<');

    return () => {
      openTimeline.current?.kill();
      closeTimeline.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      openTimeline.current?.invalidate().restart();
    } else {
      closeTimeline.current?.invalidate().restart();
    }
  }, [isNavOpen]);

  return (
    <button
      type="button"
      className={cn(
        'menu-btn | relative block h-[1.75rem] w-9 overflow-hidden border-none bg-transparent 2xl:hidden',
        isNavOpen ? 'open' : ''
      )}
      aria-label="Navigation Menu"
      onClick={() => {
        setIsNavOpen(!isNavOpen);
      }}>
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="bar bar-1" ref={bar1}></div>
        <div className="bar bar-2" ref={bar2}></div>
        <div className="bar bar-3" ref={bar3}></div>
      </div>
    </button>
  );

  // return (
  //   <button
  //     type="button"
  //     className={cn(
  //       'menu-btn | relative block overflow-hidden border-none bg-transparent 2xl:hidden',
  //       isNavOpen ? 'open' : ''
  //     )}
  //     aria-label="Navigation Menu"
  //     onClick={() => {
  //       setIsNavOpen(!isNavOpen);
  //     }}>
  //     <div className="icon-left transition-colors"></div>
  //     <div className="icon-right"></div>
  //   </button>
  // );
}

export default function MenuBtnWrapper() {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return <MenuBtn />;
}
