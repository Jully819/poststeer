import { gallery as defaultGallery } from "@/lib/content";
import { WorkGrid, type Scope, type TypeId } from "@/components/work-grid";

/**
 * The portfolio: centred heading, then the filterable grid of sample work.
 *
 * The heading stays on the server; only the grid needs state, and it carries
 * the "use client" boundary itself.
 */
export function Gallery({
  gallery = defaultGallery,
  title = gallery.title,
  initialScope,
  initialType,
}: {
  /** Another language's labels. The counts and the grid are the same. */
  gallery?: typeof defaultGallery;
  /** Landing pages name their trade in the heading. */
  title?: string;
  /** Landing pages open the grid on their own industry where we have work. */
  initialScope?: Scope;
  /**
   * Service pages open the grid on their own service tab. They pass "all" as
   * the industry scope with it: one service tab holds a handful of cards, and
   * narrowing those to the featured two reads as an empty shelf.
   */
  initialType?: TypeId;
} = {}) {
  return (
    <section id="work" aria-labelledby="gallery-title" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker">{gallery.kicker}</p>
          <h2 id="gallery-title" className="h2 mt-4">
            {title}
          </h2>
        </div>

        <WorkGrid gallery={gallery} initialScope={initialScope} initialType={initialType} />
      </div>
    </section>
  );
}
