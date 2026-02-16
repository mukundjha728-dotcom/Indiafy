import React from 'react';

const Dashboard = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Welcome back! You have <span className="text-indigo-600 dark:text-indigo-400 font-bold">12 pending orders</span> to process today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all relative group">
            <span className="absolute top-2.5 right-3 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-800 animate-pulse"></span>
            <span className="material-symbols-outlined group-hover:animate-swing">notifications</span>
          </button>
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <button className="px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold shadow-sm">Today</button>
            <button className="px-4 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Week</button>
            <button className="px-4 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Month</button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {/* Card 1: Orders */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between z-10 relative">
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Today's Orders</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">24</p>
              <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> +12% vs yest.
              </div>
            </div>
            <div className="relative h-16 w-16">
              <svg className="h-full w-full" height="36" viewBox="0 0 36 36" width="36">
                <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-indigo-500 progress-ring__circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-indigo-500">shopping_cart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Revenue */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between z-10 relative">
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Revenue</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">₹12,450</p>
              <div className="mt-4 flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-full w-fit">
                Goal: ₹15k
              </div>
            </div>
            <div className="relative h-16 w-16">
              <svg className="h-full w-full" height="36" viewBox="0 0 36 36" width="36">
                <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-emerald-500 progress-ring__circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="82, 100" strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-500">currency_rupee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Pickups */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-l-4 border-l-amber-500 bg-white dark:bg-slate-800 border-y border-r border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[80px] text-amber-500">local_shipping</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <span className="bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Action Needed</span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Pending Pickups</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">4</p>
          </div>
        </div>

        {/* Card 4: SLA Alerts */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-l-4 border-l-rose-500 bg-white dark:bg-slate-800 border-y border-r border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[80px] text-rose-500">warning</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600 dark:text-rose-400">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <span className="bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide animate-pulse">Urgent</span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">SLA Alerts</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">1</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Table & Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Order Table */}
        <div className="xl:col-span-2 space-y-8">
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Live Order Feed
                </h2>
                <p className="text-xs text-slate-500 mt-1">Real-time updates on your fulfillment status.</p>
              </div>
              <div className="flex gap-2">
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px] group-focus-within:text-indigo-500 transition-colors">search</span>
                  <input className="pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-full sm:w-56 transition-all shadow-sm" placeholder="Search Order ID..." type="text" />
                </div>
                <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm hover:shadow-md transition-all">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                    <th className="px-6 py-4">Order Info</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Items</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 bg-white dark:bg-slate-800">
                  {/* Row 1 */}
                  <tr className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 transition-colors">#ORD-3492</span>
                        <span className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">schedule</span> Today, 10:23 AM
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">2 items</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white text-sm">₹1,240</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold text-xs border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg hover:shadow-sm transition-all">Review</button>
                    </td>
                  </tr>
                  
                  {/* Row 2: Alert */}
                  <tr className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors bg-red-50/40 dark:bg-red-900/10 border-l-4 border-l-red-500">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">#ORD-3488</span>
                        <span className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1 uppercase tracking-wide">
                          <span className="material-symbols-outlined text-[12px] animate-pulse">timer</span> Breaching Soon
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Packing
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">1 item</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white text-sm">₹850</td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-1 ml-auto">
                        <span className="material-symbols-outlined text-[14px]">videocam</span> Resume
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">#ORD-3475</span>
                        <span className="text-[11px] text-slate-500 mt-1">Yesterday, 6:45 PM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 ring-1 ring-indigo-200 dark:ring-indigo-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        Awaiting Pickup
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">4 items</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white text-sm">₹3,100</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">print</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">#ORD-3462</span>
                        <span className="text-[11px] text-slate-500 mt-1">Yesterday, 4:12 PM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">1 item</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white text-sm">₹450</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold hover:underline">Track</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 text-center border-t border-slate-200 dark:border-slate-700 mt-auto">
              <a className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 uppercase tracking-wider inline-flex items-center gap-1 transition-colors group" href="#">
                View All Orders <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Stats */}
        <div className="space-y-8">
          
          {/* Quick Actions */}
          <div className="glass-card rounded-2xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-500">bolt</span> Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full group bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl p-4 flex items-center justify-between shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-lg backdrop-blur-sm">
                    <span className="material-symbols-outlined">videocam</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Start Packing</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-90 font-medium">AI Video Mode</div>
                  </div>
                </div>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button className="w-full group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:ring-1 hover:ring-indigo-500/50 text-slate-700 dark:text-slate-200 rounded-xl p-4 flex items-center justify-between transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2.5 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <span className="material-symbols-outlined">add_box</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Add New Product</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Inventory update</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 transition-colors">chevron_right</span>
              </button>
              <button className="w-full group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:ring-1 hover:ring-indigo-500/50 text-slate-700 dark:text-slate-200 rounded-xl p-4 flex items-center justify-between transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="bg-rose-50 dark:bg-rose-900/30 p-2.5 rounded-lg text-rose-600 dark:text-rose-400">
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Create Promotion</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Boost traffic</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 transition-colors">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Weekly Sales */}
          <div className="glass-card rounded-2xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Weekly Sales</h2>
                <p className="text-xs text-slate-500">Last 7 days performance</p>
              </div>
              <button className="text-slate-400 hover:text-indigo-500 transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="h-48 w-full relative">
              <div className="absolute inset-0 flex items-end justify-between px-2 pb-6">
                <div className="w-2 h-[40%] bg-indigo-100 dark:bg-indigo-900/20 rounded-t-full"></div>
                <div className="w-2 h-[60%] bg-indigo-100 dark:bg-indigo-900/20 rounded-t-full"></div>
                <div className="w-2 h-[45%] bg-indigo-100 dark:bg-indigo-900/20 rounded-t-full"></div>
                <div className="w-2 h-[75%] bg-indigo-100 dark:bg-indigo-900/20 rounded-t-full"></div>
                <div className="w-2 h-[55%] bg-indigo-100 dark:bg-indigo-900/20 rounded-t-full"></div>
                <div className="w-2 h-[85%] bg-indigo-100 dark:bg-indigo-900/20 rounded-t-full"></div>
                <div className="w-2 h-[95%] bg-indigo-500 rounded-t-full shadow-lg shadow-indigo-500/40"></div>
              </div>
              <svg className="absolute inset-0 w-full h-full pb-6 px-2 pointer-events-none drop-shadow-md" preserveAspectRatio="none" viewBox="0 0 100 50">
                <path d="M0,35 Q15,20 25,30 T50,15 T75,25 T100,5" fill="none" stroke="#6366f1" strokeLinecap="round" strokeWidth="2"></path>
                <circle cx="100" cy="5" fill="#ffffff" r="3" stroke="#6366f1" strokeWidth="2"></circle>
              </svg>
              <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-bold text-slate-400 px-1 uppercase">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span className="text-indigo-600 dark:text-indigo-400">S</span>
              </div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 p-6 text-white shadow-xl ring-1 ring-white/10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 shadow-inner">
                  <span className="material-symbols-outlined text-yellow-400">verified_user</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base">Elite Trust Score</h3>
                  <p className="text-[11px] text-indigo-200">Top 5% of sellers</p>
                </div>
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-[10px] font-medium text-indigo-200 mb-1">
                  <span>Packing Quality</span>
                  <span className="text-white">98%</span>
                </div>
                <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// // // // import React from 'react';

// // // // const Dashboard = () => {
// // // //   return (
// // // //     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-4 lg:p-8 transition-colors duration-500">
// // // //       {/* Header Section */}
// // // //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
// // // //         <div>
// // // //           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
// // // //             Overview<span className="text-violet-600">.</span>
// // // //           </h1>
// // // //           <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-2">
// // // //             <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
// // // //             You have <span className="text-slate-900 dark:text-slate-100 font-bold decoration-violet-500/30 underline decoration-2">12 pending orders</span> today.
// // // //           </p>
// // // //         </div>
        
// // // //         <div className="flex items-center gap-4">
// // // //           <button className="relative p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-400 hover:text-violet-600 transition-all shadow-sm hover:shadow-violet-500/10">
// // // //             <span className="absolute top-3 right-3.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white dark:border-slate-800"></span>
// // // //             <span className="material-symbols-outlined scale-110">notifications</span>
// // // //           </button>
          
// // // //           <div className="flex bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-inner">
// // // //             {['Today', 'Week', 'Month'].map((tab) => (
// // // //               <button 
// // // //                 key={tab}
// // // //                 className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
// // // //                   tab === 'Today' 
// // // //                   ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-white shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-600' 
// // // //                   : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
// // // //                 }`}
// // // //               >
// // // //                 {tab}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Stats Grid */}
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
// // // //         {/* Card 1: Orders */}
// // // //         <StatCard 
// // // //           label="Today's Orders" 
// // // //           value="24" 
// // // //           trend="+12%" 
// // // //           icon="shopping_bag" 
// // // //           color="violet" 
// // // //           progress={75}
// // // //         />
// // // //         {/* Card 2: Revenue */}
// // // //         <StatCard 
// // // //           label="Total Revenue" 
// // // //           value="₹12,450" 
// // // //           trend="Goal: ₹15k" 
// // // //           icon="payments" 
// // // //           color="emerald" 
// // // //           progress={82}
// // // //         />
// // // //         {/* Card 3: Pending */}
// // // //         <StatCard 
// // // //           label="Pending Pickups" 
// // // //           value="04" 
// // // //           icon="local_shipping" 
// // // //           color="amber" 
// // // //           isAlert
// // // //         />
// // // //         {/* Card 4: Urgent */}
// // // //         <StatCard 
// // // //           label="SLA Alerts" 
// // // //           value="01" 
// // // //           icon="priority_high" 
// // // //           color="rose" 
// // // //           isUrgent
// // // //         />
// // // //       </div>

// // // //       {/* Main Grid */}
// // // //       <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
// // // //         <div className="xl:col-span-2">
// // // //           <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
// // // //             <div className="p-8 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
// // // //               <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Live Order Feed</h2>
// // // //               <div className="relative group">
// // // //                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-violet-500 transition-colors">search</span>
// // // //                 <input 
// // // //                   className="pl-12 pr-6 py-3 text-sm border-none bg-slate-100 dark:bg-slate-900/50 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500/20 outline-none w-full sm:w-72 transition-all" 
// // // //                   placeholder="Find an order..." 
// // // //                 />
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="overflow-x-auto">
// // // //               <table className="w-full text-left">
// // // //                 <thead>
// // // //                   <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50 dark:border-slate-700/30">
// // // //                     <th className="px-8 py-5">Order Detail</th>
// // // //                     <th className="px-8 py-5">Status</th>
// // // //                     <th className="px-8 py-5">Items</th>
// // // //                     <th className="px-8 py-5 text-right">Amount</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30">
// // // //                    <OrderRow id="#ORD-3492" time="10:23 AM" status="Pending" items="2" price="₹1,240" statusColor="slate" />
// // // //                    <OrderRow id="#ORD-3488" time="Breaching" status="Packing" items="1" price="₹850" statusColor="amber" isUrgent />
// // // //                    <OrderRow id="#ORD-3475" time="6:45 PM" status="Awaiting" items="4" price="₹3,100" statusColor="violet" />
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
// // // //             <div className="p-6 bg-slate-50/50 dark:bg-slate-900/20 text-center">
// // // //                <button className="text-sm font-bold text-violet-600 hover:text-violet-700 dark:text-violet-400 transition-all flex items-center gap-2 mx-auto">
// // // //                  Explore Detailed History <span className="material-symbols-outlined text-base">north_east</span>
// // // //                </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Sidebar Actions */}
// // // //         <div className="space-y-8">
// // // //           <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-2xl shadow-violet-500/20 relative overflow-hidden group">
// // // //             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
// // // //               <span className="material-symbols-outlined text-[160px]">rocket_launch</span>
// // // //             </div>
// // // //             <h2 className="text-2xl font-bold mb-2">Boost Sales</h2>
// // // //             <p className="text-violet-100 text-sm mb-8 leading-relaxed">Launch a new marketing campaign or discount to increase your reach.</p>
// // // //             <button className="w-full bg-white text-violet-600 font-bold py-4 rounded-2xl shadow-lg hover:bg-violet-50 transition-all transform hover:-translate-y-1">
// // // //               Create Promotion
// // // //             </button>
// // // //           </div>

// // // //           <div className="bg-white dark:bg-slate-800/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-700/50 shadow-xl">
// // // //             <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-6">Quick Tools</h3>
// // // //             <div className="space-y-4">
// // // //               <QuickAction icon="videocam" title="Start Packing" subtitle="AI Video Monitoring" color="violet" />
// // // //               <QuickAction icon="add_box" title="Add Product" subtitle="Manual Entry" color="emerald" />
// // // //               <QuickAction icon="support_agent" title="Support Chat" subtitle="2 Active Queries" color="rose" />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // Sub-components for cleaner code
// // // // const StatCard = ({ label, value, trend, icon, color, progress, isAlert, isUrgent }) => {
// // // //   const colors = {
// // // //     violet: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20',
// // // //     emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
// // // //     amber: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
// // // //     rose: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20',
// // // //   };

// // // //   return (
// // // //     <div className={`p-7 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group`}>
// // // //       <div className="flex justify-between items-start">
// // // //         <div>
// // // //           <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mb-2">{label}</p>
// // // //           <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
// // // //           {trend && (
// // // //             <div className={`mt-4 text-[10px] font-bold px-3 py-1 rounded-full w-fit ${colors[color]}`}>
// // // //               {trend}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //         <div className={`p-3 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform duration-500`}>
// // // //           <span className="material-symbols-outlined">{icon}</span>
// // // //         </div>
// // // //       </div>
// // // //       {progress && (
// // // //         <div className="mt-6 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
// // // //           <div className={`h-full rounded-full transition-all duration-1000 ${color === 'violet' ? 'bg-violet-500' : 'bg-emerald-500'}`} style={{ width: `${progress}%` }}></div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // const OrderRow = ({ id, time, status, items, price, statusColor, isUrgent }) => (
// // // //   <tr className={`group hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-all ${isUrgent ? 'bg-rose-50/30 dark:bg-rose-900/10' : ''}`}>
// // // //     <td className="px-8 py-6">
// // // //       <div className="flex flex-col">
// // // //         <span className="font-bold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">{id}</span>
// // // //         <span className="text-[10px] text-slate-400 font-medium mt-1">{time}</span>
// // // //       </div>
// // // //     </td>
// // // //     <td className="px-8 py-6">
// // // //       <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
// // // //         statusColor === 'violet' ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-600' : 
// // // //         statusColor === 'amber' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600' :
// // // //         'bg-slate-100 dark:bg-slate-700 text-slate-500'
// // // //       }`}>
// // // //         {status}
// // // //       </span>
// // // //     </td>
// // // //     <td className="px-8 py-6 text-sm font-bold text-slate-600 dark:text-slate-400">{items} Items</td>
// // // //     <td className="px-8 py-6 text-right font-black text-slate-900 dark:text-white">{price}</td>
// // // //   </tr>
// // // // );

// // // // const QuickAction = ({ icon, title, subtitle, color }) => (
// // // //   <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
// // // //     <div className={`p-3 rounded-xl ${color === 'violet' ? 'bg-violet-50 text-violet-600' : color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} group-hover:scale-110 transition-transform`}>
// // // //       <span className="material-symbols-outlined">{icon}</span>
// // // //     </div>
// // // //     <div className="text-left">
// // // //       <div className="font-bold text-slate-900 dark:text-white text-sm">{title}</div>
// // // //       <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{subtitle}</div>
// // // //     </div>
// // // //     <span className="material-symbols-outlined ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-all">chevron_right</span>
// // // //   </button>
// // // // );

// // // // export default Dashboard;


// // // import React from 'react';

// // // const Dashboard = () => {
// // //   return (
// // //     <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 p-4 lg:p-10 font-sans selection:bg-slate-900 selection:text-white">
// // //       {/* Header Section */}
// // //       <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
// // //         <div>
// // //           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Management Portal</span>
// // //           <h1 className="text-4xl font-light tracking-tighter mt-1">
// // //             System <span className="font-black">Overview</span>
// // //           </h1>
// // //         </div>
        
// // //         <div className="flex items-center gap-6">
// // //           <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-full border border-slate-200 dark:border-slate-800">
// // //             {['Overview', 'Analysis', 'Reports'].map((tab) => (
// // //               <button 
// // //                 key={tab}
// // //                 className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
// // //                   tab === 'Overview' 
// // //                   ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm' 
// // //                   : 'text-slate-400 hover:text-slate-600'
// // //                 }`}
// // //               >
// // //                 {tab}
// // //               </button>
// // //             ))}
// // //           </div>
// // //           <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
// // //             <span className="material-symbols-outlined text-xl">settings</span>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Stats Grid */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
// // //         <GreyStat label="Active Orders" value="24" icon="orders" growth="+12%" />
// // //         <GreyStat label="Daily Revenue" value="₹12,450" icon="database" growth="+5.2%" />
// // //         <GreyStat label="Logistics" value="04" icon="trolley" subtitle="Pending Pickup" />
// // //         <GreyStat label="System Health" value="99.8%" icon="shield" subtitle="Optimal" />
// // //       </div>

// // //       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
// // //         {/* Table Section */}
// // //         <div className="xl:col-span-2">
// // //           <div className="bg-white dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-100/50 dark:shadow-none overflow-hidden">
// // //             <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
// // //               <h3 className="font-bold tracking-tight">Recent Activity</h3>
// // //               <button className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors">
// // //                 DOWNLOAD CSV <span className="material-symbols-outlined text-sm">download</span>
// // //               </button>
// // //             </div>
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full text-left">
// // //                 <thead>
// // //                   <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-900">
// // //                     <th className="px-8 py-4">Reference</th>
// // //                     <th className="px-8 py-4">Status</th>
// // //                     <th className="px-8 py-4 text-right">Value</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
// // //                   <GreyRow id="ORD-7721" status="Processing" price="₹4,200" />
// // //                   <GreyRow id="ORD-7719" status="Dispatched" price="₹1,150" />
// // //                   <GreyRow id="ORD-7718" status="Delivered" price="₹8,900" />
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Action Sidebar */}
// // //         <div className="space-y-6">
// // //           <div className="p-8 rounded-3xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 relative overflow-hidden">
// // //             <div className="relative z-10">
// // //               <h4 className="text-lg font-bold mb-2">Inventory Sync</h4>
// // //               <p className="text-slate-400 dark:text-slate-500 text-sm mb-6 leading-relaxed">Your stock levels are currently synced with the global database.</p>
// // //               <button className="w-full py-4 bg-white dark:bg-slate-950 text-slate-950 dark:text-white font-bold rounded-2xl hover:opacity-90 transition-opacity">
// // //                 Run Manual Sync
// // //               </button>
// // //             </div>
// // //             <div className="absolute -right-6 -top-6 h-32 w-32 bg-slate-800 dark:bg-slate-100 rounded-full blur-3xl opacity-50"></div>
// // //           </div>

// // //           <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111]">
// // //             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Quick Actions</h4>
// // //             <div className="space-y-2">
// // //               <GreyAction icon="add" label="Register New Unit" />
// // //               <GreyAction icon="mail" label="Customer Outreach" />
// // //               <GreyAction icon="history" label="Audit Logs" />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Minimalist Sub-components
// // // const GreyStat = ({ label, value, growth, subtitle, icon }) => (
// // //   <div className="p-8 rounded-3xl bg-white dark:bg-[#111] border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all group">
// // //     <div className="flex justify-between items-start mb-4">
// // //       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
// // //       {growth && <span className="text-[10px] font-bold text-emerald-600">{growth}</span>}
// // //     </div>
// // //     <div className="flex items-end justify-between">
// // //       <h3 className="text-3xl font-light tracking-tighter text-slate-900 dark:text-white">{value}</h3>
// // //       {subtitle && <span className="text-[10px] font-bold text-slate-400 uppercase italic">{subtitle}</span>}
// // //     </div>
// // //   </div>
// // // );

// // // const GreyRow = ({ id, status, price }) => (
// // //   <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer">
// // //     <td className="px-8 py-6 font-bold text-sm tracking-tight">{id}</td>
// // //     <td className="px-8 py-6">
// // //       <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-slate-500">
// // //         <span className="h-1 w-1 rounded-full bg-slate-400"></span>
// // //         {status}
// // //       </span>
// // //     </td>
// // //     <td className="px-8 py-6 text-right font-mono font-bold text-sm">{price}</td>
// // //   </tr>
// // // );

// // // const GreyAction = ({ icon, label }) => (
// // //   <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all group">
// // //     <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
// // //       {icon}
// // //     </span>
// // //     <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
// // //       {label}
// // //     </span>
// // //   </button>
// // // );

// // // export default Dashboard;


// // import React from 'react';

// // const Dashboard = () => {
// //   return (
// //     <div className="min-h-screen bg-[#f4f4f5] dark:bg-[#09090b] text-[#18181b] dark:text-[#f4f4f5] p-6 lg:p-12 font-sans antialiased">
// //       {/* Subtle Background Glows */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-slate-200/50 dark:bg-slate-800/20 blur-[120px] rounded-full"></div>
// //         <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-zinc-200/50 dark:bg-zinc-800/10 blur-[100px] rounded-full"></div>
// //       </div>

// //       <div className="relative z-10 max-w-7xl mx-auto">
// //         {/* Header: Minimal & Spaced */}
// //         <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
// //           <div>
// //             <h1 className="text-sm font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-500 mb-2">Nexus Console</h1>
// //             <p className="text-4xl font-extralight tracking-tightest text-zinc-900 dark:text-white">
// //               System <span className="font-medium">Intelligence</span>
// //             </p>
// //           </div>
          
// //           <div className="flex items-center gap-3 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md p-1.5 rounded-2xl border border-white dark:border-zinc-800 shadow-sm">
// //             <button className="px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl shadow-zinc-500/20 transition-all">Today</button>
// //             <button className="px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all">Analytics</button>
// //           </div>
// //         </header>

// //         {/* Stats Section: Using 'Glass' tiles */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
// //           <PremiumStat label="Throughput" value="84.2" unit="%" trend="up" />
// //           <PremiumStat label="Daily Rev" value="12,450" unit="INR" trend="up" />
// //           <PremiumStat label="Latency" value="24" unit="MS" trend="down" />
// //           <PremiumStat label="Queue" value="04" unit="Unit" />
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
// //           {/* Table: Clean White/Dark Contrast */}
// //           <div className="lg:col-span-8 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
// //             <div className="p-8 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/50">
// //               <h2 className="text-lg font-semibold tracking-tight">Active Operations</h2>
// //               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
// //             </div>
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead>
// //                   <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
// //                     <th className="px-10 py-6 text-left">Identifier</th>
// //                     <th className="px-10 py-6 text-left">Condition</th>
// //                     <th className="px-10 py-6 text-right">Magnitude</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
// //                   <PremiumRow id="X-7721" status="Synchronized" value="4,200" />
// //                   <PremiumRow id="X-7719" status="Pending" value="1,150" />
// //                   <PremiumRow id="X-7718" status="Complete" value="8,900" />
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>

// //           {/* Right Panel: High Contrast Action */}
// //           <div className="lg:col-span-4 space-y-6">
// //             <div className="p-10 rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-2xl relative overflow-hidden group">
// //               <div className="relative z-10">
// //                 <h3 className="text-xl font-bold mb-4">Core Action</h3>
// //                 <p className="text-zinc-400 dark:text-zinc-500 text-sm leading-relaxed mb-8">Execute a global system refresh to recalibrate all active inventory nodes.</p>
// //                 <button className="w-full py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] transition-transform">
// //                   Initiate Refresh
// //                 </button>
// //               </div>
// //               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 dark:bg-black/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
// //             </div>

// //             <div className="p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md">
// //               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Utility</h4>
// //               <div className="space-y-4">
// //                 <PremiumAction icon="terminal" label="System Logs" />
// //                 <PremiumAction icon="database" label="Data Export" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Sub-components with Premium Styling ---

// // const PremiumStat = ({ label, value, unit, trend }) => (
// //   <div className="p-8 rounded-[2rem] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-white dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all group">
// //     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">{label}</p>
// //     <div className="flex items-baseline gap-1">
// //       <span className="text-4xl font-light tracking-tighter">{value}</span>
// //       <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">{unit}</span>
// //     </div>
// //     {trend && (
// //       <div className={`mt-4 h-1 w-12 rounded-full ${trend === 'up' ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
// //     )}
// //   </div>
// // );

// // const PremiumRow = ({ id, status, value }) => (
// //   <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group cursor-pointer">
// //     <td className="px-10 py-7 font-medium text-sm tracking-tight">{id}</td>
// //     <td className="px-10 py-7">
// //       <div className="flex items-center gap-3">
// //         <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-colors"></div>
// //         <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{status}</span>
// //       </div>
// //     </td>
// //     <td className="px-10 py-7 text-right font-mono font-bold text-sm">₹{value}</td>
// //   </tr>
// // );

// // const PremiumAction = ({ icon, label }) => (
// //   <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 shadow-none hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all group border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700">
// //     <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">{icon}</span>
// //     <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{label}</span>
// //   </button>
// // );

// // export default Dashboard;


// import React, { useState } from 'react';
// import { 
//   TrendingUp, 
//   Package, 
//   DollarSign, 
//   Users, 
//   ArrowUpRight, 
//   Bell, 
//   Search, 
//   MoreHorizontal,
//   ChevronRight,
//   Plus,
//   ShieldCheck,
//   Zap
// } from 'lucide-react';

// const App = () => {
//   const [activeTab, setActiveTab] = useState('Overview');

//   return (
//     <div className="min-h-screen bg-[#F8F8F9] dark:bg-[#0C0C0E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-950 selection:text-white">
//       {/* Top Navigation Bar */}
//       <nav className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60">
//         <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-8">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-zinc-950 dark:bg-white rounded-lg flex items-center justify-center">
//                 <div className="w-4 h-4 bg-white dark:bg-zinc-950 rounded-sm rotate-45" />
//               </div>
//               <span className="font-bold tracking-tighter text-lg uppercase">Studio.</span>
//             </div>
            
//             <div className="hidden md:flex items-center gap-1">
//               {['Overview', 'Inventory', 'Customers', 'Marketing'].map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => setActiveTab(item)}
//                   className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
//                     activeTab === item 
//                     ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' 
//                     : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative hidden sm:block">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search analytics..." 
//                 className="pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-zinc-950/10 dark:focus:ring-white/10 outline-none transition-all"
//               />
//             </div>
//             <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 relative">
//               <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-zinc-950 dark:bg-white rounded-full border-2 border-white dark:border-zinc-900" />
//             </button>
//             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700" />
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-[1600px] mx-auto px-6 py-10">
//         {/* Welcome Header */}
//         <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <div>
//             <h2 className="text-zinc-400 text-xs font-black uppercase tracking-[0.3em] mb-2">Merchant Dashboard</h2>
//             <h1 className="text-4xl font-light tracking-tightest">Good Morning, <span className="font-semibold text-zinc-950 dark:text-white">Alex</span></h1>
//           </div>
//           <div className="flex gap-3">
//             <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
//               Export Data
//             </button>
//             <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-bold hover:opacity-90 transition-all">
//               <Plus className="w-4 h-4" /> Add Product
//             </button>
//           </div>
//         </header>

//         {/* Primary Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           <MetricCard 
//             label="Total Revenue" 
//             value="₹1,24,500" 
//             trend="+14.2%" 
//             icon={<DollarSign className="w-5 h-5" />}
//           />
//           <MetricCard 
//             label="Active Orders" 
//             value="142" 
//             trend="+5.1%" 
//             icon={<Package className="w-5 h-5" />}
//           />
//           <MetricCard 
//             label="Store Visitors" 
//             value="12,840" 
//             trend="+12.4%" 
//             icon={<Users className="w-5 h-5" />}
//           />
//           <MetricCard 
//             label="Conversion Rate" 
//             value="3.24%" 
//             trend="-0.4%" 
//             icon={<TrendingUp className="w-5 h-5" />}
//             isNegative
//           />
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
//           {/* Main Chart/Feed Section */}
//           <div className="xl:col-span-8 space-y-8">
//             <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2rem] p-8 shadow-sm">
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h3 className="text-lg font-bold tracking-tight">Sales Performance</h3>
//                   <p className="text-sm text-zinc-500">Revenue flow across the last 7 business days.</p>
//                 </div>
//                 <select className="bg-zinc-50 dark:bg-zinc-800 text-xs font-bold border-none rounded-lg px-3 py-2 outline-none">
//                   <option>Last 7 Days</option>
//                   <option>Last 30 Days</option>
//                 </select>
//               </div>
              
//               {/* Visual Simulated Chart Area */}
//               <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
//                 {[45, 60, 40, 80, 55, 90, 70].map((height, i) => (
//                   <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
//                     <div className="w-full relative">
//                       <div 
//                         style={{ height: `${height}%` }} 
//                         className={`w-full rounded-t-xl transition-all duration-500 group-hover:bg-zinc-950 dark:group-hover:bg-white ${
//                           i === 5 ? 'bg-zinc-950 dark:bg-white' : 'bg-zinc-100 dark:bg-zinc-800'
//                         }`}
//                       />
//                     </div>
//                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Orders Table */}
//             <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2rem] overflow-hidden shadow-sm">
//               <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
//                 <h3 className="font-bold tracking-tight">Recent Orders</h3>
//                 <button className="text-xs font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors">VIEW ALL</button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] border-b border-zinc-50 dark:border-zinc-800">
//                       <th className="px-8 py-4">Customer</th>
//                       <th className="px-8 py-4">Status</th>
//                       <th className="px-8 py-4 text-right">Value</th>
//                       <th className="px-8 py-4"></th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
//                     <OrderRow name="Julian Casablancas" email="j.casa@voidz.com" status="Delivered" amount="₹2,400" />
//                     <OrderRow name="SZA Carter" email="topdawg@sza.io" status="Processing" amount="₹1,150" />
//                     <OrderRow name="Kevin Parker" email="tame@impala.au" status="Shipped" amount="₹8,900" />
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="xl:col-span-4 space-y-8">
//             {/* Seller Health Card */}
//             <div className="bg-zinc-950 dark:bg-white p-8 rounded-[2rem] text-white dark:text-zinc-950 shadow-2xl relative overflow-hidden group">
//               <div className="relative z-10">
//                 <div className="flex items-center gap-2 mb-6">
//                   <ShieldCheck className="w-5 h-5 text-zinc-400" />
//                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Seller Health</span>
//                 </div>
//                 <div className="flex items-end gap-2 mb-2">
//                   <h4 className="text-5xl font-light tracking-tighter">Elite</h4>
//                   <ArrowUpRight className="w-6 h-6 mb-2 text-zinc-400" />
//                 </div>
//                 <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8 leading-relaxed">Your account is in the top 2% of performance this month. Keep it up.</p>
//                 <div className="w-full h-1 bg-white/10 dark:bg-zinc-900/10 rounded-full overflow-hidden">
//                   <div className="w-[92%] h-full bg-white dark:bg-zinc-900" />
//                 </div>
//               </div>
//               {/* Decorative Circle */}
//               <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5 dark:bg-zinc-950/5 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
//             </div>

//             {/* Quick Actions List */}
//             <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2rem] p-8 shadow-sm">
//               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Store Actions</h3>
//               <div className="space-y-2">
//                 <ActionItem icon={<Zap className="w-4 h-4" />} label="Quick Promotion" />
//                 <ActionItem icon={<Plus className="w-4 h-4" />} label="Bulk Upload" />
//                 <ActionItem icon={<Users className="w-4 h-4" />} label="Customer Export" />
//               </div>
//             </div>

//             {/* Support Message */}
//             <div className="p-8 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
//               <p className="text-sm text-zinc-500 mb-4">Need help with your listings?</p>
//               <button className="text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-white underline underline-offset-8">Talk to an Agent</button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// // --- Elegant Sub-components ---

// const MetricCard = ({ label, value, trend, icon, isNegative }) => (
//   <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all duration-500 group">
//     <div className="flex justify-between items-start mb-6">
//       <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
//         {icon}
//       </div>
//       <div className={`flex items-center gap-1 text-[11px] font-bold ${isNegative ? 'text-rose-500' : 'text-emerald-600'}`}>
//         {trend}
//       </div>
//     </div>
//     <div>
//       <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
//       <h3 className="text-3xl font-light tracking-tighter text-zinc-900 dark:text-white">{value}</h3>
//     </div>
//   </div>
// );

// const OrderRow = ({ name, email, status, amount }) => (
//   <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors group">
//     <td className="px-8 py-6">
//       <div className="flex flex-col">
//         <span className="text-sm font-bold text-zinc-900 dark:text-white">{name}</span>
//         <span className="text-[11px] text-zinc-400">{email}</span>
//       </div>
//     </td>
//     <td className="px-8 py-6">
//       <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
//         status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 
//         status === 'Processing' ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' : 
//         'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20'
//       }`}>
//         {status}
//       </span>
//     </td>
//     <td className="px-8 py-6 text-right font-mono font-bold text-sm text-zinc-900 dark:text-white">
//       {amount}
//     </td>
//     <td className="px-8 py-6 text-right">
//       <button className="p-2 text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors">
//         <MoreHorizontal className="w-5 h-5" />
//       </button>
//     </td>
//   </tr>
// );

// const ActionItem = ({ icon, label }) => (
//   <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group">
//     <div className="flex items-center gap-4">
//       <div className="text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
//         {icon}
//       </div>
//       <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
//         {label}
//       </span>
//     </div>
//     <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-1 transition-all" />
//   </button>
// );

// export default App;