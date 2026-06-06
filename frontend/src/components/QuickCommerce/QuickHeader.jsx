import { useState } from "react";
import { MapPin, ChevronDown, Zap, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuickHeader() {
  const navigate = useNavigate();
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Left: Back + Location */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 active:scale-95 transition-all shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={16} className="text-zinc-700" />
          </button>

          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="flex items-center gap-1.5 min-w-0 group"
          >
            <div className="w-7 h-7 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
              <MapPin size={14} className="text-brand-accent" />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Deliver to
                </span>
                <ChevronDown size={10} className="text-zinc-400 group-hover:text-brand-accent transition-colors" />
              </div>
              <p className="text-xs font-extrabold text-zinc-900 truncate max-w-[160px] sm:max-w-[240px]">
                Sector 45, Gurugram
              </p>
            </div>
          </button>
        </div>

        {/* Center: ETA Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1.5 bg-brand-accent/10 border border-brand-accent/20 px-3 py-1.5 rounded-full shrink-0"
        >
          <Zap size={12} className="text-brand-accent fill-brand-accent" />
          <span className="text-[11px] font-extrabold text-brand-accent whitespace-nowrap">
            12 min
          </span>
        </motion.div>

        {/* Right: Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-700 active:scale-95 transition-all shrink-0"
          aria-label="Profile"
        >
          <User size={14} className="text-white" />
        </button>
      </div>
    </header>
  );
}
