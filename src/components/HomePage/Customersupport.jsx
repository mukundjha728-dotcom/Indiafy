import { useState } from "react";

/* ─── DATA ──────────────────────────────────────────────── */
const supportChannels = [
  {
    id: "chat",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M4 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H9l-5 4V5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 9h10M8 13h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Live Chat",
    desc: "Instant replies, avg 2 min",
    badge: "Online",
    badgeColor: "bg-emerald-400",
    action: "Start Chat",
    accent: "#0ea5e9",
    bg: "from-sky-50 to-cyan-50",
    border: "border-sky-200",
  },
  {
    id: "call",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M5 5a2 2 0 012-2h2.5l2 5-2.5 1.5a11 11 0 005.5 5.5L16 12.5l5 2V17a2 2 0 01-2 2C9 19 5 11 5 7V5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Call Support",
    desc: "Mon–Fri, 9 AM – 6 PM EST",
    badge: "Available",
    badgeColor: "bg-violet-400",
    action: "Call Now",
    accent: "#7c3aed",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
  },
  {
    id: "whatsapp",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle
          cx="13"
          cy="13"
          r="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8.5 9.5C9 8.5 10 8 11 8.5l1 2-1.5 1a6 6 0 003 3l1-1.5 2 1c.5 1 0 2-1 2.5C12 18 7.5 13.5 8.5 9.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "WhatsApp",
    desc: "Send us a message anytime",
    badge: "24/7",
    badgeColor: "bg-teal-400",
    action: "Message Us",
    accent: "#0d9488",
    bg: "from-teal-50 to-emerald-50",
    border: "border-teal-200",
  },
];

const issueCategories = [
  {
    id: "order",
    emoji: "📦",
    label: "Order Issue",
    desc: "Wrong item, missing order, cancellation",
    color: "text-orange-500",
    ring: "ring-orange-300",
    bg: "bg-orange-50 hover:bg-orange-100",
    selected: "bg-orange-500 text-white",
  },
  {
    id: "payment",
    emoji: "💳",
    label: "Payment Issue",
    desc: "Failed charge, double billing, receipts",
    color: "text-blue-500",
    ring: "ring-blue-300",
    bg: "bg-blue-50 hover:bg-blue-100",
    selected: "bg-blue-500 text-white",
  },
  {
    id: "delivery",
    emoji: "🚚",
    label: "Delivery Issue",
    desc: "Delayed, lost in transit, wrong address",
    color: "text-violet-500",
    ring: "ring-violet-300",
    bg: "bg-violet-50 hover:bg-violet-100",
    selected: "bg-violet-500 text-white",
  },
  {
    id: "refund",
    emoji: "↩️",
    label: "Refund Issue",
    desc: "Refund status, return request, credits",
    color: "text-teal-500",
    ring: "ring-teal-300",
    bg: "bg-teal-50 hover:bg-teal-100",
    selected: "bg-teal-500 text-white",
  },
];

const issueTypeOptions = [
  "Order Issue",
  "Payment Issue",
  "Delivery Issue",
  "Refund Issue",
  "Account Issue",
  "Other",
];

/* ─── COMPONENTS ─────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-400 mb-4">
      {children}
    </p>
  );
}

function Toast({ onClose }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-white shadow-2xl"
      style={{ animation: "toastIn 0.35s cubic-bezier(.22,1,.36,1) both" }}
    >
      <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-slate-900 font-black text-lg">
        ✓
      </div>
      <div>
        <p className="font-bold text-sm">Ticket Submitted!</p>
        <p className="text-slate-400 text-xs">We'll respond within 24 hours.</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-slate-500 hover:text-white transition-colors text-lg font-bold"
      >
        ×
      </button>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function CustomerSupport() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const [form, setForm] = useState({
    orderId: "",
    issueType: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const f = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (field === "description") setCharCount(e.target.value.length);
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    const e = {};
    if (!form.orderId.trim()) e.orderId = "Order ID is required";
    if (!form.issueType) e.issueType = "Please select an issue type";
    if (form.description.trim().length < 15)
      e.description = "Description must be at least 15 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
    setForm({ orderId: "", issueType: "", description: "" });
    setCharCount(0);
    setSelectedCategory(null);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        *, body { font-family: 'Sora', sans-serif; }
        .display { font-family: 'Lora', serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .anim { animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        .anim-1 { animation-delay: 0.05s; }
        .anim-2 { animation-delay: 0.12s; }
        .anim-3 { animation-delay: 0.19s; }
        .anim-4 { animation-delay: 0.26s; }
        .channel-card:hover .channel-arrow { transform: translateX(4px); }
        .channel-arrow { transition: transform 0.2s ease; }
        input:focus, select:focus, textarea:focus { outline: none; }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-white py-14 px-4 relative overflow-hidden">
        {/* Background glow blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* ── Hero ─────────────────────────────── */}
          <div className="anim anim-1 text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-400 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Support Center · All systems operational
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold text-white leading-tight mb-4">
              How can we <span className="italic text-sky-400">help you?</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Our team is ready to resolve your issue quickly. Choose a channel
              or submit a ticket below.
            </p>
          </div>

          {/* ── Support Channels ─────────────────── */}
          <div className="anim anim-2 mb-14">
            <SectionLabel>Reach Us Instantly</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {supportChannels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() =>
                    setActiveChannel(activeChannel === ch.id ? null : ch.id)
                  }
                  className={`channel-card text-left rounded-2xl border p-5 transition-all duration-200 ${
                    activeChannel === ch.id
                      ? `bg-gradient-to-br ${ch.bg} border-transparent ring-2 ring-offset-1 ring-offset-slate-950`
                      : "bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800"
                  }`}
                  style={
                    activeChannel === ch.id
                      ? { "--tw-ring-color": ch.accent }
                      : {}
                  }
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        activeChannel === ch.id
                          ? "text-white"
                          : "text-slate-400 bg-slate-800"
                      }`}
                      style={
                        activeChannel === ch.id ? { background: ch.accent } : {}
                      }
                    >
                      {ch.icon}
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${ch.badgeColor}`}
                    >
                      {ch.badge}
                    </span>
                  </div>
                  <h3
                    className={`font-bold text-base mb-1 transition-colors ${activeChannel === ch.id ? "text-slate-900" : "text-white"}`}
                  >
                    {ch.label}
                  </h3>
                  <p
                    className={`text-xs mb-4 transition-colors ${activeChannel === ch.id ? "text-slate-600" : "text-slate-500"}`}
                  >
                    {ch.desc}
                  </p>
                  <div
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${activeChannel === ch.id ? "text-slate-800" : "text-slate-400"}`}
                  >
                    {ch.action}
                    <span className="channel-arrow">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Issue Categories ──────────────────── */}
          <div className="anim anim-3 mb-14">
            <SectionLabel>Browse by Issue Type</SectionLabel>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {issueCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(isSelected ? null : cat.id);
                      if (!isSelected)
                        setForm({ ...form, issueType: cat.label });
                    }}
                    className={`group rounded-2xl p-5 text-left border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-transparent shadow-lg scale-[1.02] " +
                          cat.selected
                        : "bg-slate-900 border-slate-800 hover:border-slate-600"
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{cat.emoji}</span>
                    <p
                      className={`font-bold text-sm mb-1 ${isSelected ? "text-white" : "text-white"}`}
                    >
                      {cat.label}
                    </p>
                    <p
                      className={`text-xs leading-relaxed ${isSelected ? "text-white/70" : "text-slate-500"}`}
                    >
                      {cat.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Ticket Form ───────────────────────── */}
          <div className="anim anim-4">
            <SectionLabel>Submit a Support Ticket</SectionLabel>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              {/* Form header strip */}
              <div className="px-8 py-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect
                        x="2"
                        y="2"
                        width="14"
                        height="14"
                        rx="3"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 6h8M5 9h8M5 12h5"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">
                      New Support Ticket
                    </p>
                    <p className="text-slate-500 text-xs">
                      Avg. response time: under 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {["bg-red-500", "bg-yellow-400", "bg-green-400"].map((c) => (
                    <div
                      key={c}
                      className={`w-2.5 h-2.5 rounded-full ${c} opacity-60`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Order ID */}
                <div>
                  <label className="block text-xs font-black tracking-widest uppercase text-slate-400 mb-2">
                    Order ID <span className="text-sky-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-mono">
                      #
                    </span>
                    <input
                      type="text"
                      value={form.orderId}
                      onChange={f("orderId")}
                      placeholder="e.g. 928471"
                      className={`w-full pl-8 pr-4 py-3.5 rounded-xl bg-slate-800 border text-sm text-white placeholder-slate-600 transition-all
                        focus:ring-2 focus:ring-sky-500 focus:border-transparent
                        ${errors.orderId ? "border-rose-500" : "border-slate-700 hover:border-slate-600"}`}
                    />
                  </div>
                  {errors.orderId && (
                    <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span>
                      {errors.orderId}
                    </p>
                  )}
                </div>

                {/* Issue Type */}
                <div>
                  <label className="block text-xs font-black tracking-widest uppercase text-slate-400 mb-2">
                    Issue Type <span className="text-sky-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.issueType}
                      onChange={f("issueType")}
                      className={`w-full px-4 py-3.5 rounded-xl bg-slate-800 border text-sm text-white transition-all appearance-none cursor-pointer
                        focus:ring-2 focus:ring-sky-500 focus:border-transparent
                        ${errors.issueType ? "border-rose-500" : "border-slate-700 hover:border-slate-600"}
                        ${!form.issueType ? "text-slate-500" : ""}`}
                    >
                      <option value="" disabled>
                        Select issue type…
                      </option>
                      {issueTypeOptions.map((o) => (
                        <option
                          key={o}
                          value={o}
                          className="bg-slate-800 text-white"
                        >
                          {o}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 5l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {errors.issueType && (
                    <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span>
                      {errors.issueType}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black tracking-widest uppercase text-slate-400">
                      Description <span className="text-sky-400">*</span>
                    </label>
                    <span
                      className={`text-xs font-mono transition-colors ${charCount > 450 ? "text-rose-400" : "text-slate-600"}`}
                    >
                      {charCount}/500
                    </span>
                  </div>
                  <textarea
                    value={form.description}
                    onChange={f("description")}
                    maxLength={500}
                    rows={5}
                    placeholder="Please describe your issue in detail — what happened, when it occurred, and any relevant order information…"
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-800 border text-sm text-white placeholder-slate-600 resize-none transition-all leading-relaxed
                      focus:ring-2 focus:ring-sky-500 focus:border-transparent
                      ${errors.description ? "border-rose-500" : "border-slate-700 hover:border-slate-600"}`}
                  />
                  {errors.description && (
                    <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span>
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Info strip */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-950/50 border border-sky-900/50">
                  <svg
                    className="text-sky-400 mt-0.5 flex-shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M8 7v5M8 5.5v.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-sky-300 text-xs leading-relaxed">
                    Attaching your order ID helps us resolve your issue faster.
                    You'll receive a confirmation email once your ticket is
                    created.
                  </p>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide text-white transition-all duration-200
                    hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-sky-900/30"
                  style={{
                    background:
                      "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)",
                  }}
                >
                  Submit Ticket →
                </button>
              </div>
            </div>
          </div>

          {/* ── FAQ Strip ─────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            {[
              "Track my order",
              "Return policy",
              "Billing FAQ",
              "Account help",
            ].map((item) => (
              <button
                key={item}
                className="hover:text-sky-400 transition-colors font-medium flex items-center gap-1.5"
              >
                <span>→</span> {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {submitted && <Toast onClose={() => setSubmitted(false)} />}
    </>
  );
}
