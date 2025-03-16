'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { Flip } from 'gsap/Flip';
import { usePathname } from 'next/navigation';

import MenuBtn from './MenuBtn';
import Music from './Music';
import ThemeBtn from './ThemeBtn';
import Logo from './Logo';
import { useLayoutContext } from '@/context/LayoutContext';
import { cn } from '@/lib/common';
import { useMobileViewport } from '@/lib/hooks';

function HeaderMobile() {
  return (
    <div className="h-[var(--header-content-height)] w-full">
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
  );
}

function HeaderDesktop() {
  const { activeSection, setIsScrolled } = useLayoutContext();
  const header = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      gsap.registerPlugin(Flip);

      const state = Flip.getState('.header-inner-1, .header-inner-2');

      if ((activeSection && activeSection.id !== 'hero') || pathname !== '/') {
        header.current?.classList.add('scrolled');
        setIsScrolled(true);
      } else {
        header.current?.classList.remove('scrolled');
        setIsScrolled(false);
      }

      Flip.from(state, {
        absolute: true,
        duration: 0.5,
        ease: 'power2.out',
      });
    },
    { dependencies: [activeSection, pathname, setIsScrolled] }
  );

  return (
    <div
      ref={header}
      className={cn(
        'header-inner | container-wide flex h-[var(--header-content-height)] w-full items-center justify-between rounded-full px-[3%] sm:rounded-none 2xl:px-0'
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
  );
}

export default function HeaderWraper() {
  const isMobile = useMobileViewport(true);

  return (
    <header
      id="app-header"
      className="header | fixed left-0 right-0 top-0 z-50 flex h-[var(--header-height)] w-full items-center">
      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
    </header>
  );
}
