import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

export interface GalleryLightboxProps {
  image: GalleryImage;
  onClose: () => void;
}

/**
 * Modal image preview. Traps scroll, closes on Escape or backdrop click,
 * and returns focus to the close button on open so keyboard users land
 * somewhere sensible.
 */
export function GalleryLightbox({ image, onClose }: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEscapeKey(onClose);
  useLockBodyScroll(true);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <div
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="w-full" />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg text-ink hover:text-primary"
          aria-label="Close photo preview"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
