'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { NavLinkType } from '@/lib/types';
import { NAV_LINKS } from '@/lib/data';

export type HomeContextType = {
  activeSection: NavLinkType | null;
  setActiveSection: (activeSection: NavLinkType | null) => void;
};

const HomeContext = createContext<HomeContextType | null>(null);

const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<NavLinkType | null>(NAV_LINKS[0]);

  useEffect(() => {
    return () => {
      setActiveSection(null);
    };
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
    }),
    [activeSection]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within an HomeProvider');
  }
  return context;
};

HomeContext.displayName = 'HomeContext';
HomeProvider.displayName = 'HomeProvider';

export { HomeProvider, useHomeContext };
