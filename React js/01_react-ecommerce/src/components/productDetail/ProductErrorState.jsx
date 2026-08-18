import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

/**
 * ProductErrorState — error UI displayed when a product fails to load.
 *
 * Props:
 *   onRetry {function} — callback to retry the fetch
 */
export default function ProductErrorState({ onRetry }) {
  return (
    <div
      className="bg-cream transition-colors duration-300"
      role="alert"
      aria-live="assertive"
    >
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
        <AlertCircle
          className="text-rose mb-4 h-8 w-8"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="font-display text-ink mb-2 text-[24px]">
          We couldn't load this product
        </h2>
        <p className="text-stone mb-7 text-[13.5px]">
          Something went wrong fetching this item. It may no longer exist, or
          there was a connection issue.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="bg-ink hover:bg-rose-dark px-6 py-2.5 text-[12.5px] font-medium uppercase tracking text-white transition-colors duration-300 cursor-pointer"
          >
            Try again
          </button>
          <Link
            to="/products"
            className="border-hair text-ink hover:text-rose px-6 py-2.5 text-[12.5px] font-medium uppercase tracking border transition-colors duration-300"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
