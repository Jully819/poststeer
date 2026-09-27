import { Check } from "lucide-react";
import { guarantee } from "@/lib/content";
import KineticGrid from "@/components/ui/kinetic-grid";

/**
 * The black band: the one dark block on the page.
 *
 * Its background is the kinetic grid — a canvas that warps towards the cursor
 * and ripples on click, scoped to this band rather than the viewport. The
 * card keeps its own bg-ink, so the canvas draws over it and the colour stays
 * defined in one place.
 */
export function Guarantee() {
  return (
    /* Full bleed, not a rounded card inset on cream. One of the page's three
       backgrounds, so the edge of the band is the section break. */
    <section aria-labelledby="guarantee-title" className="bg-band text-white">
      <KineticGrid className="bg-band text-white">
        <div className="container-x">
          <div className="grid gap-8 py-16 md:grid-cols-[1.5fr_auto] md:items-center md:py-24">
            <div>
              <p className="kicker text-white/60">{guarantee.kicker}</p>
              <h2 id="guarantee-title" className="h2 mt-4 text-white">
                {guarantee.title}
              </h2>
              <p className="mt-4 max-w-[38rem] text-[1rem] leading-relaxed text-white/85">
                {guarantee.body}
              </p>

              <ul className="mt-7 grid gap-5 sm:grid-cols-3">
                {guarantee.points.map((point) => (
                  <li key={point.title} className="text-[0.85rem] leading-relaxed text-white/75">
                    <p className="flex items-start gap-2 font-display font-semibold text-white">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      {point.title}
                    </p>
                    <p className="mt-1.5 pl-6">{point.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backdrop-blurred rather than flat, so the grid reads through it
                instead of being punched out by a solid tile. */}
            <div className="grid size-28 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-center backdrop-blur-sm">
              <div>
                <p className="font-display text-[2.4rem] leading-none font-bold text-white">
                  {guarantee.badgeNumber}
                </p>
                <p className="mt-1 text-[0.75rem] text-white/75">{guarantee.badgeLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </KineticGrid>
    </section>
  );
}
