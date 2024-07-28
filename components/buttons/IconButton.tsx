import { cn } from '@/lib/common';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  direction?: 'up' | 'down';
  isStatic?: boolean;
};

export default function IconButton({
  children,
  className,
  onClick,
  direction = 'up',
  isStatic = false,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'custom-icon-button | relative block overflow-hidden rounded-full border border-text bg-background p-2 dark:border-d-text dark:bg-d-background [&_svg]:h-6 [&_svg]:w-6',
        isStatic ? 'is-static' : direction === 'down' ? 'down' : '',
        className || ''
      )}
      onClick={onClick}
      {...rest}>
      <span className="inner | relative z-[1] flex items-center justify-center">
        <span className="inner-1">{children}</span>
        {!isStatic && (
          <>
            <span className="inner-2">{children}</span>
            <span className="inner-3">{children}</span>
          </>
        )}
      </span>
    </button>
  );
}
