import { ArrowRight } from "lucide-react";
import { brand, footer } from "@/lib/content";
import { slugify } from "@/lib/landing";
import { Logo } from "@/components/logo";
import { withBase } from "@/lib/utils";

/**
 * Footer: brand column, five link columns, then city and industry rows.
 *
 * THE CITY AND INDUSTRY ROWS ARE THE POINT. In the reference these are the
 * footer's real job — an internal link surface for "social media management
 * <city>" and "<industry> marketing" searches. Both rows now have pages
 * behind them: /service-areas/<city> and /industries/<industry>.
 */

/**
 * Column items are plain strings, so the few that now have a page behind them
 * are looked up by label. Anything absent stays "#", which is what the rest of
 * the footer still is.
 */
const columnHrefs: Record<string, string> = {
  Pricing: "/pricing",
  "Service Areas": "/service-areas",
  "Marketing Glossary": "/marketing-glossary",
  Blog: "/blog",
  "Book a Demo": "/demo",
  "Refund Policy": "/legal/refund-policy",
};

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-wash">
      <div className="container-x py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div>
            <Logo height={44} />
            <p className="mt-4 max-w-[21rem] text-[0.85rem] leading-relaxed text-body">
              {footer.about}
            </p>

            <p className="mt-7 flex items-start gap-2 font-mono text-[0.72rem] leading-snug text-muted">
              <span
                className="mt-1 size-1.5 shrink-0 rounded-full bg-[#16a34a]"
                aria-hidden="true"
              />
              <span>{footer.status.label}</span>
            </p>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-display text-[0.85rem] font-bold text-ink">{column.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item}>
                    <a
                      href={withBase(columnHrefs[item] ?? "#")}
                      className="text-[0.82rem] leading-snug text-body transition-colors hover:text-ink"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container-x border-t border-hairline py-5">
        <nav
          aria-label={footer.cities.label}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5"
        >
          <span className="font-display text-[0.82rem] font-bold text-ink">
            {footer.cities.label}
          </span>
          {footer.cities.items.map((city) => (
            <a
              key={city}
              href={withBase(`/service-areas/${slugify(city)}`)}
              className="text-[0.82rem] text-body transition-colors hover:text-ink"
            >
              {city}
            </a>
          ))}
          <a
            href={withBase("/service-areas")}
            className="inline-flex items-center gap-1 font-display text-[0.82rem] font-semibold text-accent-ink"
          >
            {footer.cities.all}
            <ArrowRight className="size-3" aria-hidden="true" />
          </a>
        </nav>
      </div>

      <div className="container-x border-t border-hairline py-5">
        <nav
          aria-label={footer.industries.label}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5"
        >
          <span className="font-display text-[0.82rem] font-bold text-ink">
            {footer.industries.label}
          </span>
          {footer.industries.items.map((industry) => (
            <a
              key={industry}
              href={withBase(`/industries/${slugify(industry)}`)}
              className="text-[0.82rem] text-body transition-colors hover:text-ink"
            >
              {industry}
            </a>
          ))}
        </nav>
      </div>

      <div className="container-x flex flex-wrap items-center justify-between gap-6 border-t border-hairline py-6">
        <p className="font-mono text-[0.72rem] leading-relaxed text-muted">
          {footer.legal.leadIn}{" "}
          <a href="#" className="underline underline-offset-2">
            {footer.legal.linkText}
          </a>{" "}
          {footer.legal.tail}
          <br />© {new Date().getFullYear()} {brand.name}, {footer.legal.copyrightTail}
        </p>

        <p className="flex items-center gap-4 font-mono text-[0.72rem] text-muted">
          {footer.legal.links.map((link, i) => (
            <span key={link.label} className="flex items-center gap-4">
              {i > 0 ? <span aria-hidden="true">•</span> : null}
              <a href={withBase(link.href)} className="transition-colors hover:text-ink">
                {link.label}
              </a>
            </span>
          ))}
        </p>

      </div>
    </footer>
  );
}
