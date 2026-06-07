import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Target, Lightbulb, Map, Globe, Award, Store, CheckCircle2, ChevronRight, Package, Box } from "lucide-react";

import WebsiteNavbar from "../../components/WebsiteNavbar";
import Footer from "../../components/Footer";
import SEOHead from "../../components/seo/SEOHead";

// --- ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// --- DATA ---
const STATS = [
  { label: "Verified Sellers", value: 500, suffix: "+", icon: <Store size={24} /> },
  { label: "Products", value: 10000, suffix: "+", icon: <Package size={24} /> },
  { label: "Categories", value: 50, suffix: "+", icon: <Box size={24} /> },
  { label: "Verified Commerce", value: 100, suffix: "%", icon: <ShieldCheck size={24} /> },
];

const PRINCIPLES = [
  {
    title: "Zero-Trust Verification",
    desc: "Every seller undergoes strict KYC and physical verification before joining.",
    icon: <ShieldCheck size={28} className="text-brand-primary" />,
  },
  {
    title: "Transparent Operations",
    desc: "From mandatory video packing to clear escrow payments, transparency is built-in.",
    icon: <Lightbulb size={28} className="text-brand-primary" />,
  },
  {
    title: "Hyperlocal Precision",
    desc: "Connecting you directly with inventory in your neighborhood for unmatched speed.",
    icon: <Target size={28} className="text-brand-primary" />,
  },
];

const TIMELINE = [
  { year: "2025", title: "The Idea", desc: "Indiafy was conceptualized to solve the trust deficit in unorganized local retail." },
  { year: "2026", title: "Platform Launch", desc: "Launch of the unified terminal connecting buyers, local sellers, and wholesale suppliers." },
  { year: "Future", title: "Pan India Expansion", desc: "Scaling our verified node infrastructure to every tier 2 and tier 3 city." },
];

// --- COUNT UP COMPONENT ---
const CountUp = ({ to, suffix }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = to / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {to >= 1000 ? (count / 1000).toFixed(count >= 10000 ? 0 : 1) + "K" : count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function About() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-900 selection:bg-brand-primary selection:text-white">
      <SEOHead 
        title="About Us | Indiafy Marketplace"
        description="Learn about Indiafy Commerce, our mission to build India's most trusted local marketplace platform, and our commitment to verifying sellers."
      />
      <WebsiteNavbar scrolledByDefault={true} />
      
      <main className="pt-24 lg:pt-32 pb-24">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-24 lg:mb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
              <ShieldCheck size={16} className="text-brand-primary" />
              <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">About Us</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
              Building India's Most <span className="text-brand-primary">Trusted</span> Hyperlocal Commerce Network
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
              Connecting verified sellers, suppliers and buyers through technology-driven trust infrastructure. We are codifying local commerce.
            </motion.p>
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-brand-primary mx-auto mb-6">
                  {stat.icon}
                </div>
                <h4 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-2">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* MISSION & VISION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 text-white rounded-[2.5rem] p-10 lg:p-14 relative overflow-hidden"
            >
              <div className="absolute -right-20 -bottom-20 opacity-10">
                <Globe size={300} />
              </div>
              <div className="relative z-10">
                <span className="text-brand-accent text-xs font-black uppercase tracking-widest mb-4 block">Our Mission</span>
                <h2 className="text-3xl lg:text-4xl font-black leading-tight mb-6">To empower local retail with enterprise-grade trust infrastructure.</h2>
                <p className="text-slate-400 font-medium leading-relaxed">
                  We believe that local commerce should be as reliable and scalable as global e-commerce. Our mission is to equip every verified neighborhood store and wholesale supplier with the technology to operate securely, transparently, and efficiently.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-center shadow-sm"
            >
              <span className="text-brand-primary text-xs font-black uppercase tracking-widest mb-4 block">Our Vision</span>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-6">A frictionless ecosystem where proximity meets absolute reliability.</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                By bridging the gap between hyperlocal inventory and buyer demand through verified nodes, Indiafy aims to become the definitive operating system for India's retail and wholesale sectors.
              </p>
            </motion.div>
          </div>
        </section>

        {/* COMMERCE PRINCIPLES */}
        <section className="bg-white py-32 mb-32 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">Why Indiafy Exists</span>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">Our Commerce Principles</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {PRINCIPLES.map((principle, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#F8FAFC] rounded-3xl p-10 border border-slate-100 hover:border-emerald-200 transition-colors"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-8">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{principle.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">The Roadmap</h2>
            </div>
            
            <div className="relative border-l-2 border-emerald-100 ml-4 md:ml-1/2">
              {TIMELINE.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="mb-12 ml-8 relative"
                >
                  <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-brand-primary border-4 border-white shadow-sm" />
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-brand-primary font-black tracking-widest text-xs uppercase mb-2 block">{item.year}</span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDERS MESSAGE */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
          >
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div className="aspect-[4/5] rounded-3xl bg-slate-100 overflow-hidden relative border border-slate-200">
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800" alt="Founders" className="w-full h-full object-cover grayscale opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold">Mukund & Prashant</p>
                  <p className="text-xs font-medium text-slate-300">Founding Team</p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              <Award size={40} className="text-emerald-100 mb-8" />
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
                "We built Indiafy because trust shouldn't be a luxury in local commerce—it should be the foundation."
              </h2>
              
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed mb-10">
                <p>
                  When we started looking at the unorganized retail and wholesale markets, the friction was obvious. Great local sellers were restricted by a lack of digital trust, and buyers were wary of unverified platforms.
                </p>
                <p>
                  Indiafy was engineered to bridge this gap. By strictly verifying every node on our network and enforcing operational mandates like video packing and escrow payments, we are replacing uncertainty with codified reliability.
                </p>
                <p>
                  Our roadmap is clear: we want to construct the definitive commerce infrastructure for India. An ecosystem where proximity and reliability are one and the same.
                </p>
              </div>
              
              <div>
                <p className="font-black text-slate-900 text-lg">Mukund Kumar Jha & Prashant Choudhary</p>
                <p className="text-brand-primary text-xs font-black uppercase tracking-widest mt-1">Founders & Product Architects</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
