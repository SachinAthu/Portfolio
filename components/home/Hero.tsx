'use client';

import { useLayoutContext } from '@/context/LayoutContext';
import { Button, Section } from '..';

export default function Hero() {
  const { scrollRef } = useLayoutContext();

  function scrollToContact() {
    scrollRef.current?.scrollTo('#contact');
  }

  return (
    <Section
      id="hero"
      paddingTop={false}
      paddingBottom={false}
      className="relative h-[max(100svh,50rem)] pt-[var(--header-height)]"
      borderBottom={false}>
      {/* <div className="flex min-h-[var(--hero-height)] flex-col items-center">
        <div className="mt-40">
          <h1 className="text-center text-9xl font-semibold tracking-[2px]">Hey. I'm Sachin.</h1>
        </div>

        <div className="mt-20">
          <p className="text-center text-6xl font-medium">Fullstack Developer;</p>
        </div>

        <div className="mt-40">
          <Button className="rounded-full border-2 px-8 py-4 text-2xl">Contact Me</Button>
        </div>
      </div> */}

      <div
        data-scroll
        data-scroll-speed="-0.5"
        className="container-wide flex h-full grid-cols-2 flex-col-reverse justify-between px-[calc(3%+1.5rem)] pb-28 pt-12 sm:flex-col sm:px-[calc(3%+2rem)] sm:pb-20 2xl:px-8">
        <div className="flex flex-col items-end">
          <div className="mb-8 sm:mb-12">
            <p className="max-w-[30rem] text-right text-5xl font-medium sm:text-7xl">Fullstack Developer;</p>
          </div>

          <Button className="rounded-full border-2 px-6 py-6 text-xl sm:px-8 sm:text-2xl" onClick={scrollToContact}>
            Contact Me
          </Button>
        </div>

        <div>
          <h1 className="text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-none">
            Sachin <br /> Athukorala
          </h1>
        </div>
      </div>
    </Section>
  );
}
