import { memo, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Quote } from "lucide-react";

const TESTIMONIALS = [
  { id: 1, name: "Rajesh Kumar", role: "Retail Electronics Store Owner", location: "Delhi", text: "Indiafy completely transformed my sourcing. I used to rely on 3 different local brokers for LED TVs. Now I buy directly from manufacturers with 30% better margins.", rating: 5 },
  { id: 2, name: "Anita Sharma", role: "Restaurant Chain Manager", location: "Mumbai", text: "The video packing feature gives us absolute peace of mind when ordering bulk groceries. Zero disputes in the last 6 months.", rating: 5 },
  { id: 3, name: "Vikram Singh", role: "Corporate Procurement", location: "Bangalore", text: "Finding GST-verified office furniture suppliers was a nightmare. Indiafy's network saved us weeks of background checks.", rating: 5 },
  { id: 4, name: "Priya Desai", role: "Apparel Reseller", location: "Ahmedabad", text: "The volume pricing is incredibly transparent. I can clearly see how much I save as my order size increases. Highly recommended.", rating: 5 },
];

function BusinessTestimonials() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (direction === 'left') {
        current.scrollBy({ left: -400, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: 400, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-white border-b border-brand-border overflow-hidden">
      <div className="section-container">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-display font-black text-brand-primary mb-4 tracking-tight">
              Trusted by <span className="text-brand-accent">Thousands</span>
            </h2>
            <p className="text-lg text-brand-text-secondary font-medium">
              Join leading retailers, restaurants, and corporate teams sourcing efficiently.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-primary hover:bg-brand-background transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-primary hover:bg-brand-background transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 lg:gap-8 pb-8 hide-scrollbar snap-x snap-mandatory"
        >
          {TESTIMONIALS.map((test) => (
            <div 
              key={test.id} 
              className="snap-start shrink-0 w-[300px] md:w-[400px] bg-brand-background border border-brand-border rounded-[24px] p-8 flex flex-col"
            >
              <Quote size={32} className="text-brand-border mb-6" fill="currentColor" />
              
              <p className="text-lg font-medium text-brand-primary leading-relaxed mb-8 flex-1">
                "{test.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-brand-border pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-xl shrink-0">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-black text-brand-primary flex items-center gap-1">
                    {test.name}
                    <ShieldCheck size={14} className="text-brand-accent" />
                  </h4>
                  <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(BusinessTestimonials);
