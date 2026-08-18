import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import CategoryCard from "./CategoryCard";
import { CATEGORIES } from "../../data/homeData";

/**
 * CategoryStrip — "Find your ritual" category grid section.
 */
export default function CategoryStrip() {
  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20"
      aria-labelledby="categories-heading"
    >
      <div className="mb-10 flex items-end justify-between">
        <div>
          <Eyebrow>Shop by category</Eyebrow>
          <h2
            id="categories-heading"
            className="font-display text-ink text-[30px] leading-tight"
          >
            Find your ritual
          </h2>
        </div>
        <Link
          to="/products"
          className="text-rose hover:text-rose-dark hidden text-[12.5px] font-medium uppercase tracking transition-colors duration-300 sm:inline-flex sm:items-center sm:gap-1"
          aria-label="View all categories"
        >
          View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>

      <ul
        className="grid grid-cols-1 gap-5 sm:grid-cols-3"
        role="list"
        aria-label="Product categories"
      >
        {CATEGORIES.map((cat) => (
          <li key={cat.name} role="listitem">
            <CategoryCard category={cat} />
          </li>
        ))}
      </ul>
    </section>
  );
}
