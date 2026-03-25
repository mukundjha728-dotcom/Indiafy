import {
  Star,
  MapPin,
  BadgeCheck,
  ArrowUpRight,
  Circle,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

function VerifiedStores() {
  const stores = [
    {
      name: "Sharma General Store",
      category: "Quick Commerce • Essentials",
      distance: "0.8 km",
      rating: "4.8",
      delivery: "15 mins",
      image:
        "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=1200",
      live: true,
      tag: "Top Rated",
    },
    {
      name: "HealthFirst Pharmacy",
      category: "Quick Commerce • Healthcare",
      distance: "1.2 km",
      rating: "4.9",
      delivery: "12 mins",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200",
      live: true,
    },
    {
      name: "The Boutique Hub",
      category: "E-Commerce • Fashion",
      distance: "0.5 km",
      rating: "4.5",
      delivery: "Same Day",
      image:
        "https://images.unsplash.com/photo-1520975954732-35dd22d79b38?q=80&w=1200",
      live: false,
    },
  ];

  return (
    <section className="pt-24 pb-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER AREA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <BadgeCheck className="text-zinc-900" size={20} />
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-500">
                Verified Ecosystem
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
              Nearby Verified Sellers
            </h2>
            <p className="text-zinc-500 mt-2 text-lg">
              Operating with strict operational discipline across Gurugram
              sectors.
            </p>
          </div>

          <button className="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-300 transition-all">
            View All Local Sellers
          </button>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* FEATURED LARGE CARD (Quick Commerce Focus) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-zinc-900 aspect-[16/10] lg:aspect-auto"
          >
            <img
              src={stores[0].image}
              alt={stores[0].name}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex gap-3">
              {stores[0].live && (
                <div className="bg-emerald-500/90 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Live Now
                </div>
              )}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                {stores[0].tag}
              </div>
            </div>

            <div className="absolute top-6 right-6 bg-white text-zinc-900 p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center">
              <Zap size={18} className="mb-1" />
              <span className="text-xs font-black">{stores[0].delivery}</span>
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm">
                  <Star size={14} fill="currentColor" className="text-white" />
                  {stores[0].rating}
                </div>
                <div className="flex items-center gap-1 text-zinc-300 text-sm font-medium">
                  <MapPin size={14} />
                  {stores[0].distance} away
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {stores[0].name}
              </h3>
              <p className="text-zinc-400 font-medium">{stores[0].category}</p>
            </div>
          </motion.div>

          {/* SIDE LIST CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {stores.slice(1).map((store, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative bg-zinc-50 rounded-[2rem] p-4 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200 transition-all duration-500"
              >
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    {store.live && (
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-zinc-900">
                        Live
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center flex-1 pr-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-zinc-900 text-lg leading-tight">
                        {store.name}
                      </h3>
                      <div className="flex items-center gap-1 text-zinc-900 font-bold text-sm bg-white px-2 py-1 rounded-lg shadow-sm border border-zinc-100">
                        <Star size={12} fill="currentColor" />
                        {store.rating}
                      </div>
                    </div>

                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-tighter mb-4">
                      {store.category}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-bold">
                        <MapPin size={14} className="text-zinc-300" />
                        {store.distance}
                      </div>
                      <button className="p-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Placeholder for more stores */}
            <div className="mt-2 p-6 border-2 border-dashed border-zinc-200 rounded-[2rem] flex items-center justify-center">
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                + 42 more verified stores nearby
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifiedStores;
