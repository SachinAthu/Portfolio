'use client';

import { useLayoutContext } from '@/context/LayoutContext';
import { Button, FadeIn, RevealText, UnderlineButton } from '.';
import { useMobileViewport } from '@/lib/hooks';

function Welcome() {
  const { setIsPageLoading, setIsWelcome } = useLayoutContext();
  const isMobile = useMobileViewport();

  function clickHandler(sound: boolean) {
    setIsPageLoading(true);

    setTimeout(() => {
      setIsWelcome(false);

      setTimeout(() => {
        setIsPageLoading(false);
        document.body.classList.remove('overflow-hidden');

        // set initial music begin
        if (sound && !isMobile) {
          sessionStorage.setItem('is-music', 'true');
        } else {
          sessionStorage.setItem('is-music', 'false');
        }

        // load music
        const musicPlayBtn = document.getElementById('loadMusicBtn');
        musicPlayBtn?.click();
      }, 1000);
    }, 1900);
  }

  return (
    <div className="fixed inset-0 z-[60] flex h-lvh w-screen flex-col items-center justify-center bg-background dark:bg-d-background">
      <RevealText id="welcome-p-1" duration={1.2}>
        <p className="text-center text-[clamp(6rem,12vw,13rem)] font-medium">Hey,</p>
      </RevealText>

      <div className="mb-20">
        <RevealText id="welcome-p-2" duration={1.6} delay={1.2} multiple>
          <p className="text-center text-2xl sm:text-5xl">Welcome to my portfolio</p>
        </RevealText>
      </div>

      <div className="mb-8">
        <FadeIn id="welcome-btn-1" delay={2.8}>
          <Button
            id="welcomeEnterBtn"
            className="rounded-full px-16 py-8 text-2xl md:px-28 md:py-12"
            onClick={() => clickHandler(true)}>
            Enter
          </Button>
        </FadeIn>
      </div>

      <div className="hidden md:block">
        <FadeIn id="welcome-btn-2" delay={3}>
          <UnderlineButton className="text-xl" onClick={() => clickHandler(false)}>
            Enter without sound
          </UnderlineButton>
        </FadeIn>
      </div>
    </div>
  );
}

export default function WelcomeWrapper() {
  const { isWelcome } = useLayoutContext();

  if (!isWelcome) return null;

  return <Welcome />;
}
