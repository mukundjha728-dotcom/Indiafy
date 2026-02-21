import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import WebsiteLayout from "./components/WebsiteLayout";
import DashboardLayout from "./components/DashboardLayout";

// Public Pages
import Home from "./pages/Home"; // <-- Real Home page (not placeholder)

// Seller Dashboard Pages
import Dashboard from "./pages/SellerDashboard/Dashboard";
import Orders from "./pages/SellerDashboard/Orders";
import VideoVerification from "./pages/SellerDashboard/VideoVerification";
import Inventory from "./pages/SellerDashboard/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC WEBSITE ================= */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          {/* Future public pages */}
          {/* <Route path="/about" element={<About />} /> */}
        </Route>

        {/* ================= SELLER DASHBOARD ================= */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="video-verification" element={<VideoVerification />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
