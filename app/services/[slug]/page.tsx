import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { brand, servicePages, servicesMenu } from "@/lib/content";
import { CheckoutSteps } from "@/components/checkout-steps";
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = allItems.find((candidate) => candidate.slug === slug);
  const page = servicePages[slug];
  if (!item || !page) notFound();

  const Icon = serviceIcons[item.icon];
  /* Lands on /pricing with this service already selected. */
  const pricingHref = `/pricing#plan=${item.planId}:0`;
  const others = allItems.filter((candidate) => candidate.slug !== slug);

  return (
    <>
      <CheckoutSteps current={0} />

      <article className="container-x py-12">
        <nav aria-label="Breadcrumb" className="text-[0.8rem] text-muted">
          <a href={withBase("/")} className="transition-colors hover:text-ink">
            Home
          </a>
          <span aria-hidden="true"> / </span>
          <a href={withBase("/pricing")} className="transition-colors hover:text-ink">
            Services
          </a>
          <span aria-hidden="true"> / </span>
          <span className="text-ink">{item.name}</span>
        </nav>

        <header className="mt-6 flex flex-wrap items-start gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-wash" aria-hidden="true">
            <Icon className="size-6 text-ink" />
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[2rem] leading-tight font-bold tracking-tight text-ink">
              {item.name}
            </h1>
            <p className="mt-1 text-[0.95rem] text-muted">{item.tagline}</p>
          </div>

          <p className="font-mono text-[0.8rem] text-muted">
            from{" "}
            <span className="font-display text-[1.6rem] font-bold text-accent-ink">{item.price}</span>{" "}
            {item.unit}
          </p>
        </header>

        <p className="mt-6 max-w-[44rem] text-[1rem] leading-relaxed text-body">{page.intro}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={withBase(pricingHref)} className="btn btn-accent min-h-[3rem] px-6 text-[0.95rem]">
            Add to plan
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a href={withBase("/pricing")} className="btn btn-ghost min-h-[3rem] px-6 text-[0.95rem]">
            See all services
          </a>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <section aria-labelledby="includes">
            <h2 id="includes" className="font-display text-[1.1rem] font-bold text-ink">
              What you get
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {page.includes.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
                  <span className="text-[0.92rem] leading-relaxed text-body">{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="how">
            <h2 id="how" className="font-display text-[1.1rem] font-bold text-ink">
              How the month runs
            </h2>
            <ol className="mt-4 flex flex-col gap-4">
              {page.steps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[0.7rem] font-semibold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-display text-[0.95rem] font-semibold text-ink">
                      {step.title}
                    </span>
                    <span className="block text-[0.9rem] leading-relaxed text-body">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section aria-labelledby="others" className="mt-14 border-t border-hairline pt-8">
          <h2 id="others" className="font-display text-[1.1rem] font-bold text-ink">
            Other services
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => {
              const OtherIcon = serviceIcons[other.icon];
              return (
                <li key={other.slug}>
                  <a
                    href={withBase(`/services/${other.slug}`)}
                    className="flex items-center gap-3 rounded-xl border border-hairline bg-wash p-3 transition-colors hover:border-ink"
                  >
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-lg bg-paper"
                      aria-hidden="true"
                    >
                      <OtherIcon className="size-4 text-ink" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[0.88rem] font-semibold text-ink">
                        {other.name}
                      </span>
                      <span className="block truncate text-[0.78rem] text-muted">
                        from {other.price} {other.unit}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </article>
    </>
  );
}
