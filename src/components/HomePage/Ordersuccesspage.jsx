import { useState, useEffect, useRef } from "react";

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

    .os-root { font-family: 'Cabinet Grotesk', system-ui, sans-serif; background: #f5f0e8; }
    .serif { font-family: 'Instrument Serif', Georgia, serif; }

    /* Staggered entrance animations */
    .os-hero        { animation: slideDown .7s cubic-bezier(.22,1,.36,1) both; }
    .os-card-1      { animation: slideUp .6s .1s cubic-bezier(.22,1,.36,1) both; }
    .os-card-2      { animation: slideUp .6s .2s cubic-bezier(.22,1,.36,1) both; }
    .os-card-3      { animation: slideUp .6s .3s cubic-bezier(.22,1,.36,1) both; }
    .os-card-4      { animation: slideUp .6s .4s cubic-bezier(.22,1,.36,1) both; }
    .os-card-5      { animation: slideUp .6s .5s cubic-bezier(.22,1,.36,1) both; }
    .os-recs        { animation: slideUp .6s .6s cubic-bezier(.22,1,.36,1) both; }

    @keyframes slideDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

    /* Success checkmark draw */
    .check-circle { animation: popIn .5s .2s cubic-bezier(.34,1.56,.64,1) both; }
    @keyframes popIn { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
    .check-path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawCheck .5s .6s cubic-bezier(.22,1,.36,1) forwards; }
    @keyframes drawCheck { to { stroke-dashoffset: 0; } }

    /* Confetti dots */
    .confetti-dot { animation: confettiFall linear both; }
    @keyframes confettiFall {
      0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
      100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
    }

    /* Pulse ring on success icon */
    .pulse-ring {
      animation: pulseRing 2s ease-out infinite;
    }
    @keyframes pulseRing {
      0%   { transform: scale(1);   opacity: .5; }
      70%  { transform: scale(1.4); opacity: 0;  }
      100% { transform: scale(1.4); opacity: 0;  }
    }

    /* Status tracker line fill */
    .tracker-line-fill { animation: fillLine 1s 1s ease-out forwards; width: 0; }
    @keyframes fillLine { to { width: 100%; } }

    /* Product card hover */
    .prod-card { transition: all .25s cubic-bezier(.22,1,.36,1); }
    .prod-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.1); }

    /* Rec card */
    .rec-card { transition: all .3s cubic-bezier(.22,1,.36,1); }
    .rec-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,.12); }
    .rec-card:hover img { transform: scale(1.06); }
    .rec-img { transition: transform .5s cubic-bezier(.22,1,.36,1); }

    /* Button shimmer */
    .btn-primary { position:relative; overflow:hidden; }
    .btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent); transform:translateX(-100%); transition:transform .6s; }
    .btn-primary:hover::after { transform:translateX(100%); }

    .scrollbar-hide::-webkit-scrollbar { display:none; }
    .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }

    /* ETA ticker */
    .eta-tick { animation: etaTick 1s step-end infinite; }
    @keyframes etaTick { 0%,100%{opacity:1} 50%{opacity:.4} }
  `}</style>
);

// ─── DATA ──────────────────────────────────────────────────────────────────
const ORDER_DATA = {
  id: "IND-7829134",
  date: "March 4, 2026",
  time: "2:47 PM",
  payment: "UPI · Google Pay",
  address: "204, Sunrise Apartments, Koramangala 4th Block, Bengaluru — 560034",
  total: 26489,
  items: [
    { id: 1, name: "Sony WH-1000XM5 Wireless Headphones", seller: "Sharma Electronics", qty: 1, price: 24990, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { id: 2, name: "Anker 65W USB-C Nano Charger", seller: "TechMart Official", qty: 2, price: 1499, img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80" },
  ],
  seller: { name: "Sharma Electronics", distance: "1.5 km", rating: 4.8 },
  etaMin: 20,
  etaMax: 25,
};

const RECOMMENDED = [
  { id: 1, name: "Sony WF-1000XM5 Earbuds", price: 19990, original: 24990, rating: 4.5, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80" },
  { id: 2, name: "Bose QuietComfort 45", price: 28990, original: 38990, rating: 4.4, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&q=80" },
  { id: 3, name: "JBL Xtreme 3 Speaker", price: 14990, original: 19990, rating: 4.6, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80" },
  { id: 4, name: "Sennheiser Momentum 4", price: 29990, original: 39990, rating: 4.7, img: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&q=80" },
];

const STATUS_STEPS = [
  { key: "confirmed", label: "Order Confirmed", sub: "Just now", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0", done: true, active: false },
  { key: "preparing", label: "Preparing Order", sub: "~5 min", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", done: false, active: true },
  { key: "out", label: "Out for Delivery", sub: "~15 min", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0", done: false, active: false },
  { key: "delivered", label: "Delivered", sub: "~25 min", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", done: false, active: false },
];

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

// ─── ICON ─────────────────────────────────────────────────────────────────
const Icon = ({ d, className = "w-4 h-4", sw = 1.8, fill = false }) => (
  <svg className={className} fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

// ─── CONFETTI ─────────────────────────────────────────────────────────────
function Confetti() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 40,
    delay: Math.random() * 0.8,
    dur: 0.9 + Math.random() * 0.8,
    size: 5 + Math.random() * 7,
    color: ["#2d7a5c", "#f5a623", "#e85d4a", "#4a90d9", "#9b59b6", "#f0c040"][Math.floor(Math.random() * 6)],
    rotate: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-x-0 top-0 h-40 pointer-events-none overflow-hidden" aria-hidden>
      {dots.map(d => (
        <div key={d.id} className="confetti-dot absolute rounded-sm"
          style={{ left: `${d.x}%`, top: -10, width: d.size, height: d.size, background: d.color,
            animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s`, transform: `rotate(${d.rotate}deg)` }} />
      ))}
    </div>
  );
}

// ─── SUCCESS MESSAGE ──────────────────────────────────────────────────────
function SuccessMessage() {
  return (
    <div className="os-hero relative flex flex-col items-center text-center pt-10 pb-8 px-4">
      <Confetti />
      {/* Pulse ring + icon */}
      <div className="relative mb-6">
        <div className="pulse-ring absolute inset-0 rounded-full bg-emerald-200" />
        <div className="check-circle relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path className="check-path" d="M10 22 L18 30 L34 14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <h1 className="serif text-4xl md:text-5xl text-stone-900 mb-3 leading-tight">
        Order Placed<br /><em className="text-emerald-600">Successfully!</em>
      </h1>
      <p className="text-stone-500 text-base max-w-sm leading-relaxed">
        Thank you for your order. Your items are being prepared and will be with you shortly.
      </p>

      {/* Order ID pill */}
      <div className="mt-5 flex items-center gap-2 bg-white border border-stone-200 rounded-full px-5 py-2.5 shadow-sm">
        <Icon d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-xs text-stone-500">Order ID</span>
        <span className="font-bold text-stone-800 text-sm tracking-wide">#{ORDER_DATA.id}</span>
        <button className="text-emerald-600 hover:text-emerald-700 transition-colors ml-1">
          <Icon d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── ORDER DETAILS ────────────────────────────────────────────────────────
function OrderDetails() {
  const fields = [
    { label: "Order ID", value: `#${ORDER_DATA.id}`, icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14", mono: true },
    { label: "Order Date", value: `${ORDER_DATA.date} · ${ORDER_DATA.time}`, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Payment Method", value: ORDER_DATA.payment, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    { label: "Delivery Address", value: ORDER_DATA.address, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <div className="os-card-1 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
      <h2 className="font-bold text-stone-900 text-base mb-5 flex items-center gap-2">
        <span className="w-7 h-7 bg-stone-100 rounded-xl flex items-center justify-center">
          <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" className="w-3.5 h-3.5 text-stone-500" />
        </span>
        Order Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.label} className="flex gap-3">
            <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Icon d={f.icon} className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-stone-400 font-medium">{f.label}</p>
              <p className={`text-sm text-stone-800 font-semibold mt-0.5 leading-snug ${f.mono ? "font-mono" : ""}`}>{f.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRODUCT SUMMARY ──────────────────────────────────────────────────────
function ProductSummary() {
  const total = ORDER_DATA.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="os-card-2 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
      <h2 className="font-bold text-stone-900 text-base mb-5 flex items-center gap-2">
        <span className="w-7 h-7 bg-stone-100 rounded-xl flex items-center justify-center">
          <Icon d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" className="w-3.5 h-3.5 text-stone-500" />
        </span>
        Your Items
        <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
          {ORDER_DATA.items.reduce((s, i) => s + i.qty, 0)} items
        </span>
      </h2>

      <div className="space-y-3">
        {ORDER_DATA.items.map(item => (
          <div key={item.id} className="prod-card flex gap-4 p-4 bg-stone-50 border border-stone-100 rounded-2xl">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0 shadow-sm">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-900 leading-snug">{item.name}</p>
              <p className="text-xs text-stone-400 mt-0.5">by {item.seller}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-stone-500 bg-white border border-stone-200 rounded-lg px-2.5 py-1 font-medium">Qty: {item.qty}</span>
                <span className="text-base font-bold text-stone-900">{fmt(item.price * item.qty)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price footer */}
      <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
        {[
          { l: "Items Total", v: fmt(total), muted: true },
          { l: "Delivery Fee", v: "FREE", green: true },
          { l: "Total Paid", v: fmt(total), bold: true },
        ].map(r => (
          <div key={r.l} className="flex items-center justify-between">
            <span className={`text-sm ${r.bold ? "font-bold text-stone-900" : "text-stone-500"}`}>{r.l}</span>
            <span className={`text-sm font-bold ${r.green ? "text-emerald-600" : r.bold ? "text-stone-900 text-base" : "text-stone-700"}`}>{v = r.v, v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DELIVERY INFO ────────────────────────────────────────────────────────
function DeliveryInfo() {
  const [eta, setEta] = useState(ORDER_DATA.etaMax);

  useEffect(() => {
    const t = setInterval(() => setEta(e => Math.max(0, e - 1)), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="os-card-3 bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-6 shadow-xl shadow-emerald-200 text-white overflow-hidden relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%), radial-gradient(circle at 20% 80%, white 0%, transparent 40%)" }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">Estimated Arrival</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-5xl font-black">{ORDER_DATA.etaMin}–{ORDER_DATA.etaMax}</span>
              <span className="text-emerald-200 text-lg font-medium mb-1">min</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Icon d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" className="w-7 h-7" />
          </div>
        </div>

        <div className="h-px bg-white/20 mb-4" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-emerald-200 text-[11px] font-semibold uppercase tracking-wider">Seller</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Icon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" className="w-3.5 h-3.5 text-emerald-200" />
              <p className="text-white font-semibold text-sm">{ORDER_DATA.seller.name}</p>
            </div>
          </div>
          <div>
            <p className="text-emerald-200 text-[11px] font-semibold uppercase tracking-wider">Distance</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Icon d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" className="w-3.5 h-3.5 text-emerald-200" />
              <p className="text-white font-semibold text-sm">{ORDER_DATA.seller.distance} away</p>
            </div>
          </div>
          <div>
            <p className="text-emerald-200 text-[11px] font-semibold uppercase tracking-wider">Rating</p>
            <div className="flex items-center gap-1.5 mt-1">
              <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <p className="text-white font-semibold text-sm">{ORDER_DATA.seller.rating} / 5.0</p>
            </div>
          </div>
          <div>
            <p className="text-emerald-200 text-[11px] font-semibold uppercase tracking-wider">Delivery</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-white font-bold text-sm">FREE</span>
              <span className="text-emerald-200 text-xs line-through">₹40</span>
            </div>
          </div>
        </div>

        {/* Live dot */}
        <div className="flex items-center gap-2 mt-5 bg-white/10 rounded-xl px-3 py-2 border border-white/20 backdrop-blur-sm">
          <span className="eta-tick w-2 h-2 bg-yellow-300 rounded-full shrink-0" />
          <p className="text-white/90 text-xs font-medium">Live tracking will begin once the rider picks up your order</p>
        </div>
      </div>
    </div>
  );
}

// ─── ORDER STATUS TRACKER ─────────────────────────────────────────────────
function OrderStatusTracker() {
  return (
    <div className="os-card-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
      <h2 className="font-bold text-stone-900 text-base mb-6 flex items-center gap-2">
        <span className="w-7 h-7 bg-stone-100 rounded-xl flex items-center justify-center">
          <Icon d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" className="w-3.5 h-3.5 text-stone-500" />
        </span>
        Order Status
      </h2>

      {/* Desktop: horizontal */}
      <div className="hidden sm:block">
        <div className="relative flex items-start">
          {STATUS_STEPS.map((step, i) => (
            <div key={step.key} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {i < STATUS_STEPS.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-stone-200">
                  {step.done && <div className="tracker-line-fill h-full bg-emerald-500 rounded-full" />}
                </div>
              )}
              {/* Node */}
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step.done ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-200" :
                step.active ? "bg-white border-emerald-400 shadow-md" : "bg-white border-stone-200"
              }`}>
                {step.done ? (
                  <Icon d="M5 13l4 4L19 7" className="w-4 h-4 text-white" sw={2.5} />
                ) : step.active ? (
                  <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                ) : (
                  <Icon d={step.icon} className="w-4 h-4 text-stone-300" />
                )}
              </div>
              {/* Label */}
              <div className="mt-3 text-center px-1">
                <p className={`text-xs font-bold ${step.done || step.active ? "text-stone-900" : "text-stone-400"}`}>{step.label}</p>
                <p className={`text-[11px] mt-0.5 ${step.done ? "text-emerald-600 font-semibold" : step.active ? "text-emerald-500" : "text-stone-400"}`}>{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="sm:hidden space-y-0">
        {STATUS_STEPS.map((step, i) => (
          <div key={step.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 ${
                step.done ? "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-200" :
                step.active ? "bg-white border-emerald-400" : "bg-white border-stone-200"
              }`}>
                {step.done ? <Icon d="M5 13l4 4L19 7" className="w-3.5 h-3.5 text-white" sw={2.5} /> :
                 step.active ? <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" /> :
                 <Icon d={step.icon} className="w-3.5 h-3.5 text-stone-300" />}
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div className={`w-0.5 h-8 my-1 rounded-full ${step.done ? "bg-emerald-400" : "bg-stone-200"}`} />
              )}
            </div>
            <div className="pb-6 pt-1.5">
              <p className={`text-sm font-bold ${step.done || step.active ? "text-stone-900" : "text-stone-400"}`}>{step.label}</p>
              <p className={`text-xs mt-0.5 ${step.done ? "text-emerald-600 font-semibold" : step.active ? "text-emerald-500" : "text-stone-400"}`}>{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ACTION BUTTONS ───────────────────────────────────────────────────────
function ActionButtons() {
  return (
    <div className="os-card-5 flex flex-col sm:flex-row gap-3">
      <button className="btn-primary flex-1 flex items-center justify-center gap-2.5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-200 active:scale-[.98] transition-all">
        <Icon d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" className="w-4 h-4" />
        Track Order
      </button>
      <button className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm rounded-2xl border-2 border-stone-200 hover:border-stone-300 active:scale-[.98] transition-all shadow-sm">
        <Icon d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" className="w-4 h-4" />
        Continue Shopping
      </button>
    </div>
  );
}

// ─── RECOMMENDED PRODUCTS ─────────────────────────────────────────────────
function RecommendedProducts() {
  return (
    <div className="os-recs">
      <div className="flex items-center gap-4 mb-5">
        <div className="h-px flex-1 bg-stone-200" />
        <h2 className="serif text-2xl text-stone-800 whitespace-nowrap italic">You may also like</h2>
        <div className="h-px flex-1 bg-stone-200" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {RECOMMENDED.map((p, i) => {
          const disc = Math.round(((p.original - p.price) / p.original) * 100);
          return (
            <div key={p.id} className="rec-card bg-white border border-stone-200 rounded-2xl overflow-hidden cursor-pointer"
              style={{ animationDelay: `${.65 + i * .08}s` }}>
              <div className="relative overflow-hidden aspect-square bg-stone-50">
                <img src={p.img} alt={p.name} className="rec-img w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{disc}% OFF</span>
                <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-stone-100 hover:scale-110 transition-transform">
                  <Icon d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" className="w-3.5 h-3.5 text-stone-400" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-stone-800 leading-snug line-clamp-2" style={{ display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>{p.name}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-2.5 h-2.5 ${s <= Math.round(p.rating) ? "text-amber-400" : "text-stone-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="text-[10px] text-stone-400 ml-0.5">{p.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-sm font-black text-stone-900">{fmt(p.price)}</span>
                  <span className="text-[11px] text-stone-400 line-through">{fmt(p.original)}</span>
                </div>
                <button className="w-full mt-2.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ORDER SUCCESS PAGE ───────────────────────────────────────────────────
export default function OrderSuccessPage() {
  return (
    <div className="os-root min-h-screen pb-16">
      <GlobalStyles />
      <div className="max-w-2xl mx-auto px-4">

        {/* 1. Success Hero */}
        <SuccessMessage />

        {/* Content stack */}
        <div className="space-y-4 mt-2">

          {/* 2. Order Information */}
          <OrderDetails />

          {/* 3. Product Summary */}
          <ProductSummary />

          {/* 4. Delivery Info */}
          <DeliveryInfo />

          {/* 5. Status Tracker */}
          <OrderStatusTracker />

          {/* 6. Action Buttons */}
          <ActionButtons />

          {/* Divider */}
          <div className="pt-4" />

          {/* 7. Recommended Products */}
          <RecommendedProducts />
        </div>
      </div>
    </div>
  );
}