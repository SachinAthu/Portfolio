'use client';

import { DelayedLink, RevealText, Section } from '..';

export default function Works() {
  return (
    <Section id="works" className="container-wide bg-background dark:bg-d-background">
      <div className="container">
        <RevealText id="worksHeading">
          <h2 className="heading-1">My Works</h2>
        </RevealText>

        <DelayedLink href={'/works/first'}>Work 1</DelayedLink>
      </div>
    </Section>
  );
}
