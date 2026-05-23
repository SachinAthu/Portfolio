"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";

import { useWindowResize } from "@/lib/hooks";
import { useLayoutContext } from "@/context/LayoutContext";
import { getAnimGridSize } from "@/lib/common";

export default function PageLoader() {
  const {
    isNavOpen,
    isPageLoading,
    isPageLoading2,
    setIsNavShow,
    setIsNavOpen,
  } = useLayoutContext();
  const { vw } = useWindowResize();

  const loader = useRef<HTMLDivElement>(null);
  const loaderWrapper = useRef<HTMLDivElement>(null);
  const loader2 = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const vwRef = useRef(vw);

  const { contextSafe } = useGSAP({ scope: container });

  const openLoader = contextSafe(() => {
    const boxes = loader.current?.querySelectorAll(".box");

    if (!boxes || boxes.length === 0) return;

    gsap
      .timeline()
      .set(loaderWrapper.current, { pointerEvents: "auto" })
      .to(
        boxes,
        {
          opacity: 1,
          scale: 1.02,
          ease: "power2.out",
          stagger: {
            amount: 1,
            grid: "auto",
            from: "start",
          },
        },
        0
      )
      .to(loader.current, {
        gap: 0,
        duration: 0.2,
        delay: 0.2,
        ease: "power2.out",
      });
  });

  const closeLoader = contextSafe(() => {
    const boxes = loader.current?.querySelectorAll(".box");

    if (!boxes || boxes.length === 0) return;

    gsap
      .timeline()
      .to(loader.current, {
        gap: vw < 768 ? 12 : 16,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(
        boxes,
        {
          opacity: 0,
          scale: 0.8,
          delay: 0.2,
          ease: "power2.out",
          stagger: {
            amount: 1,
            grid: "auto",
            from: "end",
          },
        },
        ">"
      )
      .set(loaderWrapper.current, { pointerEvents: "none" });
  });

  const openLoader2 = contextSafe(() => {
    if (!loader2.current) return;

    gsap.to(loader2.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  const closeLoader2 = contextSafe(() => {
    if (!loader2.current) return;

    gsap.to(loader2.current, {
      duration: 0.5,
      opacity: 0,
      ease: "power2.out",
    });
  });

  useEffect(() => {
    const createGrid = () => {
      if (!loader.current) return;

      loader.current.innerHTML = "";

      const grid = getAnimGridSize(window.innerWidth);

      loader.current.style.gridTemplateColumns = `repeat(${grid.cols},1fr)`;
      loader.current.style.gridTemplateRows = `repeat(${grid.rows},1fr)`;

      for (let i = 0; i < grid.cols * grid.rows; i++) {
        const b = document.createElement("div");
        b.className = "box";
        b.style.opacity = isNavOpen ? "1" : "0";
        b.style.scale = "none";
        b.style.transform = isNavOpen
          ? "translate3d(0px, 0px, 0px)"
          : "translate3d(0px, 0px, 0px) scale(0.8, 0.8)";
        b.style.rotate = "none";
        b.style.translate = "none";
        loader.current?.appendChild(b);
      }
    };

    if (vwRef.current !== vw) {
      vwRef.current = vw;
      createGrid();
    }
  }, [vw, isNavOpen]);

  useEffect(() => {
    if (vw >= 1536) {
      // close nav menu
      setIsNavOpen(false);
    }
  }, [vw]);

  // nav menu toggle
  useEffect(() => {
    if (isPageLoading) return;

    loaderWrapper.current?.classList.remove("z-[70]");

    if (isNavOpen) {
      openLoader();
      setTimeout(() => {
        setIsNavShow(true);
      }, 2500);
    } else {
      setIsNavShow(false);
      setTimeout(() => {
        closeLoader();
      }, 2000);
    }
  }, [isNavOpen, isPageLoading]);

  // page load
  useEffect(() => {
    if (isPageLoading) {
      loaderWrapper.current?.classList.add("z-[70]");
      openLoader();
    } else {
      closeLoader();
      setTimeout(() => {
        loaderWrapper.current?.classList.remove("z-[70]");
      }, 1900);
    }
  }, [isPageLoading]);

  // page load quick
  useEffect(() => {
    if (isPageLoading2) {
      openLoader2();
    } else {
      closeLoader2();
    }
  }, [isPageLoading2]);

  return (
    <div ref={container}>
      <div
        ref={loaderWrapper}
        className="page-loader | pointer-events-none fixed top-0 left-0 z-30 h-lvh w-full">
        <div
          className="page-loader-inner | [&>div]:bg-nav grid h-full w-full gap-3 sm:gap-4 [&>div]:scale-[0.8] [&>div]:border-none"
          ref={loader}></div>
      </div>

      <div
        ref={loader2}
        className="page-loader-2 | bg-background dark:bg-d-background pointer-events-none fixed top-0 left-0 z-80 h-lvh w-full opacity-0"></div>
    </div>
  );
}
