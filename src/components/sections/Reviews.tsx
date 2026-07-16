import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { REVIEWS, AGGREGATE_RATING } from "@/data/reviews";

export function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-background overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Customer Reviews" title="WHAT OUR CUSTOMERS SAY" />

        {/* Horizontally scrollable on mobile, grid on desktop. Native scroll
            container is keyboard-reachable (Tab + arrow keys) by default. */}
        <ul
          className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 xl:grid-cols-5 lg:overflow-visible snap-x snap-mandatory"
          aria-label="Customer reviews"
        >
          {REVIEWS.map((review) => (
            <li key={review.id} className="contents">
              <ReviewCard {...review} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-4 bg-primary/8 border border-primary/20 rounded-full px-8 py-4">
            <span aria-hidden="true" className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </span>
            <span className="font-display font-bold text-2xl text-primary">
              {AGGREGATE_RATING.score}
            </span>
            <span className="text-muted text-sm">
              based on {AGGREGATE_RATING.reviewCount}+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
