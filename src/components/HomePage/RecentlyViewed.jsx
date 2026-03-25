import { Eye, ArrowRight, ShoppingCart, Clock } from "lucide-react";
import { motion } from "framer-motion";

const viewedProducts = [
  {
    id: 101,
    name: "Fresh Organic Broccoli (500g)",
    seller: "Green Earth Organics",
    price: "85",
    tag: "Quick Commerce",
    image:
      "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=800",
    viewedAt: "2 hours ago",
  },
  {
    id: 102,
    name: "Noise Cancelling Headphones",
    seller: "Tech Zone Gurugram",
    price: "4,200",
    tag: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    viewedAt: "5 hours ago",
  },
  {
    id: 103,
    name: "Cotton Formal Shirt - Slim Fit",
    seller: "Vogue Men's Wear",
    price: "1,499",
    tag: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800",
    viewedAt: "Yesterday",
  },
];

export default function RecentlyViewed() {
  return (
    <section className="py-20 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-sm">
              <Eye size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Based on your interest
              </h2>
              <p className="text-zinc-500 text-sm font-medium">
                Items you recently explored in West Gurugram
              </p>
            </div>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold text-xs uppercase tracking-widest transition-all">
            Clear History <ArrowRight size={14} />
          </button>
        </div>

        {/* Horizontal Scroll / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2rem] p-4 border border-zinc-200/60 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500"
            >
              <div className="flex gap-5">
                {/* Product Image */}
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-zinc-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between py-1 flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">
                        {product.viewedAt}
                      </span>
                    </div>
                    <h3 className="font-bold text-zinc-900 text-sm leading-snug mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">
                      {product.seller}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-black text-zinc-900">
                      ₹{product.price}
                    </span>
                    <button className="p-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
