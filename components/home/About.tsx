'use client';

import { WORK_EXPERIENCE } from '@/lib/data';
import { Section, RevealText, FadeIn, PopIn, CustomLink } from '..';
import { cn } from '@/lib/common';

export default function About() {
  return (
    <Section id="about" className="container-wide z-[10] bg-background dark:bg-d-background">
      <div className="container">
        <RevealText id="aboutHeading">
          <h2 className="heading-1">About Me</h2>
        </RevealText>

        <div className="mt-28 grid grid-cols-1 gap-10 sm:mt-40 lg:grid-cols-2 lg:gap-0">
          <div>
            <div>
              <FadeIn id="aboutDescription1">
                <p className="paragraph-1">
                  I’m a <span>Full-stack Developer</span> from Sri Lanka, currently freelancing since April 2023,
                  primarily focused on <span>Web Development</span>, creating beautiful and efficient web applications.
                  I’m also interested in <span>mobile and desktop applications</span>. I spend my time learning new
                  things, developing some cool stuff, and messing around with my computer.
                </p>
              </FadeIn>

              <FadeIn id="aboutDescription2">
                <p className="paragraph-1">
                  I'm <span>open to work</span> where I can contribute, and improve my skills while providing my best
                  effort. If you have a suitable opportunity that matches my skills, feel free to{' '}
                  <span>contact me</span>.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="lg:pl-32 lg:pt-2">
            <PopIn id="aboutResumeBtn" duration={2}>
              <CustomLink
                href="/static/sample_resume.pdf"
                rel="noopener noreferrer"
                download
                className="rounded-full px-12 py-10 text-xl sm:px-14 sm:py-12 sm:text-2xl">
                My Resume
              </CustomLink>
            </PopIn>
          </div>

          <div className="mt-28 sm:mt-40 lg:col-span-2">
            <RevealText id="aboutExperienceHeading">
              <h3 className="heading-2">Work Experience</h3>
            </RevealText>

            <ul className="mt-24 sm:mt-32">
              {WORK_EXPERIENCE.map((ex, i) => (
                <FadeIn key={ex.key} id={`aboutExperience-${ex.key}`}>
                  <li
                    className={cn(
                      'pb-8 sm:pb-10',
                      i === WORK_EXPERIENCE.length - 1
                        ? 'mb-0 border-b-0'
                        : 'mb-8 border-b border-b-subtext dark:border-d-subtext sm:mb-10'
                    )}>
                    <div className="grid grid-cols-[2rem_1fr] gap-x-4 lg:grid-cols-[2rem_22rem_1fr] lg:gap-x-8 [&_p]:pb-2">
                      <div>
                        <p className="paragraph-2">
                          <span>{(i + 1).toString().padStart(2, '0')}.</span>
                        </p>
                      </div>
                      <div className="col-start-2 row-start-2 lg:row-start-1">
                        <p className="paragraph-2">{ex.date}</p>
                      </div>
                      <div className="col-start-2 row-start-1 flex flex-col-reverse lg:col-start-3 lg:flex-col">
                        <p className="paragraph-2">{ex.title}</p>
                        <p className="paragraph-2">
                          <span>{ex.company}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
