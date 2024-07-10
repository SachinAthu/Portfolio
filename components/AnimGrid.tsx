'use client';

import { useEffect, useRef } from 'react';

import { useMobileViewport } from '@/lib/hooks';

export default function AnimGrid() {
  const animgrid = useRef<HTMLDivElement>(null);
  const isMobile = useMobileViewport();

  useEffect(() => {
    // create grid
    if (animgrid.current?.innerHTML) {
      animgrid.current.innerHTML = '';
    }

    const grid = isMobile ? { cols: 6, rows: 10 } : { cols: 16, rows: 10 };

    for (let i = 0; i < grid.cols * grid.rows; i++) {
      const d = document.createElement('div');
      d.className = 'box';
      animgrid.current?.appendChild(d);
    }
  }, [isMobile]);

  return (
    <div className="animgrid | pointer-events-none fixed left-0 top-0 h-lvh w-full">
      <div
        className="back-inner | grid h-full w-full grid-cols-6 grid-rows-10 gap-3 sm:gap-4 md:grid-cols-[repeat(16,1fr)] md:grid-rows-10 [&>div]:rounded-sm [&>div]:border [&>div]:border-text [&>div]:bg-transparent [&>div]:opacity-10 dark:[&>div]:border-d-text"
        ref={animgrid}></div>
    </div>
  );
}
