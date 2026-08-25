import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import ProductCard from "../components/productCard/ProductCard";
import ProductCardSkeleton from "../components/productCard/ProductCardSkeleton";

/**
 * Products — fetches and displays the full product listing.
 */
const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    (async function fetchProducts() {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
      } catch {
        setError("Check your internet connection");
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-6xl place-items-center mx-auto py-8 px-4"
        aria-busy="true"
        aria-label="Loading products"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
          <ProductCardSkeleton key={el} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24" role="alert">
        <p className="font-display text-ink text-[20px]">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-8 px-5 w-full space-y-4">
      <h1 className="text-ink md:text-xl w-full">
        Search results for <span className="font-semibold text-rose">{query}</span>
      </h1>
      <main
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full place-items-center"
        aria-label="Product listing"
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            aria-label={`View ${product.title}`}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </main>
    </section>
  );
};

export default SearchPage;
