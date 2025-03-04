'use client';

import { useEffect, useRef } from 'react';
import SplitType from 'split-type';

import { cn } from '@/lib/common';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  isLoading?: boolean;
};

export default function Button({
  id,
  children,
  className,
  onClick,
  type,
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) {
  const btnEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    SplitType.create(`#${id} .chars`, { types: 'chars' });

    const chars = btnEl.current?.querySelectorAll('.char') || [];

    for (let i = 0; i < chars.length; i++) {
      (chars[i] as HTMLElement).style.transitionDelay = `${i * 0.01}s`;
    }
  }, [id]);

  return (
    <button
      ref={btnEl}
      id={id}
      type={type ? type : 'button'}
      className={cn(
        'custom-button | relative block w-fit overflow-hidden rounded-full border border-text px-4 py-2 disabled:opacity-50 dark:border-d-text',
        className || '',
        isLoading ? 'loading' : ''
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}>
      <div className={cn('inner | relative block', isLoading ? 'opacity-0' : 'opacity-100')} data-content={children}>
        {children}

        <div className="chars">{children}</div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="loader"></span>
        </div>
      )}

      {/* <span className="flair | pointer-events-none absolute left-0 top-0 z-[-1] aspect-[1] w-[250%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"></span> */}
    </button>
  );
}
