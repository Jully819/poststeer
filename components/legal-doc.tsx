import { legalDocs, legalNav, legalUi, type LegalDoc } from "@/lib/legal";
import { withBase } from "@/lib/utils";

/**
 * The shared frame for the three legal documents.
 *
 * Two columns on desktop: a sticky document list on the left, the formal text
 * in the middle, and the "in plain terms" note pinned beside the section it
 * belongs to. Under lg the note drops below its own section rather than to
 * the bottom of the page, which is the only arrangement where a summary is
 * still attached to the thing it summarises.
 */
export function LegalDocPage({ slug }: { slug: LegalDoc["slug"] }) {
  const doc = legalDocs[slug];

  return (
    <article className="container-x py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="font-mono text-[0.72rem] text-muted">
        <a href={withBase("/")} className="transition-colors hover:text-ink">
          Home
        </a>
        <span aria-hidden="true" className="px-2 text-hairline">
          /
        </span>
        <span>{legalNav.label}</span>
        <span aria-hidden="true" className="px-2 text-hairline">
          /
        </span>
        <span className="text-ink">{doc.label}</span>
      </nav>

      <header className="mt-6 max-w-[42rem]">
        <h1 className="font-display text-[2.4rem] leading-[1.08] font-bold tracking-tight text-ink md:text-[3rem]">
          {doc.title}
        </h1>
        <p className="mt-3 font-mono text-[0.72rem] tracking-[0.1em] text-muted uppercase">
          {legalUi.updatedLabel} {doc.updated}
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">
            {legalNav.heading}
          </p>
          <ul className="mt-4 flex flex-col gap-1">
            {legalNav.items.map((item) => {
              const active = item.slug === doc.slug;
              return (
                <li key={item.slug}>
                  <a
                    href={withBase(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "block rounded-lg bg-accent-tint px-3 py-2 text-[0.85rem] font-semibold text-accent-ink"
                        : "block rounded-lg px-3 py-2 text-[0.85rem] text-body transition-colors hover:bg-wash hover:text-ink"
                    }
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        <div>
          <p className="max-w-[40rem] text-[1rem] leading-relaxed text-body">{doc.intro}</p>

          <div className="mt-10 flex flex-col gap-10">
            {doc.sections.map((section, i) => (
              <section
                key={section.title}
                aria-labelledby={`s-${i + 1}`}
                className="grid gap-5 border-t border-hairline pt-8 lg:grid-cols-[1fr_15rem] lg:gap-8"
              >
                <div>
                  <h2
                    id={`s-${i + 1}`}
                    className="font-display text-[1.15rem] leading-snug font-bold text-ink"
                  >
                    <span className="text-muted tabular-nums">{i + 1}.</span> {section.title}
                  </h2>
                  <div className="mt-4 flex flex-col gap-3.5">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-[0.9rem] leading-[1.75] text-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <aside className="h-fit rounded-xl border border-hairline bg-accent-tint p-4 lg:sticky lg:top-24">
                  <p className="font-mono text-[0.64rem] tracking-[0.14em] text-accent-ink uppercase">
                    {legalUi.plainLabel}
                  </p>
                  <p className="mt-2.5 text-[0.82rem] leading-relaxed text-body">{section.plain}</p>
                </aside>
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-xl border border-dashed border-hairline bg-wash p-5 text-[0.8rem] leading-relaxed text-muted">
            {legalUi.footnote}{" "}
            <a
              href={withBase(`mailto:${legalUi.contactEmail}`)}
              className="text-accent-ink underline underline-offset-2"
            >
              {legalUi.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
