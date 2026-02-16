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




import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/SellerDashboard/Dashboard';
import Orders from './pages/SellerDashboard/Orders';
import VideoVerification from './pages/SellerDashboard/VideoVerification';
import Inventory from './pages/SellerDashboard/Inventory';

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          {/* Default path redirects to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/video-verification" element={<VideoVerification />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* Add more routes here later, e.g., /inventory */}
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;