"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";

import { WORKS } from "@/lib/data";
import { PageLink, RevealText, Section, ToolTip } from "..";
import { WorkType } from "@/lib/types";
import { useObserver, usePageVisible } from "@/lib/hooks";
import { cn } from "@/lib/common";

interface WorkProps {
  work: WorkType;
  index: number;
}

function Work({ work, index }: WorkProps) {
  const workEl = useRef<HTMLDivElement | null>(null);
  const workWrapperEl = useRef<HTMLDivElement | null>(null);
  const videoEl = useRef<HTMLVideoElement | null>(null);

  const isVisible = useObserver(`#work-${index}`);
  const isPageVisible = usePageVisible();

  useEffect(() => {
    if (!workEl.current || !workWrapperEl.current) return;

    const isEven = index % 2 === 0;

    gsap.set(workEl.current, {
      x: isEven ? "-20vw" : "20vw",
      rotateZ: isEven ? -5 : 5,
      opacity: 0.5,
      scale: 0.75,
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        let { isMobile } = context.conditions!;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: workWrapperEl.current,
              start: "top 110%",
              end: isMobile ? "top 40%" : "top 20%",
              scrub: true,
              once: isMobile,
            },
          })
          .to(workEl.current, {
            x: "0vw",
            rotateZ: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "none",
          });
      }
    );

    return () => {
      mm.revert();
    };
  }, [index]);

  useEffect(() => {
    if (isVisible && isPageVisible) {
      videoEl.current?.play();
    } else {
      videoEl.current?.pause();
    }
  }, [isVisible, isPageVisible]);

  return (
    <div
      id={`work-${index}`}
      ref={workWrapperEl}
      className={`work-wrapper mb-20 flex last:mb-0 sm:mb-28 lg:mb-40 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
      <div ref={workEl} className="work rounded-3xl lg:w-[75%]">
        <ToolTip toolTip="Case Study" className="p-8 text-2xl">
          <PageLink href={`/works/${work.slug}`}>
            <div className="space-y-4 pb-2">
              <div className="relative h-auto overflow-hidden rounded-xl">
                <video
                  ref={videoEl}
                  className="h-full w-full object-cover"
                  poster={work.video.poster}
                  preload="metadata"
                  loop
                  muted
                  playsInline>
                  {work.video.urls.map((source) => (
                    <source
                      key={source.src}
                      src={source.src}
                      type={source.type}
                    />
                  ))}
                </video>
              </div>

              <div
                className={cn(
                  "flex items-end gap-3",
                  index % 2 === 0 ? "flex-row w-auto" : "flex-row-reverse w-fit"
                )}>
                <h3
                  className={cn(
                    "text-xl sm:text-3xl lg:text-4xl font-medium underline underline-offset-8",
                    index % 2 === 0 ? "ml-auto" : ""
                  )}>
                  {work.title}
                </h3>

                <span className="text-base sm:text-xl lg:text-2xl">
                  {(index + 1).toString().padStart(2, "0")}.
                </span>
              </div>
            </div>
          </PageLink>
        </ToolTip>
      </div>
    </div>
  );
}

export default function Works() {
  return (
    <Section id="works" borderBottom={false} className="my-works">
      <div className="overflow-hidden">
        <div className="container">
          <RevealText id="worksHeading">
            <h2 className="heading-1">
              My Works
              <span className="animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite] text-primary">
                .
              </span>
            </h2>
          </RevealText>

          <div className="mt-28 lg:mt-40">
            {WORKS.map((work, i) => (
              <Work key={work.key} work={work} index={i} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
