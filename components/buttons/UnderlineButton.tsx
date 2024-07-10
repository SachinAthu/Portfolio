'use client';

import { cn } from '@/lib/common';

type UnderlineButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function UnderlineButton({ children, className, onClick, type, ...rest }: UnderlineButtonProps) {
  return (
    <button
      type={type || 'button'}
      className={cn('underline-button | relative text-base', className || '')}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
}
