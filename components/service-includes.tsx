import type { ServicePage } from "@/lib/content";
import { featureIcons } from "@/components/ui/feature-icons";

/**
 * What the buyer actually receives: six cards, then the paragraph naming who
 * should not buy it.
 *
 * THE "NOT FOR YOU" PARAGRAPH IS PART OF THIS SECTION, not a footnote under
 * it. It sits inside the same band, in the same type size as the cards, and
 * it is the last thing read before the plan builder. A page that lists six
 * good things and no limit is read as a brochure; the limit is what makes
 * the six believable.
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

        <div className="mx-auto mt-10 max-w-[48rem] rounded-2xl border border-hairline bg-paper p-6 sm:p-8">
          <h3 className="font-display text-[1.05rem] font-bold text-ink">
            When not to buy this.
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{page.notFor}</p>
        </div>
      </div>
    </section>
  );
}
