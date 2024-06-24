'use client';

import { useLayoutContext } from '@/context/LayoutContext';
import { cn } from '@/lib/common';

export default function MenuBtn() {
  const { isNavOpen, setIsNavOpen } = useLayoutContext();

  return (
    <button
      type="button"
      className={cn(
        'menu-btn relative block overflow-hidden border-none bg-transparent 2xl:hidden',
        isNavOpen ? 'open' : ''
      )}
      aria-label="Navigation Menu"
      onClick={() => setIsNavOpen(!isNavOpen)}>
      <div className="icon-left transition-colors"></div>
      <div className="icon-right"></div>
    </button>
  );
}
