import { cn } from "@/lib/cn";
import { SITE_CONFIG } from "@/data/siteConfig";
import logoMark from "@/assets/brand/logo.png";

export interface LogoProps {
  /** Use the light (white) treatment, e.g. on dark/transparent nav or footer. */
  light?: boolean;
  className?: string;
}

/**
 * Brand lockup: official logo mark + wordmark. The mark PNG has its
 * background removed so it reads cleanly on both the transparent (hero)
 * and solid-white (scrolled) navbar states, as well as the dark footer.
 */
export function Logo({ light = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="h-9 w-auto sm:h-10 shrink-0 drop-shadow-sm"
        width={500}
        height={296}
      />
      <div>
        <div
          className={cn(
            "font-display font-bold text-lg leading-none tracking-wide",
            light ? "text-white" : "text-primary",
          )}
        >
          {SITE_CONFIG.shortName.toUpperCase()}
        </div>
        <div
          className={cn(
            "font-display font-semibold text-xs tracking-[0.2em] uppercase",
            // Bright accent reads well on the dark nav/footer background;
            // the darker accent-strong keeps AA contrast on white.
            light ? "text-accent" : "text-accent-strong",
          )}
        >
          HVAC
        </div>
      </div>
    </div>
  );
}