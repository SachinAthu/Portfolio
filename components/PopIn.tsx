'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';

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
  const popin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(popin.current, {
        opacity: 1,
        visibility: 'visible',
        duration,
        delay,
        ease: 'power2.out',
        onStart: () => {
          gsap.set(popin.current, { visibility: 'visible' });
        },
        scrollTrigger: {
          id: `${id}-popIn`,
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
        <div ref={popin} id={id} className="invisible opacity-0">
          {children}
        </div>
      </div>
    </div>
  );
}
