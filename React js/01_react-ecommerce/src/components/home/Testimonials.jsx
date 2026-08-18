import Eyebrow from "../common/Eyebrow";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS } from "../../data/homeData";

/**
 * Testimonials — customer review grid section.
 */
export default function Testimonials() {
  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mb-10 text-center">
        <Eyebrow>From our customers</Eyebrow>
        <h2
          id="testimonials-heading"
          className="font-display text-ink text-[30px] leading-tight"
        >
          Trusted by the discerning
        </h2>
      </div>

      <ul
        className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        role="list"
        aria-label="Customer testimonials"
      >
        {TESTIMONIALS.map((t) => (
          <li key={t.name} role="listitem">
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}
