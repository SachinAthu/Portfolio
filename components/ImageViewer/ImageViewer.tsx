'use client';

import { useRef } from 'react';
import NextImage, { StaticImageData } from 'next/image';

import { Dialog } from '..';
import { DialogRefProps } from '@/lib/types';
import Viewer from './Viewer';

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
