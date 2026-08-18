import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Breadcrumb from "../components/productDetail/Breadcrumb";
import Gallery from "../components/productDetail/Gallery";
import Details from "../components/productDetail/Details";
import ReviewsAndDescription from "../components/productDetail/ReviewsAndDescription";
import RelatedProducts from "../components/productDetail/RelatedProducts";
import ProductSkeleton from "../components/productDetail/ProductSkeleton";
import ProductErrorState from "../components/productDetail/ProductErrorState";

/**
 * ProductDetailPage — fetches product data and orchestrates the detail page.
 * All UI sub-sections live in src/components/productDetail/.
 */
export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setProduct(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        if (cancelled) return;

        setProduct(data);
        setStatus("success");

        // Fetch related products from the same category
        if (data.category) {
          try {
            const relRes = await fetch(
              `https://dummyjson.com/products/category/${data.category}?limit=5`
            );
            const relData = await relRes.json();
            if (!cancelled) {
              setRelated(
                (relData.products || [])
                  .filter((p) => p.id !== data.id)
                  .slice(0, 4)
              );
            }
          } catch {
            if (!cancelled) setRelated([]);
          }
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  if (status === "loading") return <ProductSkeleton />;
  if (status === "error" || !product) {
    return <ProductErrorState onRetry={() => setReloadKey((k) => k + 1)} />;
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <div className="bg-cream transition-colors duration-300">
      <Breadcrumb category={product.category} title={product.title} />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={galleryImages} title={product.title} />
          <Details product={product} />
        </div>
      </section>

      <ReviewsAndDescription product={product} />
      <RelatedProducts items={related} />
    </div>
  );
}
