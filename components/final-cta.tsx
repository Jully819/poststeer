import { finalCta } from "@/lib/content";
import { Button } from "@/components/ui/button";
import KineticGrid from "@/components/ui/kinetic-grid";
import { withBase } from "@/lib/utils";

/**
 * The closing band, on the same kinetic grid as the guarantee block — the two
 * dark blocks on the page now share one treatment rather than one being plain
 * ink and the other alive.
 */
export function FinalCta() {
  return (
    /* Full bleed, like the guarantee band: the page ends on one of its three
       backgrounds rather than on a dark card sitting in cream. */
    <section aria-labelledby="final-title" className="bg-band text-white">
      <KineticGrid className="bg-band text-white">
        <div className="container-x">
          <div className="py-16 text-center md:py-24">
            <h2 id="final-title" className="h2 mx-auto max-w-[24ch] text-white">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-white/80">
              {finalCta.body}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={withBase("/demo")} variant="accent">
                {finalCta.primaryCta}
              </Button>
              <a href="#faq" className="btn border border-white/30 text-white hover:border-white">
                {finalCta.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </KineticGrid>
    </section>
  );
}
