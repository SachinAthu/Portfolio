'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useLayoutContext } from '@/context/LayoutContext';
import { navLinks } from '@/lib/data';

function NavMenu() {
  const container = useRef<HTMLDivElement>(null);
  const { setIsNavOpen, scrollRef } = useLayoutContext();

  useGSAP(
    () => {
      gsap.to('.nav-menu-link', {
        y: 0,
        opacity: 1,
        duration: 1.25,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: container }
  );

  function navigate(id: string) {
    setIsNavOpen(false);
    scrollRef.current?.scrollTo(`#${id}`);
  }

  const navLinksArr = navLinks.slice(1);

  return (
    <nav
      ref={container}
      className={'nav-menu | fixed left-0 right-0 top-[var(--header-height)] z-20 h-[var(--nav-menu-height)]'}
      data-lenis-prevent>
      <ul className="nav-menu-links hide-scrollbar | mx-auto h-full overflow-y-auto pt-36 lg:pt-32">
        {navLinksArr && (
          <>
            {navLinksArr.map((l) => (
              <li key={l.key} className="nav-menu-link | flex translate-y-10 items-center justify-center opacity-0">
                <button
                  type="button"
                  className="py-6 text-center text-5xl font-bold text-d-text sm:text-8xl"
                  onClick={() => navigate(l.id)}>
                  {l.title}
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </nav>
  );
}

export default function NavMenuWrapper() {
  const { isNavShow } = useLayoutContext();

  if (!isNavShow) {
    return null;
  }

  return <NavMenu />;
}
