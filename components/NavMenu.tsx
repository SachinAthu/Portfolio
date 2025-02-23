'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';

import { useLayoutContext } from '@/context/LayoutContext';
import { NAV_LINKS } from '@/lib/data';
import { cn } from '@/lib/common';
import { useWindowResize } from '@/lib/hooks';

export default function NavMenu() {
  const { vw } = useWindowResize();
  const showNavLinksTween = useRef<gsap.core.Timeline>();
  const hideNavLinksTween = useRef<gsap.core.Timeline>();
  const { isNavShow, isScrolled, setIsNavOpen, scrollRef } = useLayoutContext();

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

  useEffect(() => {
    if (vw >= 1536 && isNavShow) {
      setIsNavOpen(false);
    }
  }, [vw, isNavShow, setIsNavOpen]);

  function navigate(id: string) {
    setIsNavOpen(false);
    scrollRef.current?.scrollTo(`#${id}`);
  }

  const navLinksArr = NAV_LINKS.slice(1);

  return (
    <nav
      id="app-nav-menu"
      className={'nav-menu | fixed left-0 right-0 top-[var(--header-height)] z-50 hidden h-[var(--nav-menu-height)]'}
      data-lenis-prevent>
      <ul className="nav-menu-links hide-scrollbar | h-full overflow-y-auto pt-20 lg:pt-28">
        <div className={cn('px-[2%] sm:px-[3%]', isScrolled && 'mx-auto max-w-[80rem] xl:px-0')}>
          {navLinksArr && (
            <>
              {navLinksArr.map((l) => (
                <li key={l.key} className="nav-menu-link | flex translate-y-10 items-center px-8 opacity-0">
                  <button
                    type="button"
                    className="flex items-start gap-4 py-3 font-semibold"
                    onClick={() => navigate(l.id)}>
                    <span className="text-5xl text-d-text sm:text-7xl md:text-8xl">{l.title}</span>

                    <span className="hidden font-normal text-d-subtext sm:inline">
                      <span className="text-2xl">[ </span>
                      <span className="text-base">{l.tooltip}</span>
                      <span className="text-2xl"> ]</span>
                    </span>
                  </button>
                </li>
              ))}
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
