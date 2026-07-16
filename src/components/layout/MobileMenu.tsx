import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/cn";

export interface MobileMenuProps {
  open: boolean;
  onNavigate: (sectionId: string) => void;
}

export function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "lg:hidden bg-white border-t border-border shadow-xl overflow-hidden transition-[max-height] duration-300",
        open ? "max-h-96" : "max-h-0",
      )}
    >
      <ul className="flex flex-col py-2">
        {NAV_LINKS.map((link) => (
          <li key={link.sectionId}>
            <button
              type="button"
              onClick={() => onNavigate(link.sectionId)}
              tabIndex={open ? 0 : -1}
              className="w-full text-left px-6 py-3.5 text-ink font-medium hover:bg-primary-light hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
