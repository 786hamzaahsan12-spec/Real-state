"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { useFavourites } from "@/hooks/useFavourites";
import { formatArea, formatPrice } from "@/lib/format";
import { EASE_OUT, cardItem } from "@/lib/motion";
import type { Property } from "@/lib/types";

export default function PropertyCard({ property }: { property: Property }) {
  const { isFavourite, toggle } = useFavourites();
  const favourite = isFavourite(property.id);
  const forSale = property.status === "For Sale";

  return (
    <motion.article
      variants={cardItem}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE_OUT } }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-card transition-[border-color,box-shadow] duration-500 hover:border-gold/50 hover:shadow-[0_24px_60px_-24px_rgba(245,196,81,0.35)]"
    >
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <SafeImage
            src={property.images[0]}
            alt={`${property.title} in ${property.area}, ${property.city}`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent" />
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
              forSale ? "bg-gold text-ink" : "bg-fg text-ink"
            }`}
          >
            {property.status}
          </span>
        </div>

        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {property.category}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-fg">
            {property.title}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
            {property.area}, {property.city}
          </p>
          <p className="mt-4 text-lg font-semibold text-gold">{formatPrice(property)}</p>

          <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-muted">
            {property.bedrooms !== null ? (
              <li className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 text-gold" aria-hidden="true" />
                {property.bedrooms} Beds
              </li>
            ) : null}
            {property.bathrooms !== null ? (
              <li className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-gold" aria-hidden="true" />
                {property.bathrooms} Baths
              </li>
            ) : null}
            <li className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-gold" aria-hidden="true" />
              {formatArea(property)}
            </li>
          </ul>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggle(property.id)}
        aria-pressed={favourite}
        aria-label={favourite ? `Remove ${property.title} from favourites` : `Add ${property.title} to favourites`}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-fg transition-all duration-300 hover:scale-110 hover:text-gold"
      >
        <Heart
          className={`h-5 w-5 transition-colors ${favourite ? "fill-gold text-gold" : ""}`}
          aria-hidden="true"
        />
      </button>
    </motion.article>
  );
}