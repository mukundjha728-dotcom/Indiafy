// // import React from 'react';

// // const Sidebar = () => {
// //   return (
// //     <aside className="hidden md:flex flex-col w-72 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 h-full fixed z-20">
// //       <div className="p-8 flex items-center gap-3">
// //         <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_15px_rgba(99,102,241,0.3)]">
// //           <span className="material-symbols-outlined text-[20px]">bolt</span>
// //         </div>
// //         <div className="flex flex-col">
// //           <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">Indiafy</span>
// //           <span className="text-[10px] font-semibold tracking-widest uppercase text-indigo-500 mt-1">Elite Seller</span>
// //         </div>
// //       </div>
      
// //       <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
// //         <a className="flex items-center gap-3.5 px-4 py-3.5 text-sm font-medium rounded-xl bg-indigo-50/80 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-100 dark:ring-indigo-800" href="#">
// //           <span className="material-symbols-outlined text-[22px]">dashboard</span>
// //           Command Center
// //         </a>
// //         <p className="px-4 pt-6 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operations</p>
// //         <a className="flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 transition-all" href="#">
// //           <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
// //           Orders
// //           <span className="ml-auto bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 py-0.5 px-2 rounded-full text-[10px] font-bold">12</span>
// //         </a>
// //         <a className="flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 transition-all" href="#">
// //           <span className="material-symbols-outlined text-[22px]">inventory_2</span>
// //           Inventory
// //         </a>
// //       </nav>

// //       <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50">
// //         <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
// //           <img alt="Profile" className="h-10 w-10 rounded-xl object-cover" src="https://via.placeholder.com/40" />
// //           <div className="flex-1 min-w-0">
// //             <p className="text-sm font-bold text-slate-900 dark:text-white truncate">The Green Leaf</p>
// //             <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">Verified Seller</p>
// //           </div>
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // };

// // export default Sidebar;


// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Sidebar = () => {
//   // Helper function for active styling
//   const getLinkClass = ({ isActive }) => {
//     const baseClass = "flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-xl transition-all";
//     const activeClass = "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-100 dark:ring-indigo-800";
//     const inactiveClass = "text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm";
    
//     return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
//   };

//   return (
//     <aside className="hidden md:flex flex-col w-72 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 h-full fixed z-20 overflow-y-auto">
//       <div className="p-8 flex items-center gap-3">
//         <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_15px_rgba(99,102,241,0.3)]">
//           <span className="material-symbols-outlined text-[20px]">bolt</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">Indiafy</span>
//           <span className="text-[10px] font-semibold tracking-widest uppercase text-indigo-500 mt-1">Elite Seller</span>
//         </div>
//       </div>
      
//       <nav className="flex-1 px-4 py-6 space-y-1.5">
        
//         {/* Dashboard Link */}
//         <NavLink to="/dashboard" className={getLinkClass}>
//           <span className="material-symbols-outlined text-[22px]">dashboard</span>
//           Command Center
//         </NavLink>

//         <p className="px-4 pt-6 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operations</p>
        
//         {/* Orders Link */}
//         <NavLink to="/orders" className={getLinkClass}>
//           <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
//           Orders
//           <span className="ml-auto bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 py-0.5 px-2 rounded-full text-[10px] font-bold">12</span>
//         </NavLink>

//         {/* Inventory Link (Placeholder) */}
//         <NavLink to="/inventory" className={getLinkClass}>
//           <span className="material-symbols-outlined text-[22px]">inventory_2</span>
//           Inventory
//         </NavLink>
        
//         {/* Logistics Link (Placeholder) */}
//         <NavLink to="/logistics" className={getLinkClass}>
//           <span className="material-symbols-outlined text-[22px]">local_shipping</span>
//           Logistics
//         </NavLink>

//       </nav>

//       {/* Footer Profile Section */}
//       <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 mt-auto">
//         <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
//           <img alt="Profile" className="h-10 w-10 rounded-xl object-cover" src="https://via.placeholder.com/40" />
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-bold text-slate-900 dark:text-white truncate">The Green Leaf</p>
//             <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">Verified Seller</p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
      isActive
        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-100 dark:ring-indigo-800'
        : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 h-full fixed z-20 overflow-y-auto">
      <div className="p-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-glow">
          <span className="material-symbols-outlined text-[20px]">bolt</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">Indiafy</span>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-indigo-500 mt-1">Elite Seller</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        <NavLink to="/dashboard" className={linkClasses}>
          <span className="material-symbols-outlined text-[22px]">dashboard</span>
          Command Center
        </NavLink>

        <p className="px-4 pt-6 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operations</p>
        
        <NavLink to="/orders" className={linkClasses}>
          <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
          Orders
          <span className="ml-auto bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 py-0.5 px-2 rounded-full text-[10px] font-bold">12</span>
        </NavLink>

        <NavLink to="/inventory" className={linkClasses}>
          <span className="material-symbols-outlined text-[22px]">inventory_2</span>
          Inventory
        </NavLink>
      </nav>

      <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">GL</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">The Green Leaf</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">Verified Seller</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;