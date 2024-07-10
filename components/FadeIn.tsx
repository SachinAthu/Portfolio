'use client';

import React, { ReactElement, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type FadeInProps = {
  children: React.ReactNode;
  id: string;
  duration?: number;
  delay?: number;
};

export default function FadeIn({ children, id, duration = 1, delay = 0 }: FadeInProps) {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(`#${id}`, {
        y: 0,
        opacity: 1,
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
      <div ref={trigger}>
        <div id={id} className="translate-y-[15px] opacity-0 sm:translate-y-[30px]">
          {children}
        </div>
      </div>
    </div>
  );
}
