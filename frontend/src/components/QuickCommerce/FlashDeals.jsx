import { useState, useEffect, useRef } from "react";
import { Zap, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { FlashDealSkeleton } from "./LoadingSkeletons";

const FLASH_DEALS = [
  {
    id: "fd-1",
    name: "Fresh Tomatoes",
    weight: "1 kg",
    price: 39,
    mrp: 50,
    discount: "22% OFF",
    eta: "12 min",
    img: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=300&q=80",
    endsIn: 8100, // seconds
  },
  {
    id: "fd-2",
    name: "Nagpur Oranges",
    weight: "500 g",
    price: 69,
    mrp: 100,
    discount: "31% OFF",
    eta: "15 min",
    img: "https://images.unsplash.com/photo-1611080661265-d04b86bb3d58?w=300&q=80",
    endsIn: 5400,
  },
  {
    id: "fd-3",
    name: "Mother Dairy Paneer",
    weight: "200 g",
    price: 65,
    mrp: 90,
    discount: "28% OFF",
    eta: "10 min",
    img: "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=300&q=80",
    endsIn: 3600,
  },
  {
    id: "fd-4",
    name: "Red Bull Energy",
    weight: "250 ml",
    price: 99,
    mrp: 125,
    discount: "21% OFF",
    eta: "12 min",
    img: "https://images.unsplash.com/photo-1568227451296-17631cc1fa23?w=300&q=80",
    endsIn: 7200,
  },
  {
    id: "fd-5",
    name: "Amul Butter",
    weight: "100 g",
    price: 48,
    mrp: 60,
    discount: "20% OFF",
    eta: "10 min",
    img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80",
    endsIn: 6000,
  },
];

function Countdown({ seconds: initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <span className="text-[10px] font-extrabold text-red-600 tabular-nums">
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}

export default function FlashDeals({ onAdd, isLoading }) {
  if (isLoading) {
    return (
      <div className="px-4 py-4 bg-white border-b border-zinc-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="w-32 h-4 bg-zinc-100 rounded-md mb-3 animate-pulse" />
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <FlashDealSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 bg-gradient-to-r from-red-50/50 via-white to-orange-50/50 border-b border-zinc-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <Zap size={12} className="text-red-600 fill-red-600" />
            </div>
            <h2 className="text-sm font-extrabold text-zinc-900">Flash Deals</h2>
            <span className="text-[9px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              Live
            </span>
          </div>
          <button className="flex items-center gap-0.5 text-[10px] font-bold text-brand-accent uppercase tracking-wider hover:underline">
            View All <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {FLASH_DEALS.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="shrink-0 w-[180px] sm:w-[200px] bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:border-red-200 hover:shadow-md transition-all group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-24 bg-zinc-50 overflow-hidden">
                <img
                  src={deal.img}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Discount badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <Zap size={8} className="fill-white" />
                  {deal.discount}
                </div>
                {/* ETA */}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1 border border-zinc-100">
                  <Clock size={8} className="text-zinc-500" />
                  <span className="text-[9px] font-bold text-zinc-600">
                    {deal.eta}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5">
                <p className="text-[11px] font-bold text-zinc-800 leading-tight line-clamp-1 mb-0.5">
                  {deal.name}
                </p>
                <p className="text-[9px] font-semibold text-zinc-400 mb-2">
                  {deal.weight}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-zinc-900">
                      ₹{deal.price}
                    </span>
                    <span className="text-[9px] text-zinc-400 line-through ml-1 font-bold">
                      ₹{deal.mrp}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onAdd(deal.id); }}
                    className="h-7 px-3 bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-white text-[10px] font-extrabold rounded-lg active:scale-90 transition-all"
                    aria-label={`Add ${deal.name}`}
                  >
                    ADD
                  </button>
                </div>

                {/* Countdown */}
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-zinc-50">
                  <Clock size={9} className="text-red-400" />
                  <span className="text-[9px] font-semibold text-zinc-400">Ends in</span>
                  <Countdown seconds={deal.endsIn} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
