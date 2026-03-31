import { useState, useEffect } from "react";
import { Star, Quote, CheckCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aman Verma",
    initials: "AV",
    role: "Resident, DLF Phase 3",
    content:
      "Quick Commerce vertical is actually quick! Got my groceries in 12 minutes. The nearest seller prioritization really works for Gurugram traffic.",
    rating: 5,
    verified: true,
  },
  {
    name: "Priyanka Chopra",
    initials: "PC",
    role: "Corporate Professional",
    content:
      "The Video Packing feature is a lifesaver. I ordered high-end cosmetics and seeing the seller pack them on video gave me 100% peace of mind.",
    rating: 5,
    verified: true,
  },
  {
    name: "Rajesh Gupta",
    initials: "RG",
    role: "Bulk Buyer / SME",
    content:
      "Using the Wholesale section for my office pantry. The tiered pricing is transparent and the bulk delivery partner was very professional.",
    rating: 4,
    verified: true,
  },
  {
    name: "Sanya Malhotra",
    initials: "SM",
    role: "Sector 56 Resident",
    content:
      "I love that the rider used a platform QR for payment. No confusion with personal UPI IDs. Very secure and disciplined system.",
    rating: 5,
    verified: true,
  },
];

// Reusable Review Card Component
const ReviewCard = ({ review }) => (
  <div className="h-full group p-8 rounded-[2rem] bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-emerald-200 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
    {/* Background Watermark Icon */}
    <Quote
      size={140}
      className="absolute -top-8 -right-8 text-zinc-50 group-hover:text-emerald-50 transition-colors duration-500 z-0"
    />

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill="currentColor"
              className="text-amber-400"
            />
          ))}
        </div>
      </div>

      <p className="text-zinc-700 text-sm font-medium leading-relaxed mb-8">
        "{review.content}"
      </p>
    </div>

    <div className="pt-6 border-t border-zinc-100 relative z-10 flex items-center gap-4">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 font-black text-xs shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
        {review.initials}
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-black text-zinc-900 text-sm tracking-tight">
            {review.name}
          </span>
          {review.verified && (
            <CheckCircle size={14} className="text-emerald-500" />
          )}
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <MapPin size={10} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {review.role}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Scroll Logic for Mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-emerald-500"></span>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
                Community Trust
              </h2>
              <span className="w-8 h-[2px] bg-emerald-500"></span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter">
              Trusted by thousands <br />
              <span className="text-zinc-400 italic">across Gurugram.</span>
            </h3>
          </motion.div>
        </div>

        {/* 📱 MOBILE CAROUSEL VIEW (Hidden on Desktop) */}
        <div className="md:hidden relative w-full overflow-hidden pb-4">
          <motion.div
            className="flex w-full"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="w-full shrink-0 px-2">
                <ReviewCard review={review} />
              </div>
            ))}
          </motion.div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-6 bg-emerald-500"
                    : "w-1.5 bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 💻 DESKTOP GRID VIEW (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* Trust Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center gap-6 sm:gap-12 opacity-60 hover:opacity-100 transition-all duration-700"
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-900">
            <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span> 10k+
            Orders
          </div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-900">
            <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span> 500+
            Verified Nodes
          </div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-900">
            <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>{" "}
            Gurugram's Top Choice
          </div>
        </motion.div>
      </div>
    </section>
  );
}
