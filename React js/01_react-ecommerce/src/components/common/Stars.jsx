import { Star } from "lucide-react";

/**
 * Stars — shared star-rating display component.
 *
 * Props:
 *   rating {number}  — numeric rating (e.g. 4.3)
 *   size   {string}  — Tailwind size classes for each star (default "h-3.5 w-3.5")
 */
export default function Stars({ rating, size = "h-3.5 w-3.5" }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = rounded - i >= 1 ? 1 : rounded - i === 0.5 ? 0.5 : 0;
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            {/* Outline star (always visible) */}
            <Star
              className={`absolute inset-0 ${size} text-gold`}
              strokeWidth={1.25}
            />
            {/* Filled star clipped to fill percentage */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className={`${size} text-gold fill-gold`}
                strokeWidth={1.25}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}
