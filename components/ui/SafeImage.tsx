"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Next.js Image in "fill" mode with a graceful fallback.
 * The parent element must be positioned (relative/absolute) and have a height.
 */
export default function SafeImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
}: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-card to-ink text-gold/40"
      >
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={`object-cover ${className}`}
    />
  );
}