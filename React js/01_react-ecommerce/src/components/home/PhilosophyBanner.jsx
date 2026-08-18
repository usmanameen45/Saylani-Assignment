import { ArrowRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";

/**
 * PhilosophyBanner — dark editorial "Our philosophy" banner section.
 */
export default function PhilosophyBanner() {
  return (
    <section
      id="philosophy"
      className="bg-ink dark:bg-hair relative overflow-hidden transition-colors duration-300"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
        <img
          src="https://picsum.photos/seed/solene-philosophy/700/860"
          alt="Ingredients and texture detail showcasing Solène's product quality"
          className="aspect-4/5 w-full object-cover"
        />
        <div>
          <Eyebrow dark>Our philosophy</Eyebrow>
          <p
            id="philosophy-heading"
            className="font-display text-cream dark:text-ink mb-8 text-[28px] leading-snug sm:text-[34px]"
          >
            Formulated with ingredients we can pronounce, in amounts that
            actually work — because what you put on matters as much as how it
            looks.
          </p>
          <a
            href="#"
            className="text-[#D8B8A9] hover:text-white inline-flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-[0.12em] transition-colors duration-300"
          >
            Read our story{" "}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
