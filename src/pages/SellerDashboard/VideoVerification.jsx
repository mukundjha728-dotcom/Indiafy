import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoVerification = () => {
  const navigate = useNavigate();
  
  // State for checklist items
  const [items, setItems] = useState([
    { id: 1, name: "Sony WH-1000XM5 Headphones", sku: "WH-XM5-BLK", qty: 1, variant: "Black", image: "https://via.placeholder.com/60", checked: false },
    { id: 2, name: "Braided USB-C Cable (2m)", sku: "CBL-USBC-2M", qty: 2, variant: "Grey", image: "https://via.placeholder.com/60", checked: false },
    { id: 3, name: "Include Return Label & Invoice", sku: "DOC-VERIFY", qty: "Req", variant: "Document", isDoc: true, checked: false },
  ]);

  const [isBatchMode, setIsBatchMode] = useState(false);

  // Toggle Checkbox
  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  // Check if all items are verified
  const allVerified = items.every(item => item.checked);

  return (
    <div className="flex flex-col h-full">
      
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-2 text-sm font-medium"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Orders
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Order Verification</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">#IND-90210</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
          <span className="material-symbols-outlined text-lg">verified_user</span>
          <span className="text-sm font-medium">High-Value Order Protection</span>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Left Panel: Checklist */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          
          {/* Checklist Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Packing Checklist</h2>
              <p className="text-xs text-slate-500 mt-0.5">Verify each item before sealing.</p>
            </div>
            <label className="inline-flex items-center cursor-pointer group">
              <span className="mr-2 text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors uppercase tracking-wider">Batch Mode</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isBatchMode}
                  onChange={() => setIsBatchMode(!isBatchMode)}
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>

          {/* Customer Summary */}
          <div className="px-5 py-4 bg-slate-50 dark:bg-slate-700/20 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Priya Sharma</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-[250px]">
                  12/4, Green Park Extension, New Delhi, 110016
                </p>
              </div>
              <div className="ml-auto text-right">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Courier</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">BlueDart</span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
            {items.map((item) => (
              <label 
                key={item.id}
                className={`group flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer ${
                  item.checked 
                    ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                  />
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    item.checked 
                      ? 'bg-emerald-500 border-emerald-500 scale-110' 
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-500 group-hover:border-primary'
                  }`}>
                    {item.checked && (
                      <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>
                    )}
                  </div>
                </div>
                
                {item.isDoc ? (
                  <div className="w-12 h-12 rounded-lg border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                ) : (
                   <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-bold shrink-0">
                     IMG
                   </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-semibold text-sm truncate pr-2 transition-colors ${
                      item.checked ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {item.name}
                    </h4>
                    <span className="text-sm font-bold text-slate-900 dark:text-white shrink-0">
                      {typeof item.qty === 'number' ? `x${item.qty}` : item.qty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">{item.sku}</span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                      {item.variant}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800">
            <button className="flex items-center text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wide">
              <span className="material-symbols-outlined text-sm mr-2">report_problem</span>
              Report Issue
            </button>
          </div>
        </div>

        {/* Right Panel: Video Recorder */}
        <div className="flex-1 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pb-6">
          
          <div className="bg-slate-900 dark:bg-black rounded-xl shadow-lg border border-slate-700 dark:border-slate-800 overflow-hidden flex flex-col relative group shrink-0">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                <span className="text-xs font-bold text-white tracking-wider uppercase">Standby</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="material-symbols-outlined text-white/70 text-sm">security</span>
                <span className="text-xs text-white/90 font-medium">Encrypted</span>
              </div>
            </div>

            {/* Video Viewport Placeholder */}
            <div className="aspect-video bg-neutral-900 relative flex items-center justify-center overflow-hidden">
               {/* Grid Pattern */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               
               <div className="text-center z-10 p-6">
                 <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                   <span className="material-symbols-outlined text-white/50 text-3xl">videocam_off</span>
                 </div>
                 <h3 className="text-white font-medium text-lg">Ready to Capture</h3>
                 <p className="text-white/50 text-sm mt-2 max-w-xs mx-auto">Ensure the shipping label and all items are clearly visible.</p>
               </div>

               {/* Safe Zone */}
               <div className="absolute inset-8 border-2 border-dashed border-white/10 rounded-lg pointer-events-none flex items-center justify-center">
                 <span className="text-white/10 text-xs font-bold uppercase tracking-[0.2em]">Safe Zone</span>
               </div>
            </div>

            {/* Controls */}
            <div className="bg-[#151b23] p-6 border-t border-slate-700/50">
              <div className="grid grid-cols-2 gap-4">
                <button className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-200 shadow-[0_0_20px_rgba(19,127,236,0.15)] hover:shadow-[0_0_25px_rgba(19,127,236,0.3)]">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-xl">fiber_manual_record</span>
                  </div>
                  <span className="text-white font-bold text-sm">Record Live</span>
                </button>
                <button className="group flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all duration-200">
                  <div className="w-10 h-10 rounded-full bg-slate-700 group-hover:bg-slate-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-slate-300 text-xl">upload_file</span>
                  </div>
                  <span className="text-slate-200 font-bold text-sm">Upload Video</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-6">
            {/* Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3 items-start">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
              <div>
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100">Verification Guidelines</h4>
                <ul className="mt-2 space-y-1.5">
                  <li className="text-xs text-blue-800 dark:text-blue-200 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    Show shipping label clearly for 3 seconds.
                  </li>
                  <li className="text-xs text-blue-800 dark:text-blue-200 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    Ensure tamper-proof seal is applied on camera.
                  </li>
                </ul>
              </div>
            </div>

            {/* Final Action */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mt-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${allVerified ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 dark:border-slate-500'}`}>
                    {allVerified && <span className="material-symbols-outlined text-emerald-600 text-[16px] font-bold">check</span>}
                  </div>
                  <span className={allVerified ? "text-sm text-emerald-600 font-bold" : "text-sm text-slate-500 font-medium"}>Checklist Complete</span>
                </div>
                <div className="h-px w-8 bg-slate-200 dark:bg-slate-600"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-500"></div>
                  <span className="text-sm text-slate-500 font-medium">Video Attached</span>
                </div>
              </div>
              
              <button 
                disabled={!allVerified}
                className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  allVerified 
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 cursor-pointer transform hover:-translate-y-0.5' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined">{allVerified ? 'check_circle' : 'lock'}</span>
                Verify & Complete Order
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">
                By completing this order, you certify that the contents match the checklist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoVerification;