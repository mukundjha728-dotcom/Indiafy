import React from "react";
import { ShoppingCart, MapPin } from "lucide-react";

const WebsiteNavbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 text-white p-2 rounded-lg">🚚</div>
            <h1 className="text-xl font-bold text-blue-600">Indiafy</h1>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <MapPin size={18} className="text-blue-600" />
            <div className="text-sm">
              <p className="text-gray-500 text-xs">Delivering to</p>
              <p className="font-semibold text-gray-700">Sector 14, Gurugram</p>
            </div>
          </div>
        </div>

        {/* CENTER SECTION - SEARCH */}
        <div className="flex-1 hidden md:flex">
          <input
            type="text"
            placeholder="Search for 'Medicines', 'Fresh Milk' or 'Local Boutiques'..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hidden md:block text-gray-700 hover:text-blue-600 font-medium"
          >
            Stores
          </a>

          <a
            href="#"
            className="hidden md:block text-gray-700 hover:text-blue-600 font-medium"
          >
            Riders
          </a>

          <a
            href="#"
            className="hidden md:block text-gray-700 hover:text-blue-600 font-medium"
          >
            Support
          </a>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart className="text-gray-700 hover:text-blue-600" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              2
            </span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-7 h-7 rounded-full"
            />
            <span className="hidden md:block font-medium text-gray-700">
              Ankit
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WebsiteNavbar;