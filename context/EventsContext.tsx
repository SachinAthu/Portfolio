'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import { usePathname } from 'next/navigation';

import { useLayoutContext } from './LayoutContext';
import { NAV_LINKS } from '@/lib/data';

export type EventsContextType = {};

const EventsContext = createContext<EventsContextType | null>(null);

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const { scrollRef, setIsNavOpen } = useLayoutContext();
  const shortPageLoaderTween = useRef<gsap.core.Timeline>();
  const pathname = usePathname();

  // key press listener
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          setIsNavOpen(false);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          if (pathname === '/') scrollRef.current?.scrollTo(`#${NAV_LINKS[parseInt(e.key) - 1].id}`);
          break;
        default:
          return;
      }
    },
    [pathname]
  );

  useEffect(() => {
    // network state listener
    //

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    // browser back and forward button click listener
    shortPageLoaderTween.current = gsap
      .timeline({
        paused: true,
      })
      .set('.page-loader-2', {
        opacity: 1,
      })
      .to('.page-loader-2', {
        delay: 1,
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out',
      });

    function onPopState(e: PopStateEvent) {
      shortPageLoaderTween.current?.invalidate().restart();
    }

    window.addEventListener('popstate', onPopState);

    const shortPageLoaderTweenRef = shortPageLoaderTween.current;

    return () => {
      window.removeEventListener('popstate', onPopState);
      shortPageLoaderTweenRef.kill();
      shortPageLoaderTween.current = undefined;
    };
  }, []);

  return <EventsContext.Provider value={null}>{children}</EventsContext.Provider>;
};

const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEventsContext must be used within an EventsProvider');
  }
  return context;
};

EventsContext.displayName = 'EventsContext';
EventsProvider.displayName = 'EventsProvider';

export { EventsProvider, useEventsContext };
