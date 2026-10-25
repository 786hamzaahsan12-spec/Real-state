"use client";

import { motion } from "framer-motion";
import { VIEWPORT_ONCE, staggerContainer } from "@/lib/motion";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  variant?: "featured" | "listing";
  /** Change this value to replay the staggered entrance (for example after filtering). */
  animationKey?: string;
}

const stagger = staggerContainer(0.1);

export default function PropertyGrid({
  properties,
  variant = "listing",
  animationKey,
}: PropertyGridProps) {
  const columns =
    variant === "featured" ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <motion.div
      key={animationKey}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={`grid grid-cols-1 gap-6 ${columns}`}
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </motion.div>
  );
}