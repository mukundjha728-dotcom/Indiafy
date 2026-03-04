import { useState } from "react";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    icon: "🏠",
    name: "Marcus J. Holloway",
    phone: "+1 (917) 555-0192",
    street: "142 Elmwood Avenue",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    country: "United States",
    default: true,
  },
  {
    id: 2,
    label: "Office",
    icon: "💼",
    name: "Marcus J. Holloway",
    phone: "+1 (212) 555-4110",
    street: "350 Fifth Avenue, Suite 4110",
    city: "New York",
    state: "NY",
    zip: "10118",
    country: "United States",
    default: false,
  },
  {
    id: 3,
    label: "Parents",
    icon: "🏡",
    name: "Eleanor Holloway",
    phone: "+1 (631) 555-7823",
    street: "88 Sycamore Lane",
    city: "Huntington",
    state: "NY",
    zip: "11743",
    country: "United States",
    default: false,
  },
];

const emptyForm = {
  label: "",
  icon: "📍",
  name: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  default: false,
};

const labelIcons = ["🏠", "💼", "🏡", "🏖️", "🏋️", "📍"];

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,15,20,0.55)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: "modalIn 0.28s cubic-bezier(.22,1,.36,1) both" }}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <h3
            className="font-bold text-slate-800"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
        <div className="px-7 py-6">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300
          focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all bg-slate-50"
      />
    </div>
  );
}

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'delete'
  const [form, setForm] = useState(emptyForm);
  const [targetId, setTargetId] = useState(null);

  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };
  const openEdit = (addr) => {
    setForm({ ...addr });
    setTargetId(addr.id);
    setModal("edit");
  };
  const openDelete = (id) => {
    setTargetId(id);
    setModal("delete");
  };
  const closeModal = () => {
    setModal(null);
    setTargetId(null);
  };

  const handleSave = () => {
    if (!form.name || !form.street) return;
    if (modal === "add") {
      const newAddr = { ...form, id: Date.now() };
      if (newAddr.default) {
        setAddresses([
          ...addresses.map((a) => ({ ...a, default: false })),
          newAddr,
        ]);
      } else {
        setAddresses([...addresses, newAddr]);
      }
    } else {
      setAddresses(
        addresses.map((a) => {
          if (form.default && a.id !== targetId)
            return { ...a, default: false };
          if (a.id === targetId) return { ...form, id: targetId };
          return a;
        }),
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    setAddresses(addresses.filter((a) => a.id !== targetId));
    closeModal();
  };

  const setDefault = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, default: a.id === id })));
  };

  const f = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
        body, * { font-family: 'Nunito', sans-serif; }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-in { animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both; }
        .card-in:nth-child(1) { animation-delay: 0.05s; }
        .card-in:nth-child(2) { animation-delay: 0.12s; }
        .card-in:nth-child(3) { animation-delay: 0.19s; }
        .card-in:nth-child(4) { animation-delay: 0.26s; }
        .card-in:nth-child(5) { animation-delay: 0.33s; }
        .btn-action { transition: all 0.15s ease; }
        .btn-action:hover { transform: translateY(-1px); }
      `}</style>

      <div
        className="min-h-screen py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f5f0ff 100%)",
        }}
      >
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-1">
                My Account
              </p>
              <h1
                className="text-4xl text-slate-900 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Saved Addresses
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                {addresses.length} address{addresses.length !== 1 ? "es" : ""}{" "}
                saved to your account
              </p>
            </div>
            <button
              onClick={openAdd}
              className="btn-action inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3v10M3 8h10"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              Add New Address
            </button>
          </div>
        </div>

        {/* Address Cards Grid */}
        <div className="max-w-4xl mx-auto">
          {addresses.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-slate-400 font-semibold text-lg">
                No saved addresses yet
              </p>
              <p className="text-slate-300 text-sm mt-1">
                Add your first address to get started
              </p>
              <button
                onClick={openAdd}
                className="mt-6 px-8 py-3 rounded-2xl font-bold text-sm text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                }}
              >
                + Add Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="card-in group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  style={{
                    border: addr.default
                      ? "2px solid #6366f1"
                      : "2px solid #f1f5f9",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: addr.default
                        ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                        : "transparent",
                    }}
                  />

                  <div className="p-6">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-sm"
                          style={{
                            background: addr.default
                              ? "linear-gradient(135deg, #eef2ff, #ede9fe)"
                              : "#f8fafc",
                          }}
                        >
                          {addr.icon}
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 text-base">
                            {addr.label}
                          </span>
                          {addr.default && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                              <span className="text-xs font-bold text-indigo-500">
                                Default
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 mb-4" />

                    {/* Address Info */}
                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <circle
                              cx="6.5"
                              cy="5"
                              r="2"
                              stroke="#94a3b8"
                              strokeWidth="1.4"
                            />
                            <path
                              d="M6.5 1C4.015 1 2 3.015 2 5.5c0 3.5 4.5 7 4.5 7s4.5-3.5 4.5-7C11 3.015 8.985 1 6.5 1z"
                              stroke="#94a3b8"
                              strokeWidth="1.4"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {addr.street}
                          </p>
                          <p className="text-xs text-slate-400">
                            {addr.city}, {addr.state} {addr.zip} ·{" "}
                            {addr.country}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <path
                              d="M2 3a1 1 0 011-1h1.5l1 2.5L4 5.5a8 8 0 003.5 3.5l1-1.5L11 8.5V10a1 1 0 01-1 1C5 11 2 6 2 3z"
                              stroke="#94a3b8"
                              strokeWidth="1.3"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-600">{addr.phone}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <circle
                              cx="6.5"
                              cy="4.5"
                              r="2.5"
                              stroke="#94a3b8"
                              strokeWidth="1.3"
                            />
                            <path
                              d="M1.5 11.5c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5"
                              stroke="#94a3b8"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-slate-700">
                          {addr.name}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => openEdit(addr)}
                        className="btn-action flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M7.5 1.5l2 2L3 10H1V8L7.5 1.5z"
                            stroke="#6366f1"
                            strokeWidth="1.3"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Edit
                      </button>

                      <button
                        onClick={() => openDelete(addr.id)}
                        className="btn-action flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 transition-colors"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M2 3h7M4.5 3V2h2v1M4 3l.5 6M7 3l-.5 6"
                            stroke="#f43f5e"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Delete
                      </button>

                      {!addr.default && (
                        <button
                          onClick={() => setDefault(addr.id)}
                          className="btn-action flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors ml-auto"
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <path
                              d="M2 6l3 3 4-5"
                              stroke="#10b981"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Card (ghost) */}
              <div
                onClick={openAdd}
                className="card-in cursor-pointer rounded-3xl border-2 border-dashed border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/40 flex flex-col items-center justify-center py-14 gap-3 transition-all duration-200 group"
                style={{ minHeight: "240px" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="group-hover:stroke-indigo-400 transition-colors"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-400 group-hover:text-indigo-500 transition-colors text-sm">
                    Add New Address
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Click to add a location
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <Modal
          title={modal === "add" ? "Add New Address" : "Edit Address"}
          onClose={closeModal}
        >
          <div className="space-y-4">
            {/* Icon picker */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                Label Icon
              </label>
              <div className="flex gap-2">
                {labelIcons.map((ic) => (
                  <button
                    key={ic}
                    onClick={() => setForm({ ...form, icon: ic })}
                    className={`w-9 h-9 rounded-xl text-lg transition-all border-2 ${form.icon === ic ? "border-indigo-400 bg-indigo-50 scale-110" : "border-slate-100 hover:border-slate-200 bg-slate-50"}`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Label"
                value={form.label}
                onChange={f("label")}
                placeholder="e.g. Home"
              />
              <FormField
                label="Full Name"
                value={form.name}
                onChange={f("name")}
                placeholder="Recipient name"
              />
            </div>
            <FormField
              label="Phone Number"
              value={form.phone}
              onChange={f("phone")}
              placeholder="+1 (555) 000-0000"
              type="tel"
            />
            <FormField
              label="Street Address"
              value={form.street}
              onChange={f("street")}
              placeholder="Street, apt, suite…"
            />
            <div className="grid grid-cols-3 gap-3">
              <FormField
                label="City"
                value={form.city}
                onChange={f("city")}
                placeholder="City"
              />
              <FormField
                label="State"
                value={form.state}
                onChange={f("state")}
                placeholder="NY"
              />
              <FormField
                label="ZIP"
                value={form.zip}
                onChange={f("zip")}
                placeholder="00000"
              />
            </div>
            <FormField
              label="Country"
              value={form.country}
              onChange={f("country")}
              placeholder="Country"
            />

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.default}
                onChange={(e) =>
                  setForm({ ...form, default: e.target.checked })
                }
                className="w-4 h-4 accent-indigo-500 rounded"
              />
              <span className="text-sm font-semibold text-slate-600">
                Set as default address
              </span>
            </label>

            <div className="flex gap-3 pt-1">
              <button
                onClick={closeModal}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                }}
              >
                {modal === "add" ? "Add Address" : "Save Changes"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {modal === "delete" && (
        <Modal title="Delete Address" onClose={closeModal}>
          <div className="text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-3xl mx-auto mb-4">
              🗑️
            </div>
            <p className="text-slate-700 font-semibold mb-1">
              Remove this address?
            </p>
            <p className="text-slate-400 text-sm mb-6">
              This action cannot be undone. The address will be permanently
              removed from your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-sm font-bold text-white transition-colors shadow-lg shadow-rose-100"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
