import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
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
    setIsMobileV(window.innerWidth <= bp);
    window.addEventListener('resize', debounce(onResize));

    return () => {
      window.removeEventListener('resize', debounce(onResize));
    };
  }, [bp, onResize]);

  return isMobileV;
}

export function useDark() {
  const { theme } = useTheme();
  return theme === 'dark';
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

  const onResize = useCallback(() => {
    if (vw !== window.innerWidth) setVW(window.innerWidth);
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

    window.addEventListener('resize', debounce(onResize));

    return () => {
      window.removeEventListener('resize', debounce(onResize));
    };
  }, [onResize]);

  return vw;
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
