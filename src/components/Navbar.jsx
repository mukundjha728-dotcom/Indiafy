
import React, { useState, useEffect, useRef } from "react";
import { Bell, Menu, CalendarClock, Package, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setSidebarOpen, storeDetails }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  // --- CLOCK LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const formattedDate = time.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }); // Shortened weekday for mobile fit

  // --- CLICK OUTSIDE TO CLOSE DROPDOWN ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- MOCK RECENT NOTIFICATIONS ---
  const recentNotifications = [
    { id: 1, title: "New Order #ORD-203", desc: "Amit Singh placed an order for ₹850.", time: "Just now", type: "order", unread: true },
    { id: 2, title: "Payout Successful", desc: "₹4,200 has been settled to your bank.", time: "2 hrs ago", type: "success", unread: true },
    { id: 3, title: "Low Stock Alert", desc: "Royal Basmati Rice is running low (5 left).", time: "1 day ago", type: "alert", unread: false },
  ];

  const handleNotificationClick = () => {
    setShowNotifications(false);
    navigate('/notifications');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-3 sm:px-8 py-3 flex items-center gap-2 sm:gap-4 sticky top-0 z-40">
      
      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-600 active:scale-95 transition-all shrink-0" onClick={() => setSidebarOpen(true)}>
        <Menu size={20} />
      </button>

      {/* --- LIVE CLOCK (Now Mobile Responsive) --- */}
      {/* Removed the 'hidden' class and scaled text/padding for mobile */}
      <div className="flex-1 flex items-center gap-2 sm:gap-3 select-none ml-1 sm:ml-0 overflow-hidden">
        <div className="p-1.5 sm:p-2 bg-slate-100 text-slate-500 rounded-lg sm:rounded-xl shrink-0">
          <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex flex-col justify-center truncate">
          <span className="text-[11px] sm:text-sm font-bold text-slate-900 leading-none truncate">
            {formattedTime}
          </span>
          <span className="text-[9px] sm:text-xs font-medium text-slate-500 mt-0.5 sm:mt-1 truncate">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Right Side: Notifications & Profile */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0">
        
        {/* --- NOTIFICATION DROPDOWN --- */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-xl relative transition-all active:scale-95 ${showNotifications ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[300px] sm:w-80 bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Notifications</h3>
                <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-full">2 New</span>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar flex flex-col">
                {recentNotifications.map((notif) => (
                  <button key={notif.id} onClick={handleNotificationClick} className="w-full text-left p-4 hover:bg-slate-50 border-b border-slate-100 transition-colors flex items-start gap-3 relative">
                    {notif.unread && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${notif.type === 'order' ? 'bg-blue-50 text-blue-600' : notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {notif.type === 'order' ? <Package size={16}/> : notif.type === 'success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</p>
                      <p className="text-xs font-medium text-slate-500 mt-0.5 line-clamp-2">{notif.desc}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">{notif.time}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="p-3 bg-slate-50/50 border-t border-slate-100">
                <button onClick={handleNotificationClick} className="w-full py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors shadow-sm">
                  View all messages
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-6 sm:h-8 w-[1px] bg-slate-200 mx-1 sm:mx-2"></div>
        
        {/* --- PROFILE REDIRECT TO SETTINGS --- */}
        <button 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 p-1 pr-2 sm:pr-3 hover:bg-slate-100 rounded-xl transition-all active:scale-95 group"
        >
          {storeDetails?.logo ? (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border border-slate-200 shrink-0">
               <img src={storeDetails.logo} alt="Store" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-extrabold shrink-0 group-hover:bg-slate-800 transition-colors">
              {storeDetails?.initials || "JS"}
            </div>
          )}
          <span className="text-sm font-bold text-slate-700 hidden lg:inline group-hover:text-slate-900 transition-colors">
            {storeDetails?.name || "Jai Store"}
          </span>
        </button>

      </div>
    </header>
  );
}