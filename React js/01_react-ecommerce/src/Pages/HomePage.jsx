import Hero from "../components/home/Hero";
import CategoryStrip from "../components/home/CategoryStrip";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PhilosophyBanner from "../components/home/PhilosophyBanner";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

/**
 * HomePage — thin orchestrator that composes all home page sections.
 * Data lives in src/data/homeData.js.
 * Each section is a self-contained component in src/components/home/.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <PhilosophyBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
