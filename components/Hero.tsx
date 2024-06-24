'use client';

import { Button, Section } from '.';

export default function Hero() {
  return (
    <Section id="hero" paddingTop={false}>
      <div id="headerWatcher"></div>

      <div className="flex min-h-[var(--hero-height)] flex-col items-center">
        <div className="mt-40">
          <h1 className="text-center text-9xl font-semibold tracking-[2px]">Hey. I'm Sachin.</h1>
        </div>

        <div className="mt-20">
          <p className="text-center text-6xl font-medium">Fullstack Developer;</p>
        </div>

        <div className="mt-40">
          <Button className="rounded-full border-2 px-8 py-4 text-2xl">Contact Me</Button>
        </div>
      </div>
    </Section>
  );
}
