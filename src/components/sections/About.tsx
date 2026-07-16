import { Shield, Clock, HeartHandshake, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/data/siteConfig";
import aboutPhoto from "@/assets/brand/about.jpg";

const HIGHLIGHTS: { icon: LucideIcon; label: string; tone: "primary" | "accent" }[] = [
  { icon: Shield, label: "Trusted & Reliable", tone: "primary" },
  { icon: Clock, label: "24/7 Support", tone: "accent" },
  { icon: HeartHandshake, label: "Satisfactory Customer Service", tone: "primary" },
];

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={aboutPhoto}
                alt="Comfort Zone HVAC technician servicing a condenser unit compressor"
                loading="lazy"
                decoding="async"
                width={1000}
                height={750}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="font-display font-bold text-3xl">12+</div>
              <div className="text-sm text-blue-100">Services Provided</div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -top-4 -left-4 w-24 h-24 border-4 border-accent rounded-2xl opacity-50"
            />
          </div>

          <div>
            <p className="text-accent-strong font-semibold text-sm tracking-widest uppercase mb-3">
              About {SITE_CONFIG.name}
            </p>
            <h2 className="font-display font-bold text-4xl xl:text-5xl text-ink leading-tight mb-6">
              TRUSTED COMFORT
              <br />
              <span className="text-primary">SERVING OVER 14 COUNTIES</span>
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              {SITE_CONFIG.name} was founded on a simple promise: every customer deserves honest,
              reliable, and affordable HVAC service. From routine maintenance to full system
              replacements, our team of certified technicians brings professional-grade expertise
              directly to your door.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              We serve homeowners and businesses throughout the Piedmont Triad area and Triangle Areas,
              delivering consistent quality and the kind of service that earns referrals and not
              just reviews!
            </p>

            <ul className="grid grid-cols-3 gap-4 mb-8">
              {HIGHLIGHTS.map(({ icon: Icon, label, tone }) => (
                <li
                  key={label}
                  className="flex flex-col items-center text-center gap-2 p-4 bg-white rounded-2xl border border-border shadow-sm"
                >
                  <span
                    className={
                      tone === "primary"
                        ? "w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10"
                        : "w-10 h-10 rounded-xl flex items-center justify-center bg-accent-strong/10"
                    }
                  >
                    <Icon
                      className={tone === "primary" ? "w-5 h-5 text-primary" : "w-5 h-5 text-accent-strong"}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-xs font-semibold text-ink leading-tight">{label}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              icon={<ChevronRight className="w-5 h-5" />}
              iconPosition="right"
              onClick={() => scrollToSection("appointment")}
            >
              Get a Free Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
