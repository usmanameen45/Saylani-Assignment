import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import Stars from "../common/Stars";
import RibbonTag from "../common/RibbonTag";
import StockBadge from "./StockBadge";

/**
 * ProductCard — product card used in the Products listing grid.
 *
 * Props:
 *   product {object} — product object from the API
 */
export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const {
    title,
    brand,
    price,
    discountPercentage,
    rating,
    reviews = [],
    stock,
    availabilityStatus,
    thumbnail,
    images,
  } = product;

  const hasDiscount = discountPercentage && discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? price - (price * discountPercentage) / 100
    : price;

  const imageSrc = !imgError ? images?.[0] || thumbnail : thumbnail;

  return (
    <article
      className="group relative w-full h-full max-w-70 overflow-hidden rounded-xs transition-all duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)] bg-cream border border-hair"
      aria-label={title}
    >
      {/* Image stage */}
      <div className="relative aspect-4/5 overflow-hidden bg-image-bg transition-colors duration-300">
        <img
          src={imageSrc}
          alt={title}
          onError={() => setImgError(true)}
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Discount ribbon */}
        {hasDiscount && (
          <div
            className="absolute left-3 top-3"
            aria-hidden="true"
          >
            <RibbonTag>−{Math.round(discountPercentage)}%</RibbonTag>
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // prevent Link navigation
            setLiked((v) => !v);
          }}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              liked ? "text-rose fill-rose" : "text-ink fill-none"
            }`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-3.5">
        {/* Brand eyebrow */}
        {brand && (
          <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone">
            {brand}
          </p>
        )}

        {/* Title */}
        <h3
          className="mb-1.5 line-clamp-2 h-[2.75em] text-[19px] leading-snug font-display text-ink"
          title={title}
        >
          {title}
        </h3>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <Stars rating={rating || 0} />
          <span className="text-[11.5px] text-stone">
            {rating?.toFixed(1)} · {reviews.length} review
            {reviews.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mb-3 h-px w-full bg-hair transition-colors duration-300" />

        {/* Price + stock */}
        <div className="mb-3.5 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-[20px] leading-none font-display text-ink">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-[13px] line-through text-stone">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <StockBadge status={availabilityStatus} stock={stock} />
        </div>

        {/* CTA */}
        <button
          type="button"
          disabled={availabilityStatus === "Out of Stock" || stock === 0}
          onClick={(e) => e.preventDefault()} // prevent Link navigation on button click
          className="flex w-full items-center justify-center gap-2 rounded-xs py-2.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-cream bg-ink hover:bg-rose-dark transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          Add to bag
        </button>
      </div>
    </article>
  );
}
