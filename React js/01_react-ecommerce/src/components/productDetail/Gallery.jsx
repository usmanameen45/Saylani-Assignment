import { useState } from "react";

/**
 * Gallery — image gallery with thumbnail strip for the Product Detail page.
 *
 * Props:
 *   images {string[]} — array of image URLs
 *   title  {string}   — product title (used as alt text for main image)
 */
export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnail strip */}
      <div
        className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible"
        role="list"
        aria-label="Product thumbnails"
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            role="listitem"
            className={`h-16 w-14 shrink-0 overflow-hidden transition-all duration-300 sm:h-20 sm:w-16 border cursor-pointer ${
              active === i
                ? "border-rose opacity-100"
                : "border-hair opacity-75 hover:opacity-100"
            }`}
            aria-label={`View image ${i + 1} of ${images.length}`}
            aria-pressed={active === i}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="bg-blush flex-1 overflow-hidden transition-colors duration-300">
        <img
          src={images[active]}
          alt={title}
          className="aspect-4/5 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
