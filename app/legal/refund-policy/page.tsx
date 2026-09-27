import type { Metadata } from "next";
import { LegalDocPage } from "@/components/legal-doc";
import { legalDocs } from "@/lib/legal";

const doc = legalDocs["refund-policy"];

export const metadata: Metadata = {
  title: doc.seoTitle,
  description: doc.seoDescription,
  alternates: { canonical: "/legal/refund-policy" },
  robots: { index: false, follow: false },
};

export default function RefundPolicyPage() {
  return <LegalDocPage slug="refund-policy" />;
}
