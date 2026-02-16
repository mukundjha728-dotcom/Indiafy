// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App



// // import DashboardLayout from './components/DashboardLayout';

// // function App() {
// //   return (
// //     <DashboardLayout>
// //        {/* Your page content goes here */}
// //        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
// //        <p>Your specific page content will appear here, surrounded by the nav and sidebar.</p>
// //     </DashboardLayout>
// //   );
// // }

// // export default App;

// // import React from 'react';
// // import DashboardLayout from './components/DashboardLayout';
// // // UPDATED IMPORT PATH: Note the folder name 'Seller Dashboard'
// // import Dashboard from './pages/SellerDashboard/Dashboard';

// // function App() {
// //   return (
// //     <DashboardLayout>
// //        <Dashboard />
// //     </DashboardLayout>
// //   );
// // }

// // export default App;

// import React from 'react';
// import DashboardLayout from './components/DashboardLayout';
// import Dashboard from './pages/SellerDashboard/Dashboard'; 
// import Orders from './pages/SellerDashboard/Orders'; 

// function App() {
//   return (
//     <DashboardLayout>
//        <Dashboard />
//         <Orders />
//     </DashboardLayout>
//   );
// }

// export default App;




// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import WebsiteLayout from './components/WebsiteLayout';
// import DashboardLayout from './components/DashboardLayout';
// import Dashboard from './pages/SellerDashboard/Dashboard';
// import Orders from './pages/SellerDashboard/Orders';
// import VideoVerification from './pages/SellerDashboard/VideoVerification';
// import Inventory from './pages/SellerDashboard/Inventory';

// function App() {
//   return (
//     <BrowserRouter>
//       <DashboardLayout>
//         <Routes>
//           {/* Default path redirects to Dashboard */}
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
//           {/* Routes */}
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/video-verification" element={<VideoVerification />} />
//           <Route path="/inventory" element={<Inventory />} />
//           {/* Add more routes here later, e.g., /inventory */}
//         </Routes>
//       </DashboardLayout>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import WebsiteLayout from './components/WebsiteLayout';
import DashboardLayout from './components/DashboardLayout';

// Seller Dashboard Pages
import Dashboard from './pages/SellerDashboard/Dashboard';
import Orders from './pages/SellerDashboard/Orders';
import VideoVerification from './pages/SellerDashboard/VideoVerification';
import Inventory from './pages/SellerDashboard/Inventory';

// Placeholder Home Page for the Public Website
const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Indiafy</h1>
    <p className="text-gray-600 mb-8">This is the public website facing the customers.</p>
    <a href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Go to Seller Dashboard
    </a>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- 1. PUBLIC WEBSITE ROUTES --- */}
        {/* This wrapper applies the White Navbar to everything inside */}
        <Route element={<WebsiteLayout />}>
           <Route path="/" element={<Home />} />
           {/* Add other public pages here, e.g., <Route path="/about" ... /> */}
        </Route>

        {/* --- 2. SELLER DASHBOARD ROUTES --- */}
        {/* The '/*' captures any other route and applies the Dashboard Layout */}
        <Route path="/*" element={
          <DashboardLayout>
            <Routes>
              {/* Redirect /dashboard (without subpath) to main dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/orders" element={<Orders />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/video-verification" element={<VideoVerification />} />
              
              {/* If someone types a random URL like /xyz, send them to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </DashboardLayout>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;