import { hero } from "@/lib/content";
import { cn, withBase } from "@/lib/utils";

/**
 * The right half of the hero: five mocked-up deliverables, arranged rather
 * than scrolling.
 *
 * WHY A FIXED ARRANGEMENT. The marquee it replaces (kept at
 * components/hero-marquee.tsx) showed more work but said less about it: nine
 * tiles going past at three speeds read as wallpaper. Five that sit still,
 * each labelled with the platform it belongs to, say what is actually being
 * sold — a post, a carousel, a story, a reel and an email, every month.
 *
 * ALMOST NOTHING IS DRAWN OVER THE ARTWORK. The platform pills came printed
 * on the supplied cards, so there are no HTML pills here. The two exceptions
 * are forced by the files and are noted where they appear: the reel lost its
 * handle, scrubber and badge to a crop, and the newsletter had another
 * brand's wordmark painted out of it.
 *
 * NOTHING IS CROPPED IN THE BROWSER either. Each card is shown at the
 * intrinsic ratio given by the `w` and `h` on hero.showcase, because the
 * artwork has its wording baked in and a crop would take words off it.
 *
 * THE WHOLE BLOCK IS aria-hidden. It carries no information the copy beside
 * it does not, and a screen reader should not have to sit through five
 * sample captions to reach the buttons.
 */

/**
 * Card shadows, at rest and on hover.
 *
 * NOTHING AT REST. The cards sit flat on the page and the shadow is purely a
 * hover response, so it reads as the card answering the pointer rather than as
 * depth the layout always had. `shadow-none` is set explicitly rather than
 * omitted, because the transition needs a defined start to animate from.
 *
 * THE HOVER PULLS IN RATHER THAN SPREADING OUT. The obvious move is to grow
 * the blur and drop the card further off the page, which is what this used to
 * do. It reads as the card drifting away. Tightening instead — shorter offset,
 * much less blur, split into a hard contact layer and a contained body layer —
 * reads as the card being pulled down against the page and held there.
 *
 * The reel hovers a step heavier than the rest, because it is the largest card
 * and an identical shadow under a bigger object looks lighter.
 *
 * THERE ARE TWO DIALS HERE AND THEY MOVE INDEPENDENTLY. Keeping them apart is
 * the point, because every request about this shadow has been about one or the
 * other, never both.
 *
 * WEIGHT is the alpha. Raise it to make the hover hit harder. Nothing else.
 *
 * REACH is the blur and the negative spread together. How far the shadow gets
 * out past the card edge before it fades. Blur pushes it out, negative spread
 * pulls it back under the card, and the visible reach is roughly
 * `offset + blur / 2 + spread`. Shrink both to keep the shadow hugging the
 * card. Reaching for alpha to fix reach, or blur to fix weight, is what turns
 * this back into the soft drifting shadow it is deliberately not.
 */
const CARD_SHADOW =
  "shadow-none hover:shadow-[0_2px_6px_-2px_rgb(10_11_16/0.42),0_8px_16px_-10px_rgb(10_11_16/0.5)]";

const REEL_SHADOW =
  "shadow-none hover:shadow-[0_3px_8px_-3px_rgb(10_11_16/0.46),0_10px_20px_-12px_rgb(10_11_16/0.56)]";

/**
 * Shown at its own ratio, so the baked-in wording survives intact.
 *
 * TWO RENDITIONS, AND A `sizes` THAT DESCRIBES THE REAL LAYOUT. The masters
 * run up to 1352px wide and these cards are drawn at roughly 180 to 300,
 * so without this the browser downloads about four times the pixels it can
 * use. `sizes` is per stack because the two columns are 57% and 43% of the
 * cluster and a single value would be wrong for one of them.
 *
 * The widths here have to stay in step with the widths generated on disk.
 */
function Art({
  art,
  sizes,
}: {
  art: { src: string; alt: string; w: number; h: number };
  sizes: string;
}) {
  const base = withBase(`/hero/${art.src}`);
  return (
    <img
      src={`${base}-800.webp`}
      srcSet={`${base}-480.webp 480w, ${base}-800.webp 800w`}
      sizes={sizes}
      alt={art.alt}
      width={art.w}
      height={art.h}
      /* Above the fold on every page that uses the hero. */
      loading="eager"
      decoding="async"
      className="block w-full"
      style={{ aspectRatio: `${art.w} / ${art.h}` }}
    />
  );
}

/* The cluster is 57/43 inside a half-width column that loses 7rem of padding
   at xl. These track that, so the browser picks the small rendition on a
   phone instead of the large one. */
const LEFT_SIZES = "(min-width: 1280px) 240px, (min-width: 1024px) 300px, 55vw";
const RIGHT_SIZES = "(min-width: 1280px) 180px, (min-width: 1024px) 230px, 41vw";

export function HeroCards() {
  const s = hero.showcase;
  const [postCard, carouselCard, storyCard] = s.cards;

  return (
    <div className="relative xl:pr-28" aria-hidden="true">
      <div className="flex gap-3 sm:gap-4">
        {/* Left stack: the reel, then the newsletter under it. */}
        <div className="flex w-[57%] flex-col gap-3 sm:gap-4">
          <figure
            className={cn(
              "relative overflow-hidden rounded-2xl transition-shadow duration-300 sm:-rotate-1",
              REEL_SHADOW,
            )}
          >
            <Art art={s.video} sizes={LEFT_SIZES} />
            {/* Only the identity is ours. The counters, progress bar and
                platform pill are printed on the artwork, so drawing those
                again would show each one twice. */}
            <span className="absolute top-3 left-3 flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-paper font-display text-[0.65rem] font-bold text-ink">
                {s.handle.replace(/[^A-Za-z]/g, "").slice(0, 1).toUpperCase()}
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[0.7rem] font-semibold text-white drop-shadow">
                  {s.handle}
                </span>
                <span className="block font-mono text-[0.6rem] text-white/75 drop-shadow">
                  {s.posted}
                </span>
              </span>
            </span>
          </figure>

          <figure
            className={cn(
              "relative overflow-hidden rounded-2xl transition-shadow duration-300 sm:rotate-[0.5deg]",
              CARD_SHADOW,
            )}
          >
            <Art art={s.email} sizes={LEFT_SIZES} />
            {/* Ours, over the painted-out wordmark. The rest of this card's
                furniture is baked into the artwork; only the brand name is
                ours to set. */}
            <span
              className="absolute font-display text-[0.6rem] font-semibold tracking-[0.2em] text-ink uppercase sm:text-[0.68rem]"
              style={{ left: s.email.wordmarkLeft, top: s.email.wordmarkTop }}
            >
              {s.handle}
            </span>
          </figure>
        </div>

        {/* Right stack: post, carousel, story. Their badges are printed on. */}
        <div className="flex w-[43%] flex-col gap-3 sm:gap-4">
          {[postCard, carouselCard, storyCard].map((card, i) => (
            <figure
              key={card.src}
              className={cn(
                "overflow-hidden rounded-2xl transition-shadow duration-300",
                CARD_SHADOW,
                i === 0 && "sm:rotate-1",
                i === 1 && "sm:-rotate-[0.5deg]",
                i === 2 && "sm:rotate-[1.5deg]",
              )}
            >
              <Art art={card} sizes={RIGHT_SIZES} />
            </figure>
          ))}
        </div>
      </div>

      {/* Pencilled notes, in the gutter the xl padding reserves. */}
      <Note note={s.notes[0]} className="top-0 -right-10" />
      <Note note={s.notes[1]} className="-right-10 bottom-14" />
    </div>
  );
}

/** One scanned note, keyed to transparency, in the right-hand gutter. */
function Note({
  note,
  className,
}: {
  note: { src: string; w: number; h: number };
  className?: string;
}) {
  return (
    <img
      src={withBase(`/hero/${note.src}.webp`)}
      alt=""
      aria-hidden="true"
      width={note.w}
      height={note.h}
      loading="lazy"
      decoding="async"
      className={cn(
        "pointer-events-none absolute hidden w-[7.5rem] select-none xl:block",
        className,
      )}
    />
  );
}
