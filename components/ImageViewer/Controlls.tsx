'use client';

import React, { memo } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

import { cn } from '@/lib/common';

type ControllsProps = {
  isShow: boolean;
  zoom: (isZoomIn: boolean) => void;
  reset: () => void;
};

const Controlls = React.forwardRef(({ isShow, zoom, reset }: ControllsProps) => {
  return (
    <div
      className={cn(
        'absolute bottom-6 left-1/2 flex -translate-x-1/2 touch-none items-center gap-2 rounded-full border border-gray-300 bg-background px-5 py-4 transition-opacity duration-500 dark:border-gray-600 dark:bg-neutral-800',
        isShow ? 'opacity-100' : 'opacity-0'
      )}>
      <button
        type="button"
        className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-neutral-700 [&>svg]:h-6 [&>svg]:w-6"
        onClick={() => zoom(true)}>
        <FiPlus />
      </button>

      <button
        type="button"
        className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-neutral-700 [&>svg]:h-6 [&>svg]:w-6"
        onClick={() => zoom(false)}>
        <FiMinus />
      </button>

      <button
        type="button"
        className="rounded-full px-4 py-2 text-lg transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
        onClick={reset}>
        Reset
      </button>
    </div>
  );
});

export default memo(Controlls);
