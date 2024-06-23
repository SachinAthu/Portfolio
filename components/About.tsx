'use client';

import toast from 'react-hot-toast';
import { Section, RevealText } from '.';

export default function About() {
  return (
    <Section id="about">
      <RevealText id="aboutHeading">
        <h2 className="heading-1">About Me</h2>
      </RevealText>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <button
        type="button"
        onClick={() => {
          toast.custom('Completed');
        }}>
        Toast
      </button>
    </Section>
  );
}
