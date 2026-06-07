const fs = require('fs');

const files = [
  'frontend/src/pages/customer/Ordertrackingpage.jsx',
  'frontend/src/pages/customer/Customerprofile.jsx',
  'frontend/src/pages/public/NotFound.jsx',
  'frontend/src/pages/customer/Orderhistorypage.jsx',
  'frontend/src/pages/customer/Checkoutpage.jsx',
  'frontend/src/pages/customer/Savedaddresses.jsx',
  'frontend/src/pages/public/Productdetailpage.jsx',
  'frontend/src/pages/public/Categorylistingpage.jsx',
  'frontend/src/pages/public/blog/BlogList.jsx',
  'frontend/src/pages/public/Stores.jsx',
  'frontend/src/pages/public/LocalSellers.jsx',
  'frontend/src/pages/public/StorePage.jsx',
  'frontend/src/pages/customer/Ordersuccesspage.jsx',
  'frontend/src/pages/customer/Cartpage.jsx'
];

const replacements = {
  'bg-\\[#050505\\]': 'bg-slate-50',
  'bg-zinc-950/50': 'bg-white',
  'bg-zinc-950': 'bg-white',
  'bg-zinc-900/60': 'bg-white/90 backdrop-blur-xl shadow-sm border border-slate-200',
  'bg-zinc-900/50': 'bg-white/90 backdrop-blur-xl shadow-sm border border-slate-200',
  'bg-zinc-900/40': 'bg-white/90 backdrop-blur-xl shadow-sm border border-slate-200',
  'bg-zinc-900': 'bg-white shadow-sm border border-slate-200',
  'bg-zinc-800': 'bg-slate-100 border border-slate-200',
  'bg-zinc-100': 'bg-slate-100',
  'hover:bg-zinc-900': 'hover:bg-slate-50',
  'hover:bg-zinc-800': 'hover:bg-slate-50',
  'hover:bg-zinc-700': 'hover:bg-slate-100',
  'border-zinc-800/50': 'border-slate-200',
  'border-zinc-800/30': 'border-slate-200',
  'border-zinc-800': 'border-slate-200',
  'border-zinc-700': 'border-slate-300',
  'border-zinc-950': 'border-white',
  'border-white/5': 'border-slate-200',
  'border-dashed border-zinc-800': 'border-dashed border-slate-300',
  'text-zinc-900': 'text-slate-900',
  'text-zinc-800': 'text-slate-700',
  'text-zinc-700': 'text-slate-600',
  'text-zinc-600': 'text-slate-500',
  'text-zinc-500': 'text-slate-500',
  'text-zinc-400': 'text-slate-600',
  'text-zinc-300': 'text-slate-700',
  'text-zinc-200': 'text-slate-900',
  'text-zinc-100': 'text-slate-900',
  'bg-white text-black': 'bg-slate-900 text-white hover:bg-slate-800',
  'bg-white text-zinc-900': 'bg-slate-900 text-white hover:bg-slate-800',
  'text-white': 'text-slate-900',
  'from-zinc-800': 'from-slate-100',
  'to-zinc-900': 'to-slate-200',
  'from-zinc-900': 'from-slate-100',
  'to-zinc-950': 'to-slate-200',
  'shadow-zinc-900/20': 'shadow-slate-200',
  'shadow-zinc-950/20': 'shadow-slate-200',
};

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log("Missing:", file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');

  for (const [key, val] of Object.entries(replacements)) {
      const regex = new RegExp(`(?<![a-zA-Z0-9-])` + key + `(?![a-zA-Z0-9-])`, 'g');
      content = content.replace(regex, val);
  }

  // Fix buttons that lost white text because of 'text-white' -> 'text-slate-900'
  content = content.replace(/(bg-emerald-\d+(?:\/\d+)?.*?)(?:text-slate-900)/g, '$1text-white');
  content = content.replace(/(bg-red-\d+(?:\/\d+)?.*?)(?:text-slate-900)/g, '$1text-white');
  content = content.replace(/(bg-blue-\d+(?:\/\d+)?.*?)(?:text-slate-900)/g, '$1text-white');
  content = content.replace(/(bg-slate-900+(?:\/\d+)?.*?)(?:text-slate-900)/g, '$1text-white');
  content = content.replace(/(bg-zinc-\d+(?:\/\d+)?.*?)(?:text-slate-900)/g, '$1text-white');
  
  // Specific fix for Customer Profile top buttons:
  // "bg-white text-black" got replaced. "bg-zinc-800 text-zinc-400" got replaced with "bg-slate-100 border border-slate-200 text-slate-600"
  // Let's add the dynamic background blur orbs to customer profile and others if they don't have it
  if (!content.includes('bg-gradient-to-br from-emerald-100/50 to-teal-100/30')) {
      const orbInjection = `
      {/* Background Blobs for Hero Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[-10%] right-[10%] w-[50vw] h-[50vw] bg-gradient-to-br from-emerald-100/50 to-teal-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-blue-100/40 to-indigo-100/20 rounded-full blur-[100px]" />
      </div>
      `;
      // Inject after <main... > or <div className="... min-h-screen
      content = content.replace(/(<main[^>]*>)/, `$1\n${orbInjection}`);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log("Updated:", file);
});
