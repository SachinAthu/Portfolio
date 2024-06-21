'use client';

import { useEffect, useRef } from 'react';

import { useMobileViewport } from '@/lib/hooks';

export default function SplashScreen() {
  const splashScreen = useRef<HTMLDivElement>(null);
  const isMobile = useMobileViewport(true);

  useEffect(() => {
    // create grid
    createGrid();
  }, []);

  function createGrid() {
    if (splashScreen.current?.innerHTML) {
      splashScreen.current.innerHTML = '';
    }

    const grid = isMobile ? { cols: 6, rows: 10 } : { cols: 12, rows: 8 };

    for (let i = 0; i < grid.cols * grid.rows; i++) {
      const d = document.createElement('div');
      d.className = 'box';
      splashScreen.current?.appendChild(d);
    }
  }

  return (
    <div className="splash-screen | pointer-events-none fixed left-0 top-0 h-lvh w-screen">
      <div
        className="splash-screen-inner | [&>div]:bg-nav grid h-full w-full grid-cols-6 grid-rows-10 sm:grid-cols-12 sm:grid-rows-8 [&>div]:opacity-0"
        ref={splashScreen}></div>
    </div>
  );
}
