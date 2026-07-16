import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
export type ButtonSize = "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-primary/30",
  accent:
    "bg-accent-strong text-white hover:bg-accent-dark shadow-lg hover:shadow-accent-strong/40",
  outline:
    "bg-white/10 hover:bg-white/20 border border-white/30 text-white",
  ghost: "bg-transparent text-ink hover:bg-primary-light",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-sm rounded-full",
  lg: "px-8 py-4 text-base rounded-full",
};

/**
 * Base interactive button used across the site (nav CTA, hero actions, form
 * submit, etc). Handles disabled/loading states and keeps a visible focus
 * ring (see :focus-visible in global.css) so it's fully keyboard operable.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200",
          "hover:scale-[1.03] active:scale-100 disabled:opacity-60 disabled:pointer-events-none disabled:hover:scale-100",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          className,
        )}
        {...props}
      >
        {icon && iconPosition === "left" && !isLoading && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{isLoading ? "Submitting…" : children}</span>
        {icon && iconPosition === "right" && !isLoading && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
