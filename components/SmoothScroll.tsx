// @ts-nocheck

'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    let locomotiveScroll: LocomotiveScroll;

    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          duration: 1.5,
        },
      });
    })();

    return () => {
      locomotiveScroll?.destroy();
    };
  }, []);

  return null;
}
