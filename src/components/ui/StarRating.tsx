import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StarRatingProps {
  rating?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Renders a row of stars. The visual stars are decorative (aria-hidden);
 * a single text alternative communicates the rating to screen readers so
 * it isn't announced star-by-star.
 */
export function StarRating({ rating = 5, max = 5, size = "sm", className }: StarRatingProps) {
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className={cn("flex gap-0.5", className)}>
      <span className="sr-only">{`Rated ${rating} out of ${max} stars`}</span>
      <div aria-hidden="true" className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < rating ? "fill-accent text-accent" : "fill-transparent text-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}
