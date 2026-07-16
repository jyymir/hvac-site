import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCategoryCard } from "@/components/sections/ServiceCard";
import { ServiceCallsRepairsCard } from "@/components/sections/ServiceCallsRepairsCard";
import { SERVICES_DATA, SERVICE_TABS, BOOKABLE_CATEGORY_IDS } from "@/data/services";
import { cn } from "@/lib/cn";

export function Services() {
  const [activeTab, setActiveTab] = useState<string>(SERVICE_TABS[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeTabIndex = SERVICE_TABS.findIndex((tab) => tab.id === activeTab);

  /** Roving-tabindex arrow key navigation, per the WAI-ARIA tabs pattern. */
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % SERVICE_TABS.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + SERVICE_TABS.length) % SERVICE_TABS.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = SERVICE_TABS.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = SERVICE_TABS[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  const activeCategories = SERVICES_DATA.filter((category) =>
    SERVICE_TABS[activeTabIndex]?.categoryIds.includes(category.id),
  );

  return (
    <section
      id="services"
      className="py-16 md:py-24 scroll-mt-20"
      style={{ background: "linear-gradient(180deg, #e8f1fa 0%, #f7f8fa 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="OUR SERVICES & PRICING"
          description="Transparent, upfront pricing for the services we perform most. Every job starts with a diagnostic — final cost depends on the specific work involved."
        />

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Service categories"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {SERVICE_TABS.map((tab, index) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all border",
                  selected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-ink border-border hover:border-primary/40 hover:text-primary",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="grid sm:grid-cols-2 gap-6"
        >
          {activeTab === "calls-repairs" ? (
            <ServiceCallsRepairsCard categories={activeCategories} bookableCategoryIds={BOOKABLE_CATEGORY_IDS} />
          ) : (
            activeCategories.map((category) => (
              <ServiceCategoryCard
                key={category.id}
                category={category}
                bookable={BOOKABLE_CATEGORY_IDS.includes(category.id)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}