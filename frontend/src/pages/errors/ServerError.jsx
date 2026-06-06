import React from "react";
import { Link } from "react-router-dom";
import { ServerCrash, RefreshCw, Home, MessageSquareWarning } from "lucide-react";

export default function ServerError() {
  const errorId = `ERR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100">
        
        {/* Banner Section */}
        <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-rose-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-rose-500/20 backdrop-blur-md rounded-2xl border border-rose-500/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(244,63,94,0.3)]">
              <ServerCrash size={40} className="text-rose-400" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              Internal Server Error
            </h1>
            <p className="text-slate-400 font-medium">HTTP 500</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 sm:p-14 bg-white text-center flex flex-col items-center">
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md mb-8">
            We encountered an unexpected issue on our end. Our engineering team has been automatically notified and is looking into it.
          </p>

          <div className="w-full max-w-xs bg-slate-50 border border-slate-200 rounded-xl p-4 mb-10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Error ID</span>
            <span className="text-xs font-mono font-bold text-slate-700">{errorId}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-rose-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <RefreshCw size={16} />
              Retry Now
            </button>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <Home size={16} />
              Return Home
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 w-full flex justify-center">
            <button className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
              <MessageSquareWarning size={14} /> Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
