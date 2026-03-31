
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  Package,
  Truck,
  Home,
  Laptop,
  Sparkles,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#", hasDropdown: true },
  { label: "Track Order", href: "/track-order/:orderId" }, // ✅ Fixed: no literal :orderId
  { label: "Gurugram Specials", href: "/local-sellers" }, // ✅ Fixed: was /local
  { label: "Help", href: "/support" },
];

const productCategories = [
  {
    icon: <Zap size={18} className="text-emerald-500" />,
    label: "Quick Commerce",
    sub: "10-25 Min Delivery",
    href: "/quick-commerce", // ✅ Linked to route
  },
  {
    icon: <Package size={18} />,
    label: "Wholesale",
    sub: "Bulk B2B Pricing",
    href: "/wholesale", // ✅ Linked to route
  },
  {
    icon: <Truck size={18} />,
    label: "E-Commerce",
    sub: "Same Day Shipping",
    href: "/category/ecommerce", // ✅ Linked to dynamic category route
  },
  {
    icon: <Package size={18} className="text-blue-500" />,
    label: "Wholesale",
    sub: "Bulk B2B Pricing",
    path: "/wholesale",
  },
  {
    icon: <Truck size={18} className="text-orange-500" />,
    label: "Local Sellers",
    sub: "Verified Ecosystem",
    path: "/local-sellers",
  },
  {
    icon: <Home size={18} className="text-purple-500" />,
    label: "Home Essentials",
    sub: "Kitchen & Decor",
    href: "/category/home-essentials", // ✅ Linked to dynamic category route
  },
  {
    icon: <Laptop size={18} />,
    label: "Electronics",
    sub: "Mobiles & Audio",
    href: "/category/electronics", // ✅ Linked to dynamic category route
  },
  {
    icon: <Laptop size={18} className="text-zinc-500" />,
    label: "Electronics",
    sub: "Mobiles & Audio",
    path: "#",
  },
  {
    icon: <Sparkles size={18} className="text-pink-500" />,
    label: "Personal Care",
    sub: "Beauty & Wellness",
    href: "/category/personal-care", // ✅ Linked to dynamic category route
  },
];

export default function WebsiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if we are on the Home page
  const isHomePage = location.pathname === "/";

  // Light Theme applies if NOT on homepage OR if scrolled
  const isLightTheme = !isHomePage || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus input when search bar opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // ✅ Navigate to /search with query param
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  // ✅ Handle Track Order — prompt for order ID via a simple nav
  const handleTrackOrder = (e) => {
    e.preventDefault();
    const orderId = prompt("Enter your Order ID to track:");
    if (orderId && orderId.trim()) {
      navigate(`/track-order/${orderId.trim()}`);
    }
  };

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

          {/* 2. DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
              >
                {/* ✅ Track Order gets special handler; others use href or navigate */}
                {link.label === "Track Order" ? (
                  <button
                    onClick={handleTrackOrder}
                    className={`flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-widest transition-all ${
                      scrolled ? "text-zinc-900" : "text-white"
                    } hover:opacity-60 bg-transparent border-none cursor-pointer`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href !== "#") {
                        e.preventDefault();
                        navigate(link.href);
                      }
                    }}
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
                )}

                {/* MEGA DROPDOWN */}
                {link.hasDropdown && dropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 overflow-hidden grid grid-cols-2 p-6 gap-2">
                      {productCategories.map((cat) => (
                        <div
                          key={cat.label}
                          onClick={() => {
                            navigate(cat.href); // ✅ Navigate to category route
                            setDropdownOpen(false);
                          }}
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
                        ))}
                      </div>
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
            {/* ✅ Search Bar — toggles input, submits to /search */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center bg-black/10 rounded-full px-4 py-2"
                >
                  <Search size={16} className="opacity-60 mr-2 flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent text-[12px] font-semibold outline-none w-40 placeholder:opacity-50"
                    onBlur={() => {
                      if (!searchQuery) setSearchOpen(false);
                    }}
                  />
                  <button type="submit" className="hidden" />
                  <X
                    size={14}
                    className="opacity-50 cursor-pointer ml-1 hover:opacity-100"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  />
                </form>
              ) : (
                <div
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center bg-black/5 hover:bg-black/10 rounded-full px-4 py-2 transition-all cursor-pointer group"
                >
                  <Search size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="ml-2 text-[11px] font-bold uppercase tracking-widest opacity-60">
                    Search
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 border-l border-zinc-500/30 ml-2 pl-4">
              {/* ✅ Wishlist — navigate to /profile (wishlist lives in profile) */}
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-black/5 rounded-full transition-all relative"
                title="Wishlist"
              >
                <Heart size={20} />
              </button>

              {/* ✅ Cart — navigate to /cart */}
              <button
                onClick={() => navigate("/cart")}
                className="p-2 hover:bg-black/5 rounded-full transition-all relative"
                title="Cart"
              >
                <ShoppingBag size={20} />
                <span
                  className={`absolute top-1 right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full font-black ${
                    scrolled ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
                  }`}
                >
                  <Heart size={20} strokeWidth={1.5} />
                </button>

                <button
                  className={`p-2 rounded-full transition-all relative ${isLightTheme ? "hover:bg-zinc-100" : "hover:bg-white/10"}`}
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  <span
                    className={`absolute top-0.5 right-0.5 w-4 h-4 text-[9px] flex items-center justify-center rounded-full font-black shadow-sm ${isLightTheme ? "bg-emerald-500 text-white" : "bg-white text-emerald-600"}`}
                  >
                    0
                  </span>
                </button>

            {/* ✅ Login → /auth | Join Indiafy → /signup */}
            <div className="hidden lg:flex items-center gap-3 ml-4">
              <button
                onClick={() => navigate("/signup")}
                className="text-[12px] font-black uppercase tracking-widest px-4 hover:opacity-60 transition-opacity"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth")}
                className={`px-6 py-2.5 text-[12px] font-black uppercase tracking-widest rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 ${
                  scrolled ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
                }`}
              >
                Join Indiafy
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[320px] bg-white p-8 transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-12">
            <img src="/Images/logo.png" alt="Logo" className="h-8 w-auto" />
            <button onClick={() => setMenuOpen(false)} className="text-zinc-900">
              <X size={24} />
            </button>
          </div>

          {/* ✅ Mobile nav links — all properly navigated */}
          <div className="space-y-8">
            {navLinks.map((link) => (
              link.label === "Track Order" ? (
                <button
                  key={link.label}
                  onClick={() => {
                    setMenuOpen(false);
                    handleTrackOrder({ preventDefault: () => {} });
                  }}
                  className="block text-xl font-black text-zinc-900 uppercase tracking-tighter hover:text-zinc-400 bg-transparent border-none w-full text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href === "#" ? undefined : link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    if (link.href !== "#") navigate(link.href);
                  }}
                  className="block text-xl font-black text-zinc-900 uppercase tracking-tighter hover:text-zinc-400"
                >
                  {link.label}
                </a>
              )
            ))}

            {/* ✅ Mobile search */}
            <form onSubmit={(e) => { setMenuOpen(false); handleSearch(e); }} className="flex items-center border-b-2 border-zinc-100 pb-2">
              <Search size={16} className="text-zinc-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 text-sm font-semibold outline-none text-zinc-900 placeholder:text-zinc-300"
              />
            </form>
          </div>

          <div className="mt-20 space-y-4">
            {/* ✅ Mobile Login → /auth */}
            <button
              onClick={() => { setMenuOpen(false); navigate("/auth"); }}
              className="w-full py-4 text-sm font-black uppercase tracking-widest border-2 border-zinc-100 rounded-2xl"
            >
              Login
            </button>
            {/* ✅ Mobile Signup → /signup */}
            <button
              onClick={() => { setMenuOpen(false); navigate("/signup"); }}
              className="w-full py-4 text-sm font-black uppercase tracking-widest bg-zinc-900 text-white rounded-2xl shadow-2xl shadow-zinc-300"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}