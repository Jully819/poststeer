import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/lib/content";
import { findIndustry, industries, industryCopy } from "@/lib/landing";
import { LandingHero } from "@/components/landing-hero";
import { LandingCards } from "@/components/landing-cards";
import { LandingChecklist } from "@/components/landing-checklist";
import { LogoStrip } from "@/components/logo-strip";
import { Gallery } from "@/components/gallery";
import { PricingBuilder } from "@/components/pricing-builder";
import { Deliverables } from "@/components/deliverables";
import { Guarantee } from "@/components/guarantee";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

/** Static per industry, and an unknown slug 404s rather than rendering empty. */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) return {};

  const copy = industryCopy(industry);
  return {
    title: `Social Media Management for ${industry.name} | ${brand.name}`,
    description: copy.intro,
    alternates: { canonical: `/industries/${industry.slug}` },
    /* Noindex with the rest of the site while the figures are placeholders. */
    robots: { index: false, follow: false },
  };
}

/**
 * One page per industry. Same shell as a city page, with two sections a city
 * page does not have — what goes wrong in this trade, and a month of posts it
 * could run — and no long-form block, because the trade specifics above do
 * that job better than four more paragraphs would.
 *
 * The portfolio opens on this industry where the sample library has work in
 * it, and on the featured set where it does not, rather than showing an empty
 * grid under a heading that promises examples.
 */
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) notFound();

  const copy = industryCopy(industry);

  return (
    <>
      <LandingHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
        kicker={copy.kicker}
        titleLead={copy.titleLead}
        titleAccent={copy.titleAccent}
        intro={copy.intro}
        stats={copy.stats}
      />

      <LogoStrip />
      <LandingCards title={copy.painsTitle} items={industry.pains} />
      <Gallery
        title={`Work we could be making for your ${industry.singular}.`}
        initialScope={industry.work}
      />
      <LandingCards title={copy.winsTitle} items={industry.wins} numbered />
      <LandingChecklist
        tone="sage"
        title={copy.checklistTitle}
        note={copy.checklistNote}
        items={industry.checklist}
      />
      <PricingBuilder />
      <Deliverables />
      <Guarantee />
      {/* The client reviews section is parked, not deleted. The quotes and
          portraits were mocks, and mocks that look real cannot be on a page
          that is about to be opened to crawlers. See the note on
          `testimonials` in lib/content.ts for what has to be true before
          <ClientFeedback /> goes back in here. */}
      <Faq />
      <FinalCta />
    </>
  );
}
