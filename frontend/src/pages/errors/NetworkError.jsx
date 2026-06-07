import React, { useState, useEffect } from "react";
import { WifiOff, RefreshCw, Activity, ArrowRight } from "lucide-react";

import axiosInstance from "../../utils/axiosInstance";

export default function NetworkError() {
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const checkBackend = async () => {
      if (!navigator.onLine) {
        setIsOnline(false);
        return;
      }
      try {
        await axiosInstance.get('/health');
        setIsOnline(true);
      } catch (err) {
        setIsOnline(false);
      }
    };
    checkBackend();
    
    const handleOnline = () => checkBackend();
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    setIsChecking(true);
    if (!navigator.onLine) {
      setIsChecking(false);
      setIsOnline(false);
      return;
    }
    
    try {
      await axiosInstance.get('/health');
      window.location.href = '/';
    } catch (err) {
      setIsOnline(false);
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping opacity-20" />
            <WifiOff size={40} className="text-slate-400" />
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight mb-3">
            Connection Lost
          </h1>
          
          <p className="text-slate-400 font-medium text-sm leading-relaxed mb-10">
            We're unable to connect to our servers. Please check your internet connection and try again.
          </p>

          <div className="w-full bg-slate-900/50 rounded-2xl p-4 mb-8 flex items-center justify-between border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Activity size={18} className={isOnline ? "text-emerald-500" : "text-rose-500"} />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Network Status
              </span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${isOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
          >
            {isChecking ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}
            {isChecking ? "Checking..." : "Retry Connection"}
          </button>
        </div>

      </div>
    </div>
  );
}
