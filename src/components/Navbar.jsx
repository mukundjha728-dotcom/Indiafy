import { useState } from "react";
import {
  MapPin,
  Search,
  ShoppingCart,
  User,
  Store,
  LifeBuoy,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* MAIN BAR */}
        <div className="flex items-center justify-between h-20">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              <span className="text-blue-600">India</span>fy
            </h1>

            {/* Location */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black transition">
              <MapPin size={16} className="text-blue-600" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-400">Delivering across</span>
                <span className="font-medium text-gray-900 flex items-center gap-1">
                  West Gurugram
                  <ChevronDown size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* SEARCH (Center Focus) */}
          <div className="hidden md:flex flex-1 mx-10 max-w-2xl">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search stores, products, medicines, grocery..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-black transition">
                <Store size={18} />
                Stores
              </button>

              <button className="flex items-center gap-1 hover:text-black transition">
                <LifeBuoy size={18} />
                Support
              </button>
            </div>

            {/* Seller CTA */}
            <button className="hidden md:block px-4 py-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
              Become a Seller
            </button>

            {/* Cart */}
            <div className="relative cursor-pointer">
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </div>

            {/* Profile */}
            <User size={22} className="cursor-pointer text-gray-700" />

            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search nearby stores..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden pb-6 space-y-4 border-t border-gray-200 pt-4 text-gray-700">
            <div className="flex items-center gap-2">
              <Store size={18} />
              Stores
            </div>
            <div className="flex items-center gap-2">
              <LifeBuoy size={18} />
              Support
            </div>
            <div className="text-blue-600 font-medium">Become a Seller</div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
