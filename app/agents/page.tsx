import type { Metadata } from "next";
import AgentDirectory from "@/components/agents/AgentDirectory";
import PageBanner from "@/components/ui/layout/PageBanner";
import { IMAGES } from "@/data/site";

export const metadata: Metadata = {
  title: "Agents",
  description:
    "Meet the RealHome sample agents. Search by name or specialty and reach out by phone, WhatsApp or email.",
};

export default function AgentsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Agents"
        title="Meet the Experts"
        description="Search sample agent profiles by name, specialty or city."
        image={IMAGES.agentsBanner}
        imageAlt="Modern glass building facade"
        crumbs={[{ label: "Home", href: "/" }, { label: "Agents" }]}
      />

      <section className="bg-ink pb-24 pt-4 md:pt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <AgentDirectory />
        </div>
      </section>
    </>
  );
}