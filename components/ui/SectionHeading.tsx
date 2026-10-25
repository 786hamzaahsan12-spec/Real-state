import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** A word or phrase inside `title` that is rendered in gold. */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  actionHref?: string;
  actionLabel?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  const index = highlight ? title.indexOf(highlight) : -1;
  const before = index >= 0 ? title.slice(0, index) : title;
  const marked = index >= 0 && highlight ? highlight : "";
  const after = index >= 0 && highlight ? title.slice(index + highlight.length) : "";
  const centered = align === "center";

  return (
    <Reveal
      className={`mb-10 flex flex-col gap-4 md:mb-14 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl md:text-5xl">
          {before}
          {marked ? <span className="text-gold">{marked}</span> : null}
          {after}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>

      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
        >
          {actionLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </Reveal>
  );
}