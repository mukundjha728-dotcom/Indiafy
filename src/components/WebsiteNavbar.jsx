
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#", hasDropdown: true },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

const productCategories = [
  { icon: "👗", label: "Clothing", sub: "Men, Women, Kids" },
  { icon: "👟", label: "Footwear", sub: "Casual, Sports, Formal" },
  { icon: "💍", label: "Accessories", sub: "Bags, Jewelry, Watches" },
  { icon: "🏠", label: "Home & Living", sub: "Décor, Kitchen, Bedding" },
  { icon: "📱", label: "Electronics", sub: "Mobiles, Laptops, Audio" },
  { icon: "✨", label: "Beauty", sub: "Skincare, Makeup, Wellness" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // This routes the user to /search and passes their query in the URL
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false); // Closes the search bar after they hit enter
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap');
        .nav-root * { font-family: 'Cabinet Grotesk', sans-serif; }
        .brand-font { font-family: 'Fraunces', serif; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dropdown-anim { animation: slideDown 0.22s cubic-bezier(.22,1,.36,1) both; }
        .mobile-anim   { animation: mobileSlide 0.28s cubic-bezier(.22,1,.36,1) both; }
        .search-anim   { animation: fadeIn 0.2s ease both; }

        .nav-link-pill {
          position: relative;
          transition: color 0.18s;
        }
        .nav-link-pill::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 50%;
          width: 0; height: 2px;
          background: #e11d48;
          border-radius: 99px;
          transition: width 0.22s ease, left 0.22s ease;
        }
        .nav-link-pill:hover::after,
        .nav-link-pill.active::after {
          width: 100%; left: 0;
        }
        .nav-link-pill:hover { color: #e11d48; }
        .nav-link-pill.active { color: #e11d48; font-weight: 700; }

        .cart-bounce:hover .cart-icon { animation: cartBounce 0.4s ease; }
        @keyframes cartBounce {
          0%,100% { transform: translateY(0); }
          40%      { transform: translateY(-4px); }
          70%      { transform: translateY(-2px); }
        }

        .category-card { transition: all 0.18s ease; }
        .category-card:hover { background: #fff1f3; transform: translateY(-2px); }
      `}</style>

      {/* Main Navbar - Modified for Transparent Capsule Look */}
      <nav
        className={`nav-root fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 border border-white/40 ${
          menuOpen ? "rounded-3xl" : "rounded-full"
        } ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-white/70 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center shadow-md group-hover:bg-rose-700 transition-colors">
                <span className="text-white font-black text-sm brand-font italic">
                  S
                </span>
              </div>
              <span className="brand-font text-xl font-bold text-stone-900 tracking-tight">
                Shop<span className="text-rose-600 italic">ify</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`nav-link-pill flex items-center gap-1 px-3 py-2 text-sm font-600 text-stone-700 ${
                        activeLink === link.label ? "active" : ""
                      }`}
                      onClick={() => setActiveLink(link.label)}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 4l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Mega Dropdown */}
                    {dropdownOpen && (
                      <div className="dropdown-anim absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden">
                        <div className="p-2 border-b border-stone-50 px-4 pt-3 pb-2">
                          <p className="text-xs font-black tracking-widest uppercase text-stone-400">
                            Shop by Category
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-1 p-2">
                          {productCategories.map((cat) => (
                            <a
                              key={cat.label}
                              href="#"
                              className="category-card flex items-center gap-3 px-3 py-2.5 rounded-xl"
                            >
                              <span className="text-xl">{cat.icon}</span>
                              <div>
                                <p className="text-sm font-bold text-stone-800">
                                  {cat.label}
                                </p>
                                <p className="text-xs text-stone-400">
                                  {cat.sub}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="bg-rose-50 px-4 py-3 flex items-center justify-between">
                          <p className="text-xs font-semibold text-rose-600">
                            🔥 New Arrivals this week
                          </p>
                          <a
                            href="#"
                            className="text-xs font-black text-rose-600 hover:underline"
                          >
                            View all →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className={`nav-link-pill px-3 py-2 text-sm font-medium text-stone-700 ${
                      activeLink === link.label ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <div className="relative flex items-center">
                {searchOpen && (
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products…"
                    onBlur={() => setSearchOpen(false)}
                    className="search-anim absolute right-8 w-52 sm:w-64 px-4 py-2 rounded-xl border-2 border-rose-200 bg-white text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-rose-400 shadow-lg"
                  />
                )}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-stone-600 hover:text-rose-600 hover:bg-white/50 transition-all relative z-10"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M13 13l3 3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Wishlist */}
              <button className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-stone-600 hover:text-rose-500 hover:bg-white/50 transition-all">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 15S2 10.5 2 5.5A3.5 3.5 0 019 4a3.5 3.5 0 017 1.5C16 10.5 9 15 9 15z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Cart */}
              <button className="cart-bounce relative w-9 h-9 rounded-full flex items-center justify-center text-stone-600 hover:text-rose-600 hover:bg-white/50 transition-all">
                <svg
                  className="cart-icon"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M2 2h1.5l2 9h9l1.5-6H5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="8" cy="15.5" r="1.2" fill="currentColor" />
                  <circle cx="13" cy="15.5" r="1.2" fill="currentColor" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none px-1 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth Buttons - desktop */}
              <div className="hidden md:flex items-center gap-2 ml-2">
                <a
                  href="#"
                  className="text-sm font-bold text-stone-700 hover:text-rose-600 px-3 py-1.5 rounded-full hover:bg-white/50 transition-all"
                >
                  Login
                </a>
                <a
                  href="#"
                  className="text-sm font-bold text-white px-5 py-2 rounded-full transition-all hover:opacity-90 hover:shadow-lg shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #e11d48, #f43f5e)",
                  }}
                >
                  Sign Up
                </a>
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5 text-stone-600 hover:bg-white/50 transition-colors ml-1"
              >
                <span
                  className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-anim md:hidden border-t border-white/40 bg-white/95 backdrop-blur-md px-4 pb-5 pt-3 rounded-b-3xl">
            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeLink === link.label
                      ? "bg-rose-50 text-rose-600"
                      : "text-stone-700 hover:bg-stone-50/50"
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                         d="M5 3l4 4-4 4"
                         stroke="currentColor"
                         strokeWidth="1.6"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Mobile categories quick-access */}
            <div className="mt-4 pt-4 border-t border-stone-100/50">
              <p className="text-xs font-black tracking-widest uppercase text-stone-400 mb-3 px-1">
                Categories
              </p>
              <div className="grid grid-cols-3 gap-2">
                {productCategories.map((cat) => (
                  <a
                    key={cat.label}
                    href="#"
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-stone-50/80 hover:bg-rose-50 transition-colors text-center"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-xs font-bold text-stone-600">
                      {cat.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Auth */}
            <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-stone-100/50">
              <a
                href="#"
                className="text-center py-3 rounded-full border-2 border-stone-200 text-sm font-bold text-stone-700 hover:border-rose-300 hover:text-rose-600 transition-all"
              >
                Login
              </a>
              <a
                href="#"
                className="text-center py-3 rounded-full text-sm font-bold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #e11d48, #f43f5e)",
                }}
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}