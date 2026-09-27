"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

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
 * ⚠️ THE PORTRAITS AND QUOTES ARE MOCKS THAT DO NOT LOOK LIKE MOCKS. See the
 * warning on `testimonials` in lib/content.ts: these have to be real, or
 * gone, before the site is opened to crawlers.
 */
export default function ClientFeedback() {
  const track = useRef<HTMLUListElement>(null);

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
          <ul
            ref={track}
            tabIndex={0}
            role="region"
            aria-label={testimonials.title}
            className={cn(
              "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1",
              "focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-4 focus-visible:outline-none",
              /* The arrows are the affordance; a scrollbar under the cards is
                 just a second one that does not match the design. */
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
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
                    src={`/reviews/${quote.photo}.webp`}
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
