import { memo } from "react";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  { id: "electronics", name: "Electronics", img: "https://images.unsplash.com/photo-1550009158-9efff6c97348?q=80&w=800", count: "1,240 Suppliers" },
  { id: "garments", name: "Garments", img: "https://images.unsplash.com/photo-1558304970-abd589bfdfe1?q=80&w=800", count: "3,100 Suppliers" },
  { id: "groceries", name: "Groceries", img: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=800", count: "4,500 Suppliers" },
  { id: "packaging", name: "Packaging", img: "https://images.unsplash.com/photo-1622340538289-4bc2b7d41f34?q=80&w=800", count: "850 Suppliers" },
  { id: "industrial", name: "Industrial", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", count: "2,100 Suppliers" },
  { id: "furniture", name: "Furniture", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800", count: "640 Suppliers" },
  { id: "medical", name: "Medical", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ad?q=80&w=800", count: "420 Suppliers" },
  { id: "beauty", name: "Beauty", img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800", count: "1,100 Suppliers" },
];

function TopCategories() {
  return (
    <section className="py-20 lg:py-32 bg-brand-background border-b border-brand-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-display font-black text-brand-primary mb-4 tracking-tight">
              Top Wholesale Categories
            </h2>
            <p className="text-lg text-brand-text-secondary font-medium">
              Source from verified manufacturers across major industrial sectors.
            </p>
          </div>
          <button className="text-sm font-bold text-brand-primary hover:text-brand-accent uppercase tracking-widest transition-colors flex items-center gap-2 shrink-0">
            View All Categories <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              className="group relative h-[240px] lg:h-[320px] rounded-[24px] overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={cat.img} 
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-2">{cat.count}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl lg:text-2xl font-black text-white">{cat.name}</h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TopCategories);
