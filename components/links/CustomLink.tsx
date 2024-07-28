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
          'custom-button | relative block w-fit overflow-hidden border border-text dark:border-d-text',
          icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
          className || ''
        )}>
        {icon ? (
          children
        ) : (
          <span className="inner | relative block">
            <span data-content={children} className="inner-content">
              {children}
            </span>
          </span>
        )}
      </a>
    );
  }
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        'custom-button | relative block w-fit overflow-hidden border border-text dark:border-d-text',
        icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
        className || ''
      )}>
      {icon ? (
        children
      ) : (
        <span className="inner | relative block">
          <span data-content={children} className="inner-content">
            {children}
          </span>
        </span>
      )}
    </Link>
  );
}
