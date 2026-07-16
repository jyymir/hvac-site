/**
 * Scrolls smoothly to a section, respecting the user's reduced-motion
 * preference, and moves focus there afterward so keyboard and screen-reader
 * users land on the new content instead of staying wherever they clicked
 * from. Used by every in-page nav/CTA (Navbar, Hero, About, Footer) so the
 * behavior is consistent site-wide.
 */
export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}