import { Star, MapPin, BadgeCheck, ArrowUpRight, Circle } from "lucide-react";
import { motion } from "framer-motion";

/*
===========================================================
BACKEND INTEGRATION NOTE (IMPORTANT)

Replace static `stores` array with API call:

GET /api/stores/verified?location=west-gurugram

Expected Response:

[
  {
    id: string,
    name: string,
    category: string,
    distance_km: number,
    rating: number,
    delivery_time_min: number,
    cover_image_url: string,
    logo_url: string,
    is_live: boolean,
    is_verified: boolean
  }
]

If cover_image_url exists → render <img>
Else → render gradient placeholder.

Image optimization required.
Use CDN + lazy loading.
===========================================================
*/

function VerifiedStores() {
  const stores = [
    {
      name: "Sharma General Store",
      category: "Groceries • Essentials",
      distance: "0.8 km",
      rating: "4.8",
      delivery: "15 mins",
      image:
        "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=1200",
      live: true,
    },
    {
      name: "HealthFirst Pharmacy",
      category: "Medicines • Personal Care",
      distance: "1.2 km",
      rating: "4.9",
      delivery: "12 mins",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200",
      live: true,
    },
    {
      name: "The Boutique Hub",
      category: "Fashion • Accessories",
      distance: "0.5 km",
      rating: "4.5",
      delivery: "20 mins",
      image:
        "https://images.unsplash.com/photo-1520975954732-35dd22d79b38?q=80&w=1200",
      live: false,
    },
  ];

  return (
    <section className="pt-16 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            Verified Nearby Sellers
            <BadgeCheck className="text-blue-600" size={26} />
          </h2>
          <p className="text-gray-600 mt-3">
            Trusted stores delivering across West Gurugram
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* FEATURED CARD */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2 group rounded-3xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={stores[0].image}
                alt={stores[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {stores[0].live && (
                <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs flex items-center gap-2">
                  <Circle size={8} className="fill-green-400 text-green-400" />
                  Live
                </div>
              )}

              <div className="absolute top-5 right-5 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-xl shadow-md">
                {stores[0].delivery}
              </div>

              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded-lg text-sm">
                    <Star size={14} fill="currentColor" />
                    {stores[0].rating}
                  </div>

                  <div className="flex items-center gap-1 text-sm opacity-90">
                    <MapPin size={14} />
                    {stores[0].distance}
                  </div>
                </div>

                <h3 className="text-2xl font-semibold">{stores[0].name}</h3>

                <p className="text-sm opacity-80 mt-1">{stores[0].category}</p>
              </div>
            </div>
          </motion.div>

          {/* SIDE CARDS */}
          <div className="flex flex-col gap-8">
            {stores.slice(1).map((store, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
                className="group bg-gray-50 rounded-3xl p-5 hover:shadow-xl transition-all duration-300 border"
              >
                <div className="flex gap-5">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    {store.live && (
                      <div className="absolute top-2 left-2 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                        <Circle
                          size={6}
                          className="fill-green-500 text-green-500"
                        />
                        Live
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        {store.name}
                      </h3>

                      <div className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
                        <Star size={14} fill="currentColor" />
                        {store.rating}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {store.category}
                    </p>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                      <MapPin size={14} />
                      {store.distance}
                    </div>

                    <button className="mt-4 text-blue-600 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Browse Store
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifiedStores;
