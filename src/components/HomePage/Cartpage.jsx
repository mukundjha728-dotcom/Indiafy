
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Clock,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import WebsiteNavbar from "../WebsiteNavbar";
import Footer from "../Footer";

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

// ✅ Vertical → route mapping
const verticalRoutes = {
  "E-Commerce":      "/category/ecommerce",
  "Quick Commerce":  "/quick-commerce",
  "Wholesale":       "/wholesale",
};

const INITIAL_ITEMS = [
  {
    id: 1,
    sellerId: "sharma-electronics",
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    seller: "Sharma Electronics",
    price: 24990,
    original: 34990,
    qty: 1,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    sector: "DLF Phase 3",
    vertical: "E-Commerce",
  },
  {
    id: 2,
    sellerId: "green-earth-organics",
    name: "Fresh Organic Broccoli (500g)",
    brand: "FarmFresh",
    seller: "Green Earth Organics",
    price: 85,
    original: 120,
    qty: 2,
    img: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=80",
    sector: "Sector 56",
    vertical: "Quick Commerce",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [saved, setSaved] = useState([]); // ✅ Wishlist/saved-for-later state
  const navigate = useNavigate();

  const updateQty = (id, delta) =>
    setItems(items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const removeItem = (id) => setItems(items.filter((i) => i.id !== id));

  // ✅ Save for later: remove from cart, add to saved list
  const saveForLater = (item) => {
    removeItem(item.id);
    setSaved((prev) => [...prev, item]);
  };

  // ✅ Move saved item back to cart
  const moveToCart = (item) => {
    setSaved((prev) => prev.filter((s) => s.id !== item.id));
    setItems((prev) => [...prev, { ...item, qty: 1 }]);
  };

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const totalSavings = items.reduce((acc, i) => acc + (i.original - i.price) * i.qty, 0);

  return (
    <div className="bg-white min-h-screen">
      <WebsiteNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-zinc-900 tracking-tighter mb-2">
            Shopping <span className="text-zinc-300 italic">Bag</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            You have {items.length} verified item{items.length !== 1 ? "s" : ""} in your bag.
          </p>
        </div>

        {items.length === 0 && saved.length === 0 ? (
          <EmptyState navigate={navigate} />
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Cart Items */}
            <div className="lg:col-span-8 space-y-8">

              {/* Delivery Promise Banner */}
              <div className="bg-zinc-900 rounded-[2rem] p-6 text-white flex items-center justify-between overflow-hidden relative">
                <div className="relative z-10 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Truck size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-emerald-400">
                      Hyperlocal Speed
                    </p>
                    <p className="text-zinc-400 text-xs mt-0.5 font-medium">
                      Estimated delivery to your sector:{" "}
                      <span className="text-white font-bold">15-25 Mins</span>
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 top-0 opacity-10 -rotate-12 translate-x-4">
                  <Clock size={120} />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group bg-zinc-50 rounded-[2.5rem] p-4 sm:p-6 border border-zinc-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">

                        {/* ✅ Product Image → /product/:id */}
                        <div
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="w-full sm:w-40 aspect-square rounded-[1.8rem] overflow-hidden bg-white border border-zinc-100 shrink-0 cursor-pointer"
                        >
                          <img
                            src={item.img}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt={item.name}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              {/* ✅ Vertical tag → category route */}
                              <button
                                onClick={() => navigate(verticalRoutes[item.vertical] || "/")}
                                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-700 transition-colors"
                              >
                                {item.vertical}
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-zinc-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>

                            {/* ✅ Product name → /product/:id */}
                            <h3
                              onClick={() => navigate(`/product/${item.id}`)}
                              className="text-xl font-bold text-zinc-900 leading-tight cursor-pointer hover:text-zinc-600 transition-colors"
                            >
                              {item.name}
                            </h3>

                            <div className="flex items-center gap-2 mt-2">
                              {/* ✅ Seller badge → /store/:sellerId */}
                              <button
                                onClick={() => navigate(`/store/${item.sellerId}`)}
                                className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded hover:bg-emerald-100 transition-colors"
                              >
                                <BadgeCheck size={12} /> {item.seller}
                              </button>
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                                {item.sector}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-end justify-between mt-6">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-zinc-900">
                                  {fmt(item.price)}
                                </span>
                                <span className="text-sm text-zinc-300 line-through font-bold">
                                  {fmt(item.original)}
                                </span>
                              </div>
                              <p className="text-[10px] font-black text-emerald-500 uppercase">
                                You save {fmt(item.original - item.price)}
                              </p>
                              {/* ✅ Save for later button */}
                              <button
                                onClick={() => saveForLater(item)}
                                className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 hover:text-red-400 transition-colors uppercase tracking-tighter mt-1"
                              >
                                <Heart size={11} /> Save for Later
                              </button>
                            </div>

                            {/* Qty Switcher */}
                            <div className="flex items-center bg-white border border-zinc-200 rounded-2xl p-1 shadow-sm">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-10 text-center font-black text-sm">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* ✅ Saved for Later section */}
              {saved.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">
                    Saved for Later ({saved.length})
                  </h3>
                  <div className="space-y-3">
                    {saved.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100"
                      >
                        {/* ✅ Saved item image → /product/:id */}
                        <div
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-zinc-100 shrink-0 cursor-pointer"
                        >
                          <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="text-sm font-bold text-zinc-900 truncate cursor-pointer hover:text-zinc-600"
                          >
                            {item.name}
                          </p>
                          <p className="text-xs font-black text-zinc-900 mt-0.5">{fmt(item.price)}</p>
                        </div>
                        <button
                          onClick={() => moveToCart(item)}
                          className="text-[10px] font-black uppercase tracking-widest text-zinc-900 border border-zinc-200 px-3 py-2 rounded-xl hover:bg-zinc-100 transition-colors whitespace-nowrap"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-zinc-200">
                  <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                    Summary <ShoppingBag size={20} className="text-zinc-500" />
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-zinc-400 font-medium">
                      <span>Subtotal</span>
                      <span className="text-white font-bold">{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 font-medium">
                      <span>Delivery Fee</span>
                      <span className="text-emerald-400 font-bold uppercase text-xs tracking-widest pt-1">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Store Discount</span>
                      <span className="font-bold">-{fmt(totalSavings)}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800 flex justify-between items-end mb-8">
                    <div>
                      <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">
                        Total Payable
                      </p>
                      <p className="text-4xl font-black">{fmt(subtotal)}</p>
                    </div>
                  </div>

                  {/* ✅ Checkout → /checkout */}
                  <button
                    onClick={() => navigate("/checkout")}
                    disabled={items.length === 0}
                    className="w-full py-5 bg-white text-zinc-900 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all group disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Checkout Securely{" "}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* ✅ Continue Shopping → / */}
                  {/* <button
                    onClick={() => navigate("/")}
                    className="w-full mt-3 py-3 text-zinc-500 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
                  >
                    ← Continue Shopping
                  </button> */}
                </div>

                {/* Secure Note */}
                <div className="p-6 border-2 border-dashed border-zinc-100 rounded-[2rem] flex items-center gap-4">
                  <ShieldCheck size={32} className="text-zinc-300 shrink-0" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase leading-relaxed tracking-tighter">
                    Encrypted Dynamic QR Payments & Video Verification active for this order.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

const EmptyState = ({ navigate }) => (
  <div className="py-32 text-center bg-zinc-50 rounded-[4rem] border-2 border-dashed border-zinc-100">
    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
      <ShoppingBag size={40} className="text-zinc-200" />
    </div>
    <h2 className="text-3xl font-black text-zinc-900 tracking-tighter mb-4">
      Your bag is empty
    </h2>
    <p className="text-zinc-400 font-medium mb-10 max-w-xs mx-auto">
      Start Indiafying your daily lifestyle with verified local sellers.
    </p>
    {/* ✅ Start Shopping → / */}
    <button
      onClick={() => navigate("/")}
      className="px-12 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all shadow-zinc-200"
    >
      Start Shopping
    </button>
  </div>
);