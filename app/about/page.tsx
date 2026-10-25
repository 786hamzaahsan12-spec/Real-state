import type { Metadata } from "next";
import Link from "next/link";
import { Eye, MessageCircle, Target } from "lucide-react";
import AgentDirectory from "@/components/agents/AgentDirectory";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PageBanner from "@/components/ui/layout/PageBanner";
import CountUp from "@/components/ui/CountUp";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { agents } from "@/data/agents";
import { CATEGORIES, CITIES, properties } from "@/data/properties";
import { IMAGES, SITE } from "@/data/site";
import { whatsappLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about RealHome, a premium property marketplace concept for Pakistan built around clarity, local expertise and thoughtful design.",
};

const stats = [
  { value: properties.length, label: "Sample listings" },
  { value: CITIES.length, label: "Cities covered" },
  { value: CATEGORIES.length, label: "Property categories" },
  { value: agents.length, label: "Demo agents" },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About RealHome"
        title="Property, Presented Beautifully"
        description="A premium real estate experience designed around clarity, trust and local knowledge."
        image={IMAGES.aboutBanner}
        imageAlt="Modern home exterior with large glass windows"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="bg-ink py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Who We Are
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl md:text-5xl">
              A modern way to find <span className="text-gold">your place</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              RealHome brings together houses, apartments, plots and commercial spaces from across
              Multan, Lahore, Islamabad and Karachi in one refined, easy-to-use marketplace.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              This website is a demonstration project. Its listings, agents and figures are sample
              data that show how a real inventory would look and feel.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <ParallaxImage
                src={IMAGES.aboutSide}
                alt="Elegant interior with natural light"
                className="absolute inset-0"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To make property search in Pakistan clear, honest and enjoyable, with accurate information and genuine guidance at every step.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "A trusted marketplace where every buyer, seller and tenant feels confident, informed and respected.",
            },
          ].map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.1}>
              <div className="h-full rounded-2xl border border-line bg-card p-8 transition-colors duration-500 hover:border-gold/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-fg">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <section className="bg-ink py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading align="center" eyebrow="By the Numbers" title="RealHome at a Glance" highlight="Glance" />
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <li className="list-none rounded-2xl border border-line bg-card p-8 text-center">
                  <p className="font-display text-4xl font-semibold text-gold md:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-3 text-sm text-muted">{stat.label}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-center text-xs text-muted">
            Demo figures that reflect the sample data in this project.
          </p>
        </div>
      </section>

      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the Agents"
            highlight="Agents"
            description="Sample profiles that show how agent information is presented on RealHome."
            actionHref="/agents"
            actionLabel="All agents"
          />
          <AgentDirectory showSearch={false} />
        </div>
      </section>

      <section className="bg-ink py-20 md:py-24">
        <Reveal className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="rounded-3xl border border-gold/30 bg-linear-to-br from-card to-navy p-10 text-center md:p-14">
            <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
              Ready to find your <span className="text-gold">next property</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Browse the sample collection or get in touch to see how RealHome could work for you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-gold">
                Contact us
              </Link>
              <a
                href={whatsappLink(SITE.whatsapp, "Hello RealHome, I would like to know more.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}