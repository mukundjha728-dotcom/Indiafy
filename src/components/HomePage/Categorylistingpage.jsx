


import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Outfit:wght@300;400;500;600;700&display=swap');

    .clp-root { font-family: 'Outfit', system-ui, sans-serif; background: #f7f4ef; color: #1c1917; }
    .display  { font-family: 'Fraunces', Georgia, serif; }

    /* Entrance */
    .fade-in   { animation: fadeIn .4s cubic-bezier(.22,1,.36,1) both; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

    /* Product card */
    .prod-card { transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s; }
    .prod-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,.1); }
    .prod-card:hover .prod-img { transform: scale(1.06); }
    .prod-img  { transition: transform .5s cubic-bezier(.22,1,.36,1); }

    /* Wishlist heart */
    .heart-btn { transition: transform .2s cubic-bezier(.34,1.56,.64,1); }
    .heart-btn:hover { transform: scale(1.25); }
    .heart-btn.active { color: #ef4444; }

    /* Filter range input */
    input[type=range] { -webkit-appearance:none; height:4px; border-radius:99px; outline:none; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:#e85c41; cursor:pointer; box-shadow:0 2px 6px rgba(232,92,65,.4); }

    /* Sort button */
    .sort-btn { transition: all .2s; }
    .sort-btn.active { background: #1c1917; color: #f7f4ef; }
    .sort-btn:not(.active):hover { background: #f0ece6; }

    /* Checkbox custom */
    .cb-wrap input[type=checkbox] { accent-color: #e85c41; width:15px; height:15px; cursor:pointer; }

    /* Filter section accordion */
    .filter-body { overflow:hidden; transition: max-height .3s cubic-bezier(.22,1,.36,1), opacity .25s; }

    /* Tag chip */
    .tag-chip { transition: all .18s; }
    .tag-chip:hover { background:#e85c41; color:#fff; border-color:#e85c41; }
    .tag-chip.active { background:#e85c41; color:#fff; border-color:#e85c41; }

    /* Mobile filter drawer */
    .filter-drawer { transition: transform .35s cubic-bezier(.22,1,.36,1); }
    .filter-overlay { transition: opacity .3s; }

    /* Skeleton */
    .skel { background:linear-gradient(90deg,#ede9e3 25%,#e4dfd8 50%,#ede9e3 75%); background-size:200% 100%; animation:skel 1.4s infinite; }
    @keyframes skel { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

    /* Scrollbar */
    .thin-scroll::-webkit-scrollbar{width:4px;} .thin-scroll::-webkit-scrollbar-thumb{background:#d6d0c8;border-radius:2px;}

    /* Cart btn */
    .cart-btn { transition: all .2s cubic-bezier(.22,1,.36,1); }
    .cart-btn:hover { background:#1c1917; color:#f7f4ef; transform:translateY(-1px); }
    .cart-btn:active { transform:scale(.96); }

    /* Badge pulse */
    .badge-new { animation: badgePop .4s cubic-bezier(.34,1.56,.64,1) both; }
    @keyframes badgePop { from{transform:scale(0)} to{transform:scale(1)} }
  `}</style>
);

// ─── DATA ───────────────────────────────────────────────────────────────────
const RAW_PRODUCTS = [
  { id: 1, name: "Sony WH-1000XM5 Noise Cancelling Headphones", brand: "Sony", price: 24990, original: 34990, rating: 4.8, reviews: 3847, seller: "Sharma Electronics", dist: 1.3, eta: 18, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", badge: "Best Seller", inStock: true, },
  { id: 2, name: "Apple AirPods Pro (2nd Generation)", brand: "Apple", price: 24900, original: 26900, rating: 4.7, reviews: 2140, seller: "iZone Store", dist: 2.1, eta: 25, img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&q=80", badge: "New", inStock: true, },
  { id: 3, name: "Bose QuietComfort 45 Over-Ear Headphones", brand: "Bose", price: 28990, original: 38990, rating: 4.6, reviews: 1823, seller: "AudioWorld", dist: 0.9, eta: 12, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80", badge: null, inStock: true, },
  { id: 4, name: "JBL Flip 6 Portable Bluetooth Speaker", brand: "JBL", price: 8499, original: 11999, rating: 4.5, reviews: 4201, seller: "SoundHub", dist: 3.2, eta: 35, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", badge: "Hot Deal", inStock: true, },
  { id: 5, name: "Sennheiser Momentum 4 Wireless Headphones", brand: "Sennheiser", price: 29990, original: 39990, rating: 4.7, reviews: 987, seller: "TechMart Official", dist: 1.8, eta: 22, img: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&q=80", badge: null, inStock: true, },
  { id: 6, name: "Anker Soundcore Life Q45 Headphones", brand: "Anker", price: 5999, original: 8999, rating: 4.3, reviews: 3120, seller: "GadgetZone", dist: 4.5, eta: 45, img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80", badge: "Budget Pick", inStock: true, },
  { id: 7, name: "Samsung Galaxy Buds 2 Pro True Wireless", brand: "Samsung", price: 13990, original: 17990, rating: 4.4, reviews: 2301, seller: "Samsung SmartShop", dist: 2.7, eta: 30, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", badge: "New", inStock: false, },
  { id: 8, name: "Jabra Evolve2 85 Wireless Headset", brand: "Jabra", price: 32990, original: 42990, rating: 4.6, reviews: 654, seller: "ProAudio India", dist: 5.1, eta: 55, img: "https://images.unsplash.com/photo-1565136114553-cc643e631c86?w=400&q=80", badge: null, inStock: true, },
  { id: 9, name: "Sony WF-1000XM5 True Wireless Earbuds", brand: "Sony", price: 19990, original: 24990, rating: 4.5, reviews: 1567, seller: "Sharma Electronics", dist: 1.3, eta: 18, img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80", badge: "Top Rated", inStock: true, },
  { id: 10, name: "Marshall Major IV On-Ear Headphones", brand: "Marshall", price: 11999, original: 14999, rating: 4.4, reviews: 892, seller: "RockSound Store", dist: 3.8, eta: 40, img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80", badge: null, inStock: true, },
  { id: 11, name: "Nothing Ear (2) True Wireless Earphones", brand: "Nothing", price: 9999, original: 12999, rating: 4.5, reviews: 2034, seller: "TechMart Official", dist: 1.8, eta: 22, img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80", badge: "New", inStock: true, },
  { id: 12, name: "Beats Studio Pro Wireless Headphones", brand: "Beats", price: 27990, original: 32990, rating: 4.3, reviews: 1124, seller: "iZone Store", dist: 2.1, eta: 25, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", badge: null, inStock: true, },
];

const BRANDS = [
  "Sony",
  "Apple",
  "Bose",
  "JBL",
  "Sennheiser",
  "Anker",
  "Samsung",
  "Jabra",
];
const SORT_OPTS = [
  { key: "relevance", label: "Relevance" },
  { key: "price_asc", label: "Price: Low to High" },
  { key: "price_desc", label: "Price: High to Low" },
  { key: "rating", label: "Best Rated" },
  { key: "delivery", label: "Fastest Delivery" },
];

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const disc = (p, o) => Math.round(((o - p) / o) * 100);

// ─── ICON ──────────────────────────────────────────────────────────────────
const Ic = ({ d, c = "w-4 h-4", sw = 1.8, fill = false }) => (
  <svg
    className={c}
    fill={fill ? "currentColor" : "none"}
    stroke={fill ? "none" : "currentColor"}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d={d} />
  </svg>
);

// ─── STAR RATING ────────────────────────────────────────────────────────────
const Stars = ({ r, size = "sm" }) => {
  const sz = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`${sz} ${s <= Math.round(r) ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// ─── FILTER SECTION ─────────────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <span className="text-sm font-semibold text-stone-800">{title}</span>
        <Ic
          d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          c="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors"
        />
      </button>
      <div
        className={`filter-body ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
}

// ─── SIDEBAR ────────────────────────────────────────────────────────────────
function Sidebar({ filters, setFilters, onReset }) {
  const updateFilter = useCallback(
    (key, val) => setFilters((f) => ({ ...f, [key]: val })),
    [setFilters],
  );
  const toggleBrand = useCallback(
    (brand) =>
      setFilters((f) => ({
        ...f,
        brands: f.brands.includes(brand)
          ? f.brands.filter((b) => b !== brand)
          : [...f.brands, brand],
      })),
    [setFilters],
  );

  return (
    <div className="thin-scroll overflow-y-auto max-h-screen sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="display text-lg font-semibold text-stone-900 italic">
          Filters
        </h2>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-coral-600 text-[#e85c41] hover:underline underline-offset-2"
        >
          Clear all
        </button>
      </div>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold text-stone-600">
            <span>{fmt(filters.priceMin)}</span>
            <span>{fmt(filters.priceMax)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={45000}
            step={500}
            value={filters.priceMax}
            onChange={(e) => updateFilter("priceMax", +e.target.value)}
            className="w-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #e85c41 0%, #e85c41 ${(filters.priceMax / 45000) * 100}%, #e0dbd3 ${(filters.priceMax / 45000) * 100}%, #e0dbd3 100%)`,
            }}
          />
          <div className="grid grid-cols-3 gap-1.5">
            {[
              [0, 5000, "Under ₹5K"],
              [5000, 15000, "₹5K–15K"],
              [15000, 45000, "₹15K+"],
            ].map(([mn, mx, lbl]) => (
              <button
                key={lbl}
                onClick={() =>
                  setFilters((f) => ({ ...f, priceMin: mn, priceMax: mx }))
                }
                className={`tag-chip text-[10px] font-semibold border rounded-full px-2 py-1 ${filters.priceMin === mn && filters.priceMax === mx ? "active" : "border-stone-300 text-stone-500"}`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Distance */}
      <FilterSection title="Distance">
        <div className="space-y-2.5">
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={filters.maxDist}
            onChange={(e) => updateFilter("maxDist", +e.target.value)}
            className="w-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #e85c41 0%, #e85c41 ${((filters.maxDist - 0.5) / 9.5) * 100}%, #e0dbd3 ${((filters.maxDist - 0.5) / 9.5) * 100}%, #e0dbd3 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-stone-500 font-medium">
            <span>0.5 km</span>
            <span className="font-bold text-stone-800">
              Within {filters.maxDist} km
            </span>
            <span>10 km</span>
          </div>
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Minimum Rating">
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((r) => (
            <label
              key={r}
              className="cb-wrap flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => updateFilter("minRating", r)}
                className="accent-[#e85c41]"
              />
              <div className="flex items-center gap-1.5">
                <Stars r={r} />
                <span className="text-sm text-stone-600 font-medium group-hover:text-stone-900 transition-colors">
                  {r}+
                </span>
              </div>
            </label>
          ))}
          <label className="cb-wrap flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => updateFilter("minRating", 0)}
              className="accent-[#e85c41]"
            />
            <span className="text-sm text-stone-600 font-medium group-hover:text-stone-900 transition-colors">
              All ratings
            </span>
          </label>
        </div>
      </FilterSection>

      {/* Delivery Time */}
      <FilterSection title="Delivery Time">
        <div className="space-y-2">
          {[
            [15, "Under 15 min"],
            [30, "Under 30 min"],
            [45, "Under 45 min"],
            [999, "Any time"],
          ].map(([t, lbl]) => (
            <label
              key={t}
              className="cb-wrap flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="eta"
                checked={filters.maxEta === t}
                onChange={() => updateFilter("maxEta", t)}
                className="accent-[#e85c41]"
              />
              <span className="text-sm text-stone-600 font-medium group-hover:text-stone-900 transition-colors">
                {lbl}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand">
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label
              key={brand}
              className="cb-wrap flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span className="text-sm text-stone-600 font-medium group-hover:text-stone-900 transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" defaultOpen={false}>
        <label className="cb-wrap flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => updateFilter("inStockOnly", !filters.inStockOnly)}
          />
          <span className="text-sm text-stone-600 font-medium group-hover:text-stone-900 transition-colors">
            In Stock Only
          </span>
        </label>
      </FilterSection>
    </div>
  );
}

// ─── PRODUCT CARD (GRID VIEW) ────────────────────────────────────────────────
function ProductCard({ product, idx }) {
  const navigate = useNavigate(); // 2. Initialize navigate hook
  const [wishlisted, setWishlisted] = useState(false);
  const d = disc(product.price, product.original);

  const handleCardClick = () => {
    // Navigate to the product details page
    navigate(`/product/${product.id}`); 
  };

  const handleCart = (e) => {
    e.stopPropagation(); // Prevents the card click from triggering
    navigate("/cart");   // Navigate directly to the cart page
  };

  const handleWishlist = (e) => {
    e.stopPropagation(); // Prevents the card click from triggering
    setWishlisted((w) => !w);
  };

  const BADGE_COLORS = {
    "Best Seller": "bg-amber-100 text-amber-700 border-amber-200",
    New: "bg-sky-100 text-sky-700 border-sky-200",
    "Hot Deal": "bg-red-100 text-red-600 border-red-200",
    "Budget Pick": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Top Rated": "bg-violet-100 text-violet-700 border-violet-200",
  };

  return (
    <div
      onClick={handleCardClick} // 3. Attach click to the main card container
      className="prod-card fade-in bg-white rounded-2xl border border-stone-200 overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${idx * 0.05}s` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <img
          src={product.img}
          alt={product.name}
          className="prod-img w-full h-full object-cover"
        />

        {/* Overlay controls */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[.04] transition-colors" />

        {/* Badge */}
        {product.badge && (
          <span
            className={`badge-new absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${BADGE_COLORS[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount chip */}
        <span className="absolute top-3 right-3 bg-[#e85c41] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          -{d}%
        </span>

        {/* Wishlist */}
        <button
          onClick={handleWishlist} // Uses the stopPropagation handler
          className={`heart-btn absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-stone-100 ${wishlisted ? "active" : "text-stone-400"}`}
        >
          <Ic
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            c="w-4 h-4"
            fill={wishlisted}
            sw={wishlisted ? 0 : 1.8}
          />
        </button>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-bold text-stone-500 bg-white border border-stone-300 px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1">
          {product.brand}
        </p>
        <h3
          className="text-sm font-semibold text-stone-900 leading-snug mb-2 line-clamp-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <Stars r={product.rating} />
          <span className="text-xs font-bold text-stone-700">
            {product.rating}
          </span>
          <span className="text-xs text-stone-400">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-black text-stone-900">
            {fmt(product.price)}
          </span>
          <span className="text-xs text-stone-400 line-through">
            {fmt(product.original)}
          </span>
        </div>

        {/* Seller + Distance + ETA */}
        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-3 gap-2">
          <div className="flex items-center gap-1 min-w-0">
            <Ic
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
              c="w-3 h-3 shrink-0 text-stone-400"
            />
            <span className="truncate font-medium">{product.seller}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Ic
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              c="w-3 h-3 text-stone-400"
            />
            <span>{product.dist} km</span>
          </div>
        </div>

        {/* ETA pill + Cart */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-2.5 py-1">
            <Ic d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0" c="w-3 h-3" />
            <span className="text-[10px] font-bold">{product.eta} min</span>
          </div>
          <button
            onClick={handleCart} // Uses the stopPropagation handler
            disabled={!product.inStock}
            className={`cart-btn flex-1 py-2 rounded-xl text-xs font-bold border transition-all bg-stone-100 text-stone-800 border-stone-200 hover:bg-[#1c1917] hover:text-[#f7f4ef] hover:border-[#1c1917] disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ACTIVE FILTER TAGS ──────────────────────────────────────────────────────
function ActiveFilters({ filters, setFilters }) {
  const tags = [];
  if (filters.priceMax < 45000)
    tags.push({
      label: `Under ${fmt(filters.priceMax)}`,
      clear: () => setFilters((f) => ({ ...f, priceMax: 45000 })),
    });
  if (filters.maxDist < 10)
    tags.push({
      label: `≤ ${filters.maxDist} km`,
      clear: () => setFilters((f) => ({ ...f, maxDist: 10 })),
    });
  if (filters.minRating > 0)
    tags.push({
      label: `${filters.minRating}+ ★`,
      clear: () => setFilters((f) => ({ ...f, minRating: 0 })),
    });
  if (filters.maxEta < 999)
    tags.push({
      label: `< ${filters.maxEta} min`,
      clear: () => setFilters((f) => ({ ...f, maxEta: 999 })),
    });
  if (filters.inStockOnly)
    tags.push({
      label: "In Stock",
      clear: () => setFilters((f) => ({ ...f, inStockOnly: false })),
    });
  filters.brands.forEach((b) =>
    tags.push({
      label: b,
      clear: () =>
        setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })),
    })
  );
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className="flex items-center gap-1.5 text-xs font-semibold bg-stone-800 text-stone-100 rounded-full pl-3 pr-2 py-1"
        >
          {tag.label}
          <button
            onClick={tag.clear}
            className="w-4 h-4 bg-stone-600 hover:bg-stone-500 rounded-full flex items-center justify-center transition-colors"
          >
            <Ic d="M6 18L18 6M6 6l12 12" c="w-2.5 h-2.5" sw={2.5} />
          </button>
        </span>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
const DEFAULT_FILTERS = {
  priceMin: 0,
  priceMax: 45000,
  maxDist: 10,
  minRating: 0,
  maxEta: 999,
  inStockOnly: false,
  brands: [],
};

export default function CategoryListingPage() {
  const navigate = useNavigate(); // 4. Initialize navigate hook for the List View
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [mobileFilter, setMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let list = RAW_PRODUCTS.filter((p) => {
      if (p.price < filters.priceMin || p.price > filters.priceMax)
        return false;
      if (p.dist > filters.maxDist) return false;
      if (p.rating < filters.minRating) return false;
      if (p.eta > filters.maxEta) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand))
        return false;
      return true;
    });
    switch (sort) {
      case "price_asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "delivery":
        list = [...list].sort((a, b) => a.eta - b.eta);
        break;
    }
    return list;
  }, [filters, sort]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="clp-root min-h-screen">
      <GlobalStyles />

      {/* Mobile filter overlay */}
      {mobileFilter && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="filter-overlay flex-1 bg-black/40"
            onClick={() => setMobileFilter(false)}
          />
          <div className="filter-drawer w-72 bg-[#f7f4ef] h-full p-5 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <span className="display text-lg font-semibold italic">
                Filters
              </span>
              <button onClick={() => setMobileFilter(false)}>
                <Ic
                  d="M6 18L18 6M6 6l12 12"
                  c="w-5 h-5 text-stone-600"
                  sw={2}
                />
              </button>
            </div>
            <Sidebar
              filters={filters}
              setFilters={setFilters}
              onReset={resetFilters}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── CATEGORY HERO ─────────────────────────────────── */}
        <div className="fade-in mb-6">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                {["Home", "Electronics", "Audio"].map((b, i, arr) => (
                  <span key={b} className="flex items-center gap-2">
                    <span
                      className={
                        i === arr.length - 1
                          ? "text-stone-700 font-medium"
                          : "hover:text-stone-600 cursor-pointer"
                      }
                    >
                      {b}
                    </span>
                    {i < arr.length - 1 && <span>›</span>}
                  </span>
                ))}
              </div>
              <h1 className="display text-3xl md:text-4xl font-semibold text-stone-900 italic">
                Audio & Headphones
              </h1>
              <p className="text-sm text-stone-500 mt-1">
                <span className="font-bold text-stone-700">
                  {filtered.length}
                </span>{" "}
                products found · Near Koramangala, Bengaluru
              </p>
            </div>
          </div>
        </div>

        {/* ── SORT + VIEW BAR ───────────────────────────────── */}
        <div className="fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={() => setMobileFilter(true)}
              className="lg:hidden flex items-center gap-1.5 py-2 px-3 bg-stone-800 text-stone-100 text-xs font-bold rounded-xl shrink-0"
            >
              <Ic
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                c="w-3.5 h-3.5"
              />
              Filters
            </button>
            {SORT_OPTS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={`sort-btn shrink-0 text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${sort === opt.key ? "active border-stone-900" : "border-stone-200 text-stone-600 bg-white"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-stone-400 hidden sm:inline">
              View
            </span>
            {[
              [
                "grid",
                "M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z",
              ],
              ["list", "M4 6h16M4 10h16M4 14h16M4 18h16"],
            ].map(([mode, icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${viewMode === mode ? "bg-stone-900 border-stone-900 text-white" : "bg-white border-stone-200 text-stone-500 hover:border-stone-400"}`}
              >
                <Ic d={icon} c="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN LAYOUT ───────────────────────────────────── */}
        <div className="flex gap-6">
          {/* SIDEBAR (desktop) */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm fade-in">
              <Sidebar
                filters={filters}
                setFilters={setFilters}
                onReset={resetFilters}
              />
            </div>
          </aside>

          {/* PRODUCT AREA */}
          <div className="flex-1 min-w-0">
            <ActiveFilters filters={filters} setFilters={setFilters} />

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center fade-in">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                  🎧
                </div>
                <h3 className="display text-xl font-semibold italic text-stone-700 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-stone-400 mb-4">
                  Try adjusting your filters
                </p>
                <button
                  onClick={resetFilters}
                  className="text-sm font-bold text-white bg-stone-900 px-5 py-2.5 rounded-xl hover:bg-stone-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} idx={i} />
                ))}
              </div>
            ) : (
              // 5. LIST VIEW Layout handling
              <div className="space-y-3">
                {filtered.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/product/${p.id}`)} // Route to product page
                    className="prod-card fade-in bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 cursor-pointer"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="w-28 h-28 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0 relative">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="prod-img w-full h-full object-cover"
                      />
                      {!p.inStock && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-stone-500 bg-white border border-stone-300 px-2 py-1 rounded-full">
                            OOS
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
                            {p.brand}
                          </p>
                          <h3
                            className="text-sm font-bold text-stone-900 leading-snug mt-0.5 line-clamp-1"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {p.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-lg font-black text-stone-900">
                            {fmt(p.price)}
                          </span>
                          <span className="text-xs text-stone-400 line-through">
                            {fmt(p.original)}
                          </span>
                          <span className="text-[10px] font-black bg-[#e85c41] text-white px-1.5 py-0.5 rounded-full">
                            -{disc(p.price, p.original)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Stars r={p.rating} />
                          <span className="text-xs font-bold text-stone-700">
                            {p.rating}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          ({p.reviews.toLocaleString()})
                        </span>
                        <span className="text-[11px] text-stone-400">
                          · {p.seller}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          · {p.dist} km
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 font-semibold">
                          <Ic
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0"
                            c="w-2.5 h-2.5"
                          />
                          {p.eta} min
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents clicking the list item beneath it
                          navigate("/cart");   // Navigate directly to cart
                        }}
                        className="cart-btn py-2 px-4 bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200 rounded-xl"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}