"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";

import { useLayoutContext } from "@/context/LayoutContext";
import { useHomeContext } from "@/context/HomeContext";
import { NAV_LINKS } from "@/lib/data";
import { useMobileViewport } from "@/lib/hooks";
import { cn } from "@/lib/common";
import { ToolTip } from "..";

function SideNav() {
  const { locoScroll } = useLayoutContext();
  const { activeSection } = useHomeContext();
  const sideNav = useRef<HTMLDivElement>(null);
  const btnIndicater = useRef<HTMLDivElement>(null);
  const btnHeight = 56,
    btnGap = 4;

  useGSAP(
    () => {
      // hide side menu in hero section
      if (!activeSection) return;

      if (activeSection.id === "hero") {
        gsap.to(sideNav.current, {
          x: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.75,
        });
      } else {
        gsap.to(sideNav.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.75,
        });
      }

      // move indicator in current link
      gsap.to(btnIndicater.current, {
        y: (parseInt(activeSection.key) - 1) * (btnHeight + btnGap),
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { dependencies: [activeSection] }
  );

  return (
    <div
      ref={sideNav}
      className="border-text bg-background dark:border-d-text dark:bg-d-background fixed top-(--side-nav-top) left-6 z-20 hidden h-(--side-nav-height) -translate-x-[100px] rounded-3xl border opacity-0 2xl:block">
      <div className="absolute inset-0 grid h-full w-full grid-cols-1 gap-(--side-nav-gap) overflow-hidden rounded-3xl">
        <div
          ref={btnIndicater}
          className="bg-primary absolute top-0 left-0 z-[-1] h-(--side-nav-btn-height) w-full"></div>
      </div>

      <div className="relative grid h-full grid-cols-1 gap-(--side-nav-gap)">
        {NAV_LINKS.map((l, i) => (
          <ToolTip key={l.key} toolTip={`${i + 1}. ${l.title}`}>
            <button
              type="button"
              onClick={() => locoScroll?.scrollTo(`#${l.id}`)}
              className={cn(
                "flex h-(--side-nav-btn-height) w-[54px] items-center justify-center rounded-3xl transition-colors duration-200 [&>svg]:h-7 [&>svg]:w-7",
                activeSection && activeSection.id === l.id
                  ? "text-white"
                  : "text-current"
              )}
              aria-label={`Scroll to section ${l.title}`}>
              {l.icon}
            </button>
          </ToolTip>
        ))}
      </div>
    </div>
  );
}

export default function SideNavWrapper() {
  const isMobile = useMobileViewport();

  if (isMobile) return null;

  return <SideNav />;
}
