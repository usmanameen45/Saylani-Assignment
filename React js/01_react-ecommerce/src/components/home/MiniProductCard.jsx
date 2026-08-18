import Stars from "../common/Stars";
import RibbonTag from "../common/RibbonTag";

/**
 * MiniProductCard — compact product card used in the Featured Products grid.
 *
 * Props:
 *   product {{ id, title, brand, price, discountPercentage, rating, reviews, seed }}
 */
export default function MiniProductCard({ product }) {
  const hasDiscount = product.discountPercentage > 0;
  const discounted = hasDiscount
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price;

  return (
    <article className="group">
      <div className="bg-blush relative aspect-4/5 overflow-hidden transition-colors duration-300">
        <img
          src={`https://picsum.photos/seed/${product.seed}/600/750`}
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
        <span className="text-stone text-[11px]">({product.reviews})</span>
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
    </article>
  );
}
