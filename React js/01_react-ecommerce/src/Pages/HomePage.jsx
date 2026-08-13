import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Star,
  Mail,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock content — replace with real data from your API                */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { name: "Skincare", tag: "Bestseller", seed: "skincare-solene" },
  { name: "Makeup", tag: "New", seed: "makeup-solene" },
  { name: "Fragrance", tag: "Limited", seed: "fragrance-solene" },
];

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "Lash Princess Mascara",
    brand: "Essence",
    price: 9.99,
    discountPercentage: 10.48,
    rating: 4.6,
    reviews: 128,
    seed: "mascara-solene",
  },
  {
    id: 2,
    title: "Velvet Matte Lipstick",
    brand: "Solène",
    price: 18.5,
    discountPercentage: 0,
    rating: 4.8,
    reviews: 96,
    seed: "lipstick-solene",
  },
  {
    id: 3,
    title: "Rose Absolute Eau de Parfum",
    brand: "Solène",
    price: 48,
    discountPercentage: 15,
    rating: 4.9,
    reviews: 214,
    seed: "perfume-solene",
  },
  {
    id: 4,
    title: "Overnight Repair Cream",
    brand: "Solène",
    price: 32,
    discountPercentage: 0,
    rating: 4.7,
    reviews: 71,
    seed: "cream-solene",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The formulas actually live up to the packaging. My skin has never felt this calm in winter.",
    name: "Amara O.",
    rating: 5,
  },
  {
    quote:
      "Ordering was effortless and the mascara alone is worth the reorder. Already on my third tube.",
    name: "Priya K.",
    rating: 5,
  },
  {
    quote:
      "Understated, well made, and it smells incredible. Exactly what I want from a beauty edit.",
    name: "Elena R.",
    rating: 3.4,
  },
];

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-[#D8B8A9]" : "text-rose"
      }`}
    >
      {children}
    </p>
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

function Stars({ rating }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = rounded - i >= 1 ? 1 : rounded - i === 0.5 ? 0.5 : 0;
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star className="absolute inset-0 h-3.5 w-3.5 text-gold" strokeWidth={1.25} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-3.5 w-3.5 text-gold fill-gold" strokeWidth={1.25} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="bg-cream relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-24 lg:pt-14">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <Eyebrow>New Season Edit</Eyebrow>
          <h1 className="font-display text-ink mb-6 text-[44px] leading-[1.05] sm:text-[56px] lg:text-[64px]">
            Beauty,
            <br />
            distilled.
          </h1>
          <p className="text-stone mb-8 max-w-md text-[15px] leading-relaxed">
            Clean formulas, considered packaging, and the kind of finish worth
            repeating. A small, honest edit of what actually works.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/products"
              className="bg-ink hover:bg-rose-dark group inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300"
            >
              Shop the edit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
            <a href="#philosophy" className="text-ink hover:text-rose transition-colors duration-300 text-[12.5px] font-medium uppercase tracking">
              Our philosophy
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md">
            <div
              className="border-rose absolute -right-4 -top-4 h-full w-full border lg:-right-6 lg:-top-6"
              aria-hidden="true"
            />
            <img
              src="https://picsum.photos/seed/solene-hero/700/860"
              alt="Featured Solène product styled on a marble surface"
              className="relative aspect-4/5 w-full object-cover"
            />
            <div className="bg-cream border border-hair absolute -bottom-5 left-5 px-4 py-3 shadow-sm transition-colors duration-300">
              <p className="text-stone text-[11px] uppercase tracking">
                Editor's pick
              </p>
              <p className="font-display text-ink text-[14px]">
                Rose Absolute Parfum
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Category strip                                                      */
/* ------------------------------------------------------------------ */

function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <Eyebrow>Shop by category</Eyebrow>
          <h2 className="font-display text-ink text-[30px] leading-tight">
            Find your ritual
          </h2>
        </div>
        <Link
          to="/products"
          className="text-rose hover:text-rose-dark hidden text-[12.5px] font-medium uppercase tracking transition-colors duration-300 sm:inline-flex sm:items-center sm:gap-1"
        >
          View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <Link
            to="/products"
            key={cat.name}
            className="group relative block overflow-hidden"
          >
            <div className="absolute left-3 top-3 z-10">
              <RibbonTag>{cat.tag}</RibbonTag>
            </div>
            <div className="bg-blush aspect-3/4 overflow-hidden transition-colors duration-300">
              <img
                src={`https://picsum.photos/seed/${cat.seed}/500/650`}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </div>
            <p className="font-display text-ink mt-3 text-[17px]">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured products                                                   */
/* ------------------------------------------------------------------ */

function MiniProductCard({ product }) {
  const hasDiscount = product.discountPercentage > 0;
  const discounted = hasDiscount
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price;

  return (
    <div className="group">
      <div className="bg-blush relative aspect-4/5 overflow-hidden transition-colors duration-300">
        <img
          src={`https://picsum.photos/seed/${product.seed}/600/750`}
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
      <div className="mb-1.5 flex items-center gap-1.5">
        <Stars rating={product.rating} />
        <span className="text-stone text-[11px]">
          ({product.reviews})
        </span>
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
    </div>
  );
}

function FeaturedProducts() {
  return (
    <section className="bg-blush py-16 lg:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Editor's picks</Eyebrow>
            <h2 className="font-display text-ink text-[30px] leading-tight">
              Bestsellers this month
            </h2>
          </div>
          <Link
            to="/products"
            className="text-rose hover:text-rose-dark hidden text-[12.5px] font-medium uppercase tracking transition-colors duration-300 sm:inline-flex sm:items-center sm:gap-1"
          >
            Shop all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((p) => (
            <MiniProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            to="/products"
            className="text-ink border border-ink hover:bg-ink hover:text-cream inline-flex items-center gap-2 px-7 py-3 text-[12.5px] font-medium uppercase tracking transition-all duration-300"
          >
            Shop all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Editorial / philosophy banner                                       */
/* ------------------------------------------------------------------ */

function PhilosophyBanner() {
  return (
    <section id="philosophy" className="bg-ink relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
        <img
          src="https://picsum.photos/seed/solene-philosophy/700/860"
          alt="Ingredients and texture detail"
          className="aspect-4/5 w-full object-cover"
        />
        <div>
          <Eyebrow dark>Our philosophy</Eyebrow>
          <p className="font-display text-cream mb-8 text-[28px] leading-snug sm:text-[34px]">
            Formulated with ingredients we can pronounce, in amounts that
            actually work — because what you put on matters as much as how
            it looks.
          </p>
          <a
            href="#"
            className="text-[#D8B8A9] hover:text-white inline-flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-[0.12em] transition-colors duration-300"
          >
            Read our story <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="mb-10 text-center">
        <Eyebrow>From our customers</Eyebrow>
        <h2 className="font-display text-ink text-[30px] leading-tight">
          Trusted by the discerning
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="px-2 text-center sm:px-4">
            <div className="mb-3 flex justify-center">
              <Stars rating={t.rating} />
            </div>
            <p className="text-ink mb-4 text-[14.5px] italic leading-relaxed">
              "{t.quote}"
            </p>
            <p className="text-stone text-[11.5px] font-semibold uppercase tracking-[0.12em]">
              {t.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-rose py-16 lg:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-xl px-6 text-center lg:px-10">
        <h2 className="font-display mb-3 text-[28px] leading-tight text-white">
          Join the list
        </h2>
        <p className="text-[#F6E4E8] mb-7 text-[14px]">
          New arrivals, restocks, and 10% off your first order — no spam, ever.
        </p>

        {submitted ? (
          <p className="text-[14px] font-medium text-white">
            You're on the list. Welcome to Solène.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md items-stretch gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-cream text-ink min-w-0 flex-1 px-4 py-3 text-[14px] outline-none placeholder:text-stone-400 transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-ink hover:bg-rose-dark flex items-center gap-2 px-5 py-3 text-[12.5px] font-medium uppercase tracking text-white transition-colors duration-300 cursor-pointer"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <PhilosophyBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}

export default HomePage;
