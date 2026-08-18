import { useState } from "react";
import { Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Stars from "../common/Stars";
import RibbonTag from "../common/RibbonTag";
import StockDot from "./StockDot";
import QuantityStepper from "./QuantityStepper";
import AccordionItem from "./AccordionItem";

/**
 * Details — product information and purchase actions panel.
 *
 * Props:
 *   product {object} — full product object from the API
 */
export default function Details({ product }) {
  const {
    title,
    brand,
    price,
    discountPercentage,
    rating,
    reviews = [],
    stock,
    availabilityStatus,
    description,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    sku,
    weight,
    dimensions,
    minimumOrderQuantity = 1,
  } = product;

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const hasDiscount = discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? price - (price * discountPercentage) / 100
    : price;
  const isOut = availabilityStatus === "Out of Stock" || stock === 0;

  return (
    <div>
      {/* Brand */}
      {brand && (
        <p className="text-stone mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          {brand}
        </p>
      )}

      {/* Title */}
      <h1 className="font-display text-ink mb-3 text-[34px] leading-tight sm:text-[40px]">
        {title}
      </h1>

      {/* Rating */}
      <div className="mb-4 flex items-center gap-3">
        <Stars rating={rating} />
        <a
          href="#reviews"
          className="text-stone text-[12.5px] hover:text-rose transition-colors duration-300"
        >
          {rating?.toFixed(2)} · {reviews.length} review
          {reviews.length === 1 ? "" : "s"}
        </a>
      </div>

      {/* Price */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="font-display text-ink text-[28px]">
          ${discountedPrice.toFixed(2)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-stone text-[16px] line-through">
              ${price.toFixed(2)}
            </span>
            <RibbonTag>Save {Math.round(discountPercentage)}%</RibbonTag>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-stone mb-6 max-w-md text-[14.5px] leading-relaxed">
        {description}
      </p>

      {/* Stock status */}
      <div className="mb-6">
        <StockDot status={availabilityStatus} stock={stock} />
      </div>

      {/* Actions: quantity + add to bag + wishlist */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <QuantityStepper
          quantity={quantity}
          setQuantity={setQuantity}
          min={1}
          max={stock || 99}
        />

        <button
          type="button"
          disabled={isOut}
          onClick={() => setAdded(true)}
          aria-label={added ? "Item added to bag" : "Add to bag"}
          className={`flex flex-1 items-center justify-center gap-2 px-8 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-cream transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-initial cursor-pointer ${
            added ? "bg-stock-in" : "bg-ink hover:bg-rose-dark"
          }`}
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {added ? "Added to bag" : "Add to bag"}
        </button>

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="border-hair flex h-11.5 w-11.5 shrink-0 items-center justify-center border transition-all duration-300 cursor-pointer"
        >
          <Heart
            className={`h-4.5 w-4.5 transition-colors ${
              liked ? "fill-rose text-rose" : "fill-none text-ink"
            }`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Minimum order notice */}
      {minimumOrderQuantity > 1 && (
        <p className="text-stone mb-6 text-[12px]">
          Minimum order quantity: {minimumOrderQuantity} units
        </p>
      )}

      {/* Shipping / warranty / returns */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="text-stone flex items-center gap-2 text-[12px]">
          <Truck className="text-rose h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          {shippingInformation}
        </div>
        <div className="text-stone flex items-center gap-2 text-[12px]">
          <ShieldCheck className="text-rose h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          {warrantyInformation}
        </div>
        <div className="text-stone flex items-center gap-2 text-[12px]">
          <RotateCcw className="text-rose h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          {returnPolicy}
        </div>
      </div>

      {/* Accordions */}
      <div className="border-t border-hair transition-colors duration-300">
        <AccordionItem title="Product details" defaultOpen>
          <ul className="space-y-1">
            <li>SKU: {sku}</li>
            <li>Weight: {weight}g</li>
            {dimensions && (
              <li>
                Dimensions: {dimensions.width} × {dimensions.height} ×{" "}
                {dimensions.depth} cm
              </li>
            )}
          </ul>
        </AccordionItem>
        <AccordionItem title="Shipping & returns">
          <p>
            {shippingInformation}. {returnPolicy}.
          </p>
        </AccordionItem>
      </div>
    </div>
  );
}
