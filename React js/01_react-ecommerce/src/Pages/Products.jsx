import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/productCard/ProductCard";
import ProductCardSkeleton from "../components/productCard/ProductCardSkeleton";
import { Link } from "react-router";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        if (res.status === 200) {
          setProducts(res.data.products);
          console.log(res.data.products);
        }
      } catch (error) {
        setError("Check your internet connection");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-6xl place-items-center mx-auto py-8 px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(
            (el) => (
              <ProductCardSkeleton key={el} />
            )
          )}
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-6xl place-items-center mx-auto py-8 px-4">
          {products.map((product) => (
            <Link to={`/products/${product.id}`}>
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
