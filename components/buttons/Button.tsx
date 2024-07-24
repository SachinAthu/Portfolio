import { cn } from '@/lib/common';

export default function Button({
  children,
  className,
  onClick,
  type,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type ? type : 'button'}
      className={cn(
        'custom-button | relative block w-fit overflow-hidden rounded-xl border border-text px-4 py-2 dark:border-d-text',
        className || ''
      )}
      onClick={onClick}
      {...rest}>
      <span className="relative block overflow-hidden">
        <span data-content={children} className="custom-button-content">
          {children}
        </span>
      </span>

      <span className="flair | pointer-events-none absolute left-0 top-0 z-[-1] aspect-[1] w-[250%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"></span>
    </button>
  );
}
