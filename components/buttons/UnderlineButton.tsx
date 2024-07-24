'use client';

import { cn } from '@/lib/common';

export default function UnderlineButton({
  children,
  className,
  onClick,
  type,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type ? type : 'button'}
      className={cn('underline-button | relative text-base', className || '')}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
}
