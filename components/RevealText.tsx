'use client';

import React, { ReactElement, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';
import SplitType from 'split-type';

type RevealTextProps = {
  children: React.ReactNode;
  id: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  multiple?: boolean;
};

export default function RevealText({
  children,
  id,
  duration = 0.8,
  delay = 0,
  stagger = 0.05,
  multiple = false,
}: RevealTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);
  const child = children as ReactElement;

  useGSAP(
    () => {
      SplitType.create(`#${id} > ${child.type}`, { types: 'words,chars' });
      const el = multiple ? `#${id} .word` : `#${id} .char`;

      gsap.set(trigger.current, { opacity: 1, visibility: 'visible' });

      gsap.to(el, {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        stagger: {
          each: stagger,
          from: 0,
          onStart: (seg) => {
            if (seg) seg.style.visibility = 'visible';
          },
        },
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger.current,
          start: 'top 90%',
          end: 'top top',
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div ref={trigger} id={id} className={`reveal-text invisible opacity-0 ${multiple ? 'multiple' : ''}`}>
        {children}
      </div>
    </div>
  );
}
