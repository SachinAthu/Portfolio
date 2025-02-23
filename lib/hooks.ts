import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCookie } from 'cookies-next';

import { COOKIE_KEYS } from './data';

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function useMobile() {
  return getCookie(COOKIE_KEYS.IS_MOBILE) === 'true';
}

export function useMobileViewport(mini = false) {
  const [isMobileV, setIsMobileV] = useState(false);
  const bp = mini ? 640 : 768;

  const onResize = useCallback(() => {
    setIsMobileV(window.innerWidth <= bp);
  }, [bp]);

  function debounce(func: () => void) {
    let timer: number;

    return function (event: any) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  }

  useEffect(() => {
    setIsMobileV(window.innerWidth < bp);
    window.addEventListener('resize', debounce(onResize));

    return () => {
      window.removeEventListener('resize', debounce(onResize));
    };
  }, [bp, onResize]);

  return isMobileV;
}

export function useDark() {
  const [isDark, setIsDark] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  return isDark;
}

export function usePageVisible() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    function onVisibilityChange() {
      setIsVisible(!document.hidden);
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return isVisible;
}

export function useWindowResize() {
  const [vw, setVW] = useState(0);
  const [vh, setVH] = useState(0);

  const onResize = useCallback(() => {
    setVW(window.innerWidth);
    setVH(window.innerHeight);
  }, []);

  function debounce(func: () => void) {
    let timer: number;

    return function (event: any) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  }

  useEffect(() => {
    setVW(window.innerWidth);
    setVH(window.innerHeight);

    window.addEventListener('resize', debounce(onResize));

    return () => {
      window.removeEventListener('resize', debounce(onResize));
    };
  }, [onResize]);

  return { vw, vh };
}

export const useObserver = (selector: string, rootMargin?: string, defaultVal: boolean = false) => {
  const [isIntersecting, setIsIntersecting] = useState(defaultVal);

  useEffect(() => {
    let observer: IntersectionObserver;
    const element = document.querySelector(selector);

    if (element) {
      observer = new IntersectionObserver(
        (entries) => {
          setIsIntersecting(entries[0].isIntersecting);
        },
        {
          rootMargin,
        }
      );
      observer.observe(element);
    }

    return () => {
      if (element && observer) observer.unobserve(element);
    };
  }, [selector, rootMargin]);

  return isIntersecting;
};

export const useDebouncedCallback = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};
