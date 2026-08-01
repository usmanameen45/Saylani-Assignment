import React from "react";
import { Link } from "react-router";
import { CREAM, HAIR, INK, STONE, DISPLAY_FONT } from "../../Pages/HomePage.jsx";
// import { Instagram, Facebook } from "lucide-react"

function Footer() {
  return (
    <footer style={{ backgroundColor: CREAM, borderTop: `1px solid ${HAIR}` }}>
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              to="/"
              className="text-[20px] tracking-[0.14em]"
              style={{ fontFamily: DISPLAY_FONT, color: INK }}
            >
              SOLÈNE
            </Link>
            <p
              className="mt-3 max-w-55 text-[13px] leading-relaxed"
              style={{ color: STONE }}
            >
              A small, honest edit of skincare, makeup and fragrance.
            </p>
            <div className="mt-5 flex items-center gap-4">
              {/* <a href="#" aria-label="Instagram" style={{ color: INK }}>
                  <Instagram className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a>
                <a href="#" aria-label="Facebook" style={{ color: INK }}>
                  <Facebook className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a> */}
            </div>
          </div>

          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: STONE }}
            >
              Shop
            </p>
            <ul className="space-y-2.5">
              {["New Arrivals", "Skincare", "Makeup", "Fragrance"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/products"
                      className="text-[13.5px]"
                      style={{ color: INK }}
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: STONE }}
            >
              Help
            </p>
            <ul className="space-y-2.5">
              {["Shipping", "Returns", "FAQs", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[13.5px]" style={{ color: INK }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: STONE }}
            >
              About
            </p>
            <ul className="space-y-2.5">
              {["Our Story", "Sustainability", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[13.5px]" style={{ color: INK }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 pt-6 text-[11.5px] sm:flex-row"
          style={{ borderTop: `1px solid ${HAIR}`, color: STONE }}
        >
          <p>© {new Date().getFullYear()} Solène. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
