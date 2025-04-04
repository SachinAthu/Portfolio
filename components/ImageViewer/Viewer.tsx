'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback, useMobile } from '@/lib/hooks';
import Controlls from './Controlls';

type Position = {
  x: number;
  y: number;
};

export default function Viewer({ src }: { src: string }) {
  const isMobile = useMobile();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef(new Image());

  const scaleRef = useRef(1);
  const scaleTargetRef = useRef(1);

  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const positionTargetRef = useRef<Position>({ x: 0, y: 0 });
  const lastMousePos = useRef<Position>({ x: 0, y: 0 }); // device pixel ratio
  const touchDistance = useRef<number | null>(null); // For pinch-to-zoom
  const lastClick = useRef(0); // For double click / tap
  const isDragging = useRef(false);

  const minScale = useRef(1);
  const requestRef = useRef<number | null>(null); // animation frame state
  const animationRef = useRef<number | null>(null); // zoom animation state

  const [isControlls, setIsControlls] = useState(false);

  const maxScale = 3,
    maxDPR = 2, // cap to 2x max
    scaleFactor = 0.1,
    easingFactor = 0.25,
    dragThreshold = isMobile ? 200 : 400,
    doubleClickDelay = 300, // Max delay for double tap (ms)
    animateScaleThreshold = 0.001,
    animatePositionThreshold = 0.1;

  const draw = useCallback((ctx: CanvasRenderingContext2D | null | undefined) => {
    if (!canvasRef.current || !ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(
      imageRef.current,
      positionRef.current.x,
      positionRef.current.y,
      imageRef.current.width * scaleRef.current,
      imageRef.current.height * scaleRef.current
    );
  }, []);

  const initCanvas = useDebouncedCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, maxDPR);
    // const dpr = 1;

    // Set proper canvas size
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    imageRef.current.src = src;
    imageRef.current.onload = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let scale = scaleRef.current,
        imgW = imageRef.current.width,
        imgH = imageRef.current.height;

      if (imgW > width || imgH > height) {
        // image bigger
        scale = Math.min(width / imgW, height / imgH);
        imgW *= scale;
        imgH *= scale;
      }

      positionRef.current = {
        x: (width - imgW) / 2,
        y: (height - imgH) / 2,
      };
      scaleRef.current = scale;
      minScale.current = scale;
      scaleTargetRef.current = scale;

      draw(ctx);

      setIsControlls(true);
    };
  }, 100);

  // Throttle Rendering Using requestAnimationFrame
  const requestCanvasUpdate = useCallback(() => {
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(() => {
        const ctx = canvasRef.current?.getContext('2d');
        draw(ctx);
        requestRef.current = null; // Reset request flag
      });
    }
  }, [draw]);

  // Apply easing to zoom
  const animateZoom = useCallback(() => {
    const scaleDiff = scaleTargetRef.current - scaleRef.current;
    const newScale = scaleRef.current + scaleDiff * easingFactor; // Apply easing factor

    const posDiffX = positionTargetRef.current.x - positionRef.current.x;
    const posDiffY = positionTargetRef.current.y - positionRef.current.y;
    const newX = positionRef.current.x + posDiffX * easingFactor; // Apply easing
    const newY = positionRef.current.y + posDiffY * easingFactor; // Apply easing

    if (
      animationRef.current &&
      Math.abs(scaleDiff) < animateScaleThreshold &&
      Math.abs(positionTargetRef.current.x - newX) < animatePositionThreshold &&
      Math.abs(positionTargetRef.current.y - newY) < animatePositionThreshold
    ) {
      cancelAnimationFrame(animationRef.current); // Stop animation when close
      animationRef.current = null;
      return;
    }

    scaleRef.current = newScale;
    positionRef.current = { x: newX, y: newY };

    requestCanvasUpdate();
    animationRef.current = requestAnimationFrame(animateZoom);
  }, [requestCanvasUpdate]);

  // prevent dragging image out of view
  const clampPosition = useCallback(
    (x: number, y: number, s: number) => {
      const imgW = imageRef.current.width * s,
        imgH = imageRef.current.height * s;

      return {
        x: Math.min(window.innerWidth - dragThreshold, Math.max(-imgW + dragThreshold, x)),
        y: Math.min(window.innerHeight - dragThreshold, Math.max(-imgH + dragThreshold, y)),
      };
    },
    [dragThreshold]
  );

  const clampScale = useCallback((scale: number) => {
    return Math.min(maxScale, Math.max(minScale.current, scale));
  }, []);

  const reset = useCallback(() => {
    const imgW = imageRef.current.width * minScale.current,
      imgH = imageRef.current.height * minScale.current;

    scaleTargetRef.current = minScale.current;
    positionTargetRef.current = {
      x: (window.innerWidth - imgW) / 2,
      y: (window.innerHeight - imgH) / 2,
    };

    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animateZoom);
    }
  }, []);

  const handleDoubleClickOrTap = useCallback(
    (mouseX: number, mouseY: number) => {
      if (scaleRef.current - animateScaleThreshold > minScale.current) {
        // aleready zoomed in
        reset();
      } else {
        const newScale = 2; // zoom in by 2x

        // check whether clicking on the image
        const imgW = imageRef.current.width * scaleRef.current,
          imgH = imageRef.current.height * scaleRef.current;
        if (
          mouseX < positionRef.current.x ||
          mouseX > positionRef.current.x + imgW ||
          mouseY < positionRef.current.y ||
          mouseY > positionRef.current.y + imgH
        ) {
          return;
        }

        // Calculate new position to keep zoom centered on cursor
        const imageX = (mouseX - positionRef.current.x) / scaleRef.current;
        const imageY = (mouseY - positionRef.current.y) / scaleRef.current;
        const newX = mouseX - imageX * newScale;
        const newY = mouseY - imageY * newScale;

        scaleTargetRef.current = newScale;
        // positionTargetRef.current = { x: newX, y: newY };
        positionTargetRef.current = clampPosition(newX, newY, newScale);

        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(animateZoom);
        }
      }
    },
    [animateZoom, reset, clampPosition]
  );

  // change isDragging
  const setDragging = useCallback((dragging: boolean) => {
    isDragging.current = dragging;

    if (dragging) {
      canvasRef.current?.classList.add('cursor-grabbing');
    } else {
      canvasRef.current?.classList.remove('cursor-grabbing');
    }
  }, []);

  const zoom = (isZoomIn: boolean) => {
    // assume mouse pointer on center of the screen
    const mouseX = window.innerWidth / 2,
      mouseY = window.innerHeight / 2;

    // Convert mouse position to image coordinates
    const imageX = (mouseX - positionRef.current.x) / scaleRef.current;
    const imageY = (mouseY - positionRef.current.y) / scaleRef.current;

    // Calculate new scale
    let newScale = isZoomIn ? scaleRef.current * (1 + scaleFactor) : scaleRef.current * (1 - scaleFactor);
    newScale = clampScale(newScale);
    scaleTargetRef.current = newScale;

    const newX = mouseX - imageX * newScale;
    const newY = mouseY - imageY * newScale;
    positionTargetRef.current = { x: newX, y: newY };
    positionTargetRef.current = clampPosition(newX, newY, newScale);

    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animateZoom);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // listen on canvas size changes and re-initialize canvas
    const resizeObserver = new ResizeObserver(() => {
      console.log('canvas resized');
      initCanvas(canvas);
    });
    if (canvasWrapperRef.current) {
      resizeObserver.observe(canvasWrapperRef.current);
    }

    /*** events listeners ***/
    const controller = new AbortController();

    /* Drag (Pan) - Mouse (Desktop) */
    canvas.addEventListener(
      'mousedown',
      (e: MouseEvent) => {
        e.preventDefault();

        // prevent firing on touch screens
        if (!isMobile) {
          // double click
          const now = Date.now();
          if (now - lastClick.current < doubleClickDelay) {
            handleDoubleClickOrTap(e.clientX, e.clientY);
          }
          lastClick.current = now;
        }

        setDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      },
      { signal: controller.signal }
    );

    canvas.addEventListener(
      'mousemove',
      (e: MouseEvent) => {
        if (!isDragging.current) return;

        // Get mouse position
        const mouseX = e.clientX,
          mouseY = e.clientY;
        const newX = positionRef.current.x + (mouseX - lastMousePos.current.x);
        const newY = positionRef.current.y + (mouseY - lastMousePos.current.y);

        positionRef.current = clampPosition(newX, newY, scaleRef.current);
        lastMousePos.current = { x: mouseX, y: mouseY };
        requestCanvasUpdate();
      },
      { signal: controller.signal }
    );

    canvas.addEventListener(
      'mouseup',
      () => {
        setDragging(false);
      },
      { signal: controller.signal }
    );

    canvas.addEventListener(
      'mouseleave',
      () => {
        setDragging(false);
      },
      { signal: controller.signal }
    );
    /* End Drag - mouse */

    /* Wheel Zoom - mouse (Desktop) */
    canvas.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault();

        // Calculate new position to keep zoom centered on cursor
        // Get mouse position
        const mouseX = e.clientX,
          mouseY = e.clientY;

        // check whether mouse pointer on the image
        const imgW = imageRef.current.width * scaleRef.current,
          imgH = imageRef.current.height * scaleRef.current;
        if (
          mouseX < positionRef.current.x ||
          mouseX > positionRef.current.x + imgW ||
          mouseY < positionRef.current.y ||
          mouseY > positionRef.current.y + imgH
        ) {
          return;
        }

        // Convert mouse position to image coordinates
        const imageX = (mouseX - positionRef.current.x) / scaleRef.current;
        const imageY = (mouseY - positionRef.current.y) / scaleRef.current;

        // Calculate new scale
        let newScale = e.deltaY < 0 ? scaleRef.current * (1 + scaleFactor) : scaleRef.current * (1 - scaleFactor);
        newScale = clampScale(newScale);
        scaleTargetRef.current = newScale;

        const newX = mouseX - imageX * newScale;
        const newY = mouseY - imageY * newScale;
        positionTargetRef.current = { x: newX, y: newY };
        positionTargetRef.current = clampPosition(newX, newY, newScale);

        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(animateZoom);
        }
      },
      { signal: controller.signal, passive: false }
    );
    /* End Wheel Zoom */

    /* Touch Support (Drag & Pinch-to-Zoom & double tap) */
    canvas.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        if (e.touches.length === 1) {
          // double tap
          const now = Date.now();

          if (now - lastClick.current < doubleClickDelay) {
            handleDoubleClickOrTap(e.touches[0].clientX, e.touches[0].clientY); // Treat as double-click
          }
          lastClick.current = now;

          // Single-finger drag start
          setDragging(true);
          lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length == 2) {
          // Two-finger pinch-to-zoom start
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          touchDistance.current = Math.sqrt(dx * dx + dy * dy);
        }
      },
      { signal: controller.signal, passive: true }
    );

    canvas.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        e.preventDefault();

        if (e.touches.length === 1 && isDragging.current) {
          // Single-finger drag
          let newX = positionRef.current.x + (e.touches[0].clientX - lastMousePos.current.x);
          let newY = positionRef.current.y + (e.touches[0].clientY - lastMousePos.current.y);

          positionRef.current = clampPosition(newX, newY, scaleRef.current);
          lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2 && touchDistance !== null) {
          // Pinch-to-Zoom

          // check at least one finger on the image
          const imgW = imageRef.current.width * scaleRef.current,
            imgH = imageRef.current.height * scaleRef.current;

          const finger1 =
            e.touches[0].clientX < positionRef.current.x ||
            e.touches[0].clientX > positionRef.current.x + imgW ||
            e.touches[0].clientY < positionRef.current.y ||
            e.touches[0].clientY > positionRef.current.y + imgH;

          const finger2 =
            e.touches[1].clientX < positionRef.current.x ||
            e.touches[1].clientX > positionRef.current.x + imgW ||
            e.touches[1].clientY < positionRef.current.y ||
            e.touches[1].clientY > positionRef.current.y + imgH;

          if (finger1 && finger2) {
            return; // both fingers outside the image
          }

          // Calculate distance between two fingers
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;

          // Calculate new scale
          const newDistance = Math.sqrt(dx * dx + dy * dy);
          const zoomFactor = newDistance / (touchDistance.current || 1);
          let newScale = scaleRef.current * zoomFactor;
          newScale = clampScale(newScale);

          // Calculate new position to keep zoom centered on two fingers
          // Get mid-point between two fingers
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

          // Convert mouse position to image coordinates
          const imageX = (midX - positionRef.current.x) / scaleRef.current;
          const imageY = (midY - positionRef.current.y) / scaleRef.current;
          const newX = midX - imageX * newScale;
          const newY = midY - imageY * newScale;

          scaleRef.current = newScale;
          positionRef.current = { x: newX, y: newY };
          positionRef.current = clampPosition(newX, newY, newScale);
          touchDistance.current = newDistance;
        }

        requestCanvasUpdate();
      },
      { signal: controller.signal, passive: false }
    );

    canvas.addEventListener(
      'touchend',
      () => {
        setDragging(false);
        touchDistance.current = null;
      },
      { signal: controller.signal, passive: true }
    );
    /* End Touch (Drag & Pinch-to-Zoom) */

    return () => {
      resizeObserver.disconnect();
      controller.abort();
    };
  }, [
    isMobile,
    requestCanvasUpdate,
    clampPosition,
    clampScale,
    handleDoubleClickOrTap,
    animateZoom,
    setDragging,
    initCanvas,
  ]);

  return (
    <div className="relative" ref={canvasWrapperRef}>
      <canvas
        ref={canvasRef}
        className="cursor-grab touch-none" // Prevents unwanted scrolling
      />

      {/* controlls */}
      <Controlls isShow={isControlls} zoom={zoom} reset={reset} />
    </div>
  );
}
