import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Zap,
  Package,
  Truck,
  Home,
  Laptop,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#", hasDropdown: true },
  { label: "Track Order", href: "/track" },
  { label: "Gurugram Specials", href: "/local" },
  { label: "Help", href: "/support" },
];

const productCategories = [
  {
    icon: <Zap size={18} />,
    label: "Quick Commerce",
    sub: "10-25 Min Delivery",
  },
  { icon: <Package size={18} />, label: "Wholesale", sub: "Bulk B2B Pricing" },
  { icon: <Truck size={18} />, label: "E-Commerce", sub: "Same Day Shipping" },
  {
    icon: <Home size={18} />,
    label: "Home Essentials",
    sub: "Kitchen & Decor",
  },
  { icon: <Laptop size={18} />, label: "Electronics", sub: "Mobiles & Audio" },
  {
    icon: <Sparkles size={18} />,
    label: "Personal Care",
    sub: "Beauty & Wellness",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* 1. LOGO */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/Images/logo.png"
              alt="Indiafy Logo"
              className={`h-10 w-auto object-contain transition-all ${!scrolled && "brightness-0 invert"}`}
            />
          </div>

          {/* 2. DESKTOP NAV LINKS (Centered) */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
              >
                <a
                  href={link.href}
                  className={`flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-widest transition-all ${
                    scrolled ? "text-zinc-900" : "text-white"
                  } hover:opacity-60`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </a>

                {/* MEGA DROPDOWN */}
                {link.hasDropdown && dropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 overflow-hidden grid grid-cols-2 p-6 gap-2">
                      {productCategories.map((cat) => (
                        <div
                          key={cat.label}
                          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all cursor-pointer group/item"
                        >
                          <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 group-hover/item:bg-zinc-900 group-hover/item:text-white transition-all duration-300">
                            {cat.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-900">
                              {cat.label}
                            </p>
                            <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-tighter">
                              {cat.sub}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 3. ACTION ICONS */}
          <div
            className={`flex items-center gap-3 ${scrolled ? "text-zinc-900" : "text-white"}`}
          >
            <div className="hidden md:flex items-center bg-black/5 hover:bg-black/10 rounded-full px-4 py-2 transition-all cursor-pointer group">
              <Search
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="ml-2 text-[11px] font-bold uppercase tracking-widest opacity-60">
                Search
              </span>
            </div>

            <div className="flex items-center gap-1 border-l border-zinc-500/30 ml-2 pl-4">
              <button className="p-2 hover:bg-black/5 rounded-full transition-all relative">
                <Heart size={20} />
              </button>

              <button className="p-2 hover:bg-black/5 rounded-full transition-all relative">
                <ShoppingBag size={20} />
                <span
                  className={`absolute top-1 right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full font-black ${scrolled ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"}`}
                >
                  0
                </span>
              </button>

              <button
                className="lg:hidden p-2 ml-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 ml-4">
              <button className="text-[12px] font-black uppercase tracking-widest px-4">
                Login
              </button>
              <button
                className={`px-6 py-2.5 text-[12px] font-black uppercase tracking-widest rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 ${scrolled ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"}`}
              >
                Join Indiafy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[320px] bg-white p-8 transition-transform duration-500 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-12">
            <img src="/Images/logo.png" alt="Logo" className="h-8 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-zinc-900"
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-xl font-black text-zinc-900 uppercase tracking-tighter hover:text-zinc-400"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-20 space-y-4">
            <button className="w-full py-4 text-sm font-black uppercase tracking-widest border-2 border-zinc-100 rounded-2xl">
              Login
            </button>
            <button className="w-full py-4 text-sm font-black uppercase tracking-widest bg-zinc-900 text-white rounded-2xl shadow-2xl shadow-zinc-300">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
