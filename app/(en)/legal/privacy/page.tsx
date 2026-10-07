import type { Metadata } from "next";
import { LegalDocPage } from "@/components/legal-doc";
import { legalDocs } from "@/lib/legal";

const doc = legalDocs.privacy;

export const metadata: Metadata = {
  title: doc.seoTitle,
  description: doc.seoDescription,
  alternates: { canonical: "/legal/privacy" },
  /* NOINDEX UNTIL THE BLANKS ARE FILLED, and not because the site is
     closed — everything else is open to crawlers. This document still
     renders unconfirmed values inside square brackets: the governing
     jurisdiction, the data locations, the transfer mechanism, and the
     response and retention windows. The company is not yet registered
     anywhere, so the jurisdiction cannot be written truthfully.

     An indexed policy with holes in it is worse than an unindexed one,
     because Google caches it and the Wayback Machine keeps it after the
     live page is fixed. The page stays publicly reachable, which is what
     Stripe and the ad platforms check for.

     TO REVERSE: fill the brackets, delete this block, and put the route
     back in app/sitemap.ts. The two move together. See references/stats.md
     for what is still outstanding. */
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalDocPage slug="privacy" />;
}
