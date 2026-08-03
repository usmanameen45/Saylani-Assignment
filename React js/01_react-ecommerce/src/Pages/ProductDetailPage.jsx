import React, { useEffect, useState } from "react";
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

const INK = "#241F1C";
const CREAM = "#FBF7F2";
const BLUSH = "#F3E4E1";
const ROSE = "#B3697A";
const ROSE_DARK = "#96525F";
const GOLD = "#A9822F";
const STONE = "#9C948C";
const HAIR = "#E7DFD6";

const DISPLAY_FONT =
  "'Cormorant Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif";

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
            <Star className={`absolute inset-0 ${size}`} strokeWidth={1.25} style={{ color: GOLD }} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={size} strokeWidth={1.25} fill={GOLD} style={{ color: GOLD }} />
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
      className="inline-flex items-center px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-white"
      style={{
        backgroundColor: ROSE,
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
  const color = isOut ? ROSE : isLow ? "#B8863B" : "#5F7A5A";
  const label = isOut ? "Out of stock" : isLow ? `Only ${stock} left in stock` : "In stock";
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px]">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span style={{ color }}>{label}</span>
    </span>
  );
}

function Breadcrumb({ category, title }) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
      <nav className="flex items-center gap-2 text-[12px]" style={{ color: STONE }}>
        <Link to="/" style={{ color: STONE }}>Home</Link>
        <span>/</span>
        <Link to="/products" className="capitalize" style={{ color: STONE }}>{category}</Link>
        <span>/</span>
        <span style={{ color: INK }} className="truncate">{title}</span>
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
            className="h-16 w-14 shrink-0 overflow-hidden transition-opacity sm:h-20 sm:w-16"
            style={{
              border: `1px solid ${active === i ? ROSE : HAIR}`,
              opacity: active === i ? 1 : 0.75,
            }}
            aria-label={`Show image ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden" style={{ backgroundColor: BLUSH }}>
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
    <div className="inline-flex items-center" style={{ border: `1px solid ${HAIR}` }}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQuantity((q) => Math.max(min, q - 1))}
        className="flex h-11 w-10 items-center justify-center disabled:opacity-30"
        disabled={quantity <= min}
        style={{ color: INK }}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span className="w-10 text-center text-[14px]" style={{ color: INK }}>{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQuantity((q) => Math.min(max, q + 1))}
        className="flex h-11 w-10 items-center justify-center disabled:opacity-30"
        disabled={quantity >= max}
        style={{ color: INK }}
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
    <div style={{ borderBottom: `1px solid ${HAIR}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-[13px] font-medium uppercase tracking-[0.08em]"
        style={{ color: INK }}
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className="h-4 w-4 transition-transform duration-200"
          strokeWidth={1.5}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: STONE }}
        />
      </button>
      {open && <div className="pb-4 text-[13.5px] leading-relaxed" style={{ color: STONE }}>{children}</div>}
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
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: STONE }}>
          {brand}
        </p>
      )}

      <h1 className="mb-3 text-[34px] leading-tight sm:text-[40px]" style={{ fontFamily: DISPLAY_FONT, color: INK }}>
        {title}
      </h1>

      <div className="mb-4 flex items-center gap-3">
        <Stars rating={rating} />
        <a href="#reviews" className="text-[12.5px]" style={{ color: STONE }}>
          {rating?.toFixed(2)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}
        </a>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="text-[28px]" style={{ fontFamily: DISPLAY_FONT, color: INK }}>
          ${discountedPrice.toFixed(2)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-[16px] line-through" style={{ color: STONE }}>
              ${price.toFixed(2)}
            </span>
            <RibbonTag>Save {Math.round(discountPercentage)}%</RibbonTag>
          </>
        )}
      </div>

      <p className="mb-6 max-w-md text-[14.5px] leading-relaxed" style={{ color: STONE }}>
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
          className="flex flex-1 items-center justify-center gap-2 px-8 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 sm:flex-initial"
          style={{ backgroundColor: added ? "#5F7A5A" : INK }}
          onMouseEnter={(e) => { if (!e.currentTarget.disabled && !added) e.currentTarget.style.backgroundColor = ROSE_DARK; }}
          onMouseLeave={(e) => { if (!added) e.currentTarget.style.backgroundColor = INK; }}
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          {added ? "Added to bag" : "Add to bag"}
        </button>

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label="Add to wishlist"
          className="flex h-11.5 w-11.5 shrink-0 items-center justify-center"
          style={{ border: `1px solid ${HAIR}` }}
        >
          <Heart className="h-4.5 w-4.5" strokeWidth={1.5} fill={liked ? ROSE : "none"} style={{ color: liked ? ROSE : INK }} />
        </button>
      </div>

      {minimumOrderQuantity > 1 && (
        <p className="mb-6 text-[12px]" style={{ color: STONE }}>
          Minimum order quantity: {minimumOrderQuantity} units
        </p>
      )}

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-[12px]" style={{ color: STONE }}>
          <Truck className="h-4 w-4 shrink-0" strokeWidth={1.5} style={{ color: ROSE }} />
          {shippingInformation}
        </div>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: STONE }}>
          <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.5} style={{ color: ROSE }} />
          {warrantyInformation}
        </div>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: STONE }}>
          <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={1.5} style={{ color: ROSE }} />
          {returnPolicy}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${HAIR}` }}>
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
      <div className="mb-8 flex gap-8" style={{ borderBottom: `1px solid ${HAIR}` }}>
        {[
          { key: "description", label: "Description" },
          { key: "reviews", label: `Reviews (${reviews.length})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="pb-3 text-[13px] font-medium uppercase tracking transition-colors"
            style={{
              color: tab === t.key ? INK : STONE,
              borderBottom: tab === t.key ? `2px solid ${ROSE}` : "2px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "description" ? (
        <div className="max-w-2xl">
          <p className="mb-6 text-[15px] leading-relaxed" style={{ color: INK }}>
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[11.5px] capitalize tracking-[0.06em]"
                  style={{ backgroundColor: BLUSH, color: INK }}
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
            <span className="text-[42px] leading-none" style={{ fontFamily: DISPLAY_FONT, color: INK }}>
              {rating?.toFixed(1)}
            </span>
            <div>
              <Stars rating={rating} size="h-4 w-4" />
              <p className="mt-1 text-[12.5px]" style={{ color: STONE }}>
                Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((r, i) => (
              <div key={i} className="pb-6" style={{ borderBottom: i < reviews.length - 1 ? `1px solid ${HAIR}` : "none" }}>
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[13.5px] font-medium" style={{ color: INK }}>{r.reviewerName}</p>
                  <span className="text-[11.5px]" style={{ color: STONE }}>{formatDate(r.date)}</span>
                </div>
                <div className="mb-2">
                  <Stars rating={r.rating} />
                </div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: STONE }}>{r.comment}</p>
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
      <div className="relative aspect-4/5 overflow-hidden" style={{ backgroundColor: BLUSH }}>
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
      <p className="mb-1 mt-3 text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: STONE }}>
        {product.brand}
      </p>
      <p className="mb-1.5 text-[16.5px] leading-snug" style={{ fontFamily: DISPLAY_FONT, color: INK }}>
        {product.title}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-[15px]" style={{ fontFamily: DISPLAY_FONT, color: INK }}>
          ${discounted.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-[12px] line-through" style={{ color: STONE }}>
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
    <section className="py-16 lg:py-20" style={{ backgroundColor: BLUSH }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: ROSE }}>
              Complete the routine
            </p>
            <h2 className="text-[30px] leading-tight" style={{ fontFamily: DISPLAY_FONT, color: INK }}>
              You may also like
            </h2>
          </div>
          <Link to="/products" className="hidden text-[12.5px] font-medium uppercase tracking sm:inline-flex sm:items-center sm:gap-1" style={{ color: ROSE }}>
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
    <div style={{ backgroundColor: CREAM }}>
      <section className="mx-auto max-w-7xl animate-pulse px-6 py-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex gap-4">
            <div className="hidden flex-col gap-3 sm:flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 w-16" style={{ backgroundColor: HAIR }} />
              ))}
            </div>
            <div className="aspect-4/5 flex-1" style={{ backgroundColor: BLUSH }} />
          </div>
          <div>
            <div className="mb-3 h-3 w-20" style={{ backgroundColor: HAIR }} />
            <div className="mb-4 h-9 w-3/4" style={{ backgroundColor: HAIR }} />
            <div className="mb-6 h-4 w-40" style={{ backgroundColor: HAIR }} />
            <div className="mb-6 h-8 w-32" style={{ backgroundColor: HAIR }} />
            <div className="mb-2 h-3 w-full" style={{ backgroundColor: HAIR }} />
            <div className="mb-2 h-3 w-full" style={{ backgroundColor: HAIR }} />
            <div className="mb-8 h-3 w-2/3" style={{ backgroundColor: HAIR }} />
            <div className="h-12 w-full max-w-xs" style={{ backgroundColor: HAIR }} />
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
    <div style={{ backgroundColor: CREAM }}>
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
        <AlertCircle className="mb-4 h-8 w-8" strokeWidth={1.5} style={{ color: ROSE }} />
        <h2 className="mb-2 text-[24px]" style={{ fontFamily: DISPLAY_FONT, color: INK }}>
          We couldn't load this product
        </h2>
        <p className="mb-7 text-[13.5px]" style={{ color: STONE }}>
          Something went wrong fetching this item. It may no longer exist, or there was a connection issue.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="px-6 py-2.5 text-[12.5px] font-medium uppercase tracking text-white"
            style={{ backgroundColor: INK }}
          >
            Try again
          </button>
          <Link
            to="/products"
            className="px-6 py-2.5 text-[12.5px] font-medium uppercase tracking"
            style={{ border: `1px solid ${HAIR}`, color: INK }}
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
    <div style={{ backgroundColor: CREAM }}>
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
