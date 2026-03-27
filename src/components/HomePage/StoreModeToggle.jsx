// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { ShoppingBag, Package } from 'lucide-react';

// export default function StoreModeToggle() {
//   const location = useLocation();
//   const isWholesale = location.pathname === '/wholesale';

//   return (
//     <div className="w-full flex justify-center pt-6 relative z-30 -mb-16 pointer-events-none">
//       <div className="bg-white/70 backdrop-blur-xl p-1.5 rounded-full border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center pointer-events-auto">
        
//         {/* RETAIL BUTTON */}
//         <Link
//           to="/"
//           className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
//             !isWholesale
//               ? 'bg-blue-600 text-white shadow-md scale-[1.02]'
//               : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
//           }`}
//         >
//           <ShoppingBag size={18} />
//           Retail Store
//         </Link>

//         {/* WHOLESALE BUTTON */}
//         <Link
//           to="/wholesale"
//           className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
//             isWholesale
//               ? 'bg-slate-900 text-white shadow-md scale-[1.02]'
//               : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
//           }`}
//         >
//           <Package size={18} />
//           Wholesale B2B
//         </Link>
        
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShoppingBag, Landmark, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StoreModeToggle() {
  const location = useLocation();
  
  // Logic to determine active index
  const getActiveIndex = () => {
    if (location.pathname === '/quick-commerce') return 0;
    if (location.pathname === '/wholesale') return 2;
    return 1; // Default to Ecommerce (Home)
  };

  const activeIdx = getActiveIndex();

  const modes = [
    { name: "Hyperlocal", path: "/quick-commerce", icon: <Zap size={16} /> },
    { name: "India Hub", path: "/", icon: <Globe size={16} /> },
    { name: "Bulk Node", path: "/wholesale", icon: <Landmark size={16} /> }
  ];

  return (
    <div className="w-full flex justify-center pt-8 relative z-50 -mb-12 pointer-events-none">
      <div className="bg-zinc-900/90 backdrop-blur-2xl p-1.5 rounded-[2rem] border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center pointer-events-auto relative overflow-hidden">
        
        {/* Sliding Background Indicator */}
        <motion.div
          initial={false}
          animate={{ x: `${activeIdx * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1.5 left-1.5 bottom-1.5 w-[calc(33.33%-4px)] bg-gradient-to-r from-zinc-100 to-white rounded-[1.6rem] shadow-xl"
        />

        {modes.map((mode, idx) => (
          <Link
            key={mode.name}
            to={mode.path}
            className="relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-[1.6rem] text-[11px] font-black uppercase tracking-widest transition-all duration-500 group min-w-[140px]"
          >
            <div className={`flex items-center gap-2 transition-colors duration-300 ${activeIdx === idx ? 'text-zinc-950' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
              {mode.icon}
              {mode.name}
            </div>
          </Link>
        ))}
        
      </div>
    </div>
  );
}