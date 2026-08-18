import { Link } from "react-router";
import RibbonTag from "../common/RibbonTag";

/**
 * CategoryCard — a single category image card with ribbon tag.
 *
 * Props:
 *   category {{ name: string, tag: string, seed: string }}
 */
export default function CategoryCard({ category }) {
  return (
    <Link
      to="/products"
      className="group relative block overflow-hidden"
      aria-label={`Shop ${category.name}`}
    >
      <div className="absolute left-3 top-3 z-10">
        <RibbonTag>{category.tag}</RibbonTag>
      </div>
      <div className="bg-blush aspect-3/4 overflow-hidden transition-colors duration-300">
        <img
          src={`https://picsum.photos/seed/${category.seed}/500/650`}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <p className="font-display text-ink mt-3 text-[17px]">{category.name}</p>
    </Link>
  );
}
