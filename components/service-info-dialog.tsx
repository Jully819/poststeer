"use client";

import { useEffect, useRef, type ComponentType, type SVGProps } from "react";
import { Asterisk, Check, X } from "lucide-react";
import { pricing, type PricingService } from "@/lib/content";

/**
 * The pop-up behind a pricing row's "i" button.
 *
 * A native <dialog> opened with showModal(): the browser supplies the
 * backdrop, Escape to close and focus containment, so none of it is
 * hand-rolled here.
 */
export function ServiceInfoDialog({
  copy = pricing.infoDialog,
  fromLabel = "from ",
  service,
  icon: Icon,
  priceLine,
  addLabel,
  onAdd,
  onClose,
}: {
  copy?: typeof pricing.infoDialog;
  /** The word before the price, with its trailing space where the language has one. */
  fromLabel?: string;
  service: PricingService | null;
  icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  /** "from $129/mo · 5 videos", worked out by the builder so it matches the row. */
  priceLine: { price: string; rest: string };
  /** "$129/mo" or "$399 once". */
  addLabel: string;
  onAdd: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (service && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!service && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [service]);

  const details = service?.details;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      /* A click that lands on the backdrop lands on the dialog element itself. */
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="service-info-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[30rem] overflow-y-auto rounded-3xl border border-hairline bg-page p-0 text-left shadow-[0_24px_60px_-20px_rgb(10_11_16/0.45)] backdrop:bg-ink/45"
    >
      {service ? (
        <div className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            {Icon ? (
              <span
                className="grid size-14 shrink-0 place-items-center rounded-2xl bg-wash"
                aria-hidden="true"
              >
                <Icon className="size-6 text-ink" />
              </span>
            ) : null}
            <div className="min-w-0 flex-1 pt-1">
              <h3
                id="service-info-title"
                className="font-display text-[1.35rem] leading-tight font-bold text-ink"
              >
                {service.name}
              </h3>
              <p className="mt-1 text-[0.92rem] text-muted">
                {fromLabel}
                <span className="font-semibold text-ink">{priceLine.price}</span>
                {priceLine.rest}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-hairline text-body transition-colors hover:border-ink hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-5 text-[0.98rem] leading-relaxed text-body">
            {details?.summary ?? service.description}
          </p>

          {details ? (
            <>
              <p className="mt-6 font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase">
                {copy.includesLabel}
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {details.includes.map((line) => (
                  <li key={line} className="flex items-center gap-3 text-[0.95rem] text-ink">
                    <span
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-good/15"
                      aria-hidden="true"
                    >
                      <Check className="size-3.5 text-good" strokeWidth={2.5} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              {details.callout ? (
                <div className="mt-6 rounded-2xl border border-accent-ink/20 bg-accent-tint/40 p-5">
                  <p className="flex items-center gap-2 font-display text-[0.98rem] font-bold text-ink">
                    <Asterisk className="size-5 text-accent-ink" aria-hidden="true" />
                    {details.callout.title}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {details.callout.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[0.9rem] leading-relaxed text-body"
                      >
                        <span
                          className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-accent-ink"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {details.note ? (
                <p className="mt-6 rounded-xl bg-wash px-4 py-3 text-[0.88rem] text-muted">
                  {details.note}
                </p>
              ) : null}
            </>
          ) : null}

          <button
            type="button"
            onClick={onAdd}
            className="btn btn-accent mt-6 min-h-[3.2rem] w-full text-[1rem] font-semibold"
          >
            {copy.addCta} · {addLabel}
          </button>
        </div>
      ) : null}
    </dialog>
  );
}
