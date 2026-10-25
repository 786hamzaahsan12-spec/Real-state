"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Every Framer Motion animation inside respects the visitor's
 * "reduce motion" OS setting automatically.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}