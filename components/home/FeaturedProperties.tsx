import PropertyGrid from "@/components/properties/PropertyGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { getFeaturedProperties } from "@/data/properties";

export default function FeaturedProperties() {
  const featured = getFeaturedProperties(4);

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Handpicked For You"
          title="Featured Properties"
          highlight="Properties"
          description="A selection of sample listings that show what RealHome looks like with real inventory."
          actionHref="/properties"
          actionLabel="View All"
        />
        <PropertyGrid properties={featured} variant="featured" />
      </div>
    </section>
  );
}