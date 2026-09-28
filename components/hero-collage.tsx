import { hero, work } from "@/lib/content";
import { cn, withBase } from "@/lib/utils";

/**
 * Three columns of work, scrolling continuously: outer two up, middle down.
 *
 * HOW THE LOOP WORKS: each column renders its tiles twice and travels exactly
 * half its own height, so the duplicate arrives where the original started
 * and the seam is invisible. The second copy is aria-hidden — a screen reader
 * should hear each tile once, not twice.
 *
 * DECORATION, NOT CONTENT. The whole strip is aria-hidden: it carries no
 * information the copy beside it does not, and a reader working down the page
 * should not have to listen to nineteen sample captions.
 *
 * Durations differ per column on purpose. Matched speeds make three columns
 * read as one sliding block; the middle running against the others is the
 * entire effect.
 */
const durations = ["38s", "30s", "44s"];

/* hero.collage holds keys, not tiles: the captions live in the sample library
   the portfolio grid reads from too. */
const byKey = new Map(work.items.map((item) => [item.src, item]));

export function HeroCollage() {
  return (
    <div
      className="marquee-stage relative h-[26rem] overflow-hidden sm:h-[32rem] lg:h-auto lg:self-stretch"
      aria-hidden="true"
    >
      {/* On desktop the columns are taken out of flow, so the copy alone sets
          the row height and the collage stretches to end level with it. */}
      <div className="grid h-full grid-cols-3 gap-3 lg:absolute lg:inset-0">
        {hero.collage.map((column, columnIndex) => {
          const goesDown = columnIndex === 1;
          return (
            <div key={columnIndex} className="overflow-hidden">
              <div
                className={cn("flex flex-col gap-3", goesDown ? "marquee-down" : "marquee-up")}
                style={{ ["--marquee-duration" as string]: durations[columnIndex] }}
              >
                {/* Rendered twice: the loop depends on it. */}
                {[0, 1].map((copy) =>
                  column.map((key, tileIndex) => {
                    const tile = byKey.get(key);
                    if (!tile) return null;
                    return (
                      <figure
                        key={`${copy}-${key}`}
                        /* border-0 undoes the hairline .ph carries: these are
                           finished artwork, not placeholder blocks. */
                        className="ph relative aspect-[9/16] shrink-0 border-0 shadow-[0_10px_30px_-14px_rgb(10_11_16/0.28)] transition-shadow duration-300 hover:shadow-[0_22px_48px_-18px_rgb(10_11_16/0.42)]"
                      >
                        <img
                          src={withBase(`/work/${tile.src}.webp`)}
                          alt={tile.alt}
                          width={work.tileWidth}
                          height={work.tileHeight}
                          /* Only the tiles that start on screen are worth
                             fetching up front; the rest arrive as they
                             scroll. */
                          loading={copy === 0 && tileIndex < 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="size-full object-cover"
                        />
                        {/* Service tag, bottom-left, as on the reference sheet. */}
                        <figcaption className="absolute bottom-2 left-2 rounded-full bg-ink/55 px-2.5 py-1 font-display text-[0.6rem] font-semibold tracking-[0.1em] text-white uppercase backdrop-blur-sm">
                          {tile.tag}
                        </figcaption>
                      </figure>
                    );
                  }),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
