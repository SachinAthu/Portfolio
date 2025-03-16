'use client';

import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { NAV_LINKS } from '@/lib/data';
import { NavLinkType } from '@/lib/types';
import { useMobile } from '@/lib/hooks';

export type LayoutContextType = {
  isWelcome: boolean;
  isNavOpen: boolean;
  isNavShow: boolean;
  isScrolled: boolean;
  isPageLoading: boolean;
  scrollRef: React.MutableRefObject<LocomotiveScroll | undefined>;
  activeSection: NavLinkType | null;

  setIsWelcome: (isWelcome: boolean) => void;
  setIsNavOpen: (isNavOpen: boolean) => void;
  setIsNavShow: (isNavShow: boolean) => void;
  setIsScrolled: (isScrolled: boolean) => void;
  setIsPageLoading: (isPageLoading: boolean) => void;
  setActiveSection: (activeSection: NavLinkType | null) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMobile();
  const pathname = usePathname();

  const scrollRef = useRef<LocomotiveScroll>();
  const [isWelcome, setIsWelcome] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavShow, setIsNavShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<NavLinkType | null>(NAV_LINKS[0]);

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
    setIsPageLoading(false);

    if (pathname !== '/') {
      setActiveSection(null);
    }

    setTimeout(() => {
      // refresh Scrolltrigger
      (async () => {
        const { ScrollTrigger } = await import('@/lib/gsap-config');
        ScrollTrigger.refresh();
      })();
    }, 5000);
  }, [pathname]);

  useEffect(() => {
    // setup locomotive scroll
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scrollRef.current = new LocomotiveScroll({
        // @ts-ignore
        lenisOptions: {
          duration: 1.5,
        },
      });
    })();

    return () => {
      scrollRef.current?.destroy();
      setActiveSection(null);
    };
  }, []);

  const value = useMemo(
    () => ({
      isWelcome,
      isNavOpen,
      isNavShow,
      isScrolled,
      isPageLoading,
      scrollRef,
      activeSection,

      setIsWelcome,
      setIsNavOpen,
      setActiveSection,
      setIsNavShow,
      setIsScrolled,
      setIsPageLoading,
    }),
    [isWelcome, isNavOpen, isNavShow, isScrolled, isPageLoading, activeSection]
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
