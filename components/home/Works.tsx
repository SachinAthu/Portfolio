'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap-config';

import { WORKS } from '@/lib/data';
import { PageLink, RevealText, Section, ToolTip } from '..';
import { WorkType } from '@/lib/types';
import { cn } from '@/lib/common';

const BG_COLORS = ['#FC7A1E', '#008080', '#FF934F', '#79745C', '#F7B32B', '#519872'];

function Work({ work, index }: { work: WorkType; index: number }) {
  const workEl = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(workEl.current, { backgroundColor: gsap.utils.random(BG_COLORS) });
  });

  return (
    <div
      ref={workEl}
      className={cn(
        'mb-20 max-h-[50rem] rounded-[1rem] bg-accent sm:rounded-[2rem] lg:mb-40 lg:w-[75%]',
        (index + 1) % 2 === 0 ? 'lg:ml-auto' : ''
      )}>
      <ToolTip toolTip="Case Study" className="p-8 text-2xl">
        <PageLink href={`/works/${work.slug}`}>
          <div className="px-6 pb-6 pt-10 sm:px-10 sm:pb-12 sm:pt-16 md:px-14 md:pb-16 md:pt-24">
            <div className="mb-10 flex items-center gap-4 text-d-text sm:mb-16 md:mb-24">
              <h3 className="text-3xl font-medium sm:text-6xl lg:text-7xl">
                <span className="text-2xl font-normal sm:text-5xl lg:text-6xl">
                  {(index + 1).toString().padStart(2, '0')}.
                </span>{' '}
                {work.title}
              </h3>
            </div>

            <div className="relative h-auto overflow-hidden rounded-lg sm:rounded-3xl">
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
  );
}

export default function Works() {
  return (
    <Section id="works" borderBottom={false} className="min-h-screen">
      <div className="container">
        <RevealText id="worksHeading">
          <h2 className="heading-1">
            My Works<span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">.</span>
          </h2>
        </RevealText>

        <div className="mt-28 lg:mt-40">
          {WORKS.map((work, i) => (
            <Work key={work.key} work={work} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
