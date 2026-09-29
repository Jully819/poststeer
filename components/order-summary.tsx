"use client";

import { brand, selectPage } from "@/lib/content";
import { money, planTotals, priceOf, type Plan } from "@/lib/plan";
import { serviceIcons } from "@/components/ui/service-icons";

/**
 * The order panel, shared by both steps of the flow.
 *
 * ONE COMPONENT, so the figures on the brief page cannot drift from the ones
 * the customer agreed to on the services page. It reads the same totals
 * helper as everything else, and monthly is never added to one-time.
 *
 * IT CARRIES THE ORDER AND NOTHING ELSE. It used to hold a promo field that
 * did nothing and announced itself as a placeholder, and a bracketed client
 * quote with no client behind it. Both were visible on /start.
 */
export function OrderSummary({ plan }: { plan: Plan }) {
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

      <p className="mt-6 text-[0.68rem] text-muted">{brand.name}</p>
    </aside>
  );
}
