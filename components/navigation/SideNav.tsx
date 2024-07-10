'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useLayoutContext } from '@/context/LayoutContext';
import { navLinks } from '@/lib/data';
import { useMobileViewport } from '@/lib/hooks';
import { cn } from '@/lib/common';
import { ToolTip } from '..';

function SideNav() {
  const { scrollRef, activeSection } = useLayoutContext();
  const sideNav = useRef<HTMLDivElement>(null);
  const btnIndicater = useRef<HTMLDivElement>(null);
  const show = useRef(false);
  const btnHeight = 60,
    btnGap = 8;

  useGSAP(
    () => {
      // hide side menu in hero section
      if (activeSection.id === 'hero') {
        show.current = false;
        gsap.to(sideNav.current, {
          x: -100,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.75,
        });
      } else {
        if (!show.current) {
          show.current = true;
          gsap.to(sideNav.current, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.75,
          });
        }
      }

      // move indicator in current link
      gsap.to(btnIndicater.current, {
        y: (parseInt(activeSection.key) - 1) * (btnHeight + btnGap),
        duration: 0.5,
        ease: 'power2.out',
      });
    },
    { dependencies: [activeSection] }
  );

  function navigate(id: string) {
    scrollRef.current?.scrollTo(`#${id}`);
  }

  return (
    <div
      ref={sideNav}
      className="fixed left-6 top-[var(--side-nav-top)] z-20 hidden h-[var(--side-nav-height)] -translate-x-[100px] rounded-3xl border border-text bg-background opacity-0 dark:border-d-text dark:bg-d-background 2xl:block">
      <div className="relative grid h-full grid-cols-1 gap-[var(--side-nav-gap)]">
        <div
          ref={btnIndicater}
          className="absolute left-0 top-0 z-[-1] h-[var(--side-nav-btn-height)] w-full bg-primary"></div>

        {navLinks.map((l) => (
          <ToolTip key={l.key} toolTip={l.title} id={`tootip-${l.id}`}>
            <button
              type="button"
              onClick={() => navigate(l.id)}
              className={cn(
                'flex h-[var(--side-nav-btn-height)] w-[56px] items-center justify-center rounded-3xl transition-colors duration-200 [&>svg]:h-7 [&>svg]:w-7',
                activeSection.id === l.id ? 'text-white' : 'text-current'
              )}>
              {l.icon}
            </button>
          </ToolTip>
        ))}
      </div>
    </div>
  );
}

export default function SideNavWrapper() {
  const isMobile = useMobileViewport();

  if (isMobile) return null;

  return <SideNav />;
}
