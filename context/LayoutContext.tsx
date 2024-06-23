'use client';

import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

import { navLinks } from '@/lib/data';
import { NavLinkType } from '@/lib/types';

export type LayoutContextType = {
  isScrolled: boolean;
  isNavOpen: boolean;
  isNavShow: boolean;
  scrollRef: React.MutableRefObject<LocomotiveScroll | undefined>;
  activeSection: NavLinkType;
  setIsScrolled: (isScrolled: boolean) => void;
  setIsNavOpen: (isNavOpen: boolean) => void;
  setActiveSection: (activeSection: NavLinkType) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavShow, setIsNavShow] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0]);

  const scrollRef = useRef<LocomotiveScroll>();
  const openNavMenuTween = useRef<gsap.core.Tween>();
  const closeNavMenuTween = useRef<gsap.core.Tween>();

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

    // setup tweens
    openNavMenuTween.current = gsap.to('.splash-screen-inner .box', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      paused: true,
      stagger: {
        amount: 0.7,
        grid: 'auto',
        from: 'start',
      },
      onComplete: () => {
        setIsNavShow(true);
      },
    });
    closeNavMenuTween.current = gsap.to('.splash-screen-inner .box', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      paused: true,
      stagger: {
        amount: 0.7,
        grid: 'auto',
        from: 'end',
      },
      onStart: () => {
        setIsNavShow(false);
      },
    });

    // window scroll listener
    function onScroll(e: Event) {
      const target = e.currentTarget as Window;
      const y = target.scrollY;

      if (y > 100) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    setIsScrolled(window.scrollY > 100);

    window.addEventListener('scroll', onScroll);

    return () => {
      scrollRef.current?.destroy();
      openNavMenuTween.current?.kill();
      closeNavMenuTween.current?.kill();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // nav menu toggle
  useEffect(() => {
    if (isNavOpen) {
      openNavMenuTween.current?.invalidate().restart();
    } else {
      closeNavMenuTween.current?.invalidate().restart();
    }
  }, [isNavOpen]);

  const value = useMemo(
    () => ({
      isScrolled,
      isNavOpen,
      isNavShow,
      scrollRef,
      activeSection,
      setIsScrolled,
      setIsNavOpen,
      setActiveSection,
    }),
    [isScrolled, isNavOpen, isNavShow, activeSection]
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
