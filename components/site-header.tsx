"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { brand, nav } from "@/lib/content";
import { ServicesMenu } from "@/components/services-menu";
import { Logo } from "@/components/logo";
import { cn, withBase } from "@/lib/utils";

/**
 * Sticky header: wordmark, dropdown-style nav, log in, and the price CTA.
 *
 * The chevrons are decorative here — the reference opens mega-menus, which
 * are a separate build. Marked aria-hidden so nothing announces a menu that
 * does not exist yet.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur relative">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        {/* Home, not "#top". The hero is the only section that carries an id
            of "top", so the anchor did nothing on /demo, the city and
            industry pages, posts and the legal pages — it just put a hash on
            the URL. A wordmark is the way back to the front page from
            anywhere, so it has to be a real link. */}
        <a href={withBase("/")} className="shrink-0">
          <Logo height={36} priority />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) =>
              item.label === "Services" ? (
                <li key={item.label}>
                  <ServicesMenu label={item.label} />
                </li>
              ) : (
                <li key={item.label}>
                  <a
                    href={withBase(item.href)}
                    className="flex items-center gap-1 font-display text-[0.9rem] font-medium text-ink/80 transition-colors hover:text-ink"
                  >
                    {item.label}
                    {/* Only items that open a panel get a chevron. */}
                    {item.dropdown ? (
                      <ChevronDown className="size-3.5 text-muted" aria-hidden="true" />
                    ) : null}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="hidden font-display text-[0.9rem] font-medium text-ink sm:inline"
          >
            Log in
          </a>
          <a href="#pricing" className="btn btn-primary min-h-[2.4rem] px-4 text-[0.85rem]">
            Start for {brand.priceFrom}/mo
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className={cn("border-t border-hairline lg:hidden")}
      >
        <ul className="container-x flex flex-col py-2">
          {nav.map((item) => (
            <li key={item.label}>
              <a
                href={withBase(item.href)}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-[1rem] font-medium text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
