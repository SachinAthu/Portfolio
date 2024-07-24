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
  markers?: boolean;
};

export default function PopIn({ children, id, duration = 1, delay = 0, markers = false }: PopInProps) {
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
          id: `${id}-popIn`,
          trigger: `#${id}`,
          start: 'top 90%',
          end: 'top top',
          markers,
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
