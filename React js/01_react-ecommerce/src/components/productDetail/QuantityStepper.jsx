import { Minus, Plus } from "lucide-react";

/**
 * QuantityStepper — +/- quantity control for the product detail page.
 *
 * Props:
 *   quantity    {number}   — current quantity value
 *   setQuantity {function} — state setter
 *   min         {number}   — minimum quantity
 *   max         {number}   — maximum quantity
 */
export default function QuantityStepper({ quantity, setQuantity, min, max }) {
  return (
    <div
      className="border-hair inline-flex items-center border transition-colors duration-300"
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQuantity((q) => Math.max(min, q - 1))}
        className="text-ink flex h-11 w-10 items-center justify-center disabled:opacity-30 cursor-pointer"
        disabled={quantity <= min}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>

      <span
        className="text-ink w-10 text-center text-[14px]"
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQuantity((q) => Math.min(max, q + 1))}
        className="text-ink flex h-11 w-10 items-center justify-center disabled:opacity-30 cursor-pointer"
        disabled={quantity >= max}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
