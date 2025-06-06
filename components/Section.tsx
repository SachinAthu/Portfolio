'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap-config';

import { cn } from '@/lib/common';
import { NAV_LINKS } from '@/lib/data';
import { useHomeContext } from '@/context/HomeContext';

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string | undefined;
  paddingTop?: boolean;
  paddingBottom?: boolean;
  borderBottom?: boolean;
  transparent?: boolean;
};

export default function Section({
  children,
  id,
  className,
  paddingTop = true,
  paddingBottom = true,
  borderBottom = true,
  transparent = true,
  ...rest
}: SectionProps) {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);
  const border = useRef<HTMLDivElement>(null);
  const borderInner = useRef<HTMLDivElement>(null);

  const { setActiveSection } = useHomeContext();

  useGSAP(
    () => {
      if (borderBottom) {
        gsap.to(borderInner.current, {
          scaleX: 1,
          ease: '',
          duration: 2,
          scrollTrigger: {
            trigger: border.current,
            start: 'top 90%',
            end: 'top top',
          },
        });
      }

      function getSection(id: string) {
        return NAV_LINKS.find((l) => l.id === id) || NAV_LINKS[0];
      }

      ScrollTrigger.create({
        trigger: trigger.current,
        id: `section-trigger-${id}`,
        start: 'top 50%',
        end: '50% top',
        onEnter: () => {
          // console.log('enter', id);
          setActiveSection(getSection(id));
        },
        onEnterBack: () => {
          // console.log('enter back', id);
          setActiveSection(getSection(id));
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id={id}>
      <div
        ref={trigger}
        className={cn(
          'relative',
          className || '',
          paddingTop ? 'pt-32 sm:pt-52 lg:pt-60' : '',
          paddingBottom ? 'pb-48 sm:pb-64 lg:pb-72' : '',
          transparent ? '' : 'container-wide shadow-section dark:shadow-d-section bg-background dark:bg-d-background'
        )}
        {...rest}>
        {children}

        {borderBottom && (
          <div className="absolute bottom-0 left-0 right-0" ref={border} id={`${id}-border`}>
            <div
              ref={borderInner}
              className="h-[2px] w-full origin-center scale-x-0 bg-subtext dark:bg-d-subtext"></div>
          </div>
        )}
      </div>
    </section>
  );
}
