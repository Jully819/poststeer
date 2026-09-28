"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { selectPage, type ServiceItem } from "@/lib/content";
import { encodePlan, parsePlan } from "@/lib/plan";
import { cn, withBase } from "@/lib/utils";
import { OrderSummary } from "@/components/order-summary";
import { serviceIcons } from "@/components/ui/service-icons";

/** 99 -> "$99.00". Two decimals, as on a checkout page. */
/* Locale pinned to en-US: the export is rendered on the build machine and
   hydrated in the visitor's browser, and a floating locale would make those
   two disagree about where the separators go. */
const money = (value: number) => `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/** "$69.00 – $149.00 / month" for a dropdown, or one price for an Add item. */
function priceLabel(item: ServiceItem) {
  const suffix = item.oneTime ? "" : " / month";
  if (item.mode === "add") return `${money(item.price ?? 0)}${suffix}`;
  const prices = (item.options ?? []).map((option) => option.price);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  return low === high ? `${money(low)}${suffix}` : `${money(low)} – ${money(high)}${suffix}`;
}

const allItems = selectPage.groups.flatMap((group) => group.items);

/**
 * /start — pick services, watch the summary add up.
 *
 * SELECTION IS `itemId -> option index`, with -1 meaning an Add-style item
 * that is simply on. One map drives the cards, the summary and both totals,
 * so no figure on the page can disagree with another.
 *
 * MONTHLY AND ONE-TIME ARE SUMMED SEPARATELY. Adding a one-off build fee into
 * a "/ month" figure would overstate the recurring cost, which is the kind of
 * error a customer finds on their second invoice rather than on the page.
 *
 * The hash written by the pricing builder (#plan=posts:10,video:5) preselects
 * matching services on arrival: a static export has no server to hand state
 * to, and the hash needs no storage.
 */
export function SelectServices() {
  const [chosen, setChosen] = useState<Record<string, number>>({});

  useEffect(() => {
    const preset = parsePlan(window.location.hash);
    if (Object.keys(preset).length > 0) setChosen(preset);
  }, []);

  const priceOf = (item: ServiceItem) => {
    const index = chosen[item.id];
    if (index === undefined) return 0;
    if (item.mode === "add") return item.price ?? 0;
    return item.options?.[index]?.price ?? 0;
  };

  const selectedItems = allItems.filter((item) => chosen[item.id] !== undefined);
  const monthly = selectedItems
    .filter((item) => !item.oneTime)
    .reduce((sum, item) => sum + priceOf(item), 0);
  const oneTime = selectedItems
    .filter((item) => item.oneTime)
    .reduce((sum, item) => sum + priceOf(item), 0);

  const toggleAdd = (item: ServiceItem) =>
    setChosen((current) => {
      const next = { ...current };
      if (next[item.id] === undefined) next[item.id] = -1;
      else delete next[item.id];
      return next;
    });

  const pickOption = (item: ServiceItem, value: string) =>
    setChosen((current) => {
      const next = { ...current };
      if (value === "") delete next[item.id];
      else next[item.id] = Number(value);
      return next;
    });

  return (
    <div className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_20rem] lg:items-start">
      <div>
        <h1 className="font-display text-[1.6rem] font-bold tracking-tight text-ink">
          {selectPage.title}
        </h1>
        <p className="mt-3 max-w-[38rem] text-[0.88rem] leading-relaxed text-body">
          {selectPage.intro}
        </p>

        <ul className="mt-4 flex flex-col gap-1">
          {selectPage.bullets.map((bullet) => (
            <li key={bullet.strong} className="text-[0.85rem] text-body">
              <span aria-hidden="true">- </span>
              <span className="font-semibold text-ink">{bullet.strong}</span> {bullet.rest}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-7">
          {selectPage.groups.map((group) => (
            <section key={group.title} aria-labelledby={`group-${group.title}`}>
              <h2
                id={`group-${group.title}`}
                className="font-display text-[0.92rem] font-semibold text-ink"
              >
                {group.title}
              </h2>

              <div className={cn("mt-2 grid gap-3", group.twoUp && "sm:grid-cols-2")}>
                {group.items.map((item) => {
                  const Icon = serviceIcons[item.icon];
                  const on = chosen[item.id] !== undefined;
                  return (
                    <article
                      key={item.id}
                      className={cn(
                        "rounded-xl border p-4 transition-colors",
                        on ? "border-accent bg-accent-tint" : "border-hairline bg-wash",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="flex items-center gap-2 font-display text-[0.85rem] font-semibold text-ink">
                          <Icon className="size-4 shrink-0" aria-hidden="true" />
                          {item.name}
                        </p>

                        <div className="flex shrink-0 items-center gap-2">
                          <span className="font-display text-[0.82rem] font-semibold text-ink">
                            {on && item.mode === "quantity"
                              ? money(priceOf(item))
                              : priceLabel(item)}
                          </span>
                          {on ? (
                            <span
                              className="grid size-5 place-items-center rounded bg-accent text-ink"
                              aria-hidden="true"
                            >
                              <Check className="size-3.5" />
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <p className="mt-2 text-[0.8rem] leading-relaxed text-body">
                        {item.description}
                      </p>

                      {item.mode === "quantity" ? (
                        <>
                          <label htmlFor={`svc-${item.id}`} className="sr-only">
                            {item.placeholder}
                          </label>
                          <select
                            id={`svc-${item.id}`}
                            value={chosen[item.id] ?? ""}
                            onChange={(event) => pickOption(item, event.target.value)}
                            className="mt-3 w-full rounded-lg border border-hairline bg-paper px-3 py-2 text-[0.82rem] text-ink"
                          >
                            <option value="">{item.placeholder}</option>
                            {item.options?.map((option, index) => (
                              <option key={option.label} value={index}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {!on ? (
                            <p className="mt-3 font-display text-[0.8rem] font-semibold text-ink">
                              {priceLabel(item)}
                            </p>
                          ) : null}
                          {/* Only the chosen quantity, and only when that
                              quantity has a link of its own: see the note on
                              `checkout` in lib/content.ts. Labelled per month
                              so a subscription never reads as a one-off. */}
                          {(() => {
                            const picked = item.options?.[Number(chosen[item.id])];
                            if (!on || !picked?.checkout) return null;
                            return (
                              <a
                                href={picked.checkout}
                                rel="noopener"
                                className="btn btn-ghost mt-3 min-h-[2.2rem] w-full px-3 text-[0.8rem]"
                              >
                                Subscribe for {money(picked.price)}/mo
                              </a>
                            );
                          })()}
                        </>
                      ) : (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleAdd(item)}
                            aria-pressed={on}
                            className={cn(
                              "btn min-h-[2.2rem] px-3 text-[0.8rem]",
                              on ? "btn-ghost" : "btn-accent",
                            )}
                          >
                            {on ? "Remove service" : "+ Add Service"}
                          </button>
                          {/* Only fixed one-off services carry a link: see the
                              note on `checkout` in lib/content.ts. Priced in
                              the label so nobody mistakes a single build for a
                              subscription. */}
                          {item.checkout ? (
                            <a
                              href={item.checkout}
                              rel="noopener"
                              className="btn btn-ghost min-h-[2.2rem] px-3 text-[0.8rem]"
                            >
                              Buy once for {money(item.price ?? 0)}
                            </a>
                          ) : null}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Carries the order into the brief step. Disabled with nothing
            selected: a Next that leads to an empty summary is a dead end
            dressed up as progress. */}
        <a
          href={withBase(`/start/brief#plan=${encodePlan(chosen)}`)}
          aria-disabled={selectedItems.length === 0}
          onClick={(event) => {
            if (selectedItems.length === 0) event.preventDefault();
          }}
          className={cn(
            "btn btn-accent mt-8 min-h-[2.9rem] w-full text-[0.95rem]",
            selectedItems.length === 0 && "pointer-events-none opacity-40",
          )}
        >
          {selectPage.summary.next}
        </a>
        <p className="mt-3 text-center text-[0.72rem] text-muted">
          {selectPage.summary.poweredBy}
        </p>
      </div>

      <OrderSummary plan={chosen} />
    </div>
  );
}
