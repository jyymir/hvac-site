import { ClipboardList, Wrench, Cog, Layers, DollarSign, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { selectServiceAndScroll } from "@/lib/serviceSelection";
import type { ServiceCategory } from "@/data/services";
import { cn } from "@/lib/cn";

/** Category id -> icon, purely presentational (kept out of the data file). */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "service-calls": ClipboardList,
  repairs: Wrench,
  installations: Cog,
  ductwork: Layers,
  "additional-charges": DollarSign,
};

export interface ServiceCategoryCardProps {
  category: ServiceCategory;
  /** Whether items in this category can be booked via the appointment form. */
  bookable: boolean;
}

/**
 * A single pricing category (e.g. "Repairs") rendered as a card: title,
 * optional note, and a clean list of name/price rows. When `bookable`,
 * each row gets a "Book Service" action that pre-fills the appointment
 * form's dropdown and scrolls the user there.
 */
export function ServiceCategoryCard({ category, bookable }: ServiceCategoryCardProps) {
  const Icon = CATEGORY_ICONS[category.id] ?? ClipboardList;
  const tone = category.id === "additional-charges" ? "accent" : "primary";

  return (
    <Card className="p-7">
      <div className="flex items-start gap-4 mb-5">
        <IconBadge icon={Icon} tone={tone} size="md" />
        <div>
          <h3 className="font-heading font-bold text-ink text-lg leading-tight">{category.title}</h3>
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
              <span
                className={cn(
                  "shrink-0 font-display font-bold text-base sm:text-lg tabular-nums",
                  tone === "accent" ? "text-accent-strong" : "text-primary",
                )}
              >
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
    </Card>
  );
}