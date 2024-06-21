'use client';

import { useTheme } from 'next-themes';
import { RiSunFill, RiMoonClearFill } from 'react-icons/ri';

import { useDark } from '@/lib/hooks';
import { useLayoutContext } from '@/context/LayoutContext';
import { cn } from '@/lib/common';

export default function ThemeBtn() {
  const { setTheme } = useTheme();
  const isDark = useDark();
  const { isNavOpen } = useLayoutContext();

  return (
    <button
      className={cn(
        'theme-btn | grid grid-cols-2 overflow-hidden rounded-full border border-solid',
        isNavOpen ? 'border-d-text' : 'border-text dark:border-d-text'
      )}
      type="button"
      aria-label="Theme Toggle"
      data-dark={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      <span className="icon icon-sun | flex h-full items-center justify-center">
        <RiSunFill />
      </span>

      <span className="icon icon-moon | flex h-full items-center justify-center">
        <RiMoonClearFill />
      </span>
    </button>
  );
}
