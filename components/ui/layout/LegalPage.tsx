import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";

interface LegalPageProps {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export default function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <section className="bg-ink pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <Reveal>
          <h1 className="mt-6 font-display text-4xl font-semibold text-fg md:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="font-display text-2xl text-gold">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-14 rounded-xl border border-line bg-card p-5 text-sm text-muted">
          This is placeholder text for a demonstration website. Replace it with a policy reviewed
          by a qualified professional before launching a real business.
        </p>
      </div>
    </section>
  );
}