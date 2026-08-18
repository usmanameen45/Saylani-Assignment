import { useState } from "react";
import { Mail } from "lucide-react";

/**
 * Newsletter — email subscription form section.
 * Manages its own submitted/email state.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      className="bg-rose py-16 lg:py-20 transition-colors duration-300"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-xl px-6 text-center lg:px-10">
        <h2
          id="newsletter-heading"
          className="font-display mb-3 text-[28px] leading-tight text-white"
        >
          Join the list
        </h2>
        <p className="text-[#F6E4E8] mb-7 text-[14px]">
          New arrivals, restocks, and 10% off your first order — no spam, ever.
        </p>

        {submitted ? (
          <p
            className="text-[14px] font-medium text-white"
            role="status"
            aria-live="polite"
          >
            You're on the list. Welcome to Solène.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md items-stretch gap-3"
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-cream text-ink min-w-0 flex-1 px-4 py-3 text-[14px] outline-none placeholder:text-stone-400 transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-ink hover:bg-rose-dark flex items-center gap-2 px-5 py-3 text-[12.5px] font-medium uppercase tracking text-cream transition-colors duration-300 cursor-pointer"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
