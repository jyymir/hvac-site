import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/sections/GalleryLightbox";
import { GALLERY_IMAGES, type GalleryImage } from "@/data/gallery";

export function Gallery() {
  const [expanded, setExpanded] = useState<GalleryImage | null>(null);

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 scroll-mt-20"
      style={{ background: "linear-gradient(180deg, #e8f1fa 0%, #f7f8fa 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Work"
          title="PREVIOUS INSTALLATIONS"
          description="A glimpse of the quality work we deliver on every job."
        />

        {/* Every tile below is a real photo from a completed job — no
            placeholder boxes, so the grid is sized to exactly fit them. */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((image) => (
            <li key={image.id}>
              <button
                type="button"
                onClick={() => setExpanded(image)}
                className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden aspect-square bg-primary-light"
                aria-label={`View larger photo: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity bg-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-primary text-xs sm:text-sm font-semibold shadow-lg">
                    View Photo
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {expanded && <GalleryLightbox image={expanded} onClose={() => setExpanded(null)} />}
      </div>
    </section>
  );
}
