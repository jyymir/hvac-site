import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputClassName } from "./FormField";
import { useAppointmentForm } from "./useAppointmentForm";
import { getBookableServiceNames } from "@/data/services";
import { SELECT_SERVICE_EVENT, type SelectServiceEventDetail } from "@/lib/serviceSelection";
import { cn } from "@/lib/cn";

const BOOKABLE_SERVICE_NAMES = getBookableServiceNames();

/**
 * Fully client-validated appointment request form. On submit it calls
 * submitAppointment() (src/services/appointmentApi.ts), which is the
 * single connection point to the backend notification handler.
 */
export function AppointmentForm() {
  const { formData, errors, touched, status, statusMessage, updateField, markTouched, handleSubmit } =
    useAppointmentForm();

  const serviceSelectRef = useRef<HTMLSelectElement>(null);
  const [justPrefilled, setJustPrefilled] = useState(false);
  const prefillTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Listen for "Book Service" clicks fired from the Services section
  // (see src/lib/serviceSelection.ts) and pre-fill + focus the dropdown.
  useEffect(() => {
    function handleSelectService(event: Event) {
      const { serviceName } = (event as CustomEvent<SelectServiceEventDetail>).detail;
      updateField("service", serviceName);
      markTouched("service");

      serviceSelectRef.current?.focus();
      setJustPrefilled(true);
      if (prefillTimeoutRef.current) clearTimeout(prefillTimeoutRef.current);
      prefillTimeoutRef.current = setTimeout(() => setJustPrefilled(false), 1600);
    }

    window.addEventListener(SELECT_SERVICE_EVENT, handleSelectService);
    return () => {
      window.removeEventListener(SELECT_SERVICE_EVENT, handleSelectService);
      if (prefillTimeoutRef.current) clearTimeout(prefillTimeoutRef.current);
    };
  }, [updateField, markTouched]);

  const fieldError = (field: keyof typeof errors) => (touched[field] ? errors[field] : undefined);

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from sighted and AT users, bots tend to fill every field. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => updateField("website", e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField id="name" label="Full Name" required error={fieldError("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => markTouched("name")}
            aria-invalid={Boolean(fieldError("name"))}
            aria-describedby={fieldError("name") ? "name-error" : undefined}
            className={inputClassName}
          />
        </FormField>

        <FormField id="phone" label="Phone Number" required error={fieldError("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(480) 000-0000"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => markTouched("phone")}
            aria-invalid={Boolean(fieldError("phone"))}
            aria-describedby={fieldError("phone") ? "phone-error" : undefined}
            className={inputClassName}
          />
        </FormField>
      </div>

      <FormField id="email" label="Email Address" required error={fieldError("email")}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => markTouched("email")}
          aria-invalid={Boolean(fieldError("email"))}
          aria-describedby={fieldError("email") ? "email-error" : undefined}
          className={inputClassName}
        />
      </FormField>

      <FormField id="service" label="Service Needed" required error={fieldError("service")}>
        <select
          ref={serviceSelectRef}
          id="service"
          name="service"
          value={formData.service}
          onChange={(e) => updateField("service", e.target.value)}
          onBlur={() => markTouched("service")}
          aria-invalid={Boolean(fieldError("service"))}
          aria-describedby={fieldError("service") ? "service-error" : undefined}
          className={cn(
            inputClassName,
            "appearance-none",
            // Brief highlight when a service is pre-filled from the pricing
            // list, so the "jump" from Services to this field reads clearly.
            justPrefilled && "ring-2 ring-accent-strong border-accent-strong",
          )}
        >
          <option value="">Select a service…</option>
          {BOOKABLE_SERVICE_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="preferredDateTime"
        label="Requested Date & Time"
        required
        error={fieldError("preferredDateTime")}
      >
        <input
          id="preferredDateTime"
          name="preferredDateTime"
          type="datetime-local"
          value={formData.preferredDateTime}
          onChange={(e) => updateField("preferredDateTime", e.target.value)}
          onBlur={() => markTouched("preferredDateTime")}
          aria-invalid={Boolean(fieldError("preferredDateTime"))}
          aria-describedby={fieldError("preferredDateTime") ? "preferredDateTime-error" : undefined}
          className={inputClassName}
        />
      </FormField>

      <FormField id="notes" label="Notes" error={fieldError("notes")}>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Tell us a bit about the issue or job (optional)"
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          onBlur={() => markTouched("notes")}
          className={cn(inputClassName, "resize-none")}
        />
      </FormField>

      <Button type="submit" variant="accent" size="lg" className="w-full" isLoading={status === "submitting"}>
        Submit Request
      </Button>

      {/* Live region: announced to screen readers as soon as it changes,
          without needing focus to move there. */}
      <div role="status" aria-live="polite" className="min-h-6">
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm font-medium text-green-700">
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            {statusMessage}
          </p>
        )}
        {status === "error" && statusMessage && (
          <p className="flex items-center gap-2 text-sm font-medium text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}