import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/common';

type CustomLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    icon?: boolean;
  };

export default function CustomLink({ children, className, href, target = '_self', icon = false }: CustomLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        'custom-link | relative block overflow-hidden border border-text dark:border-d-text',
        icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
        className || ''
      )}>
      {children}
      <span className="flair | pointer-events-none absolute left-0 top-0 z-[-1] aspect-[1] w-[400%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"></span>
    </Link>
  );
}
