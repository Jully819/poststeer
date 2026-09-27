"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { demoPage } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * "Before you book": the questions someone asks with their hand on the
 * button, answered beside the picker rather than at the foot of the page.
 *
 * Cards rather than the homepage FAQ's hairline list. This sits in a narrow
 * column next to a heavy white panel, and an unbounded list of rules reads as
 * the page falling apart there.
 *
 * Answers stay in the HTML whether open or shut, as on the homepage: the
 * accordion hides them with grid rows, not by dropping them.
 */
export function DemoFaq() {
  const [open, setOpen] = useState<string | null>(demoPage.before[0].question);

  return (
    <div>
      <h2 className="font-display text-[1.6rem] font-bold tracking-tight text-ink">
        {demoPage.beforeTitle}
      </h2>

      <ul className="mt-5 flex flex-col gap-3">
        {demoPage.before.map((item) => {
          const isOpen = open === item.question;
          const slug = item.question
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          return (
            <li key={item.question} className="card overflow-hidden">
              <h3>
                <button
                  type="button"
                  id={`demo-faq-button-${slug}`}
                  aria-expanded={isOpen}
                  aria-controls={`demo-faq-answer-${slug}`}
                  onClick={() => setOpen(isOpen ? null : item.question)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                >
                  <span className="font-display text-[0.98rem] font-semibold text-ink">
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
                id={`demo-faq-answer-${slug}`}
                role="region"
                aria-labelledby={`demo-faq-button-${slug}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="body-text px-5 pb-5">{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
