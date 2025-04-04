import { CustomLink, Section } from '..';

import { SiCodepen, SiGithub, SiHackerrank, SiLeetcode, SiLinkedin } from 'react-icons/si';

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
        className="flex h-full grid-cols-2 flex-col-reverse justify-between px-[calc(3%+1.5rem)] pb-28 pt-12 will-change-transform sm:flex-col sm:px-[calc(3%+2rem)] 2xl:px-8">
        <div className="flex flex-col items-end">
          <div className="mb-8 sm:mb-12">
            <p className="max-w-[30rem] text-right text-5xl font-medium sm:text-7xl">Full-stack Developer;</p>
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
              <SiLinkedin />
            </CustomLink>
            <CustomLink
              id="heroSocialCodepenLink"
              href="https://codepen.io/sachinathu"
              target="_blank"
              className="p-3"
              icon
              aria-label="Codepen account">
              <SiCodepen />
            </CustomLink>
            <CustomLink
              id="heroSocialHRLink"
              href="https://www.hackerrank.com/profile/sachin2262716"
              target="_blank"
              className="p-3"
              icon
              aria-label="Hackerrank account">
              <SiHackerrank />
            </CustomLink>
            <CustomLink
              id="heroSocialLeetcodeLink"
              href="https://leetcode.com/sachin2262716"
              target="_blank"
              className="p-3"
              icon
              aria-label="Leetcode account">
              <SiLeetcode />
            </CustomLink>
            {/* <CustomLink
              id="heroSocialCodeSBLink"
              href="https://codesandbox.io/u/sachinAthu"
              target="_blank"
              className="p-3"
              icon aria-label='Codesandbox account'>
              <SiCodesandbox />
            </CustomLink> */}
          </div>
        </div>

        <div>
          <h1 className="text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-none">
            Sachin <br /> Athukorala
          </h1>
        </div>
      </div>
    </Section>
  );
}
