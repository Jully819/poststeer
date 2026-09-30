import type { Metadata } from "next";
import { LegalDocPage } from "@/components/legal-doc";
import { legalDocs } from "@/lib/legal";

const doc = legalDocs.privacy;

export const metadata: Metadata = {
  title: doc.seoTitle,
  description: doc.seoDescription,
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return <LegalDocPage slug="privacy" />;
}
