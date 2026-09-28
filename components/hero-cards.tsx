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

/** Shown at its own ratio, so the baked-in wording survives intact. */
function Art({ art }: { art: { src: string; alt: string; w: number; h: number } }) {
  return (
    <img
      src={withBase(`/hero/${art.src}.webp`)}
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

export function HeroCards() {
  const s = hero.showcase;
  const [postCard, carouselCard, storyCard] = s.cards;

  return (
    <div className="relative xl:pr-28" aria-hidden="true">
      <div className="flex gap-3 sm:gap-4">
        {/* Left stack: the reel, then the newsletter under it. */}
        <div className="flex w-[57%] flex-col gap-3 sm:gap-4">
          <figure className="relative overflow-hidden rounded-2xl shadow-[0_18px_44px_-18px_rgb(10_11_16/0.4)] transition-shadow duration-300 hover:shadow-[0_30px_64px_-20px_rgb(10_11_16/0.5)] sm:-rotate-1">
            {/* No overlays: the artwork carries the avatar, handle, counters,
                progress bar and platform pill itself. Drawing ours on top of
                them printed each one twice. */}
            <Art art={s.video} />
          </figure>

          <figure className="relative overflow-hidden rounded-2xl shadow-[0_14px_36px_-18px_rgb(10_11_16/0.3)] transition-shadow duration-300 hover:shadow-[0_26px_56px_-20px_rgb(10_11_16/0.45)] sm:rotate-[0.5deg]">
            {/* The wordmark is printed on this artwork too. */}
            <Art art={s.email} />
          </figure>
        </div>

        {/* Right stack: post, carousel, story. Their badges are printed on. */}
        <div className="flex w-[43%] flex-col gap-3 sm:gap-4">
          {[postCard, carouselCard, storyCard].map((card, i) => (
            <figure
              key={card.src}
              className={cn(
                "overflow-hidden rounded-2xl shadow-[0_14px_36px_-18px_rgb(10_11_16/0.3)] transition-shadow duration-300 hover:shadow-[0_26px_56px_-20px_rgb(10_11_16/0.45)]",
                i === 0 && "sm:rotate-1",
                i === 1 && "sm:-rotate-[0.5deg]",
                i === 2 && "sm:rotate-[1.5deg]",
              )}
            >
              <Art art={card} />
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
