import type { Metadata } from "next";
import PageBanner from "@/components/ui/layout/PageBanner";
import PropertyBrowser from "@/app/PropertyBrowser";
import { IMAGES } from "@/data/site";
import { parseFilters } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse sample houses, apartments, plots and commercial properties in Multan, Lahore, Islamabad and Karachi. Filter by city, type and price.",
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialFilters = parseFilters(params);

  return (
    <>
      <PageBanner
        eyebrow="Our Listings"
        title="Properties"
        description="Search sample listings across four major cities. Every property shown is demo data."
        image={IMAGES.propertiesBanner}
        imageAlt="Contemporary villa exterior at golden hour"
        crumbs={[{ label: "Home", href: "/" }, { label: "Properties" }]}
      />

      <section className="bg-ink pb-24 pt-4 md:pt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <PropertyBrowser key={JSON.stringify(initialFilters)} initialFilters={initialFilters} />
        </div>
      </section>
    </>
  );
}