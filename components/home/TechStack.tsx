'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';

import { TECH_STACK } from '@/lib/data';
import { Section, RevealText, FadeIn } from '..';
import { useRef } from 'react';
import { useMobileViewport } from '@/lib/hooks';

const tsFilters = [
  {
    id: 'tsFiltersAll',
    value: 'all',
    defaultChecked: true,
  },
  {
    id: 'tsFiltersFrontend',
    value: 'frontend',
  },
  {
    id: 'tsFiltersBackend',
    value: 'backend',
  },
  {
    id: 'tsFiltersMobile',
    value: 'mobile',
  },
  {
    id: 'tsFiltersOther',
    value: 'other',
  },
];

function TechStackMobile() {
  let filterdTechStack: { [key: string]: string[] } = {
    frontend: [],
    backend: [],
    mobile: [],
    other: [],
  };

  for (let i = 0; i < TECH_STACK.length; i++) {
    if (TECH_STACK[i].categories.includes('frontend')) {
      filterdTechStack.frontend.push(TECH_STACK[i].title);
    } else if (TECH_STACK[i].categories.includes('backend')) {
      filterdTechStack.backend.push(TECH_STACK[i].title);
    } else if (TECH_STACK[i].categories.includes('mobile')) {
      filterdTechStack.mobile.push(TECH_STACK[i].title);
    } else {
      filterdTechStack.other.push(TECH_STACK[i].title);
    }
  }

  const entries = Object.entries(filterdTechStack);

  return (
    <div>
      {entries.map(([key, value], i) => (
        <FadeIn key={key} id={`techStack-${key}`}>
          <div
            className={`${i === 0 ? 'mt-14 sm:mt-20' : 'mt-12 sm:mt-14'} ${entries.length !== i + 1 ? 'border-b border-b-subtext pb-14 dark:border-d-subtext' : ''}`}>
            <h3 className="text-2xl capitalize">
              {(i + 1).toString().padStart(2, '0')}. {key}
            </h3>

            <div className="mt-10 flex flex-wrap gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6">
              {value.map((tech) => (
                <div key={tech} className="ts-item | inline-flex items-center justify-center">
                  <span className="whitespace-nowrap rounded-full border border-subtext bg-background px-4 py-2 text-center text-base font-medium text-subtext dark:border-d-subtext dark:bg-d-background dark:text-d-subtext sm:text-lg">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

function TechStackDesktop() {
  const container = useRef<HTMLDivElement>(null);
  const tsItemsContainer = useRef<HTMLDivElement>(null);
  const checkIndicator = useRef<HTMLDivElement>(null);
  const filterWidth = 128,
    filterGap = 8;

  useGSAP(
    () => {
      gsap.registerPlugin(Flip);

      const filters = gsap.utils.toArray('.filter-input') as HTMLInputElement[];
      const tsItems = gsap.utils.toArray('.ts-item') as HTMLDivElement[];

      function updateTs(e: MouseEvent) {
        const target = e.target as HTMLInputElement,
          filterValue = target.getAttribute('data-value') || 'all',
          filterIndex = target.getAttribute('data-index') || '0';

        // move indicator in current filter button
        gsap.to(checkIndicator.current, {
          x: parseInt(filterIndex) * (filterWidth + filterGap),
          duration: 0.5,
          ease: 'power2.out',
        });

        const state = Flip.getState(tsItems);

        tsItems.forEach((item) => {
          item.style.display =
            filterValue === 'all' || item.getAttribute('data-categories')?.includes(filterValue)
              ? 'inline-flex'
              : 'none';
        });

        Flip.from(state, {
          duration: 0.7,
          scale: true,
          ease: 'power2.out',
          stagger: 0.08,
          absolute: true,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { opacity: 0, scale: 0 },
              { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
            ),
          onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.5, ease: 'power2.out' }),
        });
      }

      filters.forEach((f) => f.addEventListener('click', updateTs));

      return () => {
        filters.forEach((f) => f.removeEventListener('click', updateTs));
      };
    },
    { scope: container }
  );

  return (
    <div className="mt-20" ref={container}>
      {/* filters */}
      <div className="filters | relative flex items-center gap-2 border-b border-b-text dark:border-b-d-text">
        <div
          ref={checkIndicator}
          className="absolute left-0 top-1/2 h-12 w-32 -translate-y-1/2 bg-primary [&>label]:checked:text-white"></div>

        {/* filter buttons */}
        {tsFilters.map((f, i) => (
          <label
            htmlFor={f.id}
            key={f.id}
            className="z-[5] flex h-12 w-32 cursor-pointer items-center justify-center text-center text-lg capitalize transition-colors duration-500">
            <input
              type="radio"
              id={f.id}
              name="tsFilters"
              className="filter-input | h-0 w-0 opacity-0"
              data-value={f.value}
              data-index={i}
              defaultChecked={f.defaultChecked}
            />
            {f.value}
          </label>
        ))}
      </div>

      {/* tech stack */}
      <div className="mt-16 min-h-[400px] xl:min-h-[410px]">
        <div ref={tsItemsContainer} className="ts-item-container | flex flex-wrap gap-x-4 gap-y-6">
          {TECH_STACK.map((ts) => (
            <div
              key={ts.title}
              data-categories={ts.categories.join(' ')}
              className="ts-item | inline-flex items-center justify-center will-change-transform">
              <span className="whitespace-nowrap rounded-full border border-subtext bg-background px-4 py-2 text-center text-lg font-medium text-subtext dark:border-d-subtext dark:bg-d-background dark:text-d-subtext lg:px-8 lg:py-4 lg:text-xl">
                {ts.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  const isMobile = useMobileViewport();

  return (
    <Section id="techstack" borderBottom={false} className="techstack">
      <div className="container">
        <RevealText id="techStackHeading">
          <h2 className="heading-1">
            Tech Stack<span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">.</span>
          </h2>
        </RevealText>

        <p className="paragraph-1 mt-28 pb-0 sm:mt-40 sm:pb-0">
          These are the languages, frameworks, and tools I generally use.
          <br />
          And I am always ready to learn and adapt to new ones if necessary.
        </p>

        {isMobile ? <TechStackMobile /> : <TechStackDesktop />}
      </div>
    </Section>
  );
}
