'use client';

import { useLayoutContext } from '@/context/LayoutContext';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

type DelayedLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function DelayedLink({ children, href, target = '_self', className }: DelayedLinkProps) {
  const { setIsPageLoading } = useLayoutContext();
  const router = useRouter();

  function clickHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    setIsPageLoading(true);

    setTimeout(() => {
      router.push(href);

      setTimeout(() => {
        setIsPageLoading(false);
      }, 1000);
    }, 1900);
  }

  return (
    <Link href={href} target={target} className={className || ''} onClick={clickHandler}>
      {children}
    </Link>
  );
}
