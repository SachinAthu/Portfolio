'use client';

import React, { ReactElement, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  duration = 1,
  delay = 0,
  stagger = 0.1,
  multiple = false,
}: RevealTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const child = children as ReactElement;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      SplitType.create(`#${id} > ${child.type}`, { types: multiple ? 'words' : 'chars' });
      const el = multiple ? `#${id} .word` : `#${id} .char`;

      gsap.to(el, {
        y: 0,
        opacity: 1,
        stagger,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: `#${id}`,
          start: 'top 90%',
          end: 'top top',
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div id={id} className="reveal-text">
        {children}
      </div>
    </div>
  );
}
