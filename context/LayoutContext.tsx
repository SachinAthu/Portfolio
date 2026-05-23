"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap-config";
import type LocomotiveScroll from "locomotive-scroll";

import { useDebouncedCallback, useMobile } from "@/lib/hooks";
import { NAV_LINKS } from "@/lib/data";

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
  const locoScrollRef = useRef<LocomotiveScroll | null>(null);

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
    const header = document.getElementById("app-header");
    const navMenu = document.getElementById("app-nav-menu");

    if (!header || !navMenu) return;

    // disable body scrolling when nav menu open
    if (isNavOpen) {
      document.body.classList.add("overflow-hidden");
      const scrollBarWidth = isMobile
        ? 0
        : window.innerWidth - document.documentElement.clientWidth || 12;
      header.style.paddingRight = `${scrollBarWidth}px`;
      navMenu.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      header.style.paddingRight = "";
      navMenu.style.paddingRight = "";
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      header.style.paddingRight = "";
      navMenu.style.paddingRight = "";
    };
  }, [isNavOpen, isMobile]);

  useEffect(() => {
    let isMounted = true;
    let scrollInstance: LocomotiveScroll | null = null;

    // setup locomotive scroll
    const initLocomotive = async () => {
      const LocomotiveScrollClass = (await import("locomotive-scroll")).default;
      scrollInstance = new LocomotiveScrollClass({
        lenisOptions: {
          duration: 1.5,
        },
      });

      if (!isMounted) {
        scrollInstance.destroy();
        return;
      }

      // for development comment out
      scrollInstance.scrollTo(0, { duration: 0 });
      locoScrollRef.current = scrollInstance;
      setLocoScroll(scrollInstance);
    };

    initLocomotive();

    return () => {
      isMounted = false;
      locoScrollRef.current?.destroy();
      locoScrollRef.current = null;
      setLocoScroll(null);
    };
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (pathname !== "/") return;

      switch (e.key) {
        case "Escape":
          setIsNavOpen(false);
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6": {
          const navLink = NAV_LINKS[parseInt(e.key, 10) - 1];
          if (!navLink) return;
          locoScrollRef.current?.scrollTo(`#${navLink.id}`);
          setIsNavOpen(false);
          break;
        }
        default:
          return;
      }
    },
    [pathname]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    const onPopState = () => {
      setIsPageLoading2(true);
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isMobile, onScroll]);

  useEffect(() => {
    queueMicrotask(() => {
      setIsPageLoading(false);
      setIsPageLoading2(false);
    });
  }, [pathname]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

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
    [
      isWelcome,
      isNavOpen,
      isNavShow,
      isScrolled,
      isPageLoading,
      isPageLoading2,
      locoScroll,
    ]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within an LayoutProvider");
  }
  return context;
};

LayoutContext.displayName = "LayoutContext";
LayoutProvider.displayName = "LayoutProvider";

export { LayoutProvider, useLayoutContext };
