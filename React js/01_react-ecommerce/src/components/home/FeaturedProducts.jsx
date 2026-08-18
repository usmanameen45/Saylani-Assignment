import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import MiniProductCard from "./MiniProductCard";
import { FEATURED_PRODUCTS } from "../../data/homeData";

/**
 * FeaturedProducts — "Bestsellers this month" product grid section.
 */
export default function FeaturedProducts() {
  return (
    <section
      className="bg-blush py-16 lg:py-20 transition-colors duration-300"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Editor's picks</Eyebrow>
            <h2
              id="featured-heading"
              className="font-display text-ink text-[30px] leading-tight"
            >
              Bestsellers this month
            </h2>
          </div>
          <Link
            to="/products"
            className="text-rose hover:text-rose-dark hidden text-[12.5px] font-medium uppercase tracking transition-colors duration-300 sm:inline-flex sm:items-center sm:gap-1"
            aria-label="Shop all products"
          >
            Shop all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <ul
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
          role="list"
          aria-label="Featured products"
        >
          {FEATURED_PRODUCTS.map((p) => (
            <li key={p.id} role="listitem">
              <MiniProductCard product={p} />
            </li>
          ))}
        </ul>

        {/* Mobile CTA */}
        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            to="/products"
            className="text-ink border border-ink hover:bg-ink hover:text-cream inline-flex items-center gap-2 px-7 py-3 text-[12.5px] font-medium uppercase tracking transition-all duration-300"
          >
            Shop all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
