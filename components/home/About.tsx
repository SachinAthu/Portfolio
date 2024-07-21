'use client';

import { Section, RevealText, Button } from '..';

export default function About() {
  return (
    <Section id="about" className="container-wide z-[10] bg-background dark:bg-d-background">
      <div className="container">
        <RevealText id="aboutHeading">
          <h2 className="heading-1">About Me</h2>
        </RevealText>

        <div className="grid grid-cols-2">
          <div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          <div>
            <Button onClick={() => {}}>My Resume</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
