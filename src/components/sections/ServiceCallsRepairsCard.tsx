import { ClipboardList, Wrench, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { selectServiceAndScroll } from "@/lib/serviceSelection";
import type { ServiceCategory } from "@/data/services";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "service-calls": ClipboardList,
  repairs: Wrench,
};

export interface ServiceCallsRepairsCardProps {
  categories: ServiceCategory[];
  bookableCategoryIds: string[];
}

/**
 * "Service Calls" and "Repairs" pack into a single card so the pricing
 * section doesn't run unnecessarily long. Both categories stay clearly
 * separated: side-by-side columns on desktop, stacked with a divider on
 * mobile.
 */
export function ServiceCallsRepairsCard({ categories, bookableCategoryIds }: ServiceCallsRepairsCardProps) {
  return (
    <Card className="p-0 overflow-hidden sm:col-span-2">
      <div className="grid md:grid-cols-2 divide-y divide-border md:divide-y-0 md:divide-x md:divide-border">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id] ?? ClipboardList;
          const bookable = bookableCategoryIds.includes(category.id);

          return (
            <div key={category.id} className="p-6 sm:p-7">
              <div className="flex items-start gap-4 mb-5">
                <IconBadge icon={Icon} tone="primary" size="md" />
                <div>
                  <h3 className="font-heading font-bold text-ink text-lg leading-tight">
                    {category.title}
                  </h3>
                  {category.note && <p className="text-muted text-xs mt-1">{category.note}</p>}
                </div>
              </div>

              <ul className="divide-y divide-border">
                {category.items.map((item) => (
                  <li key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium text-ink text-sm leading-snug">{item.name}</p>
                        {item.subtext && <p className="text-muted text-xs mt-0.5">{item.subtext}</p>}
                      </div>
                      <span className="shrink-0 font-display font-bold text-base sm:text-lg tabular-nums text-primary">
                        {item.price}
                      </span>
                    </div>

                    {bookable && (
                      <button
                        type="button"
                        onClick={() => selectServiceAndScroll(item.name)}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-accent-strong hover:text-accent-dark transition-colors"
                      >
                        Book Service
                        <span className="sr-only"> for {item.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
