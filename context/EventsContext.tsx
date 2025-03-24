'use client';

import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useLayoutContext } from './LayoutContext';
import { NAV_LINKS } from '@/lib/data';

export type EventsContextType = {};

const EventsContext = createContext<EventsContextType | null>(null);

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const { scrollRef, setIsPageLoading2, setIsNavOpen } = useLayoutContext();
  const pathname = usePathname();

  // key press listener
  const onKeyDown = useCallback(
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
            scrollRef.current?.scrollTo(`#${NAV_LINKS[parseInt(e.key) - 1].id}`);
            setIsNavOpen(false);
          }
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

    function onPopState(e: PopStateEvent) {
      setIsPageLoading2(true);
    }

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [setIsPageLoading2]);

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
