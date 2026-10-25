import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import PageBanner from "@/components/ui/layout/PageBanner";
import Reveal from "@/components/ui/Reveal";
import { getPropertyById } from "@/data/properties";
import { IMAGES, SITE } from "@/data/site";
import { whatsappLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RealHome by phone, WhatsApp, email or the contact form. Demo contact details are shown for this sample website.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const propertyId = Array.isArray(params.property) ? params.property[0] : params.property;
  const property = propertyId ? getPropertyById(propertyId) : undefined;

  const defaultSubject = property ? `Inquiry about ${property.title}` : "";
  const defaultMessage = property
    ? `Hello, I am interested in ${property.title} in ${property.area}, ${property.city}. Please share more details.`
    : "";

  const details = [
    { icon: MapPin, label: "Office", value: SITE.address },
    { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, label: "Hours", value: SITE.hours },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Questions about a property or this project? Send a message or reach us on WhatsApp."
        image={IMAGES.contactBanner}
        imageAlt="Apartment buildings against a evening sky"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-ink pb-16 pt-4 md:pt-8">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[380px_1fr]">
          <Reveal>
            <div className="space-y-4">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 rounded-2xl border border-line bg-card p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-fg transition-colors hover:text-gold">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-fg">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href={whatsappLink(SITE.whatsapp, "Hello RealHome, I would like to ask about a property.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <p className="text-xs text-muted">All contact details shown are demo placeholders.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm defaultSubject={defaultSubject} defaultMessage={defaultMessage} />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink pb-24">
        <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            role="img"
            aria-label="Map placeholder"
            className="relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-card text-center md:h-96"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,196,81,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,196,81,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          >
            <MapPin className="h-10 w-10 text-gold" aria-hidden="true" />
            <p className="mt-4 font-display text-xl text-fg">Location map placeholder</p>
            <p className="mt-2 max-w-md px-4 text-sm text-muted">
              This is a labelled placeholder. A real Google Maps embed can replace this box once
              you have a business address.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}