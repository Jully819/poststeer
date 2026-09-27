import { ArrowRight } from "lucide-react";
import { proStrip } from "@/lib/content";

/** Thin upsell band between pricing and the guarantee, as in the reference. */
export function ProStrip() {
  return (
    <section aria-label="Full-service option" className="pb-4">
      <div className="container-x">
        <a
          href={proStrip.href}
          className="card flex flex-wrap items-center justify-between gap-3 bg-wash px-6 py-4 transition-colors hover:border-ink/40"
        >
          <span className="text-[0.95rem] text-body">{proStrip.text}</span>
          <span className="inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-accent-ink">
            {proStrip.linkText}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
