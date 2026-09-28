import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { thankYouPage } from "@/lib/content";
import { withBase } from "@/lib/utils";

/**
 * /thank-you — the redirect target on every Stripe Payment Link.
 *
 * NOT IN THE SITEMAP AND NOT INDEXED. It is the end of a flow, reachable only
 * by having paid, and a stray visitor landing here from search would be told
 * their payment went through when it did not. See the note on `thankYouPage`
 * in lib/content.ts for why it names nothing about the purchase.
 */
export const metadata: Metadata = {
  title: thankYouPage.seoTitle,
  description: thankYouPage.seoDescription,
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  /* NO CHECKOUT STEPPER HERE. Someone arriving from a Payment Link paid
     without ever filling the brief, so a progress bar ticking "Brief" off
     would contradict the one thing this page asks them to do. */
  return (
    <>
      <section className="section-pad">
        <div className="container-x max-w-[44rem]">
          <span
            className="grid size-11 place-items-center rounded-full bg-accent-tint"
            aria-hidden="true"
          >
            <Check className="size-5 text-accent-ink" strokeWidth={3} />
          </span>

          <h1 className="h1 mt-5">{thankYouPage.title}</h1>
          <p className="lead mt-4">{thankYouPage.intro}</p>

          <div className="card mt-10 p-6">
            <h2 className="font-display text-[1.05rem] font-bold text-ink">
              {thankYouPage.nextTitle}
            </h2>
            <p className="body-text mt-3">{thankYouPage.nextBody}</p>
            <a href={withBase("/start/brief")} className="btn btn-accent mt-6">
              {thankYouPage.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <h2 className="mt-12 font-display text-[1.05rem] font-bold text-ink">
            {thankYouPage.whatNextTitle}
          </h2>
          <ol className="mt-4 flex flex-col gap-3">
            {thankYouPage.whatNext.map((step, i) => (
              <li key={step} className="flex gap-3 text-[0.9rem] leading-relaxed text-body">
                <span
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-wash font-mono text-[0.68rem] text-ink"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <p className="body-text mt-10 border-t border-hairline pt-6">
            {thankYouPage.helpLead}{" "}
            <a
              href={thankYouPage.helpHref}
              className="font-semibold text-accent-ink underline underline-offset-2"
            >
              {thankYouPage.helpCta}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
