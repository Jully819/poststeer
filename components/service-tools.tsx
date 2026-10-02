import type { ServicePage } from "@/lib/content";

/**
 * The software we work inside, for the one service where the buyer already
 * owns the account.
 *
 * NAMES, NOT LOGOS. Rendering a dozen other companies' marks means hosting a
 * dozen other companies' trademarks and keeping them current. The names in a
 * monospaced row say the same thing and cannot go stale when somebody
 * rebrands.
 *
 * The closing line is load-bearing: "ask" is an honest answer, and a list
 * presented as exhaustive would be a claim nobody checked.
 */
export function ServiceTools({ tools }: { tools: NonNullable<ServicePage["tools"]> }) {
  return (
    <section aria-labelledby="tools-title" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker">Your stack</p>
          <h2 id="tools-title" className="h2 mt-4">
            {tools.title}
          </h2>
          <p className="lead mt-4">{tools.intro}</p>
        </div>

        <ul className="mx-auto mt-10 flex max-w-[52rem] flex-wrap justify-center gap-2.5">
          {tools.names.map((name) => (
            <li
              key={name}
              className="rounded-full border border-hairline bg-paper px-4 py-2 font-mono text-[0.8rem] text-ink"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
