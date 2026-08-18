/**
 * StockBadge — compact coloured dot + text for stock availability.
 * Used inside ProductCard.
 *
 * Props:
 *   status {string} — availabilityStatus from API (e.g. "In Stock", "Out of Stock")
 *   stock  {number} — numeric stock count
 */
export default function StockBadge({ status, stock }) {
  const isOut = status === "Out of Stock" || stock === 0;
  const isLow = !isOut && stock > 0 && stock <= 10;

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-wide">
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
      >
        {isOut ? "Out of stock" : isLow ? `Only ${stock} left` : "In stock"}
      </span>
    </span>
  );
}
