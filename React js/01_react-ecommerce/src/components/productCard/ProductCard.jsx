import { useState } from "react";
import { Star, Heart, ShoppingBag } from "lucide-react";

function StockBadge({ status, stock }) {
  const isOut = status === "Out of Stock" || stock === 0;
  const isLow = !isOut && stock > 0 && stock <= 10;

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-wide">
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
          isOut ? "bg-stock-out" : isLow ? "bg-stock-low" : "bg-stock-in"
        }`}
      />
      <span className={`transition-colors duration-300 ${
        isOut ? "text-stock-out" : isLow ? "text-stock-low" : "text-stock-in"
      }`}>
        {isOut ? "Out of stock" : isLow ? `Only ${stock} left` : "In stock"}
      </span>
    </span>
  );
}

function Stars({ rating }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = rounded - i >= 1 ? 1 : rounded - i === 0.5 ? 0.5 : 0;
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star
              className="absolute inset-0 h-3.5 w-3.5 text-gold"
              strokeWidth={1.25}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className="h-3.5 w-3.5 text-gold fill-gold"
                strokeWidth={1.25}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}

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
    <div
      className="group relative w-full h-full max-w-70 overflow-hidden rounded-xs transition-all duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)] bg-cream border border-hair"
    >
      {/* Image stage */}
      <div className="relative aspect-4/5 overflow-hidden bg-image-bg transition-colors duration-300">
        <img
          src={imageSrc}
          alt={title}
          onError={() => setImgError(true)}
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Discount ribbon — folded fabric price-tag motif */}
        {hasDiscount && (
          <div
            className="absolute left-3 top-3 flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white bg-rose shadow-sm"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            <span
              className="mr-0.5 inline-block h-1.5 w-1.5 rounded-full bg-cream transition-colors duration-300"
            />
            −{Math.round(discountPercentage)}%
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              liked ? "text-rose fill-rose" : "text-ink fill-none"
            }`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-3.5">
        {/* Brand eyebrow */}
        {brand && (
          <p
            className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone"
          >
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
            {rating?.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mb-3 h-px w-full bg-hair transition-colors duration-300" />

        {/* Price + stock */}
        <div className="mb-3.5 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="text-[20px] leading-none font-display text-ink"
            >
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span
                className="text-[13px] line-through text-stone"
              >
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
          className="flex w-full items-center justify-center gap-2 rounded-xs py-2.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-white bg-ink hover:bg-rose-dark transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
          Add to bag
        </button>
      </div>
    </div>
  );
}
