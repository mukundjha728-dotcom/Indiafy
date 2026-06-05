import { memo, useState, useRef, useEffect } from "react";
import { Search, Filter, ChevronDown, Check, SlidersHorizontal, X } from "lucide-react";
import { useWholesaleStore } from "../../store/wholesaleStore";

const FILTER_CONFIG = [
  { id: "category", label: "Category", options: ["Electronics", "Garments", "Groceries", "Medical", "Furniture", "Packaging"] },
  { id: "moq", label: "Max MOQ", options: ["1+", "10+", "50+", "100+", "500+", "1000+"] },
  { id: "location", label: "Location", options: ["Delhi", "Mumbai", "Ahmedabad", "Bangalore", "Jaipur", "Kolkata"] },
  { id: "rating", label: "Rating", options: ["4.5+", "4.0+", "3.5+"] },
  { id: "delivery", label: "Delivery", options: ["Same Day", "1-3 Days", "3-7 Days"] },
];

function SearchFilterBar() {
  const { filters, setFilter, clearFilters, removeFilterArrayItem, fetchWholesaleProducts } = useWholesaleStore();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);
  const dropdownRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter("search", localSearch);
      fetchWholesaleProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setFilter, fetchWholesaleProducts]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleArrayFilter = (key, val) => {
    const current = filters[key] || [];
    if (current.includes(val)) {
      removeFilterArrayItem(key, val);
    } else {
      setFilter(key, [...current, val]);
    }
    fetchWholesaleProducts();
  };

  const handleSelectSingle = (key, val) => {
    setFilter(key, filters[key] === val ? "" : val);
    setActiveDropdown(null);
    fetchWholesaleProducts();
  };

  // Compute active filters for rendering tags
  const activeTags = [];
  filters.category.forEach(c => activeTags.push({ label: c, onRemove: () => handleToggleArrayFilter('category', c) }));
  filters.location.forEach(l => activeTags.push({ label: l, onRemove: () => handleToggleArrayFilter('location', l) }));
  if (filters.moq) activeTags.push({ label: `MOQ ${filters.moq}`, onRemove: () => { setFilter('moq', ''); fetchWholesaleProducts(); }});
  if (filters.rating) activeTags.push({ label: `Rating ${filters.rating}`, onRemove: () => { setFilter('rating', ''); fetchWholesaleProducts(); }});
  if (filters.delivery) activeTags.push({ label: filters.delivery, onRemove: () => { setFilter('delivery', ''); fetchWholesaleProducts(); }});
  if (filters.gstVerified) activeTags.push({ label: "GST Verified", onRemove: () => { setFilter('gstVerified', false); fetchWholesaleProducts(); }});
  if (filters.videoVerified) activeTags.push({ label: "Video Verified", onRemove: () => { setFilter('videoVerified', false); fetchWholesaleProducts(); }});

  return (
    <>
      <section className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-brand-border py-4 shadow-sm transition-all">
        <div className="section-container">
          
          {/* Top Row: Search & Toggles */}
          <div className="flex flex-col md:flex-row gap-4 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={20} />
              <input 
                type="text" 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products, suppliers, or categories..." 
                className="w-full bg-brand-background border border-brand-border rounded-xl pl-12 pr-4 py-3.5 text-brand-primary font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => { setFilter('gstVerified', !filters.gstVerified); fetchWholesaleProducts(); }}
                className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all flex items-center gap-2 ${filters.gstVerified ? 'bg-emerald-50 border-brand-accent text-brand-accent' : 'bg-white border-brand-border text-brand-text-secondary hover:bg-brand-background'}`}
              >
                {filters.gstVerified && <Check size={14} />} GST Verified
              </button>
              <button 
                onClick={() => { setFilter('videoVerified', !filters.videoVerified); fetchWholesaleProducts(); }}
                className={`hidden md:flex px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all items-center gap-2 ${filters.videoVerified ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-brand-border text-brand-text-secondary hover:bg-brand-background'}`}
              >
                {filters.videoVerified && <Check size={14} />} Video Verified
              </button>
              
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden px-4 py-3 rounded-xl bg-brand-primary text-white flex items-center gap-2 text-xs font-bold uppercase"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
          </div>

          {/* Bottom Row: Desktop Dropdown Filters & Active Tags */}
          <div className="hidden md:flex flex-col gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar" ref={dropdownRef}>
              <div className="flex items-center gap-2 text-brand-text-secondary mr-2 shrink-0">
                <Filter size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Filters:</span>
              </div>

              {FILTER_CONFIG.map((filter) => {
                const isActive = (filters[filter.id] && filters[filter.id].length > 0) || filters[filter.id];
                return (
                  <div key={filter.id} className="relative shrink-0">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === filter.id ? null : filter.id)}
                      className={`px-4 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${isActive ? 'bg-brand-background border-brand-primary text-brand-primary' : 'bg-white border-brand-border text-brand-text-secondary hover:text-brand-primary hover:bg-brand-background'}`}
                    >
                      {filter.label} <ChevronDown size={14} className={isActive ? 'text-brand-primary' : 'text-brand-text-secondary'} />
                    </button>

                    {activeDropdown === filter.id && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-brand-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                        {filter.options.map(opt => {
                          const isSelected = filter.id === 'category' || filter.id === 'location' 
                            ? filters[filter.id].includes(opt)
                            : filters[filter.id] === opt;
                            
                          return (
                            <button 
                              key={opt} 
                              onClick={() => filter.id === 'category' || filter.id === 'location' ? handleToggleArrayFilter(filter.id, opt) : handleSelectSingle(filter.id, opt)}
                              className="w-full text-left px-4 py-2.5 text-sm text-brand-primary hover:bg-brand-background flex items-center justify-between group"
                            >
                              <span className={isSelected ? 'font-bold text-brand-accent' : ''}>{opt}</span>
                              {isSelected && <Check size={16} className="text-brand-accent" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active Tags */}
            {activeTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 animate-in fade-in">
                {activeTags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-primary text-white text-[11px] font-bold uppercase tracking-widest">
                    {tag.label}
                    <button onClick={tag.onRemove} className="hover:text-brand-accent transition-colors"><X size={12} /></button>
                  </span>
                ))}
                <button 
                  onClick={() => { clearFilters(); fetchWholesaleProducts(); }}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary hover:text-red-500 transition-colors ml-2"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Mobile Drawer (Bottom Sheet) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-brand-primary/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="relative bg-white w-full rounded-t-3xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-full">
            <div className="p-4 flex items-center justify-between border-b border-brand-border">
              <h3 className="text-lg font-black text-brand-primary">Filters</h3>
              <button onClick={() => setIsMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-background text-brand-primary">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-8 hide-scrollbar">
              {FILTER_CONFIG.map((filter) => (
                <div key={filter.id}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text-secondary mb-3">{filter.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {filter.options.map(opt => {
                      const isSelected = filter.id === 'category' || filter.id === 'location' 
                            ? filters[filter.id].includes(opt)
                            : filters[filter.id] === opt;
                      return (
                        <button 
                          key={opt}
                          onClick={() => filter.id === 'category' || filter.id === 'location' ? handleToggleArrayFilter(filter.id, opt) : handleSelectSingle(filter.id, opt)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${isSelected ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-background text-brand-primary border-brand-border'}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-brand-border flex gap-3 bg-white">
              <button onClick={() => { clearFilters(); fetchWholesaleProducts(); }} className="flex-1 py-4 text-sm font-bold uppercase tracking-widest text-brand-text-secondary bg-brand-background rounded-xl">Clear All</button>
              <button onClick={() => setIsMobileOpen(false)} className="flex-1 py-4 text-sm font-bold uppercase tracking-widest text-white bg-brand-primary rounded-xl hover:bg-brand-accent transition-colors">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(SearchFilterBar);
