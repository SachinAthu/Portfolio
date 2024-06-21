import { cn } from '@/lib/common';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  icon?: boolean;
};

export default function Button({ children, className, icon = false, onClick, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'custom-button | relative block overflow-hidden border border-text dark:border-d-text',
        icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
        className || ''
      )}
      onClick={onClick}
      {...rest}>
      {children}
      <span className="flair | pointer-events-none absolute left-0 top-0 z-[-1] aspect-[1] w-[400%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"></span>
    </button>
  );
}
