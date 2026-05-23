"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { cn } from "@/lib/common";

type FadeInProps = {
  children: React.ReactNode;
  id: string;
  duration?: number;
  delay?: number;
  markers?: boolean;
  className?: string;
};

export default function FadeIn({
  children,
  id,
  duration = 1,
  delay = 0,
  markers = false,
  className = "",
}: FadeInProps) {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(fade.current, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          id: `${id}-fadeIn`,
          trigger: trigger.current,
          start: "top 90%",
          end: "top top",
          markers,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="w-full">
      <div ref={trigger} className="w-full">
        <div
          ref={fade}
          id={id}
          className={cn("translate-y-7.5 opacity-0", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
