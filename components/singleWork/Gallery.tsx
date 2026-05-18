"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Dialog } from "@/components";
import { DialogRefProps, WorkType } from "@/lib/types";
import Viewer from "@/components/ImageViewer/Viewer";
import { cn } from "@/lib/common";

function getSizes(colSpan: 1 | 2 | 3 | 4): string {
  if (colSpan === 4) return "100vw";
  if (colSpan === 3) return "(max-width: 1024px) 100vw, 75vw";
  if (colSpan === 2) return "(max-width: 1024px) 100vw, 50vw";
  return "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
}

type BentoCellProps = {
  index: number;
  image: WorkType["screenshots"][number];
  onClick: () => void;
};

function BentoCell({ index, image, onClick }: BentoCellProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View gallery image ${index + 1}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-600",
        "bg-skeleton dark:bg-d-skeleton",
        "cursor-zoom-in",
        image.cols === 2 && "col-span-2",
        image.cols === 3 && "col-span-3",
        image.cols === 4 && "col-span-4",
        image.rows === 2 && "lg:row-span-2"
      )}>
      <Image
        src={image.img}
        alt={image.title}
        fill
        sizes={getSizes(image.cols)}
        className="object-cover grayscale-25 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
        placeholder="blur"
      />
    </div>
  );
}

export default function Gallery({
  images,
}: {
  images: WorkType["screenshots"];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dialogRef = useRef<DialogRefProps>(null);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    dialogRef.current?.openDialog();
  };

  return (
    <div className="gallery | bg-background/30 dark:bg-d-background/30 container mt-12 pt-24 pb-32 sm:mt-24 sm:pt-32 sm:pb-40">
      <h2 className="heading-2 mb-16 sm:mb-32">
        Gallery
        <span className="text-primary animate-[headingDot_5s_cubic-bezier(0.4,0,0.6,1)_infinite]">
          .
        </span>
      </h2>

      <div
        className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8"
        style={{
          gridAutoRows: "clamp(220px, 20vw, 300px)",
          gridAutoFlow: "dense",
        }}>
        {images.map((image, index) => (
          <BentoCell
            key={image.key}
            index={index}
            image={image}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <Dialog
        ref={dialogRef}
        id="gallery-image-viewer"
        ariaLabel="Gallery image viewer"
        imageView>
        <Viewer src={images[selectedIndex].img.src} />
      </Dialog>
    </div>
  );
}
