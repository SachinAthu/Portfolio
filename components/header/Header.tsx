'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import MenuBtn from './MenuBtn';
import Music from './Music';
const ThemeBtn = dynamic(() => import('./ThemeBtn'), { ssr: false });

export default function Header() {
  const logo = (
    <Link href={'/'} className="flex items-center font-heading text-xl font-bold text-gray-900 dark:text-zinc-200">
      <span className="hidden sm:block">SachinAthu</span>
      <span className="sm:hidden">Sachin</span>
      <span className="mx-1 animate-[logo_8s_ease_infinite] dark:animate-[logo-d_8s_ease_infinite]">_</span>;
    </Link>
  );

  return (
    <>
      <header className="fixed left-0 right-0 top-0 flex h-[var(--header-height)] w-full items-center">
        <div className="mx-auto hidden h-[var(--header-content-height)] w-full max-w-[1536px] items-center justify-between rounded-full px-[2%] sm:flex sm:rounded-none 2xl:px-0">
          <div className="flex h-full items-center justify-center rounded-full px-8 backdrop-blur-md">{logo}</div>

          <div className="flex h-full items-center gap-4 rounded-full px-8 backdrop-blur-md">
            <Music />

            <ThemeBtn />

            <MenuBtn />
          </div>
        </div>

        <div className="flex h-[var(--header-content-height)] w-full sm:hidden">
          <div className="container h-full">
            <div className="flex h-full items-center justify-between rounded-full px-[2%] backdrop-blur-md">
              <div className="flex h-full items-center justify-center rounded-full px-4">{logo}</div>

              <div className="flex h-full items-center gap-6 rounded-full px-4">
                <Music />

                <ThemeBtn />

                <MenuBtn />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
