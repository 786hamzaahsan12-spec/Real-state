"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { galleryImage } from "@/lib/motion";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = (next: number) => setIndex((next + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (count < 2) return;
    if (event.key === "ArrowLeft") go(index - 1);
    if (event.key === "ArrowRight") go(index + 1);
  };

  return (
    <div role="group" aria-label="Property photo gallery" onKeyDown={onKeyDown}>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={galleryImage}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <SafeImage
              src={images[index]}
              alt={`${title}, photo ${index + 1} of ${count}`}
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-fg transition-all hover:bg-gold hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-fg transition-all hover:bg-gold hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-fg">
              {index + 1} / {count}
            </span>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <ul className="mt-4 grid grid-cols-4 gap-3">
          {images.map((src, thumbIndex) => (
            <li key={`${src}-${thumbIndex}`}>
              <button
                type="button"
                onClick={() => setIndex(thumbIndex)}
                aria-label={`Show photo ${thumbIndex + 1}`}
                aria-current={thumbIndex === index}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  thumbIndex === index
                    ? "border-gold"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <SafeImage src={src} alt={`${title} thumbnail ${thumbIndex + 1}`} sizes="160px" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}