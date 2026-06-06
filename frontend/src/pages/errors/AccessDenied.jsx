import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, KeySquare } from "lucide-react";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-amber-500 selection:text-white">
      <div className="w-full max-w-lg bg-white p-10 sm:p-14 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-24 h-24 bg-amber-50 border border-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-inner">
          <ShieldAlert size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 relative z-10">
          Access Denied
        </h1>
        
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10 relative z-10">
          You don't have the required permissions to view this page. If you believe this is an error, please contact your administrator.
        </p>

        <div className="flex flex-col gap-3 w-full relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <KeySquare size={16} />
            Login with different account
          </button>
        </div>
      </div>
    </div>
  );
}
