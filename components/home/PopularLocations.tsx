"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPropertyCountByCity } from "@/data/properties";
import { locations } from "@/data/site";
import { VIEWPORT_ONCE, cardItem, staggerContainer } from "@/lib/motion";

const stagger = staggerContainer(0.12);

export default function PopularLocations() {
  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Explore Cities"
          title="Popular Locations"
          highlight="Locations"
          description="Browse sample properties in four of Pakistan's most sought-after cities."
          actionHref="/properties"
          actionLabel="Browse all"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {locations.map(({ city, image }) => {
            const count = getPropertyCountByCity(city);
            return (
              <motion.div key={city} variants={cardItem}>
                <Link
                  href={`/properties?city=${city}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-line"
                >
                  <SafeImage
                    src={image}
                    alt={`${city} property imagery`}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/10" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-fg">{city}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {count} sample {count === 1 ? "property" : "properties"}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}