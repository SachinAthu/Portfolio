'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { cn } from '@/lib/common';
import { useMobileViewport } from '@/lib/hooks';

type ToolTipProps = {
  children: React.ReactNode;
  id: string;
  toolTip: string;
  className?: string;
};

function ToolTip({ children, id, toolTip, className }: ToolTipProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const xTo = gsap.quickTo(`#${id}`, 'x', { duration: 0.4, ease: 'power2.out' });
      const yTo = gsap.quickTo(`#${id}`, 'y', { duration: 0.4, ease: 'power2.out' });
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
        enterAnim.pause().invalidate();
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
