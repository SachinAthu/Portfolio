'use client';

import { DelayedLink, RevealText, Section } from '..';

export default function Works() {
  return (
    <Section id="works" borderBottom={false}>
      <div className="container">
        <RevealText id="worksHeading">
          <h2 className="heading-1">
            My Works<span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">.</span>
          </h2>
        </RevealText>

        <DelayedLink href={'/works/first'}>Work 1</DelayedLink>
      </div>
    </Section>
  );
}
