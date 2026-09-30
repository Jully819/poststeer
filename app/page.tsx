import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { Deliverables } from "@/components/deliverables";
import { Gallery } from "@/components/gallery";
import { PricingBuilder } from "@/components/pricing-builder";
import { Guarantee } from "@/components/guarantee";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

/* Section order follows the reference screenshot, top to bottom.

   BACKGROUNDS ALTERNATE ON PURPOSE and there are only three of them — cream,
   sage, near-black. Nothing here should end up next to a section of its own
   tone; see app/globals.css for the rule. */
export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Deliverables />
      <Gallery />
      <PricingBuilder />
      <Guarantee />
      {/* The client reviews section is parked, not deleted. The quotes and
          portraits were mocks, and mocks that look real cannot be on a page
          that is about to be opened to crawlers. See the note on
          `testimonials` in lib/content.ts for what has to be true before
          <ClientFeedback /> goes back in here. */}
      <Faq />
      <FinalCta />
    </>
  );
}
