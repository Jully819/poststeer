import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <a href={href} className={cn("btn", `btn-${variant}`, className)}>
      {children}
    </a>
  );
}
