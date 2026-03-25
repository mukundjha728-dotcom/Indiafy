import {
  ShoppingCart,
  Heart,
  Star,
  Zap,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const trendingProducts = [
  {
    id: 1,
    name: "Premium A2 Desi Cow Ghee",
    seller: "Organic Roots Store",
    price: "1,299",
    oldPrice: "1,500",
    rating: 4.9,
    distance: "0.8 km",
    tag: "Quick Commerce", // Section A [cite: 11]
    image:
      "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Luxury Silk Evening Wrap",
    seller: "The Boutique Hub",
    price: "2,450",
    oldPrice: "3,200",
    rating: 4.7,
    distance: "1.5 km",
    tag: "E-Commerce", // Section B [cite: 16]
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Bulk Pack: Roasted Almonds (5kg)",
    seller: "Wholesale Central",
    price: "4,800",
    oldPrice: "6,000",
    rating: 4.8,
    distance: "3.2 km",
    tag: "Wholesale", // Section C [cite: 21]
    image:
      "https://images.unsplash.com/photo-1508061461508-cb18c242f556?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Vase",
    seller: "Modern Home Decor",
    price: "899",
    oldPrice: "1,200",
    rating: 4.6,
    distance: "2.1 km",
    tag: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function TrendingProducts() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-2">
              Trending in Gurugram
            </h2>
            <p className="text-zinc-500 font-medium">
              Most loved products from your nearby verified sectors.
            </p>
          </motion.div>

          <button className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">
            Explore All Products{" "}
            <Zap size={16} fill="currentColor" className="text-yellow-400" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-100 mb-5 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Vertical Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-tighter text-zinc-900 shadow-sm">
                    {product.tag}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white text-zinc-400 hover:text-red-500 shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Heart size={18} />
                </button>

                {/* Add to Cart Overlay */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-2">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} className="text-zinc-400" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                    {product.seller}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors truncate">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-zinc-900">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-zinc-400 line-through font-medium">
                      ₹{product.oldPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-lg">
                    <Star
                      size={12}
                      fill="currentColor"
                      className="text-zinc-900"
                    />
                    <span className="text-xs font-bold text-zinc-900">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-400">
                  <MapPin size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-tight">
                    {product.distance} from your sector
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
