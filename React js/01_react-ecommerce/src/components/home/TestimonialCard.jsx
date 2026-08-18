import Stars from "../common/Stars";

/**
 * TestimonialCard — a single customer testimonial block.
 *
 * Props:
 *   testimonial {{ quote: string, name: string, rating: number }}
 */
export default function TestimonialCard({ testimonial }) {
  return (
    <figure className="px-2 text-center sm:px-4">
      <div className="mb-3 flex justify-center">
        <Stars rating={testimonial.rating} />
      </div>
      <blockquote className="text-ink mb-4 text-[14.5px] italic leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="text-stone text-[11.5px] font-semibold uppercase tracking-[0.12em]">
        {testimonial.name}
      </figcaption>
    </figure>
  );
}
