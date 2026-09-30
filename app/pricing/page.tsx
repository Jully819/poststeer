import type { Metadata } from "next";
import { selectPage } from "@/lib/content";
import { CheckoutSteps } from "@/components/checkout-steps";
import { SelectServices } from "@/components/select-services";

export const metadata: Metadata = {
  title: selectPage.seoTitle,
  description: selectPage.seoDescription,
  alternates: { canonical: "/pricing" },
  /* Noindex only while the site is closed to crawlers — NOT because this is a
     funnel step. It used to be /start, where the noindex was permanent. It is
     a nav destination now, so it flips to indexable with every other page when
     the three switches in app/sitemap.ts flip. /pricing/brief does not. */
  robots: { index: false, follow: false },
};

export default function PricingPage() {
  return (
    <>
      <CheckoutSteps current={0} />
      <SelectServices />
    </>
  );
}
