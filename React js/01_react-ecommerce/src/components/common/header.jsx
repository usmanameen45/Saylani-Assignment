import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { CREAM, INK, HAIR, DISPLAY_FONT ,ROSE } from "../../Pages/HomePage.jsx";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Shop", to: "/products" },
    { label: "New Arrivals", to: "/products" },
    { label: "About", to: "#philosophy" },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? CREAM : "transparent",
        borderBottom: scrolled ? `1px solid ${HAIR}` : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="text-[22px] font-medium tracking-[0.14em]"
          style={{ fontFamily: DISPLAY_FONT, color: INK }}
        >
          SOLÈNE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[12.5px] font-medium uppercase tracking transition-colors"
              style={{ color: INK }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ROSE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hidden h-5 w-5 items-center justify-center sm:flex"
            style={{ color: INK }}
          >
            <Search className="h-4.5 w-4.5" strokeWidth={1.5} />
          </button>
          <Link
            to="/products"
            aria-label="Bag"
            className="flex h-5 w-5 items-center justify-center"
            style={{ color: INK }}
          >
            <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.5} />
          </Link>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-5 w-5 items-center justify-center md:hidden"
            style={{ color: INK }}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="flex flex-col gap-1 px-6 pb-5 md:hidden"
          style={{ backgroundColor: CREAM }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-[13px] font-medium uppercase tracking"
              style={{ color: INK, borderBottom: `1px solid ${HAIR}` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
