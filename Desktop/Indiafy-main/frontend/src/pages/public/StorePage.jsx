import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  Search,
  Plus,
  Minus,
  Info,
  ChevronLeft,
  BadgeCheck,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Update paths based on your structure
import WebsiteNavbar from "../../components/WebsiteNavbar";
import Footer from "../../components/Footer";

// --- MOCK DATA ---
const STORE_INFO = {
  name: "Sharma General Store",
  type: "Quick Commerce",
  distance: "0.8 km",
  rating: "4.8",
  time: "15 mins",
  deliveryFee: "Free",
  minOrder: "₹99",
  coverImg:
    "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=1600",
  logo: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=200",
  isLive: true,
};

const CATEGORIES = [
  "All",
  "Bestsellers",
  "Dairy & Bread",
  "Snacks",
  "Beverages",
  "Personal Care",
];

const PRODUCTS = [
  {
    id: 101,
    name: "Amul Taaza Toned Fresh Milk",
    price: 27,
    originalPrice: 28,
    weight: "500 ml",
    category: "Dairy & Bread",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=400",
  },
  {
    id: 102,
    name: "Britannia Brown Bread",
    price: 40,
    originalPrice: 45,
    weight: "400 g",
    category: "Dairy & Bread",
    tag: "",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400",
  },
  {
    id: 103,
    name: "Lay's India's Magic Masala",
    price: 20,
    originalPrice: 20,
    weight: "50 g",
    category: "Snacks",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1566478989037-e924e3059266?q=80&w=400",
  },
  {
    id: 104,
    name: "Coca-Cola Soft Drink",
    price: 40,
    originalPrice: 40,
    weight: "750 ml",
    category: "Beverages",
    tag: "",
    img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400",
  },
  {
    id: 105,
    name: "Maggi 2-Minute Noodles",
    price: 14,
    originalPrice: 14,
    weight: "70 g",
    category: "Snacks",
    tag: "Trending",
    img: "https://images.unsplash.com/photo-1612929633738-8fe01f7280f2?q=80&w=400",
  },
  {
    id: 106,
    name: "Dettol Original Soap",
    price: 45,
    originalPrice: 50,
    weight: "125 g",
    category: "Personal Care",
    tag: "",
    img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=400",
  },
  {
    id: 107,
    name: "Amul Butter Pasteurized",
    price: 54,
    originalPrice: 56,
    weight: "100 g",
    category: "Dairy & Bread",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=400",
  },
  {
    id: 108,
    name: "Red Bull Energy Drink",
    price: 125,
    originalPrice: 125,
    weight: "250 ml",
    category: "Beverages",
    tag: "",
    img: "https://images.unsplash.com/photo-1596547609652-9fc5b8dc3a2b?q=80&w=400",
  },
];

export default function StorePage() {
  const { id } = useParams(); // URL se Store ID lene ke liye
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Cart State: { productId: quantity }
  const [cart, setCart] = useState({});

  const updateCart = (productId, delta) => {
    setCart((prev) => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeCategory === "All") return true;
    if (activeCategory === "Bestsellers") return p.tag === "Bestseller";
    return p.category === activeCategory;
  });

  const cartTotalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-zinc-50 min-h-screen font-sans pb-24">
      <WebsiteNavbar />

      <main className="pt-16 md:pt-20">
        {/* 🏬 STORE HEADER (Cover + Details) */}
        <section className="relative w-full">
          {/* Cover Image */}
          <div className="relative w-full h-48 md:h-64 bg-zinc-200">
            <img
              src={STORE_INFO.coverImg}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Overlapping Store Info Card */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 md:-mt-20 z-10">
            <div className="bg-white rounded-[2rem] p-5 md:p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100 flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center">
              {/* Store Logo */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-lg shrink-0 bg-zinc-100">
                <img
                  src={STORE_INFO.logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Store Details */}
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h1 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
                      {STORE_INFO.name}
                      <BadgeCheck size={24} className="text-emerald-500" />
                    </h1>
                    <p className="text-zinc-500 font-bold text-xs md:text-sm uppercase tracking-widest mt-1">
                      {STORE_INFO.type}
                    </p>
                  </div>

                  {STORE_INFO.isLive && (
                    <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                      Live
                    </div>
                  )}
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-2 md:gap-4 mt-4">
                  <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-100">
                    <Star
                      size={14}
                      className="text-amber-400"
                      fill="currentColor"
                    />
                    <span className="text-xs font-bold text-zinc-700">
                      {STORE_INFO.rating} Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-100">
                    <Clock size={14} className="text-blue-500" />
                    <span className="text-xs font-bold text-zinc-700">
                      {STORE_INFO.time} Delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-100">
                    <MapPin size={14} className="text-zinc-400" />
                    <span className="text-xs font-bold text-zinc-700">
                      {STORE_INFO.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🔍 SEARCH & CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sticky top-[60px] md:top-[70px] z-30 bg-zinc-50/90 backdrop-blur-xl py-4 -mx-4 px-4">
          <div className="flex items-center bg-white border border-zinc-200 rounded-2xl p-1 shadow-sm mb-4">
            <Search size={18} className="text-zinc-400 ml-3" />
            <input
              type="text"
              placeholder="Search products in this store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-3 px-3 outline-none text-sm font-medium text-zinc-900 bg-transparent placeholder:text-zinc-400"
            />
          </div>

          {/* Horizontal Scrollable Categories */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                  activeCategory === cat
                    ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/20"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 🛒 PRODUCTS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const qty = cart[product.id] || 0;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 border border-zinc-100 hover:shadow-xl hover:border-emerald-500/20 transition-all flex flex-col relative group"
                  >
                    {/* Discount/Tag Badge */}
                    {product.tag && (
                      <div className="absolute top-0 left-0 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-br-xl rounded-tl-[1.5rem] z-10 shadow-sm">
                        {product.tag}
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="w-full aspect-square bg-zinc-50 rounded-xl md:rounded-2xl mb-3 overflow-hidden relative p-4">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1">
                      <h3 className="font-bold text-zinc-900 text-xs md:text-sm leading-tight line-clamp-2 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[10px] font-bold text-zinc-400 mb-3">
                        {product.weight}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-sm md:text-base font-black text-zinc-900">
                            ₹{product.price}
                          </p>
                          {product.originalPrice > product.price && (
                            <p className="text-[10px] text-zinc-400 line-through">
                              ₹{product.originalPrice}
                            </p>
                          )}
                        </div>

                        {/* Add to Cart / Counter Logic */}
                        {qty === 0 ? (
                          <button
                            onClick={() => updateCart(product.id, 1)}
                            className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors active:scale-95 shadow-sm"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 bg-emerald-500 text-white px-2 py-1.5 rounded-lg shadow-md shadow-emerald-500/20">
                            <button
                              onClick={() => updateCart(product.id, -1)}
                              className="p-0.5 active:scale-90"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-xs font-black w-3 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateCart(product.id, 1)}
                              className="p-0.5 active:scale-90"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
              <Search size={48} className="text-zinc-200 mb-4" />
              <h3 className="text-xl font-black text-zinc-900 mb-1">
                No products found
              </h3>
              <p className="text-zinc-500 text-sm">
                Try searching for something else in this store.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* 🛒 FLOATING CART BOTTOM BAR (Only shows if items in cart) */}
      <AnimatePresence>
        {cartTotalItems > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-zinc-900 text-white p-4 rounded-[1.5rem] shadow-2xl flex items-center justify-between z-50 border border-zinc-700"
          >
            <div className="flex items-center gap-3">
              <div className="bg-zinc-800 p-2.5 rounded-xl border border-zinc-700">
                <ShoppingBag size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-black text-sm">
                  {cartTotalItems} ITEM{cartTotalItems > 1 ? "S" : ""}
                </p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Added to cart
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="bg-emerald-500 text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors active:scale-95"
            >
              View Cart{" "}
              <ChevronRight size={14} className="inline ml-1 -mt-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
}
