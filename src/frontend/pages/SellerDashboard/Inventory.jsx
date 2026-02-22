
import React, { useState, useEffect, useRef } from 'react';
import { 
  CloudUpload, Search, Filter, Flame, TrendingUp, 
  ArrowRight, Save, Trash2, CheckCircle2, Boxes, Edit2, X, ImagePlus, Plus
} from 'lucide-react';

export default function Inventory({ products = [], setProducts, search: globalSearch = "" }) {
  const [localSearch, setLocalSearch] = useState("");
  const activeSearch = globalSearch || localSearch;

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editImages, setEditImages] = useState([]);
  const fileInputRef = useRef(null);

  // Reset page to 1 on search
  useEffect(() => { setCurrentPage(1); }, [activeSearch]);

  const handleDelete = (idToRemove) => {
    if(window.confirm("Are you sure you want to delete this SKU?")) {
       setProducts(products.filter(p => p.id !== idToRemove));
    }
  };

  // Quick save for inline edits
  const handleQuickSave = () => alert("Inventory levels saved successfully!");

  // --- EDIT MODAL LOGIC ---
  const openEditModal = (product) => {
    setEditingProduct({ ...product }); // Copy product to edit state
    // Ensure images is an array for the previewer
    setEditImages(product.images || (product.image ? [product.image] : []));
  };

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(f => f.size <= 2 * 1024 * 1024);
    
    if (validFiles.length < files.length) alert("Some files were skipped (Max 2MB).");

    Promise.all(validFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    })).then(base64Images => {
      setEditImages(prev => [...prev, ...base64Images].slice(0, 5));
    });
    e.target.value = '';
  };

  const removeEditImage = (indexToRemove) => {
    setEditImages(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    const updatedStatus = parseInt(editingProduct.stock) > 10 ? "Active" : parseInt(editingProduct.stock) > 0 ? "Low Stock" : "Out of Stock";
    
    const updatedProduct = {
      ...editingProduct,
      status: updatedStatus,
      price: parseFloat(editingProduct.price),
      stock: parseInt(editingProduct.stock),
      image: editImages.length > 0 ? editImages[0] : "https://via.placeholder.com/60",
      images: editImages
    };

    // Update global state by replacing the old product with the new one
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null); // Close modal
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(activeSearch.toLowerCase()) || 
    p.sku.toLowerCase().includes(activeSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Smart Inventory Manager
            <span className="bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">PRO</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Premium visual management for high-volume sellers.</p>
        </div>
        
        <div className="flex-1 max-w-md w-full">
          <div className="rounded-2xl p-4 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors border-2 border-dashed border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-200"><CloudUpload className="text-slate-600" size={20} /></div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Bulk Upload Magic Zone</h3>
                <p className="text-xs text-slate-500 mt-0.5">Drag & drop CSV/Excel for instant sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              value={localSearch} onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900/10 outline-none" 
              placeholder="Search by SKU, product name..." type="text"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold cursor-pointer outline-none">
              <option>All Categories</option><option>Spices & Herbs</option><option>Grains</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-700 font-bold text-sm rounded-xl"><Filter size={16}/> Filters</button>
          </div>
        </div>
      </div>

      {/* Responsive Inventory Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* MOBILE VIEW (Cards) */}
        <div className="md:hidden divide-y divide-slate-100 flex-1">
          {currentItems.length > 0 ? currentItems.map((product) => (
            <div key={product.id} className="p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-sm truncate pr-2">{product.name}</h3>
                    <button onClick={() => openEditModal(product)} className="text-slate-400 hover:text-blue-600 shrink-0"><Edit2 size={16}/></button>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{product.sku}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wide ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                    {product.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                 <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Stock (Units)</p>
                   <input type="number" defaultValue={product.stock} className="w-full p-2 text-sm font-bold border border-slate-200 rounded-lg text-center focus:ring-2 focus:ring-slate-900/10 outline-none" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Price (₹)</p>
                   <input type="number" defaultValue={product.price} className="w-full p-2 text-sm font-bold border border-slate-200 rounded-lg text-center focus:ring-2 focus:ring-slate-900/10 outline-none" />
                 </div>
              </div>

              <div className="flex gap-2">
                <button onClick={handleQuickSave} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold text-xs rounded-lg transition-colors border border-slate-200 hover:border-emerald-200"><Save size={14}/> Save</button>
                <button onClick={() => handleDelete(product.id)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-700 font-bold text-xs rounded-lg transition-colors border border-slate-200 hover:border-red-200"><Trash2 size={14}/> Delete</button>
              </div>
            </div>
          )) : (
            <div className="py-12 text-center text-slate-500"><Boxes size={32} className="mx-auto mb-2 opacity-50"/><p>No inventory matches.</p></div>
          )}
        </div>

        {/* DESKTOP VIEW (Table) */}
        <div className="hidden md:block overflow-x-auto w-full flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-4 text-sm font-bold text-slate-500 whitespace-nowrap">Product Details</th>
                <th className="p-4 text-sm font-bold text-slate-500 text-center whitespace-nowrap">Demand</th>
                <th className="p-4 text-sm font-bold text-slate-500 whitespace-nowrap">Stock (Edit)</th>
                <th className="p-4 text-sm font-bold text-slate-500 whitespace-nowrap">Price (Edit)</th>
                <th className="p-4 text-sm font-bold text-slate-500 whitespace-nowrap">Status</th>
                <th className="p-4 text-sm font-bold text-slate-500 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length > 0 ? currentItems.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{product.name}</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className={`inline-flex p-2 rounded-xl ${product.demand === 'high' ? 'bg-orange-50 text-orange-500' : product.demand === 'growing' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      {product.demand === 'high' ? <Flame size={18} /> : product.demand === 'growing' ? <TrendingUp size={18} /> : <ArrowRight size={18} />}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <input className="w-20 text-sm py-1.5 px-2 border border-slate-200 rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-slate-900/10" type="number" defaultValue={product.stock} />
                      <span className="text-xs font-medium text-slate-500">units</span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-bold text-sm">₹</span>
                      <input className="w-24 text-sm py-1.5 px-2 border border-slate-200 rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-slate-900/10" type="number" defaultValue={product.price.toFixed(2)}/>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md uppercase tracking-wide ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEditModal(product)} className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="Full Edit"><Edit2 size={18} /></button>
                      <button onClick={handleQuickSave} className="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors" title="Quick Save"><Save size={18} /></button>
                      <button onClick={() => handleDelete(product.id)} className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                 <tr><td colSpan="6" className="py-16 text-center text-slate-500"><Boxes size={32} className="mx-auto mb-3 opacity-50" /><p className="font-bold">No products match your search.</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <p className="text-sm text-slate-500 font-medium text-center sm:text-left">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0}</span> to <span className="font-bold text-slate-900">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of <span className="font-bold text-slate-900">{filteredProducts.length}</span> results
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
             <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1 || filteredProducts.length === 0} className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all">Previous</button>
             <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage >= totalPages || filteredProducts.length === 0} className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* --- EDIT PRODUCT MODAL --- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setEditingProduct(null)}></div>
          <div className="relative flex flex-col bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 shrink-0">
              <h2 className="font-bold text-slate-900 flex items-center gap-2"><Edit2 size={18}/> Edit Inventory</h2>
              <button onClick={() => setEditingProduct(null)} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"><X size={18} /></button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
              
              {/* Image Editor */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Images (Max 5)</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {editImages.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 group shadow-sm">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeEditImage(idx)} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                        <X size={18} className="text-white" />
                      </button>
                    </div>
                  ))}
                  {editImages.length < 5 && (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all">
                      <Plus size={20} />
                    </button>
                  )}
                </div>
                {editImages.length === 0 && (
                  <div onClick={() => fileInputRef.current?.click()} className="w-full py-6 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm">
                    <ImagePlus size={24} className="mb-2" />
                    <p className="text-sm font-bold">Upload images</p>
                  </div>
                )}
                <input type="file" multiple accept="image/png, image/jpeg" className="hidden" ref={fileInputRef} onChange={handleEditImageUpload} />
              </div>

              {/* Form Fields */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Product Name</label>
                <input required type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-medium transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">SKU (Read Only)</label>
                  <input type="text" value={editingProduct.sku} disabled className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium uppercase text-slate-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                  <select value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-medium cursor-pointer transition-all">
                    <option>Spices</option><option>Grains</option><option>Beverages</option><option>General</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Price (₹)</label>
                  <input required type="number" min="0" step="0.01" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Stock Level</label>
                  <input required type="number" min="0" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold transition-all" />
                </div>
              </div>

              <div className="pt-2 flex gap-3 mt-4">
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-3 font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm">Cancel</button>
                <button type="submit" className="flex-1 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all">Update Product</button>
              </div>
              <div className="h-60 w-full md:hidden shrink-0"></div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}