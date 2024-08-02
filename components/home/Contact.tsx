import { RevealText, Section } from '..';

export default function Contact() {
  return (
    <Section
      id="contact"
      className="container-wide min-h-screen bg-background dark:bg-d-background"
      borderBottom={false}>
      <div className="container">
        <RevealText id="contactHeading">
          <h2 className="heading-1">
            Contact Me<span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">.</span>
          </h2>
        </RevealText>
      </div>
    </Section>
  );
}
