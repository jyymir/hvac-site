import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/data/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavigate("hero"); }}>
          <Logo light={!scrolled} />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              {link.sectionId === "appointment" ? (
                <Button variant="accent" size="md" className="ml-3" onClick={() => handleNavigate(link.sectionId)}>
                  {link.label}
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNavigate(link.sectionId)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    scrolled
                      ? "text-ink hover:text-primary hover:bg-primary-light"
                      : "text-white/90 hover:text-white hover:bg-white/10",
                  )}
                >
                  {link.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={cn("lg:hidden p-2.5 rounded-lg", scrolled ? "text-ink" : "text-white")}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      <MobileMenu open={menuOpen} onNavigate={handleNavigate} />
    </nav>
  );
}