import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 1,
    name: "Wholesale Garments",
    icon: "👔",
    startPrice: "₹80",
    tag: "Apparel",
    color: "from-amber-50 to-orange-50",
    accent: "#f59e0b",
  },
  {
    id: 2,
    name: "Wholesale Grocery",
    icon: "🌾",
    startPrice: "₹12",
    tag: "Food & FMCG",
    color: "from-green-50 to-emerald-50",
    accent: "#10b981",
  },
  {
    id: 3,
    name: "Wholesale Electronics",
    icon: "📱",
    startPrice: "₹350",
    tag: "Tech",
    color: "from-blue-50 to-indigo-50",
    accent: "#3b82f6",
  },
  {
    id: 4,
    name: "Wholesale Cosmetics",
    icon: "💄",
    startPrice: "₹45",
    tag: "Beauty",
    color: "from-pink-50 to-rose-50",
    accent: "#ec4899",
  },
  {
    id: 5,
    name: "Wholesale Footwear",
    icon: "👟",
    startPrice: "₹110",
    tag: "Shoes",
    color: "from-purple-50 to-violet-50",
    accent: "#8b5cf6",
  },
  {
    id: 6,
    name: "Wholesale Accessories",
    icon: "⌚",
    startPrice: "₹60",
    tag: "Fashion",
    color: "from-teal-50 to-cyan-50",
    accent: "#06b6d4",
  },
];

const DEALS = [
  {
    id: 1,
    title: "Premium Cotton T-Shirts (Pack)",
    moq: 20,
    price: "₹120",
    original: "₹180",
    discount: 33,
    seller: "FabricWorld Co.",
    emoji: "👕",
    badge: "HOT",
  },
  {
    id: 2,
    title: "Basmati Rice 25kg Sack",
    moq: 50,
    price: "₹42",
    original: "₹60",
    discount: 30,
    seller: "GrainMart India",
    emoji: "🌾",
    badge: "BEST SELLER",
  },
  {
    id: 3,
    title: "Bluetooth Earbuds OEM",
    moq: 10,
    price: "₹350",
    original: "₹520",
    discount: 33,
    seller: "TechSource HK",
    emoji: "🎧",
    badge: "NEW",
  },
  {
    id: 4,
    title: "Kajal & Kohl Pencil Set",
    moq: 100,
    price: "₹18",
    original: "₹28",
    discount: 36,
    seller: "GlamHub Beauty",
    emoji: "✏️",
    badge: "HOT",
  },
  {
    id: 5,
    title: "Running Shoes Bulk Lot",
    moq: 24,
    price: "₹480",
    original: "₹750",
    discount: 36,
    seller: "StepUp Traders",
    emoji: "👟",
    badge: "TRENDING",
  },
  {
    id: 6,
    title: "Stainless Steel Watches",
    moq: 15,
    price: "₹620",
    original: "₹950",
    discount: 35,
    seller: "TimeZone Exports",
    emoji: "⌚",
    badge: "POPULAR",
  },
];

const TIERS = [
  {
    range: "10 – 20 units",
    price: "₹150/unit",
    savings: "Base price",
    highlight: false,
  },
  {
    range: "21 – 50 units",
    price: "₹135/unit",
    savings: "Save 10%",
    highlight: false,
  },
  {
    range: "51 – 100 units",
    price: "₹120/unit",
    savings: "Save 20%",
    highlight: true,
  },
  {
    range: "100+ units",
    price: "₹105/unit",
    savings: "Save 30%",
    highlight: false,
  },
];

const TRUST = [
  {
    icon: "✅",
    title: "Verified Sellers",
    desc: "Every seller passes KYC & quality audits before listing.",
  },
  {
    icon: "📦",
    title: "Bulk Order Discounts",
    desc: "Automatic tiered pricing — the more you buy, the less you pay.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Pan-India logistics with real-time shipment tracking.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "256-bit encrypted checkout with escrow protection.",
  },
];

const SELLERS = [
  {
    id: 1,
    name: "FabricWorld Co.",
    rating: 4.9,
    location: "Surat, Gujarat",
    products: 320,
    tag: "Top Rated",
    emoji: "🏭",
  },
  {
    id: 2,
    name: "GrainMart India",
    rating: 4.8,
    location: "Ludhiana, Punjab",
    products: 180,
    tag: "Verified",
    emoji: "🌾",
  },
  {
    id: 3,
    name: "TechSource HK",
    rating: 4.7,
    location: "Delhi NCR",
    products: 540,
    tag: "Premium",
    emoji: "📱",
  },
  {
    id: 4,
    name: "GlamHub Beauty",
    rating: 4.8,
    location: "Mumbai, MH",
    products: 210,
    tag: "Best Seller",
    emoji: "💄",
  },
];

const BADGE_COLORS = {
  HOT: "bg-red-500",
  "BEST SELLER": "bg-amber-500",
  NEW: "bg-blue-500",
  TRENDING: "bg-purple-500",
  POPULAR: "bg-emerald-500",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function WholesaleHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #f59e0b, transparent 70%)",
          transform: "translate(30%,-30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #3b82f6, transparent 70%)",
          transform: "translate(-30%,30%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            B2B Wholesale Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-4">
            Wholesale
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #f59e0b, #ef4444)",
              }}
            >
              Marketplace
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 font-light mb-10 leading-relaxed">
            Buy in bulk and save more.{" "}
            <span className="text-white font-semibold">Factory prices,</span>{" "}
            directly to you.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap gap-3 mb-10">
            {["Bulk Discounts", "Direct from Sellers", "Fast Delivery"].map(
              (b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white"
                >
                  <span className="text-amber-400">✦</span> {b}
                </span>
              ),
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <button
              className="group relative px-8 py-4 rounded-2xl font-bold text-slate-900 text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Wholesale Products
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </span>
            </button>
            <button className="px-8 py-4 rounded-2xl font-bold text-white text-base border border-white/30 backdrop-blur hover:bg-white/10 transition-all duration-300">
              Register Business
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/10">
            {[
              ["50K+", "Verified Sellers"],
              ["2M+", "Products Listed"],
              ["98%", "On-time Delivery"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-3xl font-black text-amber-400">{num}</div>
                <div className="text-sm text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WholesaleCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-2">
            Shop by Category
          </p>
          <h2 className="text-4xl font-black text-slate-900">
            Wholesale Categories
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Explore thousands of products across every industry, sourced
            directly from manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`group bg-gradient-to-br ${cat.color} rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white shadow-sm cursor-pointer`}
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="font-bold text-slate-800 text-sm leading-tight mb-1">
                {cat.name}
              </span>
              <span className="text-xs text-slate-500 bg-white/70 rounded-full px-2 py-0.5 mb-2">
                {cat.tag}
              </span>
              <span className="text-xs font-bold" style={{ color: cat.accent }}>
                From {cat.startPrice}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BulkDeals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-2">
              Limited Time
            </p>
            <h2 className="text-4xl font-black text-slate-900">Bulk Deals</h2>
            <p className="text-slate-500 mt-2">
              Handpicked deals with the highest savings for bulk buyers.
            </p>
          </div>
          <button className="self-start md:self-auto text-sm font-bold text-slate-700 border-2 border-slate-200 rounded-xl px-5 py-2.5 hover:border-amber-400 hover:text-amber-600 transition-colors">
            View All Deals →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Image area */}
              <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 h-44 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {deal.emoji}
                </span>
                <span
                  className={`absolute top-3 left-3 text-white text-xs font-black px-3 py-1 rounded-full tracking-wide ${BADGE_COLORS[deal.badge]}`}
                >
                  {deal.badge}
                </span>
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                  -{deal.discount}%
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-slate-800 text-base leading-snug mb-3">
                  {deal.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                    MOQ: {deal.moq} units
                  </span>
                  <span className="text-slate-400 text-xs">{deal.seller}</span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        {deal.price}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        {deal.original}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">per unit</span>
                  </div>
                  <button className="bg-slate-900 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-amber-500 transition-colors duration-200">
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingTable() {
  const [selected, setSelected] = useState(2);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Deco */}
      <div
        className="absolute right-0 top-0 w-64 h-64 opacity-10 rounded-full"
        style={{
          background: "radial-gradient(circle, #f59e0b, transparent 70%)",
          transform: "translate(30%,-30%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-2">
            Volume Savings
          </p>
          <h2 className="text-4xl font-black">Bulk Pricing Tiers</h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            The more you order, the more you save. Pricing scales automatically
            at checkout.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIERS.map((tier, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative rounded-2xl p-6 text-left transition-all duration-300 cursor-pointer border-2 ${
                selected === i
                  ? "border-amber-400 bg-amber-400/10 scale-105 shadow-2xl shadow-amber-400/20"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                  BEST VALUE
                </span>
              )}
              <div className="text-slate-400 text-xs font-medium mb-2">
                {tier.range}
              </div>
              <div
                className={`text-2xl font-black mb-1 ${selected === i ? "text-amber-400" : "text-white"}`}
              >
                {tier.price}
              </div>
              <div
                className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                  tier.savings === "Base price"
                    ? "bg-white/10 text-slate-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {tier.savings}
              </div>
            </button>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Ready to place a bulk order?</p>
            <p className="text-slate-400 text-sm">
              Talk to our wholesale team for custom quotes on orders above ₹5
              lakhs.
            </p>
          </div>
          <button
            className="whitespace-nowrap px-6 py-3 rounded-xl font-bold text-slate-900 transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-2">
            Why Choose Us
          </p>
          <h2 className="text-4xl font-black text-slate-900">
            Built for Business Buyers
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST.map((item) => (
            <div
              key={item.title}
              className="group bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <h3 className="font-black text-slate-900 text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopSellers() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-2">
            Trusted Suppliers
          </p>
          <h2 className="text-4xl font-black text-slate-900">
            Top Wholesale Sellers
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Sourcing from India's most reliable verified manufacturers and
            distributors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SELLERS.map((seller) => (
            <div
              key={seller.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-100 shadow-sm">
                {seller.emoji}
              </div>

              <div className="flex items-start justify-between mb-1">
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  {seller.name}
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-600 font-bold border border-emerald-200 px-2 py-0.5 rounded-full ml-2 whitespace-nowrap">
                  {seller.tag}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {"★★★★★".split("").map((s, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(seller.rating)
                        ? "text-amber-400"
                        : "text-slate-200"
                    }
                  >
                    {s}
                  </span>
                ))}
                <span className="text-slate-600 text-sm font-bold ml-1">
                  {seller.rating}
                </span>
              </div>

              <p className="text-slate-400 text-xs mb-1">
                📍 {seller.location}
              </p>
              <p className="text-slate-500 text-xs mb-5">
                {seller.products.toLocaleString()} products listed
              </p>

              <button className="mt-auto w-full bg-slate-900 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-amber-500 transition-colors duration-200">
                View Seller Store
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glows */}
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #f59e0b, transparent 70%)",
              transform: "translate(20%,-20%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #3b82f6, transparent 70%)",
              transform: "translate(-20%,20%)",
            }}
          />

          <div className="relative z-10 px-10 py-16 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              🏢 Business Buyers
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Unlock Better
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f59e0b, #ef4444)",
                }}
              >
                Wholesale Pricing
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Register as a business buyer to unlock exclusive wholesale
              pricing, credit lines, and dedicated account managers.
            </p>

            {/* Perks */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                "GST Invoicing",
                "Net-30 Credit",
                "Dedicated Account Manager",
                "Priority Support",
              ].map((p) => (
                <span
                  key={p}
                  className="bg-white/10 border border-white/20 text-sm text-white px-4 py-2 rounded-full"
                >
                  ✦ {p}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="px-8 py-4 rounded-2xl font-black text-slate-900 text-base transition-all hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                }}
              >
                Register Business Account →
              </button>
              <button className="px-8 py-4 rounded-2xl font-bold text-white text-base border border-white/30 hover:bg-white/10 transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function WholesalePage() {
  return (
    <div className="font-sans antialiased bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        body, .font-sans { font-family: 'DM Sans', sans-serif; }
        h1,h2,h3,.font-black,.font-bold { font-family: 'Sora', sans-serif; }
      `}</style>

      <WholesaleHero />
      <WholesaleCategories />
      <BulkDeals />
      <PricingTable />
      <TrustSection />
      <TopSellers />
      <BusinessCTA />
    </div>
  );
}
