import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Truck,
  Clock,
  Video,
  Phone,
  MessageSquare,
  ChevronLeft,
  ShieldCheck,
  BadgeCheck,
  RefreshCcw,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";

// Layout Components
import WebsiteNavbar from "../WebsiteNavbar";
import Footer from "../Footer";

const ORDER = {
  id: "IND-7829134",
  etaMinutes: 18,
  seller: { name: "Sharma Electronics", sector: "Sector 45", dist: "1.2 km" },
  rider: {
    name: "Rahul Kumar",
    phone: "+91 98765 12345",
    rating: 4.9,
    vehicle: "Bajaj Pulsar (KA 05 EF 7823)",
  },
  currentStep: 3,
};

const STEPS = [
  {
    label: "Order Placed",
    sub: "Received by Indiafy Node",
    icon: <BadgeCheck size={18} />,
  },
  {
    label: "Seller Accepted",
    sub: "Inventory check complete",
    icon: <ShieldCheck size={18} />,
  },
  {
    label: "Video Packing",
    sub: "Proof attached to Order ID",
    icon: <Video size={18} />,
  },
  {
    label: "On the Way",
    sub: "Rider navigating Sector 45",
    icon: <Truck size={18} />,
  },
];

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] ${className}`}
  >
    {children}
  </div>
);

export default function OrderTrackingPage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-400">
      <WebsiteNavbar />

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            >
              <ChevronLeft size={14} /> Back to Orders
            </button>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              Track <span className="text-zinc-700 italic">Live</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* ETA CARD */}
            <Card className="p-10 bg-gradient-to-br from-zinc-900 to-zinc-950">
              <div className="relative z-10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-2">
                    Estimated Arrival
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-7xl font-black text-white">
                      {ORDER.etaMinutes}
                    </h2>
                    <span className="text-zinc-600 text-xl font-bold uppercase tracking-widest">
                      Mins
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-tighter">
                    Current Hub
                  </p>
                  <p className="text-sm font-black text-white">
                    {ORDER.seller.sector}
                  </p>
                </div>
              </div>
            </Card>

            {/* STATUS TRACKER */}
            <Card className="p-8">
              <div className="space-y-8">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${i === ORDER.currentStep ? "bg-orange-500 text-white" : i < ORDER.currentStep ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-900 text-zinc-700"}`}
                      >
                        {i < ORDER.currentStep ? (
                          <BadgeCheck size={20} />
                        ) : (
                          step.icon
                        )}
                      </div>
                      {i !== STEPS.length - 1 && (
                        <div className="w-0.5 h-10 my-1 bg-zinc-800" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className={`text-sm font-black uppercase tracking-tight ${i === ORDER.currentStep ? "text-white" : "text-zinc-700"}`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[11px] font-medium text-zinc-500 mt-1">
                        {step.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* RIDER INFO CARD - Fixed Closing Tag */}
            <Card className="p-8 bg-zinc-900 shadow-2xl">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-orange-500 flex items-center justify-center text-white font-black text-2xl">
                  RK
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">
                    {ORDER.rider.name}
                  </h4>
                  <p className="text-xs font-medium text-zinc-500">
                    {ORDER.rider.vehicle}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-4 bg-white text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-widest">
                  <Phone size={16} /> Call
                </button>
                <button className="flex items-center justify-center gap-3 py-4 bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-zinc-700">
                  <MessageSquare size={16} /> Chat
                </button>
              </div>
            </Card>

            {/* TRUST SIGNAL BOX */}
            <div className="p-6 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-emerald-500" size={20} />
                <p className="text-xs font-black uppercase text-emerald-500 tracking-tighter">
                  Operational Discipline
                </p>
              </div>
              <p className="text-[11px] font-medium text-emerald-500/60 leading-relaxed uppercase tracking-tighter">
                Order packed with manual sector-verification. Dynamic QR enabled
                for secure payment. [cite: 31, 61]
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
