import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ================= LAYOUTS =================
import WebsiteLayout from './components/WebsiteLayout';
import DashboardLayout from './components/DashboardLayout';

// ================= PUBLIC WEBSITE PAGES =================
import Home from './pages/Home';
import Wholesalepage from './components/HomePage/Wholesalepage';
import Cartpage from './components/HomePage/Cartpage';
import Checkoutpage from './components/HomePage/Checkoutpage';
import Paymentpage from './components/HomePage/Paymentpage';
import Ordersuccesspage from './components/HomePage/Ordersuccesspage';
import Productdetailpage from './components/HomePage/Productdetailpage';
import Categorylistingpage from './components/HomePage/Categorylistingpage';
import Searchresultspage from './components/HomePage/Searchresultspage';

// ================= CUSTOMER ACCOUNT PAGES =================
import Customerprofile from './components/HomePage/Customerprofile';
import Savedaddresses from './components/HomePage/Savedaddresses';
import Orderhistorypage from './components/HomePage/Orderhistorypage';
import Ordertrackingpage from './components/HomePage/Ordertrackingpage';
import Customersupport from './components/HomePage/Customersupport';

// ================= AUTH PAGE =================
import SellerAuth from './frontend/pages/SellerAuth'; 

// ================= SELLER DASHBOARD PAGES =================
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

export default function App() {
  // --- GLOBAL STORE PROFILE STATE ---
  const [storeDetails, setStoreDetails] = useState({
    name: "Jai Store",
    initials: "JS",
    logo: null, 
    email: "contact@jaistore.com",
    phone: "+91 98765 43210",
    address: "Street 10, Sector 22\nChandigarh, 160022",
    gstin: "04AABCU9603R1ZM",
    accountName: "Jai Store Official",
    accountNumber: "50100234567890",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank",
    orderAlerts: true,
    autoAccept: false,
    promotionalEmails: true,
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

  // --- HANDLERS ---
  const handleAcceptOrder = (order) => { 
    setInboxOrders(prev => prev.filter(o => o.id !== order.id)); 
    setLiveOrders(prev => [{ ...order, status: "Packing In Progress" }, ...prev]); 
  };
  const handleRejectOrder = (id) => { 
    setInboxOrders(prev => prev.filter(o => o.id !== id)); 
  };
  const handleCompleteOrder = (id) => { 
    setLiveOrders(prev => prev.filter(o => o.id !== id)); 
  };

  return (
    <BrowserRouter>
      <Routes>
        
        {/* ================= PUBLIC WEBSITE ROUTES ================= */}
        {/* All routes inside this block will have the Main Navbar and Footer */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wholesale" element={<Wholesalepage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/payment" element={<Paymentpage />} />
          <Route path="/order-success" element={<Ordersuccesspage />} />
          <Route path="/search" element={<Searchresultspage />} />
          
          {/* Dynamic Data Routes (Notice the colon ':') */}
          <Route path="/product/:id" element={<Productdetailpage />} />
          <Route path="/category/:categoryName" element={<Categorylistingpage />} />

          {/* Customer Profile Routes */}
          <Route path="/profile" element={<Customerprofile />} />
          <Route path="/addresses" element={<Savedaddresses />} />
          <Route path="/order-history" element={<Orderhistorypage />} />
          <Route path="/track-order/:orderId" element={<Ordertrackingpage />} />
          <Route path="/support" element={<Customersupport />} />
        </Route>

        {/* ================= STANDALONE AUTH ROUTE ================= */}
        <Route path="/auth" element={<SellerAuth />} />

        {/* ================= SELLER DASHBOARD ROUTES ================= */}
        {/* All routes inside this block will have the Dashboard Sidebar and Topbar */}
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
              
              {/* Fallback to Dashboard if route is not found inside the dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </DashboardLayout>
        } />

      </Routes>
    </BrowserRouter>
  );
}