import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  CreditCard,
  Lock,
  LogOut,
  Plus,
  Edit3,
  ChevronRight,
  BadgeCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Layout Components
import WebsiteNavbar from "../../components/WebsiteNavbar";
import Footer from "../../components/Footer";
import { useProfileStore } from "../../store/profileStore";

export default function CustomerProfile() {
  const { profile, fetchProfile, isLoading } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading || !profile) {
    return (
      <div className="bg-zinc-950 min-h-screen text-zinc-400 flex items-center justify-center">
        <p className="text-xl font-bold uppercase tracking-widest text-zinc-500">Loading Profile...</p>
      </div>
    );
  }

  const user = {
    name: `${profile.firstName} ${profile.lastName}`.trim() || "Customer",
    phone: profile.contact || "Not provided",
    email: profile.email || "No Email",
    memberSince: new Date(profile.createdAt).getFullYear() || "2024",
    role: "Premium Member",
  };

  const addresses = profile.address || [];

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-400">
      <WebsiteNavbar />

      <main className="max-w-6xl mx-auto px-4 pt-32 pb-24">
        {/* PROFILE HEADER CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 md:p-12 mb-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-800 border-4 border-zinc-950 overflow-hidden shadow-2xl">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Arjun&backgroundColor=b6e3f4"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-2xl border-4 border-zinc-900 shadow-lg">
                <BadgeCheck size={20} className="text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="px-3 py-1 bg-zinc-950 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Verified Account
                </span>
                <span className="px-3 py-1 bg-zinc-950 text-orange-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-500/20">
                  {user.role}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                {user.name}
              </h1>
              <p className="text-zinc-500 font-medium">
                {user.email} • Joined {user.memberSince}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-3xl text-center min-w-[120px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">
                  Orders
                </p>
                <p className="text-xl font-black text-white">42</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-3xl text-center min-w-[120px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">
                  Points
                </p>
                <p className="text-xl font-black text-emerald-500">1.2k</p>
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-zinc-800/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: PERSONAL INFO */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                  Contact Details
                </h3>
                <button className="p-2 hover:bg-zinc-800 rounded-xl transition-all text-zinc-600 hover:text-white">
                  <Edit3 size={16} />
                </button>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-zinc-600">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-zinc-600">
                      Full Name
                    </p>
                    <p className="text-sm font-black text-zinc-300">
                      {user.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-zinc-600">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-zinc-600">
                      Mobile
                    </p>
                    <p className="text-sm font-black text-zinc-300">
                      {user.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-zinc-600">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-zinc-600">
                      Email Address
                    </p>
                    <p className="text-sm font-black text-zinc-300 truncate w-40">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">
                Security
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all group">
                  <div className="flex items-center gap-3">
                    <Lock
                      size={16}
                      className="text-zinc-600 group-hover:text-white"
                    />
                    <span className="text-sm font-bold text-zinc-400 group-hover:text-zinc-200">
                      Change Password
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-zinc-800" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-red-900/30 transition-all group hover:bg-red-950/10">
                  <div className="flex items-center gap-3">
                    <LogOut
                      size={16}
                      className="text-red-900 group-hover:text-red-500"
                    />
                    <span className="text-sm font-bold text-red-900 group-hover:text-red-500">
                      Sign Out
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: PREFERENCES & ADDRESSES */}
          <div className="lg:col-span-2 space-y-8">
            {/* QUICK COMMERCE ADDRESSES */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                  Sector Locations
                </h3>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white bg-zinc-800 px-4 py-2 rounded-xl hover:bg-zinc-700 transition-all">
                  <Plus size={14} /> Add New
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {addresses.length === 0 ? (
                  <p className="text-zinc-500 text-sm">No addresses saved yet.</p>
                ) : (
                  addresses.map((addr, idx) => (
                    <div
                      key={addr._id || idx}
                      className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${idx === 0 ? "border-zinc-700 bg-zinc-950/50" : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/20"}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                          <MapPin size={16} />
                        </div>
                        {idx === 0 && (
                          <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="font-black text-white text-base mb-1 uppercase tracking-tight">
                        {addr.nearBy}
                      </p>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        {addr.street}
                        <br />
                        {addr.city}, {addr.state}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-8">
                Secure Payments
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-zinc-950 rounded-[2rem] border border-zinc-800 group hover:border-zinc-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-10 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center">
                      <Zap size={20} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-200">
                        Saved UPI (GPay)
                      </p>
                      <p className="text-[10px] font-bold text-zinc-600 uppercase">
                        Primary Method
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-zinc-800 group-hover:text-zinc-600"
                  />
                </div>

                <div className="flex items-center justify-between p-5 bg-zinc-950 rounded-[2rem] border border-zinc-800 group hover:border-zinc-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-10 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center">
                      <CreditCard size={20} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-200">
                        Visa ending 4242
                      </p>
                      <p className="text-[10px] font-bold text-zinc-600 uppercase">
                        Expires 09/27
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-zinc-800 group-hover:text-zinc-600"
                  />
                </div>
              </div>
            </div>

            {/* PROTECTION SIGNAL */}
            <div className="p-8 bg-emerald-500/5 rounded-[2.5rem] border border-emerald-500/10 flex items-center gap-6">
              <ShieldCheck className="text-emerald-500 shrink-0" size={32} />
              <div>
                <p className="text-xs font-black uppercase text-emerald-500 tracking-widest mb-1">
                  Operational Privacy
                </p>
                <p className="text-[11px] font-medium text-emerald-500/60 leading-relaxed uppercase tracking-tighter">
                  All personal data is encrypted via Indiafy Node Security. We
                  never share your sector-specific movements with external
                  aggregators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
