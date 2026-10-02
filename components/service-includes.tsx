import type { ServicePage } from "@/lib/content";
import { featureIcons } from "@/components/ui/feature-icons";

/**
 * What the buyer actually receives: six cards, and nothing after them.
 *
 * THERE WAS A "WHEN NOT TO BUY THIS" PARAGRAPH HERE. It came out on the
 * owner's instruction, on every service page at once. The copy is in the
 * history at 0c4937a if it is ever wanted back; it is not parked in
 * lib/content.ts, because a field nothing renders is a field that rots.
 *
 * Worth knowing before anyone adds a seventh card: CLAUDE.md's content rules
 * still name "tell people when NOT to hire you" as the biggest voice tell,
 * and this band is where it used to live.
 */
export function ServiceIncludes({ page, title }: { page: ServicePage; title: string }) {
  return (
    <section aria-labelledby="includes-title" className="section-pad bg-wash">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker">What&rsquo;s included</p>
          <h2 id="includes-title" className="h2 mt-4">
            {title}
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.includes.map((feature) => {
            const Icon = featureIcons[feature.icon];
            return (
              <li key={feature.title} className="card p-6">
                <span
                  className="grid size-11 place-items-center rounded-xl bg-accent-tint"
                  aria-hidden="true"
                >
                  <Icon className="size-5 text-accent-ink" />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-bold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-body">{feature.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
