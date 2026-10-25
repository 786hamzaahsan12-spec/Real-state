import Link from "next/link";
import { House, Mail, MapPin, Phone } from "lucide-react";
import { SITE, navLinks, socials } from "@/data/site";

function SocialIcon({ name }: { name: "Facebook" | "Instagram" | "LinkedIn" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "Facebook" ? (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      ) : null}
      {name === "Instagram" ? (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ) : null}
      {name === "LinkedIn" ? (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      ) : null}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-navy">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="RealHome home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-ink">
              <House className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-semibold text-fg">
              Real<span className="text-gold">Home</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            A premium property marketplace concept for Pakistan. All listings, agents and figures
            on this site are sample data for demonstration.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Contact
          </h3>
          <ul className="space-y-4 text-sm text-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-gold"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Follow Us
          </h3>
          <ul className="flex gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <SocialIcon name={social.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted sm:px-8 md:flex-row">
          <p>© {new Date().getFullYear()} RealHome. Demo website. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}