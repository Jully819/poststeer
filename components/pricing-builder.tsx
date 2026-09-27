"use client";

import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  ArrowRight,
  Check,
  Image as ImageIcon,
  Info,
  Link2,
  Mail,
  LayoutTemplate,
  MonitorCog,
  MonitorPlay,
  Plus,
  Search,
  Megaphone,
  Minus,
  Globe,
  ThumbsUp,
  Zap,
} from "lucide-react";
import { brand, pricing, work, type AddOn, type PricingService } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/ui/placeholder";
import { ServiceInfoDialog } from "@/components/service-info-dialog";

/* The preview thumbnails are `work.items` keys, same as the hero collage. */
const workByKey = new Map(work.items.map((item) => [item.src, item]));

const icons: Record<PricingService["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  posts: ImageIcon,
  video: MonitorPlay,
  growth: ThumbsUp,
  seo: MonitorCog,
  email: Mail,
  landing: LayoutTemplate,
  website: Globe,
};

const addOnIcons: Record<AddOn["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  video: MonitorPlay,
  rush: Zap,
  website: Globe,
  ads: Megaphone,
};

/** $99, $148.50 -> "$149". Whole dollars, like the reference. */
const money = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

const addOnQtyOf = (item: AddOn, quantities: Record<string, number>) =>
  quantities[item.id] ?? item.defaultQty ?? 1;

/** "1 video", not "1 videos". Same rule as the services above. */
const addOnUnitLabel = (item: AddOn, qty: number) =>
  qty === 1 ? (item.unit ?? "").replace(/s$/, "") : (item.unit ?? "");

/**
 * "1 page", not "1 pages".
 *
 * Units are stored plural because that is how they read in nearly every
 * position; a quantity of one is the exception, and a stepper that can reach
 * one will reach it often.
 */
const unitLabel = (service: PricingService, qty: number) =>
  qty === 1 ? service.unit.replace(/s$/, "") : service.unit;

/** "/mo" for a subscription, " once" for a one-off build fee. */
const rate = (service: PricingService) => (service.oneTime ? " once" : "/mo");

function IconTile({ service, large = false }: { service: PricingService; large?: boolean }) {
  const Icon = icons[service.icon];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl bg-wash",
        large ? "size-14" : "size-10",
      )}
      aria-hidden="true"
    >
      <Icon className={cn("text-ink", large ? "size-6" : "size-5")} />
    </span>
  );
}

/**
 * The plan builder.
 *
 * SELECTED SERVICES EXPAND, the rest stay as compact rows — the same idea as
 * the reference, where the chosen item carries its description, previews and
 * a quantity stepper while everything else is one line with an add button.
 *
 * EVERY PRICE IS DERIVED from `perUnit * quantity`. The row price, the
 * estimate line and the subtotal all read the same function, so no figure on
 * screen can contradict another.
 */
export function PricingBuilder() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    [pricing.services[0].id]: pricing.services[0].defaultQty,
  });
  const [copied, setCopied] = useState(false);
  /* The service whose "i" pop-up is open, if any. */
  const [infoId, setInfoId] = useState<string | null>(null);
  const [addOnsOpen, setAddOnsOpen] = useState(false);
  /* Add-ons that are on, as id -> quantity. Fixed and percent rows sit at 1;
     only the per-unit rows ever move off it. */
  const [addOnQty, setAddOnQty] = useState<Record<string, number>>({});

  const selectedIds = Object.keys(quantities);
  const priceOf = (service: PricingService) =>
    service.perUnit * (quantities[service.id] ?? service.defaultQty);

  const allAddOns = useMemo(
    () => pricing.moreAddOns.groups.flatMap((group) => group.items),
    [],
  );
  const chosenAddOns = allAddOns.filter((item) => addOnQty[item.id] !== undefined);

  /* MONTHLY AND ONE-TIME NEVER SHARE A TOTAL. Folding a one-off build fee
     into a "/month" figure overstates the recurring cost, and it is the kind
     of error a customer finds on their second invoice rather than here. */
  /* A percent add-on is a share of what the plan already costs, so it is worked
     out last, off the monthly figure every other line has already built. */
  const addOnAmount = (item: AddOn, monthlyBase: number) => {
    if (item.mode === "percent") return (monthlyBase * (item.percent ?? 0)) / 100;
    if (item.mode === "quantity") return (item.amount ?? 0) * addOnQtyOf(item, addOnQty);
    return item.amount ?? 0;
  };

  const { subtotal, oneTimeTotal, monthlyBase } = useMemo(() => {
    const chosenServices = pricing.services.filter((service) =>
      selectedIds.includes(service.id),
    );
    const on = allAddOns.filter((item) => addOnQty[item.id] !== undefined);

    const monthlyServices = chosenServices
      .filter((service) => !service.oneTime)
      .reduce((sum, service) => sum + priceOf(service), 0);
    /* Everything charged monthly that is not a percentage. Rush is measured
       against this, so it cannot compound on itself. */
    const base =
      monthlyServices +
      on
        .filter((item) => !item.oneTime && item.mode !== "percent")
        .reduce((sum, item) => sum + addOnAmount(item, 0), 0);

    return {
      monthlyBase: base,
      subtotal:
        base +
        on
          .filter((item) => item.mode === "percent")
          .reduce((sum, item) => sum + addOnAmount(item, base), 0),
      oneTimeTotal:
        chosenServices
          .filter((service) => service.oneTime)
          .reduce((sum, service) => sum + priceOf(service), 0) +
        on.filter((item) => item.oneTime).reduce((sum, item) => sum + addOnAmount(item, 0), 0),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantities, addOnQty]);

  const add = (service: PricingService) =>
    setQuantities((current) => ({ ...current, [service.id]: service.defaultQty }));

  const remove = (service: PricingService) =>
    setQuantities((current) => {
      const next = { ...current };
      delete next[service.id];
      return next;
    });

  const addAddOn = (item: AddOn) =>
    setAddOnQty((current) => ({ ...current, [item.id]: item.defaultQty ?? 1 }));

  const removeAddOn = (item: AddOn) =>
    setAddOnQty((current) => {
      const next = { ...current };
      delete next[item.id];
      return next;
    });

  const setAddOnStep = (item: AddOn, delta: number) =>
    setAddOnQty((current) => {
      const now = current[item.id] ?? item.defaultQty ?? 1;
      const next = Math.max(item.minQty ?? 1, now + delta * (item.step ?? 1));
      return { ...current, [item.id]: next };
    });

  const setQty = (service: PricingService, delta: number) =>
    setQuantities((current) => {
      const now = current[service.id] ?? service.defaultQty;
      const next = Math.max(service.minQty, now + delta * service.step);
      return { ...current, [service.id]: next };
    });

  /**
   * The build encoded in the URL hash, so a copied link restores this exact
   * plan. Static export has no server to store a build against, and a hash
   * needs no storage at all.
   *
   * Add-ons ride along in the same format. /start does not sell them yet and
   * drops ids it does not know, so carrying them costs nothing today and means
   * the link is already right when it does.
   */
  const planHash = () =>
    [
      ...selectedIds.map((id) => `${id}:${quantities[id]}`),
      ...chosenAddOns.map((item) => `${item.id}:${addOnQtyOf(item, addOnQty)}`),
    ].join(",");

  /** Copies the plan link, falling back to the address bar when the clipboard
      is blocked. */
  const shareLink = async () => {
    const build = planHash();
    const url = `${window.location.origin}/start#plan=${build}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.hash = `plan=${build}`;
    }
  };

  /* ONLY THE FEATURED SERVICE EXPANDS. Adding one of the other services used
     to promote its row into a full card, which pushed the list around under
     the cursor that had just clicked it. Those rows now select in place: the
     plus becomes a tick and the price appears beside the stepper. */
  const featured = pricing.services[0];
  const featuredOpen = selectedIds.includes(featured.id);
  const chosen = featuredOpen ? [featured] : [];
  const rest = pricing.services.filter((service) => !featuredOpen || service.id !== featured.id);
  const infoService = pricing.services.find((service) => service.id === infoId) ?? null;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-pad bg-sage text-[0.9rem]">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          {/* Sizes here step down from the shared .kicker/.h2/.lead so this
              section reads a little smaller than the rest of the page. */}
          <p className="kicker text-[0.648rem]">{pricing.kicker}</p>
          <h2
            id="pricing-title"
            className="h2 mt-4 text-[clamp(1.71rem,3.06vw,2.475rem)]"
          >
            {pricing.title}
          </h2>
          <p className="lead mt-4 text-[0.918rem]">{pricing.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <div className="flex flex-col gap-4">
            {chosen.map((service) => {
              const qty = quantities[service.id] ?? service.defaultQty;
              return (
                <article key={service.id} className="relative rounded-2xl border-2 border-ink bg-paper p-6">
                  {service.popular ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-ink px-3 py-1 font-display text-[0.585rem] font-bold tracking-[0.12em] text-white uppercase">
                      Most popular
                    </span>
                  ) : null}

                  <div className="flex flex-col gap-6 sm:flex-row">
                    <IconTile service={service} large />

                    <div className="flex-1">
                      <h3 className="font-display text-[1.125rem] font-bold text-ink">
                        {service.name}
                      </h3>
                      <p className="mt-1 font-display text-[0.828rem] font-semibold text-ink">
                        from {money(service.perUnit * service.defaultQty)}
                        {rate(service)} · {service.defaultQty}{" "}
                        {unitLabel(service, service.defaultQty)}
                      </p>
                      {service.description ? (
                        <p className="body-text mt-3 max-w-[32rem] text-[0.855rem]">
                          {service.description}
                        </p>
                      ) : null}
                    </div>

                    {/* Preview tiles: real work where the library has it for
                        this service, labelled placeholders everywhere else. */}
                    <div className="flex gap-2">
                      {service.previews
                        ? service.previews.map((key) => {
                            const sample = workByKey.get(key);
                            if (!sample) return null;
                            return (
                              <img
                                key={key}
                                src={`/work/${sample.src}.webp`}
                                alt={sample.alt}
                                width={work.tileWidth}
                                height={work.tileHeight}
                                loading="lazy"
                                decoding="async"
                                className="ph aspect-[9/16] w-20 shrink-0 object-cover sm:w-24"
                              />
                            );
                          })
                        : [1, 2, 3].map((i) => (
                            <Placeholder
                              key={i}
                              label={`Sample ${i}`}
                              ratio="aspect-[4/5]"
                              className="w-20 shrink-0 sm:w-24"
                            />
                          ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {service.fixed ? null : (
                      <div className="flex items-center gap-1 rounded-full border border-hairline p-1">
                        <button
                          type="button"
                          onClick={() => setQty(service, -1)}
                          disabled={qty <= service.minQty}
                          aria-label={`Fewer ${service.unit}`}
                          className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-wash disabled:opacity-35"
                        >
                          <Minus className="size-4" aria-hidden="true" />
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-[5.5rem] text-center font-display text-[0.855rem] font-semibold text-ink"
                        >
                          {qty} {unitLabel(service, qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(service, 1)}
                          aria-label={`More ${service.unit}`}
                          className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-wash"
                        >
                          <Plus className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}

                    <p className="flex items-center gap-2 font-display text-[0.945rem] font-bold text-ink">
                      <Check className="size-4 text-ink" aria-hidden="true" />
                      {money(priceOf(service))}
                      {rate(service)}
                    </p>

                    <button
                      type="button"
                      onClick={() => remove(service)}
                      className="text-[0.828rem] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}

            <ul className="grid gap-3 sm:grid-cols-2">
              {rest.map((service) => {
                const isOn = selectedIds.includes(service.id);
                return (
                  <li key={service.id}>
                    {/* Ticking a row changes nothing about its size or its
                        text — only the fill, the border and the button. The
                        border grows by 1px and the padding gives 1px back, so
                        the box does not shift in the grid. */}
                    <div
                      className={cn(
                        "flex h-full items-center gap-3 rounded-2xl transition-colors",
                        isOn
                          ? "border-2 border-ink bg-paper p-[0.9375rem]"
                          : "border border-transparent bg-wash p-4",
                      )}
                    >
                      <IconTile service={service} />

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-[0.9rem] font-semibold text-ink">
                          {service.name}
                        </p>

                        <p className="text-[0.765rem] text-muted">
                          {service.fixed
                            ? `${money(service.perUnit)}${rate(service)}`
                            : `from ${money(service.perUnit * service.defaultQty)}${rate(service)} · ${service.defaultQty} ${unitLabel(service, service.defaultQty)}`}
                        </p>
                      </div>

                      <span className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setInfoId(service.id)}
                          aria-label={`About ${service.name}`}
                          aria-haspopup="dialog"
                          className="grid size-8 place-items-center rounded-full bg-accent-tint text-accent-ink transition-colors hover:bg-accent hover:text-white"
                        >
                          <Info className="size-4" aria-hidden="true" />
                        </button>
                        {/* One control, two states — the plus fills in and
                            becomes the tick that takes the service back off. */}
                        <button
                          type="button"
                          onClick={() => (isOn ? remove(service) : add(service))}
                          aria-pressed={isOn}
                          aria-label={`${isOn ? "Remove" : "Add"} ${service.name}`}
                          className={cn(
                            "grid size-9 place-items-center rounded-xl transition-colors",
                            isOn
                              ? "bg-ink text-white hover:bg-black"
                              : "border border-hairline bg-paper text-ink hover:border-ink",
                          )}
                        >
                          {isOn ? (
                            <Check className="size-4" aria-hidden="true" />
                          ) : (
                            <Plus className="size-4" aria-hidden="true" />
                          )}
                        </button>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="rounded-2xl bg-wash">
              <div className="flex flex-wrap items-center gap-4 p-5">
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-hairline bg-paper text-ink"
                  aria-hidden="true"
                >
                  <Plus
                    className={cn(
                      "size-4 transition-transform duration-300",
                      addOnsOpen && "rotate-45",
                    )}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[0.9rem] font-semibold text-ink">
                    {pricing.moreAddOns.title}
                  </p>
                  <p className="text-[0.765rem] text-muted">{pricing.moreAddOns.meta}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddOnsOpen((open) => !open)}
                  aria-expanded={addOnsOpen}
                  aria-controls="more-add-ons"
                  className="cursor-pointer font-display text-[0.81rem] font-semibold text-accent-ink underline-offset-4 hover:underline"
                >
                  {addOnsOpen ? pricing.moreAddOns.actionOpen : pricing.moreAddOns.action}
                </button>
              </div>

              {/* Grid-rows 0fr -> 1fr animates the height without measuring it. */}
              <div
                id="more-add-ons"
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  addOnsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden" inert={!addOnsOpen}>
                  <div className="border-t border-hairline px-5 pt-5 pb-6">
                    {/* Each group spans the panel, and its rows sit two across
                        like the service rows above. */}
                    <div className="flex flex-col gap-6">
                      {pricing.moreAddOns.groups.map((group) => (
                        <section key={group.title} aria-label={group.title}>
                          <h3 className="font-display text-[0.675rem] font-semibold tracking-[0.12em] text-ink uppercase">
                            {group.title}
                          </h3>
                          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                            {group.items.map((item) => {
                              const Icon = addOnIcons[item.icon];
                              const added = addOnQty[item.id] !== undefined;
                              const qty = addOnQtyOf(item, addOnQty);
                              const stepper = added && item.mode === "quantity";
                              return (
                                <li key={item.id}>
                                  <div
                                    className={cn(
                                      "flex h-full items-center gap-3 rounded-2xl transition-colors",
                                      added
                                        ? "border-2 border-ink bg-paper p-[0.9375rem]"
                                        : "border border-transparent bg-paper/60 p-4",
                                    )}
                                  >
                                    <span
                                      className="grid size-10 shrink-0 place-items-center rounded-xl bg-wash"
                                      aria-hidden="true"
                                    >
                                      <Icon className="size-5 text-ink" />
                                    </span>

                                    <div className="min-w-0 flex-1">
                                      <p className="font-display text-[0.828rem] font-semibold text-ink">
                                        {item.name}
                                      </p>
                                      {/* Once it is on, the row shows what it
                                          actually costs; before that, the price
                                          as it is quoted. A per-unit add-on
                                          gets its stepper here, next to the
                                          price, rather than out in the button
                                          cluster on the right. */}
                                      {stepper ? (
                                        <div className="mt-0.5 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
                                          <span className="flex items-center gap-1">
                                            <button
                                              type="button"
                                              onClick={() => setAddOnStep(item, -1)}
                                              aria-label={`Fewer ${item.unit}`}
                                              className="grid size-6 cursor-pointer place-items-center rounded-md bg-wash text-ink transition-colors hover:bg-hairline-soft"
                                            >
                                              <Minus className="size-3.5" aria-hidden="true" />
                                            </button>
                                            <span
                                              aria-live="polite"
                                              className="min-w-[3.75rem] text-center font-display text-[0.765rem] font-semibold text-ink"
                                            >
                                              {qty} {addOnUnitLabel(item, qty)}
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => setAddOnStep(item, 1)}
                                              aria-label={`More ${item.unit}`}
                                              className="grid size-6 cursor-pointer place-items-center rounded-md bg-wash text-ink transition-colors hover:bg-hairline-soft"
                                            >
                                              <Plus className="size-3.5" aria-hidden="true" />
                                            </button>
                                          </span>
                                          <span className="text-[0.765rem] text-muted">
                                            {money(addOnAmount(item, monthlyBase))}
                                          </span>
                                        </div>
                                      ) : (
                                        /* Matches the stepper's height, so
                                           ticking a row does not grow it. */
                                        <p className="mt-0.5 flex min-h-6 items-center text-[0.765rem] text-muted">
                                          {added && item.mode === "percent"
                                            ? `${item.price} · ${money(addOnAmount(item, monthlyBase))}/mo`
                                            : item.price}
                                        </p>
                                      )}
                                      {item.note ? (
                                        <p className="text-[0.7rem] text-muted">{item.note}</p>
                                      ) : null}
                                    </div>

                                    <span className="flex shrink-0 items-center gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => (added ? removeAddOn(item) : addAddOn(item))}
                                        aria-pressed={added}
                                        aria-label={`${added ? "Remove" : "Add"} ${item.name}`}
                                        className={cn(
                                          "grid size-9 cursor-pointer place-items-center rounded-xl transition-colors",
                                          added
                                            ? "bg-ink text-white hover:bg-black"
                                            : "border border-hairline bg-paper text-ink hover:border-ink",
                                        )}
                                      >
                                        {added ? (
                                          <Check className="size-4" aria-hidden="true" />
                                        ) : (
                                          <Plus className="size-4" aria-hidden="true" />
                                        )}
                                      </button>
                                    </span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The estimate. Mono throughout, like a printed quote. */}
          <aside className="ticket-edge rounded-2xl bg-wash p-7 pb-10 lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-[1.035rem] font-bold text-ink">{brand.name}</p>
              <p className="font-mono text-[0.63rem] tracking-[0.12em] text-muted uppercase">
                {pricing.estimate.label}
              </p>
            </div>
            <p className="mt-1 font-mono text-[0.72rem] text-muted">{pricing.estimate.subline}</p>

            <div className="my-5 border-t border-dashed border-hairline" />

            <ul className="flex flex-col gap-3">
              {chosen.length === 0 && chosenAddOns.length === 0 ? (
                <li className="font-mono text-[0.765rem] text-muted">
                  Nothing added yet. Pick a service on the left.
                </li>
              ) : (
                chosen.map((service) => {
                  const Icon = icons[service.icon];
                  const qty = quantities[service.id] ?? service.defaultQty;
                  return (
                    <li key={service.id} className="flex items-baseline gap-2">
                      <Icon className="size-4 shrink-0 self-center text-ink" aria-hidden="true" />
                      <span className="font-mono text-[0.81rem] font-bold text-ink">
                        {service.name}
                      </span>
                      {service.fixed ? null : (
                        <span className="font-mono text-[0.765rem] text-muted">
                          · {qty} {unitLabel(service, qty)}
                        </span>
                      )}
                      {service.oneTime ? (
                        <span className="font-mono text-[0.765rem] text-muted">· one-time</span>
                      ) : null}
                      <span className="leader" aria-hidden="true" />
                      <span className="font-mono text-[0.855rem] font-bold text-ink tabular-nums">
                        {money(priceOf(service))}
                      </span>
                    </li>
                  );
                })
              )}

              {/* Add-ons sit under the services, in the order the panel lists
                  them, so the ticket reads the same way the panel does. */}
              {chosenAddOns.map((item) => {
                const Icon = addOnIcons[item.icon];
                const qty = addOnQtyOf(item, addOnQty);
                return (
                  <li key={item.id} className="flex items-baseline gap-2">
                    <Icon className="size-4 shrink-0 self-center text-ink" aria-hidden="true" />
                    <span className="font-mono text-[0.81rem] font-bold text-ink">{item.name}</span>
                    {item.mode === "quantity" ? (
                      <span className="font-mono text-[0.765rem] text-muted">
                        · {qty} {addOnUnitLabel(item, qty)}
                      </span>
                    ) : null}
                    {item.mode === "percent" ? (
                      <span className="font-mono text-[0.765rem] text-muted">· {item.price}</span>
                    ) : null}
                    {item.oneTime ? (
                      <span className="font-mono text-[0.765rem] text-muted">· one-time</span>
                    ) : null}
                    <span className="leader" aria-hidden="true" />
                    <span className="font-mono text-[0.855rem] font-bold text-ink tabular-nums">
                      {money(addOnAmount(item, monthlyBase))}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-xl border border-dashed border-hairline bg-paper/60 p-4">
              <p className="font-mono text-[0.72rem] leading-relaxed text-ink">
                {pricing.estimate.includesIntro}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {pricing.estimate.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-accent-ink"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[0.72rem] leading-relaxed text-ink">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-5 border-t border-dashed border-hairline" />

            <div className="flex items-end justify-between gap-4">
              <p className="font-mono text-[0.648rem] tracking-[0.12em] text-muted uppercase">
                {pricing.estimate.subtotalLabel}
              </p>
              <p className="flex items-baseline gap-1.5">
                <span className="font-mono text-[0.72rem] text-muted">from</span>
                <span className="font-display text-[2.34rem] leading-none font-bold text-ink tabular-nums">
                  {money(subtotal)}
                </span>
              </p>
            </div>

            {/* Carries the build to /start in the hash, so the next page opens
                with these services already selected. */}
            {oneTimeTotal > 0 ? (
              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-dashed border-hairline pt-3">
                <p className="font-mono text-[0.648rem] tracking-[0.12em] text-muted uppercase">
                  One-time
                </p>
                <p className="font-display text-[0.945rem] font-bold text-ink tabular-nums">
                  {money(oneTimeTotal)}
                </p>
              </div>
            ) : null}

            <a
              href={`/start#plan=${planHash()}`}
              className="btn btn-accent mt-6 min-h-[3.2rem] w-full text-[0.9rem]"
            >
              {pricing.estimate.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={shareLink}
              className="mt-5 flex w-full items-center justify-center gap-2 font-mono text-[0.765rem] font-medium text-accent-ink"
            >
              <Link2 className="size-4" aria-hidden="true" />
              {copied ? "Link copied" : pricing.estimate.shareLink}
            </button>
            <p className="mt-1.5 text-center font-mono text-[0.702rem] text-muted">
              {pricing.estimate.shareNote}
            </p>

            <p className="mt-6 text-center text-[0.675rem] leading-relaxed text-muted">
              {pricing.estimate.finePrint}{" "}
              <a href="/legal/terms" className="underline underline-offset-2">
                {pricing.estimate.terms}
              </a>{" "}
              and{" "}
              <a href="/legal/refund-policy" className="underline underline-offset-2">
                {pricing.estimate.refunds}
              </a>
              .
            </p>
          </aside>
        </div>
      </div>

      <ServiceInfoDialog
        service={infoService}
        icon={infoService ? icons[infoService.icon] : null}
        priceLine={
          infoService
            ? {
                price: money(infoService.perUnit * infoService.defaultQty),
                rest: `${rate(infoService)}${
                  infoService.fixed
                    ? ""
                    : ` · ${infoService.defaultQty} ${unitLabel(infoService, infoService.defaultQty)}`
                }`,
              }
            : { price: "", rest: "" }
        }
        addLabel={
          infoService
            ? `${money(infoService.perUnit * infoService.defaultQty)}${rate(infoService)}`
            : ""
        }
        onAdd={() => {
          if (infoService) add(infoService);
          setInfoId(null);
        }}
        onClose={() => setInfoId(null)}
      />
    </section>
  );
}
