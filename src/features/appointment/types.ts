export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDateTime: string;
  notes: string;
  /** Honeypot field — real users never fill this in. Bots that auto-fill every field do. */
  website: string;
}

export const EMPTY_APPOINTMENT_FORM: AppointmentFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferredDateTime: "",
  notes: "",
  website: "",
};

export type AppointmentFormErrors = Partial<Record<keyof AppointmentFormData, string>>;

export type SubmitStatus = "idle" | "submitting" | "success" | "error";
