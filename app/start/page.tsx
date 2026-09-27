import type { Metadata } from "next";
import { selectPage } from "@/lib/content";
import { CheckoutSteps } from "@/components/checkout-steps";
import { SelectServices } from "@/components/select-services";

export const metadata: Metadata = {
  title: selectPage.seoTitle,
  description: selectPage.seoDescription,
  alternates: { canonical: "/start" },
  robots: { index: false, follow: false },
};

export default function StartPage() {
  return (
    <>
      <CheckoutSteps current={0} />
      <SelectServices />
    </>
  );
}
