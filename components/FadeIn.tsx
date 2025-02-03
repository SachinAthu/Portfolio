'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';

type FadeInProps = {
  children: React.ReactNode;
  id: string;
  duration?: number;
  delay?: number;
  markers?: boolean;
};

export default function FadeIn({ children, id, duration = 1, delay = 0, markers = false }: FadeInProps) {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(fade.current, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          id: `${id}-fadeIn`,
          trigger: trigger.current,
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
        <div ref={fade} id={id} className="translate-y-[30px] opacity-0">
          {children}
        </div>
      </div>
    </div>
  );
}
