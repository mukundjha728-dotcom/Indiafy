import { useState, useRef, useEffect } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    .pay-root { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .fade-in { animation: fadeUp .35s cubic-bezier(.22,1,.36,1) both; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    .shimmer { background: linear-gradient(90deg, #1e2d45 25%, #243550 50%, #1e2d45 75%); background-size: 200% 100%; animation: shimmer 1.8s infinite; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .card-flip { perspective: 1000px; }
    .card-inner { transition: transform 0.6s cubic-bezier(.4,0,.2,1); transform-style: preserve-3d; }
    .card-inner.flipped { transform: rotateY(180deg); }
    .card-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .card-back { transform: rotateY(180deg); }
    .pay-btn { position: relative; overflow: hidden; }
    .pay-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent); transform:translateX(-100%); transition:transform .5s; }
    .pay-btn:hover::after { transform:translateX(100%); }
    input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #152032 inset !important; -webkit-text-fill-color: #e2e8f0 !important; }
    .glow { box-shadow: 0 0 0 2px rgba(34,211,178,.35); }
    ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#0f1923; } ::-webkit-scrollbar-thumb { background:#2d4a6b; border-radius:2px; }
    .success-ring { animation: ring 0.6s cubic-bezier(.22,1,.36,1) both; }
    @keyframes ring { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
    .upi-app-btn:hover { transform: translateY(-3px); }
    .method-card { transition: all .25s cubic-bezier(.22,1,.36,1); }
    .method-card:hover { transform: translateY(-1px); }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ORDER = {
  id: "ORD-7829134",
  items: [
    {
      id: 1,
      title: "Sony WH-1000XM5 Headphones",
      seller: "Sharma Electronics",
      price: 24990,
      original: 34990,
      qty: 1,
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80",
    },
    {
      id: 2,
      title: "Anker 65W USB-C Nano Charger",
      seller: "TechMart Official",
      price: 1499,
      original: 2499,
      qty: 2,
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&q=80",
    },
  ],
  delivery: 0,
};

const UPI_APPS = [
  { name: "GPay", color: "#4285F4", letter: "G" },
  { name: "PhonePe", color: "#5f259f", letter: "P" },
  { name: "Paytm", color: "#00BAF2", letter: "P" },
  { name: "BHIM", color: "#1a6b3c", letter: "B" },
];

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function useCardFormat(val, setter) {
  const format = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  return (e) => setter(format(e.target.value));
}

function Icon({ d, className = "w-4 h-4", strokeWidth = 1.8 }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d={d} />
    </svg>
  );
}

function LockBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2 py-0.5 rounded-full font-medium">
      <Icon
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        className="w-2.5 h-2.5"
      />
      256-bit SSL
    </span>
  );
}

// ─── PAYMENT METHOD TAB ───────────────────────────────────────────────────────
function MethodTab({ id, active, onClick, icon, label, badge }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`method-card flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all ${
        active
          ? "bg-teal-500/10 border-teal-400/50 shadow-lg shadow-teal-900/30"
          : "bg-white/[.03] border-white/[.08] hover:border-white/20 hover:bg-white/[.06]"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${active ? "bg-teal-400/20 text-teal-300" : "bg-white/5 text-slate-400"}`}
      >
        {icon}
      </div>
      <span
        className={`text-xs font-semibold transition-colors ${active ? "text-teal-300" : "text-slate-400"}`}
      >
        {label}
      </span>
      {badge && (
        <span className="text-[9px] bg-teal-500 text-white px-1.5 py-0.5 rounded-full font-bold">
          {badge}
        </span>
      )}
      {active && <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />}
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
function Field({ label, error, children, required }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400 flex items-center gap-1">
        {label} {required && <span className="text-teal-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-rose-400 flex items-center gap-1">
          <Icon
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0"
            className="w-3 h-3"
          />
          {error}
        </p>
      )}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  className = "",
  icon,
  onFocus,
  onBlur,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`relative flex items-center rounded-xl border transition-all ${focused ? "glow border-teal-400/50 bg-[#152032]" : "border-white/[.1] bg-white/[.04] hover:border-white/20"}`}
    >
      {icon && <div className="absolute left-3 text-slate-500">{icon}</div>}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        className={`w-full bg-transparent text-slate-200 placeholder:text-slate-600 text-sm py-3 rounded-xl focus:outline-none ${icon ? "pl-9 pr-3" : "px-4"} ${className}`}
      />
    </div>
  );
}

// ─── UPI PAYMENT ──────────────────────────────────────────────────────────────
function UPIPayment({ onPay, amount, loading }) {
  const [upiId, setUpiId] = useState("");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (!upiId && !selected) {
      setError("Please enter UPI ID or select an app");
      return false;
    }
    if (upiId && !/^[\w.\-_]+@[\w]+$/.test(upiId)) {
      setError("Invalid UPI ID format");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="space-y-5 fade-in">
      {/* App shortcuts */}
      <div>
        <p className="text-xs text-slate-500 mb-3 font-medium">
          Quick pay with
        </p>
        <div className="grid grid-cols-4 gap-3">
          {UPI_APPS.map((app) => (
            <button
              key={app.name}
              onClick={() => {
                setSelected(app.name);
                setUpiId("");
                setError("");
              }}
              className={`upi-app-btn flex flex-col items-center gap-2 py-3 rounded-xl border transition-all ${selected === app.name ? "border-teal-400/50 bg-teal-400/10" : "border-white/[.08] bg-white/[.03] hover:border-white/20"}`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg"
                style={{ backgroundColor: app.color }}
              >
                {app.letter}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[.06]" />
        <span className="text-xs text-slate-600 font-medium">
          or enter UPI ID
        </span>
        <div className="h-px flex-1 bg-white/[.06]" />
      </div>

      <Field label="UPI ID" error={error} required>
        <Input
          value={upiId}
          onChange={(e) => {
            setUpiId(e.target.value);
            setSelected(null);
            setError("");
          }}
          placeholder="yourname@upi"
          icon={
            <Icon
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              className="w-4 h-4"
            />
          }
        />
      </Field>

      <button
        onClick={() => validate() && onPay()}
        disabled={loading}
        className="pay-btn w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 active:scale-[.98] transition-all shadow-xl shadow-teal-900/40 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Icon d="M13 10V3L4 14h7v7l9-11h-7z" className="w-4 h-4" />
            Pay {fmt(amount)} via UPI
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-600">
        Redirects to your UPI app for authentication
      </p>
    </div>
  );
}

// ─── CARD PAYMENT ─────────────────────────────────────────────────────────────
function CardPayment({ onPay, amount, loading }) {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvFocus, setCvvFocus] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNum = useCardFormat(num, setNum);
  const handleExp = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    setExp(v);
  };

  const cardType = () => {
    const n = num.replace(/\s/g, "");
    if (/^4/.test(n)) return { label: "VISA", color: "#1a1f71" };
    if (/^5[1-5]/.test(n)) return { label: "MC", color: "#eb001b" };
    if (/^6/.test(n)) return { label: "RuPay", color: "#1a6b3c" };
    return null;
  };

  const validate = () => {
    const e = {};
    if (num.replace(/\s/g, "").length < 16)
      e.num = "Enter a valid 16-digit card number";
    if (!name.trim()) e.name = "Cardholder name is required";
    if (exp.length < 5) e.exp = "Enter valid expiry (MM/YY)";
    if (cvv.length < 3) e.cvv = "Enter valid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const ct = cardType();

  return (
    <div className="space-y-5 fade-in">
      {/* Virtual Card Preview */}
      <div className="card-flip">
        <div
          className={`card-inner ${cvvFocus ? "flipped" : ""}`}
          style={{ height: 160 }}
        >
          {/* Front */}
          <div
            className="card-face absolute inset-0 rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #0f3460 0%, #16213e 60%, #0a1628 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, rgba(34,211,178,.6) 0%, transparent 50%)",
              }}
            />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-90" />
              {ct ? (
                <span className="text-white font-black text-sm tracking-widest">
                  {ct.label}
                </span>
              ) : (
                <div className="w-10 h-5 rounded shimmer" />
              )}
            </div>
            <div className="relative z-10">
              <p className="mono text-white/80 text-lg tracking-[.2em] font-medium">
                {num
                  ? num.padEnd(19, " ").replace(/ /g, "\u00A0")
                  : "•••• •••• •••• ••••"}
              </p>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-wider">
                    Card Holder
                  </p>
                  <p className="text-white/80 text-xs font-semibold mt-0.5 truncate max-w-[140px]">
                    {name || "YOUR NAME"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/30 text-[9px] uppercase tracking-wider">
                    Expires
                  </p>
                  <p className="text-white/80 text-xs font-semibold mt-0.5">
                    {exp || "MM/YY"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Back */}
          <div
            className="card-face card-back absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0a1628 0%, #16213e 100%)",
            }}
          >
            <div className="h-10 bg-black/40 mt-8" />
            <div className="px-5 mt-4">
              <div className="flex justify-end items-center gap-3">
                <div className="flex-1 h-8 bg-white/5 rounded" />
                <div className="bg-white/10 rounded-md px-3 py-1.5 min-w-[60px] text-center">
                  <p className="text-white/50 text-[8px] uppercase tracking-wider mb-0.5">
                    CVV
                  </p>
                  <p className="mono text-white text-sm font-semibold">
                    {cvv ? "•".repeat(cvv.length) : "•••"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Card Number" error={errors.num} required>
          <Input
            value={num}
            onChange={handleNum}
            placeholder="1234 5678 9012 3456"
            className="mono tracking-widest"
            icon={
              <Icon
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                className="w-4 h-4"
              />
            }
          />
        </Field>
        <Field label="Cardholder Name" error={errors.name} required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="AS ON CARD"
            icon={
              <Icon
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                className="w-4 h-4"
              />
            }
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Expiry Date" error={errors.exp} required>
            <Input
              value={exp}
              onChange={handleExp}
              placeholder="MM / YY"
              maxLength={5}
              icon={
                <Icon
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  className="w-4 h-4"
                />
              }
            />
          </Field>
          <Field label="CVV" error={errors.cvv} required>
            <Input
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="•••"
              type="password"
              maxLength={4}
              onFocus={() => setCvvFocus(true)}
              onBlur={() => setCvvFocus(false)}
              icon={
                <Icon
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  className="w-4 h-4"
                />
              }
            />
          </Field>
        </div>
      </div>

      <button
        onClick={() => validate() && onPay()}
        disabled={loading}
        className="pay-btn w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400 active:scale-[.98] transition-all shadow-xl shadow-indigo-900/40 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Icon
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              className="w-4 h-4"
            />
            Pay Securely · {fmt(amount)}
          </>
        )}
      </button>
    </div>
  );
}

// ─── COD PAYMENT ─────────────────────────────────────────────────────────────
function CODPayment({ onPay, amount, loading }) {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="space-y-5 fade-in">
      {/* Illustration */}
      <div className="bg-white/[.03] border border-white/[.06] rounded-2xl p-6 flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
          <Icon
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            className="w-7 h-7 text-amber-400"
          />
        </div>
        <div>
          <h3 className="text-white font-bold">Cash on Delivery</h3>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
            Pay <span className="text-amber-300 font-bold">{fmt(amount)}</span>{" "}
            in cash when your order arrives at your doorstep.
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        {[
          {
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0",
            text: "Estimated delivery in 15–25 minutes",
            color: "text-teal-400",
          },
          {
            icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0",
            text: "₹40 cash handling fee added to total",
            color: "text-amber-400",
          },
          {
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0",
            text: "Eligible for this order & address",
            color: "text-emerald-400",
          },
        ].map(({ icon, text, color }) => (
          <div
            key={text}
            className="flex items-start gap-3 bg-white/[.03] rounded-xl px-4 py-3 border border-white/[.05]"
          >
            <Icon d={icon} className={`w-4 h-4 shrink-0 mt-0.5 ${color}`} />
            <p className="text-sm text-slate-300">{text}</p>
          </div>
        ))}
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <div
          onClick={() => setAgreed(!agreed)}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${agreed ? "bg-teal-500 border-teal-500" : "border-white/20 group-hover:border-teal-400/50"}`}
        >
          {agreed && (
            <Icon
              d="M5 13l4 4L19 7"
              className="w-3 h-3 text-white"
              strokeWidth={2.5}
            />
          )}
        </div>
        <span className="text-sm text-slate-400 leading-relaxed">
          I agree to keep exact change and will be available to receive the
          delivery.
        </span>
      </label>

      <button
        onClick={() => agreed && onPay()}
        disabled={!agreed || loading}
        className="pay-btn w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 active:scale-[.98] transition-all shadow-xl shadow-amber-900/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Icon
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0"
              className="w-4 h-4"
            />
            Confirm COD Order · {fmt(amount + 40)}
          </>
        )}
      </button>
    </div>
  );
}

// ─── PAYMENT METHODS CONTAINER ────────────────────────────────────────────────
function PaymentMethods({ amount, onPay, loading }) {
  const [active, setActive] = useState("upi");

  const METHODS = [
    { id: "upi", label: "UPI", badge: "Popular", icon: "⚡" },
    { id: "card", label: "Card", badge: null, icon: "💳" },
    { id: "cod", label: "Cash", badge: null, icon: "🏠" },
  ];

  return (
    <div className="bg-[#0d1b2a] border border-white/[.08] rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-lg">Choose Payment</h2>
          <p className="text-slate-500 text-xs mt-0.5">
            All transactions are secure and encrypted
          </p>
        </div>
        <LockBadge />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {METHODS.map((m) => (
          <MethodTab
            key={m.id}
            id={m.id}
            active={active === m.id}
            onClick={setActive}
            icon={m.icon}
            label={m.label}
            badge={m.badge}
          />
        ))}
      </div>

      {/* Panel */}
      <div key={active}>
        {active === "upi" && (
          <UPIPayment onPay={onPay} amount={amount} loading={loading} />
        )}
        {active === "card" && (
          <CardPayment onPay={onPay} amount={amount} loading={loading} />
        )}
        {active === "cod" && (
          <CODPayment onPay={onPay} amount={amount} loading={loading} />
        )}
      </div>
    </div>
  );
}

// ─── ORDER SUMMARY ────────────────────────────────────────────────────────────
function OrderSummary({ items, delivery }) {
  const [expanded, setExpanded] = useState(true);
  const subTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = items.reduce((s, i) => s + (i.original - i.price) * i.qty, 0);
  const total = subTotal + delivery;

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="bg-[#0d1b2a] border border-white/[.08] rounded-3xl p-5 shadow-2xl">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between mb-4 group"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-white font-bold">Order Summary</h3>
            <span className="text-[11px] bg-teal-500/20 text-teal-400 border border-teal-400/20 px-2 py-0.5 rounded-full font-semibold">
              {items.reduce((s, i) => s + i.qty, 0)} items
            </span>
          </div>
          <Icon
            d={expanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors"
          />
        </button>

        {expanded && (
          <div className="space-y-3 fade-in">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-white/[.03] rounded-2xl border border-white/[.05]"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/[.08]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    by {item.seller}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] text-slate-500">
                      Qty: {item.qty}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-bold">
                        {fmt(item.price * item.qty)}
                      </span>
                      <span className="text-slate-600 text-[11px] line-through">
                        {fmt(item.original * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="bg-[#0d1b2a] border border-white/[.08] rounded-3xl p-5 shadow-2xl">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Icon
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
            className="w-4 h-4 text-slate-400"
          />
          Price Details
        </h3>
        <div className="space-y-3">
          {[
            {
              label: "Items Total",
              val: fmt(items.reduce((s, i) => s + i.original * i.qty, 0)),
              muted: true,
            },
            { label: "Discount", val: `−${fmt(savings)}`, green: true },
            {
              label: "Delivery Fee",
              val: delivery === 0 ? "FREE" : fmt(delivery),
              green: delivery === 0,
            },
          ].map(({ label, val, muted, green }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <span
                className={`text-sm font-semibold ${green ? "text-emerald-400" : muted ? "text-slate-300" : "text-slate-200"}`}
              >
                {val}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[.08] mt-4 pt-4 flex items-center justify-between">
          <span className="text-white font-bold">Total Payable</span>
          <span className="text-2xl font-black text-white">{fmt(total)}</span>
        </div>

        {savings > 0 && (
          <div className="mt-3 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-3 py-2 flex items-center gap-2">
            <Icon
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0"
              className="w-4 h-4 text-emerald-400 shrink-0"
            />
            <p className="text-xs text-emerald-400 font-medium">
              You're saving <span className="font-bold">{fmt(savings)}</span> on
              this order!
            </p>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="bg-[#0d1b2a] border border-white/[.08] rounded-3xl p-5 shadow-2xl">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">
          Why trust us
        </p>
        <div className="space-y-3">
          {[
            {
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              label: "Secure Payment",
              sub: "Bank-grade 256-bit SSL encryption",
              color: "text-teal-400 bg-teal-400/10",
            },
            {
              icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              label: "Encrypted Transactions",
              sub: "Your card details are never stored",
              color: "text-indigo-400 bg-indigo-400/10",
            },
            {
              icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
              label: "Easy Returns",
              sub: "7-day no questions asked returns",
              color: "text-amber-400 bg-amber-400/10",
            },
          ].map(({ icon, label, sub, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}
              >
                <Icon d={icon} className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-200 text-xs font-semibold">{label}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment network logos */}
        <div className="border-t border-white/[.06] mt-4 pt-4 flex items-center gap-2 flex-wrap">
          {["VISA", "MC", "RuPay", "UPI", "GPay", "Paytm"].map((n) => (
            <span
              key={n}
              className="mono text-[9px] font-bold border border-white/10 text-slate-500 px-2 py-1 rounded-md bg-white/[.03]"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SPINNER ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="4"
      />
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────
function SuccessScreen({ onReset }) {
  return (
    <div className="fixed inset-0 bg-[#060e17]/95 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div className="bg-[#0d1b2a] border border-white/[.1] rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl fade-in">
        <div className="success-ring w-24 h-24 bg-teal-400/10 border-2 border-teal-400/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-900/60">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-slate-400 text-sm mb-1">
          Your order has been confirmed.
        </p>
        <p className="text-slate-500 text-xs mb-6">
          Expected delivery in{" "}
          <span className="text-teal-400 font-semibold">15–25 minutes</span>
        </p>
        <div className="bg-white/[.04] border border-white/[.08] rounded-2xl px-5 py-3 mb-6">
          <p className="text-slate-500 text-xs">Order ID</p>
          <p className="mono text-white font-bold text-sm mt-0.5">
            #ORD-{Math.floor(Math.random() * 9000000 + 1000000)}
          </p>
        </div>
        <button
          onClick={onReset}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

// ─── PAYMENT PAGE ─────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const subTotal = ORDER.items.reduce((s, i) => s + i.price * i.qty, 0);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2200);
  };

  return (
    <div className="pay-root min-h-screen bg-[#060e17]">
      <G />
      {success && <SuccessScreen onReset={() => setSuccess(false)} />}

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-[.06]"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent)",
          }}
        />
        <div
          className="absolute top-1/2 -right-32 w-80 h-80 rounded-full opacity-[.04]"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent)",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
              <Icon
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                className="w-4 h-4 text-teal-400"
              />
            </div>
            <h1 className="text-white font-black text-2xl">Complete Payment</h1>
          </div>
          <div className="flex items-center gap-2 ml-11">
            <p className="text-slate-500 text-sm">Order</p>
            <span className="mono text-slate-400 text-xs bg-white/[.04] border border-white/[.07] px-2 py-0.5 rounded-md">
              {ORDER.id}
            </span>
            <span className="text-slate-600">·</span>
            <LockBadge />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT 60% */}
          <div className="w-full lg:flex-[6] min-w-0">
            <PaymentMethods
              amount={subTotal}
              onPay={handlePay}
              loading={loading}
            />
          </div>
          {/* RIGHT 40% */}
          <div className="w-full lg:flex-[4] lg:sticky lg:top-6">
            <OrderSummary items={ORDER.items} delivery={ORDER.delivery} />
          </div>
        </div>
      </div>

      {/* Mobile sticky */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0d1b2a]/95 backdrop-blur-md border-t border-white/[.08] px-4 py-3 z-40">
        <button
          onClick={handlePay}
          disabled={loading}
          className="pay-btn w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[.98] transition-all"
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Icon
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                className="w-4 h-4"
              />
              Pay {fmt(subTotal)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
