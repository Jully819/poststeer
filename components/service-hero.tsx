import { ArrowRight, Check } from "lucide-react";
import { type MenuItem, type ServicePage } from "@/lib/content";
import { DemoBooker } from "@/components/demo-booker";
import { serviceIcons } from "@/components/ui/service-icons";
import { withBase } from "@/lib/utils";

/* The two confirmed facts, spelled out rather than parsed back out of the
   mega-menu's one-line versions. See references/stats.md: these are the only
   two non-price claims on the page. */
const facts = [
  { value: "2018", label: "Trading since" },
  { value: "14 days", label: "Money-back guarantee" },
];

/**
 * The top of a service page: breadcrumb, the service's own h1, four ticked
 * lines, the price, and the booking card on the right.
 *
 * THE BOOKING CARD RATHER THAN A COLLAGE. Someone who clicked "Short-Form
 * Videos" in the mega-menu has already chosen a service; the job of this
 * screen is to take the next step, not to re-sell the category. It is also
 * the same right-hand column the city and industry pages use, so a visitor
 * moving between them is not relearning the layout.
 *
 * THE TRUST ROW CARRIES THREE FACTS AND NOT ONE MORE. "Since 2018", the
 * 14-day guarantee and the price are the only claims on this page that
 * references/stats.md has confirmed. Client counts and review scores belong
 * here the day they are real and not before.
 */
export function ServiceHero({
  item,
  page,
}: {
  item: MenuItem;
  page: ServicePage;
}) {
  const Icon = serviceIcons[item.icon];
  /* Lands on /pricing with this service already in the build. */
  const planHref = `/pricing#plan=${item.planId}:0`;

  return (
    <section aria-labelledby="service-title" className="pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="container-x">
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

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_26rem] lg:gap-16">
          <div>
            <p className="kicker flex items-center gap-2">
              <Icon className="size-4 text-accent-ink" aria-hidden="true" />
              {page.kicker}
            </p>

            <h1 id="service-title" className="h1 mt-4 max-w-[20ch]">
              {page.titleLead} <span className="text-accent-ink">{page.titleAccent}</span>
            </h1>

            <p className="lead mt-5 max-w-[34rem]">{page.intro}</p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {page.highlights.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
                  <span className="text-[0.92rem] leading-relaxed text-body">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={withBase(planHref)}
                className="btn btn-accent min-h-[3.2rem] px-7 text-[1rem]"
              >
                Add to plan
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

            {/* Price, then the two facts that qualify it.

                EACH LABEL IS THE <dt>, NOT A SPAN BESIDE AN sr-only COPY OF
                ITSELF. `flex-col-reverse` puts the value on top where the eye
                wants it while the term still comes first in the document, so
                a screen reader reads "Trading since, 2018" once rather than
                twice. */}
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-hairline pt-6">
              <div className="flex flex-col-reverse">
                <dt className="mt-0.5 font-mono text-[0.72rem] text-muted">
                  {item.unit === "once" ? "One-time project" : "No contract, cancel anytime"}
                </dt>
                <dd className="font-display text-[1.5rem] font-bold tracking-tight text-accent-ink">
                  from {item.price}
                  <span className="text-[1rem] font-semibold text-ink"> {item.unit}</span>
                </dd>
              </div>

              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse">
                  <dt className="mt-0.5 font-mono text-[0.72rem] text-muted">{fact.label}</dt>
                  <dd className="font-display text-[1.5rem] font-bold tracking-tight text-ink">
                    {fact.value}
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
