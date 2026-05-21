"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { Flip } from "gsap/Flip";

import MenuBtn from "./MenuBtn";
import Logo from "./Logo";
import { useLayoutContext } from "@/context/LayoutContext";
import { cn } from "@/lib/common";
import { useMobileViewport } from "@/lib/hooks";

const Music = dynamic(() => import("./Music"), {
  ssr: false,
  loading: () => (
    <div className="skeleton hidden h-9 w-32 rounded-full md:block" />
  ),
});

const ThemeBtn = dynamic(() => import("./ThemeBtn"), {
  ssr: false,
  loading: () => <div className="skeleton h-9 w-18 rounded-full" />,
});

function HeaderMobile() {
  return (
    <div className="h-(--header-content-height) w-full">
      <div className="container h-full">
        <div className="flex h-full items-center justify-between rounded-full px-[2%] backdrop-blur-lg">
          <div className="flex h-full items-center justify-center rounded-full px-4">
            <Logo />
          </div>

          <div className="flex h-full items-center gap-4 rounded-full px-4">
            <ThemeBtn />

            <MenuBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderDesktop() {
  const { isScrolled } = useLayoutContext();
  const header = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(Flip);

      const state = Flip.getState(".header-inner-1, .header-inner-2");

      if (isScrolled) {
        header.current?.classList.add("scrolled");
      } else {
        header.current?.classList.remove("scrolled");
      }

      Flip.from(state, {
        absolute: true,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { dependencies: [isScrolled] }
  );

  return (
    <div
      ref={header}
      className={cn(
        "header-inner | container-wide flex h-(--header-content-height) w-full items-center justify-between rounded-full px-[3%] sm:rounded-none 2xl:px-0"
      )}>
      <div className="header-inner-1 | flex h-full items-center justify-center rounded-full px-8 backdrop-blur-lg">
        <Logo />
      </div>

      <div className="header-inner-2 | flex h-full items-center gap-4 rounded-full px-8 backdrop-blur-lg">
        <Music />

        <ThemeBtn />

        <MenuBtn />
      </div>
    </div>
  );
}

export default function HeaderWraper() {
  const isMobile = useMobileViewport(true);

  return (
    <header
      id="app-header"
      className="header | fixed top-0 right-0 left-0 z-50 flex h-(--header-height) w-full items-center">
      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
    </header>
  );
}
