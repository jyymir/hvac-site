/**
 * Tiny decoupling layer between "Book Service" triggers (Services section)
 * and the appointment form's service dropdown (AppointmentForm), so neither
 * component needs to know about the other or be lifted into a shared parent.
 */
export const SELECT_SERVICE_EVENT = "cz:select-service";

export interface SelectServiceEventDetail {
  serviceName: string;
}

/**
 * Fires a `cz:select-service` custom event carrying the chosen service name,
 * then smoothly scrolls the page to the #appointment section. AppointmentForm
 * listens for this event and pre-fills its dropdown accordingly.
 */
export function selectServiceAndScroll(serviceName: string) {
  window.dispatchEvent(
    new CustomEvent<SelectServiceEventDetail>(SELECT_SERVICE_EVENT, {
      detail: { serviceName },
    }),
  );

  const target = document.getElementById("appointment");
  if (!target) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
}