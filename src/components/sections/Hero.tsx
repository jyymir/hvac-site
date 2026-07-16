import { Calendar, ArrowRight, Shield, Clock, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/scrollToSection";

const TRUST_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Shield, label: "Experienced & Professional" },
  { icon: Clock, label: "24/7 Emergency" },
  { icon: Award, label: "Over 14 Communities Serving" },
];

const STATS = [
  { value: "5,000+", label: "Community Members" },
  { value: "14+", label: "Counties Served" },
  { value: "24/7", label: "Emergency Support" },
  { value: "5★", label: "Service Provided" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{
        background: "linear-gradient(135deg, #0d3d6b 0%, #1E73BE 45%, #1a5fa0 70%, #0d3d6b 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-primary-dark/80" />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10"
        style={{ background: "linear-gradient(135deg, transparent 0%, #F58220 100%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-white/90 text-sm font-medium">Available 24/7 for Emergencies</span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl xl:text-7xl leading-tight text-white mb-6">
            YOUR COMFORT
            <br />
            <span className="text-accent">IS OUR</span>
            <br />
            PRIORITY
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
            Reliable heating &amp; cooling services for homes and businesses. Trusted by thousands of customers across multiple counties.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="accent"
              size="lg"
              icon={<Calendar className="w-5 h-5" />}
              onClick={() => scrollToSection("appointment")}
            >
              Schedule Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              onClick={() => scrollToSection("services")}
            >
              View Services
            </Button>
          </div>

          <ul className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-white/80">
                <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-4" aria-label="Company highlights">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
            >
              <div className="font-display font-bold text-4xl text-accent mb-1">{value}</div>
              <div className="text-white/80 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 0 900 60 720 40C540 20 240 60 0 20L0 80Z" fill="#f7f8fa" />
        </svg>
      </div>
    </section>
  );
}