'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { SOCIAL_LINKS } from '@/lib/data';

type SocialLinkProps = {
  index: number;
  id: string;
  title: string;
  link: string;
  icon: React.ReactNode;
};

function SocialLink({ index, id, title, link, icon }: SocialLinkProps) {
  const socialLinkEl = useRef<HTMLAnchorElement | null>(null);
  const socialLinkWrapperEl = useRef<HTMLDivElement | null>(null);
  const flairEl = useRef<HTMLDivElement | null>(null);
  const flairTween = useRef<gsap.core.Tween>();

  useEffect(() => {
    if (!socialLinkEl.current || !flairEl.current) return;

    flairTween.current = gsap.to(flairEl.current, {
      scaleX: 1,
      duration: 1,
      ease: 'power1.out',
      paused: true,
      onComplete: () => {
        setTimeout(() => {
          window.open(link, '_blank', 'noopener noreferrer');
          if (flairTween.current) {
            gsap.set(flairEl.current, { scaleX: 0 });
          }
        }, 500);
      },
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        let { isMobile } = context.conditions!;

        let n = isMobile ? index % 2 : index;

        gsap.to(socialLinkEl.current, {
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: socialLinkWrapperEl.current,
            start: `top ${120 - n * 15}%`,
            end: 'top 30%',
            scrub: true,
          },
        });
      }
    );

    return () => {
      mm.kill();
      flairTween.current?.kill();
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (flairTween.current) {
      flairTween.current.invalidate().restart();
    }
  }

  return (
    <div ref={socialLinkWrapperEl} className="social-link-wrapper">
      <Link
        ref={socialLinkEl}
        key={id}
        id={id}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        onClick={handleClick}
        className="social-link | relative grid h-full w-full scale-0 place-items-center overflow-hidden rounded-3xl border border-gray-300 dark:border-gray-600">
        {icon}

        <div
          ref={flairEl}
          className="absolute inset-0 h-full w-full origin-left scale-x-0 bg-gray-400 opacity-10"></div>
      </Link>
    </div>
  );
}

export default function ContactSocialsNoDrag() {
  return (
    <div className="contact-social-no-drag mt-32 sm:mt-52">
      <div className="">
        <div className="links-1 grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:grid-cols-[1.5fr_1fr]">
          {SOCIAL_LINKS.slice(0, 2).map((sl, i) => (
            <SocialLink index={i} key={sl.id} id={sl.id} title={sl.title} link={sl.link} icon={sl.icon} />
          ))}
        </div>

        <div className="links-2 mt-2 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-4 md:mt-6 md:gap-6 lg:grid-cols-3">
          {SOCIAL_LINKS.slice(2).map((sl, i) => (
            <SocialLink index={i} key={sl.id} id={sl.id} title={sl.title} link={sl.link} icon={sl.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
