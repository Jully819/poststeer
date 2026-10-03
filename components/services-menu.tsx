"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { servicesMenu, type MenuItem } from "@/lib/content";
import { cn, withBase } from "@/lib/utils";
import { serviceIcons } from "@/components/ui/service-icons";

type Group = { title: string; viewAll: string; items: MenuItem[] };

function MenuGroup({ group, onNavigate }: { group: Group; onNavigate: () => void }) {
  return (
    <section className="px-6 py-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase">
          <span aria-hidden="true" className="text-hairline">
            //{" "}
          </span>
          {group.title}
        </h3>
        <a
          href={withBase("/pricing")}
          onClick={onNavigate}
          className="inline-flex items-center gap-1 font-display text-[0.82rem] font-semibold text-accent-ink"
        >
          {group.viewAll}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <ul className="mt-3 flex flex-col">
        {group.items.map((item) => {
          const Icon = serviceIcons[item.icon];
          return (
            <li key={item.slug}>
              <a
                href={withBase(`/services/${item.slug}`)}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-wash"
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-wash"
                  aria-hidden="true"
                >
                  <Icon className="size-[18px] text-ink" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[0.95rem] font-bold text-ink">
                    {item.name}
                  </span>
                  <span className="block truncate text-[0.82rem] text-muted">{item.tagline}</span>
                </span>

                <span className="shrink-0 font-mono text-[0.75rem] whitespace-nowrap text-muted">
                  {item.enquiry ? (
                    <span className="font-display text-[0.85rem] font-bold text-accent-ink">
                      On enquiry
                    </span>
                  ) : (
                    <>
                      from{" "}
                      <span className="font-display text-[1.05rem] font-bold text-accent-ink">
                        {item.price}
                      </span>{" "}
                      {item.unit}
                    </>
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * The Services mega-menu.
 *
 * A FLOATING CARD, not a full-width band: rounded, shadowed and centred under
 * the header, so the page stays visible behind it and the panel reads as part
 * of the nav rather than as a second header.
 *
 * OPENS ON CLICK, NOT HOVER. A panel this size on hover is unusable on touch
 * and hostile with a trackpad — it appears while the pointer is travelling
 * past it. Click is also what makes `aria-expanded` mean anything.
 *
 * It closes on Escape, on an outside click, and on any link inside it, and
 * focus returns to the trigger on Escape so a keyboard user is not dropped at
 * the top of the document.
 *
 * Every row is a real page: nothing in here points at "#".
 */
export function ServicesMenu({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const close = () => setOpen(false);
  const left = servicesMenu.groups.slice(0, 2);
  const right = servicesMenu.groups.slice(2);

  return (
    <div ref={wrapRef} className="static">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="services-menu"
        className={cn(
          "flex items-center gap-1 font-display text-[0.9rem] font-medium transition-colors",
          open ? "text-accent-ink" : "text-ink/80 hover:text-ink",
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform",
            open ? "rotate-180 text-accent-ink" : "text-muted",
          )}
          aria-hidden="true"
        />
      </button>

      {/* `w-[min(96vw,70rem)]` keeps the card off the viewport edges on a
          laptop without needing a breakpoint. */}
      <div
        id="services-menu"
        hidden={!open}
        className="absolute top-full left-1/2 z-50 mt-2 w-[min(96vw,70rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-hairline bg-paper shadow-[0_30px_60px_-25px_rgb(10_11_16/0.35)]"
      >
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-hairline px-6 py-3 text-[0.85rem] text-ink">
          <Star className="size-3.5 fill-current text-accent-ink" aria-hidden="true" />
          {servicesMenu.stats.map((stat, i) => (
            <span key={stat} className="flex items-center gap-3">
              {i > 0 ? (
                <span aria-hidden="true" className="text-muted">
                  ·
                </span>
              ) : null}
              <span className={i === 0 ? "font-semibold" : "text-body"}>{stat}</span>
            </span>
          ))}
        </p>

        {/* Left column stacks Social Media over SEO; the right carries Web &
            Email. The reference's quadrants, minus the section that was
            dropped, so there is no empty cell. */}
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-hairline">
          <div className="divide-y divide-hairline">
            {left.map((group) => (
              <MenuGroup key={group.title} group={group} onNavigate={close} />
            ))}
          </div>
          <div className="border-t border-hairline lg:border-t-0">
            {right.map((group) => (
              <MenuGroup key={group.title} group={group} onNavigate={close} />
            ))}
          </div>
        </div>

        {/* The full-service row that used to sit here is gone. With it removed
            the footer is the only way out of the menu, so it carries the
            accent tint the row had rather than reading as a grey rule. */}
        <a
          href={withBase("/pricing")}
          onClick={close}
          className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-accent-tint px-6 py-4 transition-colors hover:bg-accent/15"
        >
          <span className="font-display text-[0.98rem] font-bold text-ink">
            {servicesMenu.footerLeft}
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="font-display text-[0.92rem] font-semibold text-accent-ink">
              {servicesMenu.footerRight}
            </span>
            <span
              className="grid size-9 place-items-center rounded-full bg-accent text-ink"
              aria-hidden="true"
            >
              <ArrowRight className="size-4" />
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
