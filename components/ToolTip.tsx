'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';

import { cn } from '@/lib/common';
import { useMobileViewport, useDebouncedCallback } from '@/lib/hooks';

type ToolTipProps = {
  children: React.ReactNode;
  toolTip: string | JSX.Element;
  className?: string;
};

function ToolTip({ children, toolTip, className }: ToolTipProps) {
  const container = useRef<HTMLDivElement>(null);
  const ttip = useRef<HTMLDivElement>(null);
  const ttipWrapper = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const mouseMove = useDebouncedCallback((e: MouseEvent) => {
    if (!ttipWrapper.current || !xTo.current || !yTo.current) return;

    const { left, top } = ttipWrapper.current.getBoundingClientRect();
    xTo.current(e.clientX - left + 10);
    yTo.current(e.clientY - top + 10);
  }, 10);

  useGSAP(
    () => {
      xTo.current = gsap.quickTo(ttip.current, 'x', { duration: 0.8, ease: 'power2.out' });
      yTo.current = gsap.quickTo(ttip.current, 'y', { duration: 0.8, ease: 'power2.out' });

      const enterAnim = gsap.to(ttip.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        paused: true,
        onStart: () => {
          gsap.set(ttip.current, { display: 'block' });
        },
      });

      const leaveAnim = gsap.to(ttip.current, {
        opacity: 0,
        duration: 0.1,
        paused: true,
        onComplete: () => {
          gsap.set(ttip.current, { display: 'none', x: 0, y: 0 });
        },
      });

      const controller = new AbortController();

      container.current?.addEventListener(
        'mouseenter',
        (e: MouseEvent) => {
          mouseMove(e);
          enterAnim.invalidate().restart(true);
        },
        { signal: controller.signal }
      );

      container.current?.addEventListener(
        'mouseleave',
        () => {
          enterAnim.pause().invalidate();
          leaveAnim.invalidate().restart();
        },
        { signal: controller.signal }
      );

      container.current?.addEventListener('mousemove', mouseMove, { signal: controller.signal });

      return () => {
        controller.abort();
      };
    },
    { scope: container, dependencies: [mouseMove] }
  );

  return (
    <div ref={container}>
      <div className="relative" ref={ttipWrapper}>
        {children}

        <div
          ref={ttip}
          className={cn(
            'absolute left-0 top-0 hidden rounded-full border border-subtext bg-[rgba(245,245,245,0.9)] p-2 text-base opacity-0 dark:border-d-subtext dark:bg-[rgba(30,30,30,0.9)]',
            className || ''
          )}>
          <div className="flex items-center justify-center">
            <span className="whitespace-nowrap font-medium text-subtext dark:text-d-subtext">{toolTip}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToolTipWrapper(props: ToolTipProps) {
  const isMobile = useMobileViewport();

  if (isMobile) return props.children;

  return <ToolTip {...props} />;
}
