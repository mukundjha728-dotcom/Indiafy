import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  ShoppingBag,
  Truck,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "quick",
    label: "Quick Commerce",
    icon: <Truck size={18} />,
    desc: "10-25 Mins",
  },
  {
    id: "eco",
    label: "E-Commerce",
    icon: <ShoppingBag size={18} />,
    desc: "Same Day",
  },
  {
    id: "wholesale",
    label: "Wholesale",
    icon: <Building2 size={18} />,
    desc: "Bulk Savings",
  },
];

const backgroundImages = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2500&auto=format&fit=crop", // Grocery
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2500&auto=format&fit=crop", // Fashion
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2500&auto=format&fit=crop", // Home/Wholesale
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("quick");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full flex items-center bg-zinc-50 overflow-hidden">
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={backgroundImages[currentIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Modern Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6 w-fit px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
          >
            <MapPin size={16} className="text-gray-300" />
            <span className="text-sm font-medium tracking-wide">
              Serving Gurugram Sectors
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Indiafy Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Daily Lifestyle.
            </span>
          </motion.h1>

          {/* Tri-Vertical Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 border ${
                  activeTab === cat.id
                    ? "bg-white text-black border-white shadow-lg scale-105"
                    : "bg-black/30 text-white border-white/20 hover:bg-black/50"
                }`}
              >
                {cat.icon}
                <div className="text-left">
                  <p className="text-xs font-bold leading-none">{cat.label}</p>
                  <p className="text-[10px] opacity-70 uppercase tracking-tighter">
                    {cat.desc}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl group"
          >
            <div className="flex items-center bg-white rounded-2xl p-2 shadow-2xl transition-all duration-300 focus-within:ring-4 ring-white/20">
              <div className="px-4 text-gray-400">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder={`Search for ${activeTab === "quick" ? "Milk, Eggs, Bread..." : "Shirts, Shoes, Electronics..."}`}
                className="flex-1 py-4 bg-transparent border-none outline-none text-black text-lg"
              />
              <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-2">
                Order Now <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* 3. PROMO CARD (Visual Interest) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden lg:flex lg:col-span-5 items-center justify-center"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] text-white w-full max-w-sm">
            <div className="h-48 w-full bg-zinc-800/50 rounded-2xl mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601599561213-832382fd07ba?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-80"
                alt="Promo"
              />
            </div>
            <p className="text-2xl font-bold mb-2">Verified Sellers Only</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every product in Gurugram is checked with video verification
              before it leaves the store.
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                Trusted Infrastructure
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black bg-zinc-700"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
