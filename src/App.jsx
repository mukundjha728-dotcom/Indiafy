
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import WebsiteLayout from './components/WebsiteLayout';
import DashboardLayout from './components/DashboardLayout';

// Pages
import Dashboard from './frontend/pages/SellerDashboard/Dashboard';
import Orders from './frontend/pages/SellerDashboard/Orders';
import LiveOrders from './frontend/pages/SellerDashboard/LiveOrders';
import History from './frontend/pages/SellerDashboard/History';
import Products from './frontend/pages/SellerDashboard/Products';
import Inventory from './frontend/pages/SellerDashboard/Inventory';
import Finance from './frontend/pages/SellerDashboard/Finance';
import Settings from './frontend/pages/SellerDashboard/Settings';
import Notifications from './frontend/pages/SellerDashboard/Notifications';
import VideoVerification from './frontend/pages/SellerDashboard/VideoVerification';

// --- ADDED NEW AUTH IMPORT ---
import SellerAuth from './frontend/pages/SellerAuth'; 

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <div className="w-20 h-20 bg-slate-900 rounded-3xl mb-6 flex items-center justify-center shadow-xl shadow-slate-200">
       <span className="text-white text-4xl font-bold">I</span>
    </div>
    <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">INDIAFY</h1>
    <p className="text-slate-600 mb-8 max-w-md text-lg">The future of hyper-local commerce.</p>
    <div className="flex flex-wrap gap-4 justify-center">
      {/* --- UPDATED LINK TO POINT TO /auth --- */}
      <a href="/auth" className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition active:scale-95 shadow-md">Seller Login</a>
    </div>
  </div>
);

function App() {
  // --- GLOBAL STORE PROFILE STATE ---
  const [storeDetails, setStoreDetails] = useState({
    name: "Jai Store",
    initials: "JS",
    logo: null, 
    email: "contact@jaistore.com",
    phone: "+91 98765 43210",
    address: "Street 10, Sector 22\nChandigarh, 160022",
    gstin: "04AABCU9603R1ZM",
    // Bank Details
    accountName: "Jai Store Official",
    accountNumber: "50100234567890",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank",
    // Preferences
    orderAlerts: true,
    autoAccept: false,
    promotionalEmails: true,
    // Store Status
    isStoreOpen: true,
    isDeactivated: false
  });

  // --- DATA STATES ---
  const [products, setProducts] = useState([
    { id: 1, name: "Organic Turmeric Powder", sku: "IND-SP-001", category: "Spices", tag: "Best Seller", image: "https://via.placeholder.com/60", demand: "high", stock: 150, price: 240.00, status: "Active" },
  ]);
  const [inboxOrders, setInboxOrders] = useState([
    { id: "ORD-201", customer: "Rahul S.", location: "Sector 22, Chandigarh", amount: "₹1,250", items: "2 Items", time: "15 mins ago" },
  ]);
  const [liveOrders, setLiveOrders] = useState([]);

  // Handlers
  const handleAcceptOrder = (order) => { setInboxOrders(prev => prev.filter(o => o.id !== order.id)); setLiveOrders(prev => [{ ...order, status: "Packing In Progress" }, ...prev]); };
  const handleRejectOrder = (id) => { setInboxOrders(prev => prev.filter(o => o.id !== id)); };
  const handleCompleteOrder = (id) => { setLiveOrders(prev => prev.filter(o => o.id !== id)); };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WebsiteLayout />}><Route path="/" element={<Home />}/></Route>

        {/* --- ADDED STANDALONE AUTH ROUTE --- */}
        <Route path="/auth" element={<SellerAuth />} />

        {/* PASS STORE DETAILS TO DASHBOARD LAYOUT */}
        <Route path="/*" element={
          <DashboardLayout storeDetails={storeDetails}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders orders={inboxOrders} onAccept={handleAcceptOrder} onReject={handleRejectOrder} />} />
              <Route path="live" element={<LiveOrders liveOrders={liveOrders} onCompleteOrder={handleCompleteOrder} />} />
              <Route path="products" element={<Products products={products} setProducts={setProducts} />} />
              <Route path="inventory" element={<Inventory products={products} setProducts={setProducts} />} />
              <Route path="history" element={<History />} />
              <Route path="finance" element={<Finance />} />
              <Route path="settings" element={<Settings storeDetails={storeDetails} setStoreDetails={setStoreDetails} />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="video-verification" element={<VideoVerification />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;