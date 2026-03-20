

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

// ─── DATA ────────────────────────────────────────────────────────────────────
const PRODUCT = {
  id: 1,
  title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
  brand: "Sony",
  rating: 4.6,
  reviewCount: 3847,
  currentPrice: 24990,
  originalPrice: 34990,
  discount: 29,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&q=80",
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
  ],
  badges: ["Bank Offer", "No Cost EMI", "Exchange Offer"],
  seller: {
    name: "Sharma Electronics",
    rating: 4.5,
    distance: "1.3 km",
    verified: true,
  },
  delivery: { eta: "15–25 minutes", inStock: true, freeDelivery: true },
  description: `Experience industry-leading noise cancellation with Sony's WH-1000XM5. Featuring 8 microphones and two processors, this flagship headphone delivers the best-in-class noise cancellation Sony has ever achieved. With up to 30 hours battery life, multipoint connection, and crystal-clear call quality, this is the perfect companion for work, travel, and everyday listening.\n\nThe soft-fit leather and aluminum design gives it a premium feel while the auto-optimize technology senses wearing conditions to deliver the best audio experience.`,
  specs: [
    { label: "Driver Unit", value: "30 mm, dome type" },
    { label: "Frequency Response", value: "4 Hz – 40,000 Hz" },
    { label: "Battery Life", value: "Up to 30 hours" },
    { label: "Charging Time", value: "3.5 hours (full), 3 min = 3 hours" },
    { label: "Connectivity", value: "Bluetooth 5.2, 3.5mm" },
    { label: "Weight", value: "250 g" },
    { label: "Color Options", value: "Midnight Black, Platinum Silver" },
    { label: "Noise Cancellation", value: "Auto NC Optimizer, DSEE Extreme" },
  ],
  reviews: [
    {
      id: 1,
      user: "Arjun M.",
      avatar: "AM",
      rating: 5,
      date: "Feb 2025",
      title: "Best headphones I've ever owned",
      body: "The noise cancellation is absolutely mind-blowing. I used them on a 6-hour flight and couldn't hear a thing. Sound quality is incredible too — so much detail in every track.",
      helpful: 124,
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=60",
    },
    {
      id: 2,
      user: "Priya S.",
      avatar: "PS",
      rating: 5,
      date: "Jan 2025",
      title: "Worth every rupee",
      body: "Premium build, crazy good ANC, and the multipoint connection between my phone and laptop works flawlessly. Battery life is insane.",
      helpful: 89,
      img: null,
    },
    {
      id: 3,
      user: "Rohan K.",
      avatar: "RK",
      rating: 4,
      date: "Jan 2025",
      title: "Excellent but slightly heavy",
      body: "Genuinely the best sounding headphones at this price. Only minor gripe is the weight during long sessions. Otherwise 10/10.",
      helpful: 56,
      img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=80&q=60",
    },
    {
      id: 4,
      user: "Meera T.",
      avatar: "MT",
      rating: 5,
      date: "Dec 2024",
      title: "Game changer for WFH",
      body: "Call quality is stunning, colleagues say I sound like I'm in a studio. ANC blocks out my entire family during calls. Perfect.",
      helpful: 43,
      img: null,
    },
  ],
  ratingBreakdown: { 5: 68, 4: 18, 3: 8, 2: 3, 1: 3 },
};

const RELATED = [
  {
    id: 2,
    title: "Sony WF-1000XM5 Earbuds",
    price: 19990,
    original: 24990,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80",
  },
  {
    id: 3,
    title: "Bose QuietComfort 45",
    price: 28990,
    original: 38990,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&q=80",
  },
  {
    id: 4,
    title: "Apple AirPods Max",
    price: 54900,
    original: 59900,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=300&q=80",
  },
  {
    id: 5,
    title: "JBL Tour One M2",
    price: 15990,
    original: 22990,
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
  },
  {
    id: 6,
    title: "Sennheiser Momentum 4",
    price: 29990,
    original: 39990,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&q=80",
  },
  {
    id: 7,
    title: "Jabra Evolve2 85",
    price: 32990,
    original: 42990,
    rating: 4.2,
    img: "https://images.unsplash.com/photo-1565136114553-cc643e631c86?w=300&q=80",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

function StarRating({ rating, size = "sm", interactive = false, onChange }) {
  const [hover, setHover] = useState(null);
  const sz =
    size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = (hover ?? rating) >= s;
        return (
          <svg
            key={s}
            className={`${sz} ${filled ? "text-amber-400" : "text-slate-200"} transition-colors duration-150 ${interactive ? "cursor-pointer" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onMouseEnter={() => interactive && setHover(s)}
            onMouseLeave={() => interactive && setHover(null)}
            onClick={() => interactive && onChange?.(s)}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

// ─── PRODUCT GALLERY ─────────────────────────────────────────────────────────

function ProductGallery({ images }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y });
  };

  return (
    <div className="flex flex-col gap-4 sticky top-6">
      {/* Main Image */}
      <div
        className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square border border-slate-100 cursor-zoom-in shadow-sm"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoom(null)}
      >
        <img
          src={images[active]}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-300"
          style={
            zoom
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                }
              : {}
          }
        />
        {!zoom && (
          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-xs text-slate-500 px-2 py-1 rounded-full flex items-center gap-1 border border-slate-200">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Hover to zoom
          </div>
        )}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform border border-slate-100">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${active === i ? "border-slate-800 shadow-md scale-105" : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"}`}
          >
            <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PRODUCT INFO ─────────────────────────────────────────────────────────────

function ProductInfo({ product }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">
        {product.brand}
      </p>
      <h1 className="text-2xl font-bold text-slate-900 leading-snug">
        {product.title}
      </h1>
      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-sm font-bold text-amber-700">
            {product.rating}
          </span>
        </div>
        <span className="text-sm text-slate-500">
          {product.reviewCount.toLocaleString()} reviews
        </span>
        <span className="text-slate-300">|</span>
        <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
          {product.delivery.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
}

// ─── PRICE SECTION ────────────────────────────────────────────────────────────

function PriceSection({ product }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
      <div className="flex items-end gap-3 flex-wrap">
        <span className="text-4xl font-black tracking-tight">
          {fmt(product.currentPrice)}
        </span>
        <span className="text-lg text-slate-400 line-through font-medium">
          {fmt(product.originalPrice)}
        </span>
        <span className="bg-rose-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
          {product.discount}% OFF
        </span>
      </div>
      <p className="text-slate-400 text-sm mt-1">Inclusive of all taxes</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {product.badges.map((b) => (
          <span
            key={b}
            className="flex items-center gap-1 bg-white/10 border border-white/20 text-xs text-white px-3 py-1 rounded-full backdrop-blur-sm"
          >
            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm2.586-1.414a1 1 0 10-1.414 1.414L12.172 7 10.879 8.293a1 1 0 101.414 1.414l2-2a1 1 0 000-1.414l-2-2z" clipRule="evenodd" />
            </svg>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SELLER INFO ──────────────────────────────────────────────────────────────

function SellerInfo({ seller }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {seller.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-slate-500">Sold by</p>
          <p className="text-sm font-semibold text-slate-800">{seller.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <StarRating rating={seller.rating} size="sm" />
          <span className="text-slate-700 font-semibold">{seller.rating}</span>
        </div>
        {seller.verified && (
          <span className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
      </div>
    </div>
  );
}

// ─── DELIVERY INFO ────────────────────────────────────────────────────────────

function DeliveryInfo({ delivery }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        {
          icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
          label: "Delivery ETA",
          value: delivery.eta,
          color: "text-sky-600 bg-sky-50 border-sky-200",
        },
        {
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0",
          label: "Availability",
          value: delivery.inStock ? "In Stock" : "Out of Stock",
          color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        },
        {
          icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0",
          label: "Delivery",
          value: delivery.freeDelivery ? "Free Delivery" : "Paid",
          color: "text-violet-600 bg-violet-50 border-violet-200",
        },
      ].map(({ icon, label, value, color }) => (
        <div key={label} className={`${color} border rounded-xl p-3 flex flex-col items-center text-center gap-1`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
          <p className="text-xs opacity-70">{label}</p>
          <p className="text-xs font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}

// ─── ACTION BUTTONS ───────────────────────────────────────────────────────────

function ActionButtons() {
  const navigate = useNavigate(); // 2. Initialize navigation hook
  const [added, setAdded] = useState(false);

  // 3. Navigate to Cart Page
  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      navigate("/cart"); // Go to cart after brief animation
    }, 600); 
  };

  // 4. Navigate directly to Checkout Page
  const handleBuyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleAddToCart}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm border-2 transition-all duration-300 ${
          added
            ? "bg-slate-900 border-slate-900 text-white scale-95"
            : "bg-white border-slate-800 text-slate-800 hover:bg-slate-50 hover:scale-[1.02] active:scale-95"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {added ? "Added!" : "Add to Cart"}
      </button>

      <button 
        onClick={handleBuyNow} // Attach checkout route here
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-amber-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Buy Now
      </button>
    </div>
  );
}

// ─── PRODUCT TABS ─────────────────────────────────────────────────────────────

function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");

  return (
    <div className="mt-10">
      <div className="flex border-b border-slate-200">
        {["description", "specifications", "reviews"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-6 py-3 text-sm font-semibold capitalize transition-colors duration-200 ${
              tab === t ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            {t}
            {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "description" && (
          <div className="prose prose-slate max-w-none">
            {product.description.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-sm mb-4">{p}</p>
            ))}
          </div>
        )}

        {tab === "specifications" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
            {product.specs.map((s, i) => (
              <div key={i} className="bg-white px-4 py-3 flex gap-4">
                <span className="text-xs text-slate-400 font-medium w-36 shrink-0 pt-0.5">{s.label}</span>
                <span className="text-sm text-slate-800 font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "reviews" && <ReviewSection product={product} />}
      </div>
    </div>
  );
}

// ─── REVIEW SECTION ───────────────────────────────────────────────────────────

function ReviewSection({ product }) {
  // Keeping the exact Review Section code you provided
  return (
    <div>
      <div className="flex gap-8 items-center bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
        <div className="text-center shrink-0">
          <div className="text-6xl font-black text-slate-900">{product.rating}</div>
          <StarRating rating={product.rating} size="md" />
          <div className="text-xs text-slate-400 mt-1">{product.reviewCount.toLocaleString()} reviews</div>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((n) => (
            <div key={n} className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 w-2">{n}</span>
              <svg className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${product.ratingBreakdown[n]}%` }} />
              </div>
              <span className="text-slate-400 w-7 text-right">{product.ratingBreakdown[n]}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {product.reviews.filter((r) => r.img).map((r) => (
            <img key={r.id} src={r.img} alt="review" className="w-16 h-16 rounded-xl object-cover border border-slate-200 hover:scale-105 transition-transform cursor-pointer shrink-0" />
        ))}
      </div>
      <div className="space-y-4">
        {product.reviews.map((r) => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{r.user}</p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={r.rating} size="sm" />
                    <span className="text-xs text-slate-400">{r.date}</span>
                  </div>
                </div>
              </div>
              {r.img && <img src={r.img} alt="" className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0" />}
            </div>
            <p className="text-sm font-semibold text-slate-800 mt-3">{r.title}</p>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RELATED PRODUCTS ─────────────────────────────────────────────────────────

function RelatedProducts({ products }) {
  const navigate = useNavigate(); // 5. Initialize navigate for related items

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-slate-200" />
        <h2 className="text-xl font-bold text-slate-900 whitespace-nowrap">You may also like</h2>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((p) => {
          const disc = Math.round(((p.original - p.price) / p.original) * 100);
          return (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)} // 6. Route to clicked product
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square bg-slate-50 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{disc}%</span>
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-700 font-medium leading-snug line-clamp-2">{p.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <StarRating rating={p.rating} size="sm" />
                  <span className="text-[10px] text-slate-400">{p.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-sm font-bold text-slate-900">{fmt(p.price)}</span>
                  <span className="text-xs text-slate-400 line-through">{fmt(p.original)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', 'Outfit', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        * { box-sizing: border-box; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          {["Home", "Electronics", "Headphones", "Sony"].map((b, i, arr) => (
            <span key={b} className="flex items-center gap-2">
              <span className={i === arr.length - 1 ? "text-slate-700 font-medium" : "hover:text-slate-600 cursor-pointer"}>
                {b}
              </span>
              {i < arr.length - 1 && <span>›</span>}
            </span>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2">
            <ProductGallery images={PRODUCT.images} />
          </div>

          <div className="lg:col-span-3 space-y-5">
            <ProductInfo product={PRODUCT} />
            <PriceSection product={PRODUCT} />
            <SellerInfo seller={PRODUCT.seller} />
            <DeliveryInfo delivery={PRODUCT.delivery} />
            <ActionButtons />

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "1 Year Warranty" },
                { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "7-Day Returns" },
                { icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", label: "Secure Payment" },
                { icon: "M12 18h.01M8 21l4-7 4 7M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z", label: "Genuine Product" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
                  <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                  <span className="text-xs text-slate-600 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProductTabs product={PRODUCT} />
        <RelatedProducts products={RELATED} />
      </div>
    </div>
  );
}