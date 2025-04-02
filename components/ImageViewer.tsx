'use client';

import NextImage, { StaticImageData } from 'next/image';

import { Dialog } from '.';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DialogRefProps } from '@/lib/types';
import { useMobile, useWindowResize } from '@/lib/hooks';

type Position = {
  x: number;
  y: number;
};

function Viewer({ src }: { src: string }) {
  const { vw, vh } = useWindowResize();
  const isMobile = useMobile();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef(new Image());
  const scaleRef = useRef(1);
  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const lastMousePos = useRef<Position>({ x: 0, y: 0 }); // device pixel ratio
  const requestRef = useRef<number | null>(null); // animation frame state
  const touchDistance = useRef<number | null>(null); // For pinch-to-zoom
  const minScale = useRef<number>(1);
  const lastClick = useRef(0); // For double click / tap

  const [isDragging, setIsDragging] = useState(false);

  const maxScale = 3,
    scaleFactor = 0.1,
    dragThreshold = isMobile ? 50 : 100,
    doubleClickDelay = 300; // Max delay for double tap (ms)

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

  const initCanvas = useCallback(
    (ctx: CanvasRenderingContext2D | null | undefined) => {
      if (!ctx) return;

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

      draw(ctx);
    },
    [draw]
  );

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

  // prevent dragging image out of view
  const clampPosition = useCallback(
    (x: number, y: number) => {
      const imgW = imageRef.current.width * scaleRef.current,
        imgH = imageRef.current.height * scaleRef.current;

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

  const handleDoubleClickOrTap = useCallback(
    (mouseX: number, mouseY: number) => {
      const isScaled = scaleRef.current > minScale.current;

      // Calculate new scale
      const newScale = isScaled ? minScale.current : 2;

      // Calculate new position to keep zoom centered on cursor
      // Convert mouse position to image coordinates
      if (isScaled) {
        const imgW = imageRef.current.width * newScale,
          imgH = imageRef.current.height * newScale;

        scaleRef.current = newScale;
        positionRef.current = {
          x: (window.innerWidth - imgW) / 2,
          y: (window.innerHeight - imgH) / 2,
        };
      } else {
        const imageX = (mouseX - positionRef.current.x) / scaleRef.current;
        const imageY = (mouseY - positionRef.current.y) / scaleRef.current;
        const newX = mouseX - imageX * newScale;
        const newY = mouseY - imageY * newScale;

        scaleRef.current = newScale;
        positionRef.current = clampPosition(newX, newY);
      }

      const ctx = canvasRef.current?.getContext('2d');
      draw(ctx);
    },
    [requestCanvasUpdate, initCanvas, clampPosition]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // const dpr = 1;

    // Set proper canvas size
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    imageRef.current.src = src;
    imageRef.current.onload = () => {
      initCanvas(ctx);
    };
  }, [src, vw, vh, initCanvas]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const controller = new AbortController();

    /* Drag (Pan) - Mouse (Desktop) */
    canvasRef.current.addEventListener(
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

        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      },
      { signal: controller.signal }
    );

    canvasRef.current.addEventListener(
      'mousemove',
      (e: MouseEvent) => {
        if (!isDragging) return;

        // Get mouse position
        const mouseX = e.clientX,
          mouseY = e.clientY;
        const newX = positionRef.current.x + (mouseX - lastMousePos.current.x);
        const newY = positionRef.current.y + (mouseY - lastMousePos.current.y);

        // console.log(newX, newY);

        positionRef.current = clampPosition(newX, newY);
        lastMousePos.current = { x: mouseX, y: mouseY };
        requestCanvasUpdate();
      },
      { signal: controller.signal }
    );

    canvasRef.current.addEventListener(
      'mouseup',
      () => {
        setIsDragging(false);
      },
      { signal: controller.signal }
    );
    /* End Drag - mouse */

    /* Wheel Zoom - mouse (Desktop) */
    canvasRef.current.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault();

        // Calculate new scale
        let newScale = scaleRef.current + (e.deltaY > 0 ? -scaleFactor : scaleFactor);
        newScale = clampScale(newScale);
        // console.log(newScale);

        // Calculate new position to keep zoom centered on cursor
        // Get mouse position
        const mouseX = e.clientX,
          mouseY = e.clientY;

        // Convert mouse position to image coordinates
        const imageX = (mouseX - positionRef.current.x) / scaleRef.current;
        const imageY = (mouseY - positionRef.current.y) / scaleRef.current;
        const newX = mouseX - imageX * newScale;
        const newY = mouseY - imageY * newScale;

        console.log('new', newX, newY);

        scaleRef.current = newScale;
        positionRef.current = clampPosition(newX, newY);

        requestCanvasUpdate();
      },
      { signal: controller.signal, passive: false }
    );
    /* End Wheel Zoom */

    /* Touch Support (Drag & Pinch-to-Zoom & double tap) */
    canvasRef.current.addEventListener(
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
          setIsDragging(true);
          lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length == 2) {
          // Two-finger pinch-to-zoom start
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          touchDistance.current = Math.sqrt(dx * dx + dy * dy);
        }
      },
      { signal: controller.signal }
    );

    canvasRef.current.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        e.preventDefault();

        if (e.touches.length === 1 && isDragging) {
          // Single-finger drag
          let newX = positionRef.current.x + (e.touches[0].clientX - lastMousePos.current.x);
          let newY = positionRef.current.y + (e.touches[0].clientY - lastMousePos.current.y);

          positionRef.current = clampPosition(newX, newY);
          lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2 && touchDistance !== null) {
          // Pinch-to-Zoom

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
          positionRef.current = clampPosition(newX, newY);
          touchDistance.current = newDistance;
        }

        requestCanvasUpdate();
      },
      { signal: controller.signal }
    );

    canvasRef.current.addEventListener(
      'touchend',
      () => {
        setIsDragging(false);
        touchDistance.current = null;
      },
      { signal: controller.signal }
    );
    /* End Touch (Drag & Pinch-to-Zoom) */

    return () => {
      controller.abort();
    };
  }, [isDragging, isMobile, requestCanvasUpdate, clampPosition, clampScale, handleDoubleClickOrTap]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none', // Prevents unwanted scrolling
      }}
    />
  );
}

type ImageViewerProps = {
  src: StaticImageData;
  srcPath: string;
  alt: string;
  dialogId: string;
  dialogAriaLabel: string;
  caption?: string;
};

export default function ImageViewer({ src, srcPath, alt, dialogId, dialogAriaLabel, caption }: ImageViewerProps) {
  const dialogRef = useRef<DialogRefProps>(null);
  const image = useRef<HTMLDivElement | null>(null);

  const onClick = () => {
    dialogRef.current?.openDialog();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent spacebar from scrolling the page
      image.current?.click();
    }
  };

  return (
    <div>
      <div
        ref={image}
        tabIndex={0}
        aria-label="Click to open image viewer"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className="cursor-zoom-in">
        {caption ? (
          <figure className="flex flex-col items-center">
            <NextImage sizes="100vw" src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />

            <figcaption className="mt-4 text-center text-sm text-subtext dark:text-d-subtext">{caption}</figcaption>
          </figure>
        ) : (
          <NextImage sizes="100vw" src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
        )}
      </div>

      <Dialog id={dialogId} ref={dialogRef} ariaLabel={dialogAriaLabel} imageView>
        <Viewer src={srcPath} />
      </Dialog>
    </div>
  );
}
