import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/lib/content";
import { cities, cityCopy, findCity } from "@/lib/landing";
import { LandingHero } from "@/components/landing-hero";
import { LandingCards } from "@/components/landing-cards";
import { LandingProse } from "@/components/landing-prose";
import { LogoStrip } from "@/components/logo-strip";
import { Gallery } from "@/components/gallery";
import { PricingBuilder } from "@/components/pricing-builder";
import { Deliverables } from "@/components/deliverables";
import { Guarantee } from "@/components/guarantee";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

/** Static per city, and an unknown slug 404s rather than rendering empty. */
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) return {};

  const copy = cityCopy(city.name);
  return {
    title: `Social Media Agency in ${city.name} | ${brand.name}`,
    description: copy.intro,
    alternates: { canonical: `/service-areas/${city.slug}` },
  };
}

/**
 * One page per city. The sections are the homepage's, in the homepage's
 * order; what changes is the hero, the heading on the "why us" grid, and the
 * long-form block at the foot.
 *
 * WHAT IT DOES NOT CLAIM: an office, a local team, or a client in this city.
 * See the note at the top of lib/landing.ts.
 */
export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) notFound();

  const copy = cityCopy(city.name);

  return (
    <>
      <LandingHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Service areas", href: "/service-areas" },
          { label: city.name },
        ]}
        kicker={copy.kicker}
        titleLead={copy.titleLead}
        titleAccent={copy.titleAccent}
        intro={copy.intro}
        stats={copy.stats}
      />

      <LogoStrip />
      <Gallery title={`Work we could be making for your ${city.name} business.`} />
      <LandingCards title={copy.reasonsTitle} items={reasons} numbered />
      <PricingBuilder />
      <Deliverables />
      <Guarantee />
      {/* The client reviews section is parked, not deleted. The quotes and
          portraits were mocks, and mocks that look real cannot be on a page
          that is about to be opened to crawlers. See the note on
          `testimonials` in lib/content.ts for what has to be true before
          <ClientFeedback /> goes back in here. */}
      <LandingProse blocks={copy.prose} />
      <Faq />
      <FinalCta />
    </>
  );
}

/* Identical on every city page: the comparison is with "an agency or DIY",
   and that argument does not change with the postcode. */
const reasons = [
  {
    title: "Real marketers, not AI slop",
    body: "Designers, copywriters and strategists produce the work. AI video only when you ask for it by name.",
  },
  {
    title: "No contracts, no lock-in",
    body: `From ${brand.priceFrom} a month, billed per unit. Pause or cancel from the dashboard in one click.`,
  },
  {
    title: "One channel, every service",
    body: "Posts, short video, carousels, email and landing pages from the same team, on one brief.",
  },
  {
    title: "A fraction of agency cost",
    body: "No retainer, no account manager layer, no annual commitment to sign before anything is made.",
  },
];
