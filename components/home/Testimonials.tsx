"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { VIEWPORT_ONCE, cardItem, staggerContainer } from "@/lib/motion";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&q=80`;

/** Sample testimonials written for demonstration only. */
const testimonials = [
  {
    name: "Hamza Qureshi",
    city: "Lahore",
    image: u("photo-1500648767791-00dcc994a43e"),
    text: "The team walked us through every step of buying our first home. Clear communication and no pressure at any point.",
  },
  {
    name: "Mariam Siddiqui",
    city: "Islamabad",
    image: u("photo-1534528741775-53994a69daeb"),
    text: "I found a rental that matched my budget and commute within a week. Viewings were organised quickly and professionally.",
  },
  {
    name: "Usman Farooq",
    city: "Multan",
    image: u("photo-1519085360753-af0119f7cbe7"),
    text: "Helpful, honest advice on plots and what to look for. I always knew what to expect from the next step.",
  },
];

const stagger = staggerContainer(0.14);

export default function Testimonials() {
  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="What Our Clients Say"
          highlight="Clients"
          description="Sample feedback shown for design purposes. Replace with real customer reviews before launch."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.figure
              key={item.name}
              variants={cardItem}
              className="flex flex-col rounded-2xl border border-line bg-card p-8 transition-colors duration-500 hover:border-gold/40"
            >
              <Quote className="h-8 w-8 text-gold/70" aria-hidden="true" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-fg/85">
                {item.text}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span className="relative h-12 w-12 overflow-hidden rounded-full border border-gold/40">
                  <SafeImage src={item.image} alt={`Portrait of ${item.name}`} sizes="48px" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-fg">{item.name}</span>
                  <span className="block text-xs text-muted">{item.city}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}