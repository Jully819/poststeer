import { ArrowRight, Check, Plus, ShieldCheck, Star } from "lucide-react";
import { hero } from "@/lib/content";
import { HeroCollage } from "@/components/hero-collage";

/* Each cross is centred on a corner of its frame's border. */
const cornerPositions = [
  "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
];

/**
 * THE PREVIOUS HERO, KEPT DELIBERATELY. Copy on the left, three scrolling
 * columns of work on the right.
 *
 * Superseded by components/hero.tsx, which shows a fixed arrangement of
 * mocked-up posts instead. Nothing imports this; it is here so the marquee
 * can be put back without rebuilding it. To swap: import { HeroMarquee } in
 * app/page.tsx in place of { Hero }.
 */
export function HeroMarquee() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-12 pb-16 md:pt-16 md:pb-20">
      {/* items-start, not items-center: centring the copy against a collage
          that is taller than it leaves the headline sitting low, out of line
          with the first tile. Both columns now start on the same line. */}
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-2 text-[0.85rem] text-body">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3.5 fill-current text-ink" />
              ))}
            </span>
            <span className="font-display font-semibold text-ink">{hero.rating.score}</span>
            <span className="text-muted">
              {hero.rating.source} · {hero.rating.count}
            </span>
          </p>

          <h1 id="hero-title" className="h1 mt-5">
            {hero.headlineLead} <span className="text-accent-ink">{hero.headlineAccent}</span>
          </h1>

          <p className="lead mt-5 max-w-[34rem] font-semibold text-ink">{hero.subheadLead}</p>
          <ul className="mt-3 flex max-w-[34rem] flex-col gap-2">
            {hero.subhead.map((line) => (
              <li key={line} className="lead flex items-start gap-2.5">
                <span
                  className="mt-[0.2em] grid size-5 shrink-0 place-items-center rounded-full bg-accent-tint"
                  aria-hidden="true"
                >
                  <Check className="size-3 text-accent-ink" strokeWidth={3} />
                </span>
                {line}
              </li>
            ))}
          </ul>

          {/* 2x2 of dashed frames, a small cross on each corner. The page's
              cream shows through: the frames carry no fill. */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {hero.bullets.map((item) => (
              <li
                key={item.title}
                className="relative flex items-start gap-3 border border-dashed border-ink/25 p-4"
              >
                {cornerPositions.map((pos) => (
                  <Plus
                    key={pos}
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className={`absolute size-3.5 text-ink/70 ${pos}`}
                  />
                ))}
                {/* Green tick badge, hidden for now. To bring it back, restore this:
                <span
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-tint"
                  aria-hidden="true"
                >
                  <Check className="size-4 text-accent-ink" strokeWidth={2.5} />
                </span> */}
                <span className="leading-snug">
                  <span className="block text-[1.02rem] font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-body">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Large pills, arrow on both. The blue one leads. */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="/demo"
              className="btn btn-accent min-h-[3.4rem] px-8 text-[1.02rem] font-semibold"
            >
              {hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="btn btn-ghost min-h-[3.4rem] bg-paper px-8 text-[1.02rem] font-semibold shadow-[0_1px_2px_rgb(13_15_20/0.06)]"
            >
              {hero.secondaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          {/* Reassurance line: shield, then one emphasised clause and two
              quiet ones, separated by middots. */}
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

        <HeroCollage />
      </div>
    </section>
  );
}
