"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { demoBar } from "@/lib/content";
import { cn, withBase } from "@/lib/utils";

/**
 * Dark bar pinned to the bottom, from "How it works" downwards.
 *
 * THE TRIGGER IS AN INTERSECTION OBSERVER on the section itself, not a scroll
 * handler comparing pixel offsets. An offset is wrong the moment anything
 * above it changes height — an image loads, the hero wraps to another line on
 * a narrow screen — and it recalculates on every scroll event. The observer
 * fires twice: when the section arrives, and when it leaves.
 *
 * `boundingClientRect.top < 0` is what keeps it visible BELOW the section.
 * Without it the bar would vanish again as soon as "How it works" scrolled
 * off the top, which is the opposite of what is wanted.
 *
 * DISMISSAL STICKS FOR THE TAB (sessionStorage, not localStorage): someone
 * who closes it should not see it again while reading, but should not be
 * silently opted out forever either. Every access is wrapped, since Safari
 * throws on storage in private mode rather than returning null.
 */
const DISMISS_KEY = "demo-bar-dismissed";

export function DemoBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    const section = document.getElementById("how-it-works");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* Private mode. The bar simply comes back on the next page load. */
    }
  };

  const shown = visible && !dismissed;

  return (
    <div
      ref={barRef}
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-4 z-40 px-4 transition-all duration-300 motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      {/* A third narrower than the container and centred. Below `sm` it runs
          full width with right padding, because the chat launcher sits in
          that corner and a centred bar would still be under it. */}
      <div className="container-x pr-16 sm:pr-4">
        <div className="mx-auto flex max-w-[42rem] flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink px-5 py-3.5 shadow-[0_20px_45px_-25px_rgb(10_11_16/0.9)] sm:px-6">
          <div className="min-w-0">
            <p className="font-display text-[0.95rem] font-bold text-white">{demoBar.title}</p>
            <p className="mt-0.5 text-[0.82rem] text-white/60">{demoBar.subline}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={withBase("/demo")}
              tabIndex={shown ? undefined : -1}
              className="btn min-h-[2.6rem] bg-white px-5 text-[0.88rem] font-bold text-ink hover:bg-white/90"
            >
              {demoBar.cta}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={dismiss}
              tabIndex={shown ? undefined : -1}
              aria-label={demoBar.dismissLabel}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
