import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.config({
    force3D: true,
  });

  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger, useGSAP };
