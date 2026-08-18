import { Link } from "react-router";

/**
 * Breadcrumb — navigation breadcrumb trail for the Product Detail page.
 *
 * Props:
 *   category {string} — product category slug/name
 *   title    {string} — product title
 */
export default function Breadcrumb({ category, title }) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
      <nav aria-label="Breadcrumb">
        <ol className="text-stone flex items-center gap-2 text-[12px] transition-colors duration-300">
          <li>
            <Link
              to="/"
              className="text-stone hover:text-rose transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to="/products"
              className="text-stone hover:text-rose capitalize transition-colors duration-300"
            >
              {category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="text-ink truncate transition-colors duration-300" aria-current="page">
              {title}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
}
