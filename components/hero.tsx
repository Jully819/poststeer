import { ArrowRight, CalendarX, Check, PencilLine, ShieldCheck } from "lucide-react";
import { hero } from "@/lib/content";
import { HeroCards } from "@/components/hero-cards";
import { withBase } from "@/lib/utils";

const highlightIcons = { pencil: PencilLine, check: Check, calendar: CalendarX };

/**
 * Left column of copy, right column of mocked-up deliverables.
 *
 * The 2x2 of dashed frames this used to carry is now three plain items in a
 * row: at four, each one had to be short enough to fit a half-width box, and
 * "Cancel anytime" in a bordered frame with crosses on every corner is a lot
 * of furniture around two words.
 *
 * The previous version, with the scrolling collage, is kept intact at
 * components/hero-marquee.tsx — see the note there for how to swap back.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-12 pb-16 md:pt-16 md:pb-20">
      {/* items-center, not items-start: the card cluster is shorter than the
          marquee was, so the two columns now balance rather than the copy
          hanging off the top of a much taller neighbour. */}
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <h1 id="hero-title" className="h1 mt-5">
            {hero.headlineLead} <span className="text-accent-ink">{hero.headlineAccent}</span>
          </h1>

          <p className="lead mt-5 max-w-[32rem]">{hero.subheadParagraph}</p>

          {/* Three across on desktop, stacked on a phone. */}
          <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-5">
            {hero.highlights.map((item) => {
              const Icon = highlightIcons[item.icon];
              return (
                <li key={item.title}>
                  <span
                    className="grid size-8 place-items-center rounded-lg bg-accent-tint"
                    aria-hidden="true"
                  >
                    <Icon className="size-4 text-accent-ink" strokeWidth={2.25} />
                  </span>
                  <span className="mt-2.5 block font-display text-[0.92rem] font-semibold text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.85rem] leading-snug text-body">
                    {item.body}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={withBase("/demo")}
              className="btn btn-accent min-h-[3.4rem] px-8 text-[1.02rem] font-semibold"
            >
              {hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#pricing"
              className="btn btn-ghost min-h-[3.4rem] bg-paper px-8 text-[1.02rem] font-semibold shadow-[0_1px_2px_rgb(13_15_20/0.06)]"
            >
              {hero.secondaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.82rem] tracking-tight">
            <ShieldCheck className="size-4 shrink-0 text-accent-ink" aria-hidden="true" />
            {hero.footnote.map((part, i) => (
              <span key={part.text} className="flex items-center gap-2">
                {i > 0 ? (
                  <span aria-hidden="true" className="text-hairline">
                    ·
                  </span>
                ) : null}
                <span className={part.strong ? "font-medium text-ink" : "text-muted"}>
                  {part.text}
                </span>
              </span>
            ))}
          </p>
        </div>

        <HeroCards />
      </div>
    </section>
  );
}
