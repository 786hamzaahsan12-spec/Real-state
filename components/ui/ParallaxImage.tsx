"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SafeImage from "./SafeImage";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Must include positioning, e.g. "absolute inset-0" or "relative h-96". */
  className?: string;
  /** Maximum vertical drift in percent. Keep it at 12 or below. */
  strength?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * Subtle scroll parallax. Uses motion values (no React re-renders)
 * and is switched off for reduced-motion visitors.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 10,
  priority = false,
  sizes = "100vw",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = reduce ? 0 : strength;
  const y = useTransform(scrollYProgress, [0, 1], [`${-range}%`, `${range}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] h-[130%]">
        <SafeImage src={src} alt={alt} sizes={sizes} priority={priority} />
      </motion.div>
    </div>
  );
}