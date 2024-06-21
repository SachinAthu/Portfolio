'use client';

import { useEffect, useState } from 'react';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

import { Button } from '.';

export default function ErrorCom({ reset }: { reset: () => void }) {
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
          src="/static/lotties/error.lottie"
          loop={false}
          autoplay
          dotLottieRefCallback={dotLottieRefCallback}
          speed={0.5}
        />
      </div>

      <p className="text-lg font-medium">Damm! Something went wrong.</p>

      <p className="mb-4 text-lg font-medium">Please use the button below to try again.</p>

      <Button onClick={reset} className="font-medium">
        Try again
      </Button>
    </div>
  );
}
