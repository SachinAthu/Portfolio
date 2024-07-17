'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RiArrowUpWideFill } from 'react-icons/ri';

import { useLayoutContext } from '@/context/LayoutContext';

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const scrollBtn = useRef<HTMLButtonElement>(null);
  const circle = useRef(null);
  const { scrollRef } = useLayoutContext();

  const { contextSafe } = useGSAP({ scope: container });

  const scrollToTop = contextSafe(() => {
    scrollBtn.current?.classList.add('scrolling');
    gsap.to(circle.current, {
      strokeDashoffset: 2 * 3.14 * 100 * 1,
      ease: 'power2.out',
      duration: 2,
      onComplete: () => {
        scrollRef.current?.scrollTo(0);
        gsap.set(circle.current, { strokeDashoffset: 0 });
        scrollBtn.current?.classList.remove('scrolling');
      },
    });
  });

  return (
    <footer
      ref={container}
      className="relative border-t border-t-text bg-background pb-4 pt-20 dark:border-t-d-text dark:bg-d-background sm:pb-0">
      <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-sm dark:bg-d-background">
        <div className="pointer-events-none absolute h-32 w-32">
          <svg
            className="absolute left-1/2 top-1/2 h-[122%] w-[122%] -translate-x-1/2 -translate-y-1/2 -rotate-90"
            fill="none"
            viewBox="0 0 250 250"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              ref={circle}
              r={100}
              fill="none"
              cy="50%"
              cx="50%"
              strokeDasharray={2 * 3.14 * 100}
              strokeDashoffset={0}
              className="stroke-text stroke-[3px] dark:stroke-d-text"
            />
          </svg>
        </div>

        <button
          type="button"
          ref={scrollBtn}
          className="scroll-top-button | flex h-full w-full items-center justify-center overflow-hidden rounded-full"
          onClick={scrollToTop}>
          <span className="relative h-14 w-14 [&_svg]:h-14 [&_svg]:w-14">
            <span className="scroll-top-button-1">
              <RiArrowUpWideFill />
            </span>
            <span className="scroll-top-button-2">
              <RiArrowUpWideFill />
            </span>
          </span>
        </button>
        <div></div>
      </div>

      <div className="container">
        <div className="grid h-[var(--footer-height)] place-items-center">
          <p className="text-center text-base">© {new Date().getFullYear()} Sachin Athukorala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
