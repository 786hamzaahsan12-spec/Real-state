import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Building2, MapPin, MessageCircle, Phone, Ruler } from "lucide-react";
import AmenityList from "@/components/properties/AmenityList";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyGrid from "@/components/properties/PropertyGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAgentById } from "@/data/agents";
import {
  DEMO_NOTICE,
  getPropertyById,
  getSimilarProperties,
  properties,
} from "@/data/properties";
import { formatArea, formatPrice, whatsappLink } from "@/lib/format";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return { title: "Property not found" };
  }

  return {
    title: `${property.title} in ${property.area}, ${property.city}`,
    description: property.description.slice(0, 155),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 155),
      images: [{ url: property.images[0] }],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) notFound();

  const agent = getAgentById(property.agentId);
  const similar = getSimilarProperties(property, 3);
  const forSale = property.status === "For Sale";

  const stats = [
    property.bedrooms !== null
      ? { icon: BedDouble, label: "Bedrooms", value: String(property.bedrooms) }
      : null,
    property.bathrooms !== null
      ? { icon: Bath, label: "Bathrooms", value: String(property.bathrooms) }
      : null,
    { icon: Ruler, label: "Covered area", value: formatArea(property) },
    { icon: Building2, label: "Type", value: property.category },
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  const inquiry = `Hello, I am interested in "${property.title}" in ${property.area}, ${property.city} (${formatPrice(property)}). Is it still available?`;

  return (
    <>
      <section className="bg-ink pb-16 pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              { label: property.title },
            ]}
          />

          <Reveal className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    forSale ? "bg-gold text-ink" : "bg-fg text-ink"
                  }`}
                >
                  {property.status}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {property.category}
                </span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-semibold text-fg sm:text-4xl md:text-5xl">
                {property.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-muted">
                <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                {property.area}, {property.city}
              </p>
            </div>
            <p className="font-display text-3xl font-semibold text-gold md:text-4xl">
              {formatPrice(property)}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="min-w-0 space-y-12">
              <Reveal>
                <PropertyGallery images={property.images} title={property.title} />
              </Reveal>

              <Reveal>
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="rounded-xl border border-line bg-card p-5">
                      <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                      <p className="mt-3 text-xs uppercase tracking-wider text-muted">{label}</p>
                      <p className="mt-1 font-semibold text-fg">{value}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-fg">Description</h2>
                <p className="mt-4 leading-relaxed text-muted">{property.description}</p>
                <p className="mt-4 text-sm text-muted/80">{DEMO_NOTICE}</p>
              </Reveal>

              <Reveal>
                <h2 className="mb-5 font-display text-2xl font-semibold text-fg">Amenities</h2>
                <AmenityList amenities={property.amenities} />
              </Reveal>
            </div>

            {agent ? (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <div className="rounded-2xl border border-line bg-card p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      Listed by
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold/40">
                        <SafeImage src={agent.image} alt={`Portrait of ${agent.name}`} sizes="64px" />
                      </span>
                      <div>
                        <p className="font-display text-lg font-semibold text-fg">{agent.name}</p>
                        <p className="text-sm text-muted">{agent.specialty}</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Link href={`/contact?property=${property.id}`} className="btn-gold w-full">
                        Contact Agent
                      </Link>
                      <a
                        href={whatsappLink(agent.whatsapp, inquiry)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline w-full"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        WhatsApp Inquiry
                      </a>
                      <a
                        href={`tel:${agent.phone.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2 py-2 text-sm text-muted transition-colors hover:text-gold"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {agent.phone}
                      </a>
                    </div>

                    <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                      Sample agent profile with placeholder contact details.
                    </p>
                  </div>
                </Reveal>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {similar.length > 0 ? (
        <section className="bg-navy py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="You May Also Like"
              title="Similar Properties"
              highlight="Properties"
              actionHref="/properties"
              actionLabel="View all"
            />
            <PropertyGrid properties={similar} />
          </div>
        </section>
      ) : null}
    </>
  );
}