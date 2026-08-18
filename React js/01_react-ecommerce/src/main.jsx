import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Products from "./Pages/Products.jsx";
import Layout from "./components/layout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage.jsx";
import {ThemeContextProvider} from "./contexts/ThemeContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products">
              <Route index element={<Products />} />
              <Route path=":id" element={<ProductDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  </StrictMode>
);
