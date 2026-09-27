import type { Metadata } from "next";
import { LegalDocPage } from "@/components/legal-doc";
import { legalDocs } from "@/lib/legal";

const doc = legalDocs.terms;

export const metadata: Metadata = {
  title: doc.seoTitle,
  description: doc.seoDescription,
  alternates: { canonical: "/legal/terms" },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return <LegalDocPage slug="terms" />;
}
