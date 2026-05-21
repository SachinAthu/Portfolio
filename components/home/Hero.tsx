import { CustomLink, Section } from "..";

import { SiGithub } from "react-icons/si";
import { IoLogoLinkedin } from "react-icons/io";

export default function Hero() {
  return (
    <Section
      id="hero"
      paddingTop={false}
      paddingBottom={false}
      className="container-wide relative h-[clamp(40rem,96svh,60rem)] sm:h-[clamp(50rem,100vh,60rem)]"
      borderBottom={false}>
      <div
        data-scroll
        data-scroll-speed="-0.5"
        className="flex h-full grid-cols-2 flex-col-reverse justify-between px-[calc(3%+1.5rem)] pt-12 pb-28 will-change-transform sm:flex-col sm:px-[calc(3%+2rem)] 2xl:px-8">
        <div className="flex flex-col items-end">
          <div className="mb-8 sm:mb-12">
            <p className="max-w-120 text-right text-5xl font-medium sm:text-7xl">
              Full-stack Developer;
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <CustomLink
              id="heroSocialGithubLink"
              href="https://github.com/SachinAthu"
              target="_blank"
              className="p-3"
              icon
              aria-label="Github account">
              <SiGithub />
            </CustomLink>
            <CustomLink
              id="heroSocialLinkedinLink"
              href="https://www.linkedin.com/in/sachinathu/"
              target="_blank"
              className="p-3"
              icon
              aria-label="LinkedIn account">
              <IoLogoLinkedin />
            </CustomLink>
          </div>
        </div>

        <div>
          <h1 className="text-[clamp(3.5rem,11vw,10rem)] leading-none font-semibold">
            Sachin <br /> Athukorala
          </h1>
        </div>
      </div>
    </Section>
  );
}
