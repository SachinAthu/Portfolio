'use client';

import { useRouter } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { useLayoutContext } from '@/context/LayoutContext';

type PageLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { short?: boolean };

export default function PageLink({
  children,
  href,
  target = '_self',
  className,
  short = false,
  ...rest
}: PageLinkProps) {
  const { setIsPageLoading, setIsPageLoading2 } = useLayoutContext();
  const router = useRouter();
  const pathname = usePathname();

  function clickHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    if (pathname === href) return;

    if (short) {
      setIsPageLoading2(true);
      setTimeout(() => {
        router.push(href);
      }, 1000);
    } else {
      setIsPageLoading(true);
      setTimeout(() => {
        router.push(href);
      }, 1900);
    }
  }

  return (
    <Link href={href} target={target} className={className || ''} onClick={clickHandler} {...rest}>
      {children}
    </Link>
  );
}
