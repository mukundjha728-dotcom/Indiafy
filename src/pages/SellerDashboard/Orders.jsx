import React, { useState, useEffect } from 'react';

// Mock Data (In a real app, this comes from an API)
const MOCK_ORDERS = [
  {
    id: "#IND-8821",
    time: "3 mins ago",
    customer: "Anjali Sharma",
    distance: "0.8 km",
    initials: "AS",
    color: "bg-purple-100 text-purple-600",
    price: "₹ 450.00",
    items: "3 Items",
    status: "new",
    stage: 1, // 1: Accept, 2: Pack, 3: Ship
    sla: "04:59",
    slaStatus: "CRITICAL", // CRITICAL, WARNING, ON TRACK
    priority: true,
  },
  {
    id: "#IND-8824",
    time: "8 mins ago",
    customer: "Rohan Kapoor",
    distance: "2.1 km",
    initials: "RK",
    color: "bg-blue-100 text-blue-600",
    price: "₹ 1,299.00",
    items: "1 Item",
    status: "processing",
    stage: 2,
    sla: "14:20",
    slaStatus: "WARNING",
    priority: false,
  },
  {
    id: "#IND-8830",
    time: "Just now",
    customer: "Priya M.",
    distance: "0.5 km",
    initials: "PM",
    color: "bg-orange-100 text-orange-600",
    price: "₹ 85.00",
    items: "2 Items",
    status: "new",
    stage: 1,
    sla: "28:45",
    slaStatus: "ON TRACK",
    priority: false,
  },
  {
    id: "#IND-8835",
    time: "1 min ago",
    customer: "Vikram J.",
    distance: "1.5 km",
    initials: "VJ",
    color: "bg-teal-100 text-teal-600",
    price: "₹ 1,500.00",
    items: "1 Item",
    status: "new",
    stage: 1,
    sla: "29:10",
    slaStatus: "ON TRACK",
    priority: false,
  },
  {
    id: "#IND-8842",
    time: "5 mins ago",
    customer: "Sneha B.",
    distance: "3.0 km",
    initials: "SB",
    color: "bg-pink-100 text-pink-600",
    price: "₹ 210.00",
    items: "4 Items",
    status: "new",
    stage: 1,
    sla: "35:00",
    slaStatus: "ON TRACK",
    priority: false,
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState('new');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Checkbox Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(oId => oId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  return (
    <div className="relative min-h-screen font-display text-slate-800 dark:text-slate-100 bg-background-light dark:bg-background-dark pb-20">
      
      {/* Floating Action Bar - Shows when items are selected */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:left-[60%] z-40 w-auto max-w-2xl transition-all duration-300 transform ${selectedOrders.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-900 text-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-6 border border-slate-700">
          <div className="flex items-center gap-2 border-r border-slate-700 pr-6">
            <span className="bg-white text-slate-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">{selectedOrders.length}</span>
            <span className="text-sm font-medium">Orders Selected</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 hover:text-primary-100 transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-lg">print</span> <span className="hidden sm:inline">Print Labels</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary-100 transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-lg">local_shipping</span> <span className="hidden sm:inline">Ship Now</span>
            </button>
            <button 
              onClick={() => setSelectedOrders([])}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-lg">cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Order Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Monitor incoming orders and maintain your fulfillment speed.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-sm font-medium">
              <span className="material-symbols-outlined text-lg">history</span>
              <span className="hidden sm:inline">Order History</span>
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-sm shadow-blue-200 dark:shadow-none hover:bg-primary-600 transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-lg">videocam</span>
              Test Camera
            </button>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-96 group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
              placeholder="Search Order ID or Customer..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <div className="relative w-full sm:w-auto">
              <select className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                <option>All Categories</option>
                <option>Grocery</option>
                <option>Electronics</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </span>
            </div>
            <div className="relative w-full sm:w-auto">
              <select className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                <option>All Values</option>
                <option>₹0 - ₹500</option>
                <option>₹500+</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-4 scrollbar-hide">
          {[
            { id: 'new', label: 'New Orders', count: 5 },
            { id: 'processing', label: 'In Progress', count: 2 },
            { id: 'ready', label: 'Ready for Pickup', count: 1 },
            { id: 'completed', label: 'Completed', count: 0 }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all active:scale-95 ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-md shadow-blue-500/20' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:text-primary'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 w-12 text-center">
                    <input 
                      type="checkbox"
                      className="custom-checkbox w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                      onChange={handleSelectAll}
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    />
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID & Time</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer & Location</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Items & Value</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-48">Progress</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">SLA Timer</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={index} className={`group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${selectedOrders.includes(order.id) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                      <td className="p-4 text-center align-top pt-5">
                        <input 
                          type="checkbox"
                          className="custom-checkbox w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOne(order.id)}
                        />
                      </td>
                      <td className="p-4 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{order.id}</span>
                          <span className="text-xs text-slate-500">{order.time}</span>
                          {order.priority && (
                            <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                              PRIORITY
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${order.color}`}>
                            {order.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{order.customer}</p>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                              <span className="material-symbols-outlined text-[12px]">near_me</span> {order.distance}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-900 dark:text-white">{order.price}</span>
                          <span className="text-xs text-slate-500">{order.items}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-col gap-1 w-full">
                          <div className="flex justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                            <span className={order.stage >= 1 ? "text-primary" : "text-slate-300"}>Accept</span>
                            <span className={order.stage >= 2 ? "text-primary" : "text-slate-300"}>Pack</span>
                            <span className={order.stage >= 3 ? "text-primary" : "text-slate-300"}>Ship</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
                            <div className={`h-full rounded-full bg-primary transition-all duration-500`} style={{width: `${order.stage * 33.33}%`}}></div>
                          </div>
                          <span className="text-[10px] text-slate-400 text-center mt-0.5 capitalize">{order.status.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="inline-flex flex-col items-end">
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                            order.slaStatus === 'CRITICAL' ? 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-100' :
                            order.slaStatus === 'WARNING' ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-100' :
                            'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100'
                          }`}>
                            <span className={`material-symbols-outlined text-sm ${order.slaStatus === 'CRITICAL' ? 'animate-pulse' : ''}`}>timer</span>
                            <span className="font-bold font-mono text-sm">{order.sla}</span>
                          </div>
                          <span className={`text-[10px] font-medium mt-1 ${
                             order.slaStatus === 'CRITICAL' ? 'text-red-500' :
                             order.slaStatus === 'WARNING' ? 'text-amber-500' :
                             'text-emerald-500'
                          }`}>
                            {order.slaStatus}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                          <button className="group/btn flex items-center gap-2 bg-primary hover:bg-primary-600 text-white pl-3 pr-4 py-1.5 rounded-full shadow-md shadow-blue-500/20 transition-all active:scale-95">
                            <div className="bg-white/20 p-1 rounded-full">
                              <span className="material-symbols-outlined text-sm block">videocam</span>
                            </div>
                            <span className="text-xs font-bold">Action</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">
                      No orders found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing {filteredOrders.length} orders</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 text-sm rounded bg-primary text-white border border-primary">1</button>
              <button className="px-3 py-1 text-sm rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-700">2</button>
              <button className="px-3 py-1 text-sm rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-700">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Float Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3.5 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
          <span className="material-symbols-outlined">support_agent</span>
        </button>
      </div>

    </div>
  );
};

export default Orders;