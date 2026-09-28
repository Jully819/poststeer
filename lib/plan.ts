import { selectPage, type ServiceItem } from "@/lib/content";

/**
 * The selected plan, shared by /start and /start/brief.
 *
 * A PLAN IS `itemId -> option index`, with -1 meaning an Add-style service
 * that is simply on. It travels between pages in the URL hash: a static
 * export has no server to hold a cart, and a hash survives a reload, a
 * bookmark and a pasted link without any storage at all.
 */
export type Plan = Record<string, number>;

export const allServices: ServiceItem[] = selectPage.groups.flatMap((group) => group.items);

export const findService = (id: string) => allServices.find((item) => item.id === id);

export function encodePlan(plan: Plan): string {
  return Object.entries(plan)
    .map(([id, index]) => `${id}:${index}`)
    .join(",");
}

/**
 * Reads a plan out of a hash.
 *
 * TOLERANT BY DESIGN: entries for services that no longer exist are dropped
 * rather than throwing, because these links get pasted into emails and the
 * catalogue will change underneath them. A stale link should open with what
 * still exists, not a broken page.
 *
 * It also accepts the pricing builder's format (`posts:10`, where the number
 * is a quantity rather than an option index), since that is where most links
 * into this flow come from.
 */
export function parsePlan(hash: string): Plan {
  const match = hash.match(/plan=([^&]+)/);
  if (!match) return {};

  const plan: Plan = {};
  for (const part of decodeURIComponent(match[1]).split(",")) {
    const [id, raw] = part.split(":");
    const service = findService(id);
    if (!service) continue;

    if (service.mode === "add") {
      plan[id] = -1;
      continue;
    }

    const value = Number(raw);
    const options = service.options ?? [];
    /* An index only if it lands inside the option list; otherwise treat the
       number as a quantity from the builder and start at the first option. */
    plan[id] = Number.isInteger(value) && value >= 0 && value < options.length ? value : 0;
  }
  return plan;
}

export function priceOf(service: ServiceItem, plan: Plan): number {
  const index = plan[service.id];
  if (index === undefined) return 0;
  if (service.mode === "add") return service.price ?? 0;
  return service.options?.[index]?.price ?? 0;
}

/** Monthly and one-time are never added together. See the note on /start. */
export function planTotals(plan: Plan) {
  const items = allServices.filter((service) => plan[service.id] !== undefined);
  const monthly = items
    .filter((service) => !service.oneTime)
    .reduce((sum, service) => sum + priceOf(service, plan), 0);
  const oneTime = items
    .filter((service) => service.oneTime)
    .reduce((sum, service) => sum + priceOf(service, plan), 0);
  return { items, monthly, oneTime };
}

/* Locale pinned to en-US: the export is rendered on the build machine and
   hydrated in the visitor's browser, and a floating locale would make those
   two disagree about where the separators go. */
export const money = (value: number) => `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
