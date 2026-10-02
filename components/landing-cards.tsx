import { cn } from "@/lib/utils";

/**
 * A titled grid of plain cards, used twice on the landing pages: once for the
 * three things that go wrong in a trade, once for the four reasons the
 * subscription answers them.
 *
 * No icons. Two card grids stacked on one page with a glyph on every tile
 * reads as a feature wall; the numbers carry the second grid instead, and the
 * first carries nothing but the words.
 */
export function LandingCards({
  title,
  intro,
  items,
  numbered = false,
  tone = "page",
}: {
  title: string;
  /** One line under the heading. Service pages use it; landing pages do not. */
  intro?: string;
  items: { title: string; body: string }[];
  /** Puts a counter on each card. Used for the "why us" grid. */
  numbered?: boolean;
  /** "sage" tints the whole band, to break up a long page. */
  tone?: "page" | "sage";
}) {
  return (
    <section className={cn("section-pad", tone === "sage" && "bg-sage")}>
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="h2">{title}</h2>
          {intro ? <p className="lead mt-4">{intro}</p> : null}
        </div>

        {/* The column count follows the item count so no row ends in an
            orphan: five formats run five across, three run three. */}
        <ul
          className={cn(
            "mt-10 grid gap-4",
            items.length === 3 && "md:grid-cols-3",
            items.length === 5 && "sm:grid-cols-2 lg:grid-cols-5",
            items.length !== 3 && items.length !== 5 && "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {items.map((item, i) => (
            <li key={item.title} className="card flex flex-col p-6">
              {numbered ? (
                <span
                  className="mb-4 grid size-7 place-items-center rounded-full bg-accent-tint font-mono text-[0.7rem] font-semibold text-accent-ink"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ) : null}
              <h3 className="font-display text-[1.02rem] font-semibold text-ink">{item.title}</h3>
              <p className="body-text mt-2">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
