import React, { useState } from 'react';

const Inventory = () => {
  // Mock Data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Turmeric Powder",
      sku: "IND-SP-001",
      category: "Spices",
      tag: "Best Seller",
      image: "https://via.placeholder.com/60",
      demand: "high", // very-high, high, stable
      stock: 150,
      price: 240.00,
      status: "Active"
    },
    {
      id: 2,
      name: "Royal Basmati Rice (5kg)",
      sku: "IND-GR-045",
      category: "Grains",
      image: "https://via.placeholder.com/60",
      demand: "high",
      stock: 5,
      price: 850.00,
      status: "Low Stock"
    },
    {
      id: 3,
      name: "Premium Kashmiri Saffron",
      sku: "IND-SP-099",
      category: "Spices",
      tag: "Premium",
      image: "https://via.placeholder.com/60",
      demand: "stable",
      stock: 0,
      price: 1200.00,
      status: "Out of Stock"
    },
    {
      id: 4,
      name: "Green Cardamom (Elaichi)",
      sku: "IND-SP-012",
      category: "Spices",
      image: "https://via.placeholder.com/60",
      demand: "growing",
      stock: 85,
      price: 450.00,
      status: "Active"
    },
    {
      id: 5,
      name: "Assam Tea Gold Blend",
      sku: "IND-BV-003",
      category: "Beverages",
      image: "https://via.placeholder.com/60",
      demand: "stable",
      stock: 340,
      price: 320.00,
      status: "Active"
    },
  ]);

  return (
    <div className="font-display text-neutral-text-main">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-text-main flex items-center gap-2">
            Smart Inventory & SKU Manager
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-semibold border border-primary/20">PRO</span>
          </h1>
          <p className="text-sm text-neutral-text-sub mt-1">Premium visual management for high-volume sellers.</p>
        </div>
        
        {/* Magic Upload Zone */}
        <div className="flex-1 max-w-lg w-full">
          <div className="rounded-xl p-4 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors group relative border-2 border-dashed border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-border group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-text-main group-hover:text-primary transition-colors">Bulk Upload Magic Zone</h3>
                  <p className="text-xs text-neutral-text-sub">Drag & drop CSV/Excel for instant validation</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" title="System Ready">check_circle</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <button className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
            <span className="material-symbols-outlined text-lg mr-1">add</span>
            Add SKU
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-neutral-border dark:border-slate-700 p-4 mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-neutral-text-sub">search</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2.5 border border-neutral-border dark:border-slate-600 rounded-lg leading-5 bg-background-light dark:bg-slate-900 text-neutral-text-main dark:text-white placeholder-neutral-text-sub focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors" 
                placeholder="Search by SKU, product name..." 
                type="text"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2.5 text-base border border-neutral-border dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg text-neutral-text-main dark:text-white shadow-sm">
                  <option>All Categories</option>
                  <option>Spices & Herbs</option>
                  <option>Grains & Rice</option>
                  <option>Beverages</option>
                  <option>Snacks</option>
                </select>
              </div>
              <div className="relative">
                <button className="flex items-center justify-between w-full pl-3 pr-4 py-2.5 text-base border border-neutral-border dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-neutral-50 dark:hover:bg-slate-700 rounded-lg text-neutral-text-main dark:text-white shadow-sm sm:text-sm">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base text-neutral-text-sub">filter_list</span> More Filters</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center border-t border-neutral-border dark:border-slate-700 pt-4">
            <span className="text-xs font-semibold text-neutral-text-sub uppercase tracking-wider mr-2">Quick Filters:</span>
            <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
              Best Sellers
              <span className="material-symbols-outlined text-sm ml-1">local_fire_department</span>
            </button>
            <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background-light dark:bg-slate-700 text-neutral-text-sub dark:text-slate-300 border border-neutral-border dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600 hover:shadow-sm transition-all">
              Private Label
            </button>
            <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background-light dark:bg-slate-700 text-neutral-text-sub dark:text-slate-300 border border-neutral-border dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600 hover:shadow-sm transition-all">
              Low Stock Alert
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
            </button>
            <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background-light dark:bg-slate-700 text-neutral-text-sub dark:text-slate-300 border border-neutral-border dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600 hover:shadow-sm transition-all">
              Promotional Items
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-neutral-border dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-border dark:divide-slate-700">
            <thead className="bg-background-light dark:bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-neutral-text-sub uppercase tracking-wider w-1/3">
                  <div className="flex items-center gap-1 cursor-pointer group">
                    Product Details
                    <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_downward</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-neutral-text-sub uppercase tracking-wider">Demand</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-neutral-text-sub uppercase tracking-wider">Stock (Quick Edit)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-neutral-text-sub uppercase tracking-wider">Price (Quick Edit)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-neutral-text-sub uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-neutral-border dark:divide-slate-700">
              {products.map((product) => (
                <tr 
                  key={product.id}
                  className={`hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group ${
                    product.status === 'Low Stock' ? 'bg-yellow-50/30 dark:bg-yellow-900/10 border-l-4 border-l-yellow-400' :
                    product.status === 'Out of Stock' ? 'opacity-70 hover:opacity-100' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden border border-neutral-border dark:border-slate-600 bg-background-light dark:bg-slate-700 shadow-sm relative">
                        <img className="h-14 w-14 object-cover hover:scale-110 transition-transform duration-300" src={product.image} alt={product.name} />
                        {product.status === 'Low Stock' && <div className="absolute inset-0 bg-yellow-400/10 pointer-events-none"></div>}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-neutral-text-main dark:text-white group-hover:text-primary transition-colors cursor-pointer">{product.name}</div>
                        <div className="text-xs text-neutral-text-sub mt-0.5">SKU: {product.sku}</div>
                        <div className="mt-1 flex gap-1">
                          <span className="text-[10px] bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300">{product.category}</span>
                          {product.tag && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                              product.tag === 'Best Seller' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-purple-50 border-purple-100 text-purple-600'
                            }`}>
                              {product.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                      product.demand === 'high' ? 'bg-red-50 border-red-100 text-red-500' :
                      product.demand === 'growing' ? 'bg-blue-50 border-blue-100 text-blue-500' :
                      'bg-green-50 border-green-100 text-green-500'
                    }`} title={`${product.demand} Demand`}>
                      <span className="material-symbols-outlined text-lg">
                        {product.demand === 'high' ? 'local_fire_department' : product.demand === 'growing' ? 'trending_up' : 'trending_flat'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 relative">
                      {product.status === 'Low Stock' && (
                        <span className="absolute -top-3 right-8 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                      )}
                      <input 
                        className={`w-20 text-sm py-1 px-2 border rounded text-neutral-text-main focus:ring-primary focus:border-primary shadow-sm text-center font-medium ${
                          product.status === 'Out of Stock' 
                            ? 'border-red-200 bg-red-50 text-red-600' 
                            : product.status === 'Low Stock'
                            ? 'border-yellow-300 text-yellow-900 bg-white'
                            : 'border-neutral-border bg-gray-50 focus:bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white'
                        }`}
                        type="number" 
                        defaultValue={product.stock}
                      />
                      <span className={`text-xs ${product.status === 'Low Stock' ? 'text-yellow-700 font-medium' : 'text-neutral-text-sub'}`}>units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 group/edit">
                      <span className="text-neutral-text-sub text-sm">₹</span>
                      <input 
                        className="w-24 text-sm py-1 px-2 border border-neutral-border dark:border-slate-600 rounded text-neutral-text-main dark:text-white focus:ring-primary focus:border-primary shadow-sm font-semibold bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600" 
                        type="number" 
                        defaultValue={product.price.toFixed(2)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                        <span className="material-symbols-outlined text-xl">save</span>
                      </button>
                      <button className="text-neutral-text-sub hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-t border-neutral-border dark:border-slate-700 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-text-sub">
                Showing <span className="font-medium text-neutral-text-main dark:text-white">1</span> to <span className="font-medium text-neutral-text-main dark:text-white">5</span> of <span className="font-medium text-neutral-text-main dark:text-white">48</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-neutral-text-sub hover:bg-neutral-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                <button className="bg-white dark:bg-slate-800 border-neutral-border dark:border-slate-600 text-neutral-text-sub hover:bg-neutral-50 dark:hover:bg-slate-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors">2</button>
                <button className="bg-white dark:bg-slate-800 border-neutral-border dark:border-slate-600 text-neutral-text-sub hover:bg-neutral-50 dark:hover:bg-slate-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors">3</button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-neutral-text-sub hover:bg-neutral-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;