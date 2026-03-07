import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShoppingBag, Package } from 'lucide-react';

export default function StoreModeToggle() {
  const location = useLocation();
  const isWholesale = location.pathname === '/wholesale';

  return (
    <div className="w-full flex justify-center pt-6 relative z-30 -mb-16 pointer-events-none">
      <div className="bg-white/70 backdrop-blur-xl p-1.5 rounded-full border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center pointer-events-auto">
        
        {/* RETAIL BUTTON */}
        <Link
          to="/"
          className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
            !isWholesale
              ? 'bg-blue-600 text-white shadow-md scale-[1.02]'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <ShoppingBag size={18} />
          Retail Store
        </Link>

        {/* WHOLESALE BUTTON */}
        <Link
          to="/wholesale"
          className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
            isWholesale
              ? 'bg-slate-900 text-white shadow-md scale-[1.02]'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Package size={18} />
          Wholesale B2B
        </Link>
        
      </div>
    </div>
  );
}