'use client';

import { useEffect, useState } from 'react';
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
  }, [dotLottie]);

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  return (
    <div className="flex h-[100svh] flex-col items-center justify-center">
      <div className="h-[350px] w-[350px] sm:h-[450px] sm:w-[450px]">
        <DotLottieReact
          src="/static/lotties/notFound.lottie"
          loop={false}
          autoplay
          dotLottieRefCallback={dotLottieRefCallback}
        />
      </div>

      <p className="paragraph-1 mb-1 font-medium">Damm! Page Not Found.</p>

      <CustomLink id="notFoundHomeLink" content="Return Home" href="/" className="p-6 text-2xl font-medium" />
    </div>
  );
}
