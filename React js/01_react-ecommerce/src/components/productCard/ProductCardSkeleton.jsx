export default function ProductCardSkeleton() {
  return (
    <div className="w-full h-full max-w-70 overflow-hidden rounded-xs border border-hair bg-cream animate-pulse transition-colors duration-300">
      {/* Image */}
      <div className="relative aspect-4/5 bg-image-bg transition-colors duration-300">
        {/* Discount Badge */}
        <div className="absolute left-3 top-3 h-6 w-16 rounded-sm bg-skeleton-bg transition-colors duration-300" />

        {/* Wishlist */}
        <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-skeleton-bg transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="px-4 pt-3.5 pb-4">
        {/* Brand */}
        <div className="mb-2 h-3 w-16 rounded bg-skeleton-bg transition-colors duration-300" />

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-5 w-5/6 rounded bg-skeleton-bg transition-colors duration-300" />
          <div className="h-5 w-2/3 rounded bg-skeleton-bg transition-colors duration-300" />
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3.5 w-3.5 rounded-full bg-skeleton-bg transition-colors duration-300"
              />
            ))}
          </div>

          <div className="h-3 w-24 rounded bg-skeleton-bg transition-colors duration-300" />
        </div>

        {/* Divider */}
        <div className="mb-3 h-px w-full bg-hair transition-colors duration-300" />

        {/* Price + Stock */}
        <div className="mb-4 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 rounded bg-skeleton-bg transition-colors duration-300" />
            <div className="h-4 w-12 rounded bg-skeleton-bg transition-colors duration-300" />
          </div>

          <div className="h-4 w-20 rounded bg-skeleton-bg transition-colors duration-300" />
        </div>

        {/* Button */}
        <div className="h-10 w-full rounded-xs bg-skeleton-bg transition-colors duration-300" />
      </div>
    </div>
  );
}