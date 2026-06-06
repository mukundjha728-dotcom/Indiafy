import React from "react";
import { useNavigate } from "react-router-dom";
import { Timer, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useSellerAuthStore } from "../../store/sellerAuthStore";

export default function SessionExpired() {
  const navigate = useNavigate();
  const { logout: logoutCustomer } = useAuthStore();
  const { logout: logoutSeller } = useSellerAuthStore();

  const handleReLogin = async () => {
    // Clear all stores to be safe
    await Promise.allSettled([logoutCustomer(), logoutSeller()]);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md bg-white p-10 sm:p-14 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-24 h-24 bg-blue-50 border border-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-inner">
          <Timer size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3 relative z-10">
          Session Expired
        </h1>
        
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 relative z-10">
          For your security, your session has been automatically timed out due to inactivity. Please log in again to continue.
        </p>

        <div className="flex items-center gap-2 mb-10 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 relative z-10">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Data Secured</span>
        </div>

        <button
          onClick={handleReLogin}
          className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] relative z-10"
        >
          Sign In Again <ArrowRight size={16} />
        </button>
        
      </div>
    </div>
  );
}
