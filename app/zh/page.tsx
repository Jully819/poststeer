import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { Deliverables } from "@/components/deliverables";
import { Gallery } from "@/components/gallery";
import { PricingBuilder } from "@/components/pricing-builder";
import { Guarantee } from "@/components/guarantee";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import {
  zhDeliverables,
  zhFaqHeading,
  zhFaqs,
  zhFinalCta,
  zhGallery,
  zhGuarantee,
  zhHero,
  zhLogoStrip,
  zhPricing,
  zhPricingUi,
} from "@/lib/content-zh";

/* The same sections in the same order as app/(en)/page.tsx, each handed its
   Chinese copy. Nothing here has its own markup: if a section changes on the
   English page it changes here too, and only the words live in
   lib/content-zh.ts. */
export default function ChineseHome() {
  return (
    <>
      <Hero hero={zhHero} />
      <LogoStrip logoStrip={zhLogoStrip} />
      <Deliverables deliverables={zhDeliverables} />
      <Gallery gallery={zhGallery} />
      <PricingBuilder pricing={zhPricing} ui={zhPricingUi} />
      <Guarantee guarantee={zhGuarantee} />
      <Faq faqs={zhFaqs} kicker={zhFaqHeading.kicker} title={zhFaqHeading.title} />
      <FinalCta finalCta={zhFinalCta} />
    </>
  );
}
