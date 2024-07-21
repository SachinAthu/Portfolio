import { Section, RevealText } from '..';

export default function TechStack() {
  return (
    <Section id="techstack">
      <div className="container">
        <RevealText id="techStackHeading">
          <h2 className="heading-1">Tech Stack</h2>
        </RevealText>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </Section>
  );
}
