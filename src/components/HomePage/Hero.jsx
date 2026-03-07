// // // // // // // // import { ArrowRight, MapPin } from "lucide-react";
// // // // // // // // import { motion } from "framer-motion";

// // // // // // // // function Hero() {
// // // // // // // //   return (
// // // // // // // //     <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
// // // // // // // //       {/* Background Blurs */}
// // // // // // // //       <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
// // // // // // // //       <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

// // // // // // // //       <motion.div
// // // // // // // //         initial={{ opacity: 0, y: 40 }}
// // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // //         transition={{ duration: 0.8, ease: "easeOut" }}
// // // // // // // //         className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-16 items-center"
// // // // // // // //       >
// // // // // // // //         {/* LEFT SIDE */}
// // // // // // // //         <div>
// // // // // // // //           <motion.div
// // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // //             transition={{ delay: 0.2, duration: 0.6 }}
// // // // // // // //             className="flex items-center gap-2 text-sm text-gray-600 mb-6"
// // // // // // // //           >
// // // // // // // //             <MapPin size={16} />
// // // // // // // //             Now Live Across West Gurugram
// // // // // // // //           </motion.div>

// // // // // // // //           <motion.h1
// // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // //             transition={{ delay: 0.3, duration: 0.6 }}
// // // // // // // //             className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
// // // // // // // //           >
// // // // // // // //             West Gurugram’s
// // // // // // // //             <br />
// // // // // // // //             <span className="text-blue-600">Hyperlocal Commerce Platform</span>
// // // // // // // //           </motion.h1>

// // // // // // // //           <motion.p
// // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // //             transition={{ delay: 0.4, duration: 0.6 }}
// // // // // // // //             className="mt-6 text-lg text-gray-600 max-w-xl"
// // // // // // // //           >
// // // // // // // //             Discover curated stores across West Gurugram. Browse real
// // // // // // // //             inventories. Order with confidence. Powered by structured delivery
// // // // // // // //             partnerships.
// // // // // // // //           </motion.p>

// // // // // // // //           <motion.div
// // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // //             transition={{ delay: 0.5, duration: 0.6 }}
// // // // // // // //             className="mt-10 flex flex-wrap gap-4"
// // // // // // // //           >
// // // // // // // //             <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
// // // // // // // //               Start Shopping
// // // // // // // //               <ArrowRight size={20} />
// // // // // // // //             </button>

// // // // // // // //             <button className="px-8 py-3 border border-gray-300 rounded-xl text-lg font-medium hover:bg-gray-100 transition">
// // // // // // // //               Become a Seller
// // // // // // // //             </button>
// // // // // // // //           </motion.div>
// // // // // // // //         </div>

// // // // // // // //         {/* RIGHT SIDE */}
// // // // // // // //         <motion.div
// // // // // // // //           initial={{ opacity: 0, x: 60 }}
// // // // // // // //           animate={{ opacity: 1, x: 0 }}
// // // // // // // //           transition={{ delay: 0.4, duration: 0.8 }}
// // // // // // // //           className="relative flex justify-center"
// // // // // // // //         >
// // // // // // // //           {/* Floating Animation Wrapper */}
// // // // // // // //           <motion.div
// // // // // // // //             animate={{ y: [0, -10, 0] }}
// // // // // // // //             transition={{
// // // // // // // //               duration: 6,
// // // // // // // //               repeat: Infinity,
// // // // // // // //               ease: "easeInOut",
// // // // // // // //             }}
// // // // // // // //             className="bg-white rounded-3xl shadow-2xl p-6 border w-full max-w-md"
// // // // // // // //           >
// // // // // // // //             <div className="text-lg font-semibold mb-4">
// // // // // // // //               Trending Categories
// // // // // // // //             </div>

// // // // // // // //             <div className="grid grid-cols-2 gap-4">
// // // // // // // //               {["Grocery", "Pharmacy", "Garments", "Essentials"].map(
// // // // // // // //                 (item, index) => (
// // // // // // // //                   <div
// // // // // // // //                     key={index}
// // // // // // // //                     className="bg-gray-50 p-5 rounded-xl border text-center font-medium hover:bg-white hover:shadow-md transition"
// // // // // // // //                   >
// // // // // // // //                     {item}
// // // // // // // //                   </div>
// // // // // // // //                 ),
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </motion.div>

// // // // // // // //           {/* Floating Badge 1 */}
// // // // // // // //           <motion.div
// // // // // // // //             animate={{ y: [0, 8, 0] }}
// // // // // // // //             transition={{
// // // // // // // //               duration: 5,
// // // // // // // //               repeat: Infinity,
// // // // // // // //               ease: "easeInOut",
// // // // // // // //             }}
// // // // // // // //             className="hidden md:block absolute -top-6 -left-10 bg-white shadow-lg px-4 py-2 rounded-xl border text-sm font-medium"
// // // // // // // //           >
// // // // // // // //             50+ Curated Stores
// // // // // // // //           </motion.div>

// // // // // // // //           {/* Floating Badge 2 */}
// // // // // // // //           <motion.div
// // // // // // // //             animate={{ y: [0, -8, 0] }}
// // // // // // // //             transition={{
// // // // // // // //               duration: 7,
// // // // // // // //               repeat: Infinity,
// // // // // // // //               ease: "easeInOut",
// // // // // // // //             }}
// // // // // // // //             className="hidden md:block absolute -bottom-6 -right-10 bg-white shadow-lg px-4 py-2 rounded-xl border text-sm font-medium"
// // // // // // // //           >
// // // // // // // //             Fast Delivery Partners
// // // // // // // //           </motion.div>
// // // // // // // //         </motion.div>
// // // // // // // //       </motion.div>
// // // // // // // //     </section>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default Hero;



// // // // // // // import { ArrowRight, MapPin, ShoppingCart, Pill, Shirt, Package, Star, ShieldCheck } from "lucide-react";
// // // // // // // import { motion } from "framer-motion";

// // // // // // // // Custom easing for a premium, buttery-smooth feel
// // // // // // // const elegantEase = [0.16, 1, 0.3, 1];

// // // // // // // function Hero() {
// // // // // // //   const categories = [
// // // // // // //     { name: "Grocery", icon: <ShoppingCart size={20} className="text-blue-500" /> },
// // // // // // //     { name: "Pharmacy", icon: <Pill size={20} className="text-indigo-500" /> },
// // // // // // //     { name: "Garments", icon: <Shirt size={20} className="text-purple-500" /> },
// // // // // // //     { name: "Essentials", icon: <Package size={20} className="text-teal-500" /> },
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <section className="relative overflow-hidden bg-white min-h-[90vh] flex items-center">
// // // // // // //       {/* Premium Background Gradient & Blur Effects */}
// // // // // // //       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-80" />
// // // // // // //       <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px]" />
// // // // // // //       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px]" />

// // // // // // //       <motion.div
// // // // // // //         initial={{ opacity: 0, y: 40 }}
// // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // //         transition={{ duration: 1, ease: elegantEase }}
// // // // // // //         className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full"
// // // // // // //       >
// // // // // // //         {/* LEFT SIDE: Copy & CTA */}
// // // // // // //         <div className="max-w-2xl">
// // // // // // //           <motion.div
// // // // // // //             initial={{ opacity: 0, scale: 0.95 }}
// // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // //             transition={{ delay: 0.2, duration: 0.8, ease: elegantEase }}
// // // // // // //             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm border border-blue-100 mb-8 shadow-sm"
// // // // // // //           >
// // // // // // //             <span className="relative flex h-2.5 w-2.5">
// // // // // // //               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
// // // // // // //               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
// // // // // // //             </span>
// // // // // // //             <MapPin size={14} />
// // // // // // //             Now Live Across West Gurugram
// // // // // // //           </motion.div>

// // // // // // //           <motion.h1
// // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ delay: 0.3, duration: 0.8, ease: elegantEase }}
// // // // // // //             className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
// // // // // // //           >
// // // // // // //             West Gurugram’s <br />
// // // // // // //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
// // // // // // //               Hyperlocal Commerce
// // // // // // //             </span>
// // // // // // //           </motion.h1>

// // // // // // //           <motion.p
// // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ delay: 0.4, duration: 0.8, ease: elegantEase }}
// // // // // // //             className="mt-6 text-xl text-slate-600 leading-relaxed font-light"
// // // // // // //           >
// // // // // // //             Discover curated stores in your neighborhood. Browse real-time
// // // // // // //             inventories, order with absolute confidence, and experience seamless deliveries.
// // // // // // //           </motion.p>

// // // // // // //           <motion.div
// // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ delay: 0.5, duration: 0.8, ease: elegantEase }}
// // // // // // //             className="mt-10 flex flex-wrap gap-4 items-center"
// // // // // // //           >
// // // // // // //             <button className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
// // // // // // //               Start Shopping
// // // // // // //               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// // // // // // //             </button>

// // // // // // //             <button className="px-8 py-4 rounded-full text-lg font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
// // // // // // //               Become a Seller
// // // // // // //             </button>
// // // // // // //           </motion.div>
// // // // // // //         </div>

// // // // // // //         {/* RIGHT SIDE: Interactive / Floating Visuals */}
// // // // // // //         <motion.div
// // // // // // //           initial={{ opacity: 0, x: 40 }}
// // // // // // //           animate={{ opacity: 1, x: 0 }}
// // // // // // //           transition={{ delay: 0.4, duration: 1, ease: elegantEase }}
// // // // // // //           className="relative flex justify-center lg:justify-end"
// // // // // // //         >
// // // // // // //           {/* Main Floating Glass Card */}
// // // // // // //           <motion.div
// // // // // // //             animate={{ y: [-8, 8, -8] }}
// // // // // // //             transition={{
// // // // // // //               duration: 6,
// // // // // // //               repeat: Infinity,
// // // // // // //               ease: "easeInOut",
// // // // // // //             }}
// // // // // // //             className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 border border-white/50 w-full max-w-md z-10"
// // // // // // //           >
// // // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // // //               <h3 className="text-xl font-bold text-slate-800">Trending Now</h3>
// // // // // // //               <div className="flex gap-1">
// // // // // // //                 {[...Array(3)].map((_, i) => (
// // // // // // //                   <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             <div className="grid grid-cols-2 gap-4">
// // // // // // //               {categories.map((item, index) => (
// // // // // // //                 <motion.div
// // // // // // //                   key={index}
// // // // // // //                   whileHover={{ scale: 1.03 }}
// // // // // // //                   className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-colors hover:border-blue-100 hover:bg-blue-50/30"
// // // // // // //                 >
// // // // // // //                   <div className="p-3 bg-slate-50 rounded-xl">
// // // // // // //                     {item.icon}
// // // // // // //                   </div>
// // // // // // //                   <span className="font-semibold text-slate-700 text-sm">
// // // // // // //                     {item.name}
// // // // // // //                   </span>
// // // // // // //                 </motion.div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           </motion.div>

// // // // // // //           {/* Floating Badge 1: Curated Stores */}
// // // // // // //           <motion.div
// // // // // // //             animate={{ y: [0, 10, 0] }}
// // // // // // //             transition={{
// // // // // // //               duration: 5,
// // // // // // //               repeat: Infinity,
// // // // // // //               ease: "easeInOut",
// // // // // // //               delay: 1,
// // // // // // //             }}
// // // // // // //             className="hidden md:flex absolute -top-8 -left-12 bg-white/90 backdrop-blur-md shadow-xl px-5 py-3 rounded-2xl border border-white/50 items-center gap-3 z-20"
// // // // // // //           >
// // // // // // //             <div className="bg-yellow-100 p-2 rounded-full">
// // // // // // //               <Star size={16} className="text-yellow-600" fill="currentColor" />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <div className="text-sm font-bold text-slate-800">50+ Stores</div>
// // // // // // //               <div className="text-xs text-slate-500 font-medium">Curated Quality</div>
// // // // // // //             </div>
// // // // // // //           </motion.div>

// // // // // // //           {/* Floating Badge 2: Delivery */}
// // // // // // //           <motion.div
// // // // // // //             animate={{ y: [0, -10, 0] }}
// // // // // // //             transition={{
// // // // // // //               duration: 7,
// // // // // // //               repeat: Infinity,
// // // // // // //               ease: "easeInOut",
// // // // // // //               delay: 2,
// // // // // // //             }}
// // // // // // //             className="hidden md:flex absolute -bottom-10 -right-8 bg-white/90 backdrop-blur-md shadow-xl px-5 py-3 rounded-2xl border border-white/50 items-center gap-3 z-20"
// // // // // // //           >
// // // // // // //             <div className="bg-green-100 p-2 rounded-full">
// // // // // // //               <ShieldCheck size={16} className="text-green-600" />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <div className="text-sm font-bold text-slate-800">Verified Delivery</div>
// // // // // // //               <div className="text-xs text-slate-500 font-medium">Fast & Secure</div>
// // // // // // //             </div>
// // // // // // //           </motion.div>
          
// // // // // // //         </motion.div>
// // // // // // //       </motion.div>
// // // // // // //     </section>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default Hero;


// // // // // // import { useState, useEffect } from "react";
// // // // // // import { ArrowRight, MapPin, ShoppingCart, Pill, Shirt, Package, Star, ShieldCheck } from "lucide-react";
// // // // // // import { motion, AnimatePresence } from "framer-motion";

// // // // // // const elegantEase = [0.16, 1, 0.3, 1];

// // // // // // // High-quality placeholder images for the background
// // // // // // const backgroundImages = [
// // // // // //   "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2000&auto=format&fit=crop", // Premium Grocery
// // // // // //   "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop", // Retail/Garments
// // // // // //   "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=2000&auto=format&fit=crop", // Essentials/Pharmacy
// // // // // // ];

// // // // // // function Hero() {
// // // // // //   const [currentImg, setCurrentImg] = useState(0);

// // // // // //   // Background Image Slider Logic
// // // // // //   useEffect(() => {
// // // // // //     const timer = setInterval(() => {
// // // // // //       setCurrentImg((prev) => (prev + 1) % backgroundImages.length);
// // // // // //     }, 5000); // Changes image every 5 seconds
// // // // // //     return () => clearInterval(timer);
// // // // // //   }, []);

// // // // // //   const categories = [
// // // // // //     { name: "Grocery", icon: <ShoppingCart size={20} className="text-blue-400" /> },
// // // // // //     { name: "Pharmacy", icon: <Pill size={20} className="text-indigo-400" /> },
// // // // // //     { name: "Garments", icon: <Shirt size={20} className="text-purple-400" /> },
// // // // // //     { name: "Essentials", icon: <Package size={20} className="text-teal-400" /> },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-slate-900">
      
// // // // // //       {/* BACKGROUND SLIDER */}
// // // // // //       <div className="absolute inset-0 z-0">
// // // // // //         <AnimatePresence mode="popLayout">
// // // // // //           <motion.img
// // // // // //             key={currentImg}
// // // // // //             src={backgroundImages[currentImg]}
// // // // // //             initial={{ opacity: 0, scale: 1.05 }}
// // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // //             exit={{ opacity: 0 }}
// // // // // //             transition={{ duration: 1.5, ease: "easeInOut" }}
// // // // // //             className="absolute inset-0 w-full h-full object-cover"
// // // // // //             alt="Background Slide"
// // // // // //           />
// // // // // //         </AnimatePresence>
        
// // // // // //         {/* Classy Dark Gradient Overlay for text readability */}
// // // // // //         <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
// // // // // //       </div>

// // // // // //       {/* CONTENT */}
// // // // // //       <motion.div
// // // // // //         initial={{ opacity: 0, y: 40 }}
// // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // //         transition={{ duration: 1, ease: elegantEase }}
// // // // // //         className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full"
// // // // // //       >
// // // // // //         {/* LEFT SIDE: Copy & CTA */}
// // // // // //         <div className="max-w-2xl">
// // // // // //           <motion.div
// // // // // //             initial={{ opacity: 0, scale: 0.95 }}
// // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // //             transition={{ delay: 0.2, duration: 0.8, ease: elegantEase }}
// // // // // //             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-300 font-medium text-sm border border-white/20 mb-8 backdrop-blur-md"
// // // // // //           >
// // // // // //             <span className="relative flex h-2.5 w-2.5">
// // // // // //               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
// // // // // //               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
// // // // // //             </span>
// // // // // //             <MapPin size={14} />
// // // // // //             Now Live Across West Gurugram
// // // // // //           </motion.div>

// // // // // //           <motion.h1
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ delay: 0.3, duration: 0.8, ease: elegantEase }}
// // // // // //             className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
// // // // // //           >
// // // // // //             West Gurugram’s <br />
// // // // // //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
// // // // // //               Hyperlocal Commerce
// // // // // //             </span>
// // // // // //           </motion.h1>

// // // // // //           <motion.p
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ delay: 0.4, duration: 0.8, ease: elegantEase }}
// // // // // //             className="mt-6 text-xl text-slate-300 leading-relaxed font-light"
// // // // // //           >
// // // // // //             Discover curated stores in your neighborhood. Browse real-time
// // // // // //             inventories, order with absolute confidence, and experience seamless deliveries.
// // // // // //           </motion.p>

// // // // // //           <motion.div
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ delay: 0.5, duration: 0.8, ease: elegantEase }}
// // // // // //             className="mt-10 flex flex-wrap gap-4 items-center"
// // // // // //           >
// // // // // //             <button className="group flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5">
// // // // // //               Start Shopping
// // // // // //               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// // // // // //             </button>

// // // // // //             <button className="px-8 py-4 rounded-full text-lg font-medium text-white hover:text-white bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all backdrop-blur-sm">
// // // // // //               Become a Seller
// // // // // //             </button>
// // // // // //           </motion.div>
// // // // // //         </div>

// // // // // //         {/* RIGHT SIDE: Interactive / Floating Visuals */}
// // // // // //         <motion.div
// // // // // //           initial={{ opacity: 0, x: 40 }}
// // // // // //           animate={{ opacity: 1, x: 0 }}
// // // // // //           transition={{ delay: 0.4, duration: 1, ease: elegantEase }}
// // // // // //           className="relative flex justify-center lg:justify-end"
// // // // // //         >
// // // // // //           {/* Main Floating Glass Card */}
// // // // // //           <motion.div
// // // // // //             animate={{ y: [-8, 8, -8] }}
// // // // // //             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
// // // // // //             className="bg-slate-900/40 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-8 border border-white/10 w-full max-w-md z-10"
// // // // // //           >
// // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // //               <h3 className="text-xl font-bold text-white">Trending Now</h3>
// // // // // //               <div className="flex gap-1">
// // // // // //                 {[...Array(3)].map((_, i) => (
// // // // // //                   <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div className="grid grid-cols-2 gap-4">
// // // // // //               {categories.map((item, index) => (
// // // // // //                 <motion.div
// // // // // //                   key={index}
// // // // // //                   whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
// // // // // //                   className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-colors"
// // // // // //                 >
// // // // // //                   <div className="p-3 bg-white/10 rounded-xl">
// // // // // //                     {item.icon}
// // // // // //                   </div>
// // // // // //                   <span className="font-semibold text-slate-200 text-sm">
// // // // // //                     {item.name}
// // // // // //                   </span>
// // // // // //                 </motion.div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </motion.div>

// // // // // //           {/* Floating Badge 1: Curated Stores */}
// // // // // //           <motion.div
// // // // // //             animate={{ y: [0, 10, 0] }}
// // // // // //             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
// // // // // //             className="hidden md:flex absolute -top-8 -left-12 bg-slate-800/80 backdrop-blur-xl shadow-xl px-5 py-3 rounded-2xl border border-white/10 items-center gap-3 z-20"
// // // // // //           >
// // // // // //             <div className="bg-yellow-500/20 p-2 rounded-full">
// // // // // //               <Star size={16} className="text-yellow-400" fill="currentColor" />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <div className="text-sm font-bold text-white">50+ Stores</div>
// // // // // //               <div className="text-xs text-slate-400 font-medium">Curated Quality</div>
// // // // // //             </div>
// // // // // //           </motion.div>

// // // // // //           {/* Floating Badge 2: Delivery */}
// // // // // //           <motion.div
// // // // // //             animate={{ y: [0, -10, 0] }}
// // // // // //             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
// // // // // //             className="hidden md:flex absolute -bottom-10 -right-8 bg-slate-800/80 backdrop-blur-xl shadow-xl px-5 py-3 rounded-2xl border border-white/10 items-center gap-3 z-20"
// // // // // //           >
// // // // // //             <div className="bg-green-500/20 p-2 rounded-full">
// // // // // //               <ShieldCheck size={16} className="text-green-400" />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <div className="text-sm font-bold text-white">Verified Delivery</div>
// // // // // //               <div className="text-xs text-slate-400 font-medium">Fast & Secure</div>
// // // // // //             </div>
// // // // // //           </motion.div>
          
// // // // // //         </motion.div>
// // // // // //       </motion.div>
// // // // // //     </section>
// // // // // //   );
// // // // // // }

// // // // // // export default Hero;


// // // // // import { useState, useEffect } from "react";
// // // // // import { 
// // // // //   MapPin, 
// // // // //   Search, 
// // // // //   ShoppingCart, 
// // // // //   Pill, 
// // // // //   Shirt, 
// // // // //   Package, 
// // // // //   Star, 
// // // // //   Clock 
// // // // // } from "lucide-react";
// // // // // import { motion, AnimatePresence } from "framer-motion";

// // // // // const elegantEase = [0.16, 1, 0.3, 1];

// // // // // const backgroundImages = [
// // // // //   "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2500&auto=format&fit=crop", 
// // // // //   "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2500&auto=format&fit=crop", 
// // // // //   "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2500&auto=format&fit=crop", 
// // // // // ];

// // // // // function Hero() {
// // // // //   const [currentImg, setCurrentImg] = useState(0);

// // // // //   useEffect(() => {
// // // // //     const timer = setInterval(() => {
// // // // //       setCurrentImg((prev) => (prev + 1) % backgroundImages.length);
// // // // //     }, 5000);
// // // // //     return () => clearInterval(timer);
// // // // //   }, []);

// // // // //   const categories = [
// // // // //     { name: "Grocery", desc: "Fresh daily", icon: <ShoppingCart size={24} className="text-emerald-500" />, color: "bg-emerald-50" },
// // // // //     { name: "Pharmacy", desc: "Fast meds", icon: <Pill size={24} className="text-blue-500" />, color: "bg-blue-50" },
// // // // //     { name: "Garments", desc: "Top trends", icon: <Shirt size={24} className="text-purple-500" />, color: "bg-purple-50" },
// // // // //     { name: "Essentials", desc: "Daily needs", icon: <Package size={24} className="text-orange-500" />, color: "bg-orange-50" },
// // // // //   ];

// // // // //   return (
// // // // //     <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gray-50">
      
// // // // //       {/* BACKGROUND SLIDER */}
// // // // //       <div className="absolute inset-0 z-0">
// // // // //         <AnimatePresence mode="popLayout">
// // // // //           <motion.img
// // // // //             key={currentImg}
// // // // //             src={backgroundImages[currentImg]}
// // // // //             initial={{ opacity: 0, scale: 1.05 }}
// // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // //             exit={{ opacity: 0 }}
// // // // //             transition={{ duration: 1.5, ease: "easeInOut" }}
// // // // //             className="absolute inset-0 w-full h-full object-cover"
// // // // //             alt="Background Slide"
// // // // //           />
// // // // //         </AnimatePresence>
        
// // // // //         {/* Bright Gradient Overlay for text readability & airy feel */}
// // // // //         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 md:to-transparent backdrop-blur-[2px]" />
// // // // //       </div>

// // // // //       {/* CONTENT */}
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 40 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 1, ease: elegantEase }}
// // // // //         className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full"
// // // // //       >
// // // // //         {/* LEFT SIDE: Copy & Interactive Search */}
// // // // //         <div className="max-w-2xl">
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, scale: 0.95 }}
// // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // //             transition={{ delay: 0.2, duration: 0.8, ease: elegantEase }}
// // // // //             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm border border-emerald-200 mb-8 shadow-sm"
// // // // //           >
// // // // //             <span className="relative flex h-2.5 w-2.5">
// // // // //               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
// // // // //               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
// // // // //             </span>
// // // // //             <MapPin size={14} />
// // // // //             Delivering to West Gurugram
// // // // //           </motion.div>

// // // // //           <motion.h1
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ delay: 0.3, duration: 0.8, ease: elegantEase }}
// // // // //             className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
// // // // //           >
// // // // //             Everything you need, <br />
// // // // //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
// // // // //               delivered fast.
// // // // //             </span>
// // // // //           </motion.h1>

// // // // //           <motion.p
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ delay: 0.4, duration: 0.8, ease: elegantEase }}
// // // // //             className="mt-6 text-xl text-slate-600 leading-relaxed font-medium max-w-lg"
// // // // //           >
// // // // //             Shop real-time inventories from the best local stores in your neighborhood.
// // // // //           </motion.p>

// // // // //           {/* High-Converting Search Bar */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ delay: 0.5, duration: 0.8, ease: elegantEase }}
// // // // //             className="mt-10 max-w-md"
// // // // //           >
// // // // //             <div className="flex items-center bg-white p-2 rounded-full shadow-xl border border-slate-100 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
// // // // //               <div className="pl-4 pr-2 text-slate-400">
// // // // //                 <Search size={20} />
// // // // //               </div>
// // // // //               <input 
// // // // //                 type="text" 
// // // // //                 placeholder="Search for groceries, medicines..." 
// // // // //                 className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 w-full"
// // // // //               />
// // // // //               <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md">
// // // // //                 Search
// // // // //               </button>
// // // // //             </div>
// // // // //           </motion.div>

// // // // //           {/* Social Proof / Trust Indicators */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0 }}
// // // // //             animate={{ opacity: 1 }}
// // // // //             transition={{ delay: 0.7, duration: 0.8 }}
// // // // //             className="mt-10 flex items-center gap-4"
// // // // //           >
// // // // //             <div className="flex -space-x-3">
// // // // //               {[
// // // // //                 "https://i.pravatar.cc/100?img=1",
// // // // //                 "https://i.pravatar.cc/100?img=2",
// // // // //                 "https://i.pravatar.cc/100?img=3",
// // // // //                 "https://i.pravatar.cc/100?img=4"
// // // // //               ].map((src, i) => (
// // // // //                 <img key={i} src={src} alt="Customer" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
// // // // //               ))}
// // // // //             </div>
// // // // //             <div className="text-sm">
// // // // //               <div className="flex items-center gap-1 text-yellow-500">
// // // // //                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
// // // // //               </div>
// // // // //               <span className="font-semibold text-slate-700">10,000+</span> <span className="text-slate-500">happy neighbors</span>
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         </div>

// // // // //         {/* RIGHT SIDE: Interactive App-like Grid */}
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, x: 40 }}
// // // // //           animate={{ opacity: 1, x: 0 }}
// // // // //           transition={{ delay: 0.4, duration: 1, ease: elegantEase }}
// // // // //           className="relative flex justify-center lg:justify-end hidden md:flex"
// // // // //         >
// // // // //           {/* Floating Glass Container */}
// // // // //           <motion.div
// // // // //             animate={{ y: [-5, 5, -5] }}
// // // // //             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
// // // // //             className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 border border-white w-full max-w-md z-10"
// // // // //           >
// // // // //             <div className="flex items-center justify-between mb-6">
// // // // //               <h3 className="text-lg font-bold text-slate-800">Shop by Category</h3>
// // // // //             </div>

// // // // //             <div className="grid grid-cols-2 gap-4">
// // // // //               {categories.map((item, index) => (
// // // // //                 <motion.div
// // // // //                   key={index}
// // // // //                   whileHover={{ scale: 1.05, y: -2 }}
// // // // //                   whileTap={{ scale: 0.95 }}
// // // // //                   className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start gap-3 cursor-pointer transition-all hover:shadow-md"
// // // // //                 >
// // // // //                   <div className={`p-3 rounded-xl ${item.color}`}>
// // // // //                     {item.icon}
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <span className="block font-bold text-slate-800 leading-tight">
// // // // //                       {item.name}
// // // // //                     </span>
// // // // //                     <span className="text-xs text-slate-500 font-medium">
// // // // //                       {item.desc}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </motion.div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </motion.div>

// // // // //           {/* Floating Badge: Delivery Time */}
// // // // //           <motion.div
// // // // //             animate={{ y: [0, -10, 0] }}
// // // // //             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
// // // // //             className="absolute -top-6 -left-8 bg-white backdrop-blur-md shadow-xl px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-3 z-20"
// // // // //           >
// // // // //             <div className="bg-orange-100 p-2 rounded-full">
// // // // //               <Clock size={18} className="text-orange-600" />
// // // // //             </div>
// // // // //             <div>
// // // // //               <div className="text-sm font-bold text-slate-800">15-Min Delivery</div>
// // // // //               <div className="text-xs text-slate-500 font-medium">On essential items</div>
// // // // //             </div>
// // // // //           </motion.div>
          
// // // // //         </motion.div>
// // // // //       </motion.div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // // export default Hero;


// // // // import { useState, useEffect } from "react";
// // // // import { 
// // // //   MapPin, 
// // // //   Search, 
// // // //   ShoppingCart, 
// // // //   Pill, 
// // // //   Shirt, 
// // // //   Package, 
// // // //   Star, 
// // // //   ChevronRight 
// // // // } from "lucide-react";
// // // // import { motion, AnimatePresence } from "framer-motion";

// // // // // Slower, more deliberate easing for a high-end feel
// // // // const editorialEase = [0.25, 1, 0.5, 1];

// // // // const backgroundImages = [
// // // //   "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2500&auto=format&fit=crop", 
// // // //   "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2500&auto=format&fit=crop", 
// // // //   "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2500&auto=format&fit=crop", 
// // // // ];

// // // // function Hero() {
// // // //   const [currentImg, setCurrentImg] = useState(0);

// // // //   useEffect(() => {
// // // //     const timer = setInterval(() => {
// // // //       setCurrentImg((prev) => (prev + 1) % backgroundImages.length);
// // // //     }, 6000); // Slowed down to 6 seconds for a calmer feel
// // // //     return () => clearInterval(timer);
// // // //   }, []);

// // // //   const categories = [
// // // //     { name: "Artisan Grocery", icon: <ShoppingCart size={22} strokeWidth={1.5} /> },
// // // //     { name: "Apothecary", icon: <Pill size={22} strokeWidth={1.5} /> },
// // // //     { name: "Apparel", icon: <Shirt size={22} strokeWidth={1.5} /> },
// // // //     { name: "Home Essentials", icon: <Package size={22} strokeWidth={1.5} /> },
// // // //   ];

// // // //   return (
// // // //     <section className="relative overflow-hidden min-h-[95vh] flex items-center bg-stone-50 selection:bg-zinc-900 selection:text-white">
      
// // // //       {/* BACKGROUND SLIDER */}
// // // //       <div className="absolute inset-0 z-0">
// // // //         <AnimatePresence mode="popLayout">
// // // //           <motion.img
// // // //             key={currentImg}
// // // //             src={backgroundImages[currentImg]}
// // // //             initial={{ opacity: 0, scale: 1.03 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             exit={{ opacity: 0 }}
// // // //             transition={{ duration: 2, ease: "easeInOut" }}
// // // //             className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
// // // //             alt="Curated Background"
// // // //           />
// // // //         </AnimatePresence>
        
// // // //         {/* Elegant warm gradient overlay */}
// // // //         <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/95 to-transparent backdrop-blur-[1px]" />
// // // //       </div>

// // // //       {/* CONTENT */}
// // // //       <motion.div
// // // //         initial={{ opacity: 0, y: 30 }}
// // // //         animate={{ opacity: 1, y: 0 }}
// // // //         transition={{ duration: 1.2, ease: editorialEase }}
// // // //         className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-16 items-center w-full"
// // // //       >
// // // //         {/* LEFT SIDE: Copy & Search (Takes up 7 columns) */}
// // // //         <div className="lg:col-span-7 max-w-2xl">
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             transition={{ delay: 0.3, duration: 1 }}
// // // //             className="flex items-center gap-3 text-zinc-500 font-medium text-xs uppercase tracking-widest mb-8"
// // // //           >
// // // //             <span className="relative flex h-2 w-2">
// // // //               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
// // // //               <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-800"></span>
// // // //             </span>
// // // //             <MapPin size={14} strokeWidth={1.5} />
// // // //             Serving West Gurugram
// // // //           </motion.div>

// // // //           <motion.h1
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 0.4, duration: 1, ease: editorialEase }}
// // // //             className="text-6xl lg:text-7xl font-light text-zinc-900 leading-[1.05] tracking-tight"
// // // //           >
// // // //             The neighborhood, <br />
// // // //             <span className="font-serif italic text-zinc-600">curated for you.</span>
// // // //           </motion.h1>

// // // //           <motion.p
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 0.5, duration: 1, ease: editorialEase }}
// // // //             className="mt-8 text-lg text-zinc-600 leading-relaxed font-light max-w-md"
// // // //           >
// // // //             Experience a refined selection of local purveyors. Premium groceries, apothecary essentials, and boutique apparel, delivered with care.
// // // //           </motion.p>

// // // //           {/* Minimalist Editorial Search */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 0.6, duration: 1, ease: editorialEase }}
// // // //             className="mt-12 max-w-md"
// // // //           >
// // // //             <div className="flex items-center border-b border-zinc-300 pb-3 focus-within:border-zinc-900 transition-colors group">
// // // //               <div className="pr-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
// // // //                 <Search size={20} strokeWidth={1.5} />
// // // //               </div>
// // // //               <input 
// // // //                 type="text" 
// // // //                 placeholder="Search the collection..." 
// // // //                 className="flex-1 bg-transparent border-none outline-none text-zinc-900 placeholder-zinc-400 w-full font-light"
// // // //               />
// // // //               <button className="text-zinc-900 flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-zinc-500 transition-colors">
// // // //                 Explore <ChevronRight size={16} strokeWidth={1.5} />
// // // //               </button>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Refined Social Proof */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             transition={{ delay: 0.8, duration: 1 }}
// // // //             className="mt-16 flex items-center gap-5"
// // // //           >
// // // //             <div className="flex -space-x-4">
// // // //               {[
// // // //                 "https://i.pravatar.cc/100?img=5",
// // // //                 "https://i.pravatar.cc/100?img=9",
// // // //                 "https://i.pravatar.cc/100?img=8",
// // // //               ].map((src, i) => (
// // // //                 <img key={i} src={src} alt="Client" className="w-12 h-12 rounded-full border-2 border-stone-50 grayscale hover:grayscale-0 transition-all duration-500" />
// // // //               ))}
// // // //             </div>
// // // //             <div className="text-sm border-l border-zinc-200 pl-5">
// // // //               <div className="flex items-center gap-1 text-zinc-800 mb-1">
// // // //                 {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
// // // //               </div>
// // // //               <span className="font-light text-zinc-500">Trusted by 10k+ residents</span>
// // // //             </div>
// // // //           </motion.div>
// // // //         </div>

// // // //         {/* RIGHT SIDE: Minimalist Floating Nav (Takes up 5 columns) */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, x: 30 }}
// // // //           animate={{ opacity: 1, x: 0 }}
// // // //           transition={{ delay: 0.6, duration: 1.2, ease: editorialEase }}
// // // //           className="lg:col-span-5 relative flex justify-end hidden md:flex"
// // // //         >
// // // //           <motion.div
// // // //             animate={{ y: [-3, 3, -3] }}
// // // //             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// // // //             className="bg-white/40 backdrop-blur-2xl p-2 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-sm"
// // // //           >
// // // //             <div className="bg-white/60 rounded-2xl p-6">
// // // //               <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-6 text-center">
// // // //                 Select a Category
// // // //               </h3>

// // // //               <div className="flex flex-col gap-2">
// // // //                 {categories.map((item, index) => (
// // // //                   <motion.div
// // // //                     key={index}
// // // //                     whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.8)" }}
// // // //                     className="group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-zinc-100 hover:shadow-sm"
// // // //                   >
// // // //                     <div className="flex items-center gap-4 text-zinc-600 group-hover:text-zinc-900 transition-colors">
// // // //                       <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
// // // //                         {item.icon}
// // // //                       </div>
// // // //                       <span className="font-medium">{item.name}</span>
// // // //                     </div>
// // // //                     <ChevronRight size={16} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
// // // //                   </motion.div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>
// // // //         </motion.div>
// // // //       </motion.div>
// // // //     </section>
// // // //   );
// // // // }

// // // // export default Hero;


// // // import { MapPin, Search, ShoppingBag, Pill, Shirt, Zap, Rocket, Star } from "lucide-react";
// // // import { motion } from "framer-motion";

// // // function Hero() {
// // //   const categories = [
// // //     { 
// // //       name: "Supermart", 
// // //       time: "10 mins", 
// // //       icon: <ShoppingBag size={28} className="text-white" />, 
// // //       bg: "bg-gradient-to-br from-pink-500 to-rose-500",
// // //       shadow: "shadow-pink-300/50"
// // //     },
// // //     { 
// // //       name: "Pharmacy", 
// // //       time: "15 mins", 
// // //       icon: <Pill size={28} className="text-white" />, 
// // //       bg: "bg-gradient-to-br from-cyan-400 to-blue-500",
// // //       shadow: "shadow-blue-300/50"
// // //     },
// // //     { 
// // //       name: "Fashion", 
// // //       time: "Same day", 
// // //       icon: <Shirt size={28} className="text-white" />, 
// // //       bg: "bg-gradient-to-br from-violet-500 to-purple-600",
// // //       shadow: "shadow-purple-300/50"
// // //     },
// // //     { 
// // //       name: "Electronics", 
// // //       time: "2 hours", 
// // //       icon: <Zap size={28} className="text-white" />, 
// // //       bg: "bg-gradient-to-br from-amber-400 to-orange-500",
// // //       shadow: "shadow-orange-300/50"
// // //     },
// // //   ];

// // //   return (
// // //     <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-white">
      
// // //       {/* VIBRANT BACKGROUND BLOBS */}
// // //       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
// // //         <motion.div 
// // //           animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
// // //           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// // //           className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60" 
// // //         />
// // //         <motion.div 
// // //           animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 50, 0] }}
// // //           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
// // //           className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60" 
// // //         />
// // //         <motion.div 
// // //           animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -40, 0] }}
// // //           transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
// // //           className="absolute -bottom-[20%] left-[20%] w-[500px] h-[500px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60" 
// // //         />
// // //       </div>

// // //       {/* CONTENT */}
// // //       <motion.div
// // //         initial={{ opacity: 0 }}
// // //         animate={{ opacity: 1 }}
// // //         className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full"
// // //       >
// // //         {/* LEFT SIDE: Copy & Search */}
// // //         <div className="max-w-2xl">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.5, y: 20 }}
// // //             animate={{ opacity: 1, scale: 1, y: 0 }}
// // //             transition={{ type: "spring", stiffness: 200, damping: 20 }}
// // //             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg shadow-blue-100 text-blue-600 font-bold text-sm border border-blue-50 mb-8"
// // //           >
// // //             <Rocket size={18} className="text-pink-500" />
// // //             Superfast Delivery in West Gurugram
// // //           </motion.div>

// // //           <motion.h1
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 0.2, duration: 0.6 }}
// // //             className="text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
// // //           >
// // //             Skip the wait. <br />
// // //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
// // //               Get it instantly.
// // //             </span>
// // //           </motion.h1>

// // //           <motion.p
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 0.3, duration: 0.6 }}
// // //             className="mt-6 text-xl text-slate-600 font-medium max-w-lg"
// // //           >
// // //             Groceries, gadgets, fashion, and pharmacy. If you need it, we are already on the way.
// // //           </motion.p>

// // //           {/* Chunky, Vibrant Search Bar */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 0.4, duration: 0.6 }}
// // //             className="mt-10 max-w-lg"
// // //           >
// // //             <div className="flex items-center bg-white p-3 rounded-2xl shadow-xl shadow-purple-100 border-2 border-purple-50 focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-100 transition-all">
// // //               <div className="pl-3 pr-2 text-purple-400">
// // //                 <Search size={24} />
// // //               </div>
// // //               <input 
// // //                 type="text" 
// // //                 placeholder="What are you looking for?" 
// // //                 className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-lg font-medium"
// // //               />
// // //               <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1 transition-all active:scale-95">
// // //                 Find it
// // //               </button>
// // //             </div>
// // //           </motion.div>

// // //           {/* Social Proof */}
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             transition={{ delay: 0.6 }}
// // //             className="mt-10 flex items-center gap-3"
// // //           >
// // //             <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1.5 rounded-lg border border-yellow-200">
// // //               <Star size={16} className="text-yellow-600" fill="currentColor" />
// // //               <span className="font-bold text-yellow-700">4.9/5</span>
// // //             </div>
// // //             <span className="text-slate-500 font-medium text-sm">
// // //               Loved by <strong>10,000+</strong> users in your area
// // //             </span>
// // //           </motion.div>
// // //         </div>

// // //         {/* RIGHT SIDE: Bouncy Grid */}
// // //         <motion.div
// // //           initial={{ opacity: 0, scale: 0.8 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
// // //           className="relative hidden lg:grid grid-cols-2 gap-6"
// // //         >
// // //           {categories.map((item, index) => (
// // //             <motion.div
// // //               key={index}
// // //               whileHover={{ y: -10, scale: 1.02 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               className={`relative bg-white p-6 rounded-3xl border-2 border-white shadow-xl ${item.shadow} cursor-pointer group transition-all duration-300`}
// // //             >
// // //               {/* Vibrant Icon Box */}
// // //               <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
// // //                 {item.icon}
// // //               </div>
              
// // //               <h3 className="text-2xl font-black text-slate-800 mb-1">
// // //                 {item.name}
// // //               </h3>
              
// // //               <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm font-bold">
// // //                 <Rocket size={14} className="text-slate-400" />
// // //                 {item.time}
// // //               </div>
              
// // //               {/* Hover Effect Ring */}
// // //               <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-400/50 transition-colors pointer-events-none" />
// // //             </motion.div>
// // //           ))}
// // //         </motion.div>
// // //       </motion.div>
// // //     </section>
// // //   );
// // // }

// // // export default Hero;

// // import { Search, MapPin, Zap, ShoppingBag, Pill, ArrowRight, Activity } from "lucide-react";
// // import { motion } from "framer-motion";

// // // Staggered animation wrapper
// // const container = {
// //   hidden: { opacity: 0 },
// //   show: {
// //     opacity: 1,
// //     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
// //   },
// // };

// // const item = {
// //   hidden: { opacity: 0, y: 20 },
// //   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
// // };

// // function Hero() {
// //   return (
// //     <section className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden font-sans selection:bg-violet-500/30">
      
// //       {/* 1. CUTTING-EDGE BACKGROUND: Animated Aurora & Noise */}
// //       <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
// //         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
// //         <motion.div 
// //           animate={{ rotate: 360, scale: [1, 1.2, 1] }}
// //           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //           className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-full blur-[120px]" 
// //         />
// //       </div>

// //       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-16 items-center">
        
// //         {/* LEFT SIDE: Typography & Search (Span 7) */}
// //         <motion.div 
// //           variants={container}
// //           initial="hidden"
// //           animate="show"
// //           className="lg:col-span-7 flex flex-col items-start"
// //         >
// //           {/* Status Badge */}
// //           <motion.div variants={item} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8">
// //             <div className="relative flex h-2 w-2">
// //               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
// //               <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
// //             </div>
// //             <span className="text-zinc-400 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
// //               <MapPin size={12} className="text-zinc-500" /> Gurugram Network Live
// //             </span>
// //           </motion.div>

// //           {/* Massive Tech Headline */}
// //           <motion.h1 variants={item} className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
// //             Hyperlocal. <br />
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-500">
// //               Redefined.
// //             </span>
// //           </motion.h1>

// //           <motion.p variants={item} className="text-lg sm:text-xl text-zinc-400 font-light max-w-xl mb-12 leading-relaxed">
// //             The infrastructure for instant commerce. Access real-time inventory from premium local storefronts with frictionless, sub-20 minute routing.
// //           </motion.p>

// //           {/* Command Palette Style Search */}
// //           <motion.div variants={item} className="w-full max-w-lg relative group">
// //             <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 to-cyan-600/30 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
// //             <div className="relative flex items-center bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 focus-within:border-white/30 focus-within:bg-zinc-900/80 transition-all">
// //               <div className="pl-4 pr-3 text-zinc-500">
// //                 <Search size={22} strokeWidth={1.5} />
// //               </div>
// //               <input 
// //                 type="text" 
// //                 placeholder="Search inventory..." 
// //                 className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 text-lg w-full font-light"
// //               />
// //               <button className="bg-white text-black px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors">
// //                 Initialize <ArrowRight size={16} />
// //               </button>
// //             </div>
// //           </motion.div>
// //         </motion.div>

// //         {/* RIGHT SIDE: Bento Box UI (Span 5) */}
// //         <motion.div 
// //           variants={container}
// //           initial="hidden"
// //           animate="show"
// //           className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
// //         >
// //           {/* Bento Box 1: Performance/Speed */}
// //           <motion.div variants={item} className="col-span-2 bg-gradient-to-b from-white/[0.08] to-transparent border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 relative overflow-hidden group">
// //             <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
// //               <Zap size={80} strokeWidth={1} className="text-cyan-400" />
// //             </div>
// //             <div className="relative z-10">
// //               <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 mb-4">
// //                 <Zap size={18} className="text-cyan-400" />
// //               </div>
// //               <h3 className="text-3xl font-bold text-white mb-1">12<span className="text-zinc-500 text-xl">min</span></h3>
// //               <p className="text-zinc-400 text-sm font-medium">Average routing time</p>
// //             </div>
// //           </motion.div>

// //           {/* Bento Box 2: Categories */}
// //           <motion.div variants={item} className="bg-zinc-900/40 border border-white/[0.08] backdrop-blur-xl rounded-3xl p-6 group hover:bg-zinc-900/60 transition-colors cursor-pointer">
// //             <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 mb-4 group-hover:scale-110 transition-transform">
// //               <ShoppingBag size={18} className="text-violet-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-white mb-1">Retail</h3>
// //             <p className="text-zinc-500 text-xs">842 active nodes</p>
// //           </motion.div>

// //           {/* Bento Box 3: Pharmacy */}
// //           <motion.div variants={item} className="bg-zinc-900/40 border border-white/[0.08] backdrop-blur-xl rounded-3xl p-6 group hover:bg-zinc-900/60 transition-colors cursor-pointer">
// //             <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30 mb-4 group-hover:scale-110 transition-transform">
// //               <Pill size={18} className="text-fuchsia-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-white mb-1">Pharmacy</h3>
// //             <p className="text-zinc-500 text-xs">24/7 fulfillment</p>
// //           </motion.div>

// //           {/* Bento Box 4: Live Activity Ticker */}
// //           <motion.div variants={item} className="col-span-2 bg-zinc-900/40 border border-white/[0.08] backdrop-blur-xl rounded-3xl p-4 flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <Activity size={18} className="text-emerald-400" />
// //               <span className="text-zinc-300 text-sm font-medium">System Status</span>
// //             </div>
// //             <span className="text-emerald-400 text-xs font-mono bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
// //               OPERATIONAL
// //             </span>
// //           </motion.div>
          
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// // export default Hero;


// import { Search, MapPin, ArrowRight, Leaf, Sparkles, Coffee } from "lucide-react";
// import { motion } from "framer-motion";

// // Ultra-smooth, calm easing curve
// const smoothEase = [0.22, 1, 0.36, 1];

// function Hero() {
//   return (
//     <section className="relative min-h-[90vh] flex items-center bg-[#FBF9F6] overflow-hidden font-sans text-[#2A2C2B]">
      
//       {/* 1. CALM ORGANIC BACKGROUND BLOBS */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         <motion.div 
//           animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
//           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-[#E3E7D3] rounded-full mix-blend-multiply filter blur-[120px] opacity-70" 
//         />
//         <motion.div 
//           animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
//           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//           className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-[#F1E4D3] rounded-full mix-blend-multiply filter blur-[100px] opacity-60" 
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-16 items-center">
        
//         {/* LEFT SIDE: Elegant Typography & Search (Span 6) */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: smoothEase }}
//           className="lg:col-span-6 flex flex-col items-start pt-10"
//         >
//           {/* Subtle Location Tag */}
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
//             className="flex items-center gap-2 mb-8 text-[#7A7D7B] uppercase tracking-[0.2em] text-[11px] font-medium"
//           >
//             <MapPin size={14} strokeWidth={1.5} />
//             <span>Curated for West Gurugram</span>
//           </motion.div>

//           {/* Editorial Headline */}
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#2A2C2B] leading-[1.1] mb-6">
//             Elevate your <br />
//             <span className="font-serif italic text-[#6B755C] tracking-normal">
//               everyday essentials.
//             </span>
//           </h1>

//           <p className="text-lg text-[#5F6360] font-light max-w-md mb-12 leading-relaxed">
//             Discover a thoughtfully curated selection of fresh produce, artisanal goods, and daily necessities from the finest local purveyors.
//           </p>

//           {/* Soft, Tactile Search Bar */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: smoothEase }}
//             className="w-full max-w-md"
//           >
//             <div className="relative flex items-center bg-white rounded-full p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBEBEB] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
//               <div className="pl-4 pr-3 text-[#A3A6A4]">
//                 <Search size={20} strokeWidth={1.5} />
//               </div>
//               <input 
//                 type="text" 
//                 placeholder="What are you looking for?" 
//                 className="flex-1 bg-transparent border-none outline-none text-[#2A2C2B] placeholder-[#A3A6A4] text-base font-light w-full"
//               />
//               <button className="bg-[#4A5243] hover:bg-[#3A4034] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors duration-300 shadow-sm flex items-center gap-2">
//                 Explore <ArrowRight size={16} />
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* RIGHT SIDE: Aesthetic Imagery & Floating Cards (Span 6) */}
//         <motion.div 
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1.5, ease: smoothEase, delay: 0.2 }}
//           className="lg:col-span-6 relative h-[600px] hidden lg:flex items-center justify-center"
//         >
//           {/* Main Hero Image with soft rounded edges */}
//           <div className="relative w-[85%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#4A5243]/10">
//             <motion.img 
//               initial={{ scale: 1.1 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 2, ease: smoothEase }}
//               src="https://images.unsplash.com/photo-1615486171448-4fd1ffab1a5e?q=80&w=2000&auto=format&fit=crop" 
//               alt="Curated Lifestyle Essentials" 
//               className="w-full h-full object-cover"
//             />
//             {/* Subtle inner shadow overlay */}
//             <div className="absolute inset-0 border border-black/5 rounded-[2rem] pointer-events-none"></div>
//           </div>

//           {/* Floating Aesthetic Card 1: Freshness */}
//           <motion.div 
//             animate={{ y: [-5, 5, -5] }}
//             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-[15%] -left-[10%] bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-start gap-4 w-[240px]"
//           >
//             <div className="bg-[#F1E4D3] text-[#8C6B4A] p-3 rounded-xl">
//               <Leaf size={20} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-sm font-semibold text-[#2A2C2B]">Farm to Door</h4>
//               <p className="text-xs text-[#7A7D7B] mt-1 font-light leading-snug">Sourced daily from local organic farms.</p>
//             </div>
//           </motion.div>

//           {/* Floating Aesthetic Card 2: Quality */}
//           <motion.div 
//             animate={{ y: [5, -5, 5] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//             className="absolute bottom-[20%] -right-[5%] bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-start gap-4 w-[220px]"
//           >
//             <div className="bg-[#E3E7D3] text-[#5C664D] p-3 rounded-xl">
//               <Sparkles size={20} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-sm font-semibold text-[#2A2C2B]">Premium Quality</h4>
//               <p className="text-xs text-[#7A7D7B] mt-1 font-light leading-snug">Hand-picked and carefully packaged.</p>
//             </div>
//           </motion.div>

//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default Hero;


import { useState, useEffect } from "react";
import { Search, MapPin, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const backgroundImages = [
  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2500&auto=format&fit=crop", // Premium Grocery
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2500&auto=format&fit=crop", // Upscale Retail
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2500&auto=format&fit=crop", // Cosmetics/Apothecary
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2500&auto=format&fit=crop", // Fresh Produce/Wine
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth Slideshow Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000); // Changes every 6 seconds for a calm pace
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center bg-zinc-950 overflow-hidden font-sans">
      
      {/* 1. BACKGROUND SLIDESHOW WITH KEN BURNS EFFECT */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={backgroundImages[currentIndex]}
            // Initial state: slightly scaled up, completely transparent
            initial={{ opacity: 0, scale: 1.05 }}
            // Animate to: fully visible, slowly zooming out
            animate={{ opacity: 1, scale: 1 }}
            // Exit state: fade out gracefully
            exit={{ opacity: 0 }}
            // The transition is split: fast opacity fade, but very slow scale for the zoom effect
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero Background"
          />
        </AnimatePresence>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Text & Interactions */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest"
          >
            <MapPin size={14} />
            West Gurugram Delivery
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight mb-6"
          >
            Curated essentials, <br />
            <span className="font-serif italic text-white/70">delivered beautifully.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg text-white/70 font-light max-w-lg mb-10 leading-relaxed"
          >
            Experience a refined selection of local purveyors. Premium groceries, apothecary essentials, and boutique items, right to your door.
          </motion.p>

          {/* Frosted Glass Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-xl"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl hover:bg-white/15 focus-within:bg-white/20 focus-within:border-white/40 transition-all duration-300">
              <div className="pl-4 pr-3 text-white/60">
                <Search size={22} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                placeholder="Search the collection..." 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/50 text-lg font-light w-full"
              />
              <button className="bg-white text-black px-8 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors duration-300">
                Explore <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. SLIDESHOW INDICATORS (Bottom of screen) */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-4">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="group py-2 px-1"
          >
            <div 
              className={`h-1 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex 
                  ? "w-12 bg-white" 
                  : "w-4 bg-white/30 group-hover:bg-white/50"
              }`} 
            />
          </button>
        ))}
      </div>

    </section>
  );
}

export default Hero;