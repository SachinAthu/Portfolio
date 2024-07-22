'use client';

import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from 'react';

import { NAV_LINKS } from '@/lib/data';
import { NavLinkType } from '@/lib/types';

export type LayoutContextType = {
  isWelcome: boolean;
  isNavOpen: boolean;
  isNavShow: boolean;
  isPageLoading: boolean;
  isPlay: boolean;
  scrollRef: React.MutableRefObject<LocomotiveScroll | undefined>;
  activeSection: NavLinkType;

  setIsWelcome: (isWelcome: boolean) => void;
  setIsNavOpen: (isNavOpen: boolean) => void;
  setIsNavShow: (isNavShow: boolean) => void;
  setIsPageLoading: (isPageLoading: boolean) => void;
  setIsPlay: (isPlay: boolean) => void;
  setActiveSection: (activeSection: NavLinkType) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<LocomotiveScroll>();
  const [isWelcome, setIsWelcome] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavShow, setIsNavShow] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_LINKS[0]);

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
    };
  }, []);

  const value = useMemo(
    () => ({
      isWelcome,
      isNavOpen,
      isNavShow,
      isPageLoading,
      scrollRef,
      activeSection,
      isPlay,

      setIsWelcome,
      setIsNavOpen,
      setActiveSection,
      setIsNavShow,
      setIsPageLoading,
      setIsPlay,
    }),
    [isWelcome, isPlay, isNavOpen, isNavShow, isPageLoading, activeSection]
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
