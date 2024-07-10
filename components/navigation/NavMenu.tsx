'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { useLayoutContext } from '@/context/LayoutContext';
import { navLinks } from '@/lib/data';

export default function NavMenu() {
  const showNavLinksTween = useRef<gsap.core.Timeline>();
  const hideNavLinksTween = useRef<gsap.core.Timeline>();
  const { isNavShow, setIsNavOpen, scrollRef } = useLayoutContext();

  useEffect(() => {
    const navMenu = document.querySelector('.nav-menu');

    showNavLinksTween.current = gsap
      .timeline({ onStart: () => navMenu?.classList.remove('hidden'), paused: true })
      .to('.nav-menu-link', {
        y: 0,
        opacity: 1,
        duration: 1.25,
        stagger: {
          amount: 0.5,
          from: 'start',
        },
        ease: 'power3.out',
      });

    hideNavLinksTween.current = gsap
      .timeline({ onComplete: () => navMenu?.classList.add('hidden'), paused: true })
      .to('.nav-menu-link', {
        y: 40,
        opacity: 0,
        duration: 1.25,
        stagger: {
          amount: 0.5,
          from: 'end',
        },
        ease: 'power3.out',
      });

    return () => {
      showNavLinksTween.current?.kill();
      hideNavLinksTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isNavShow) {
      showNavLinksTween.current?.invalidate().restart();
    } else {
      hideNavLinksTween.current?.invalidate().restart();
    }
  }, [isNavShow]);

  function navigate(id: string) {
    setIsNavOpen(false);
    scrollRef.current?.scrollTo(`#${id}`);
  }

  const navLinksArr = navLinks.slice(1);

  return (
    <nav
      className={'nav-menu | fixed left-0 right-0 top-[var(--header-height)] z-50 hidden h-[var(--nav-menu-height)]'}
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
