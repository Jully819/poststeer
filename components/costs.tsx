import { costs } from "@/lib/content";

/**
 * The alternatives, priced.
 *
 * Their column sits last and is the only one on ink, so the comparison reads
 * left to right from most expensive habit to this offer without needing a
 * "winner" tick in every row.
 */
/* Off the home page for now. To bring "The alternatives" back, render
   <Costs /> in app/page.tsx between <Guarantee /> and <ClientFeedback />. */
export function Costs() {
  return (
    <section id="costs" aria-labelledby="costs-title" className="section-pad bg-wash">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker">{costs.kicker}</p>
          <h2 id="costs-title" className="h2 mt-4">
            {costs.title}
          </h2>
          <p className="lead mt-4">{costs.intro}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {costs.columns.map((column) => (
            <li key={column.name} className="card p-6">
              <p className="font-display text-[0.85rem] font-semibold text-muted">{column.name}</p>
              <p className="mt-4 font-display text-[1.6rem] font-bold text-ink tabular-nums">
                {column.price}
              </p>
              <p className="mt-2 text-[0.82rem] leading-snug text-muted">{column.note}</p>
            </li>
          ))}

          <li className="rounded-2xl bg-ink p-6 text-white">
            <p className="font-display text-[0.85rem] font-semibold text-white/70">
              {costs.ours.name}
            </p>
            <p className="mt-4 font-display text-[1.6rem] font-bold tabular-nums">
              {costs.ours.price}
            </p>
            <p className="mt-2 text-[0.82rem] leading-snug text-white/70">{costs.ours.note}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
