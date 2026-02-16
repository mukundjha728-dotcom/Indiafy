import React from 'react';
import { Outlet } from 'react-router-dom';
import WebsiteNavbar from './WebsiteNavbar'; // Import your new navbar

const WebsiteLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* This Navbar will stay fixed at the top of all website pages */}
      <WebsiteNavbar />
      
      {/* This renders the content of the specific page you are on */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default WebsiteLayout;