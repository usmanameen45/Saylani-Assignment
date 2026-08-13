import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import ThemeToggle from "./themeToggle.jsx";

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
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-cream border-hair" : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-ink text-[22px] font-medium tracking-[0.14em]"
        >
          SOLÈNE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-ink hover:text-rose text-[12.5px] font-medium uppercase tracking transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hidden h-5 w-5 items-center justify-center sm:flex text-ink hover:text-rose transition-colors duration-300 cursor-pointer"
          >
            <Search className="h-4.5 w-4.5" strokeWidth={1.5} />
          </button>
          <Link
            to="/products"
            aria-label="Bag"
            className="flex h-5 w-5 items-center justify-center text-ink hover:text-rose transition-colors duration-300"
          >
            <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.5} />
          </Link>
          <ThemeToggle />
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-5 w-5 items-center justify-center md:hidden text-ink hover:text-rose transition-colors duration-300 cursor-pointer"
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
        <nav className="bg-cream flex flex-col gap-1 px-6 pb-5 md:hidden transition-colors duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-ink border-b border-hair hover:text-rose py-2.5 text-[13px] font-medium uppercase tracking transition-colors duration-300"
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
