"use client";

import { motion } from "framer-motion";
import { Headset, Search, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { IMAGES } from "@/data/site";
import { VIEWPORT_ONCE, cardItem, staggerContainer } from "@/lib/motion";

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Search,
    title: "Curated Listings",
    text: "Every property is presented with accurate details, clear photography and honest pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    text: "Straightforward guidance on documents, costs and timelines from first visit to handover.",
  },
  {
    icon: Users,
    title: "Local Expertise",
    text: "Agents who know the neighbourhoods of Multan, Lahore, Islamabad and Karachi.",
  },
  {
    icon: Headset,
    title: "Responsive Support",
    text: "Reach us by phone or WhatsApp and get a clear answer without the runaround.",
  },
];

const stagger = staggerContainer(0.12);

export default function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <ParallaxImage
        src={IMAGES.whyChoose}
        alt="Luxury living room interior with warm lighting"
        className="absolute inset-0 -z-10"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink via-ink/80 to-ink" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why RealHome"
          title="Your Trusted Real Estate Partner"
          highlight="Trusted"
          description="We combine thoughtful design with a clear, people-first approach to buying, selling and renting."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={cardItem}
              className="group rounded-2xl border border-line bg-ink/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-fg">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}