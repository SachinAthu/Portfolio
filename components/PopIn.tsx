'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type PopInProps = {
  children: React.ReactNode;
  id: string;
  duration?: number;
  delay?: number;
};

export default function PopIn({ children, id, duration = 1, delay = 0 }: PopInProps) {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(`#${id}`, {
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
        <div id={id} className="opacity-0">
          {children}
        </div>
      </div>
    </div>
  );
}
