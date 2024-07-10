import { cn } from '@/lib/common';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  direction?: 'up' | 'down';
};

export default function IconButton({ children, className, onClick, direction = 'up', ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'custom-icon-button | relative block overflow-hidden rounded-full border border-text bg-background p-2 dark:border-d-text dark:bg-d-background [&_svg]:h-6 [&_svg]:w-6',
        direction === 'down' ? 'down' : '',
        className || ''
      )}
      onClick={onClick}
      {...rest}>
      <span className="relative z-[1] flex items-center justify-center overflow-hidden">
        <span className="custom-icon-button-1">{children}</span>
        <span className="custom-icon-button-2">{children}</span>
        <span className="custom-icon-button-3">{children}</span>
      </span>

      <span className="flair | pointer-events-none absolute left-0 top-0 aspect-[1] w-[300%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"></span>
    </button>
  );
}
