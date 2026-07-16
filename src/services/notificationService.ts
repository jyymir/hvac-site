/**
 * ── OPTIONAL ALTERNATIVE: client-only notification via EmailJS ────────────
 *
 * If you don't want to run the Express server in /server, you can send the
 * appointment-request email straight from the browser using EmailJS
 * (https://www.emailjs.com). This file is NOT wired up by default — it's a
 * reference implementation. To use it instead of the backend:
 *
 *   1. npm install @emailjs/browser
 *   2. Create a free EmailJS account, an Email Service, and a Template that
 *      includes the fields below (name, email, phone, service, dateTime, notes).
 *   3. Add these to a .env file (Vite exposes anything prefixed VITE_):
 *        VITE_EMAILJS_SERVICE_ID=...
 *        VITE_EMAILJS_TEMPLATE_ID=...
 *        VITE_EMAILJS_PUBLIC_KEY=...
 *   4. In src/services/appointmentApi.ts, replace the fetch("/api/appointments")
 *      call with `sendAppointmentEmailJs(data)` from this file.
 *
 * Note: EmailJS only covers email. It cannot send SMS on its own — pair it
 * with a service like Twilio's serverless functions, or use the Express
 * handler in /server, which sends both.
 * ───────────────────────────────────────────────────────────────────────── */
import type { AppointmentFormData } from "@/features/appointment/types";

export async function sendAppointmentEmailJs(
  data: Omit<AppointmentFormData, "website">,
): Promise<{ success: boolean; message: string }> {
  // Lazy import so this optional dependency doesn't break the build for
  // teams that never install @emailjs/browser.
  const emailjs = await import("@emailjs/browser").catch(() => {
    throw new Error(
      "@emailjs/browser is not installed. Run `npm install @emailjs/browser` to use this alternative.",
    );
  });

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Missing EmailJS environment variables. See the comment at the top of this file.",
    );
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      client_name: data.name,
      client_email: data.email,
      client_phone: data.phone,
      service_requested: data.service,
      preferred_date_time: data.preferredDateTime,
      notes: data.notes || "—",
    },
    { publicKey },
  );

  return { success: true, message: "Your appointment request has been sent." };
}
