import { Outlet } from "react-router";
import Header from "./common/header.jsx";
import Footer from "./common/footer.jsx";

/**
 * Layout — root page shell with sticky header, main content area, and footer.
 * All page routes are rendered via the <Outlet />.
 */
const Layout = () => {
  return (
    <div className="bg-cream min-h-screen text-ink transition-colors duration-300">
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;