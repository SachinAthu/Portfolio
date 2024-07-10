'use client';

import { useRef } from 'react';

import { useLayoutContext } from '@/context/LayoutContext';
import { cn } from '@/lib/common';

export default function MenuBtn() {
  const { isNavOpen, setIsNavOpen } = useLayoutContext();
  const menuBtn = useRef<HTMLButtonElement>(null);

  function handleClick() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <button
      ref={menuBtn}
      type="button"
      className={cn('menu-btn relative block overflow-hidden border-none bg-transparent', isNavOpen ? 'open' : '')}
      aria-label="Navigation Menu"
      onClick={handleClick}>
      <div className="icon-left transition-colors"></div>
      <div className="icon-right"></div>
    </button>
  );
}
