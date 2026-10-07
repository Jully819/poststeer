import type { Metadata } from "next";
import { glossaryPage } from "@/lib/glossary";
import { GlossaryIndex } from "@/components/glossary-index";

/**
 * /marketing-glossary — the page behind the footer's "Marketing Glossary" link.
 *
 * Header, then the whole index. There is no closing CTA band: someone who came
 * here came to look one word up, and the empty state already offers the demo
 * for the case where the word is missing.
 */
export const metadata: Metadata = {
  title: glossaryPage.seoTitle,
  description: glossaryPage.seoDescription,
  alternates: { canonical: "/marketing-glossary" },
};

export default function MarketingGlossaryPage() {
  return (
    <>
      <section className="container-x pt-14 text-center">
        <p className="kicker">{glossaryPage.kicker}</p>
        <h1 className="h1 mx-auto mt-4 max-w-[16ch]">
          {glossaryPage.titleLead}
          <br />
          <span className="text-accent-ink">{glossaryPage.titleAccent}</span>
        </h1>
        <p className="lead mx-auto mt-5 max-w-[58ch]">{glossaryPage.intro}</p>
      </section>

      <section aria-label="Glossary" className="container-x pb-20 text-left">
        <GlossaryIndex />
      </section>
    </>
  );
}
