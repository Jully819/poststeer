import type { Metadata } from "next";
import { briefPage } from "@/lib/content";
import { CheckoutSteps } from "@/components/checkout-steps";
import { BriefForm } from "@/components/brief-form";

export const metadata: Metadata = {
  title: briefPage.seoTitle,
  description: briefPage.seoDescription,
  alternates: { canonical: "/start/brief" },
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
