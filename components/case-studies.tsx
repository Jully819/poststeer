import { caseStudies } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";

/** Four result cards, each led by its number. */
/* Off the home page for now. To bring the Results section back, render
   <CaseStudies /> in app/page.tsx before <ClientFeedback />. */
export function CaseStudies() {
  return (
    <section id="results" aria-labelledby="results-title" className="section-pad">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="kicker">{caseStudies.kicker}</p>
          <h2 id="results-title" className="h2 mt-4">
            {caseStudies.title}
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.items.map((item) => (
            <li key={item.client + item.stat} className="card overflow-hidden">
              <Placeholder label="Case image" ratio="aspect-[4/3]" className="rounded-none border-0" />
              <div className="p-6">
                <p className="font-display text-[1.8rem] leading-none font-bold text-accent-ink tabular-nums">
                  {item.stat}
                </p>
                <p className="mt-2 text-[0.85rem] text-muted">{item.label}</p>
                <p className="mt-4 font-display text-[0.95rem] font-semibold text-ink">
                  {item.client}
                </p>
                <p className="text-[0.8rem] text-muted">{item.sector}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="#results" variant="ghost">
            {caseStudies.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
