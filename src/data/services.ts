export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  subtext?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  note?: string;
  items: ServiceItem[];
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "service-calls",
    title: "Service Calls",
    items: [
      { id: "diagnostic", name: "HVAC Diagnostic", price: "$125", subtext: "Repair not included" },
      { id: "maintenance", name: "Preventative Maintenance Tune-Up", price: "$145" },
    ],
  },
  {
    id: "repairs",
    title: "Repairs",
    note: "Labor only unless otherwise noted",
    items: [
      { id: "thermostat", name: "Thermostat Replacement", price: "$155" },
      { id: "capacitor", name: "Capacitor Replacement", price: "$135" },
      { id: "contactor", name: "Contactor Replacement", price: "$200" },
      { id: "drain-cleaning", name: "Condensate Drain Cleaning", price: "$75" },
      { id: "blower-motor", name: "Blower Motor Replacement", price: "$350" },
      { id: "fan-motor", name: "Condenser Fan Motor Replacement", price: "$400" },
      { id: "compressor", name: "Compressor Replacement", price: "$650" },
      { id: "refrigerant-recharge", name: "Refrigerant Recharge", price: "$75/lb" },
      { id: "leak-repair", name: "Refrigerant Leak Repair", price: "$600", subtext: "Refrigerant not included" },
    ],
  },
  {
    id: "installations",
    title: "Installations",
    items: [
      { id: "install-labor", name: "Condenser / Heat Pump Installation", price: "$1,750", subtext: "Starting at (Labor)" },
      { id: "duct-replace", name: "Full Ductwork Replacement", price: "$2,250", subtext: "Starting at" },
    ],
  },
  {
    id: "ductwork",
    title: "Ductwork",
    items: [{ id: "duct-repair", name: "Ductwork Repair", price: "$250 - $950" }],
  },
  {
    id: "additional-charges",
    title: "Additional Charges",
    items: [
      { id: "install-hourly", name: "Installation Labor", price: "$80/hr", subtext: "2 Hour Minimum" },
      { id: "access", name: "Restrictive Accessibility", price: "+$30", subtext: "Crawlspaces/Attics" },
      { id: "travel", name: "Travel", price: "+$25/hr", subtext: "1 Hour or More ($25 per hour of travel)" },
      { id: "materials", name: "Cost of Materials / Supplies", price: "VARIES" },
      { id: "refrigerant-type", name: "Type of Refrigerant", price: "VARIES" },
    ],
  },
];

/**
 * Category groupings used to power the Services tab UI. Kept alongside the
 * data (rather than hardcoded in the component) so adding/renaming/reordering
 * categories only ever requires editing this one file.
 */
export interface ServiceTab {
  id: string;
  label: string;
  categoryIds: string[];
}

export const SERVICE_TABS: ServiceTab[] = [
  { id: "calls-repairs", label: "Service Calls & Repairs", categoryIds: ["service-calls", "repairs"] },
  { id: "installs-ductwork", label: "Installations & Ductwork", categoryIds: ["installations", "ductwork"] },
  { id: "additional", label: "Additional Charges", categoryIds: ["additional-charges"] },
];

/** Categories whose items represent real, schedulable jobs (as opposed to flat/add-on fees). */
export const BOOKABLE_CATEGORY_IDS: string[] = ["service-calls", "repairs", "installations", "ductwork"];

/**
 * Flattened, booking-form-ready list of service names — every item from
 * every bookable category, in data order. "Additional Charges" is
 * intentionally excluded: those are fees, not services someone books.
 */
export function getBookableServiceNames(): string[] {
  return SERVICES_DATA.filter((category) => BOOKABLE_CATEGORY_IDS.includes(category.id)).flatMap((category) =>
    category.items.map((item) => item.name),
  );
}