'use client';

import { useEffect, useRef } from 'react';

import { useWindowResize } from '@/lib/hooks';
import { getAnimGridSize } from '@/lib/common';

export default function AnimGrid() {
  const animgrid = useRef<HTMLDivElement>(null);
  const vw = useWindowResize();

  useEffect(() => {
    // create grid
    if (animgrid.current?.innerHTML) {
      animgrid.current.innerHTML = '';
    }

    if (animgrid.current) {
      const grid = getAnimGridSize(vw);

      animgrid.current.style.gridTemplateColumns = `repeat(${grid.cols},1fr)`;
      animgrid.current.style.gridTemplateRows = `repeat(${grid.rows},1fr)`;

      for (let i = 0; i < grid.cols * grid.rows; i++) {
        const d = document.createElement('div');
        d.className = 'box';
        animgrid.current?.appendChild(d);
      }
    }
  }, [vw]);

  return (
    <div className="animgrid | pointer-events-none fixed left-0 top-0 z-[-10] h-lvh w-full">
      <div
        className="back-inner | grid h-full w-full gap-3 sm:gap-4 [&>div]:rounded-sm [&>div]:border [&>div]:border-text [&>div]:bg-transparent [&>div]:opacity-10 dark:[&>div]:border-d-text"
        ref={animgrid}></div>
    </div>
  );
}
