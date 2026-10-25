"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { whatsappLink } from "@/lib/format";
import { EASE_OUT, cardItem } from "@/lib/motion";
import type { Agent } from "@/lib/types";

const actionClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink";

export default function AgentCard({ agent }: { agent: Agent }) {
  const message = `Hello ${agent.name}, I found your profile on RealHome and would like to ask about a property.`;

  return (
    <motion.article
      variants={cardItem}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE_OUT } }}
      className="group overflow-hidden rounded-2xl border border-line bg-card transition-[border-color,box-shadow] duration-500 hover:border-gold/50 hover:shadow-[0_24px_60px_-24px_rgba(245,196,81,0.35)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <SafeImage
          src={agent.image}
          alt={`Portrait of ${agent.name}, sample agent`}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
          Demo profile
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-fg">{agent.name}</h3>
        <p className="mt-1 text-sm font-medium text-gold">{agent.specialty}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          {agent.city}
        </p>

        <div className="mt-5 flex gap-3 border-t border-line pt-5">
          <a
            href={`tel:${agent.phone.replace(/\s/g, "")}`}
            aria-label={`Call ${agent.name}`}
            className={actionClass}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={whatsappLink(agent.whatsapp, message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${agent.name}`}
            className={actionClass}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={`mailto:${agent.email}`} aria-label={`Email ${agent.name}`} className={actionClass}>
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}