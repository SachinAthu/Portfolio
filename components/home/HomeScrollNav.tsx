'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import { useMobileViewport } from '@/lib/hooks';
import { useLayoutContext } from '@/context/LayoutContext';
import { IconButton } from '..';
import { NAV_LINKS } from '@/lib/data';

function ScrollNav() {
  const { scrollRef, activeSection } = useLayoutContext();
  const scrollNav = useRef<HTMLDivElement>(null);
  const downButton = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // hide side menu in hero section
      if (activeSection.id === 'hero') {
        gsap.to(scrollNav.current, {
          x: 100,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.75,
        });
      } else {
        gsap.to(scrollNav.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.75,
          onComplete: () => {
            if (activeSection.id === 'contact') {
              gsap.to(downButton.current, {
                x: 100,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.75,
              });
            } else {
              gsap.to(downButton.current, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.75,
              });
            }
          },
        });
      }
    },
    { dependencies: [activeSection] }
  );

  function scroll(direction: 'up' | 'down') {
    const index = parseInt(activeSection.key) - 1;

    if (direction === 'down') {
      if (index + 1 >= NAV_LINKS.length) {
        return;
      }
      scrollRef.current?.scrollTo(`#${NAV_LINKS[index + 1].id}`);
    } else {
      if (index - 1 < 0) {
        return;
      }
      scrollRef.current?.scrollTo(`#${NAV_LINKS[index - 1].id}`);
    }
  }

  return (
    <div
      ref={scrollNav}
      className="fixed right-6 top-[var(--scroll-nav-top)] z-20 hidden h-[var(--scroll-nav-height)] translate-x-[100px] opacity-0 2xl:block">
      <div className="grid h-full grid-cols-1 grid-rows-[1fr_1.5fr_1fr] gap-1">
        <div className="flex items-center justify-center">
          <IconButton onClick={() => scroll('up')}>
            <IoArrowUp />
          </IconButton>
        </div>

        <div className="flex justify-center">
          <div className="w-[2px] bg-text dark:bg-d-text"></div>
        </div>

        <div className="flex items-center justify-center" ref={downButton}>
          <IconButton onClick={() => scroll('down')} direction="down">
            <IoArrowDown />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default function ScrollNavWrapper() {
  const isMobile = useMobileViewport();

  if (isMobile) return null;

  return <ScrollNav />;
}
