import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a form control with a proper <label htmlFor>, and — when there's an
 * error — an id'd, role="alert" message wired to the control via
 * aria-describedby + aria-invalid (applied by the caller on the input).
 */
export function FormField({ id, label, error, required, children, className }: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink mb-1.5">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-accent-strong">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className={cn("mt-1.5 text-sm text-red-700")}>
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClassName =
  "w-full min-w-0 max-w-full box-border px-4 py-3 rounded-xl border border-border bg-[#f0f4f9] text-ink placeholder-muted text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-200";