import { StarRating } from "@/components/ui/StarRating";
import type { Review } from "@/data/reviews";

export function ReviewCard({ name, location, text, rating }: Review) {
  return (
    <figure className="snap-start shrink-0 w-72 lg:w-auto bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow">
      <StarRating rating={rating} />
      <blockquote className="text-ink text-sm leading-relaxed mt-4 mb-5 italic">
        “{text}”
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
        <span
          aria-hidden="true"
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0"
        >
          {name[0]}
        </span>
        <span>
          <span className="block font-semibold text-ink text-sm">{name}</span>
          <span className="block text-xs text-muted">{location}</span>
        </span>
      </figcaption>
    </figure>
  );
}
