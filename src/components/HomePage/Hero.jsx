import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Background Blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-16 items-center"
      >
        {/* LEFT SIDE */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-600 mb-6"
          >
            <MapPin size={16} />
            Now Live Across West Gurugram
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            West Gurugram’s
            <br />
            <span className="text-blue-600">Hyperlocal Commerce Platform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg text-gray-600 max-w-xl"
          >
            Discover curated stores across West Gurugram. Browse real
            inventories. Order with confidence. Powered by structured delivery
            partnerships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
              Start Shopping
              <ArrowRight size={20} />
            </button>

            <button className="px-8 py-3 border border-gray-300 rounded-xl text-lg font-medium hover:bg-gray-100 transition">
              Become a Seller
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative flex justify-center"
        >
          {/* Floating Animation Wrapper */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white rounded-3xl shadow-2xl p-6 border w-full max-w-md"
          >
            <div className="text-lg font-semibold mb-4">
              Trending Categories
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["Grocery", "Pharmacy", "Garments", "Essentials"].map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-5 rounded-xl border text-center font-medium hover:bg-white hover:shadow-md transition"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </motion.div>

          {/* Floating Badge 1 */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute -top-6 -left-10 bg-white shadow-lg px-4 py-2 rounded-xl border text-sm font-medium"
          >
            50+ Curated Stores
          </motion.div>

          {/* Floating Badge 2 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute -bottom-6 -right-10 bg-white shadow-lg px-4 py-2 rounded-xl border text-sm font-medium"
          >
            Fast Delivery Partners
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
