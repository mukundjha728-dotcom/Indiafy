import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        "About Indiafy",
        "How it Works",
        "Verified Stores",
        "Partner Program",
      ],
    },
    {
      title: "Support",
      links: ["Help Center", "Order Tracking", "Refund Policy", "Contact Us"],
    },
    {
      title: "Sellers",
      links: [
        "Seller Dashboard",
        "Sector Onboarding",
        "Video Verification",
        "Merchant Support",
      ],
    },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP SECTION: BRAND & LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <img
              src="/Images/logo.png"
              alt="Indiafy"
              className="h-10 w-auto mb-8 brightness-0 invert"
            />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-8">
              Indiafy is a trust-first hyperlocal commerce infrastructure
              designed to connect Gurugram's nearby sellers, riders, and
              customers within a controlled operational ecosystem.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-300">
                <MapPin size={16} className="text-zinc-600" />
                Gurugram, Haryana, India [cite: 3]
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-300">
                <ShieldCheck size={16} className="text-emerald-500" />
                Verified Sector Infrastructure [cite: 39]
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: TRUST BAR */}
        <div className="py-8 border-y border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-zinc-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Global Operations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-zinc-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                PCI-DSS Compliant
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{
                  y: -3,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all duration-300"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: LEGAL */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[11px] font-medium text-zinc-600">
              © {currentYear} Indiafy Commerce Pvt. Ltd. All rights reserved.
              [cite: 92]
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter"
              >
                Cookies
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Systems Online: Gurugram Node
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
