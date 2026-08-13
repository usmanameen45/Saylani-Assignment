import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared small pieces                                                  */
/* ------------------------------------------------------------------ */

function Stars({ rating, size = "h-3.5 w-3.5" }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = rounded - i >= 1 ? 1 : rounded - i === 0.5 ? 0.5 : 0;
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <Star className={`absolute inset-0 ${size} text-gold`} strokeWidth={1.25} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${size} text-gold fill-gold`} strokeWidth={1.25} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function RibbonTag({ children }) {
  return (
    <span
      className="bg-rose inline-flex items-center px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-white"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
      }}
    >
      {children}
    </span>
  );
}

function StockDot({ status, stock }) {
  const isOut = status === "Out of Stock" || stock === 0;
  const isLow = !isOut && (status === "Low Stock" || (stock > 0 && stock <= 10));
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px]">
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
          isOut ? "bg-stock-out" : isLow ? "bg-stock-low" : "bg-stock-in"
        }`}
      />
      <span className={`transition-colors duration-300 ${
        isOut ? "text-stock-out" : isLow ? "text-stock-low" : "text-stock-in"
      }`}>
        {isOut ? "Out of stock" : isLow ? `Only ${stock} left in stock` : "In stock"}
      </span>
    </span>
  );
}

function Breadcrumb({ category, title }) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
      <nav className="text-stone flex items-center gap-2 text-[12px] transition-colors duration-300">
        <Link to="/" className="text-stone hover:text-rose transition-colors duration-300">Home</Link>
        <span>/</span>
        <Link to="/products" className="text-stone hover:text-rose capitalize transition-colors duration-300">{category}</Link>
        <span>/</span>
        <span className="text-ink truncate transition-colors duration-300">{title}</span>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                               */
/* ------------------------------------------------------------------ */

function Gallery({ images, title }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={`h-16 w-14 shrink-0 overflow-hidden transition-all duration-300 sm:h-20 sm:w-16 border cursor-pointer ${
              active === i ? "border-rose opacity-100" : "border-hair opacity-75 hover:opacity-100"
            }`}
            aria-label={`Show image ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="bg-blush flex-1 overflow-hidden transition-colors duration-300">
        <img
          src={images[active]}
          alt={title}
          className="aspect-4/5 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quantity stepper                                                      */
/* ------------------------------------------------------------------ */

function QuantityStepper({ quantity, setQuantity, min, max }) {
  return (
    <div className="border-hair inline-flex items-center border transition-colors duration-300">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQuantity((q) => Math.max(min, q - 1))}
        className="text-ink flex h-11 w-10 items-center justify-center disabled:opacity-30 cursor-pointer"
        disabled={quantity <= min}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span className="text-ink w-10 text-center text-[14px]">{quantity}</span>
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

/* ------------------------------------------------------------------ */
/* Accordion                                                             */
/* ------------------------------------------------------------------ */

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-hair transition-colors duration-300">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-ink flex w-full items-center justify-between py-4 text-left text-[13px] font-medium uppercase tracking-[0.08em] cursor-pointer"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={`text-stone h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          strokeWidth={1.5}
        />
      </button>
      {open && <div className="text-stone pb-4 text-[13.5px] leading-relaxed transition-colors duration-300">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Details panel                                                         */
/* ------------------------------------------------------------------ */

function Details({ product }) {
  const {
    title, brand, price, discountPercentage, rating, reviews = [],
    stock, availabilityStatus, description, shippingInformation,
    warrantyInformation, returnPolicy, sku, weight, dimensions,
    minimumOrderQuantity = 1,
  } = product;

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const hasDiscount = discountPercentage > 0;
  const discountedPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price;
  const isOut = availabilityStatus === "Out of Stock" || stock === 0;

  return (
    <div>
      {brand && (
        <p className="text-stone mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          {brand}
        </p>
      )}

      <h1 className="font-display text-ink mb-3 text-[34px] leading-tight sm:text-[40px]">
        {title}
      </h1>

      <div className="mb-4 flex items-center gap-3">
        <Stars rating={rating} />
        <a href="#reviews" className="text-stone text-[12.5px] hover:text-rose transition-colors duration-300">
          {rating?.toFixed(2)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}
        </a>
      </div>

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

      <p className="text-stone mb-6 max-w-md text-[14.5px] leading-relaxed">
        {description}
      </p>

      <div className="mb-6">
        <StockDot status={availabilityStatus} stock={stock} />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <QuantityStepper quantity={quantity} setQuantity={setQuantity} min={1} max={stock || 99} />

        <button
          type="button"
          disabled={isOut}
          onClick={() => setAdded(true)}
          className={`flex flex-1 items-center justify-center gap-2 px-8 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-initial cursor-pointer ${
            added ? "bg-stock-in" : "bg-ink hover:bg-rose-dark"
          }`}
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          {added ? "Added to bag" : "Add to bag"}
        </button>

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label="Add to wishlist"
          className="border-hair flex h-11.5 w-11.5 shrink-0 items-center justify-center border transition-all duration-300 cursor-pointer"
        >
          <Heart
            className={`h-4.5 w-4.5 transition-colors ${
              liked ? "fill-rose text-rose" : "fill-none text-ink"
            }`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {minimumOrderQuantity > 1 && (
        <p className="text-stone mb-6 text-[12px]">
          Minimum order quantity: {minimumOrderQuantity} units
        </p>
      )}

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="text-stone flex items-center gap-2 text-[12px]">
          <Truck className="text-rose h-4 w-4 shrink-0" strokeWidth={1.5} />
          {shippingInformation}
        </div>
        <div className="text-stone flex items-center gap-2 text-[12px]">
          <ShieldCheck className="text-rose h-4 w-4 shrink-0" strokeWidth={1.5} />
          {warrantyInformation}
        </div>
        <div className="text-stone flex items-center gap-2 text-[12px]">
          <RotateCcw className="text-rose h-4 w-4 shrink-0" strokeWidth={1.5} />
          {returnPolicy}
        </div>
      </div>

      <div className="border-t border-hair transition-colors duration-300">
        <AccordionItem title="Product details" defaultOpen>
          <ul className="space-y-1">
            <li>SKU: {sku}</li>
            <li>Weight: {weight}g</li>
            {dimensions && (
              <li>
                Dimensions: {dimensions.width} × {dimensions.height} × {dimensions.depth} cm
              </li>
            )}
          </ul>
        </AccordionItem>
        <AccordionItem title="Shipping & returns">
          <p>{shippingInformation}. {returnPolicy}.</p>
        </AccordionItem>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Description / Reviews tabs                                            */
/* ------------------------------------------------------------------ */

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function ReviewsAndDescription({ product }) {
  const [tab, setTab] = useState("description");
  const { description, reviews = [], tags = [], rating } = product;

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="border-b border-hair mb-8 flex gap-8 transition-colors duration-300">
        {[
          { key: "description", label: "Description" },
          { key: "reviews", label: `Reviews (${reviews.length})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-[13px] font-medium uppercase tracking transition-colors border-b-2 cursor-pointer ${
              tab === t.key ? "text-ink border-rose" : "text-stone border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "description" ? (
        <div className="max-w-2xl">
          <p className="text-ink mb-6 text-[15px] leading-relaxed">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blush text-ink px-3 py-1 text-[11.5px] capitalize tracking-[0.06em] transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-display text-ink text-[42px] leading-none">
              {rating?.toFixed(1)}
            </span>
            <div>
              <Stars rating={rating} size="h-4 w-4" />
              <p className="text-stone mt-1 text-[12.5px]">
                Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((r, i) => (
              <div key={i} className={`pb-6 transition-colors duration-300 ${i < reviews.length - 1 ? "border-b border-hair" : ""}`}>
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-ink text-[13.5px] font-medium">{r.reviewerName}</p>
                  <span className="text-stone text-[11.5px]">{formatDate(r.date)}</span>
                </div>
                <div className="mb-2">
                  <Stars rating={r.rating} />
                </div>
                <p className="text-stone text-[13.5px] leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Related products                                                       */
/* ------------------------------------------------------------------ */

function RelatedProductCard({ product }) {
  const hasDiscount = product.discountPercentage > 0;
  const discounted = hasDiscount ? product.price - (product.price * product.discountPercentage) / 100 : product.price;

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-blush relative aspect-4/5 overflow-hidden transition-colors duration-300">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {hasDiscount && (
          <div className="absolute left-3 top-3">
            <RibbonTag>−{Math.round(product.discountPercentage)}%</RibbonTag>
          </div>
        )}
      </div>
      <p className="text-stone mb-1 mt-3 text-[10.5px] font-semibold uppercase tracking-[0.14em]">
        {product.brand}
      </p>
      <p className="font-display text-ink mb-1.5 text-[16.5px] leading-snug">
        {product.title}
      </p>
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

function RelatedProducts({ items }) {
  if (!items?.length) return null;
  return (
    <section className="bg-blush py-16 lg:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-rose mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
              Complete the routine
            </p>
            <h2 className="font-display text-ink text-[30px] leading-tight">
              You may also like
            </h2>
          </div>
          <Link to="/products" className="text-rose hover:text-rose-dark hidden text-[12.5px] font-medium uppercase tracking sm:inline-flex sm:items-center sm:gap-1 transition-colors duration-300">
            Shop all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {items.map((p) => (
            <RelatedProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Loading skeleton                                                        */
/* ------------------------------------------------------------------ */

function Skeleton() {
  return (
    <div className="bg-cream transition-colors duration-300">
      <section className="mx-auto max-w-7xl animate-pulse px-6 py-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex gap-4">
            <div className="hidden flex-col gap-3 sm:flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-hair h-20 w-16 transition-colors duration-300" />
              ))}
            </div>
            <div className="bg-blush aspect-4/5 flex-1 transition-colors duration-300" />
          </div>
          <div>
            <div className="bg-hair mb-3 h-3 w-20 transition-colors duration-300" />
            <div className="bg-hair mb-4 h-9 w-3/4 transition-colors duration-300" />
            <div className="bg-hair mb-6 h-4 w-40 transition-colors duration-300" />
            <div className="bg-hair mb-6 h-8 w-32 transition-colors duration-300" />
            <div className="bg-hair mb-2 h-3 w-full transition-colors duration-300" />
            <div className="bg-hair mb-2 h-3 w-full transition-colors duration-300" />
            <div className="bg-hair mb-8 h-3 w-2/3 transition-colors duration-300" />
            <div className="bg-hair h-12 w-full max-w-xs transition-colors duration-300" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Error state                                                              */
/* ------------------------------------------------------------------ */

function ErrorState({ onRetry }) {
  return (
    <div className="bg-cream transition-colors duration-300">
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
        <AlertCircle className="text-rose mb-4 h-8 w-8" strokeWidth={1.5} />
        <h2 className="font-display text-ink mb-2 text-[24px]">
          We couldn't load this product
        </h2>
        <p className="text-stone mb-7 text-[13.5px]">
          Something went wrong fetching this item. It may no longer exist, or there was a connection issue.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="bg-ink hover:bg-rose-dark px-6 py-2.5 text-[12.5px] font-medium uppercase tracking text-white transition-colors duration-300 cursor-pointer"
          >
            Try again
          </button>
          <Link
            to="/products"
            className="border-hair text-ink hover:text-rose px-6 py-2.5 text-[12.5px] font-medium uppercase tracking border transition-colors duration-300"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                     */
/* ------------------------------------------------------------------ */

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setProduct(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        if (cancelled) return;

        setProduct(data);
        setStatus("success");

        // Fetch related products from the same category
        if (data.category) {
          try {
            const relRes = await fetch(
              `https://dummyjson.com/products/category/${data.category}?limit=5`
            );
            const relData = await relRes.json();
            if (!cancelled) {
              setRelated(
                (relData.products || []).filter((p) => p.id !== data.id).slice(0, 4)
              );
            }
          } catch {
            if (!cancelled) setRelated([]);
          }
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  if (status === "loading") return <Skeleton />;
  if (status === "error" || !product) {
    return <ErrorState onRetry={() => setReloadKey((k) => k + 1)} />;
  }

  const galleryImages =
    product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="bg-cream transition-colors duration-300">
      <Breadcrumb category={product.category} title={product.title} />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={galleryImages} title={product.title} />
          <Details product={product} />
        </div>
      </section>

      <ReviewsAndDescription product={product} />
      <RelatedProducts items={related} />
    </div>
  );
}
