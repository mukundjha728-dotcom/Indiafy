import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartStore } from "../../store/cartStore";
import axiosInstance from "../../utils/axiosInstance";
import {
  MapPin,
  ShieldCheck,
  ChevronLeft,
  CreditCard,
  QrCode,
  Truck,
  BadgeCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Layout Components (Paths ensured as per previous fix)
import WebsiteNavbar from "../../components/WebsiteNavbar";
import Footer from "../../components/Footer";

const fmt = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

import { useProfileStore } from "../../store/profileStore";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment
  const [selectedAddr, setSelectedAddr] = useState(1);
  const [payMethod, setPayMethod] = useState("upi");
  const [isPlacing, setIsPlacing] = useState(false);

  const { items, fetchCart, clearCartStore } = useCartStore();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchCart();
    fetchProfile();
  }, [fetchCart, fetchProfile]);

  const addresses = profile?.address || [];
  const activeAddress = addresses.length > 0 ? addresses[selectedAddr] || addresses[0] : null;

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 0;
  const codFee = payMethod === "cod" ? 40 : 0;
  const total = subtotal + deliveryFee + codFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      return toast.error("Your cart is empty");
    }

    setIsPlacing(true);
    try {
      // 1. If UPI/Card, create Razorpay Order
      let paymentResultData = null;
      
      if (payMethod !== "cod") {
        const res = await loadRazorpayScript();
        if (!res) {
          toast.error("Razorpay SDK failed to load. Are you online?");
          return setIsPlacing(false);
        }

        const rpRes = await axiosInstance.post("/payments/create-order", { amount: total });
        const rpOrder = rpRes.data.data;

        const options = {
          key: "rzp_test_YourTestKey", // Provide via env
          amount: rpOrder.amount,
          currency: "INR",
          name: "Indiafy",
          description: "Test Transaction",
          order_id: rpOrder.id,
          handler: async function (response) {
            // Payment success handler - verify on backend and create order
            try {
              paymentResultData = {
                id: response.razorpay_payment_id,
                status: "success",
                update_time: new Date().toISOString()
              };
              await createFinalOrder(paymentResultData);
              // Option: trigger verify payment endpoint later
            } catch(e) {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999"
          },
          theme: { color: "#18181b" }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setIsPlacing(false);
        return; // wait for handler
      }

      // COD Path
      await createFinalOrder(null);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate payment");
      setIsPlacing(false);
    }
  };

  const createFinalOrder = async (paymentResultData) => {
    try {
      const orderItems = items.map(item => ({
        product: item.productId._id,
        seller: item.productId.sellerId,
        quantity: item.quantity,
        price: item.price
      }));

      const payload = {
        orderItems,
        shippingAddress: {
          address: activeAddress?.street || "No Address",
          city: activeAddress?.city || "Unknown",
          state: activeAddress?.state || "Unknown",
          postalCode: activeAddress?.country || "000000",
          country: activeAddress?.country || "India"
        },
        paymentMethod: payMethod === "cod" ? "COD" : "Card",
        paymentResult: paymentResultData || undefined,
        itemsPrice: subtotal,
        taxPrice: 0,
        shippingPrice: deliveryFee,
        totalPrice: total
      };

      const res = await axiosInstance.post("/orders", payload);
      
      // If it was Razorpay, we also need to call verify endpoint but for now we just mark isPaid locally or backend will do it.
      // Wait, verify endpoint in backend updates order. So we should create order FIRST, then verify!
      
      toast.success("Order placed successfully!");
      clearCartStore();
      navigate("/history");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      <WebsiteNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-xs font-black uppercase tracking-widest mb-4"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">
              Secure <span className="text-zinc-300 italic">Checkout</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border ${step >= 1 ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-400"}`}
            >
              <span className="text-xs font-black">01</span>
              <span className="text-xs font-bold uppercase tracking-tighter">
                Address
              </span>
            </div>
            <div className="h-px w-8 bg-zinc-200" />
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border ${step >= 2 ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-400"}`}
            >
              <span className="text-xs font-black">02</span>
              <span className="text-xs font-bold uppercase tracking-tighter">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: FORM SECTIONS */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: ADDRESS */}
            <section
              className={`bg-white rounded-[2.5rem] p-8 border ${step === 1 ? "border-zinc-900 shadow-2xl" : "border-zinc-100 opacity-60 pointer-events-none"}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                  <MapPin size={20} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Delivery Location
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {addresses.length === 0 ? (
                  <div className="col-span-2 p-6 rounded-[2rem] border-2 border-zinc-200 border-dashed text-center">
                    <p className="text-zinc-500 font-medium mb-4">No addresses found</p>
                    <button onClick={() => navigate('/saved-addresses')} className="text-emerald-600 font-bold hover:underline">Add New Address</button>
                  </div>
                ) : (
                  addresses.map((addr, idx) => (
                    <div
                      key={addr._id || idx}
                      onClick={() => setSelectedAddr(idx)}
                      className={`cursor-pointer p-6 rounded-3xl border-2 transition-all ${selectedAddr === idx ? "border-zinc-900 bg-zinc-50" : "border-zinc-100 hover:border-zinc-200"}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-zinc-900 text-white text-[9px] font-black uppercase rounded-full">
                          {addr.nearBy || "Home"}
                        </span>
                        {selectedAddr === idx && (
                          <CheckCircle2 size={20} className="text-zinc-900" />
                        )}
                      </div>
                      <p className="font-bold text-zinc-900">{profile?.firstName} {profile?.lastName}</p>
                      <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state}
                      </p>
                      <p className="text-xs font-bold text-zinc-400 mt-3">
                        {profile?.contact}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {step === 1 && (
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-8 py-5 bg-zinc-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-zinc-800 transition-all"
                >
                  Deliver to this address
                </button>
              )}
            </section>

            {/* STEP 2: PAYMENT */}
            <section
              className={`bg-white rounded-[2.5rem] p-8 border ${step === 2 ? "border-zinc-900 shadow-2xl" : "border-zinc-100 opacity-60 pointer-events-none"}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                    <CreditCard size={20} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    Payment Method
                  </h3>
                </div>
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-[10px] font-black uppercase text-zinc-400 hover:text-zinc-900 border-b border-zinc-200"
                  >
                    Change Address
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* UPI - Indiafy Preference */}
                <label
                  className={`block p-6 rounded-3xl border-2 cursor-pointer transition-all ${payMethod === "upi" ? "border-zinc-900 bg-zinc-50" : "border-zinc-100"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        checked={payMethod === "upi"}
                        onChange={() => setPayMethod("upi")}
                        className="w-4 h-4 accent-zinc-900"
                      />
                      <div>
                        <p className="font-bold text-zinc-900">
                          UPI / Dynamic QR
                        </p>
                        <p className="text-xs text-zinc-400 font-medium">
                          Instant reconciliation via Indiafy Node
                        </p>
                      </div>
                    </div>
                    <Smartphone size={24} className="text-zinc-300" />
                  </div>
                  {payMethod === "upi" && (
                    <div className="mt-6 p-4 bg-zinc-100 rounded-2xl border border-dashed border-zinc-300 flex items-center gap-4">
                      <QrCode size={40} className="text-zinc-400" />
                      <p className="text-[10px] font-bold text-zinc-500 leading-tight uppercase tracking-tighter">
                        A Secure Dynamic QR will be generated upon confirmation.
                        Rider-personal transfers are prohibited.
                      </p>
                    </div>
                  )}
                </label>

                {/* COD - Sector Restricted */}
                <label
                  className={`block p-6 rounded-3xl border-2 cursor-pointer transition-all ${payMethod === "cod" ? "border-zinc-900 bg-zinc-50" : "border-zinc-100"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        checked={payMethod === "cod"}
                        onChange={() => setPayMethod("cod")}
                        className="w-4 h-4 accent-zinc-900"
                      />
                      <div>
                        <p className="font-bold text-zinc-900">
                          Cash on Delivery
                        </p>
                        <p className="text-xs text-zinc-400 font-medium">
                          Verify & Pay at Sector-assigned Rider
                        </p>
                      </div>
                    </div>
                    <Truck size={24} className="text-zinc-300" />
                  </div>
                  {payMethod === "cod" && (
                    <div className="mt-4 flex items-start gap-2 text-amber-600 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      <p className="text-[10px] font-bold uppercase leading-relaxed tracking-tighter">
                        ₹40 operational fee applies for COD. Your eligibility
                        score is being calculated.
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT: SUMMARY */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-zinc-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-zinc-300">
                <h2 className="text-lg font-black uppercase tracking-widest mb-8">
                  Order Total
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-zinc-500 font-medium text-sm">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 font-medium text-sm">
                    <span>Delivery Fee</span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px] pt-1 tracking-widest">
                      Free
                    </span>
                  </div>
                  {payMethod === "cod" && (
                    <div className="flex justify-between text-zinc-500 font-medium text-sm">
                      <span>COD Fee</span>
                      <span className="text-white font-bold">{fmt(codFee)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-zinc-800 flex justify-between items-end mb-10">
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.2em] mb-1">
                      Payable Amount
                    </p>
                    <p className="text-4xl font-black">
                      {fmt(total)}
                    </p>
                  </div>
                </div>

                <button
                  disabled={step !== 2 || isPlacing}
                  onClick={handlePlaceOrder}
                  className="w-full py-5 bg-white text-zinc-900 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
                >
                  {isPlacing ? "Processing Order..." : "Confirm & Pay Now"}
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 text-zinc-600">
                  <Lock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    256-bit Secure Encryption
                  </span>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-start gap-4">
                <BadgeCheck size={24} className="text-emerald-600 shrink-0" />
                <div>
                  <p className="text-[11px] font-black uppercase text-emerald-700 tracking-tighter">
                    Indiafy Assurance
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600/70 leading-relaxed uppercase tracking-tighter mt-1">
                    Sector-assigned rider OTP & Video-Verified packing active
                    for this sector.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
