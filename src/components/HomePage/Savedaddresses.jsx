import { useState } from "react";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  MoreVertical,
  Trash2,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  X,
  Navigation,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Layout Components
import WebsiteNavbar from "../WebsiteNavbar";
import Footer from "../Footer";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    icon: <Home size={18} />,
    name: "Arjun Mehta",
    phone: "+91 98765 43210",
    street: "House 204, Sector 45",
    city: "Gurugram",
    state: "Haryana",
    zip: "122003",
    default: true,
  },
  {
    id: 2,
    label: "Office",
    icon: <Briefcase size={18} />,
    name: "Arjun Mehta",
    phone: "+91 98765 43210",
    street: "Cyber City, Building 10C",
    city: "Gurugram",
    state: "Haryana",
    zip: "122002",
    default: false,
  },
];

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);

  const deleteAddress = (id) =>
    setAddresses(addresses.filter((a) => a.id !== id));
  const setAsDefault = (id) =>
    setAddresses(addresses.map((a) => ({ ...a, default: a.id === id })));

  return (
    <div className="bg-white min-h-screen">
      <WebsiteNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-zinc-900 tracking-tighter">
              My <span className="text-zinc-300 italic">Locations</span>
            </h1>
            <p className="mt-2 font-medium text-zinc-500">
              Manage your verified sector-mapped delivery addresses.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingAddr(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-zinc-800 transition-all"
          >
            <Plus size={18} /> Add New Address
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {addresses.map((addr) => (
              <motion.div
                key={addr.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative p-8 rounded-[2.5rem] border-2 transition-all ${addr.default ? "border-zinc-900 bg-zinc-50" : "border-zinc-100 hover:border-zinc-300"}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${addr.default ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-400"}`}
                  >
                    {addr.icon}
                  </div>
                  {addr.default && (
                    <span className="px-3 py-1 bg-zinc-900 text-white text-[9px] font-black uppercase rounded-full tracking-widest">
                      Default
                    </span>
                  )}
                </div>

                <div className="space-y-1 mb-8">
                  <h3 className="text-xl font-bold text-zinc-900">
                    {addr.label}
                  </h3>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-tighter">
                    {addr.name}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed mt-2">
                    {addr.street}, {addr.city}, {addr.zip}
                  </p>
                  <p className="text-xs font-black text-zinc-900 mt-2">
                    {addr.phone}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-6 border-t border-zinc-200/50">
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingAddr(addr);
                      setIsModalOpen(true);
                    }}
                    className="p-3 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  {!addr.default && (
                    <button
                      onClick={() => setAsDefault(addr.id)}
                      className="ml-auto text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Ghost Card for adding */}
          <button
            onClick={() => {
              setEditingAddr(null);
              setIsModalOpen(true);
            }}
            className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 border-dashed border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all group min-h-[300px]"
          >
            <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-300 group-hover:scale-110 transition-transform mb-4">
              <Plus size={32} />
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-zinc-400">
              Add Location
            </p>
          </button>
        </div>

        {/* Verification Banner */}
        <div className="mt-20 p-10 bg-zinc-950 rounded-[3rem] text-white overflow-hidden relative shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={32} className="text-emerald-400" />
                <h4 className="text-xl font-black uppercase tracking-widest">
                  Sector Verification
                </h4>
              </div>
              <p className="text-zinc-400 font-medium leading-relaxed">
                Indiafy uses automated sector-mapping to ensure every address is
                within our 10-25 mins operational territory. Verified locations
                get priority logistics assignment.
              </p>
            </div>
            <button className="px-10 py-5 bg-white text-zinc-900 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all">
              Learn More
            </button>
          </div>
          <div className="absolute right-0 top-0 opacity-10 -rotate-12 translate-x-10 translate-y-[-20%]">
            <Navigation size={300} />
          </div>
        </div>
      </main>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] p-10 md:p-14 overflow-hidden"
            >
              <h2 className="text-3xl font-black text-zinc-900 tracking-tighter mb-8">
                {editingAddr ? "Edit Location" : "New Location"}
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Label (e.g. Home)"
                    className="w-full bg-zinc-50 border-0 rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-zinc-900"
                  />
                  <input
                    placeholder="Full Name"
                    className="w-full bg-zinc-50 border-0 rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                <input
                  placeholder="Street Address / Building"
                  className="w-full bg-zinc-50 border-0 rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-zinc-900"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="PIN Code"
                    className="w-full bg-zinc-50 border-0 rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-zinc-900"
                  />
                  <input
                    placeholder="Phone Number"
                    className="w-full bg-zinc-50 border-0 rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                <button className="w-full py-5 bg-zinc-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs mt-4 shadow-xl">
                  {editingAddr ? "Update Address" : "Verify & Save Address"}
                </button>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-10 right-10 text-zinc-300 hover:text-zinc-900 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
