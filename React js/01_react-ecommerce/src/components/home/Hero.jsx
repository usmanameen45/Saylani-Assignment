import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";

/**
 * Hero — full-bleed hero section for the Home page.
 */
export default function Hero() {
  return (
    <section
      className="bg-cream relative overflow-hidden transition-colors duration-300"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-24 lg:pt-14">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <Eyebrow>New Season Edit</Eyebrow>
          <h1
            id="hero-heading"
            className="font-display text-ink mb-6 text-[44px] leading-[1.05] sm:text-[56px] lg:text-[64px]"
          >
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
              className="bg-ink hover:bg-rose-dark group inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-cream transition-colors duration-300"
            >
              Shop the edit
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
            <a
              href="#philosophy"
              className="text-ink hover:text-rose transition-colors duration-300 text-[12.5px] font-medium uppercase tracking"
            >
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
