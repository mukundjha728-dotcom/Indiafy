import { useState } from "react";

// ─── FONTS & BASE STYLES ──────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
    .checkout-root * { box-sizing: border-box; }
    .checkout-root { font-family: 'Sora', system-ui, sans-serif; }
    .step-fade { animation: stepFade 0.3s ease; }
    @keyframes stepFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .qty-btn:active { transform: scale(0.88); }
    .addr-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
    input[type=radio] { accent-color: #c2612a; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// ─── DATA ────────────────────────────────────────────────────────────────────
const ADDRESSES = [
  {
    id: 1,
    name: "Arjun Mehta",
    phone: "+91 98765 43210",
    line1: "204, Sunrise Apartments, Koramangala 4th Block",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560034",
    tag: "Home",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    phone: "+91 98765 43210",
    line1: "IndiQube Sigma, Outer Ring Road, Bellandur",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560103",
    tag: "Work",
  },
];

const CART = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Headphones",
    seller: "Sharma Electronics",
    price: 24990,
    originalPrice: 34990,
    qty: 1,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80",
  },
  {
    id: 2,
    title: "Anker 65W USB-C Nano Charger",
    seller: "TechMart Official",
    price: 1499,
    originalPrice: 2499,
    qty: 2,
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&q=80",
  },
];

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, className = "w-4 h-4", stroke = true, fill = false }) => (
  <svg
    className={className}
    fill={fill ? "currentColor" : "none"}
    stroke={stroke ? "currentColor" : "none"}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d={d}
    />
  </svg>
);

// ─── STEP HEADER ─────────────────────────────────────────────────────────────
function SectionHeader({ number, title, subtitle, completed, onEdit }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${completed ? "bg-emerald-500 text-white" : "bg-stone-900 text-white"}`}
        >
          {completed ? <Icon d="M5 13l4 4L19 7" className="w-4 h-4" /> : number}
        </div>
        <div>
          <h2 className="text-base font-semibold text-stone-900">{title}</h2>
          {subtitle && (
            <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {completed && onEdit && (
        <button
          onClick={onEdit}
          className="text-xs font-semibold text-amber-700 border border-amber-300 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
        >
          Edit
        </button>
      )}
    </div>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-stone-200 rounded-2xl p-5 md:p-6 shadow-sm step-fade ${className}`}
    >
      {children}
    </div>
  );
}

// ─── ADDRESS SECTION ──────────────────────────────────────────────────────────
function AddressSection({
  selectedId,
  onSelect,
  onComplete,
  completed,
  onEdit,
}) {
  const [showForm, setShowForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    pin: "",
    tag: "Home",
  });

  const tagColors = {
    Home: "bg-sky-50 text-sky-700 border-sky-200",
    Work: "bg-violet-50 text-violet-700 border-violet-200",
  };

  return (
    <Card>
      <SectionHeader
        number="1"
        title="Delivery Address"
        subtitle="Choose where to deliver your order"
        completed={completed}
        onEdit={onEdit}
      />

      {!completed && (
        <div className="space-y-3 step-fade">
          {ADDRESSES.map((addr) => (
            <label
              key={addr.id}
              className={`addr-card flex gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedId === addr.id ? "border-stone-900 bg-stone-50" : "border-stone-200 hover:border-stone-300"}`}
            >
              <input
                type="radio"
                name="address"
                checked={selectedId === addr.id}
                onChange={() => onSelect(addr.id)}
                className="mt-1 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-stone-900">
                    {addr.name}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagColors[addr.tag]}`}
                  >
                    {addr.tag}
                  </span>
                </div>
                <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                  {addr.line1}, {addr.city}, {addr.state} — {addr.pin}
                </p>
                <p className="text-xs text-stone-400 mt-1">{addr.phone}</p>
              </div>
              {selectedId === addr.id && (
                <button className="text-xs text-stone-500 border border-stone-200 rounded-lg px-2.5 py-1 self-start hover:bg-stone-100 transition-colors whitespace-nowrap">
                  Edit
                </button>
              )}
            </label>
          ))}

          {/* Add New Address toggle */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-stone-300 rounded-xl text-sm font-medium text-stone-500 hover:border-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-all"
            >
              <Icon d="M12 4v16m8-8H4" className="w-4 h-4" />
              Add New Address
            </button>
          ) : (
            <div className="border-2 border-stone-200 rounded-xl p-4 space-y-3 step-fade">
              <p className="text-sm font-semibold text-stone-800">
                New Address
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Full Name", "name"],
                  ["Phone", "phone"],
                ].map(([ph, key]) => (
                  <input
                    key={key}
                    placeholder={ph}
                    value={newAddr[key]}
                    onChange={(e) =>
                      setNewAddr((p) => ({ ...p, [key]: e.target.value }))
                    }
                    className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
                  />
                ))}
              </div>
              <input
                placeholder="Street Address"
                value={newAddr.line1}
                onChange={(e) =>
                  setNewAddr((p) => ({ ...p, line1: e.target.value }))
                }
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="City"
                  value={newAddr.city}
                  onChange={(e) =>
                    setNewAddr((p) => ({ ...p, city: e.target.value }))
                  }
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
                />
                <input
                  placeholder="PIN Code"
                  value={newAddr.pin}
                  onChange={(e) =>
                    setNewAddr((p) => ({ ...p, pin: e.target.value }))
                  }
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
                />
              </div>
              <div className="flex gap-2">
                {["Home", "Work", "Other"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setNewAddr((p) => ({ ...p, tag: t }))}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${newAddr.tag === t ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 text-sm font-medium text-stone-500 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-2.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors">
                  Save Address
                </button>
              </div>
            </div>
          )}

          <button
            onClick={onComplete}
            disabled={!selectedId}
            className="w-full py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-1"
          >
            Deliver Here
          </button>
        </div>
      )}

      {completed &&
        selectedId &&
        (() => {
          const addr = ADDRESSES.find((a) => a.id === selectedId);
          return addr ? (
            <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3 step-fade">
              <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <Icon
                  d="M5 13l4 4L19 7"
                  className="w-3.5 h-3.5 text-emerald-600"
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  {addr.name} · {addr.tag}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {addr.line1}, {addr.city} — {addr.pin}
                </p>
              </div>
            </div>
          ) : null;
        })()}
    </Card>
  );
}

// ─── ORDER SUMMARY ────────────────────────────────────────────────────────────
function OrderSummary({
  items,
  onQtyChange,
  onRemove,
  onComplete,
  completed,
  onEdit,
}) {
  return (
    <Card>
      <SectionHeader
        number="2"
        title="Order Summary"
        subtitle={`${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
        completed={completed}
        onEdit={onEdit}
      />

      {!completed && (
        <div className="space-y-4 step-fade">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-stone-50 rounded-xl border border-stone-100"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-900 leading-snug line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                  by {item.seller}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-base font-bold text-stone-900">
                    {fmt(item.price)}
                  </span>
                  <span className="text-xs text-stone-400 line-through">
                    {fmt(item.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    {Math.round((1 - item.price / item.originalPrice) * 100)}%
                    off
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  {/* Qty */}
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => onQtyChange(item.id, -1)}
                      className="qty-btn w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Icon d="M20 12H4" className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-stone-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onQtyChange(item.id, 1)}
                      className="qty-btn w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Icon d="M12 4v16m8-8H4" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => onRemove(item.id)}
                    className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-medium transition-colors"
                  >
                    <Icon
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      className="w-3.5 h-3.5"
                    />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={onComplete}
            className="w-full py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all mt-1"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {completed && (
        <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3 step-fade">
          <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <Icon d="M5 13l4 4L19 7" className="w-3.5 h-3.5 text-emerald-600" />
          </span>
          <p className="text-sm text-stone-600">
            {items.length} item{items.length !== 1 ? "s" : ""} confirmed ·{" "}
            {fmt(items.reduce((s, i) => s + i.price * i.qty, 0))}
          </p>
        </div>
      )}
    </Card>
  );
}

// ─── PAYMENT METHODS ──────────────────────────────────────────────────────────
const PAYMENT_OPTIONS = [
  {
    id: "upi",
    label: "UPI",
    desc: "Pay via Google Pay, PhonePe, Paytm",
    icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    extra: (
      <div className="mt-3 step-fade">
        <input
          placeholder="Enter UPI ID (e.g. name@upi)"
          className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
        />
        <div className="flex gap-2 mt-3">
          {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
            <button
              key={app}
              className="flex-1 py-2 text-xs font-semibold border border-stone-200 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-all text-stone-600"
            >
              {app}
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "card",
    label: "Debit / Credit Card",
    desc: "Visa, Mastercard, RuPay accepted",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    extra: (
      <div className="mt-3 space-y-3 step-fade">
        <input
          placeholder="Card Number"
          className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="MM / YY"
            className="border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
          />
          <input
            placeholder="CVV"
            type="password"
            className="border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
          />
        </div>
        <input
          placeholder="Name on Card"
          className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-300"
        />
      </div>
    ),
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    desc: "Pay when your order arrives",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    extra: (
      <p className="mt-3 text-xs text-stone-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 step-fade">
        ₹40 cash handling fee applies. Please keep exact change ready at the
        time of delivery.
      </p>
    ),
  },
];

function PaymentMethods({ selected, onSelect, completed, onEdit }) {
  return (
    <Card>
      <SectionHeader
        number="3"
        title="Payment Method"
        subtitle="Choose how you'd like to pay"
        completed={completed}
        onEdit={onEdit}
      />

      {!completed && (
        <div className="space-y-3 step-fade">
          {PAYMENT_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${selected === opt.id ? "border-stone-900 bg-stone-50" : "border-stone-200 hover:border-stone-300"}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  readOnly
                  checked={selected === opt.id}
                  className="shrink-0"
                />
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${selected === opt.id ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"} transition-all`}
                >
                  <Icon d={opt.icon} className="w-4.5 h-4.5 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {opt.label}
                  </p>
                  <p className="text-xs text-stone-400">{opt.desc}</p>
                </div>
              </div>
              {selected === opt.id && opt.extra}
            </div>
          ))}
        </div>
      )}

      {completed && (
        <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3 step-fade">
          <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <Icon d="M5 13l4 4L19 7" className="w-3.5 h-3.5 text-emerald-600" />
          </span>
          <p className="text-sm text-stone-600">
            {PAYMENT_OPTIONS.find((p) => p.id === selected)?.label ?? "—"}{" "}
            selected
          </p>
        </div>
      )}
    </Card>
  );
}

// ─── TRUST SIGNALS ────────────────────────────────────────────────────────────
function TrustSignals() {
  const signals = [
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      label: "Secure Payment",
      sub: "256-bit SSL encryption",
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      label: "Fast Delivery",
      sub: "15–25 min delivery",
    },
    {
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
      label: "Easy Returns",
      sub: "7-day hassle-free returns",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {signals.map(({ icon, label, sub }) => (
        <div
          key={label}
          className="flex flex-col items-center text-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl p-3"
        >
          <div className="w-8 h-8 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-sm">
            <Icon d={icon} className="w-4 h-4 text-stone-600" />
          </div>
          <p className="text-xs font-semibold text-stone-800">{label}</p>
          <p className="text-[10px] text-stone-400 leading-tight">{sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── PRICE DETAILS ────────────────────────────────────────────────────────────
function PriceDetails({ items, onPlaceOrder, placing }) {
  const itemsTotal = items.reduce((s, i) => s + i.originalPrice * i.qty, 0);
  const discount = items.reduce(
    (s, i) => s + (i.originalPrice - i.price) * i.qty,
    0,
  );
  const delivery = 40;
  const total = itemsTotal - discount + delivery;

  const rows = [
    {
      label: `Items Total (${items.reduce((s, i) => s + i.qty, 0)})`,
      value: fmt(itemsTotal),
      muted: false,
    },
    {
      label: "Discount",
      value: `−${fmt(discount)}`,
      muted: false,
      green: true,
    },
    { label: "Delivery Fee", value: fmt(delivery), muted: false },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-stone-900 mb-4 flex items-center gap-2">
          <Icon
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
            className="w-4 h-4 text-stone-400"
          />
          Price Details
        </h3>
        <div className="space-y-3">
          {rows.map(({ label, value, green }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-stone-500">{label}</span>
              <span
                className={`text-sm font-medium ${green ? "text-emerald-600" : "text-stone-800"}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-200 border-dashed mt-4 pt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-stone-900">
            Total Payable
          </span>
          <span className="text-xl font-black text-stone-900">
            {fmt(total)}
          </span>
        </div>
        <p className="text-xs text-emerald-600 font-medium mt-2 text-right">
          You save {fmt(discount)} on this order 🎉
        </p>

        {/* Place Order Button */}
        <button
          onClick={onPlaceOrder}
          disabled={placing}
          className="w-full mt-5 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 active:scale-95 transition-all shadow-lg shadow-orange-200 disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
        >
          {placing ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Placing Order...
            </>
          ) : (
            <>
              <Icon d="M5 13l4 4L19 7" className="w-4 h-4" />
              Place Order · {fmt(total)}
            </>
          )}
        </button>
      </div>

      <TrustSignals />

      {/* Accepted payments */}
      <div className="text-center">
        <p className="text-xs text-stone-400 mb-2">We accept</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {["VISA", "MC", "RuPay", "UPI", "GPay", "PhonePe"].map((m) => (
            <span
              key={m}
              className="text-[10px] font-bold border border-stone-200 text-stone-400 px-2 py-1 rounded-md bg-white"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SUCCESS OVERLAY ──────────────────────────────────────────────────────────
function OrderSuccess({ onReset }) {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl p-10 max-w-sm w-full text-center step-fade">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-10 h-10 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">
          Order Placed!
        </h2>
        <p className="text-stone-500 text-sm mb-1">
          Your order has been confirmed.
        </p>
        <p className="text-stone-400 text-xs mb-6">
          Estimated delivery:{" "}
          <span className="font-semibold text-stone-700">15–25 minutes</span>
        </p>
        <div className="text-xs text-stone-400 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 mb-6">
          Order ID:{" "}
          <span className="font-mono font-bold text-stone-700">
            #ORD-{Math.floor(Math.random() * 9000000) + 1000000}
          </span>
        </div>
        <button
          onClick={onReset}
          className="w-full py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [addrDone, setAddrDone] = useState(false);
  const [summaryDone, setSummaryDone] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [payMethod, setPayMethod] = useState("upi");
  const [cartItems, setCartItems] = useState(CART);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleQty = (id, delta) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  const handleRemove = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="checkout-root min-h-screen bg-stone-100">
      <GlobalStyles />
      {success && (
        <OrderSuccess
          onReset={() => {
            setSuccess(false);
            setAddrDone(false);
            setSummaryDone(false);
            setPaymentDone(false);
            setSelectedAddr(null);
            setCartItems(CART);
          }}
        />
      )}

      {/* Progress bar */}
      <div className="bg-white border-b border-stone-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          {[
            { label: "Address", done: addrDone },
            { label: "Order", done: summaryDone },
            { label: "Payment", done: paymentDone },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-2 flex-1">
              <div
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${s.done ? "text-emerald-600" : i === arr.findIndex((x) => !x.done) ? "text-stone-900" : "text-stone-400"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${s.done ? "bg-emerald-500 text-white" : i === arr.findIndex((x) => !x.done) ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-400"}`}
                >
                  {s.done ? "✓" : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div
                  className={`flex-1 h-0.5 rounded-full transition-colors ${s.done ? "bg-emerald-400" : "bg-stone-200"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT: Steps */}
          <div className="flex-1 w-full space-y-4 min-w-0">
            <AddressSection
              selectedId={selectedAddr}
              onSelect={setSelectedAddr}
              onComplete={() => setAddrDone(true)}
              completed={addrDone}
              onEdit={() => {
                setAddrDone(false);
                setSummaryDone(false);
                setPaymentDone(false);
              }}
            />
            {addrDone && (
              <OrderSummary
                items={cartItems}
                onQtyChange={handleQty}
                onRemove={handleRemove}
                onComplete={() => setSummaryDone(true)}
                completed={summaryDone}
                onEdit={() => {
                  setSummaryDone(false);
                  setPaymentDone(false);
                }}
              />
            )}
            {summaryDone && (
              <PaymentMethods
                selected={payMethod}
                onSelect={setPayMethod}
                completed={paymentDone}
                onEdit={() => setPaymentDone(false)}
              />
            )}
            {summaryDone && !paymentDone && (
              <button
                onClick={() => setPaymentDone(true)}
                className="w-full py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-sm"
              >
                Review & Place Order →
              </button>
            )}
          </div>

          {/* RIGHT: Price Details */}
          <div className="w-full lg:w-80 lg:sticky lg:top-6 shrink-0">
            <PriceDetails
              items={cartItems}
              onPlaceOrder={handlePlaceOrder}
              placing={placing}
            />
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-3 shadow-2xl z-40">
        <button
          onClick={handlePlaceOrder}
          disabled={placing || !paymentDone}
          className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl hover:from-amber-500 hover:to-orange-400 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {placing
            ? "Placing..."
            : `Place Order · ${fmt(cartItems.reduce((s, i) => s + i.price * i.qty, 0) + 40)}`}
        </button>
      </div>
    </div>
  );
}
