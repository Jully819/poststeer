import type { ReactNode } from "react";
import { cn, withBase } from "@/lib/utils";

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "accent" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={withBase(href)} className={cn("btn", `btn-${variant}`, className)}>
      {children}
    </a>
  );
}
