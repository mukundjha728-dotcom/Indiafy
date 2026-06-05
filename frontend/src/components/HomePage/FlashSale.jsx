import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ArrowRight, Star, ShoppingCart, Clock } from "lucide-react";

const flashProducts = [
  {
    id: "fs-1",
    name: "Premium Wireless Earbuds Pro",
    price: "1,999",
    oldPrice: "4,999",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fs-2",
    name: "Organic Green Tea Collection",
    price: "349",
    oldPrice: "899",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fs-3",
    name: "Bamboo Kitchen Organizer Set",
    price: "799",
    oldPrice: "1,599",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fs-4",
    name: "Handwoven Cotton Throw Blanket",
    price: "1,299",
    oldPrice: "2,499",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fs-5",
    name: "Stainless Steel Water Bottle 1L",
    price: "499",
    oldPrice: "1,199",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
  },
];

function getTimeUntilNextReset() {
  const now = new Date();
  const hours = now.getHours();
  const nextSlot = Math.ceil((hours + 1) / 6) * 6;
  const reset = new Date(now);
  reset.setHours(nextSlot, 0, 0, 0);
  if (reset <= now) reset.setHours(reset.getHours() + 6);
  return reset - now;
}

function formatCountdown(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return { h: String(h).padStart(2, '0'), m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') };
}

export default function FlashSale() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextReset());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNextReset());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { h, m, s } = formatCountdown(timeLeft);

  return (
    <section className="py-section-mobile md:py-16 bg-gradient-to-br from-amber-50 via-orange-50/50 to-white" id="flash-sale">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Flame size={24} className="text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary">Flash Sale</h2>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-text-secondary" />
              <span className="text-xs font-medium text-brand-text-secondary">Ends in</span>
              <div className="flex gap-1">
                {[h, m, s].map((val, i) => (
                  <React.Fragment key={i}>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm font-bold">
                      {val}
                    </span>
                    {i < 2 && <span className="text-brand-primary font-bold">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          <button
            onClick={() => navigate("/search?q=sale")}
            className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            View All Deals <ArrowRight size={16} />
          </button>
        </div>

        {/* Products Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-2 px-2">
          {flashProducts.map((product, index) => {
            const old = parseFloat(product.oldPrice.replace(/,/g, ''));
            const cur = parseFloat(product.price.replace(/,/g, ''));
            const discount = Math.round(((old - cur) / old) * 100);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex-none w-[200px] sm:w-[220px] snap-start group"
              >
                <div
                  className="bg-white rounded-card border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-orange-500 text-white text-[10px] font-bold flex items-center gap-1">
                      <Flame size={10} /> {discount}% OFF
                    </div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-sm font-semibold text-brand-primary line-clamp-1 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={11} fill="#F59E0B" className="text-amber-400" />
                      <span className="text-[11px] font-semibold text-amber-700">{product.rating}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-brand-primary">₹{product.price}</span>
                      <span className="text-xs text-brand-text-secondary line-through">₹{product.oldPrice}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
