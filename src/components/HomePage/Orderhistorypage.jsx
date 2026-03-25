import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Package,
  ChevronDown,
  ChevronUp,
  MapPin,
  Video,
  RotateCcw,
  Star,
  Filter,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Layout Components
import WebsiteNavbar from "../WebsiteNavbar";
import Footer from "../Footer";

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

// --- STATIC DATA ---
const INITIAL_ORDERS = [
  {
    id: "IND-7829134",
    date: "2026-03-04",
    status: "Out for Delivery",
    total: 26489,
    seller: "Sharma Electronics",
    sector: "Sector 45",
    items: [
      {
        name: "Sony WH-1000XM5 Headphones",
        qty: 1,
        price: 24990,
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      },
      {
        name: "Anker 65W USB-C Charger",
        qty: 2,
        price: 1499,
        img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80",
      },
    ],
    videoAvailable: true,
  },
  {
    id: "IND-7814291",
    date: "2026-02-28",
    status: "Delivered",
    total: 24900,
    seller: "iZone Official",
    sector: "DLF Phase 3",
    items: [
      {
        name: "Apple AirPods Pro 2nd Gen",
        qty: 1,
        price: 24900,
        img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=200&q=80",
      },
    ],
    videoAvailable: true,
  },
  {
    id: "IND-7788043",
    date: "2026-02-14",
    status: "Cancelled",
    total: 5999,
    seller: "Gadget World",
    sector: "Sector 56",
    items: [
      {
        name: "Anker Soundcore Life Q45",
        qty: 1,
        price: 5999,
        img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=120&q=80",
      },
    ],
    videoAvailable: false,
  },
];

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // --- FILTER & SORT LOGIC ---
  const filteredOrders = useMemo(() => {
    let result = [...INITIAL_ORDERS];

    // 1. Status Filter
    if (activeFilter !== "All") {
      result = result.filter((order) => {
        if (activeFilter === "Active")
          return (
            order.status === "Out for Delivery" || order.status === "Preparing"
          );
        return order.status === activeFilter;
      });
    }

    // 2. Search Logic (Order ID or Item Name)
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query)),
      );
    }

    // 3. Sorting Logic
    return result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "highest") return b.total - a.total;
      return 0;
    });
  }, [search, activeFilter, sortBy]);

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-400">
      <WebsiteNavbar />

      <main className="max-w-5xl mx-auto px-4 pt-32 pb-24">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter">
              Order <span className="text-zinc-600 italic">History</span>
            </h1>
            <p className="mt-2 font-medium text-zinc-500">
              Managing {filteredOrders.length} orders in Gurugram sectors.
            </p>
          </div>
        </div>

        {/* Search & Global Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Order ID or Item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-zinc-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-white rounded-2xl px-6 py-4 font-bold text-sm outline-none focus:border-zinc-500 cursor-pointer appearance-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Value</option>
          </select>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
          {["All", "Active", "Delivered", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeFilter === tab
                  ? "bg-white text-zinc-950 border-white shadow-lg shadow-white/5"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center bg-zinc-900/50 rounded-[3rem] border border-dashed border-zinc-800"
              >
                <Package className="mx-auto mb-4 text-zinc-800" size={48} />
                <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">
                  No orders found matching your criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden hover:border-zinc-700 transition-colors"
    >
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex gap-6">
            <div className="flex -space-x-4 shrink-0">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-2xl border-4 border-zinc-900 overflow-hidden bg-zinc-800 shadow-xl"
                >
                  <img
                    src={item.img}
                    className="w-full h-full object-cover"
                    alt="item"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-black text-white uppercase tracking-widest">
                  {order.id}
                </span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    order.status === "Delivered"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : order.status === "Cancelled"
                        ? "bg-rose-500/10 text-rose-500"
                        : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm font-bold text-zinc-500">
                {order.date} • {order.items.length} Items
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-center">
            <p className="text-2xl font-black text-white mb-1">
              {fmt(order.total)}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-zinc-600">
              <MapPin size={12} /> {order.sector} Hub
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-wrap gap-3">
          {order.status !== "Cancelled" && (
            <button className="bg-white text-zinc-950 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all">
              Track Live
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-zinc-800 text-white px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-zinc-700 transition-all flex items-center gap-2"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}{" "}
            Details
          </button>
          <button className="border border-zinc-800 text-zinc-400 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
            <RotateCcw size={14} /> Reorder
          </button>
          {order.videoAvailable && (
            <button className="ml-auto text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-emerald-400">
              <Video size={14} /> View Packing Video
            </button>
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-8 space-y-4">
                <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                  Order Breakdown
                </p>
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.img}
                        className="w-10 h-10 rounded-lg object-cover"
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-bold text-zinc-300">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-600 font-medium">
                          Qty: {item.qty}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-black text-white">
                      {fmt(item.price)}
                    </p>
                  </div>
                ))}
                <div className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 mt-4 flex items-center gap-4">
                  <ShieldCheck size={24} className="text-zinc-700" />
                  <div>
                    <p className="text-xs font-bold text-zinc-400">
                      Sold by {order.seller}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-tighter">
                      Verified Sector-Assigned Infrastructure [cite: 5, 38]
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
