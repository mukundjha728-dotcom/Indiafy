import React from "react";
import { Wrench, Clock, Twitter, Mail } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-[3rem] p-10 sm:p-16 text-center relative z-10 shadow-2xl flex flex-col items-center">
        
        <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-3xl flex items-center justify-center mb-8 rotate-12 hover:rotate-0 transition-transform duration-500 shadow-inner">
          <Wrench size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Under Maintenance
        </h1>
        
        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md mb-10">
          We are currently upgrading our platform to serve you better. We expect to be back online shortly. Thank you for your patience!
        </p>

        <div className="flex items-center gap-6 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-2 shadow-inner">0</div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hours</span>
          </div>
          <div className="text-2xl font-black text-slate-600 pb-6">:</div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-2 shadow-inner">45</div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Minutes</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
            <Clock size={16} /> Notify Me
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700/50 w-full flex justify-center gap-6">
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Mail size={20} /></a>
        </div>

      </div>
    </div>
  );
}
