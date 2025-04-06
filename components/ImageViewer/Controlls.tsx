'use client';

import React, { memo } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

import { cn } from '@/lib/common';
import { Toggle } from '..';

type ControllsButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

function ControllsButton({ children, onClick, disabled, className = '' }: ControllsButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-full p-2 text-lg transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-neutral-700 [&>svg]:h-6 [&>svg]:w-6',
        className
      )}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
}

type ControllsProps = {
  isShow: boolean;
  isHighRes: boolean;
  zoom: (isZoomIn: boolean) => void;
  toggleHighRes: (isHighRes: boolean) => void;
  reset: () => void;
};

const Controlls = ({ isShow, isHighRes, zoom, reset, toggleHighRes }: ControllsProps) => {
  return (
    <div
      className={cn(
        'absolute bottom-6 left-1/2 flex -translate-x-1/2 touch-none items-center gap-2 rounded-full border border-gray-300 bg-background px-5 py-4 transition-opacity duration-500 dark:border-gray-600 dark:bg-neutral-800 md:gap-3',
        isShow ? 'opacity-100' : 'opacity-0'
      )}>
      <div className="flex items-center gap-1 md:gap-2">
        <ControllsButton onClick={() => zoom(false)} disabled={!isShow}>
          <FiMinus />
        </ControllsButton>

        <ControllsButton onClick={() => zoom(true)} disabled={!isShow}>
          <FiPlus />
        </ControllsButton>
      </div>

      {isHighRes && (
        <Toggle id="toggleHighResCheckbox" value="highRes" onChange={toggleHighRes}>
          <>
            <span className="hidden whitespace-nowrap break-keep md:block">High Resolution</span>
            <span className="whitespace-nowrap break-keep md:hidden">High Res..</span>
          </>
        </Toggle>
      )}

      <ControllsButton onClick={reset} disabled={!isShow} className="px-4 py-2">
        Reset
      </ControllsButton>
    </div>
  );
};

export default memo(Controlls);
