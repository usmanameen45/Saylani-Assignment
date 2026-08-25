import { Search as SearchIcon, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router";

const Search = () => {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const searchProduct = async () => {
      try {
        if (query) {
          setLoading(true);
          const res = await axios.get(
            `https://dummyjson.com/products/search?q=${query}`,
          );
          setProducts(res.data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    searchProduct();
  }, [query]);

  return (
    <>
      <button
        aria-label="Search"
        onClick={() => setisDialogOpen(true)}
        className="hidden h-5 w-5 items-center justify-center sm:flex text-ink hover:text-rose transition-colors duration-300 cursor-pointer"
      >
        <SearchIcon className="h-4.5 w-4.5" strokeWidth={1.5} />
      </button>
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone/50"
          >
            <div className="flex flex-col gap-6 rounded-lg bg-cream px-6 py-4 w-full max-w-[500px] mx-[16px]">
              <button
                onClick={() => {
                  setisDialogOpen(false);
                  setQuery("");
                  setProducts([]);
                }}
                className="text-ink hover:text-rose self-end transition-colors duration-300 cursor-pointer"
              >
                <X className="h-4.5 w-4.5" strokeWidth={1.5} />
              </button>

              <input
                type="search"
                placeholder="Search..."
                value={query}
                onInput={(e) => setQuery(e.target.value)}
                className="text-ink text-[14px] p-3 rounded-full border-2 border-hair focus:outline-none focus:border-rose transition-colors duration-500"
              />
              {loading ? (
                <p className="text-ink text-center">Loading...</p>
              ) : products.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {products.map(
                    (product, index) =>
                      index < 3 && (
                        <div
                          key={product.id}
                          onClick={() => {
                            setisDialogOpen(false);
                            navigate(`/products/${product.id}`);
                          }}
                          className="flex items-center max-w-full gap-3 p-3 bg-stone hover:bg-slate-50 rounded-lg cursor-pointer transition-all border-b border-slate-100 last:border-none"
                        >
                          {/* Thumbnail */}
                          <div className="w-12 h-12 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 line-clamp-2">
                              {product.title}
                            </h4>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-medium text-slate-700">
                                {product.rating}
                              </span>
                              <span className="text-xs text-slate-400">
                                ({product.reviews.length})
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <span className="text-sm font-semibold text-slate-900">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ),
                  )}
                </div>
              ) : (
                <p>No products found</p>
              )}
              {!loading && products.length > 5 && (
                <button
                  onClick={() => {
                    setisDialogOpen(false);
                    navigate(`/search?q=${query}`);
                  }} 
                  className="flex w-full items-center justify-center rounded-lg py-2.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-cream bg-ink hover:bg-rose-dark transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  {`View all ${products.length} results for "${query}"`}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Search;
