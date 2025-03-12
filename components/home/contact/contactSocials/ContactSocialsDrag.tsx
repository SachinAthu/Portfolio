'use client';

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap-config';
import { useTouch, useWindowResize } from '@/lib/hooks';
import { SOCIAL_LINKS } from '@/lib/data';

type SocialLinkProps = {
  index: number;
  id: string;
  title: string;
  link: string;
  xVal: number;
  handleMouseUp: (index: number, xVal: number) => void;
};

const SocialLink = memo(({ index, id, title, link, xVal, handleMouseUp }: SocialLinkProps) => {
  const isTouch = useTouch();
  const socialLinkEl = useRef<HTMLAnchorElement>(null);
  const socialLinkWrapperEl = useRef<HTMLDivElement>(null);
  const socialLinkBorderEl = useRef<HTMLDivElement>(null);
  const isUnlock = useRef(false);

  const changeCursor = useCallback((isGrabbing: boolean) => {
    if (!socialLinkEl.current) return;

    if (isGrabbing) {
      socialLinkEl.current.style.cursor = 'grabbing';
    } else {
      if (isUnlock.current) {
        socialLinkEl.current.style.cursor = 'pointer';
      } else {
        socialLinkEl.current.style.cursor = 'grab';
      }
    }
  }, []);

  const toggleUnlock = useCallback(() => {
    if (!socialLinkEl.current) return;

    if (isUnlock.current) {
      socialLinkEl.current.classList.add('unlock');
    } else {
      socialLinkEl.current.classList.remove('unlock');
    }
  }, []);

  useEffect(() => {
    if (!socialLinkEl.current || !socialLinkWrapperEl.current) return;

    const controller = new AbortController();
    let minX = 0;
    let maxX = socialLinkWrapperEl.current.clientWidth - socialLinkEl.current.clientWidth - 8; // padding x = 8px
    let isDragging = false,
      startX = 0,
      initialX = 0,
      translateX = xVal;
    let startTime: number;
    const holdTime = 500; // Long click threshold in milliseconds

    // reset x and scaleX
    const resetTween = gsap
      .timeline()
      .to(socialLinkEl.current, {
        x: xVal,
        duration: 1,
        ease: 'power2.out',
      })
      .to(
        socialLinkBorderEl.current,
        {
          scaleX: xVal / maxX,
          duration: 1,
          ease: 'power2.out',
        },
        '<'
      );

    isUnlock.current = xVal === maxX;
    toggleUnlock();
    changeCursor(false);

    const xTo = gsap.quickTo(socialLinkEl.current, 'x', { duration: 0.6, ease: 'power2.out' });
    const scaleXTo = gsap.quickTo(socialLinkBorderEl.current, 'scaleX', { duration: 0.6, ease: 'power2.out' });

    // mouse down / touch start
    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      // console.log('mouse down');

      isDragging = true;
      startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      initialX = translateX;
      changeCursor(true);

      startTime = Date.now(); // Store the timestamp when the button is pressed
    };

    // mouse move / touch move
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      // console.log('mouse move');

      let newX = initialX + (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - startX;
      translateX = gsap.utils.clamp(minX, maxX, newX);
      // console.log(translateX);
      xTo(translateX);
      scaleXTo(translateX / maxX);
    };

    // mouse up / touch end
    const onMouseUp = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || (isTouch && e instanceof MouseEvent)) return;
      console.log('mouse up');

      isDragging = false;
      handleMouseUp(index, translateX);

      // check if user clicked the link
      const elapsedTime = Date.now() - startTime; // Calculate the time difference

      if (elapsedTime < holdTime && isUnlock.current) {
        window.open(link, '_blank', 'noopener noreferrer');
      }
    };

    // mouse leave / touch cancel
    const onMouseLeave = () => {
      // console.log('mouse leave');

      startTime = 0; // Reset the start time
    };

    // mouse events
    socialLinkEl.current.addEventListener('mousedown', onMouseDown, { signal: controller.signal });
    window.addEventListener('mousemove', onMouseMove, { signal: controller.signal });
    window.addEventListener('mouseup', onMouseUp, { signal: controller.signal });
    socialLinkEl.current.addEventListener('mouseleave', onMouseLeave, { signal: controller.signal });

    // touch events
    if (isTouch) {
      socialLinkEl.current.addEventListener('touchstart', onMouseDown, { signal: controller.signal });
      window.addEventListener('touchmove', onMouseMove, { signal: controller.signal });
      window.addEventListener('touchend', onMouseUp, { signal: controller.signal });
      window.addEventListener('touchcancel', onMouseLeave, { signal: controller.signal });
    }

    return () => {
      controller.abort();
      resetTween.kill();
      xTo.tween.kill();
      scaleXTo.tween.kill();
    };
  }, [xVal, index, link, changeCursor, toggleUnlock, handleMouseUp, isTouch]);

  return (
    <div ref={socialLinkWrapperEl} className="social-link-container overflow-hidden px-1 pt-6">
      <Link
        ref={socialLinkEl}
        id={id}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        onClick={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        className="social-link | relative grid h-20 w-36 cursor-grab touch-pan-x select-none place-items-center overflow-hidden rounded-full border border-gray-300 px-1 text-base will-change-transform dark:border-gray-600 sm:w-44 sm:text-lg lg:h-28 lg:w-56 lg:text-2xl">
        <div className="social-link-inner | relative origin-[50%_0]">
          <div className="social-link-inner-1 whitespace-nowrap">{title}</div>

          <div className="social-link-inner-2 absolute origin-[50%_0] [&_svg]:absolute [&_svg]:left-1/2 [&_svg]:top-1/2 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:-translate-x-1/2 [&_svg]:-translate-y-1/2 [&_svg]:will-change-transform lg:[&_svg]:h-10 lg:[&_svg]:w-10">
            <span className="invisible">{title}</span>

            <GoArrowUpRight />
          </div>
        </div>
      </Link>

      <div className="relative mt-4 h-[1px] w-full bg-gray-300 dark:bg-gray-600">
        <div
          ref={socialLinkBorderEl}
          className="absolute inset-0 h-full w-full origin-left scale-x-0 bg-text dark:bg-d-text"></div>
      </div>
    </div>
  );
});

SocialLink.displayName = 'SocialLink';

export default function ContactSocialsDrag() {
  const slLen = SOCIAL_LINKS.length;
  const { vw } = useWindowResize();
  const [xVals, setXVals] = useState<number[]>([0, 0, 0, 0, 0]);
  const container = useRef<HTMLDivElement | null>(null);
  const isInit = useRef(false);

  const handleMouseUp = useCallback(
    (index: number, xVal: number) => {
      // calculate x values
      // console.log(index, xVal);

      const sl = document.querySelector('.social-link') as HTMLAnchorElement;
      if (!sl || !container.current) return;

      const maxX = container.current.clientWidth - sl.clientWidth - 8;
      const diff = container.current.clientWidth * 0.05;

      setXVals((prev) => {
        const arr = [...prev];

        for (let i = 0; i < slLen; i++) {
          arr[i] = gsap.utils.clamp(0, maxX, xVal - diff * Math.abs(i - index));
        }

        return arr;
      });
    },
    [slLen]
  );

  const resetXVals = useCallback(() => {
    if (!container.current) return;

    const w = container.current.clientWidth;
    let arr = [];
    for (let i = 0; i < slLen; i++) {
      arr.push(w * 0.05 * (slLen - i - 1));
    }
    setXVals(arr);
  }, [slLen]);

  useEffect(() => {
    // update x value accrding to the index
    if (vw === 0 || !isInit.current) return;

    resetXVals();
  }, [vw, resetXVals]);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        id: 'contact-social-trigger',
        start: 'top 50%',
        end: 'top top',
        onEnter: () => {
          resetXVals();
          isInit.current = true;
        },
      });
    },
    { dependencies: [resetXVals] }
  );

  // console.log(xVals);

  return (
    <div className="contact-social-drag mt-20 sm:mt-40" ref={container}>
      {SOCIAL_LINKS.map((sl, i) => (
        <SocialLink
          key={sl.id}
          index={i}
          id={sl.id}
          title={sl.title}
          link={sl.link}
          xVal={xVals[i]}
          handleMouseUp={handleMouseUp}
        />
      ))}
    </div>
  );
}
