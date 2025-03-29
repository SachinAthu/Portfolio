'use client';

import NextImage, { StaticImageData } from 'next/image';

import { Dialog } from '.';
import { useEffect, useRef, useState } from 'react';
import { DialogRefProps } from '@/lib/types';
import { useWindowResize } from '@/lib/hooks';

function Viewer({ src, alt }: { src: string; alt: string }) {
  const { vw, vh } = useWindowResize();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef(new Image());

  const draw = (ctx: CanvasRenderingContext2D | null) => {
    if (!canvasRef.current || !ctx) return;

    let imgW = imageRef.current.width,
      imgH = imageRef.current.height,
      canvasW = canvasRef.current.width,
      canvasH = canvasRef.current.height,
      posX = position.x,
      posY = position.y,
      s = scale;

    ctx.clearRect(0, 0, canvasW, canvasH);

    console.log(imgW, imgH, canvasW, canvasH);

    if (imgW > canvasW || imgH > canvasH) {
      // image bigger
      console.log('img big');

      s = Math.min(canvasW / imgW, canvasH / imgH);
      imgW *= s;
      imgH *= s;
    }

    posX = (canvasW - imgW) / 2;
    posY = (canvasH - imgH) / 2;

    ctx.drawImage(imageRef.current, posX, posY, imgW, imgH);
    setPosition({ x: posX, y: posY });
    setScale(s);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    img.src = src;
    img.onload = () => draw(ctx);
  }, [src, vw, vh]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    draw(ctx);
  }, [scale, position.x, position.y]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        cursor: dragging ? 'grabbing' : 'grab',
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
};

export default function ImageViewer({ src, srcPath, alt, dialogId, dialogAriaLabel }: ImageViewerProps) {
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
        <NextImage sizes="100vw" src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
      </div>

      <Dialog id={dialogId} ref={dialogRef} ariaLabel={dialogAriaLabel} imageView>
        <Viewer src={srcPath} alt={alt} />
      </Dialog>
    </div>
  );
}
