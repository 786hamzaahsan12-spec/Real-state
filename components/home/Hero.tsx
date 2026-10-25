"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Building2, ShieldCheck, Users } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import PropertySearch from "./PropertySearch";
import { IMAGES } from "@/data/site";
import { EASE_OUT, fadeUp, maskLine, staggerContainer } from "@/lib/motion";

const heroStagger = staggerContainer(0.14, 0.3);

const trust = [
  { icon: Building2, title: "Curated Listings", text: "Hand-picked sample properties" },
  { icon: Users, title: "Expert Agents", text: "Guidance at every step" },
  { icon: ShieldCheck, title: "Secure Transactions", text: "A clear, transparent process" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[20%] -z-10 h-[120%]">
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE_OUT }}
          className="absolute inset-0"
        >
          <SafeImage
            src={IMAGES.hero}
            alt="Modern luxury mansion with a pool at dusk"
            sizes="100vw"
            priority
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/80 via-ink/55 to-ink" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink/70 via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8"
      >
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold"
          >
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Find Your Dream Property
          </motion.p>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-fg sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <span className="block overflow-hidden pb-2">
              <motion.span variants={maskLine} className="block">
                Your Future <span className="text-gold">Home</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={maskLine} className="block">
                Is Just a Search Away
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg/75 sm:text-lg"
          >
            Explore premium houses, apartments, plots and commercial spaces across Multan, Lahore,
            Islamabad and Karachi, all in one elegant marketplace.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 max-w-5xl">
            <PropertySearch />
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 grid gap-6 border-t border-line/70 pt-8 sm:grid-cols-3"
          >
            {trust.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-fg">{title}</span>
                  <span className="block text-xs text-muted">{text}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}