import { Facebook, Instagram, ChevronRight, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/data/navigation";
import { SERVICES_DATA } from "@/data/services";
import { SITE_CONFIG } from "@/data/siteConfig";
import { scrollToSection } from "@/lib/scrollToSection";

const SOCIAL_LINKS: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Facebook, label: "Facebook", href: SITE_CONFIG.social.facebook },
  { icon: Instagram, label: "Instagram", href: SITE_CONFIG.social.instagram },
  // { icon: Twitter, label: "Twitter", href: SITE_CONFIG.social.twitter },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="text-blue-200 text-sm leading-relaxed mt-4 max-w-xs">
              Delivering reliable comfort solutions to homes and businesses throughout the
              Piedmont Triad area and Triangle Areas.
            </p>
            <ul className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Visit our ${label} page (opens in a new tab)`}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent-strong flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <h2 className="font-display font-bold text-lg text-accent tracking-wide mb-5">
              QUICK LINKS
            </h2>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-blue-200 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight
                      className="w-3 h-3 text-accent group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="font-display font-bold text-lg text-accent tracking-wide mb-5">
              OUR SERVICES
            </h2>
            <ul className="space-y-3">
              {SERVICES_DATA.map((category) => (
                <li key={category.id} className="text-blue-200 text-sm flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                  {category.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-300">
          <span>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-2 text-accent">
            <Users className="w-4 h-4" aria-hidden="true" />
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/jymir/"
              target="_blank"
              rel="noreferrer noopener"
              className="underline hover:text-white transition-colors"
            >
              Jy'Mir Fuller
            </a>
            <span aria-hidden="true" className="mx-1">
              &middot;
            </span>
            <span className="text-blue-300">Serving All Areas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}