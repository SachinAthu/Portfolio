import { RevealText, Section } from '../..';
import ContactForm from './ContactForm';
import ContactSocials from './ContactSocials';

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

        <div className="mt-20 md:mt-32 lg:mt-36">
          <p className="paragraph-2">Leave me a message. I will get back to you as soon as I can.</p>

          {/* contact form */}
          <ContactForm />

          {/* social links */}
          <ContactSocials />
        </div>
      </div>
    </Section>
  );
}
