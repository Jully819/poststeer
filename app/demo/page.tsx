import type { Metadata } from "next";
import { Check, Star } from "lucide-react";
import { demoPage } from "@/lib/content";
import { DemoBooker } from "@/components/demo-booker";
import { DemoFaq } from "@/components/demo-faq";

export const metadata: Metadata = {
  title: demoPage.seoTitle,
  description: demoPage.seoDescription,
  alternates: { canonical: "/demo" },
  /* Noindex while the figures on this site are still placeholders, matching
     the root layout. Flip both together. */
  robots: { index: false, follow: false },
};

/** Copy and the questions on the left, the picker on the right. */
export default function DemoPage() {
  return (
    <section aria-labelledby="demo-title" className="pt-12 pb-20 md:pt-16">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_28rem] lg:gap-16">
        <div>
          <p className="flex items-center gap-2 text-[0.85rem] text-body">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3.5 fill-current text-ink" />
              ))}
            </span>
            <span className="font-display font-semibold text-ink">{demoPage.rating.count}</span>
            <span className="text-muted">{demoPage.rating.label}</span>
          </p>

          <h1 id="demo-title" className="h1 mt-5 max-w-[16ch]">
            {demoPage.title}
          </h1>

          <p className="lead mt-5 max-w-[34rem]">{demoPage.intro}</p>

          <ul className="mt-8 flex max-w-[34rem] flex-col gap-5">
            {demoPage.bullets.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-tint"
                  aria-hidden="true"
                >
                  <Check className="size-3.5 text-accent-ink" strokeWidth={3} />
                </span>
                <span className="leading-snug">
                  <span className="block text-[1.02rem] font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-body">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 max-w-[34rem]">
            <DemoFaq />
          </div>
        </div>

        <DemoBooker />
      </div>
    </section>
  );
}
