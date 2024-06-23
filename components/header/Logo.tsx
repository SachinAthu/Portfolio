import Link from 'next/link';

import { useLayoutContext } from '@/context/LayoutContext';
import { cn } from '@/lib/common';

export default function Logo() {
  const { isNavOpen } = useLayoutContext();

  return (
    <Link
      href={'/'}
      className={cn(
        'flex items-center font-heading text-xl font-bold transition-colors duration-500',
        isNavOpen ? 'text-zinc-200' : 'text-gray-900 dark:text-zinc-200'
      )}>
      <span className="hidden sm:block">SachinAthu</span>
      <span className="sm:hidden">Sachin</span>
      <span className="mx-1 animate-[logo_8s_ease_infinite] dark:animate-[logo-d_8s_ease_infinite]">_</span>
      <span>;</span>
    </Link>
  );
}
