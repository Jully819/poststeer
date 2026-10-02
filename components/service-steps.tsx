import type { ServicePage } from "@/lib/content";

/**
 * How the work runs, in three beats.
 *
 * This replaces <Deliverables /> on a service page rather than sitting beside
 * it. Deliverables draws mocked-up social posts being scheduled, which is a
 * lie on the Business Website page and a repetition on the other two social
 * ones. Three numbered cards say the same thing in a quarter of the height
 * and tell the truth on all six.
 */
export function ServiceSteps({ title, steps }: { title: string; steps: ServicePage["steps"] }) {
  return (
    <section aria-labelledby="steps-title" className="section-pad bg-sage">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker">How it works</p>
          <h2 id="steps-title" className="h2 mt-4">
            {title}
          </h2>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="card p-6">
              <span
                className="grid size-9 place-items-center rounded-full bg-ink font-display text-[0.85rem] font-semibold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-[1.05rem] font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
