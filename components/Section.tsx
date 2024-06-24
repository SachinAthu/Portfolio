'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { cn } from '@/lib/common';
import { useLayoutContext } from '@/context/LayoutContext';
import { navLinks } from '@/lib/data';

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string | undefined;
  paddingTop?: boolean;
  paddingBottom?: boolean;
  borderBottom?: boolean;
};

export default function Section({
  children,
  id,
  className,
  paddingTop = true,
  paddingBottom = true,
  borderBottom = true,
}: SectionProps) {
  const container = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useLayoutContext();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (borderBottom) {
        gsap.to(`#${id}-border > div`, {
          scaleX: 1,
          ease: 'power2.out',
          duration: 2,
          scrollTrigger: {
            trigger: `#${id}-border`,
            start: 'top 90%',
            end: 'top top',
          },
        });
      }

      function getSection(id: string) {
        return navLinks.find((l) => l.id === id) || navLinks[0];
      }

      ScrollTrigger.create({
        trigger: `#${id}`,
        id: `trigger${id}`,
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
    <div ref={container}>
      <div
        id={id}
        className={cn(
          'relative',
          className || '',
          paddingTop ? 'pt-32 sm:pt-52 lg:pt-60' : '',
          paddingBottom ? 'pb-20 sm:pb-32 lg:pb-40' : ''
        )}>
        {children}

        {borderBottom && (
          <div className="absolute bottom-0 left-0 right-0" id={`${id}-border`}>
            <div className="h-[2px] w-full origin-left scale-x-0 bg-text dark:bg-d-text"></div>
          </div>
        )}
      </div>
    </div>
  );
}
