import { gallery } from "@/lib/content";
import { WorkGrid, type Scope } from "@/components/work-grid";

/**
 * The portfolio: centred heading, then the filterable grid of sample work.
 *
 * The heading stays on the server; only the grid needs state, and it carries
 * the "use client" boundary itself.
 */
export function Gallery({
  title = gallery.title,
  initialScope,
}: {
  /** Landing pages name their trade in the heading. */
  title?: string;
  /** Landing pages open the grid on their own industry where we have work. */
  initialScope?: Scope;
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

        <WorkGrid initialScope={initialScope} />
      </div>
    </section>
  );
}
