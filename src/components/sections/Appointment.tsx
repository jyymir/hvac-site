import { Calendar, Phone, Mail, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppointmentForm } from "@/features/appointment/AppointmentForm";
import { SITE_CONFIG } from "@/data/siteConfig";

const CONTACT_LINES: { icon: LucideIcon; label: string }[] = [
  { icon: Phone, label: SITE_CONFIG.phone.display },
  { icon: Mail, label: SITE_CONFIG.email.display },
  { icon: Clock, label: `${SITE_CONFIG.hours.display} | ${SITE_CONFIG.hours.emergency}` },
];

export function Appointment() {
  return (
    <section id="appointment" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-border">
          <div className="grid lg:grid-cols-5">
            <div
              className="lg:col-span-2 p-10 flex flex-col justify-center"
              style={{ background: "linear-gradient(160deg, #1E73BE 0%, #0d3d6b 100%)" }}
            >
              <Calendar className="w-12 h-12 text-accent mb-6" aria-hidden="true" />
              <h2 className="font-display font-bold text-4xl text-white leading-tight mb-4">
                BOOK YOUR
                <br />
                APPOINTMENT
              </h2>
              <p className="text-blue-100 leading-relaxed mb-8">
                Fill out the form and one of our experts will confirm your appointment within 2
                hours.
              </p>
              <ul className="space-y-4">
                {CONTACT_LINES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-start gap-3 text-blue-100 text-sm">
                    <Icon className="w-4 h-4 text-accent mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 p-10">
              <h3 className="font-heading font-bold text-2xl text-ink mb-7">Request a Service</h3>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
