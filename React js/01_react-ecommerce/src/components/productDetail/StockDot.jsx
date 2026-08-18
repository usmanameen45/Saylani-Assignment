/**
 * StockDot — coloured dot + text indicating product stock availability.
 * Used on the Product Detail page.
 *
 * Props:
 *   status {string} — availabilityStatus from the API
 *   stock  {number} — numeric stock count
 */
export default function StockDot({ status, stock }) {
  const isOut = status === "Out of Stock" || stock === 0;
  const isLow = !isOut && (status === "Low Stock" || (stock > 0 && stock <= 10));

  const label = isOut
    ? "Out of stock"
    : isLow
    ? `Only ${stock} left in stock`
    : "In stock";

  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px]">
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
          isOut ? "bg-stock-out" : isLow ? "bg-stock-low" : "bg-stock-in"
        }`}
        aria-hidden="true"
      />
      <span
        className={`transition-colors duration-300 ${
          isOut ? "text-stock-out" : isLow ? "text-stock-low" : "text-stock-in"
        }`}
        role="status"
        aria-live="polite"
      >
        {label}
      </span>
    </span>
  );
}
