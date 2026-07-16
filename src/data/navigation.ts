export interface NavLink {
  label: string;
  sectionId: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", sectionId: "hero" },
  { label: "About Us", sectionId: "about" },
  { label: "Services", sectionId: "services" },
  { label: "Make Appointment", sectionId: "appointment" },
  { label: "Contact Us", sectionId: "contact" },
];
