import type { Variants } from "framer-motion";

/** A smooth, premium "expo out" style easing curve. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scroll-reveal settings: animate once, slightly before the element is fully visible. */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

/** Standard fade + rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

/** Parent variant that staggers its children. */
export function staggerContainer(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Property / agent card entrance (used inside a staggerContainer). */
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

/**
 * Cinematic hero line reveal.
 * Wrap the line in an element with `overflow-hidden`, then animate the inner
 * element with this variant so the text slides up from behind a mask.
 */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1.1, ease: EASE_OUT },
  },
};

/** Image swap used by the property gallery (AnimatePresence). */
export const galleryImage: Variants = {
  enter: { opacity: 0, scale: 1.04 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};