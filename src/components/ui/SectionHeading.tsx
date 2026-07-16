import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", "mb-14", className)}>
      <p className="text-accent-strong font-semibold text-sm tracking-widest uppercase mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-ink">{title}</h2>
      {description && (
        <p
          className={cn(
            "text-muted mt-4 max-w-xl",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}