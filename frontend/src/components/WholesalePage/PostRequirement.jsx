import { memo } from "react";
import { Send, Building2, Package, Mail } from "lucide-react";

function PostRequirement() {
  return (
    <section className="py-20 lg:py-32 bg-brand-background border-b border-brand-border overflow-hidden relative">
      <div className="section-container relative z-10">
        
        <div className="bg-white border border-brand-border rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-16 shadow-2xl overflow-hidden relative">
          
          {/* Decorative SVG Blob */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50 to-transparent pointer-events-none" />
          <svg className="absolute -right-20 -top-20 w-[400px] h-[400px] text-brand-accent/5 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.9,-18.1,97.7,-2.5C98.5,13.2,94.1,29.1,84.9,42.4C75.8,55.7,61.9,66.4,46.7,73.8C31.4,81.1,15.7,85.1,0.2,84.8C-15.3,84.4,-30.6,79.7,-44.6,71.9C-58.5,64.1,-71,53.2,-79.8,39.7C-88.5,26.1,-93.6,10,-92.5,-5.5C-91.4,-21,-84.1,-35.9,-73.9,-47.9C-63.6,-59.8,-50.4,-68.8,-36.5,-76C-22.6,-83.1,-8,-88.4,6,-98.6C20,-88.8,30.6,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            
            {/* Left text */}
            <div>
              <h2 className="text-4xl lg:text-6xl font-display font-black text-brand-primary mb-6 tracking-tight leading-tight">
                Need <span className="text-brand-accent">Custom</span> Sourcing?
              </h2>
              <p className="text-lg text-brand-text-secondary font-medium mb-10">
                Can't find the exact product or MOQ you're looking for? Post your sourcing requirement and receive customized quotations from verified manufacturers within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                     <Building2 size={18} className="text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-brand-primary">Direct Factory</p>
                    <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest">Pricing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                     <Package size={18} className="text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-brand-primary">Low MOQ</p>
                    <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest">Negotiation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-brand-background border border-brand-border rounded-[24px] p-6 lg:p-8">
              <h3 className="text-xl font-black text-brand-primary mb-6">Quick Requirement</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-brand-text-secondary uppercase tracking-widest mb-2">Product Name</label>
                  <input type="text" placeholder="e.g. 5000 units of Cotton T-Shirts" className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-text-secondary uppercase tracking-widest mb-2">Quantity</label>
                    <input type="number" placeholder="5000" className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-text-secondary uppercase tracking-widest mb-2">Target Price (₹)</label>
                    <input type="number" placeholder="150" className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-text-secondary uppercase tracking-widest mb-2">Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={16} />
                    <input type="email" placeholder="buyer@company.com" className="w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all" />
                  </div>
                </div>
                <button className="w-full bg-brand-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 mt-2">
                  <Send size={18} /> Get Quotations
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(PostRequirement);
