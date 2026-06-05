import React, { memo, useEffect } from "react";
import {
  ShoppingBag,
  ShoppingBasket,
  Pill,
  Tv,
  Lamp,
  Scissors,
  ArrowRight,
  Box,
  Heart,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/productStore";

const categoryStyles = [
  { bg: "bg-gradient-to-br from-emerald-50 to-teal-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { bg: "bg-gradient-to-br from-rose-50 to-pink-50", iconBg: "bg-rose-100", iconColor: "text-rose-600" },
  { bg: "bg-gradient-to-br from-blue-50 to-indigo-50", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { bg: "bg-gradient-to-br from-amber-50 to-orange-50", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { bg: "bg-gradient-to-br from-purple-50 to-violet-50", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  { bg: "bg-gradient-to-br from-red-50 to-rose-50", iconBg: "bg-red-100", iconColor: "text-red-600" },
  { bg: "bg-gradient-to-br from-cyan-50 to-sky-50", iconBg: "bg-cyan-100", iconColor: "text-cyan-600" },
  { bg: "bg-gradient-to-br from-slate-50 to-gray-100", iconBg: "bg-slate-100", iconColor: "text-slate-600" },
];

const fallbackCategories = [
  { name: "Groceries", slug: "grocery", icon: <ShoppingBasket size={24} /> },
  { name: "Fashion", slug: "garments", icon: <ShoppingBag size={24} /> },
  { name: "Electronics", slug: "electronics", icon: <Tv size={24} /> },
  { name: "Home & Living", slug: "home-decor", icon: <Lamp size={24} /> },
  { name: "Beauty", slug: "beauty", icon: <Scissors size={24} /> },
  { name: "Healthcare", slug: "pharmacy", icon: <Pill size={24} /> },
  { name: "Wholesale", slug: "wholesale", icon: <Box size={24} /> },
  { name: "Services", slug: "services", icon: <Wrench size={24} /> },
];

const BrowseCategories = memo(function BrowseCategories() {
  const { categories, fetchCategories } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const getIcon = (name) => {
    if (!name || typeof name !== 'string') return <Box size={24} />;
    const lower = name.toLowerCase();
    if (lower.includes('garment') || lower.includes('cloth') || lower.includes('fashion')) return <ShoppingBag size={24} />;
    if (lower.includes('grocery') || lower.includes('food')) return <ShoppingBasket size={24} />;
    if (lower.includes('pharm') || lower.includes('med') || lower.includes('health')) return <Pill size={24} />;
    if (lower.includes('elect')) return <Tv size={24} />;
    if (lower.includes('home') || lower.includes('decor')) return <Lamp size={24} />;
    if (lower.includes('care') || lower.includes('beauty')) return <Scissors size={24} />;
    if (lower.includes('wholesale') || lower.includes('bulk')) return <Box size={24} />;
    return <Box size={24} />;
  };

  const validCategories = Array.isArray(categories)
    ? categories.filter(cat => cat && typeof cat === 'string')
    : [];

  const displayCategories = validCategories.length > 0
    ? validCategories.map(cat => ({
        name: cat,
        slug: cat.toLowerCase().replace(/\s+/g, '-'),
        icon: getIcon(cat)
      }))
    : fallbackCategories;

  return (
    <section className="py-section-mobile md:py-section-tablet lg:py-20 bg-white" id="categories">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="section-heading mb-2">Shop by Category</h2>
            <p className="text-brand-text-secondary text-base font-medium max-w-md">
              Explore verified local sellers across every category
            </p>
          </div>
          <Link
            to="/local-sellers"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayCategories.slice(0, 8).map((category, index) => {
            const style = categoryStyles[index % categoryStyles.length];
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  to={category.slug === 'wholesale' ? '/wholesale' : `/category/${category.slug}`}
                  className={`group block ${style.bg} rounded-card p-6 border border-brand-border/50 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`w-12 h-12 mb-5 flex items-center justify-center rounded-2xl ${style.iconBg} ${style.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-base font-bold text-brand-primary mb-1">
                    {category.name}
                  </h3>
                  <span className="text-xs font-medium text-brand-text-secondary flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                    Explore
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-2 px-2">
          {displayCategories.slice(0, 8).map((category, index) => {
            const style = categoryStyles[index % categoryStyles.length];
            return (
              <Link
                key={category.slug}
                to={category.slug === 'wholesale' ? '/wholesale' : `/category/${category.slug}`}
                className={`flex-none w-[140px] snap-start ${style.bg} rounded-2xl p-4 border border-brand-border/50`}
              >
                <div className={`w-10 h-10 mb-3 flex items-center justify-center rounded-xl ${style.iconBg} ${style.iconColor}`}>
                  {category.icon}
                </div>
                <h3 className="text-sm font-bold text-brand-primary">{category.name}</h3>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <Link
          to="/local-sellers"
          className="md:hidden flex items-center justify-center gap-2 mt-4 text-sm font-semibold text-brand-accent"
        >
          View All Categories <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
});

BrowseCategories.displayName = 'BrowseCategories';

export default BrowseCategories;
