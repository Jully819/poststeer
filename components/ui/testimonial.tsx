"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { cn, withBase } from "@/lib/utils";

/**
 * Client reviews as a slider: one row of identical cards, each a portrait
 * beside the quote, with an arrow at either end.
 *
 * REPLACES A THREE-COLUMN MOSAIC of seven cards in three different tones
 * (light, mint, ink). That layout made the quotes compete — a mint card next
 * to an ink one reads as two different kinds of endorsement, when they are
 * all just customers saying something. Identical cards let the words differ
 * instead of the packaging.
 *
 * THE TRACK IS A SCROLL CONTAINER, NOT A JAVASCRIPT CAROUSEL. It snaps, it
 * works with a trackpad, a touch screen and the keyboard before any script
 * runs, and the arrows only call scrollBy. There is no autoplay: a quote that
 * slides away while it is being read is worse than no quote.
 *
 * ⚠️ NOTHING RENDERS THIS RIGHT NOW. The portraits and quotes are mocks that
 * do not look like mocks, so the section was taken off the home page, the
 * city pages and the industry pages rather than shipped to crawlers. The
 * component is kept intact and working for the day there are real reviews to
 * put through it. See the note on `testimonials` in lib/content.ts for what
 * has to be true first.
 */
export default function ClientFeedback() {
  const track = useRef<HTMLDivElement>(null);

  /* One card plus one gap, measured off the DOM rather than hardcoded, so the
     step stays right as the card width changes across breakpoints. */
  function page(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="kicker">{testimonials.kicker}</p>
          <h2 id="reviews-title" className="h2">
            {testimonials.title}
          </h2>
          <p className="lead mx-auto">{testimonials.intro}</p>
        </div>

        <div className="relative mt-12">
          {/* THE SCROLL REGION AND THE LIST ARE TWO ELEMENTS ON PURPOSE.
              Both jobs used to sit on the <ul>, and role="region" overrode the
              list role that <ul> carries implicitly. That is not a role <ul>
              allows, and it also orphaned every <li> inside it, because their
              parent no longer announced itself as a list. One mistake, two
              axe failures. The div is the focusable, labelled scroll
              container; the ul is just a list again. */}
          <div
            ref={track}
            tabIndex={0}
            role="region"
            aria-label={testimonials.title}
            className={cn(
              "overflow-x-auto scroll-smooth pb-1",
              "focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-4 focus-visible:outline-none",
              /* The arrows are the affordance; a scrollbar under the cards is
                 just a second one that does not match the design. */
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            <ul className="flex snap-x snap-mandatory gap-4">
              {testimonials.quotes.map((quote) => (
                <li
                  key={quote.quote}
                  className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[calc((100%-2rem)/3)]"
                >
                  <figure className="card flex h-full overflow-hidden">
                    {/* Portrait panel, full height so the cards read as one
                        row. object-cover crops the sides rather than the face:
                        each file is already framed on it. */}
                    <img
                      src={withBase(`/reviews/${quote.photo}.webp`)}
                      alt=""
                      aria-hidden="true"
                      width={340}
                      height={510}
                      loading="lazy"
                      decoding="async"
                      className="w-[38%] shrink-0 object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between gap-5 p-5">
                      <blockquote className="text-[0.95rem] leading-relaxed text-ink">
                        “{quote.quote}”
                      </blockquote>

                      <figcaption>
                        <span className="flex items-center gap-0.5" aria-hidden="true">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className="size-3.5 fill-current text-ink" />
                          ))}
                        </span>
                        <span className="mt-2.5 block font-display text-[0.95rem] font-semibold text-ink">
                          {quote.name}
                        </span>
                        <span className="block text-[0.85rem] text-muted">{quote.role}</span>
                      </figcaption>
                    </div>
                  </figure>
                  </li>
                ))}
            </ul>
          </div>

          <Arrow direction={-1} onClick={() => page(-1)} />
          <Arrow direction={1} onClick={() => page(1)} />
        </div>
      </div>
    </section>
  );
}

/** Circular control, outside the track where the page is wide enough. */
function Arrow({ direction, onClick }: { direction: 1 | -1; onClick: () => void }) {
  const Icon = direction === 1 ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 1 ? "Next reviews" : "Previous reviews"}
      className={cn(
        "absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-paper text-ink shadow-[0_4px_14px_-6px_rgb(10_11_16/0.3)] transition-colors hover:border-ink",
        "focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:outline-none",
        direction === 1 ? "right-1 xl:-right-14" : "left-1 xl:-left-14",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  );
}
