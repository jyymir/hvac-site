import { sendAppointmentEmailJs } from "./notificationService";
import type { AppointmentFormData } from "@/features/appointment/types";

export async function submitAppointment(
  data: AppointmentFormData
): Promise<{ success: boolean; message: string }> {
  // Extract 'website' (honeypot field used for bot/spam protection)
  const { website, ...cleanData } = data;

  // If a bot filled out the hidden honeypot field, quietly reject it
  if (website) {
    return { 
      success: true, 
      message: "Your appointment request has been sent." 
    };
  }

  // Route the form directly through your EmailJS function instead of a server
  return await sendAppointmentEmailJs(cleanData);
}