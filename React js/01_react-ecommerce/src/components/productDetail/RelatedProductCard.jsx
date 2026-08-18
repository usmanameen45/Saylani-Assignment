import { Link } from "react-router";
import RibbonTag from "../common/RibbonTag";
import Stars from "../common/Stars";

/**
 * RelatedProductCard — card linking to a related product.
 *
 * Props:
 *   product {object} — product object from the API
 */
export default function RelatedProductCard({ product }) {
  const hasDiscount = product.discountPercentage > 0;
  const discounted = hasDiscount
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      aria-label={`View ${product.title}`}
    >
      <div className="bg-blush relative aspect-4/5 overflow-hidden transition-colors duration-300">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {hasDiscount && (
          <div className="absolute left-3 top-3" aria-hidden="true">
            <RibbonTag>−{Math.round(product.discountPercentage)}%</RibbonTag>
          </div>
        )}
      </div>

      <p className="text-stone mb-1 mt-3 text-[10.5px] font-semibold uppercase tracking-[0.14em]">
        {product.brand}
      </p>
      <h3 className="font-display text-ink mb-1.5 text-[16.5px] leading-snug">
        {product.title}
      </h3>

      <div className="mb-1.5 flex items-center gap-1.5">
        <Stars rating={product.rating} />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-ink text-[15px]">
          ${discounted.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-stone text-[12px] line-through">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
}
