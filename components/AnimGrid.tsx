"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";

import { useMobile, usePageVisible, useWindowResize } from "@/lib/hooks";
import { getAnimGridSize } from "@/lib/common";
import { useLayoutContext } from "@/context/LayoutContext";

export default function AnimGrid() {
  const { vw } = useWindowResize();
  const isPageVisible = usePageVisible();
  const { isScrolled } = useLayoutContext();
  const isMobile = useMobile();

  const animgrid = useRef<HTMLDivElement>(null);
  const animgridInner = useRef<HTMLDivElement>(null);
  const gridAnim = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP({ scope: animgrid });

  const increaseOpa = contextSafe(() => {
    gsap.to(animgridInner.current, {
      opacity: 1,
      duration: 0.3,
    });
  });

  const decreseOpa = contextSafe(() => {
    gsap.to(animgridInner.current, {
      opacity: 0.5,
      duration: 0.3,
    });
  });

  useEffect(() => {
    // create grid
    const grid = getAnimGridSize(vw);

    if (animgridInner.current) {
      animgridInner.current.style.gridTemplateColumns = `repeat(${grid.cols},1fr)`;
      animgridInner.current.style.gridTemplateRows = `repeat(${grid.rows},1fr)`;

      for (let i = 0; i < grid.cols * grid.rows; i++) {
        const d = document.createElement("div");
        d.className = "box";
        animgridInner.current?.appendChild(d);
      }
    }

    // comment only for development
    // animate animgrid
    if (!isMobile) {
      gridAnim.current = gsap
        .timeline({ delay: 5, repeat: -1, repeatDelay: 10 })
        .to(".animgrid-inner .box", {
          opacity: 0.5,
          scale: 0.9,
          duration: 2,
          ease: "power2.out",
          stagger: {
            amount: 2,
            grid: [grid.rows, grid.cols],
            from: "start",
          },
        })
        .to(
          ".animgrid-inner .box",
          {
            opacity: 0.1,
            scale: 1,
            duration: 2,
            ease: "power2.out",
            stagger: {
              amount: 2,
              grid: [grid.rows, grid.cols],
              from: "start",
            },
          },
          "-=10%"
        );
    }

    const animGridRef = animgridInner.current;

    return () => {
      if (animGridRef?.innerHTML) {
        animGridRef.innerHTML = "";
      }
      gridAnim.current?.kill();
    };
  }, [vw, isMobile]);

  // comment only for development
  useEffect(() => {
    if (isMobile) return;

    if (isPageVisible) {
      gridAnim.current?.resume();
    } else {
      gridAnim.current?.pause();
    }
  }, [isPageVisible, isMobile]);

  useEffect(() => {
    if (!isScrolled) {
      increaseOpa();
    } else {
      decreseOpa();
    }
  }, [isScrolled]);

  return (
    <div
      ref={animgrid}
      className="animgrid | pointer-events-none fixed top-0 left-0 -z-10 h-lvh w-full">
      <div
        className="animgrid-inner | [&>div]:border-text dark:[&>div]:border-d-text grid h-full w-full gap-3 sm:gap-4 [&>div]:rounded-sm [&>div]:border [&>div]:bg-transparent [&>div]:opacity-10"
        ref={animgridInner}></div>
    </div>
  );
}
