import { useState, useMemo } from "react";

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

    .oh-root { font-family:'Lexend',system-ui,sans-serif; background:#0c111d; color:#d1d5e0; min-height:100vh; }
    .serif { font-family:'Libre Baskerville',Georgia,serif; }

    /* Stagger in */
    .card-in { animation: cardIn .5s cubic-bezier(.22,1,.36,1) both; }
    @keyframes cardIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

    /* Order card */
    .ocard { transition: border-color .22s, box-shadow .22s, transform .22s cubic-bezier(.22,1,.36,1); }
    .ocard:hover { border-color:rgba(99,102,241,.4); box-shadow:0 0 0 1px rgba(99,102,241,.12),0 12px 40px rgba(0,0,0,.35); transform:translateY(-2px); }

    /* Expanded detail panel */
    .expand-body { overflow:hidden; transition:max-height .4s cubic-bezier(.22,1,.36,1), opacity .3s; }
    .expand-body.open  { max-height:600px; opacity:1; }
    .expand-body.closed{ max-height:0;     opacity:0; }

    /* Status dot pulse (active) */
    .status-pulse { animation:sPulse 2s ease-in-out infinite; }
    @keyframes sPulse { 0%,100%{box-shadow:0 0 0 0 currentColor} 50%{box-shadow:0 0 0 5px transparent} }

    /* Action buttons */
    .abtn { transition: all .18s cubic-bezier(.22,1,.36,1); }
    .abtn:hover { transform:translateY(-2px); }
    .abtn:active { transform:scale(.95); }

    /* Filter pills */
    .fpill { transition:all .18s; }
    .fpill:hover:not(.active) { border-color:rgba(99,102,241,.5); color:#a5b4fc; }
    .fpill.active { background:rgba(99,102,241,.18); border-color:rgba(99,102,241,.5); color:#a5b4fc; }

    /* Sort select */
    .sort-sel { background:#131c2e; border:1px solid rgba(255,255,255,.08); color:#d1d5e0; outline:none; cursor:pointer; }
    .sort-sel:focus { border-color:rgba(99,102,241,.5); }

    /* Timeline track */
    .tl-fill { transition: width 1.2s .3s cubic-bezier(.22,1,.36,1); }

    /* Product img stack */
    .img-stack > div:hover { transform:scale(1.1) translateY(-3px); z-index:10; }
    .img-stack > div { transition:transform .2s cubic-bezier(.22,1,.36,1); }

    /* Reorder confirm */
    .reorder-done { animation:rPop .4s cubic-bezier(.34,1.56,.64,1); }
    @keyframes rPop { from{transform:scale(.8);opacity:0} to{transform:scale(1);opacity:1} }

    /* Search input */
    .search-in:focus { border-color:rgba(99,102,241,.6); box-shadow:0 0 0 3px rgba(99,102,241,.12); outline:none; }

    /* Rating stars */
    .star-btn { transition:transform .15s; }
    .star-btn:hover { transform:scale(1.2); }

    /* Scrollbar */
    .ts::-webkit-scrollbar{height:3px;} .ts::-webkit-scrollbar-thumb{background:#1e2d45;border-radius:2px;}

    /* Empty state */
    .es-float { animation:esF 3s ease-in-out infinite; }
    @keyframes esF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

    /* Line clamp */
    .lc2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
    .lc1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;}
  `}</style>
);

// ─── DATA ──────────────────────────────────────────────────────────────────
const ORDERS = [
  {
    id: "IND-7829134",
    date: "2026-03-04",
    time: "2:47 PM",
    status: "out_for_delivery",
    payment: "UPI · GPay",
    total: 26489,
    saved: 9498,
    address: "204, Sunrise Apts, Koramangala, Bengaluru",
    items: [
      {
        id: 1,
        name: "Sony WH-1000XM5 Headphones",
        qty: 1,
        price: 24990,
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80",
      },
      {
        id: 2,
        name: "Anker 65W USB-C Nano Charger",
        qty: 2,
        price: 1499,
        img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&q=80",
      },
    ],
  },
  {
    id: "IND-7814291",
    date: "2026-02-28",
    time: "11:22 AM",
    status: "delivered",
    payment: "Credit Card",
    total: 24900,
    saved: 2000,
    address: "204, Sunrise Apts, Koramangala, Bengaluru",
    items: [
      {
        id: 3,
        name: "Apple AirPods Pro 2nd Gen",
        qty: 1,
        price: 24900,
        img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=120&q=80",
      },
    ],
    rating: 5,
  },
  {
    id: "IND-7801567",
    date: "2026-02-20",
    time: "6:05 PM",
    status: "delivered",
    payment: "UPI · PhonePe",
    total: 14497,
    saved: 5000,
    address: "204, Sunrise Apts, Koramangala, Bengaluru",
    items: [
      {
        id: 4,
        name: "JBL Flip 6 Portable Speaker",
        qty: 1,
        price: 8499,
        img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=120&q=80",
      },
      {
        id: 5,
        name: "Belkin MagSafe Charger 15W",
        qty: 1,
        price: 3999,
        img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=120&q=80",
      },
      {
        id: 6,
        name: "USB-C Braided Cable 2m",
        qty: 2,
        price: 699,
        img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=120&q=80",
      },
    ],
    rating: 4,
  },
  {
    id: "IND-7788043",
    date: "2026-02-14",
    time: "3:30 PM",
    status: "cancelled",
    payment: "COD",
    total: 5999,
    saved: 3000,
    address: "204, Sunrise Apts, Koramangala, Bengaluru",
    items: [
      {
        id: 7,
        name: "Anker Soundcore Life Q45",
        qty: 1,
        price: 5999,
        img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=120&q=80",
      },
    ],
  },
  {
    id: "IND-7771209",
    date: "2026-02-08",
    time: "9:14 AM",
    status: "delivered",
    payment: "Debit Card",
    total: 89998,
    saved: 20002,
    address: "Work — IndiQube Sigma, Bellandur, Bengaluru",
    items: [
      {
        id: 8,
        name: "Samsung Galaxy S24 Ultra 5G",
        qty: 1,
        price: 79999,
        img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=120&q=80",
      },
      {
        id: 9,
        name: "Samsung Clear Case Galaxy S24",
        qty: 1,
        price: 1999,
        img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=120&q=80",
      },
    ],
    rating: 5,
  },
  {
    id: "IND-7754382",
    date: "2026-01-29",
    time: "7:55 PM",
    status: "delivered",
    payment: "UPI · Paytm",
    total: 8499,
    saved: 3500,
    address: "204, Sunrise Apts, Koramangala, Bengaluru",
    items: [
      {
        id: 10,
        name: "Nothing Phone (2a) 128GB",
        qty: 1,
        price: 8499,
        img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=120&q=80",
      },
    ],
    rating: 3,
  },
];

const STATUS_META = {
  out_for_delivery: {
    label: "Out for Delivery",
    color: "text-amber-400",
    bg: "bg-amber-400/12 border-amber-400/25",
    dot: "bg-amber-400",
    steps: 4,
    fill: 75,
  },
  delivered: {
    label: "Delivered",
    color: "text-emerald-400",
    bg: "bg-emerald-400/12 border-emerald-400/25",
    dot: "bg-emerald-500",
    steps: 4,
    fill: 100,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-rose-400",
    bg: "bg-rose-400/12 border-rose-400/25",
    dot: "bg-rose-500",
    steps: 0,
    fill: 0,
  },
  pending: {
    label: "Processing",
    color: "text-blue-400",
    bg: "bg-blue-400/12 border-blue-400/25",
    dot: "bg-blue-400",
    steps: 4,
    fill: 20,
  },
};

const STEP_LABELS = ["Confirmed", "Packed", "Picked Up", "Delivered"];

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const relDate = (d) => {
  const diff = Math.floor((Date.now() - new Date(d)) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: diff > 365 ? "numeric" : undefined,
  });
};

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

// ─── STATUS BADGE ───────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const m = STATUS_META[status] || STATUS_META.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${m.bg} ${m.color}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${m.dot} ${status === "out_for_delivery" ? "status-pulse" : ""}`}
      />
      {m.label}
    </span>
  );
};

// ─── MINI TIMELINE ──────────────────────────────────────────────────────────
const MiniTimeline = ({ status }) => {
  const m = STATUS_META[status];
  if (status === "cancelled")
    return (
      <div className="flex items-center gap-2 text-xs text-rose-400/70">
        <Ic
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0"
          c="w-4 h-4"
        />
        Order was cancelled
      </div>
    );
  return (
    <div className="space-y-1.5">
      <div className="flex gap-0 relative">
        {STEP_LABELS.map((lbl, i) => {
          const done =
            status === "delivered" || (status === "out_for_delivery" && i < 3);
          const active = status === "out_for_delivery" && i === 3;
          return (
            <div
              key={lbl}
              className="flex-1 flex flex-col items-center gap-1 relative"
            >
              {i > 0 && (
                <div
                  className={`absolute left-0 top-2 -translate-y-1/2 w-full h-0.5 -z-10 ${done || active ? "bg-indigo-500/50" : "bg-white/[.08]"}`}
                />
              )}
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center z-10 ${
                  status === "delivered"
                    ? "bg-emerald-500 border-emerald-500"
                    : done
                      ? "bg-indigo-500 border-indigo-500"
                      : active
                        ? "bg-amber-400 border-amber-400 status-pulse"
                        : "bg-[#0c111d] border-white/15"
                }`}
              >
                {(done || status === "delivered") && (
                  <Ic d="M5 13l4 4L19 7" c="w-2.5 h-2.5 text-white" sw={3} />
                )}
                {active && (
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
              <span
                className={`text-[9px] font-semibold text-center leading-tight hidden sm:block ${done || status === "delivered" ? "text-slate-400" : active ? "text-amber-400" : "text-slate-700"}`}
              >
                {lbl}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── STAR RATING ────────────────────────────────────────────────────────────
function StarRating({ orderId, initial }) {
  const [r, setR] = useState(initial || 0);
  const [hover, setHover] = useState(0);
  const [rated, setRated] = useState(!!initial);

  const choose = (n) => {
    setR(n);
    setRated(true);
  };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          disabled={rated}
          className={`star-btn ${rated ? "cursor-default" : ""}`}
          onMouseEnter={() => !rated && setHover(s)}
          onMouseLeave={() => !rated && setHover(0)}
          onClick={() => !rated && choose(s)}
        >
          <svg
            className={`w-4 h-4 transition-colors ${s <= (hover || r) ? "text-amber-400" : "text-white/15"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      {rated && (
        <span className="text-[11px] text-slate-500 ml-1">
          {initial ? "Rated" : "Thanks!"}
        </span>
      )}
    </div>
  );
}

// ─── ORDER CARD ─────────────────────────────────────────────────────────────
function OrderCard({ order, idx, onReorder }) {
  const [open, setOpen] = useState(false);
  const [reordered, setReordered] = useState(false);

  const handleReorder = (e) => {
    e.stopPropagation();
    setReordered(true);
    onReorder(order.id);
    setTimeout(() => setReordered(false), 3000);
  };

  const extraCount = order.items.length > 3 ? order.items.length - 3 : 0;
  const visibleImgs = order.items.slice(0, 3);

  return (
    <div
      className={`ocard card-in bg-[#111827] border border-white/[.07] rounded-2xl overflow-hidden`}
      style={{ animationDelay: `${idx * 0.07}s` }}
    >
      {/* ── CARD HEADER ── */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          {/* Product images */}
          <div className="img-stack flex items-center -space-x-3 shrink-0">
            {visibleImgs.map((item, i) => (
              <div
                key={item.id}
                className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-[#111827] bg-[#0c111d] shadow-lg"
                style={{ zIndex: visibleImgs.length - i }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {extraCount > 0 && (
              <div className="w-14 h-14 rounded-xl bg-white/[.06] border-2 border-[#111827] flex items-center justify-center z-0">
                <span className="text-xs font-bold text-slate-400">
                  +{extraCount}
                </span>
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded-lg">
                    #{order.id}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Ic
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      c="w-3 h-3"
                    />
                    {relDate(order.date)} · {order.time}
                  </span>
                  <span className="hidden sm:inline text-slate-700">·</span>
                  <span className="hidden sm:flex items-center gap-1">
                    <Ic
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      c="w-3 h-3"
                    />
                    {order.payment}
                  </span>
                  <span className="text-slate-700">·</span>
                  <span>
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="text-right shrink-0">
                <p className="text-xl font-black text-white">
                  {fmt(order.total)}
                </p>
                {order.saved > 0 && (
                  <p className="text-[11px] text-emerald-500 font-semibold">
                    saved {fmt(order.saved)}
                  </p>
                )}
              </div>
            </div>

            {/* Mini timeline */}
            <div className="mt-3">
              <MiniTimeline status={order.status} />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[.05] flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setOpen((o) => !o)}
              className="abtn flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 rounded-xl hover:bg-indigo-500/25 transition-colors"
            >
              <Ic
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                c="w-3.5 h-3.5"
              />
              {open ? "Hide" : "View"} Details
              <Ic d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} c="w-3 h-3" />
            </button>

            {(order.status === "out_for_delivery" ||
              order.status === "pending") && (
              <button className="abtn flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-amber-400/12 border border-amber-400/25 text-amber-400 rounded-xl hover:bg-amber-400/20 transition-colors">
                <Ic
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  c="w-3.5 h-3.5"
                />
                Track Order
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {order.status === "delivered" && !order.rating && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Rate:
                </span>
                <StarRating orderId={order.id} initial={order.rating} />
              </div>
            )}
            {order.status === "delivered" && order.rating && (
              <StarRating orderId={order.id} initial={order.rating} />
            )}
            {order.status !== "cancelled" && (
              <button
                onClick={handleReorder}
                className={`abtn flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all ${reordered ? "reorder-done bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-white/[.04] border-white/10 text-slate-400 hover:border-indigo-400/40 hover:text-indigo-400"}`}
              >
                {reordered ? (
                  <>
                    <Ic d="M5 13l4 4L19 7" c="w-3.5 h-3.5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <Ic
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      c="w-3.5 h-3.5"
                    />
                    Reorder
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── EXPANDED DETAILS ── */}
      <div className={`expand-body ${open ? "open" : "closed"}`}>
        <div className="border-t border-white/[.05] px-4 sm:px-5 py-4 bg-white/[.02] space-y-3">
          {/* Items list */}
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Order Items
          </p>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-[#0c111d] rounded-xl border border-white/[.05]"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/[.07] shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-200 lc1">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Qty: {item.qty}</p>
              </div>
              <p className="text-sm font-black text-white shrink-0">
                {fmt(item.price * item.qty)}
              </p>
            </div>
          ))}

          {/* Order meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 pt-3 border-t border-white/[.05]">
            {[
              {
                l: "Order Date",
                v: `${order.date} · ${order.time}`,
                ic: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                l: "Payment",
                v: order.payment,
                ic: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
              },
              {
                l: "Deliver to",
                v: order.address,
                ic: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
              },
            ].map((f) => (
              <div
                key={f.l}
                className="bg-[#0c111d] rounded-xl p-3 border border-white/[.05]"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Ic d={f.ic} c="w-3 h-3 text-slate-600" />
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    {f.l}
                  </p>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-snug">
                  {f.v}
                </p>
              </div>
            ))}
          </div>

          {/* Invoice + help row */}
          <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-200 transition-colors">
              <Ic
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                c="w-3.5 h-3.5"
              />
              Download Invoice
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-400 transition-colors">
              <Ic
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                c="w-3.5 h-3.5"
              />
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STATS BAR ──────────────────────────────────────────────────────────────
function StatsBar() {
  const total = ORDERS.reduce((s, o) => s + o.total, 0);
  const saved = ORDERS.reduce((s, o) => s + (o.saved || 0), 0);
  const delivered = ORDERS.filter((o) => o.status === "delivered").length;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        {
          l: "Total Orders",
          v: ORDERS.length,
          sub: "all time",
          ic: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          color: "text-indigo-400 bg-indigo-400/10",
        },
        {
          l: "Amount Spent",
          v: fmt(total),
          sub: "total value",
          ic: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0",
          color: "text-emerald-400 bg-emerald-400/10",
        },
        {
          l: "Total Saved",
          v: fmt(saved),
          sub: "via discounts",
          ic: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
          color: "text-amber-400 bg-amber-400/10",
        },
      ].map((s) => (
        <div
          key={s.l}
          className="bg-[#111827] border border-white/[.07] rounded-2xl p-4"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color} mb-2`}
          >
            <Ic d={s.ic} c="w-4 h-4" />
          </div>
          <p className="text-lg font-black text-white">{s.v}</p>
          <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

// ─── ORDER HISTORY PAGE ──────────────────────────────────────────────────────
const FILTERS = ["All", "Active", "Delivered", "Cancelled"];
const SORTS = [
  { k: "newest", l: "Newest First" },
  { k: "oldest", l: "Oldest First" },
  { k: "highest", l: "Highest Value" },
  { k: "lowest", l: "Lowest Value" },
];

export default function OrderHistoryPage() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [reorderMsg, setReorderMsg] = useState("");

  const handleReorder = (id) => {
    setReorderMsg(`Items from #${id} added to cart!`);
    setTimeout(() => setReorderMsg(""), 3500);
  };

  const visible = useMemo(() => {
    let list = [...ORDERS];
    if (filter === "Active")
      list = list.filter(
        (o) => o.status === "out_for_delivery" || o.status === "pending",
      );
    if (filter === "Delivered")
      list = list.filter((o) => o.status === "delivered");
    if (filter === "Cancelled")
      list = list.filter((o) => o.status === "cancelled");
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.items.some((i) => i.name.toLowerCase().includes(q)),
      );
    }
    switch (sort) {
      case "oldest":
        list = [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "highest":
        list = [...list].sort((a, b) => b.total - a.total);
        break;
      case "lowest":
        list = [...list].sort((a, b) => a.total - b.total);
        break;
      default:
        list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return list;
  }, [filter, sort, search]);

  return (
    <div className="oh-root">
      <G />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* ── PAGE HEADER ── */}
        <div className="mb-7">
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
            <span className="hover:text-slate-400 cursor-pointer">Account</span>
            <Ic d="M9 5l7 7-7 7" c="w-3 h-3" />
            <span className="text-slate-400">Order History</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="serif text-3xl text-white font-bold italic">
                My Orders
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {ORDERS.length} orders · Bengaluru, Karnataka
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0">
              <Ic
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                c="w-5 h-5 text-indigo-400"
              />
            </div>
          </div>
        </div>

        {/* ── STATS ── */}
        <StatsBar />

        {/* ── CONTROLS ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <Ic
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"
              c="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID or product…"
              className="search-in w-full bg-[#111827] border border-white/[.07] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300"
              >
                <Ic d="M6 18L18 6M6 6l12 12" c="w-3.5 h-3.5" sw={2} />
              </button>
            )}
          </div>
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-sel text-sm rounded-xl px-3 py-2.5"
          >
            {SORTS.map((s) => (
              <option key={s.k} value={s.k}>
                {s.l}
              </option>
            ))}
          </select>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto ts pb-1">
          {FILTERS.map((f) => {
            const cnt =
              f === "All"
                ? ORDERS.length
                : f === "Active"
                  ? ORDERS.filter(
                      (o) =>
                        o.status === "out_for_delivery" ||
                        o.status === "pending",
                    ).length
                  : ORDERS.filter((o) => o.status === f.toLowerCase()).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`fpill flex items-center gap-1.5 shrink-0 text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${filter === f ? "active" : "border-white/[.07] text-slate-500 bg-[#111827]"}`}
              >
                {f}
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${filter === f ? "bg-indigo-500/30" : "bg-white/[.06]"}`}
                >
                  {cnt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reorder toast */}
        {reorderMsg && (
          <div className="mb-4 flex items-center gap-2 bg-emerald-400/12 border border-emerald-400/25 text-emerald-400 text-sm font-semibold px-4 py-3 rounded-xl reorder-done">
            <Ic
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0"
              c="w-4 h-4 shrink-0"
            />
            {reorderMsg}
          </div>
        )}

        {/* ── ORDER CARDS ── */}
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="es-float text-6xl mb-5">📦</div>
            <h3 className="serif text-xl font-bold italic text-slate-400 mb-2">
              {search
                ? `No results for "${search}"`
                : `No ${filter.toLowerCase()} orders`}
            </h3>
            <p className="text-sm text-slate-600 max-w-xs">
              {search
                ? "Try a different search term or order ID."
                : "Orders will appear here once you place them."}
            </p>
            {(search || filter !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="mt-5 text-sm font-bold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-4 py-2.5 rounded-xl hover:bg-indigo-400/20 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((order, i) => (
              <OrderCard
                key={order.id}
                order={order}
                idx={i}
                onReorder={handleReorder}
              />
            ))}
          </div>
        )}

        {/* Result count */}
        {visible.length > 0 && (
          <p className="text-center text-xs text-slate-700 mt-6">
            Showing {visible.length} of {ORDERS.length} orders
          </p>
        )}
      </div>
    </div>
  );
}
