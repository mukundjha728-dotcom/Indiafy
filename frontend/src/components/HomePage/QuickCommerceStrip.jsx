import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ShoppingBasket, Pill, Package, ArrowRight } from "lucide-react";

const quickCategories = [
  {
    icon: <ShoppingBasket size={28} className="text-white" />,
    title: "Groceries",
    subtitle: "Fresh fruits, veggies & more",
    bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    icon: <Pill size={28} className="text-white" />,
    title: "Medicines",
    subtitle: "Pharmacy essentials",
    bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    icon: <Package size={28} className="text-white" />,
    title: "Daily Needs",
    subtitle: "Household & personal care",
    bg: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
];

export default function QuickCommerceStrip() {
  const navigate = useNavigate();

  return (
    <section className="py-section-mobile md:py-16 bg-gradient-to-r from-brand-primary to-brand-secondary overflow-hidden" id="quick-commerce">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-brand-accent/20">
                <Zap size={20} className="text-brand-accent fill-current" />
              </div>
              <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">Lightning Fast</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              15-Minute Delivery
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-medium mb-6 max-w-sm">
              Get groceries, medicines and daily essentials delivered to your door in minutes.
            </p>
            <button
              onClick={() => navigate("/quick-commerce")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white font-semibold text-sm rounded-full hover:bg-brand-accent-hover transition-colors"
            >
              Order Now <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Right Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                onClick={() => navigate("/quick-commerce")}
                className={`${cat.bg} rounded-card p-6 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{cat.title}</h3>
                <p className="text-white/70 text-sm font-medium mb-4">{cat.subtitle}</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                  Order Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
