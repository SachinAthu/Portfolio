'use client';

import Link, { LinkProps } from 'next/link';
import SplitType from 'split-type';

import { cn } from '@/lib/common';
import { useEffect, useRef } from 'react';

type CustomLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    id: string;
    content?: string;
    icon?: boolean;
    download?: boolean;
  };

export default function CustomLink({
  id,
  content,
  children,
  className,
  href,
  target = '_self',
  icon = false,
  download = false,
  ...rest
}: CustomLinkProps) {
  const linkEl = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    SplitType.create(`#${id} .chars`, { types: 'chars' });

    const chars = linkEl.current?.querySelectorAll('.char') || [];

    for (let i = 0; i < chars.length; i++) {
      (chars[i] as HTMLElement).style.transitionDelay = `${i * 0.01}s`;
    }
  }, [id]);

  if (download) {
    return (
      <a
        id={id}
        ref={linkEl}
        href={href}
        target={target}
        download
        className={cn(
          'custom-button | relative block w-fit overflow-hidden border border-text dark:border-d-text',
          icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
          className || ''
        )}
        {...rest}>
        {icon ? (
          children
        ) : (
          <div className="inner | relative block" data-content={content}>
            {content}

            <div className="chars">{content}</div>
          </div>
        )}
      </a>
    );
  }

  return (
    <Link
      id={id}
      ref={linkEl}
      href={href}
      target={target}
      className={cn(
        'custom-button | relative block w-fit overflow-hidden border border-text dark:border-d-text',
        icon ? 'rounded-full p-2 [&>svg]:h-6 [&>svg]:w-6' : 'rounded-xl px-4 py-2',
        className || ''
      )}
      {...rest}>
      {icon ? (
        children
      ) : (
        <div className="inner | relative block" data-content={content}>
          {content}

          <div className="chars">{content}</div>
        </div>
      )}
    </Link>
  );
}
