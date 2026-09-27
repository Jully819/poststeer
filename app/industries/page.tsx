import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { brand } from "@/lib/content";
import { industries } from "@/lib/landing";
import { FinalCta } from "@/components/final-cta";

const intro =
  "The same subscription, written for the trade you are in. Pick your industry to see what a month of content looks like, what usually goes wrong, and what it costs.";

export const metadata: Metadata = {
  title: `Social Media Management by Industry | ${brand.name}`,
  description: intro,
  alternates: { canonical: "/industries" },
  robots: { index: false, follow: false },
};

/** The hub the industry pages breadcrumb back to. */
export default function IndustriesPage() {
  return (
    <>
      <section aria-labelledby="industries-title" className="section-pad">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="text-[0.8rem] text-muted">
            <a href="/" className="transition-colors hover:text-ink">
              Home
            </a>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">Industries</span>
          </nav>

          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="kicker">Industries · {industries.length}</p>
            <h1 id="industries-title" className="h1 mt-4">
              Built for your trade, not for everyone.
            </h1>
            <p className="lead mt-5">{intro}</p>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <a
                  href={`/industries/${industry.slug}`}
                  className="card flex items-center justify-between gap-4 p-5 transition-colors hover:border-ink"
                >
                  <span>
                    <span className="block font-display text-[1rem] font-semibold text-ink">
                      {industry.name}
                    </span>
                    <span className="mt-0.5 block text-[0.82rem] text-muted">
                      Social media management
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
