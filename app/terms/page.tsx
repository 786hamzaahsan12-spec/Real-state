import type { Metadata } from "next";
import LegalPage from "@/components/ui/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service placeholder for the RealHome demo website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These placeholder terms describe how the RealHome demo website should be understood."
      sections={[
        {
          heading: "Demo content",
          body: "All property listings, prices, agents, testimonials and statistics are sample data created for demonstration. They are not offers or verified live listings.",
        },
        {
          heading: "No professional advice",
          body: "Nothing on this website is legal, financial or investment advice. Always verify property details independently before making any decision.",
        },
        {
          heading: "Changes",
          body: "These terms may be updated as the project evolves into a real service.",
        },
      ]}
    />
  );
}