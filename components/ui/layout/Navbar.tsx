"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Heart, House, Menu, Search, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useFavourites } from "@/hooks/useFavourites";
import { EASE_OUT } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useFavourites();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const solid = scrolled || open;

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solid ? "border-line bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="RealHome home"
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
            <House className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-fg">
            Real<span className="text-gold">Home</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors duration-300 hover:text-gold ${
                  active ? "text-gold" : "text-fg/80"
                }`}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1 h-px bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/properties"
            aria-label="Search properties"
            className="rounded-full p-2.5 text-fg/80 transition-colors hover:bg-card hover:text-gold"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>

          <Link
            href="/properties?saved=1"
            aria-label={`Favourite properties (${count})`}
            className="relative rounded-full p-2.5 text-fg/80 transition-colors hover:bg-card hover:text-gold"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            {count > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            ) : null}
          </Link>

          <Link href="/properties" className="btn-gold ml-1 hidden !px-5 !py-2.5 sm:inline-flex">
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2.5 text-fg transition-colors hover:bg-card hover:text-gold lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="absolute inset-x-0 top-full border-b border-line bg-ink lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
              {navLinks.map((link, index) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.05 * index }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block border-b border-line py-4 font-display text-xl transition-colors hover:text-gold ${
                        active ? "text-gold" : "text-fg"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/properties"
                onClick={() => setOpen(false)}
                className="btn-gold mt-5 w-full"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}