import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { Deliverables } from "@/components/deliverables";
import { Gallery } from "@/components/gallery";
import { PricingBuilder } from "@/components/pricing-builder";
import { Guarantee } from "@/components/guarantee";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import {
  zhHantDeliverables,
  zhHantFaqHeading,
  zhHantFaqs,
  zhHantFinalCta,
  zhHantGallery,
  zhHantGuarantee,
  zhHantHero,
  zhHantLogoStrip,
  zhHantPricing,
  zhHantPricingUi,
} from "@/lib/content-zh-hant";

/* The same sections in the same order as app/(en)/page.tsx, each handed its
   Traditional Chinese copy. Nothing here has its own markup: if a section changes on the
   English page it changes here too, and only the words live in
   lib/content-zh-hant.ts. */
export default function TraditionalChineseHome() {
  return (
    <>
      <Hero hero={zhHantHero} />
      <LogoStrip logoStrip={zhHantLogoStrip} />
      <Deliverables deliverables={zhHantDeliverables} />
      <Gallery gallery={zhHantGallery} />
      <PricingBuilder pricing={zhHantPricing} ui={zhHantPricingUi} />
      <Guarantee guarantee={zhHantGuarantee} />
      <Faq faqs={zhHantFaqs} kicker={zhHantFaqHeading.kicker} title={zhHantFaqHeading.title} />
      <FinalCta finalCta={zhHantFinalCta} />
    </>
  );
}
