import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface IconBadgeProps {
  icon: LucideIcon;
  tone?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TONE_STYLES = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent-strong/10 text-accent-strong",
};

const SIZE_STYLES = {
  sm: "w-10 h-10 rounded-xl [&>svg]:w-5 [&>svg]:h-5",
  md: "w-12 h-12 rounded-2xl [&>svg]:w-6 [&>svg]:h-6",
  lg: "w-14 h-14 rounded-2xl [&>svg]:w-7 [&>svg]:h-7",
};

/** Small icon-in-a-tinted-square badge used throughout cards and stat blocks. */
export function IconBadge({ icon: Icon, tone = "primary", size = "md", className }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        TONE_STYLES[tone],
        SIZE_STYLES[size],
        className,
      )}
    >
      <Icon aria-hidden="true" />
    </div>
  );
}
