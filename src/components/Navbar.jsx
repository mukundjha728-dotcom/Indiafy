import React from 'react';

const Navbar = () => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
          <span className="material-symbols-outlined text-sm">bolt</span>
        </div>
        <span className="font-bold text-lg text-slate-900 dark:text-white">Indiafy</span>
      </div>
      <button className="p-2 text-slate-600 dark:text-slate-300">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </div>
  );
};

export default Navbar;