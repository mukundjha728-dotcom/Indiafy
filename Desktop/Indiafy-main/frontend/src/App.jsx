import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

// ================= LAYOUTS =================
import WebsiteLayout from "./components/WebsiteLayout";
import DashboardLayout from "./components/DashboardLayout";

// ================= PUBLIC WEBSITE PAGES =================
import Home from "./pages/public/Home";
import Wholesalepage from "./pages/public/Wholesalepage";
import Cartpage from "./pages/customer/Cartpage";
import About from "./pages/public/About";
import Checkoutpage from "./pages/customer/Checkoutpage";
import Paymentpage from "./pages/customer/Paymentpage";
import Ordersuccesspage from "./pages/customer/Ordersuccesspage";
import Productdetailpage from "./pages/public/Productdetailpage";
import Categorylistingpage from "./pages/public/Categorylistingpage";
import Searchresultspage from "./pages/public/Searchresultspage";
import LocalSellers from "./pages/public/LocalSellers";
import QuickCommerce from "./pages/public/QuickCommerce";

// 🔥 NAYA PAGE IMPORT KIYA YAHAN 🔥
import Storepage from "./pages/public/StorePage";

// User Auth
import UserAuth from "./pages/auth/UserSignup";
import UserLogin from "./pages/auth/UserLogin";

// ================= CUSTOMER ACCOUNT PAGES =================
import Customerprofile from "./pages/customer/Customerprofile";
import Savedaddresses from "./pages/customer/Savedaddresses";
import Orderhistorypage from "./pages/customer/Orderhistorypage";
import Ordertrackingpage from "./pages/customer/Ordertrackingpage";
import Customersupport from "./pages/customer/Customersupport";

// ================= AUTH PAGE =================
import SellerAuth from "./pages/auth/SellerAuth";

// ================= SELLER DASHBOARD PAGES =================
import Dashboard from "./pages/seller/Dashboard";
import Orders from "./pages/seller/Orders";
import LiveOrders from "./pages/seller/LiveOrders";
import History from "./pages/seller/History";
import Products from "./pages/seller/Products";
import Inventory from "./pages/seller/Inventory";
import Finance from "./pages/seller/Finance";
import Settings from "./pages/seller/Settings";
import Notifications from "./pages/seller/Notifications";
import VideoVerification from "./pages/seller/VideoVerification";

// Admin Auth
import AdminLogin from "./pages/auth/AdminLogin";
// import AdminSignup from "./pages/auth/AdminSignup";

// /* ADMIN PAGES  */
import AdminDashboard from "./pages/admin/Dashboard";
import AdminInventory from "./pages/admin/Inventory";
import ProductManagement from "./pages/admin/ProductManagement";
import AdminOrderManagement from "./pages/admin/OrderManagement";
import OrderDetail from "./pages/admin/OrderDetail";
import Analytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import Payments from "./pages/admin/Payment";
import AdminProfile from "./pages/admin/Profile";
import Coupons from "./pages/admin/Coupons";
import CustomerManagement from "./pages/admin/CustomerManagement";
import PendingApplications from "./pages/admin/PendingApplications";
import ActiveSellers from "./pages/admin/ActiveSellers";

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
    isDeactivated: false,
  });

  // --- DATA STATES ---
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Turmeric Powder",
      sku: "IND-SP-001",
      category: "Spices",
      tag: "Best Seller",
      image: "https://via.placeholder.com/60",
      demand: "high",
      stock: 150,
      price: 240.0,
      status: "Active",
    },
  ]);
  const [inboxOrders, setInboxOrders] = useState([
    {
      id: "ORD-201",
      customer: "Rahul S.",
      location: "Sector 22, Chandigarh",
      amount: "₹1,250",
      items: "2 Items",
      time: "15 mins ago",
    },
  ]);
  const [liveOrders, setLiveOrders] = useState([]);

  // --- HANDLERS ---
  const handleAcceptOrder = (order) => {
    setInboxOrders((prev) => prev.filter((o) => o.id !== order.id));
    setLiveOrders((prev) => [
      { ...order, status: "Packing In Progress" },
      ...prev,
    ]);
  };
  const handleRejectOrder = (id) => {
    setInboxOrders((prev) => prev.filter((o) => o.id !== id));
  };
  const handleCompleteOrder = (id) => {
    setLiveOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* ================= PUBLIC WEBSITE ROUTES ================= */}
        {/* All routes inside this block will have the Main Navbar and Footer */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/wholesale" element={<Wholesalepage />} />
          <Route path="/quick-commerce" element={<QuickCommerce />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/payment" element={<Paymentpage />} />
          <Route path="/order-success" element={<Ordersuccesspage />} />
          <Route path="/search" element={<Searchresultspage />} />

          {/* Local Sellers Route */}
          <Route path="/local-sellers" element={<LocalSellers />} />

          {/* Dynamic Data Routes */}
          <Route path="/product/:id" element={<Productdetailpage />} />
          <Route
            path="/category/:categoryName"
            element={<Categorylistingpage />}
          />

          {/* 🔥 ACTUAL STORE ROUTE ADDED HERE 🔥 */}
          <Route path="/store/:id" element={<Storepage />} />

          {/* Customer Profile Routes */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route path="/profile" element={<Customerprofile />} />
            <Route path="/addresses" element={<Savedaddresses />} />
            <Route path="/order-history" element={<Orderhistorypage />} />
            <Route
              path="/track-order/:orderId"
              element={<Ordertrackingpage />}
            />
            <Route path="/support" element={<Customersupport />} />
          </Route>
        </Route>

        {/* ================= STANDALONE AUTH ROUTE ================= */}
        <Route path="/auth" element={<SellerAuth />} />

        {/* ================= SELLER DASHBOARD ROUTES ================= */}
        {/* All routes inside this block will have the Dashboard Sidebar and Topbar */}
        <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
          <Route
            path="/*"
            element={
              <DashboardLayout storeDetails={storeDetails}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="live" element={<LiveOrders />} />
                  <Route
                    path="products"
                    element={
                      <Products products={products} setProducts={setProducts} />
                    }
                  />
                  <Route
                    path="inventory"
                    element={
                      <Inventory
                        products={products}
                        setProducts={setProducts}
                      />
                    }
                  />
                  <Route path="history" element={<History />} />
                  <Route path="finance" element={<Finance />} />
                  <Route
                    path="settings"
                    element={
                      <Settings
                        storeDetails={storeDetails}
                        setStoreDetails={setStoreDetails}
                      />
                    }
                  />
                  <Route path="notifications" element={<Notifications />} />
                  <Route
                    path="video-verification/:id"
                    element={<VideoVerification />}
                  />

                  {/* Fallback to Dashboard if route is not found inside the dashboard */}
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </DashboardLayout>
            }
          />
        </Route>

        {/* User Auth */}
        <Route path="/signup" element={<UserAuth />} />
        <Route path="/login" element={<UserLogin />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
          <Route path="/admin/orders" element={<AdminOrderManagement />} />
          <Route path="/admin/orders/:id" element={<OrderDetail />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profiles" element={<AdminProfile />} />
          <Route path="/admin/coupons" element={<Coupons />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/active-sellers" element={<ActiveSellers />} />
          <Route
            path="/admin/pending-applications"
            element={<PendingApplications />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
