'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { cn } from '@/lib/common';

type ToolTipProps = {
  children: React.ReactNode;
  id: string;
  toolTip: string;
  toolTipClassName?: string;
};

export default function ToolTip({ children, id, toolTip, toolTipClassName }: ToolTipProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const xTo = gsap.quickTo(`#${id}`, 'x', { duration: 0.4, ease: 'power' });
      const yTo = gsap.quickTo(`#${id}`, 'y', { duration: 0.4, ease: 'power' });
      const enterAnim = gsap.to(`#${id}`, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        paused: true,
        onStart: () => {
          gsap.set(`#${id}`, { display: 'block' });
        },
      });
      const leaveAnim = gsap.to(`#${id}`, {
        opacity: 0,
        duration: 0.1,
        paused: true,
        onComplete: () => {
          gsap.set(`#${id}`, { display: 'none', x: 0, y: 0 });
        },
      });
      const toolTipWrapper = document.getElementById(`${id}-wrapper`);

      function mouseEnter() {
        enterAnim.invalidate().restart(true);
      }

      function mouseLeave() {
        leaveAnim.invalidate().restart();
      }

      function mouseMove(e: MouseEvent) {
        if (!toolTipWrapper) return;

        const { left, top } = toolTipWrapper?.getBoundingClientRect();
        xTo(e.clientX - left + 10);
        yTo(e.clientY - top + 10);
      }

      const containerRef = container.current;
      containerRef?.addEventListener('mouseenter', mouseEnter);
      containerRef?.addEventListener('mouseleave', mouseLeave);
      containerRef?.addEventListener('mousemove', mouseMove);

      return () => {
        containerRef?.removeEventListener('mouseenter', mouseEnter);
        containerRef?.removeEventListener('mouseleave', mouseLeave);
        containerRef?.removeEventListener('mousemove', mouseMove);
      };
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className="relative" id={`${id}-wrapper`}>
        {children}

        <div
          id={id}
          className={cn(
            'absolute left-0 top-0 hidden rounded-full border border-subtext bg-background p-2 opacity-0 dark:border-d-subtext dark:bg-d-background',
            toolTipClassName || ''
          )}>
          <div className="flex items-center justify-center">
            <span className="whitespace-nowrap text-base font-medium text-subtext dark:text-d-subtext">{toolTip}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
