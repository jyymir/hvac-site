/**
 * Central place for business identity & contact details.
 * Update this file to rebrand the site or change contact info —
 * nothing else should hardcode these values.
 */

export const SITE_CONFIG = {
  name: "Comfort Zone HVAC",
  shortName: "Comfort Zone",
  tagline: "Your Comfort Is Our Priority",
  foundedYear: 2026,
  phone: {
    display: "+1 (919) 930-0786",
    href: "tel:+19199300786",
  },
  email: {
    // Public-facing support inbox shown to site visitors.
    display: "comfortzoneservices@comfortzonehvacsolutions.com",
    href: "mailto:comfortzoneservices@comfortzonehvacsolutions.com",
  },
  // Internal recipient for appointment-request notifications.
  // Wired into src/services/notificationService.ts.
  businessOwnerEmail: "comfortzoneservices@comfortzonehvacsolutions.com",
  address: {
    line1: "2480 N. Central Ave",
    line2: "Phoenix, AZ 85004",
  },
  hours: {
    display: "Mon–Sat: 9am–8pm",
    emergency: "Emergency: 24/7",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61591962711348",
    instagram: "https://www.instagram.com/comfortzonehvac.llc",
    twitter: "https://twitter.com",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/d/u/0/embed?mid=12IAsy36pQ55cNrLzA0HCiPcik5qa45Y&ehbc=2E312F&noprof=1",
} as const;
