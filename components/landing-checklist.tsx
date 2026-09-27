import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A month of posts a trade could realistically run, as a list of ticks.
 *
 * IT IS A LIST, NOT A PROMISE. The note under the heading says these are
 * options in the builder rather than a bundle included at the headline price,
 * because six named deliverables under a "$69/mo" hero reads as six
 * deliverables for $69 otherwise.
 */
export function LandingChecklist({
  title,
  note,
  items,
  tone = "page",
}: {
  title: string;
  note: string;
  items: string[];
  /** "sage" tints the whole band, to break up a long page. */
  tone?: "page" | "sage";
}) {
  return (
    <section className={cn("section-pad", tone === "sage" && "bg-sage")}>
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2">{title}</h2>
          <p className="body-text mt-4">{note}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="card flex items-start gap-3 px-4 py-3.5">
              <span
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-tint"
                aria-hidden="true"
              >
                <Check className="size-3 text-accent-ink" strokeWidth={3} />
              </span>
              <span className="text-[0.95rem] leading-snug text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
