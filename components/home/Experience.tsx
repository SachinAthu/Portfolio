import { WORK_EXPERIENCE } from '@/lib/data';
import { FadeIn, RevealText, Section } from '..';
import { cn } from '@/lib/common';

export default function Experience() {
  return (
    <Section id="experience" className="container-wide bg-background dark:bg-d-background">
      <div className="container">
        <RevealText id="experienceHeading">
          <h2 className="heading-1">
            Experience
            <span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">.</span>
          </h2>
        </RevealText>

        <div className="mt-28 sm:mt-40">
          <ul className="mt-24 sm:mt-32">
            {WORK_EXPERIENCE.map((ex, i) => (
              <FadeIn key={ex.key} id={`experience-${ex.key}`}>
                <li
                  className={cn(
                    'pb-10 sm:pb-12',
                    i === WORK_EXPERIENCE.length - 1
                      ? 'mb-0 border-b-0'
                      : 'mb-14 border-b border-b-subtext dark:border-d-subtext sm:mb-16'
                  )}>
                  <div className="grid grid-cols-[1.5rem_1fr] gap-x-4 sm:grid-cols-[2rem_1fr] lg:grid-cols-[2rem_22rem_1fr] lg:gap-x-8 [&_p]:pb-2">
                    <div>
                      <p className="paragraph-2">{(i + 1).toString().padStart(2, '0')}.</p>
                    </div>

                    <div className="col-span-2 col-start-1 sm:col-span-1 sm:col-start-2">
                      <p className="paragraph-2">{ex.date}</p>
                    </div>

                    <div className="col-start-2 row-start-1 mb-2 lg:col-start-3">
                      <p className="paragraph-2 font-medium">{ex.company}</p>
                    </div>

                    <div className="col-span-2 col-start-1 row-start-2 sm:col-span-1 sm:col-start-2 lg:col-start-3">
                      <p className="paragraph-2 dark:text-primary">{ex.title}</p>
                    </div>

                    <div className="col-span-2 col-start-1 sm:col-span-1 sm:col-start-2 lg:col-start-3">
                      <p className="paragraph-2">{ex.description}</p>
                      <div className="mt-2 flex flex-wrap items-center">
                        {ex.technologies.map((t, i) => (
                          <div key={t} className="mb-1 text-base text-subtext dark:text-d-subtext sm:text-lg">
                            {t}
                            {i + 1 !== ex.technologies.length && <span className="mx-2 font-medium">|</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
