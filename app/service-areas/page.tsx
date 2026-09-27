import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { serviceAreas } from "@/lib/content";
import { CityGrid } from "@/components/city-grid";
import { Button } from "@/components/ui/button";
import KineticGrid from "@/components/ui/kinetic-grid";

/**
 * /service-areas — the page behind the footer's "All cities" link.
 *
 * Header, searchable grid, then the closing band. The band is the same
 * KineticGrid treatment as the guarantee and final-CTA blocks rather than the
 * reference's saturated blue panel: this site has one accent, and a third
 * colour arriving on a directory page is how that rule dies.
 */
export const metadata: Metadata = {
  title: serviceAreas.seoTitle,
  description: serviceAreas.seoDescription,
  alternates: { canonical: "/service-areas" },
  robots: { index: false, follow: false },
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="container-x pt-14 pb-4 text-center">
        <p className="kicker">{serviceAreas.kicker}</p>
        <h1 className="h1 mx-auto mt-4 max-w-[18ch]">{serviceAreas.title}</h1>
        <p className="lead mx-auto mt-5 max-w-[56ch]">{serviceAreas.intro}</p>
      </section>

      <section aria-label="Cities" className="container-x pb-16 text-left">
        <CityGrid />
      </section>

      <section aria-labelledby="areas-cta" className="pb-20 md:pb-28">
        <div className="container-x">
          <KineticGrid className="rounded-2xl bg-ink text-white">
            <div className="px-8 py-14 text-center md:px-12 md:py-16">
              <p className="kicker text-white/50">{serviceAreas.cta.kicker}</p>
              <h2 id="areas-cta" className="h2 mx-auto mt-4 max-w-[18ch] text-white">
                {serviceAreas.cta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] text-[1.02rem] leading-relaxed text-white/80">
                {serviceAreas.cta.body}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/demo" variant="accent">
                  {serviceAreas.cta.primary}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <a href="#pricing" className="btn border border-white/30 text-white hover:border-white">
                  {serviceAreas.cta.secondary}
                </a>
              </div>

              <p className="mt-7 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[0.72rem] text-white/60">
                {serviceAreas.cta.footnote.map((line, i) => (
                  <span key={line}>
                    {i > 0 ? <span aria-hidden="true">· </span> : null}
                    {line}
                  </span>
                ))}
              </p>

              <dl className="mt-12 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {/* flex-col-reverse: the value reads on top, but the source
                    order stays dt-then-dd, so the label is announced once. */}
                {serviceAreas.cta.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="mt-2 font-mono text-[0.72rem] text-white/60">{stat.label}</dt>
                    <dd className="font-display text-[1.8rem] leading-none font-bold text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </KineticGrid>
        </div>
      </section>
    </>
  );
}
