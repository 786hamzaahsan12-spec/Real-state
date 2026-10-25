"use client";

import { motion } from "framer-motion";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { fadeUp, maskLine, staggerContainer } from "@/lib/motion";

interface PageBannerProps {
  title: string;
  eyebrow?: string;
  description?: string;
  image: string;
  imageAlt: string;
  crumbs?: Crumb[];
}

const stagger = staggerContainer(0.14, 0.15);

export default function PageBanner({
  title,
  eyebrow,
  description,
  image,
  imageAlt,
  crumbs,
}: PageBannerProps) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <ParallaxImage src={image} alt={imageAlt} priority className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/80 via-ink/60 to-ink" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-5 sm:px-8"
      >
        {crumbs ? (
          <motion.div variants={fadeUp} className="mb-6">
            <Breadcrumbs items={crumbs} />
          </motion.div>
        ) : null}

        {eyebrow ? (
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold"
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <h1 className="overflow-hidden pb-2 font-display text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl md:text-6xl">
          <motion.span variants={maskLine} className="block">
            {title}
          </motion.span>
        </h1>

        {description ? (
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
            {description}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
}