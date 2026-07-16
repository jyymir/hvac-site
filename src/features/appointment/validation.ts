import type { AppointmentFormData, AppointmentFormErrors } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts common US formats: (480) 555-0192, 480-555-0192, 480.555.0192, 4805550192,
// and optionally a leading +1. Intentionally permissive on separators.
const PHONE_PATTERN = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

/**
 * Validates the appointment form and returns a map of field -> error message.
 * An empty object means the form is valid. Pure function — easy to unit test.
 */
export function validateAppointmentForm(data: AppointmentFormData): AppointmentFormErrors {
  const errors: AppointmentFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your full name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  if (!data.service) {
    errors.service = "Please select a service.";
  }

  if (!data.preferredDateTime) {
    errors.preferredDateTime = "Please choose a preferred date and time.";
  } else {
    const chosen = new Date(data.preferredDateTime);
    if (Number.isNaN(chosen.getTime())) {
      errors.preferredDateTime = "That date/time doesn't look valid.";
    } else if (chosen.getTime() < Date.now()) {
      errors.preferredDateTime = "Please choose a date and time in the future.";
    }
  }

  // Honeypot: if it's filled in, silently treat as invalid (bot submission).
  // We don't reveal this to real users via UI, only surface a generic error.
  if (data.website.trim()) {
    errors.website = "Submission rejected.";
  }

  return errors;
}

export function isFormValid(errors: AppointmentFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
