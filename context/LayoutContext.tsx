'use client';

import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap-config';

import { useDebouncedCallback, useMobile } from '@/lib/hooks';
import { NAV_LINKS } from '@/lib/data';

export type LayoutContextType = {
  isWelcome: boolean;
  isNavOpen: boolean;
  isNavShow: boolean;
  isScrolled: boolean;
  isPageLoading: boolean;
  isPageLoading2: boolean;
  locoScroll: LocomotiveScroll | null;

  setIsWelcome: (isWelcome: boolean) => void;
  setIsNavOpen: (isNavOpen: boolean) => void;
  setIsNavShow: (isNavShow: boolean) => void;
  setIsScrolled: (isScrolled: boolean) => void;
  setIsPageLoading: (isPageLoading: boolean) => void;
  setIsPageLoading2: (isPageLoading: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMobile();
  const pathname = usePathname();

  const [locoScroll, setLocoScroll] = useState<LocomotiveScroll | null>(null);
  const [isWelcome, setIsWelcome] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavShow, setIsNavShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isPageLoading2, setIsPageLoading2] = useState(false);

  const onScroll = useDebouncedCallback(() => {
    setIsScrolled(window.scrollY > 600);
  }, 100);

  useEffect(() => {
    const header = document.getElementById('app-header');
    const navMenu = document.getElementById('app-nav-menu');

    if (!header || !navMenu) return;

    // disable body scrolling when nav menu open
    if (isNavOpen) {
      document.body.classList.add('overflow-hidden');
      const scrollBarWidth = isMobile ? 0 : window.innerWidth - document.documentElement.clientWidth || 12;
      header.style.paddingRight = `${scrollBarWidth}px`;
      navMenu.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove('overflow-hidden');
      header.style.paddingRight = '';
      navMenu.style.paddingRight = '';
    }
  }, [isNavOpen]);

  useEffect(() => {
    // setup locomotive scroll
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const scroll = new LocomotiveScroll({
        // @ts-ignore
        lenisOptions: {
          duration: 1.5,
        },
      });
      setLocoScroll(scroll);
    })();

    const controller = new AbortController();

    // network state listener
    //

    // key press listener
    window.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            if (pathname === '/') {
              setIsNavOpen(false);
            }
            break;
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
            if (pathname === '/') {
              locoScroll?.scrollTo(`#${NAV_LINKS[parseInt(e.key) - 1].id}`);
              setIsNavOpen(false);
            }
            break;
          default:
            return;
        }
      },
      { signal: controller.signal }
    );

    // browser back and forward button click listener
    window.addEventListener(
      'popstate',
      () => {
        setIsPageLoading2(true);
      },
      { signal: controller.signal }
    );

    if (!isMobile) {
      document.addEventListener('scroll', onScroll, { signal: controller.signal });
    }

    // reset page loading state
    setIsPageLoading(false);
    setIsPageLoading2(false);

    // refresh Scrolltrigger
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 5000);

    return () => {
      locoScroll?.destroy();
      setLocoScroll(null);
      controller.abort();
    };
  }, [pathname, isMobile]);

  const value = useMemo(
    () => ({
      isWelcome,
      isNavOpen,
      isNavShow,
      isScrolled,
      isPageLoading,
      isPageLoading2,
      locoScroll,

      setIsWelcome,
      setIsNavOpen,
      setIsNavShow,
      setIsScrolled,
      setIsPageLoading,
      setIsPageLoading2,
    }),
    [isWelcome, isNavOpen, isNavShow, isScrolled, isPageLoading, isPageLoading2, locoScroll]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within an LayoutProvider');
  }
  return context;
};

LayoutContext.displayName = 'LayoutContext';
LayoutProvider.displayName = 'LayoutProvider';

export { LayoutProvider, useLayoutContext };
