'use client';

import React, { createContext, useContext, useEffect } from 'react';

import { useLayoutContext } from './LayoutContext';
import { navLinks } from '@/lib/data';

export type EventsContextType = {};

const EventsContext = createContext<EventsContextType | null>(null);

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const { scrollRef, setIsNavOpen } = useLayoutContext();

  useEffect(() => {
    // network state listener
    //

    // key press listener
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          setIsNavOpen(false);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          scrollRef.current?.scrollTo(`#${navLinks[parseInt(e.key) - 1].id}`);
          break;
        default:
          return;
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
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
