import { memo } from "react";
import { ShieldCheck, Video, FileCheck, HeadphonesIcon } from "lucide-react";

function WhyIndiafy() {
  return (
    <section className="py-20 lg:py-32 bg-brand-background border-b border-brand-border">
      <div className="section-container">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-display font-black text-brand-primary mb-6 tracking-tight">
            Why <span className="text-brand-accent">Indiafy Wholesale</span>
          </h2>
          <p className="text-lg text-brand-text-secondary font-medium">
            Procurement infrastructure built for absolute trust, scale, and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="bg-white border border-brand-border rounded-[24px] p-8 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={32} className="text-brand-accent" />
            </div>
            <h3 className="text-xl font-black text-brand-primary mb-3">Verified Suppliers</h3>
            <p className="text-sm font-medium text-brand-text-secondary leading-relaxed">
              Every manufacturer goes through strict physical and digital KYC checks before onboarding.
            </p>
          </div>

          <div className="bg-white border border-brand-border rounded-[24px] p-8 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Video size={32} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-black text-brand-primary mb-3">Video Packing</h3>
            <p className="text-sm font-medium text-brand-text-secondary leading-relaxed">
              Mandatory video recording of order packing ensures you receive exactly what you paid for.
            </p>
          </div>

          <div className="bg-white border border-brand-border rounded-[24px] p-8 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileCheck size={32} className="text-indigo-500" />
            </div>
            <h3 className="text-xl font-black text-brand-primary mb-3">GST Validation</h3>
            <p className="text-sm font-medium text-brand-text-secondary leading-relaxed">
              Live GSTIN verification guarantees business legitimacy and smooth tax credit claims.
            </p>
          </div>

          <div className="bg-white border border-brand-border rounded-[24px] p-8 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HeadphonesIcon size={32} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-black text-brand-primary mb-3">Dedicated Support</h3>
            <p className="text-sm font-medium text-brand-text-secondary leading-relaxed">
              Access to regional procurement managers to assist with large volume negotiation.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default memo(WhyIndiafy);
