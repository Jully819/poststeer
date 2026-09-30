import type { Metadata } from "next";
import { briefPage } from "@/lib/content";
import { CheckoutSteps } from "@/components/checkout-steps";
import { BriefForm } from "@/components/brief-form";

export const metadata: Metadata = {
  title: briefPage.seoTitle,
  description: briefPage.seoDescription,
  alternates: { canonical: "/pricing/brief" },
  /* Permanently noindex. A half-filled form reached cold from a search result
     is not a landing page, and it is a step in a flow, not a destination. This
     one does not flip with the rest. */
  /* NOINDEX ON PURPOSE, and not because the site is closed. The rest of
     the site is open to crawlers now. A half-filled form reached cold from a search result is not a
     landing page. This is a step in a flow, not a destination, and it is
     deliberately absent from app/sitemap.ts. */
  robots: { index: false, follow: false },
};

export default function BriefPage() {
  return (
    <>
      <CheckoutSteps current={1} />
      <BriefForm />
    </>
  );
}
