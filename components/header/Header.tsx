'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

import MenuBtn from './MenuBtn';
import Music from './Music';
const ThemeBtn = dynamic(() => import('./ThemeBtn'), { ssr: false });
import { useLayoutContext } from '@/context/LayoutContext';
import { cn } from '@/lib/common';
import Logo from './Logo';

export default function Header() {
  const { isScrolled } = useLayoutContext();
  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  useEffect(() => {
    const state = Flip.getState('.header-inner-1, .header-inner-2');

    if (isScrolled) {
      header.current?.classList.add('scrolled');
    } else {
      header.current?.classList.remove('scrolled');
    }

    Flip.from(state, {
      absolute: true,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [isScrolled]);

  return (
    <>
      <header className="header | fixed left-0 right-0 top-0 z-20 flex h-[var(--header-height)] w-full items-center">
        <div
          ref={header}
          className={cn(
            'header-inner | mx-auto hidden h-[var(--header-content-height)] w-full max-w-[1536px] items-center justify-between rounded-full px-[3%] sm:flex sm:rounded-none 2xl:px-0'
          )}>
          <div className="header-inner-1 | flex h-full items-center justify-center rounded-full px-8 backdrop-blur-lg">
            <Logo />
          </div>

          <div className="header-inner-2 | flex h-full items-center gap-4 rounded-full px-8 backdrop-blur-lg">
            <Music />

            <ThemeBtn />

            <MenuBtn />
          </div>
        </div>

        <div className="flex h-[var(--header-content-height)] w-full sm:hidden">
          <div className="container h-full">
            <div className="flex h-full items-center justify-between rounded-full px-[2%] backdrop-blur-lg">
              <div className="flex h-full items-center justify-center rounded-full px-4">
                <Logo />
              </div>

              <div className="flex h-full items-center gap-4 rounded-full px-4">
                <Music />

                <ThemeBtn />

                <MenuBtn />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
