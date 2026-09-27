import { logoStrip } from "@/lib/content";
import { PlatformLogo } from "@/components/platform-logos";

/** Mark plus wordmark per platform, under a mono kicker. */
export function LogoStrip() {
  return (
    <section aria-label={logoStrip.label} className="border-y border-hairline py-10">
      <div className="container-x">
        <p className="text-center font-mono text-[0.74rem] font-semibold tracking-[0.16em] text-ink uppercase">
          <span aria-hidden="true" className="text-hairline">
            //{" "}
          </span>
          {logoStrip.label}
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {logoStrip.items.map((item) => (
            <li key={item.name} className="flex items-center gap-2.5">
              <PlatformLogo mark={item.mark} className="size-6 shrink-0 text-ink" />
              <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
