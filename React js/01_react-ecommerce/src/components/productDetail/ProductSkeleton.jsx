/**
 * ProductSkeleton — animated loading skeleton for the Product Detail page.
 */
export default function ProductSkeleton() {
  return (
    <div
      className="bg-cream transition-colors duration-300"
      aria-busy="true"
      aria-label="Loading product details"
    >
      <section className="mx-auto max-w-7xl animate-pulse px-6 py-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery skeleton */}
          <div className="flex gap-4">
            <div className="hidden flex-col gap-3 sm:flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-hair h-20 w-16 transition-colors duration-300"
                />
              ))}
            </div>
            <div className="bg-blush aspect-4/5 flex-1 transition-colors duration-300" />
          </div>

          {/* Details skeleton */}
          <div>
            <div className="bg-hair mb-3 h-3 w-20 transition-colors duration-300" />
            <div className="bg-hair mb-4 h-9 w-3/4 transition-colors duration-300" />
            <div className="bg-hair mb-6 h-4 w-40 transition-colors duration-300" />
            <div className="bg-hair mb-6 h-8 w-32 transition-colors duration-300" />
            <div className="bg-hair mb-2 h-3 w-full transition-colors duration-300" />
            <div className="bg-hair mb-2 h-3 w-full transition-colors duration-300" />
            <div className="bg-hair mb-8 h-3 w-2/3 transition-colors duration-300" />
            <div className="bg-hair h-12 w-full max-w-xs transition-colors duration-300" />
          </div>
        </div>
      </section>
    </div>
  );
}
