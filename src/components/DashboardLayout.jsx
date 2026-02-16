// import React from 'react';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0b1120]">
//       <Sidebar />
//       <main className="flex-1 ml-0 md:ml-72 h-full overflow-y-auto">
//         <Navbar />
//         <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-10">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;


import React from 'react';
import Sidebar from './Sidebar'; // Correct because they are in the same folder
import Navbar from './Navbar';   // Correct because they are in the same folder

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0b1120]">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-72 h-full overflow-y-auto">
        <Navbar />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;