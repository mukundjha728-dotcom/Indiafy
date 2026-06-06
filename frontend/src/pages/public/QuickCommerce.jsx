import { useState, useEffect, lazy, Suspense } from "react";

import QuickHeader from "../../components/QuickCommerce/QuickHeader";
import DeliveryBar from "../../components/QuickCommerce/DeliveryBar";
import SearchSection from "../../components/QuickCommerce/SearchSection";
import BuyAgain from "../../components/QuickCommerce/BuyAgain";
import QuickCategories from "../../components/QuickCommerce/QuickCategories";
import FlashDeals from "../../components/QuickCommerce/FlashDeals";
import ProductCatalog, { PRODUCTS_DB } from "../../components/QuickCommerce/ProductCatalog";
import RecommendedProducts from "../../components/QuickCommerce/RecommendedProducts";
import StickyCart from "../../components/QuickCommerce/StickyCart";
import BottomNavigation from "../../components/QuickCommerce/BottomNavigation";

export default function QuickCommerce() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("dairy");

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // --- Cart handlers ---
  const handleAdd = (id) => setCart((prev) => ({ ...prev, [id]: 1 }));
  const handleInc = (id) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const handleDec = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  // --- Cart calculations ---
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  // Build a flat lookup of all products (from catalog, buy-again, flash deals, recommended)
  const allProducts = {};

  // Catalog products
  Object.values(PRODUCTS_DB).forEach((products) => {
    products.forEach((p) => { allProducts[p.id] = p; });
  });

  // Buy-again items (mock prices)
  const buyAgainPrices = { "ba-1": { price: 27, mrp: 27 }, "ba-2": { price: 54, mrp: 60 }, "ba-3": { price: 50, mrp: 55 }, "ba-4": { price: 35, mrp: 40 }, "ba-5": { price: 40, mrp: 45 } };
  Object.entries(buyAgainPrices).forEach(([id, p]) => { allProducts[id] = p; });

  // Flash deals
  const flashPrices = { "fd-1": { price: 39, mrp: 50 }, "fd-2": { price: 69, mrp: 100 }, "fd-3": { price: 65, mrp: 90 }, "fd-4": { price: 99, mrp: 125 }, "fd-5": { price: 48, mrp: 60 } };
  Object.entries(flashPrices).forEach(([id, p]) => { allProducts[id] = p; });

  // Recommended
  const recPrices = { "rec-1": { price: 56, mrp: 56 }, "rec-2": { price: 75, mrp: 80 }, "rec-3": { price: 135, mrp: 150 }, "rec-4": { price: 95, mrp: 110 }, "rec-5": { price: 115, mrp: 130 }, "rec-6": { price: 99, mrp: 115 } };
  Object.entries(recPrices).forEach(([id, p]) => { allProducts[id] = p; });

  const totalPrice = Object.entries(cart).reduce((total, [id, qty]) => {
    const product = allProducts[id];
    return total + (product?.price || 0) * qty;
  }, 0);

  const totalSaved = Object.entries(cart).reduce((total, [id, qty]) => {
    const product = allProducts[id];
    if (product && product.mrp > product.price) {
      return total + (product.mrp - product.price) * qty;
    }
    return total;
  }, 0);

  // --- Category click ---
  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
  };

  // --- Search ---
  const handleSearch = (query) => {
    // For now, could filter or navigate
    console.log("Search:", query);
  };

  return (
    <div className="bg-zinc-50 min-h-screen flex flex-col font-sans pb-14 md:pb-0">
      {/* Section 1: Compact Header */}
      <QuickHeader />

      {/* Section 2: Delivery Intelligence Bar */}
      <DeliveryBar />

      {/* Section 3: Search */}
      <SearchSection onSearch={handleSearch} />

      {/* Section 4: Buy Again */}
      <BuyAgain cart={cart} onAdd={handleAdd} isLoading={isLoading} />

      {/* Section 5: Quick Categories */}
      <QuickCategories
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        isLoading={isLoading}
      />

      {/* Section 6: Flash Deals */}
      <FlashDeals onAdd={handleAdd} isLoading={isLoading} />

      {/* Section 7: Product Catalog */}
      <ProductCatalog
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        cart={cart}
        onAdd={handleAdd}
        onInc={handleInc}
        onDec={handleDec}
        isLoading={isLoading}
      />

      {/* Section 8: Recommended Products */}
      <RecommendedProducts cart={cart} onAdd={handleAdd} />

      {/* Section 9: Sticky Cart */}
      <StickyCart
        totalItems={totalItems}
        totalPrice={totalPrice}
        totalSaved={totalSaved}
      />

      {/* Section 10: Bottom Navigation (mobile only) */}
      <BottomNavigation />
    </div>
  );
}