"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { glossaryPage, glossaryTerms, type GlossaryTerm } from "@/lib/glossary";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Groups terms under their initial, dropping letters nothing starts with. */
function groupByLetter(terms: GlossaryTerm[]) {
  const map = new Map<string, GlossaryTerm[]>();
  for (const entry of terms) {
    const letter = entry.term[0].toUpperCase();
    const bucket = map.get(letter);
    if (bucket) bucket.push(entry);
    else map.set(letter, [entry]);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}

/**
 * The glossary: search, A–Z index, then one section per letter.
 *
 * THE SECTIONS AND THE INDEX ARE BOTH DERIVED from the filtered list, so a
 * search cannot leave the index pointing at a letter with nothing under it,
 * and adding a term to lib/glossary.ts needs no change here.
 *
 * Cards expand with <details>, not state. The browser gives keyboard support,
 * find-in-page that opens the matching card, and correct semantics for free —
 * all of which a div with an onClick would have to reimplement badly.
 */
export function GlossaryIndex() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossaryTerms;
    return glossaryTerms.filter(
      (entry) =>
        entry.term.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q),
    );
  }, [query]);

  const groups = useMemo(() => groupByLetter(filtered), [filtered]);
  const present = useMemo(() => new Set(groups.map(([letter]) => letter)), [groups]);

  const { count } = glossaryPage;
  const filtering = query.trim().length > 0;
  const noun = filtered.length === 1 ? count.one : count.many;

  return (
    <>
      <div className="mx-auto mt-9 max-w-[34rem]">
        <label htmlFor="glossary-search" className="sr-only">
          {glossaryPage.search.label}
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={glossaryPage.search.placeholder}
            autoComplete="off"
            className="h-12 w-full rounded-full border border-hairline bg-paper pr-11 pl-11 text-[0.9rem] text-ink transition-colors outline-none placeholder:text-muted focus-visible:border-ink"
          />
          {filtering ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={glossaryPage.search.clear}
              className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* A–Z index. Letters with nothing under them are rendered as plain text
          rather than dead links, so every link on the row goes somewhere. */}
      <nav
        aria-label={glossaryPage.jumpLabel}
        className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-2 border-y border-hairline py-4"
      >
        {ALPHABET.map((letter) =>
          present.has(letter) ? (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="grid size-7 place-items-center rounded-md font-mono text-[0.78rem] text-ink transition-colors hover:bg-accent-tint"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              aria-hidden="true"
              className="grid size-7 place-items-center font-mono text-[0.78rem] text-muted/40"
            >
              {letter}
            </span>
          ),
        )}
      </nav>

      <p className="mt-6 font-mono text-[0.72rem] text-muted" aria-live="polite">
        {filtered.length} {filtering ? `${noun} ${count.filtered} “${query.trim()}”` : noun}
      </p>

      {groups.length > 0 ? (
        <div className="mt-6 flex flex-col gap-12">
          {groups.map(([letter, entries]) => (
            <section key={letter} id={`letter-${letter}`} aria-labelledby={`heading-${letter}`}>
              <h2
                id={`heading-${letter}`}
                className="font-display text-[1.6rem] font-bold text-ink"
              >
                {letter}
              </h2>

              <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <li key={entry.term}>
                    <details className="group h-full rounded-xl border border-hairline bg-paper p-4 transition-colors open:border-ink hover:border-ink">
                      {/* The definition sits INSIDE the summary, so a collapsed
                          card still answers the question. Only the "why it
                          matters" line is behind the disclosure. */}
                      <summary className="flex cursor-pointer list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[0.95rem] leading-snug font-bold text-ink">
                            {entry.term}
                          </span>
                          <span className="mt-1 block font-mono text-[0.68rem] tracking-wide text-muted uppercase">
                            {entry.category}
                          </span>
                          <span className="mt-2.5 block text-[0.85rem] leading-relaxed text-body">
                            {entry.definition}
                          </span>
                        </span>
                        <ChevronDown
                          className="mt-0.5 size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>

                      <p className="mt-3 border-t border-hairline-soft pt-3 text-[0.82rem] leading-relaxed text-muted">
                        {entry.detail}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-hairline bg-wash px-6 py-12 text-center">
          <p className="font-display text-[1rem] font-bold text-ink">{glossaryPage.empty.title}</p>
          <p className="mx-auto mt-2 max-w-[38ch] text-[0.9rem] leading-relaxed text-body">
            {glossaryPage.empty.body}
          </p>
          <a href="/demo" className="btn btn-accent mt-6">
            {glossaryPage.empty.cta}
          </a>
        </div>
      )}
    </>
  );
}
