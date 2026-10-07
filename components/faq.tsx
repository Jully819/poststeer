"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs as defaultFaqs } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Accordion. Answers stay in the HTML whether open or shut, for the schema. */
export function Faq({
  faqs = defaultFaqs,
  kicker = "FAQ",
  title = "Questions, answered.",
}: {
  faqs?: typeof defaultFaqs;
  kicker?: string;
  title?: string;
} = {}) {
  const [open, setOpen] = useState<string | null>(faqs[0].question);

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 id="faq-title" className="h2 mt-4">
            {title}
          </h2>
        </div>

        <ul className="border-t border-hairline">
          {faqs.map((item, index) => {
            const isOpen = open === item.question;
            /* A question with no Latin letters slugs to nothing, and every
               button and region would then share one id. The index is the
               fallback. */
            const slug =
              item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
              `q${index}`;
            return (
              <li key={item.question} className="border-b border-hairline">
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${slug}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${slug}`}
                    onClick={() => setOpen(isOpen ? null : item.question)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-[1rem] font-semibold text-ink">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted transition-transform duration-300",
                        isOpen && "rotate-180 text-ink",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${slug}`}
                  role="region"
                  aria-labelledby={`faq-button-${slug}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    {/* An answer is one string or several paragraphs. */}
                    <div className="max-w-[44rem] pb-6 last:*:mb-0">
                      {(Array.isArray(item.answer) ? item.answer : [item.answer]).map(
                        (paragraph) => (
                          <p key={paragraph} className="body-text mb-3">
                            {paragraph}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
