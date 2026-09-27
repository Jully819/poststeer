import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Services", "Brief", "Payment"];

/**
 * Where you are in the flow.
 *
 * `aria-current="step"` marks the active one, and completed steps carry a
 * tick rather than only a colour change — the state has to survive being read
 * aloud and being seen by someone who cannot tell the two blues apart.
 */
export function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <nav aria-label="Checkout progress" className="border-b border-hairline bg-wash">
      <ol className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full text-[0.68rem] font-semibold",
                  done && "bg-accent text-ink",
                  active && "bg-ink text-white",
                  !done && !active && "border border-hairline bg-paper text-muted",
                )}
                aria-hidden="true"
              >
                {done ? <Check className="size-3" /> : i + 1}
              </span>
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "font-display text-[0.8rem]",
                  active ? "font-semibold text-ink" : "text-muted",
                )}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
