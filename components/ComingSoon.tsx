"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap-config";
import { cn } from "@/lib/common";

type ComingSoonProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function ComingSoon({
  title = "Coming Soon",
  description,
  className,
}: ComingSoonProps) {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cs-heading", {
        opacity: 0,
        y: 60,
        ease: "power3.out",
        duration: 1.2,
        delay: 0.3,
      });

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "power3.inOut",
          duration: 1.4,
          delay: 0.6,
        }
      );

      if (description) {
        gsap.from(".cs-desc", {
          opacity: 0,
          y: 40,
          ease: "power3.out",
          duration: 1,
          delay: 0.8,
        });
      }
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className={cn(
        "container-wide flex h-svh flex-col items-center justify-center gap-6",
        className || ""
      )}>
      <div className="cs-heading flex items-center gap-2">
        <h1 className="heading-1">
          {title}
          <span className="text-primary animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite]">
            .
          </span>
        </h1>
      </div>

      <div ref={lineRef} className="bg-primary h-[2px] w-48 origin-center" />

      {description && (
        <p className="cs-desc paragraph-1 text-subtext dark:text-d-subtext max-w-lg text-center">
          {description}
        </p>
      )}
    </div>
  );
}
