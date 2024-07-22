'use client';

import { useLayoutContext } from '@/context/LayoutContext';
import { Button, CustomLink, Section } from '..';

import { SiGithub, SiLinkedin, SiHackerrank, SiCodepen, SiLeetcode, SiCodesandbox } from 'react-icons/si';

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
      <div
        data-scroll
        data-scroll-speed="-0.5"
        className="container-wide flex h-full grid-cols-2 flex-col-reverse justify-between px-[calc(3%+1.5rem)] pb-28 pt-12 sm:flex-col sm:px-[calc(3%+2rem)] sm:pb-20 2xl:px-8">
        <div className="flex flex-col items-end">
          <div className="mb-8 sm:mb-12">
            <p className="max-w-[30rem] text-right text-5xl font-medium sm:text-7xl">Fullstack Developer;</p>
          </div>

          {/* <Button className="rounded-full px-6 py-6 text-xl sm:px-8 sm:py-8 sm:text-2xl" onClick={scrollToContact}>
            Contact Me
          </Button> */}

          <div className="flex flex-wrap items-center justify-end gap-3">
            <CustomLink href="https://github.com/SachinAthu" target="_blank" className="p-3" icon>
              <SiGithub />
            </CustomLink>
            <CustomLink href="https://www.linkedin.com/in/sachinathu/" target="_blank" className="p-3" icon>
              <SiLinkedin />
            </CustomLink>
            <CustomLink href="https://www.hackerrank.com/profile/sachin2262716" target="_blank" className="p-3" icon>
              <SiHackerrank />
            </CustomLink>
            <CustomLink href="https://leetcode.com/sachin2262716" target="_blank" className="p-3" icon>
              <SiLeetcode />
            </CustomLink>
            <CustomLink href="https://codepen.io/sachinathu" target="_blank" className="p-3" icon>
              <SiCodepen />
            </CustomLink>
            <CustomLink href="https://codesandbox.io/u/sachinAthu" target="_blank" className="p-3" icon>
              <SiCodesandbox />
            </CustomLink>
          </div>
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
