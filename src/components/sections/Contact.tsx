import { Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_CONFIG } from "@/data/siteConfig";

interface ContactCardData {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  href?: string;
  tone: "primary" | "accent";
}

const CONTACT_CARDS: ContactCardData[] = [
  {
    icon: Phone,
    label: "Phone",
    value: SITE_CONFIG.phone.display,
    sub: SITE_CONFIG.hours.display,
    href: SITE_CONFIG.phone.href,
    tone: "primary",
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email.display,
    sub: "We reply within 2 hours",
    href: SITE_CONFIG.email.href,
    tone: "accent",
  },
  {
    icon: Clock,
    label: "Hours",
    value: SITE_CONFIG.hours.display,
    sub: SITE_CONFIG.hours.emergency,
    tone: "accent",
  },
];

const SOCIAL_LINKS: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Facebook, label: "Facebook", href: SITE_CONFIG.social.facebook },
  { icon: Instagram, label: "Instagram", href: SITE_CONFIG.social.instagram },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 scroll-mt-20"
      style={{ background: "linear-gradient(180deg, #e8f1fa 0%, #d4e6f5 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Get In Touch" title="CONTACT US" />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {CONTACT_CARDS.map(({ icon: Icon, label, value, sub, href, tone }) => (
            <li
              key={label}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm text-center flex flex-col"
            >
              <span
                className={
                  "w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 " +
                  (tone === "primary" ? "bg-primary/10" : "bg-accent-strong/10")
                }
              >
                <Icon
                  className={tone === "primary" ? "w-6 h-6 text-primary" : "w-6 h-6 text-accent-strong"}
                  aria-hidden="true"
                />
              </span>
              <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-1">
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  className="font-semibold text-ink text-sm leading-snug hover:text-primary transition-colors break-words"
                >
                  {value}
                </a>
              ) : (
                <div className="font-semibold text-ink text-sm leading-snug break-words">{value}</div>
              )}
              <div className="text-xs text-muted mt-1">{sub}</div>
            </li>
          ))}

          {/* Social media card — clean icon links rather than printed URLs,
              matching the footer's icon treatment. */}
          <li className="bg-white rounded-2xl p-6 border border-border shadow-sm text-center flex flex-col">
            <span className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-primary/10">
              <Facebook className="w-6 h-6 text-primary" aria-hidden="true" />
            </span>
            <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">
              Social Media
            </div>
            <div className="flex items-center justify-center gap-3 mt-auto">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Visit our ${label} page (opens in a new tab)`}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="text-xs text-muted mt-2">Follow for updates &amp; promos</div>
          </li>
        </ul>

        {/* Updated Map Wrapper Container */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-border bg-surface-alt h-[300px] sm:h-[400px] relative w-full">
          <iframe
            title={`${SITE_CONFIG.name} location on Google Maps`}
            src={SITE_CONFIG.mapEmbedUrl}
            className="w-full h-[360px] sm:h-[460px] absolute -top-[60px] left-0 border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
