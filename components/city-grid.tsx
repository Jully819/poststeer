"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Globe, X } from "lucide-react";
import { serviceAreas } from "@/lib/content";
import { slugify } from "@/lib/landing";
import { withBase } from "@/lib/utils";

/**
 * The searchable city list.
 *
 * ONE CLIENT COMPONENT, NOT THREE. The field, the count and the grid all read
 * the same filtered array, so the label cannot say twenty while nineteen cards
 * are on screen. Everything above it on the page stays a server component.
 *
 * The filter is a plain substring match on a twenty-item array — no debounce,
 * no index, nothing to tune. If this list ever reaches the [200]+ cities the
 * kicker claims, that is the point to reach for something cleverer.
 *
 * Cards link to "#" until the per-city pages exist, like the footer row they
 * came from.
 */
export function CityGrid() {
  const [query, setQuery] = useState("");

  const cities = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return serviceAreas.cities;
    return serviceAreas.cities.filter((city) => city.toLowerCase().includes(q));
  }, [query]);

  const { count } = serviceAreas;
  const filtering = query.trim().length > 0;
  const noun = cities.length === 1 ? count.one : count.many;

  return (
    <>
      <div className="mx-auto mt-9 max-w-[26rem]">
        <label htmlFor="city-search" className="sr-only">
          {serviceAreas.search.label}
        </label>
        <div className="relative">
          <Globe
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="city-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={serviceAreas.search.placeholder}
            autoComplete="off"
            className="h-12 w-full rounded-full border border-hairline bg-paper pr-11 pl-11 text-[0.9rem] text-ink transition-colors outline-none placeholder:text-muted focus-visible:border-ink"
          />
          {filtering ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={serviceAreas.search.clear}
              className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* aria-live so a screen reader hears the list shrink as the query is typed. */}
      <p className="mt-8 font-mono text-[0.72rem] text-muted" aria-live="polite">
        {cities.length} {filtering ? `${noun} ${count.filtered} “${query.trim()}”` : noun}
      </p>

      {cities.length > 0 ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <li key={city}>
              <a
                href={withBase(`/service-areas/${slugify(city)}`)}
                className="group flex items-center gap-3 rounded-xl border border-hairline bg-paper p-4 transition-colors hover:border-ink"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-[0.95rem] font-bold text-ink">
                    {city}
                  </span>
                  <span className="block truncate font-mono text-[0.72rem] text-muted">
                    {serviceAreas.cardMeta}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent-ink"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-hairline bg-wash px-6 py-12 text-center">
          <p className="font-display text-[1rem] font-bold text-ink">
            {serviceAreas.empty.title}
          </p>
          <p className="mx-auto mt-2 max-w-[34ch] text-[0.9rem] leading-relaxed text-body">
            {serviceAreas.empty.body}
          </p>
          <a href={withBase("/demo")} className="btn btn-accent mt-6">
            {serviceAreas.empty.cta}
          </a>
        </div>
      )}
    </>
  );
}
