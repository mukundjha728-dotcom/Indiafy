import { useState } from "react";

const avatar =
  "https://api.dicebear.com/7.x/notionists/svg?seed=felix&backgroundColor=b6e3f4";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    icon: "🏠",
    line1: "142 Elmwood Avenue",
    line2: "Brooklyn, NY 11201",
    country: "United States",
    default: true,
  },
  {
    id: 2,
    label: "Office",
    icon: "💼",
    line1: "350 Fifth Avenue, Suite 4110",
    line2: "New York, NY 10118",
    country: "United States",
    default: false,
  },
];

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "09/27",
    icon: "💳",
    color: "#1a1f71",
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8891",
    expiry: "03/26",
    icon: "💳",
    color: "#eb001b",
  },
  {
    id: 3,
    type: "PayPal",
    last4: null,
    expiry: null,
    icon: "🅿️",
    color: "#003087",
  },
];

function Badge({ children, color = "bg-emerald-100 text-emerald-700" }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {children}
    </span>
  );
}

function SectionTitle({ label, action, onAction }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-sm font-bold tracking-widest uppercase text-stone-400">
        {label}
      </h2>
      {action && (
        <button
          onClick={onAction}
          className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
        >
          {action}
        </button>
      )}
    </div>
  );
}

function EditModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h3 className="font-bold text-stone-800 text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xl font-bold transition-colors"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function CustomerProfile() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [activePayment, setActivePayment] = useState(1);
  const [editModal, setEditModal] = useState(null); // null | 'user' | 'address-{id}' | 'add-address' | 'password'
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [user, setUser] = useState({
    name: "Marcus J. Holloway",
    phone: "+1 (917) 555-0192",
    email: "marcus.holloway@email.com",
    role: "Premium Member",
  });

  const [editUser, setEditUser] = useState(user);
  const [editAddr, setEditAddr] = useState(null);
  const [newAddr, setNewAddr] = useState({
    label: "",
    line1: "",
    line2: "",
    country: "",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h1, .serif { font-family: 'DM Serif Display', serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out both; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .card-anim { animation: slideUp 0.4s ease-out both; }
        .card-anim:nth-child(1) { animation-delay: 0.05s; }
        .card-anim:nth-child(2) { animation-delay: 0.1s; }
        .card-anim:nth-child(3) { animation-delay: 0.15s; }
        .card-anim:nth-child(4) { animation-delay: 0.2s; }
      `}</style>

      <div
        className="min-h-screen bg-stone-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, #fef3c7 0%, transparent 40%), radial-gradient(circle at 80% 80%, #e0f2fe 0%, transparent 40%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Top Profile Banner */}
          <div className="card-anim bg-white rounded-3xl shadow-sm border border-stone-100 p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-sky-100 ring-4 ring-amber-100 shadow-md">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-1 -right-1 bg-emerald-400 rounded-full w-4 h-4 border-2 border-white"
                title="Online"
              ></span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-1">
                {user.role}
              </p>
              <h1 className="text-3xl text-stone-900 leading-tight">
                {user.name}
              </h1>
              <p className="text-stone-400 text-sm mt-1">{user.email}</p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <Badge>✦ Loyalty Points: 2,480</Badge>
              <Badge color="bg-sky-100 text-sky-700">Member since 2021</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* User Information */}
              <div className="card-anim bg-white rounded-3xl shadow-sm border border-stone-100 p-6">
                <SectionTitle
                  label="User Information"
                  action="Edit"
                  onAction={() => {
                    setEditUser(user);
                    setEditModal("user");
                  }}
                />
                <div className="space-y-4">
                  {[
                    { icon: "👤", label: "Full Name", value: user.name },
                    { icon: "📱", label: "Phone", value: user.phone },
                    { icon: "✉️", label: "Email", value: user.email },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-xs text-stone-400 font-medium">
                          {item.label}
                        </p>
                        <p className="text-sm text-stone-800 font-semibold mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Settings */}
              <div className="card-anim bg-white rounded-3xl shadow-sm border border-stone-100 p-6">
                <SectionTitle label="Account Settings" />
                <div className="space-y-2">
                  <button
                    onClick={() => setEditModal("password")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all text-sm font-semibold text-stone-700"
                  >
                    <span className="text-base">🔐</span> Change Password
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 hover:bg-red-50 hover:border-red-200 border border-transparent transition-all text-sm font-semibold text-red-500"
                  >
                    <span className="text-base">🚪</span> Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Saved Addresses */}
              <div className="card-anim bg-white rounded-3xl shadow-sm border border-stone-100 p-6">
                <SectionTitle
                  label="Saved Addresses"
                  action="+ Add New"
                  onAction={() => {
                    setNewAddr({
                      label: "",
                      line1: "",
                      line2: "",
                      country: "",
                    });
                    setEditModal("add-address");
                  }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`relative rounded-2xl border-2 p-4 transition-all ${addr.default ? "border-amber-300 bg-amber-50" : "border-stone-100 bg-stone-50 hover:border-stone-200"}`}
                    >
                      {addr.default && (
                        <span className="absolute top-3 right-3 text-xs font-bold bg-amber-400 text-white px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{addr.icon}</span>
                        <span className="font-bold text-stone-700 text-sm">
                          {addr.label}
                        </span>
                      </div>
                      <p className="text-sm text-stone-600">{addr.line1}</p>
                      <p className="text-sm text-stone-500">{addr.line2}</p>
                      <p className="text-xs text-stone-400 mt-1">
                        {addr.country}
                      </p>
                      <button
                        onClick={() => {
                          setEditAddr({ ...addr });
                          setEditModal(`address-${addr.id}`);
                        }}
                        className="mt-3 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        Edit address →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Preferences */}
              <div className="card-anim bg-white rounded-3xl shadow-sm border border-stone-100 p-6">
                <SectionTitle
                  label="Payment Preferences"
                  action="Manage"
                  onAction={() => {}}
                />
                <div className="space-y-3">
                  {paymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      onClick={() => setActivePayment(pm.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${activePayment === pm.id ? "border-amber-300 bg-amber-50" : "border-stone-100 hover:border-stone-200 bg-stone-50"}`}
                    >
                      <div className="w-12 h-8 rounded-lg flex items-center justify-center text-xl shadow-sm bg-white border border-stone-100">
                        {pm.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-stone-800">
                          {pm.type}
                          {pm.last4 ? ` •••• ${pm.last4}` : ""}
                        </p>
                        {pm.expiry && (
                          <p className="text-xs text-stone-400">
                            Expires {pm.expiry}
                          </p>
                        )}
                        {!pm.expiry && (
                          <p className="text-xs text-stone-400">
                            Linked account
                          </p>
                        )}
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${activePayment === pm.id ? "border-amber-400 bg-amber-400" : "border-stone-300"}`}
                      >
                        {activePayment === pm.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full py-3 rounded-2xl border-2 border-dashed border-stone-200 text-sm font-semibold text-stone-400 hover:border-amber-300 hover:text-amber-500 transition-all">
                  + Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editModal === "user" && (
        <EditModal
          title="Edit User Information"
          onClose={() => setEditModal(null)}
        >
          <div className="space-y-3">
            {[
              { label: "Full Name", field: "name", type: "text" },
              { label: "Phone", field: "phone", type: "tel" },
              { label: "Email", field: "email", type: "email" },
            ].map(({ label, field, type }) => (
              <div key={field}>
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type={type}
                  value={editUser[field]}
                  onChange={(e) =>
                    setEditUser({ ...editUser, [field]: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-stone-800"
                />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-500 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setUser(editUser);
                  setEditModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-sm font-bold text-white transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </EditModal>
      )}

      {/* Edit Address Modal */}
      {editModal && editModal.startsWith("address-") && editAddr && (
        <EditModal
          title={`Edit ${editAddr.label} Address`}
          onClose={() => setEditModal(null)}
        >
          <div className="space-y-3">
            {[
              { label: "Label", field: "label" },
              { label: "Address Line 1", field: "line1" },
              { label: "Address Line 2", field: "line2" },
              { label: "Country", field: "country" },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type="text"
                  value={editAddr[field]}
                  onChange={(e) =>
                    setEditAddr({ ...editAddr, [field]: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-stone-800"
                />
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="setDefault"
                checked={editAddr.default}
                onChange={(e) =>
                  setEditAddr({ ...editAddr, default: e.target.checked })
                }
                className="accent-amber-400"
              />
              <label htmlFor="setDefault" className="text-sm text-stone-600">
                Set as default address
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-500 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAddresses(
                    addresses.map((a) =>
                      a.id === editAddr.id
                        ? { ...editAddr, default: editAddr.default }
                        : editAddr.default
                          ? { ...a, default: false }
                          : a,
                    ),
                  );
                  setEditModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-sm font-bold text-white transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </EditModal>
      )}

      {/* Add Address Modal */}
      {editModal === "add-address" && (
        <EditModal title="Add New Address" onClose={() => setEditModal(null)}>
          <div className="space-y-3">
            {[
              { label: "Label (e.g. Home)", field: "label" },
              { label: "Address Line 1", field: "line1" },
              { label: "Address Line 2", field: "line2" },
              { label: "Country", field: "country" },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type="text"
                  value={newAddr[field]}
                  onChange={(e) =>
                    setNewAddr({ ...newAddr, [field]: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-stone-800"
                />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-500 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newAddr.line1) return;
                  setAddresses([
                    ...addresses,
                    { ...newAddr, id: Date.now(), icon: "📍", default: false },
                  ]);
                  setEditModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-sm font-bold text-white transition-colors"
              >
                Add Address
              </button>
            </div>
          </div>
        </EditModal>
      )}

      {/* Change Password Modal */}
      {editModal === "password" && (
        <EditModal title="Change Password" onClose={() => setEditModal(null)}>
          <div className="space-y-3">
            {["Current Password", "New Password", "Confirm New Password"].map(
              (label) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    {label}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="mt-1 w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-stone-800"
                  />
                </div>
              ),
            )}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-500 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-sm font-bold text-white transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </EditModal>
      )}

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <EditModal title="Log Out" onClose={() => setShowLogoutConfirm(false)}>
          <p className="text-sm text-stone-500 mb-5">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-500 hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-bold text-white transition-colors"
            >
              Yes, Log Out
            </button>
          </div>
        </EditModal>
      )}
    </>
  );
}
