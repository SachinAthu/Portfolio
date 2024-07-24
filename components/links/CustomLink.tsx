import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/common';

type CustomLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    icon?: boolean;
    download?: boolean;
  };

export default function CustomLink({
  children,
  className,
  href,
  target = '_self',
  icon = false,
  download = false,
}: CustomLinkProps) {
  if (download) {
    return (
      <a
        href={href}
        target={target}
        download
        className={cn(
          'custom-link | relative block w-fit overflow-hidden border border-text dark:border-d-text',
          icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
          className || ''
        )}>
        {icon ? (
          children
        ) : (
          <span className="relative block overflow-hidden">
            <span data-content={children} className="custom-button-content">
              {children}
            </span>
          </span>
        )}

        <span className="flair | pointer-events-none absolute left-0 top-0 z-[-1] aspect-[1] w-[400%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"></span>
      </a>
    );
  }
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        'custom-link | relative block w-fit overflow-hidden border border-text dark:border-d-text',
        icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
        className || ''
      )}>
      {icon ? (
        children
      ) : (
        <span className="relative block overflow-hidden">
          <span data-content={children} className="custom-button-content">
            {children}
          </span>
        </span>
      )}

      <span className="flair | pointer-events-none absolute left-0 top-0 z-[-1] aspect-[1] w-[400%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"></span>
    </Link>
  );
}
