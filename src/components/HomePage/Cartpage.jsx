import { useState, useEffect, useRef } from "react";

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Mulish:wght@300;400;500;600;700;800&display=swap');

    .cart-root { font-family:'Mulish',system-ui,sans-serif; background:#f4f0e8; color:#1a1410; }
    .serif { font-family:'Playfair Display',Georgia,serif; }

    /* Entrance */
    .in0{animation:slideIn .5s cubic-bezier(.22,1,.36,1) both}
    .in1{animation:slideIn .5s .07s cubic-bezier(.22,1,.36,1) both}
    .in2{animation:slideIn .5s .14s cubic-bezier(.22,1,.36,1) both}
    .in3{animation:slideIn .5s .21s cubic-bezier(.22,1,.36,1) both}
    .inR{animation:slideRight .5s .1s cubic-bezier(.22,1,.36,1) both}
    @keyframes slideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
    @keyframes slideRight{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}

    /* Remove animation */
    .removing{animation:itemOut .35s cubic-bezier(.22,1,.36,1) forwards}
    @keyframes itemOut{to{opacity:0;transform:translateX(24px) scale(.97);max-height:0;margin:0;padding:0;border-width:0;overflow:hidden}}

    /* Qty button */
    .qty-btn{transition:all .18s cubic-bezier(.22,1,.36,1);}
    .qty-btn:hover:not(:disabled){background:#1a1410;color:#f4f0e8;transform:scale(1.08);}
    .qty-btn:active:not(:disabled){transform:scale(.92);}

    /* Remove button */
    .rm-btn{transition:all .2s;}
    .rm-btn:hover{color:#dc2626;background:#fee2e2;}

    /* Card hover */
    .item-card{transition:box-shadow .25s,border-color .25s;}
    .item-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.08);border-color:#c5bfb3;}

    /* Save badge pulse */
    .save-badge{animation:savePop .4s cubic-bezier(.34,1.56,.64,1) both;}
    @keyframes savePop{from{transform:scale(0)}to{transform:scale(1)}}

    /* Checkout btn */
    .checkout-btn{position:relative;overflow:hidden;transition:all .25s;}
    .checkout-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);transform:translateX(-100%);transition:transform .6s;}
    .checkout-btn:hover::after{transform:translateX(100%);}
    .checkout-btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(26,20,16,.25);}
    .checkout-btn:active{transform:scale(.97);}

    /* Continue btn */
    .cont-btn{transition:all .2s;}
    .cont-btn:hover{background:#e8e3da;border-color:#a8a098;}

    /* Coupon input */
    .coupon-input:focus{outline:none;border-color:#1a1410;}

    /* Img hover */
    .item-img{transition:transform .4s cubic-bezier(.22,1,.36,1);}
    .item-card:hover .item-img{transform:scale(1.05);}

    /* Price tick animation */
    .price-tick{animation:tick .3s cubic-bezier(.22,1,.36,1);}
    @keyframes tick{from{transform:translateY(-6px);opacity:0}to{transform:translateY(0);opacity:1}}

    /* Scrollbar */
    .cs::-webkit-scrollbar{width:4px;}
    .cs::-webkit-scrollbar-thumb{background:#c5bfb3;border-radius:2px;}

    /* Trust row */
    .trust-item{transition:color .15s;}

    /* Wishlist mini btn */
    .wl-btn{transition:all .2s cubic-bezier(.34,1.56,.64,1);}
    .wl-btn:hover{transform:scale(1.2);color:#dc2626;}
    .wl-btn.on{color:#dc2626;}

    /* Empty state */
    .empty-float{animation:emptyFloat 3s ease-in-out infinite;}
    @keyframes emptyFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  `}</style>
);

// ─── DATA ──────────────────────────────────────────────────────────────────
const INITIAL = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    seller: "Sharma Electronics",
    price: 24990,
    original: 34990,
    qty: 1,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=240&q=80",
    color: "Midnight Black",
  },
  {
    id: 2,
    name: "Anker 65W USB-C GaN Nano Charger",
    brand: "Anker",
    seller: "TechMart Official",
    price: 1499,
    original: 2499,
    qty: 2,
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=240&q=80",
    color: "Black",
  },
  {
    id: 3,
    name: "Apple AirPods Pro (2nd Gen) with MagSafe Case",
    brand: "Apple",
    seller: "iZone Official",
    price: 24900,
    original: 26900,
    qty: 1,
    img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=240&q=80",
    color: "White",
  },
];
const RECS = [
  {
    id: 10,
    name: "JBL Flip 6 Speaker",
    price: 8499,
    original: 11999,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&q=80",
  },
  {
    id: 11,
    name: "Samsung Galaxy Buds2",
    price: 5499,
    original: 8999,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80",
  },
  {
    id: 12,
    name: "Belkin USB-C Hub",
    price: 3499,
    original: 4999,
    img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&q=80",
  },
  {
    id: 13,
    name: "Cable Matters Braided",
    price: 699,
    original: 1199,
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80",
  },
];

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const pct = (p, o) => Math.round(((o - p) / o) * 100);

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

// ─── ANIMATED PRICE ─────────────────────────────────────────────────────────
function AnimPrice({ value, className = "" }) {
  const [key, setKey] = useState(0);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      setKey((k) => k + 1);
      prev.current = value;
    }
  }, [value]);
  return (
    <span key={key} className={`price-tick inline-block ${className}`}>
      {fmt(value)}
    </span>
  );
}

// ─── CART ITEM CARD ─────────────────────────────────────────────────────────
function CartItem({ item, onQty, onRemove, onWishlist, wishlisted }) {
  const [removing, setRemoving] = useState(false);
  const dp = pct(item.price, item.original);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 320);
  };

  return (
    <div
      className={`item-card bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 flex gap-4 ${removing ? "removing" : ""}`}
    >
      {/* Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0">
        <img
          src={item.img}
          alt={item.name}
          className="item-img w-full h-full object-cover"
        />
        {dp > 0 && (
          <span className="absolute top-1.5 left-1.5 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
            -{dp}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">
              {item.brand}
            </p>
            <h3
              className="text-sm font-semibold text-stone-900 leading-snug"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.name}
            </h3>
            {item.color && (
              <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                <Ic
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  c="w-3 h-3"
                />
                {item.color}
              </p>
            )}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onWishlist(item.id)}
              className={`wl-btn w-8 h-8 rounded-lg flex items-center justify-center ${wishlisted ? "on text-rose-500" : "text-stone-300"} hover:bg-rose-50`}
            >
              <Ic
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                c="w-4 h-4"
                fill={wishlisted}
                sw={wishlisted ? 0 : 1.8}
              />
            </button>
            <button
              onClick={handleRemove}
              className="rm-btn w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:bg-rose-50"
            >
              <Ic
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                c="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
          {/* Seller */}
          <div className="flex items-center gap-1 text-xs text-stone-400">
            <Ic
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
              c="w-3 h-3"
            />
            {item.seller}
          </div>

          <div className="flex items-center gap-4">
            {/* Price */}
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black text-stone-900">
                {fmt(item.price)}
              </span>
              {dp > 0 && (
                <span className="text-xs text-stone-400 line-through">
                  {fmt(item.original)}
                </span>
              )}
            </div>

            {/* Qty */}
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
              <button
                onClick={() => onQty(item.id, -1)}
                disabled={item.qty <= 1}
                className="qty-btn w-8 h-8 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed border-r border-stone-200"
              >
                <Ic d="M20 12H4" c="w-3.5 h-3.5" sw={2.5} />
              </button>
              <span className="w-9 text-center text-sm font-bold text-stone-800">
                {item.qty}
              </span>
              <button
                onClick={() => onQty(item.id, 1)}
                className="qty-btn w-8 h-8 flex items-center justify-center text-stone-600 border-l border-stone-200"
              >
                <Ic d="M12 4v16m8-8H4" c="w-3.5 h-3.5" sw={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EMPTY CART ──────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center in0">
      <div className="empty-float text-6xl mb-5">🛒</div>
      <h2 className="serif text-2xl font-semibold italic text-stone-800 mb-2">
        Your cart is empty
      </h2>
      <p className="text-sm text-stone-500 mb-6 max-w-xs">
        Looks like you haven't added anything yet. Start exploring and find
        something you love.
      </p>
      <button className="checkout-btn bg-stone-900 text-white text-sm font-bold px-6 py-3 rounded-xl">
        Browse Products
      </button>
    </div>
  );
}

// ─── PRICE SUMMARY ───────────────────────────────────────────────────────────
function PriceSummary({ items }) {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [couponErr, setCouponErr] = useState("");

  const subtotal = items.reduce((s, i) => s + i.original * i.qty, 0);
  const discount = items.reduce(
    (s, i) => s + (i.original - i.price) * i.qty,
    0,
  );
  const extra = applied ? Math.round(subtotal * 0.05) : 0;
  const delivery = 0;
  const total = subtotal - discount - extra + delivery;
  const totalSave = discount + extra;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE5") {
      setApplied(true);
      setCouponErr("");
    } else {
      setCouponErr("Invalid coupon code.");
      setApplied(false);
    }
  };

  return (
    <div className="inR bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm sticky top-4">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-100">
        <h2 className="serif text-lg font-semibold italic text-stone-900">
          Price Summary
        </h2>
        <p className="text-xs text-stone-400 mt-0.5">
          {items.reduce((s, i) => s + i.qty, 0)} item
          {items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="px-5 py-4 space-y-3">
        {/* Line items */}
        {[
          { l: "Items Total", v: subtotal, muted: true },
          { l: "Discount", v: -discount, green: true, cond: discount > 0 },
          { l: "Coupon (SAVE5)", v: -extra, green: true, cond: applied },
          { l: "Delivery Fee", v: delivery, free: true },
        ]
          .filter((r) => r.cond !== false)
          .map((r) => (
            <div key={r.l} className="flex items-center justify-between">
              <span className="text-sm text-stone-500">{r.l}</span>
              <span
                className={`text-sm font-semibold ${r.green ? "text-emerald-600" : r.free ? "text-emerald-600" : "text-stone-800"}`}
              >
                {r.free ? (
                  "FREE"
                ) : r.v < 0 ? (
                  `−${fmt(Math.abs(r.v))}`
                ) : (
                  <AnimPrice value={r.v} />
                )}
              </span>
            </div>
          ))}

        {/* Divider */}
        <div className="border-t border-dashed border-stone-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900">Total Payable</span>
            <AnimPrice
              value={total}
              className="text-xl font-black text-stone-900"
            />
          </div>
          {totalSave > 0 && (
            <div className="mt-2 flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              <Ic
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0"
                c="w-4 h-4 text-emerald-600 shrink-0"
              />
              <p className="text-xs text-emerald-700 font-semibold">
                You save <span className="font-black">{fmt(totalSave)}</span> on
                this order!
              </p>
            </div>
          )}
        </div>

        {/* Coupon */}
        <div className="pt-1">
          <p className="text-xs font-semibold text-stone-600 mb-2">
            Have a coupon?
          </p>
          {applied ? (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2">
                <Ic
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0"
                  c="w-4 h-4 text-emerald-600"
                />
                <span className="text-xs font-bold text-emerald-700">
                  SAVE5 applied · 5% off
                </span>
              </div>
              <button
                onClick={() => {
                  setApplied(false);
                  setCoupon("");
                }}
                className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                placeholder="Enter code (try SAVE5)"
                className="coupon-input flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-medium placeholder:text-stone-400 text-stone-800 focus:border-stone-800 transition-colors"
              />
              <button
                onClick={applyCoupon}
                className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
          )}
          {couponErr && (
            <p className="text-xs text-rose-500 mt-1.5">{couponErr}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="px-5 pb-5 space-y-2.5">
        <button className="checkout-btn w-full py-3.5 bg-stone-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2">
          <Ic d="M13 10V3L4 14h7v7l9-11h-7z" c="w-4 h-4" />
          Proceed to Checkout
        </button>
        <button className="cont-btn w-full py-3 bg-white border-2 border-stone-200 text-stone-700 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all">
          <Ic
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            c="w-4 h-4"
          />
          Continue Shopping
        </button>
      </div>

      {/* Trust badges */}
      <div className="border-t border-stone-100 px-5 py-3.5">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            {
              ic: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              l: "Secure Pay",
            },
            { ic: "M13 10V3L4 14h7v7l9-11h-7z", l: "Fast Delivery" },
            {
              ic: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
              l: "Easy Returns",
            },
          ].map((b) => (
            <div
              key={b.l}
              className="trust-item flex flex-col items-center gap-1 text-stone-400"
            >
              <div className="w-7 h-7 bg-stone-100 rounded-lg flex items-center justify-center">
                <Ic d={b.ic} c="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-semibold leading-tight">
                {b.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RECOMMENDED ────────────────────────────────────────────────────────────
function Recommended({ onAdd }) {
  return (
    <div className="in2 mt-6">
      <h3 className="serif text-xl font-semibold italic text-stone-800 mb-4">
        You might also need
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {RECS.map((r, i) => (
          <div
            key={r.id}
            className={`item-card bg-white border border-stone-200 rounded-2xl overflow-hidden cursor-pointer in${i}`}
          >
            <div className="aspect-square overflow-hidden bg-stone-50">
              <img
                src={r.img}
                alt={r.name}
                className="item-img w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p
                className="text-xs font-semibold text-stone-800 leading-snug mb-1"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {r.name}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <div>
                  <span className="text-sm font-black text-stone-900">
                    {fmt(r.price)}
                  </span>
                  <span className="text-[10px] text-stone-400 line-through ml-1">
                    {fmt(r.original)}
                  </span>
                </div>
                <button
                  onClick={() => onAdd(r)}
                  className="w-7 h-7 bg-stone-900 text-white rounded-lg flex items-center justify-center hover:bg-stone-700 transition-colors"
                >
                  <Ic d="M12 4v16m8-8H4" c="w-3.5 h-3.5" sw={2.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CART PAGE ───────────────────────────────────────────────────────────────
export default function CartPage() {
  const [items, setItems] = useState(INITIAL);
  const [wishlisted, setWishlisted] = useState(new Set());
  const [addedIds, setAddedIds] = useState(new Set());

  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, qty: Math.max(1, Math.min(10, i.qty + delta)) }
          : i,
      ),
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const toggleWishlist = (id) =>
    setWishlisted((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const addRec = (rec) => {
    if (addedIds.has(rec.id)) return;
    setItems((prev) => [
      ...prev,
      { ...rec, qty: 1, brand: "", seller: "Recommended", color: "" },
    ]);
    setAddedIds((prev) => new Set([...prev, rec.id]));
  };

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="cart-root min-h-screen">
      <G />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="in0 flex items-end justify-between mb-7">
          <div>
            <h1 className="serif text-3xl sm:text-4xl font-semibold italic text-stone-900">
              Shopping Cart
            </h1>
            {items.length > 0 && (
              <p className="text-sm text-stone-500 mt-1">
                <span className="font-bold text-stone-800">{totalItems}</span>{" "}
                item{totalItems !== 1 ? "s" : ""} in your cart
              </p>
            )}
          </div>
          {items.length > 0 && (
            <button
              onClick={() => setItems([])}
              className="text-xs font-semibold text-stone-400 hover:text-rose-500 transition-colors flex items-center gap-1.5 border border-stone-200 hover:border-rose-200 px-3 py-2 rounded-xl"
            >
              <Ic
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                c="w-3.5 h-3.5"
              />
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ── LEFT: Cart Items ── */}
            <div className="flex-1 min-w-0 w-full space-y-3">
              {/* Delivery banner */}
              <div className="in0 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                  <Ic
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    c="w-4 h-4 text-white"
                  />
                </div>
                <p className="text-sm text-emerald-800">
                  <span className="font-bold">🎉 Free delivery</span> on all
                  orders — estimated arrival in{" "}
                  <span className="font-bold">15–25 minutes</span>
                </p>
              </div>

              {/* Items */}
              {items.map((item, i) => (
                <div key={item.id} className={`in${Math.min(i, 3)}`}>
                  <CartItem
                    item={item}
                    onQty={updateQty}
                    onRemove={removeItem}
                    onWishlist={toggleWishlist}
                    wishlisted={wishlisted.has(item.id)}
                  />
                </div>
              ))}

              {/* Secure checkout note */}
              <div className="in3 flex items-center justify-center gap-6 py-4 text-stone-400">
                {[
                  {
                    ic: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                    l: "SSL Secure",
                  },
                  {
                    ic: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                    l: "All Cards Accepted",
                  },
                  {
                    ic: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                    l: "Buyer Protection",
                  },
                ].map((t) => (
                  <div
                    key={t.l}
                    className="flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Ic d={t.ic} c="w-3.5 h-3.5" />
                    {t.l}
                  </div>
                ))}
              </div>

              <Recommended onAdd={addRec} />
            </div>

            {/* ── RIGHT: Summary ── */}
            <div className="w-full lg:w-80 shrink-0">
              <PriceSummary items={items} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky checkout */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 px-4 py-3 z-40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-500">{totalItems} items</span>
            <AnimPrice
              value={items.reduce((s, i) => s + i.price * i.qty, 0) + 0}
              className="text-base font-black text-stone-900"
            />
          </div>
          <button className="checkout-btn w-full py-3.5 bg-stone-900 text-white font-bold text-sm rounded-xl">
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}
