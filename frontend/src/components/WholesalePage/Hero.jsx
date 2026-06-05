import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, FileText, Factory, ShieldCheck, Video, Box, Building2, Store } from "lucide-react";

function AnimatedCounter({ from = 0, to, duration = 2.5, formatter }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    const num = Math.round(latest);
    return formatter ? formatter(num) : num;
  });

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [isInView, count, to, duration]);

  return <motion.span ref={nodeRef}>{rounded}</motion.span>;
}

/* ---------- Premium Animated Network Visualization ---------- */
function V3NetworkVisualization() {
  return (
    <div className="relative w-full h-[550px] lg:h-[650px] bg-white rounded-[2rem] shadow-2xl border border-brand-border overflow-hidden">
      
      {/* Background Layers */}
      {/* Layer 1: Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Layer 2: Network dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#10B981 1.5px, transparent 1.5px)', backgroundSize: '48px 48px', backgroundPosition: '24px 24px' }} />
      {/* Layer 3: Soft radial gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[80px]" />

      {/* SVG Route Flow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 650" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="glowRoute" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* M -> D -> V -> W -> R */}
        <path
          id="networkRoute"
          d="M 120 100 C 120 200, 380 150, 380 250 C 380 350, 120 300, 120 400 C 120 500, 380 450, 380 550"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="3"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
        <path
          d="M 120 100 C 120 200, 380 150, 380 250 C 380 350, 120 300, 120 400 C 120 500, 380 450, 380 550"
          fill="none"
          stroke="url(#glowRoute)"
          strokeWidth="4"
          className="opacity-50"
        />

        <circle r="6" fill="#10B981" filter="url(#neonGlow)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 120 100 C 120 200, 380 150, 380 250 C 380 350, 120 300, 120 400 C 120 500, 380 450, 380 550"
          />
        </circle>
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* Node 1: Manufacturer */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
          className="absolute top-[8%] left-[24%] -translate-x-1/2 bg-white p-3 rounded-[16px] shadow-xl border border-brand-border w-[160px] group hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-100 transition-colors">
              <Factory size={16} className="text-brand-primary" />
            </div>
            <p className="text-[11px] font-black text-brand-primary uppercase tracking-wider">Manufacturer</p>
          </div>
          <p className="text-[10px] font-bold text-brand-text-secondary uppercase">2500+ Factories</p>
        </motion.div>

        {/* Node 2: Distributor */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
          className="absolute top-[32%] right-[10%] -translate-x-1/2 bg-white p-3 rounded-[16px] shadow-xl border border-brand-border w-[170px] group hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
              <Building2 size={16} className="text-blue-600" />
            </div>
            <p className="text-[11px] font-black text-brand-primary uppercase tracking-wider">Distributor</p>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold uppercase">
             <span className="text-brand-text-secondary">4.9 Rating</span>
             <span className="text-brand-accent">98% Fulfill</span>
          </div>
        </motion.div>

        {/* Node 3: Video Verification */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }}
          className="absolute top-[55%] left-[24%] -translate-x-1/2 bg-white p-3 rounded-[16px] shadow-xl border border-brand-accent/30 ring-2 ring-brand-accent/10 w-[180px] group hover:-translate-y-1 transition-transform z-10"
        >
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
              <Video size={16} className="text-brand-accent" />
            </div>
            <p className="text-[11px] font-black text-brand-primary uppercase tracking-wider">Verification</p>
          </div>
          <div className="flex gap-1.5">
             <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase border border-emerald-100">Video</span>
             <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase border border-emerald-100">GST</span>
          </div>
        </motion.div>

        {/* Node 4: Warehouse */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} viewport={{ once: true }}
          className="absolute top-[78%] right-[10%] -translate-x-1/2 bg-white p-3 rounded-[16px] shadow-xl border border-brand-border w-[170px] group hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
              <Box size={16} className="text-indigo-600" />
            </div>
            <p className="text-[11px] font-black text-brand-primary uppercase tracking-wider">Warehouse</p>
          </div>
          <p className="text-[10px] font-bold text-brand-text-secondary uppercase">50+ Dist Hubs</p>
        </motion.div>

        {/* Node 5: Retail Buyer */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} viewport={{ once: true }}
          className="absolute bottom-[2%] left-[50%] -translate-x-1/2 bg-brand-primary text-white p-3 rounded-[16px] shadow-[0_20px_40px_-10px_rgba(15,23,42,0.6)] border border-brand-primary w-[180px] group hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Store size={16} className="text-white" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-wider">Retail Buyer</p>
          </div>
          <p className="text-[10px] font-bold text-brand-accent uppercase">12K+ Businesses</p>
        </motion.div>

      </div>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-brand-background pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden border-b border-brand-border">
      
      {/* Background Layer 1: Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Background Layer 2: Radial Soft Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-accent/10 via-brand-accent/5 to-transparent rounded-full blur-[100px] -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-sky-100/50 to-transparent rounded-full blur-[100px] -z-0 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 w-fit mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-accent">B2B Procurement Engine</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
              className="text-[40px] md:text-[56px] lg:text-[72px] font-display font-black leading-[1.05] tracking-tight text-brand-primary mb-6"
            >
              Source Directly From <span className="text-brand-accent">Verified</span> Suppliers
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
              className="text-lg text-brand-text-secondary font-medium max-w-[500px] mb-10 leading-relaxed"
            >
              Access wholesale pricing, trusted suppliers and bulk inventory across India. Escrow-protected procurement for retail and B2B buyers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => navigate("/search?type=wholesale")}
                className="btn-primary py-4 px-8 text-base hover:scale-[1.02] transition-transform shadow-xl shadow-brand-accent/20"
              >
                Browse Suppliers
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate("/post-requirement")}
                className="btn-secondary py-4 px-8 text-base bg-white hover:scale-[1.02] transition-transform shadow-lg"
              >
                <FileText size={20} />
                Post Requirement
              </button>
            </motion.div>
          </div>

          {/* Right Network Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <V3NetworkVisualization />
          </motion.div>
        </div>

        {/* TRUST STRIP (Premium Metric Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }}
            className="bg-white border border-brand-border rounded-[24px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
          >
            <p className="text-3xl font-display font-black text-brand-primary mb-1">
              <AnimatedCounter to={12000} duration={2.5} formatter={n => n.toLocaleString('en-IN')} />+
            </p>
            <p className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest group-hover:text-brand-primary transition-colors">Products</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}
            className="bg-white border border-brand-border rounded-[24px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
          >
            <p className="text-3xl font-display font-black text-brand-primary mb-1">
              <AnimatedCounter to={2500} duration={2.5} formatter={n => n.toLocaleString('en-IN')} />+
            </p>
            <p className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest group-hover:text-brand-primary transition-colors">Verified Suppliers</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} viewport={{ once: true }}
            className="bg-white border border-brand-border rounded-[24px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
          >
            <p className="text-3xl font-display font-black text-brand-primary mb-1">
              <AnimatedCounter to={18} duration={2} />
            </p>
            <p className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest group-hover:text-brand-primary transition-colors">States Covered</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} viewport={{ once: true }}
            className="bg-white border border-brand-border rounded-[24px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
          >
            <p className="text-3xl font-display font-black text-brand-primary mb-1">
              ₹<AnimatedCounter to={50} duration={2} />Cr+
            </p>
            <p className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest group-hover:text-brand-primary transition-colors">Sourced</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} viewport={{ once: true }}
            className="bg-white border border-brand-accent/30 ring-4 ring-brand-accent/5 rounded-[24px] p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:border-brand-accent hover:-translate-y-1.5 transition-all group col-span-2 md:col-span-1 lg:col-span-1"
          >
            <p className="text-3xl font-display font-black text-brand-accent mb-1">
              <AnimatedCounter to={98} duration={2} />%
            </p>
            <p className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest group-hover:text-brand-accent transition-colors">Buyer Satisfaction</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default memo(Hero);
