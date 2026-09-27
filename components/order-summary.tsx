"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { BadgeCheck } from "lucide-react";
import { brand, selectPage } from "@/lib/content";
import { money, planTotals, priceOf, type Plan } from "@/lib/plan";
import { serviceIcons } from "@/components/ui/service-icons";

/**
 * The order panel, shared by both steps of the flow.
 *
 * ONE COMPONENT, so the figures on the brief page cannot drift from the ones
 * the customer agreed to on the services page. It reads the same totals
 * helper as everything else, and monthly is never added to one-time.
 */
export function OrderSummary({
  plan,
  showPromo = true,
  showQuote = true,
}: {
  plan: Plan;
  showPromo?: boolean;
  showQuote?: boolean;
}) {
  const [promo, setPromo] = useState("");
  const { items, monthly, oneTime } = planTotals(plan);
  const summary = selectPage.summary;

  return (
    <aside className="rounded-xl bg-wash p-5 lg:sticky lg:top-24">
      <h2 className="font-display text-[1rem] font-bold text-ink">{summary.title}</h2>

      <ul className="mt-4 flex flex-col gap-3">
        {items.length === 0 ? (
          <li className="text-[0.8rem] text-muted">{summary.empty}</li>
        ) : (
          items.map((item) => {
            const Icon = serviceIcons[item.icon];
            const index = plan[item.id];
            const option = item.mode === "quantity" ? item.options?.[index] : undefined;
            return (
              <li key={item.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-ink">
                    <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                    {item.name}
                  </p>
                  <span className="text-[0.8rem] font-semibold text-ink tabular-nums">
                    {money(priceOf(item, plan))}
                  </span>
                </div>
                <p className="mt-0.5 pl-5 text-[0.72rem] text-muted">
                  {option ? option.label : item.oneTime ? "One-time fee" : "Monthly"}
                </p>
              </li>
            );
          })
        )}
      </ul>

      {showPromo ? (
        <div className="mt-5">
          <label htmlFor="promo" className="sr-only">
            {summary.promoPlaceholder}
          </label>
          <input
            id="promo"
            value={promo}
            onChange={(event) => setPromo(event.target.value)}
            placeholder={summary.promoPlaceholder}
            aria-describedby="promo-note"
            className="w-full rounded-lg border border-hairline bg-paper px-3 py-2 text-[0.8rem] text-ink"
          />
          <p id="promo-note" className="mt-1.5 text-[0.68rem] leading-snug text-muted">
            {summary.promoNote}
          </p>
        </div>
      ) : null}

      <div className="mt-5 border-t border-hairline pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[0.85rem] font-semibold text-ink">{summary.totalLabel}</p>
          <p className="font-display text-[1.15rem] font-bold text-ink tabular-nums">
            {money(monthly)}
          </p>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[0.72rem] text-muted">{summary.currency}</p>
          <p className="text-[0.72rem] text-muted tabular-nums">
            {money(monthly)} {summary.monthlySuffix}
          </p>
        </div>

        {oneTime > 0 ? (
          <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-dashed border-hairline pt-3">
            <p className="text-[0.8rem] text-ink">{summary.oneTimeLabel}</p>
            <p className="text-[0.8rem] font-semibold text-ink tabular-nums">{money(oneTime)}</p>
          </div>
        ) : null}
      </div>

      {showQuote ? (
        <figure className="mt-8 border-t border-hairline pt-6">
          <blockquote className="text-[0.82rem] leading-relaxed text-ink">
            {selectPage.quote.text}
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full bg-hairline text-[0.6rem] font-semibold text-muted"
              aria-hidden="true"
            >
              IMG
            </span>
            <span>
              <span className="block text-[0.8rem] font-semibold text-ink">
                {selectPage.quote.name}
              </span>
              <span className="flex items-center gap-1 text-[0.72rem] text-muted">
                <BadgeCheck className="size-3.5 text-accent-ink" aria-hidden="true" />
                {selectPage.quote.badge}
              </span>
            </span>
          </figcaption>
        </figure>
      ) : null}

      <p className="mt-6 text-[0.68rem] text-muted">{brand.name}</p>
    </aside>
  );
}
