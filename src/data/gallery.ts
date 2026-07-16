import gallery01 from "@/assets/gallery/gallery-01.jpg";
import gallery02 from "@/assets/gallery/gallery-02.jpg";
import gallery03 from "@/assets/gallery/gallery-03.jpg";
import gallery04 from "@/assets/gallery/gallery-04.jpg";
import gallery05 from "@/assets/gallery/gallery-05.jpg";
import gallery06 from "@/assets/gallery/gallery-06.jpg";
import gallery07 from "@/assets/gallery/gallery-07.jpg";
import gallery08 from "@/assets/gallery/gallery-08.jpg";
import gallery09 from "@/assets/gallery/gallery-09.jpg";
import gallery10 from "@/assets/gallery/gallery-10.jpg";
import gallery11 from "@/assets/gallery/gallery-11.jpg";
import gallery12 from "@/assets/gallery/gallery-12.jpg";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

/**
 * Real job-site photos from completed service calls. Kept as local,
 * pre-compressed assets (not hotlinked stock photos) so the gallery loads
 * fast and shows our actual work.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "install-brazing", src: gallery01, alt: "Technician brazing a compressor line on a condenser unit" },
  { id: "dual-condenser", src: gallery02, alt: "Technician servicing dual condenser units at a residence" },
  { id: "coil-cleaning", src: gallery04, alt: "Condenser coil before a deep cleaning service" },
  { id: "gauge-diagnostics", src: gallery07, alt: "Technician reading refrigerant pressure gauges during diagnostics" },
  { id: "refrigerant-charge", src: gallery05, alt: "Weighing refrigerant during a system recharge" },
  { id: "capacitor-replacement", src: gallery08, alt: "Close-up of a dual-run capacitor during replacement" },
  { id: "compressor-swap", src: gallery03, alt: "Compressor replacement in progress on a rooftop unit" },
  { id: "control-board", src: gallery09, alt: "Wiring a control board during a repair" },
  { id: "contactor-repair", src: gallery11, alt: "Replacing a contactor in a condenser electrical panel" },
  { id: "goodman-unit", src: gallery10, alt: "Interior view of a Goodman condenser during service" },
  { id: "leak-search", src: gallery12, alt: "Checking pressure readings with gauges on an older condenser" },
  { id: "recovery-tank", src: gallery06, alt: "Technician wiring inside a condenser electrical compartment" },
];
