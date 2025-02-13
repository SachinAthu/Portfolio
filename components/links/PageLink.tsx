'use client';

import { useLayoutContext } from '@/context/LayoutContext';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

type PageLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function PageLink({ children, href, target = '_self', className }: PageLinkProps) {
  const { setIsPageLoading } = useLayoutContext();
  const router = useRouter();

  function clickHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    setIsPageLoading(true);

    setTimeout(() => {
      router.push(href);
    }, 1900);
  }

  return (
    <Link href={href} target={target} className={className || ''} onClick={clickHandler}>
      {children}
    </Link>
  );
}
