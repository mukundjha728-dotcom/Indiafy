import { Star, Quote, CheckCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aman Verma",
    role: "Resident, DLF Phase 3",
    content:
      "Quick Commerce vertical is actually quick! Got my groceries in 12 minutes. The nearest seller prioritization really works for Gurugram traffic.",
    rating: 5,
    verified: true,
  },
  {
    name: "Priyanka Chopra",
    role: "Corporate Professional",
    content:
      "The Video Packing feature is a lifesaver. I ordered high-end cosmetics and seeing the seller pack them on video gave me 100% peace of mind.",
    rating: 5,
    verified: true,
  },
  {
    name: "Rajesh Gupta",
    role: "Bulk Buyer / SME",
    content:
      "Using the Wholesale section for my office pantry. The tiered pricing is transparent and the bulk delivery partner was very professional.",
    rating: 4,
    verified: true,
  },
  {
    name: "Sanya Malhotra",
    role: "Sector 56 Resident",
    content:
      "I love that the rider used a platform QR for payment. No confusion with personal UPI IDs. Very secure and disciplined system.",
    rating: 5,
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">
              Community Trust
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter">
              Trusted by thousands <br />
              <span className="text-zinc-400 italic">across Gurugram.</span>
            </h3>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      className="text-zinc-900"
                    />
                  ))}
                </div>

                <Quote
                  size={32}
                  className="text-zinc-200 mb-4 group-hover:text-zinc-900 transition-colors duration-500"
                />

                <p className="text-zinc-600 text-sm font-medium leading-relaxed mb-8">
                  "{review.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-200/60">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-zinc-900 text-sm">
                    {review.name}
                  </span>
                  {review.verified && (
                    <CheckCircle size={14} className="text-emerald-500" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <MapPin size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-tight">
                    {review.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
        >
          <div className="text-xs font-black uppercase tracking-widest text-zinc-900">
            10k+ Orders Delivered
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-zinc-900">
            500+ Verified Sellers
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-zinc-900">
            Gurugram's Top Choice
          </div>
        </motion.div>
      </div>
    </section>
  );
}
