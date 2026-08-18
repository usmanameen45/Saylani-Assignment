import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import RelatedProductCard from "./RelatedProductCard";

/**
 * RelatedProducts — "You may also like" product grid section.
 *
 * Props:
 *   items {object[]} — array of related product objects
 */
export default function RelatedProducts({ items }) {
  if (!items?.length) return null;

  return (
    <section
      className="bg-blush py-16 lg:py-20 transition-colors duration-300"
      aria-labelledby="related-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-rose mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
              Complete the routine
            </p>
            <h2
              id="related-heading"
              className="font-display text-ink text-[30px] leading-tight"
            >
              You may also like
            </h2>
          </div>
          <Link
            to="/products"
            className="text-rose hover:text-rose-dark hidden text-[12.5px] font-medium uppercase tracking sm:inline-flex sm:items-center sm:gap-1 transition-colors duration-300"
            aria-label="Shop all products"
          >
            Shop all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <ul
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
          role="list"
          aria-label="Related products"
        >
          {items.map((p) => (
            <li key={p.id} role="listitem">
              <RelatedProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
