import { ArrowRight } from "lucide-react";
import { DemoBooker } from "@/components/demo-booker";

/**
 * Hero for the city and industry landing pages: copy and a stat row on the
 * left, the booking picker on the right.
 *
 * The picker rather than the marquee. Someone who has landed on "social media
 * agency in <city>" arrived from a search with intent; the homepage's job is
 * to show the work, this page's job is to take the meeting.
 */
export function LandingHero({
  breadcrumb,
  kicker,
  titleLead,
  titleAccent,
  intro,
  stats,
}: {
  breadcrumb: { label: string; href?: string }[];
  kicker: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <section aria-labelledby="landing-title" className="pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-[0.8rem] text-muted">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.label}>
              {i > 0 ? <span aria-hidden="true"> / </span> : null}
              {crumb.href ? (
                <a href={crumb.href} className="transition-colors hover:text-ink">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-ink">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_26rem] lg:gap-16">
          <div>
            <p className="kicker">{kicker}</p>

            <h1 id="landing-title" className="h1 mt-4 max-w-[18ch]">
              {titleLead} <span className="text-accent-ink">{titleAccent}</span>
            </h1>

            <p className="lead mt-5 max-w-[34rem]">{intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/demo" className="btn btn-accent min-h-[3.2rem] px-7 text-[1rem]">
                Book a demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#pricing"
                className="btn btn-ghost min-h-[3.2rem] px-7 text-[1rem] shadow-[0_1px_2px_rgb(13_15_20/0.06)]"
              >
                See pricing
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>

            {/* Stat row. Figures are the site's placeholders, brackets and
                all — they are marked everywhere else too. */}
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-hairline pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[1.5rem] font-bold tracking-tight text-ink">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.72rem] text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <DemoBooker />
        </div>
      </div>
    </section>
  );
}
