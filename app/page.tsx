import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import PopularLocations from "@/components/home/PopularLocations";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <PopularLocations />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}