import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Truck,
  MapPin,
  Video,
  QrCode,
  ShoppingBag,
  Star,
  Clock,
  ShieldCheck,
  BadgeCheck,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";

// Ensure these paths match your folder structure exactly
import WebsiteNavbar from "../WebsiteNavbar";
import Footer from "../Footer";

const ORDER_DATA = {
  id: "IND-7829134",
  status: "preparing",
  eta: "15-25 mins", // As per Quick Commerce SLA [cite: 13]
  seller: {
    name: "Sharma Electronics",
    sector: "Sector 45, Gurugram",
    videoPacking: true,
  },
  total: 26489,
  items: [
    {
      id: 1,
      name: "Sony WH-1000XM5 Wireless Headphones",
      qty: 1,
      price: 24990,
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    },
  ],
};

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-50 min-h-screen font-sans">
      <WebsiteNavbar />

      <main className="max-w-3xl mx-auto px-4 pt-32 pb-24">
        {/* SUCCESS HERO */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-200"
          >
            <CheckCircle2 size={40} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter mb-2">
            Order Confirmed!
          </h1>
          <p className="text-zinc-500 font-medium">
            Order ID:{" "}
            <span className="text-zinc-900 font-bold">#{ORDER_DATA.id}</span>
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. SECTOR-BASED TRACKING CARD [cite: 84] */}
          <section className="bg-zinc-900 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">
                    Sector ETA
                  </p>
                  <h2 className="text-5xl font-black">{ORDER_DATA.eta}</h2>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <Truck size={32} className="text-emerald-400" />
                </div>
              </div>

              {/* Status Tracker */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex-1 h-1.5 bg-emerald-500 rounded-full" />
                <div className="flex-1 h-1.5 bg-white/20 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-emerald-400/50"
                  />
                </div>
                <div className="flex-1 h-1.5 bg-white/20 rounded-full" />
              </div>

              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <span className="text-emerald-400">Confirmed</span>
                <span className="text-white">Preparing</span>
                <span>Out for Delivery</span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 text-white/5 rotate-12">
              <QrCode size={200} />
            </div>
          </section>

          {/* 2. ANTI-FRAUD: VIDEO PACKING [cite: 57] */}
          <section className="bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 border border-zinc-100">
                <Video size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black uppercase tracking-tight">
                  Packing Proof
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Mandatory video recording in progress by seller.
                </p>
              </div>
              <div className="px-3 py-1 bg-zinc-100 rounded-full text-[9px] font-black uppercase text-zinc-400 animate-pulse">
                Live Recording
              </div>
            </div>
          </section>

          {/* 3. ORDER SUMMARY */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
            <div className="space-y-4">
              {ORDER_DATA.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100"
                >
                  <img
                    src={item.img}
                    className="w-16 h-16 rounded-xl object-cover"
                    alt="item"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-zinc-900 text-sm">
                      {item.name}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-bold text-zinc-400 uppercase">
                        Qty: {item.qty}
                      </span>
                      <span className="font-black text-zinc-900">
                        {fmt(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-emerald-600 text-xs uppercase">
                <ShieldCheck size={18} /> Secure Transaction
              </div>
              <p className="text-2xl font-black text-zinc-900">
                {fmt(ORDER_DATA.total)}
              </p>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => navigate("/")}
              className="py-5 bg-zinc-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-zinc-800 transition-all"
            >
              Track Rider
            </button>
            <button
              onClick={() => navigate("/")}
              className="py-5 bg-white border-2 border-zinc-900 text-zinc-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-zinc-50 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
