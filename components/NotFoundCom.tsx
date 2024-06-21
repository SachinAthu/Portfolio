'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CustomLink } from '.';

export default function NotFoundCom() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    return () => {
      if (dotLottie) {
        dotLottie.destroy();
      }
    };
  });

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  return (
    <div className="flex h-[var(--404-height)] flex-col items-center justify-center">
      <div className="h-[450px] w-[450px]">
        <DotLottieReact
          src="/static/lotties/notFound.lottie"
          loop={false}
          autoplay
          dotLottieRefCallback={dotLottieRefCallback}
        />
      </div>

      <p className="mb-4 text-lg font-medium">Damm! Page Not Found.</p>

      <CustomLink href="/" className="font-medium">
        Return Home
      </CustomLink>
    </div>
  );
}
