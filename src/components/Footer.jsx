
import { useNavigate } from "react-router-dom"; // ✅ Added
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Globe,
  ShieldCheck,
  ChevronRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

// ✅ Route map for every footer link
const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "About Indiafy",   href: "/"          },
      { label: "How it Works",    href: "/"   },
      { label: "Verified Stores", href: "/local-sellers"  },
      { label: "Partner Program", href: "/auth"           },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center",    href: "/support"                },
      { label: "Order Tracking", href: "/track-order/:orderId"         },
      { label: "Refund Policy",  href: "/support#refund-policy"  },
      { label: "Contact Us",     href: "/support#contact"        },
    ],
  },
  {
    title: "Sellers",
    links: [
      { label: "Seller Dashboard",    href: "/auth"          },
      { label: "Sector Onboarding",   href: "/auth"               },
      { label: "Video Verification",  href: "/auth" },
      { label: "Merchant Support",    href: "/support"            },
    ],
  },
];

// ✅ Social media links
const socialLinks = [
  { Icon: Facebook,  href: "https://facebook.com/indiafy"  },
  { Icon: Instagram, href: "https://instagram.com/indiafy" },
  { Icon: Twitter,   href: "https://twitter.com/indiafy"   },
  { Icon: Linkedin,  href: "https://linkedin.com/company/indiafy" },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate(); // ✅ Added

  // ✅ Smart link handler: external links open in new tab, internal use navigate()
  const handleLink = (href) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener noreferrer");
    } else if (href.includes("#")) {
      // Hash links: navigate to page then let browser scroll to anchor
      const [path, hash] = href.split("#");
      navigate(path || "/");
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION: BRAND & LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">

          {/* Brand Info */}
          <div className="lg:col-span-5">
            {/* ✅ Logo → home */}
            <img
              src="/Images/logo.png"
              alt="Indiafy"
              onClick={() => navigate("/")}
              className="h-10 w-auto mb-8 brightness-0 invert cursor-pointer hover:opacity-70 transition-opacity"
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
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-300">
                <Mail size={14} className="text-emerald-500" />
                <span>operations@indiafy.com</span>
              </div>
            </div>
          </div>

          {/* ✅ Navigation Links — all routed */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-sm"></span>{" "}
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleLink(link.href)}
                        className="text-sm hover:text-white transition-colors duration-300 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: TRUST BAR & SOCIALS */}
        <div className="py-6 border-y border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-zinc-500">
              <Globe size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Global Standards
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
            <div className="flex items-center gap-2 text-zinc-500">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Secure Infrastructure
              </span>
            </div>
          </div>

          {/* ✅ Social links — open in new tab */}
          <div className="flex gap-4">
            {socialLinks.map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, backgroundColor: "#ffffff", color: "#000000" }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: LEGAL & SYSTEM STATUS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[11px] font-medium text-zinc-600">
              © {currentYear} Indiafy Commerce Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* ✅ Legal pages — update hrefs when pages are built */}
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms",   href: "/terms"   },
                { label: "Cookies", href: "/cookies" },
              ].map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => navigate(href)}
                  className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Systems Online:{" "}
              <span className="text-emerald-500 ml-1">Node GGM</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;