import { useState } from "react";
import Stars from "../common/Stars";
import { formatDate } from "../../utils/formatDate";

/**
 * ReviewsAndDescription — tabbed Description / Reviews section.
 *
 * Props:
 *   product {object} — full product object from the API
 */
export default function ReviewsAndDescription({ product }) {
  const [tab, setTab] = useState("description");
  const { description, reviews = [], tags = [], rating } = product;

  return (
    <section
      id="reviews"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20"
      aria-label="Product description and reviews"
    >
      {/* Tab bar */}
      <div
        className="border-b border-hair mb-8 flex gap-8 transition-colors duration-300"
        role="tablist"
        aria-label="Product information tabs"
      >
        {[
          { key: "description", label: "Description" },
          { key: "reviews", label: `Reviews (${reviews.length})` },
        ].map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`tabpanel-${t.key}`}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-[13px] font-medium uppercase tracking transition-colors border-b-2 cursor-pointer ${
              tab === t.key
                ? "text-ink border-rose"
                : "text-stone border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Description tab panel */}
      <div
        id="tabpanel-description"
        role="tabpanel"
        aria-labelledby="tab-description"
        hidden={tab !== "description"}
        className="max-w-2xl"
      >
        <p className="text-ink mb-6 text-[15px] leading-relaxed">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Product tags">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blush text-ink px-3 py-1 text-[11.5px] capitalize tracking-[0.06em] transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Reviews tab panel */}
      <div
        id="tabpanel-reviews"
        role="tabpanel"
        aria-labelledby="tab-reviews"
        hidden={tab !== "reviews"}
        className="max-w-2xl"
      >
        {/* Rating summary */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-ink text-[42px] leading-none" aria-hidden="true">
            {rating?.toFixed(1)}
          </span>
          <div>
            <Stars rating={rating} size="h-4 w-4" />
            <p className="text-stone mt-1 text-[12.5px]">
              Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {/* Individual reviews */}
        <ul className="space-y-6" aria-label="Customer reviews">
          {reviews.map((r, i) => (
            <li
              key={i}
              className={`pb-6 transition-colors duration-300 ${
                i < reviews.length - 1 ? "border-b border-hair" : ""
              }`}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-ink text-[13.5px] font-medium">{r.reviewerName}</p>
                <time
                  dateTime={r.date}
                  className="text-stone text-[11.5px]"
                >
                  {formatDate(r.date)}
                </time>
              </div>
              <div className="mb-2">
                <Stars rating={r.rating} />
              </div>
              <p className="text-stone text-[13.5px] leading-relaxed">{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
