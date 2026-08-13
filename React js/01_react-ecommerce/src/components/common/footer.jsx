import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-cream border-t border-hair transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              to="/"
              className="font-display text-ink text-[20px] tracking-[0.14em]"
            >
              SOLÈNE
            </Link>
            <p className="text-stone mt-3 max-w-[220px] text-[13px] leading-relaxed">
              A small, honest edit of skincare, makeup and fragrance.
            </p>
          </div>

          <div>
            <p className="text-stone mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]">
              Shop
            </p>
            <ul className="space-y-2.5">
              {["New Arrivals", "Skincare", "Makeup", "Fragrance"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/products"
                      className="text-ink hover:text-rose transition-colors duration-300 text-[13.5px]"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="text-stone mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]">
              Help
            </p>
            <ul className="space-y-2.5">
              {["Shipping", "Returns", "FAQs", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-ink hover:text-rose transition-colors duration-300 text-[13.5px]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-stone mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]">
              About
            </p>
            <ul className="space-y-2.5">
              {["Our Story", "Sustainability", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-ink hover:text-rose transition-colors duration-300 text-[13.5px]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-hair text-stone mt-12 flex flex-col items-center justify-between gap-3 pt-6 text-[11.5px] sm:flex-row">
          <p>© {new Date().getFullYear()} Solène. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-rose transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-rose transition-colors duration-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
