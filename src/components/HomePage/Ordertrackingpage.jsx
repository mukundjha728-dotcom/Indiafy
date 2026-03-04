import { useState, useEffect, useRef, useCallback } from "react";

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap');
    .ot-root { font-family: 'Geist', system-ui, sans-serif; background: #080e1a; color: #e8eaf0; }
    .mono { font-family: 'Geist Mono', monospace; }

    /* Entrance animations */
    .fade-up   { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-1 { animation: fadeUp .5s .08s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-2 { animation: fadeUp .5s .16s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-3 { animation: fadeUp .5s .24s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-4 { animation: fadeUp .5s .32s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-5 { animation: fadeUp .5s .40s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-6 { animation: fadeUp .5s .48s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-7 { animation: fadeUp .5s .56s cubic-bezier(.22,1,.36,1) both; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

    /* Pulsing active step */
    .step-pulse { animation: stepPulse 2s ease-in-out infinite; }
    @keyframes stepPulse { 0%,100%{ box-shadow: 0 0 0 0 rgba(251,146,60,.5); } 50%{ box-shadow: 0 0 0 8px rgba(251,146,60,0); } }

    /* Rider location dot bounce */
    .rider-bounce { animation: riderBounce 1.5s ease-in-out infinite; }
    @keyframes riderBounce { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-4px); } }

    /* Live indicator blink */
    .live-dot { animation: liveBlink 1.2s step-end infinite; }
    @keyframes liveBlink { 0%,100%{opacity:1} 50%{opacity:.2} }

    /* ETA countdown glow */
    .eta-glow { text-shadow: 0 0 20px rgba(251,146,60,.6); }

    /* Map road animation */
    .road-dash { stroke-dasharray: 8 6; animation: roadFlow 1s linear infinite; }
    @keyframes roadFlow { to { stroke-dashoffset: -28; } }

    /* Shimmer on map placeholder */
    .map-shimmer { background: linear-gradient(90deg,#0f1829 25%,#162236 50%,#0f1829 75%); background-size:200% 100%; animation:shimmer 2s infinite; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

    /* Progress bar fill */
    .progress-fill { animation: progressFill 1.2s .3s cubic-bezier(.22,1,.36,1) forwards; width:0; }
    @keyframes progressFill { to { width: var(--target-w); } }

    /* Card hover */
    .track-card { transition: border-color .2s, box-shadow .2s; }
    .track-card:hover { border-color: rgba(251,146,60,.3); box-shadow: 0 0 0 1px rgba(251,146,60,.1); }

    .btn-action { transition: all .2s cubic-bezier(.22,1,.36,1); }
    .btn-action:hover { transform: translateY(-2px); }
    .btn-action:active { transform: scale(.96); }

    /* Scrollbar */
    ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#080e1a; } ::-webkit-scrollbar-thumb { background:#1e2d45; border-radius:2px; }
  `}</style>
);

// ─── DATA ───────────────────────────────────────────────────────────────────
const ORDER = {
  id: "IND-7829134",
  date: "March 4, 2026",
  time: "2:47 PM",
  payment: "UPI · Google Pay",
  address: "204, Sunrise Apartments, Koramangala 4th Block, Bengaluru — 560034",
  items: [
    {
      id: 1,
      name: "Sony WH-1000XM5 Headphones",
      seller: "Sharma Electronics",
      qty: 1,
      price: 24990,
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&q=80",
    },
    {
      id: 2,
      name: "Anker 65W USB-C Charger",
      seller: "Sharma Electronics",
      qty: 2,
      price: 1499,
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=160&q=80",
    },
  ],
  seller: { name: "Sharma Electronics", distance: "1.5 km", rating: 4.8 },
  rider: {
    name: "Rahul Kumar",
    rating: 4.9,
    vehicle: "Bajaj Pulsar 150",
    plate: "KA 05 EF 7823",
    avatar: "RK",
    phone: "+91 98765 12345",
  },
  etaMinutes: 20,
  currentStep: 3, // 0-indexed: 0=confirmed,1=accepted,2=packing,3=rider,4=out,5=delivered
};

const STEPS = [
  {
    key: "confirmed",
    label: "Order Confirmed",
    sub: "Order received by seller",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0",
  },
  {
    key: "accepted",
    label: "Seller Accepted",
    sub: "Seller confirmed your order",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    key: "packing",
    label: "Packing in Progress",
    sub: "Items being carefully packed",
    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  },
  {
    key: "rider",
    label: "Rider Assigned",
    sub: "Rahul Kumar is on the way",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    key: "out",
    label: "Out for Delivery",
    sub: "Rider heading to your location",
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
  },
  {
    key: "delivered",
    label: "Delivered",
    sub: "Enjoy your order!",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
];

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

// ─── ICON ──────────────────────────────────────────────────────────────────
const Ic = ({ d, c = "w-4 h-4", sw = 1.8, fill = false }) => (
  <svg
    className={c}
    fill={fill ? "currentColor" : "none"}
    stroke={fill ? "none" : "currentColor"}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d={d} />
  </svg>
);

// ─── SECTION WRAPPER ────────────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
  <div
    className={`track-card bg-[#0d1829] border border-white/[.07] rounded-2xl ${className}`}
  >
    {children}
  </div>
);

// ─── 1. ORDER HEADER ────────────────────────────────────────────────────────
function OrderHeader() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(ORDER.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="fade-up p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">
              Order
            </span>
            <button
              onClick={copy}
              className="flex items-center gap-1.5 mono text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors"
            >
              #{ORDER.id}
              {copied ? (
                <Ic d="M5 13l4 4L19 7" c="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Ic
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  c="w-3.5 h-3.5"
                />
              )}
            </button>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            {ORDER.date} · {ORDER.time}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
          <span className="live-dot w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          Live
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {[
          {
            label: "Payment",
            value: ORDER.payment,
            icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
          },
          {
            label: "Seller",
            value: ORDER.seller.name,
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
          },
        ].map((f) => (
          <div
            key={f.label}
            className="flex gap-2.5 bg-white/[.03] rounded-xl p-3 border border-white/[.05]"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center shrink-0">
              <Ic d={f.icon} c="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                {f.label}
              </p>
              <p className="text-xs text-slate-200 font-semibold mt-0.5 truncate">
                {f.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2.5 mt-3 bg-white/[.03] rounded-xl p-3 border border-white/[.05]">
        <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center shrink-0 mt-0.5">
          <Ic
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            c="w-3.5 h-3.5 text-orange-400"
          />
        </div>
        <div>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            Delivering to
          </p>
          <p className="text-xs text-slate-200 font-medium mt-0.5 leading-relaxed">
            {ORDER.address}
          </p>
        </div>
      </div>
    </Card>
  );
}

// ─── 2. DELIVERY STATUS CARD ────────────────────────────────────────────────
function DeliveryStatus() {
  const [mins, setMins] = useState(ORDER.etaMinutes);

  useEffect(() => {
    const t = setInterval(() => setMins((m) => Math.max(1, m - 1)), 60000);
    return () => clearInterval(t);
  }, []);

  const pct =
    Math.round(((ORDER.etaMinutes - mins) / ORDER.etaMinutes) * 100) || 5;

  return (
    <Card className="fade-up-1 overflow-hidden">
      {/* Header gradient strip */}
      <div
        className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
        }}
      />
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
              Estimated Arrival
            </p>
            <div className="flex items-end gap-2 mt-1">
              <span className="eta-glow text-5xl font-black text-orange-400">
                {mins}
              </span>
              <span className="text-slate-400 text-lg mb-1 font-medium">
                min
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
              <Ic
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                c="w-7 h-7 text-orange-400"
              />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0d1829] flex items-center justify-center">
              <span className="live-dot w-1.5 h-1.5 bg-white rounded-full" />
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/[.06] rounded-full overflow-hidden mb-4">
          <div
            className="progress-fill h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
            style={{ "--target-w": `${pct}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            {
              label: "Seller",
              value: ORDER.seller.name,
              icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5",
            },
            {
              label: "Distance",
              value: ORDER.seller.distance,
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
            },
            {
              label: "Delivery",
              value: "FREE",
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/[.04] rounded-xl p-2.5 border border-white/[.05]"
            >
              <Ic d={s.icon} c="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-500 font-medium">
                {s.label}
              </p>
              <p className="text-xs text-slate-200 font-bold mt-0.5 truncate">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── 3. ORDER PROGRESS TRACKER ──────────────────────────────────────────────
function OrderProgressTracker() {
  const cur = ORDER.currentStep;

  return (
    <Card className="fade-up-2 p-5">
      <h2 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2">
        <Ic
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          c="w-4 h-4 text-slate-400"
        />
        Order Progress
      </h2>

      <div className="space-y-0">
        {STEPS.map((step, i) => {
          const done = i < cur;
          const active = i === cur;
          const future = i > cur;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={step.key} className="flex gap-4">
              {/* Left: connector + node */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all ${
                    done
                      ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-900/50"
                      : active
                        ? "bg-orange-500 border-orange-400 step-pulse shadow-lg shadow-orange-900/50"
                        : "bg-[#0d1829] border-white/10"
                  }`}
                >
                  {done ? (
                    <Ic d="M5 13l4 4L19 7" c="w-4 h-4 text-white" sw={2.5} />
                  ) : active ? (
                    <Ic d={step.icon} c="w-4 h-4 text-white" />
                  ) : (
                    <Ic d={step.icon} c="w-4 h-4 text-slate-600" />
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 min-h-[2rem] my-1 rounded-full ${done ? "bg-emerald-500/50" : "bg-white/[.06]"}`}
                  />
                )}
              </div>

              {/* Right: text */}
              <div
                className={`pb-5 pt-1.5 flex-1 min-w-0 ${isLast ? "pb-0" : ""}`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className={`text-sm font-bold ${done ? "text-emerald-400" : active ? "text-orange-300" : "text-slate-600"}`}
                  >
                    {step.label}
                  </p>
                  {active && (
                    <span className="text-[10px] bg-orange-400/15 border border-orange-400/30 text-orange-400 px-2 py-0.5 rounded-full font-semibold">
                      Current
                    </span>
                  )}
                  {done && (
                    <span className="text-[10px] text-emerald-500/70 font-medium">
                      ✓ Done
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mt-0.5 ${done ? "text-slate-500" : active ? "text-slate-400" : "text-slate-700"}`}
                >
                  {step.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ─── 4. RIDER INFO ──────────────────────────────────────────────────────────
function RiderInfo() {
  const [calling, setCalling] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "rider",
      text: "Hi! I have picked up your order. On my way!",
      time: "2:52 PM",
    },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMessages((m) => [
      ...m,
      {
        from: "user",
        text: msg,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMsg("");
    setTimeout(
      () =>
        setMessages((m) => [
          ...m,
          {
            from: "rider",
            text: "Got it! I'll be there soon 🛵",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]),
      1500,
    );
  };

  return (
    <Card className="fade-up-3 p-5">
      <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Ic
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          c="w-4 h-4 text-slate-400"
        />
        Delivery Partner
      </h2>

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-900/40">
            {ORDER.rider.avatar}
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0d1829] flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-100 text-base">
            {ORDER.rider.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className={`w-3 h-3 ${s <= Math.floor(ORDER.rider.rating) ? "text-amber-400" : s - ORDER.rider.rating < 1 ? "text-amber-400/60" : "text-slate-700"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-slate-400 font-semibold ml-0.5">
                {ORDER.rider.rating}
              </span>
            </div>
            <span className="text-slate-700">·</span>
            <span className="text-xs text-slate-500">
              {ORDER.rider.vehicle}
            </span>
          </div>
          <p className="mono text-[11px] text-slate-600 mt-0.5">
            {ORDER.rider.plate}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setCalling(true)}
          className="btn-action flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm rounded-xl hover:bg-emerald-500/25 transition-colors"
        >
          <Ic
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            c="w-4 h-4"
          />
          {calling ? "Calling…" : "Call Rider"}
        </button>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="btn-action flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500/15 border border-orange-500/30 text-orange-400 font-bold text-sm rounded-xl hover:bg-orange-500/25 transition-colors"
        >
          <Ic
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            c="w-4 h-4"
          />
          Chat
        </button>
      </div>

      {/* Chat panel */}
      {chatOpen && (
        <div className="mt-4 bg-white/[.03] border border-white/[.07] rounded-xl overflow-hidden">
          <div className="px-3 py-2.5 border-b border-white/[.06] flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            <p className="text-xs font-semibold text-slate-300">
              Chat with {ORDER.rider.name}
            </p>
          </div>
          <div className="p-3 space-y-2.5 max-h-40 overflow-y-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-xs ${m.from === "user" ? "bg-orange-500 text-white rounded-br-sm" : "bg-white/[.08] text-slate-200 rounded-bl-sm"}`}
                >
                  <p>{m.text}</p>
                  <p
                    className={`text-[10px] mt-0.5 ${m.from === "user" ? "text-orange-200" : "text-slate-500"}`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-white/[.06] flex gap-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 bg-white/[.04] border border-white/[.08] rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-orange-400/40"
            />
            <button
              onClick={send}
              className="w-8 h-8 bg-orange-500 hover:bg-orange-400 rounded-lg flex items-center justify-center transition-colors"
            >
              <Ic
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                c="w-3.5 h-3.5 text-white"
              />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

// ─── 5. LIVE MAP ────────────────────────────────────────────────────────────
function LiveMap() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const tRef = useRef(0);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width,
      H = c.height;
    tRef.current += 0.008;
    const t = tRef.current;

    // Background
    ctx.fillStyle = "#0d1829";
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Road network
    const roads = [
      { x1: 0.1, y1: 0.3, x2: 0.9, y2: 0.3 },
      { x1: 0.5, y1: 0.1, x2: 0.5, y2: 0.9 },
      { x1: 0.2, y1: 0.1, x2: 0.2, y2: 0.9 },
      { x1: 0.1, y1: 0.65, x2: 0.9, y2: 0.65 },
      { x1: 0.75, y1: 0.1, x2: 0.75, y2: 0.9 },
    ];
    roads.forEach((r) => {
      ctx.strokeStyle = "rgba(255,255,255,.08)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(r.x1 * W, r.y1 * H);
      ctx.lineTo(r.x2 * W, r.y2 * H);
      ctx.stroke();
      // Dashed center line
      ctx.strokeStyle = "rgba(255,255,255,.04)";
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 8]);
      ctx.lineDashOffset = -(t * 60) % 16;
      ctx.beginPath();
      ctx.moveTo(r.x1 * W, r.y1 * H);
      ctx.lineTo(r.x2 * W, r.y2 * H);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Rider path (animated)
    const riderProgress = (Math.sin(t) * 0.5 + 0.5) * 0.6 + 0.05;
    const pathPoints = [
      { x: 0.2, y: 0.3 },
      { x: 0.5, y: 0.3 },
      { x: 0.5, y: 0.65 },
    ];
    const totalLen = pathPoints.reduce((s, p, i) => {
      if (i === 0) return 0;
      const prev = pathPoints[i - 1];
      return s + Math.hypot(p.x - prev.x, p.y - prev.y);
    }, 0);
    let covered = riderProgress * totalLen;
    let riderX = pathPoints[0].x,
      riderY = pathPoints[0].y;
    for (let i = 1; i < pathPoints.length; i++) {
      const segLen = Math.hypot(
        pathPoints[i].x - pathPoints[i - 1].x,
        pathPoints[i].y - pathPoints[i - 1].y,
      );
      if (covered <= segLen) {
        riderX =
          pathPoints[i - 1].x +
          (pathPoints[i].x - pathPoints[i - 1].x) * (covered / segLen);
        riderY =
          pathPoints[i - 1].y +
          (pathPoints[i].y - pathPoints[i - 1].y) * (covered / segLen);
        break;
      }
      covered -= segLen;
    }

    // Route highlight
    ctx.strokeStyle = "rgba(251,146,60,.25)";
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.beginPath();
    pathPoints.forEach((p, i) =>
      i === 0 ? ctx.moveTo(p.x * W, p.y * H) : ctx.lineTo(p.x * W, p.y * H),
    );
    ctx.stroke();

    // Dotted animated route
    ctx.strokeStyle = "rgba(251,146,60,.6)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.lineDashOffset = -(t * 80) % 22;
    ctx.beginPath();
    pathPoints.forEach((p, i) =>
      i === 0 ? ctx.moveTo(p.x * W, p.y * H) : ctx.lineTo(p.x * W, p.y * H),
    );
    ctx.stroke();
    ctx.setLineDash([]);

    // Customer pin
    const cx = 0.5 * W,
      cy = 0.65 * H;
    const pinBob = Math.sin(t * 3) * 3;
    // Shadow
    const grad1 = ctx.createRadialGradient(cx, cy + 2, 0, cx, cy + 2, 18);
    grad1.addColorStop(0, "rgba(99,102,241,.25)");
    grad1.addColorStop(1, "transparent");
    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(cx, cy + 6, 18, 0, Math.PI * 2);
    ctx.fill();
    // Pin body
    ctx.fillStyle = "#6366f1";
    ctx.shadowColor = "#6366f1";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy - 22 + pinBob, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy - 18 + pinBob);
    ctx.lineTo(cx, cy + pinBob);
    ctx.lineTo(cx + 8, cy - 18 + pinBob);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Icon
    ctx.fillStyle = "#fff";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🏠", cx, cy - 22 + pinBob);

    // Rider pin
    const rx = riderX * W,
      ry = riderY * H;
    const bounce = Math.sin(t * 4) * 2;
    const grad2 = ctx.createRadialGradient(rx, ry, 0, rx, ry, 22);
    grad2.addColorStop(0, "rgba(251,146,60,.3)");
    grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(rx, ry + 4, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fb923c";
    ctx.shadowColor = "#fb923c";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(rx, ry - 20 + bounce, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(rx - 9, ry - 15 + bounce);
    ctx.lineTo(rx, ry + bounce);
    ctx.lineTo(rx + 9, ry - 15 + bounce);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillText("🛵", rx, ry - 20 + bounce);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    // Distance label
    ctx.fillStyle = "rgba(13,24,41,.85)";
    ctx.roundRect?.(rx + 16, ry - 32 + bounce, 60, 20, 6) ??
      (() => {
        ctx.fillRect(rx + 16, ry - 32 + bounce, 60, 20);
      })();
    ctx.fill();
    ctx.fillStyle = "#fb923c";
    ctx.font = "bold 10px 'Geist', sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("1.2 km away", rx + 20, ry - 22 + bounce);

    frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => {
      c.width = c.offsetWidth * (window.devicePixelRatio || 1);
      c.height = c.offsetHeight * (window.devicePixelRatio || 1);
      const ctx = c.getContext("2d");
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    });
    ro.observe(c);
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [draw]);

  return (
    <Card className="fade-up-4 overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Ic
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            c="w-4 h-4 text-slate-400"
          />
          Live Tracking
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
          <span className="live-dot w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          Live Map
        </div>
      </div>

      {/* Canvas map */}
      <div
        className="relative mx-4 mb-4 rounded-xl overflow-hidden"
        style={{ height: 240 }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {[
            { color: "#fb923c", label: "Rider" },
            { color: "#6366f1", label: "You" },
          ].map((l) => (
            <div
              key={l.label}
              className="flex items-center gap-1.5 bg-[#0d1829]/90 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-1"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: l.color }}
              />
              <span className="text-[10px] text-slate-300 font-medium">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ETA bar */}
      <div className="px-4 pb-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Rider Speed", value: "~28 km/h" },
          { label: "Remaining", value: "1.2 km" },
          { label: "ETA", value: `${ORDER.etaMinutes} min` },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white/[.03] rounded-xl p-2.5 border border-white/[.05]"
          >
            <p className="text-[10px] text-slate-500 font-medium">{s.label}</p>
            <p className="text-xs text-orange-400 font-black mt-0.5">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── 6. ORDER ITEMS ─────────────────────────────────────────────────────────
function OrderItems() {
  const total = ORDER.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Card className="fade-up-5 p-5">
      <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Ic
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          c="w-4 h-4 text-slate-400"
        />
        Your Items
        <span className="ml-auto text-[10px] bg-orange-400/15 border border-orange-400/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">
          {ORDER.items.reduce((s, i) => s + i.qty, 0)} items
        </span>
      </h2>

      <div className="space-y-3">
        {ORDER.items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 p-3 bg-white/[.03] rounded-xl border border-white/[.05]"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/[.08] shrink-0">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 leading-snug">
                {item.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">by {item.seller}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500 bg-white/[.04] border border-white/[.07] rounded-lg px-2 py-0.5 font-medium">
                  ×{item.qty}
                </span>
                <span className="text-sm font-black text-slate-200">
                  {fmt(item.price * item.qty)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/[.06] flex items-center justify-between">
        <span className="text-sm text-slate-400">Total Paid</span>
        <span className="text-lg font-black text-orange-400">{fmt(total)}</span>
      </div>
    </Card>
  );
}

// ─── 7. SUPPORT ─────────────────────────────────────────────────────────────
function SupportSection() {
  const [reported, setReported] = useState(false);

  return (
    <Card className="fade-up-6 p-5">
      <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Ic
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          c="w-4 h-4 text-slate-400"
        />
        Need Help?
      </h2>

      <div className="space-y-3 mb-4">
        {[
          {
            q: "Where is my order?",
            a: "Your order is currently being prepared. ETA: ~20 min.",
          },
          {
            q: "Can I cancel my order?",
            a: "Cancellation is possible before the rider is assigned.",
          },
        ].map((faq) => (
          <details
            key={faq.q}
            className="group bg-white/[.03] rounded-xl border border-white/[.05] overflow-hidden"
          >
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-xs font-semibold text-slate-300 list-none">
              {faq.q}
              <Ic
                d="M19 9l-7 7-7-7"
                c="w-3.5 h-3.5 text-slate-500 group-open:rotate-180 transition-transform"
              />
            </summary>
            <p className="px-4 pb-3 text-xs text-slate-500 leading-relaxed border-t border-white/[.05]">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="btn-action flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-sm rounded-xl hover:bg-indigo-500/25 transition-colors">
          <Ic
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            c="w-4 h-4"
          />
          Contact Support
        </button>
        <button
          onClick={() => setReported(true)}
          className={`btn-action flex-1 flex items-center justify-center gap-2 py-3 font-bold text-sm rounded-xl border transition-colors ${reported ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/25 text-rose-400 hover:bg-rose-500/20"}`}
        >
          {reported ? (
            <>
              <Ic d="M5 13l4 4L19 7" c="w-4 h-4" />
              Reported
            </>
          ) : (
            <>
              <Ic
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                c="w-4 h-4"
              />
              Report Issue
            </>
          )}
        </button>
      </div>
    </Card>
  );
}

// ─── ORDER TRACKING PAGE ────────────────────────────────────────────────────
export default function OrderTrackingPage() {
  return (
    <div className="ot-root min-h-screen pb-12">
      <GlobalStyles />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Page title */}
        <div className="fade-up flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-black text-slate-100">Track Order</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time updates · Hyperlocal delivery
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-orange-400 font-semibold bg-orange-400/10 border border-orange-400/20 px-3 py-1.5 rounded-full hover:bg-orange-400/20 transition-colors">
            <Ic
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              c="w-3.5 h-3.5"
            />
            Refresh
          </button>
        </div>

        <OrderHeader />
        <DeliveryStatus />
        <OrderProgressTracker />
        <RiderInfo />
        <LiveMap />
        <OrderItems />
        <SupportSection />
      </div>
    </div>
  );
}
