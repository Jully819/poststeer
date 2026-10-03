import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand, servicePages, servicesMenu } from "@/lib/content";
import { CheckoutSteps } from "@/components/checkout-steps";
import { ServiceHero } from "@/components/service-hero";
import { ServiceSteps } from "@/components/service-steps";
import { ServiceIncludes } from "@/components/service-includes";
import { ServiceTools } from "@/components/service-tools";
import { LogoStrip } from "@/components/logo-strip";
import { Gallery } from "@/components/gallery";
import { LandingCards } from "@/components/landing-cards";
import { PricingBuilder } from "@/components/pricing-builder";
import { Guarantee } from "@/components/guarantee";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { serviceIcons } from "@/components/ui/service-icons";
import { withBase } from "@/lib/utils";

const allItems = servicesMenu.groups.flatMap((group) => group.items);

/** Static per service, and an unknown slug 404s rather than rendering empty. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = allItems.find((candidate) => candidate.slug === slug);
  if (!item) return {};

  return {
    title: `${item.name} | ${brand.name}`,
    description: servicePages[slug]?.intro,
    alternates: { canonical: `/services/${slug}` },
  };
}

/**
 * One full page per service, from one shell.
 *
 * THE SHAPE FOLLOWS THE REFERENCE: hero, channels, how it works, portfolio,
 * what's included, the service's own bands, plan builder, guarantee, FAQ,
 * close. Three of those bands are conditional, and that is the point —
 * `channels`, `workType` and `tools` are only set on the services they are
 * true for, so the Business Website page does not carry a row of Instagram
 * posts under a heading promising examples of this service.
 *
 * BACKGROUNDS ALTERNATE AND THERE ARE ONLY THREE. Reading down: page, sage,
 * page, wash, page, sage, band, page, wash, band. No two neighbours share a
 * tone, including when the conditional bands drop out — which is why the
 * service's own `sections` alternate from an index that counts them rather
 * than from a fixed tone. See app/globals.css.
 *
 * WHAT IS NOT HERE. No review scores, no client counts, no case studies.
 * references/stats.md confirms none of them, and this page is indexed.
 */
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = allItems.find((candidate) => candidate.slug === slug);
  const page = servicePages[slug];
  if (!item || !page) notFound();

  const others = allItems.filter((candidate) => candidate.slug !== slug);
  const sections = page.sections ?? [];

  return (
    <>
      <CheckoutSteps current={0} />

      <ServiceHero item={item} page={page} />

      {page.channels ? <LogoStrip /> : null}

      <ServiceSteps
        title={item.unit === "once" ? "How the project runs." : "How the month runs."}
        steps={page.steps}
      />

      {page.workType ? (
        <Gallery
          title={page.galleryTitle ?? "Work we have made for other brands."}
          initialScope="all"
          initialType={page.workType}
        />
      ) : null}

      <ServiceIncludes
        page={page}
        title={
          item.unit === "once"
            ? "Everything handled, start to launch."
            : "Everything handled, every month."
        }
      />

      {/* The service's own bands. The first takes the page tone against the
          wash above it; a second alternates back to sage. */}
      {sections.map((section, i) => (
        <LandingCards
          key={section.title}
          title={section.title}
          intro={section.intro}
          items={section.items}
          tone={i % 2 === 0 ? "page" : "sage"}
        />
      ))}

      {page.tools ? <ServiceTools tools={page.tools} /> : null}

      {/* Opens on this service rather than on the first row of the catalogue.
          A quoted service has no row, so the builder opens on the catalogue's
          first entry rather than pretending to hold this one. */}
      <PricingBuilder initialServiceId={item.enquiry ? undefined : item.planId} />
      <Guarantee />
      <Faq />

      <section aria-labelledby="others-title" className="section-pad bg-wash">
        <div className="container-x">
          <h2 id="others-title" className="h2 text-center">
            The rest of what we do.
          </h2>

          <ul className="mx-auto mt-10 grid max-w-[60rem] gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => {
              const OtherIcon = serviceIcons[other.icon];
              return (
                <li key={other.slug}>
                  <a
                    href={withBase(`/services/${other.slug}`)}
                    className="flex h-full items-center gap-3 rounded-xl border border-hairline bg-paper p-3.5 transition-colors hover:border-ink"
                  >
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg bg-wash"
                      aria-hidden="true"
                    >
                      <OtherIcon className="size-4 text-ink" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[0.9rem] font-semibold text-ink">
                        {other.name}
                      </span>
                      <span className="block truncate text-[0.78rem] text-muted">
                        {other.enquiry ? "On enquiry" : `from ${other.price} ${other.unit}`}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
