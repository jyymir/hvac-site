import { useCallback, useState } from "react";
import {
  EMPTY_APPOINTMENT_FORM,
  type AppointmentFormData,
  type AppointmentFormErrors,
  type SubmitStatus,
} from "./types";
import { validateAppointmentForm, isFormValid } from "./validation";
import { submitAppointment } from "@/services/appointmentApi";

export function useAppointmentForm() {
  const [formData, setFormData] = useState<AppointmentFormData>(EMPTY_APPOINTMENT_FORM);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof AppointmentFormData, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const updateField = useCallback(
    <K extends keyof AppointmentFormData>(field: K, value: AppointmentFormData[K]) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };
        // Re-validate live once a field has been touched, so errors clear
        // immediately as the user fixes them instead of waiting for submit.
        setErrors((prevErrors) => {
          if (!touched[field]) return prevErrors;
          const nextErrors = validateAppointmentForm(next);
          return { ...prevErrors, [field]: nextErrors[field] };
        });
        return next;
      });
    },
    [touched],
  );

  const markTouched = useCallback((field: keyof AppointmentFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validateAppointmentForm(formData);
      setErrors(validationErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        service: true,
        preferredDateTime: true,
        notes: true,
        website: true,
      });

      if (!isFormValid(validationErrors)) {
        setStatus("error");
        setStatusMessage("Please fix the highlighted fields and try again.");
        return;
      }

      setStatus("submitting");
      setStatusMessage("");

      try {
        // Pass the full formData directly to the API service.
        // The API layer will securely filter out the honeypot 'website' field.
        const result = await submitAppointment(formData);
        
        setStatus("success");
        setStatusMessage(
          result.message || "Thanks! Your appointment request has been sent — we'll confirm shortly.",
        );
        setFormData(EMPTY_APPOINTMENT_FORM);
        setTouched({});
      } catch (err) {
        setStatus("error");
        setStatusMessage(
          err instanceof Error
            ? err.message
            : "Something went wrong submitting your request. Please call us instead.",
        );
      }
    },
    [formData],
  );

  return {
    formData,
    errors,
    touched,
    status,
    statusMessage,
    updateField,
    markTouched,
    handleSubmit,
  };
}