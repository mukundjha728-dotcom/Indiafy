import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Package, 
  Clock, 
  Boxes, 
  Wallet, 
  Settings, 
  X, 
  Video,
  LogOut
} from "lucide-react";

const menus = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/dashboard" },
  { id: "orders", label: "Orders Inbox", icon: Package, path: "/orders" },
  { id: "live", label: "Live Orders", icon: Clock, path: "/live" },
  { id: "video", label: "Video Verification", icon: Video, path: "/video-verification" },
  { id: "history", label: "Order History", icon: Boxes, path: "/history" },
  { id: "products", label: "Products", icon: Package, path: "/products" },
  { id: "inventory", label: "Inventory", icon: Boxes, path: "/inventory" },
  { id: "finance", label: "Finance", icon: Wallet, path: "/finance" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear your specific auth token here
    localStorage.removeItem("token"); 
    
    // Updated to match the path in App.jsx
    navigate("/auth"); 
    
    if (sidebarOpen) setSidebarOpen(false);
  };

  const NavItems = ({ closeMobile }) => (
    <nav className="flex-1 space-y-1">
      {menus.map((menu) => (
        <NavLink
          key={menu.id}
          to={menu.path}
          onClick={() => {
            if (closeMobile) setSidebarOpen(false);
          }}
          className={({ isActive }) => `
            w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive 
              ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }
          `}
        >
          <menu.icon size={18} />
          {menu.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200/60 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">INDIAFY</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Seller Portal</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
           <NavItems closeMobile={false} />
        </div>

        {/* Desktop Logout Button */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* --- MOBILE DROPDOWN SIDEBAR --- */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        >
          <aside 
            className="absolute top-0 left-0 w-full bg-white max-h-[85vh] shadow-2xl flex flex-col rounded-b-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">I</span>
                </div>
                <h1 className="text-lg font-bold text-slate-900">INDIAFY</h1>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-900 transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <NavItems closeMobile={true} />
              
              {/* Mobile Logout Button */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}