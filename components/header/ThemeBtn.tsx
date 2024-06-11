'use client';

import { useTheme } from 'next-themes';
import { RiSunFill, RiMoonClearFill } from 'react-icons/ri';

import { useDark } from '@/lib/hooks';

export default function ThemeBtn() {
  const { setTheme } = useTheme();
  const isDark = useDark();

  return (
    <button
      className="theme-btn | grid grid-cols-2 overflow-hidden rounded-full border border-solid border-text dark:border-d-text"
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
