'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap-config';

import { WORKS } from '@/lib/data';
import { PageLink, RevealText, Section, ToolTip } from '..';
import { WorkType } from '@/lib/types';

const BG_COLORS = ['#FC7A1E', '#008080', '#FF934F', '#79745C', '#F7B32B', '#519872'];

function Work({ work, index, bgColor }: { work: WorkType; index: number; bgColor: string }) {
  const workEl = useRef<HTMLDivElement>(null);
  const workWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isEven = index % 2 === 0;
    const mm = gsap.matchMedia();

    gsap.set(workEl.current, {
      x: isEven ? '-20vw' : '20vw',
      rotateZ: isEven ? -5 : 5,
      opacity: 0.5,
      transformStyle: 'preserve-3d',
    });

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        let { isMobile } = context.conditions!;
        let end = isMobile ? 'top 50%' : 'top 20%';

        gsap.to(workEl.current, {
          x: '0vw',
          rotateZ: 0,
          opacity: 1,
          transformStyle: 'preserve-3d',
          duration: 1,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: workWrapperEl.current,
            start: 'top 110%',
            end,
            scrub: true,
          },
        });
      }
    );

    return () => {
      mm.revert();
    };
  }, [index]);

  return (
    <div ref={workWrapperEl} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
      <div
        ref={workEl}
        style={{ backgroundColor: bgColor }}
        className="tranform-sty mb-20 rounded-3xl sm:mb-28 lg:mb-40 lg:w-[75%]">
        <ToolTip toolTip="Case Study" className="p-8 text-2xl">
          <PageLink href={`/works/${work.slug}`}>
            <div className="px-6 pb-6 pt-10 sm:px-10 sm:pb-12 sm:pt-16 lg:px-14 lg:pb-16 lg:pt-24">
              <div className="mb-10 flex items-center gap-4 text-d-text sm:mb-16 md:mb-24">
                <h3 className="text-3xl sm:text-5xl xl:text-7xl">
                  <div className="flex gap-4">
                    <div className="font-normal text-d-subtext">{(index + 1).toString().padStart(2, '0')}.</div>

                    <div className="font-medium">{work.title}</div>
                  </div>
                </h3>
              </div>

              <div className="relative h-auto overflow-hidden rounded-xl">
                <Image
                  src={work.titleImage}
                  alt={work.title}
                  placeholder="blur"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </PageLink>
        </ToolTip>
      </div>
    </div>
  );
}

export default function Works() {
  // const [bgColors, setBgColors] = useState(BG_COLORS);
  const bgColors = gsap.utils.shuffle(BG_COLORS);

  // useEffect(() => {
  //   setBgColors(gsap.utils.shuffle(BG_COLORS));
  // }, []);

  return (
    <Section id="works" borderBottom={false} className="works">
      <div className="overflow-hidden">
        <div className="container">
          <RevealText id="worksHeading">
            <h2 className="heading-1">
              My Works<span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">.</span>
            </h2>
          </RevealText>

          <div className="mt-28 lg:mt-40">
            {WORKS.map((work, i) => (
              <Work key={work.key} work={work} index={i} bgColor={bgColors[i % bgColors.length]} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
