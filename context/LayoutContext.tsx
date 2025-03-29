'use client';

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap-config';

import { useDebouncedCallback, useMobile } from '@/lib/hooks';

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

    setIsPageLoading(false);
    setIsPageLoading2(false);

    // refresh Scrolltrigger
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 5000);

    return () => {
      locoScroll?.destroy();
      setLocoScroll(null);
    };
  }, [pathname]);

  const onScroll = useDebouncedCallback(() => {
    setIsScrolled(window.scrollY > 600);
  }, 100);

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('scroll', onScroll);
    }

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, isMobile]);

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
