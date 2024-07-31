'use client';

import { Section, RevealText, FadeIn, CustomLink } from '..';

export default function About() {
  return (
    <Section id="about" className="container-wide z-[10] bg-background dark:bg-d-background">
      <div className="container">
        <RevealText id="aboutHeading">
          <h2 className="heading-1">
            About Me<span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">.</span>
          </h2>
        </RevealText>

        <div className="mt-28 grid grid-cols-1 gap-10 sm:mt-40 lg:grid-cols-2 lg:gap-0">
          <div className="">
            <FadeIn id="aboutDescription1">
              <p className="paragraph-1 [&>span]:font-medium dark:[&>span]:font-normal dark:[&>span]:text-primary">
                I’m a <span>Full-stack Developer</span> from Sri Lanka, currently freelancing since April 2023,
                primarily focused on <span>Web Development</span>, creating beautiful and efficient web applications.
                I’m also interested in developing <span>mobile and desktop applications</span>. I enjoy my time learning
                new things, developing some cool stuff, and messing around with my computer.
              </p>
            </FadeIn>

            <FadeIn id="aboutDescription2">
              <p className="paragraph-1 [&>span]:font-medium dark:[&>span]:font-normal dark:[&>span]:text-primary">
                I'm <span>open to work</span> where I can contribute, and improve my skills while providing my best
                effort. If you have a suitable opportunity that matches my skills, feel free to <span>contact me</span>.
              </p>
            </FadeIn>
          </div>

          <div className="lg:pl-32 lg:pt-2">
            <FadeIn id="aboutResumeBtn" delay={0.5}>
              <CustomLink
                id="resumeDownloadLink"
                content="My Resume"
                href="/static/sample_resume.pdf"
                rel="noopener noreferrer"
                download
                className="rounded-full px-12 py-10 text-xl sm:px-14 sm:py-12 sm:text-2xl"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </Section>
  );
}
