import { lazy, Suspense, useEffect } from "react";
import WebsiteNavbar from "../../components/WebsiteNavbar";
import Footer from "../../components/Footer";

// Lazy loaded sections
const Hero = lazy(() => import("../../components/WholesalePage/Hero"));
const SupplierNetwork = lazy(() => import("../../components/WholesalePage/SupplierNetwork"));
const SearchFilterBar = lazy(() => import("../../components/WholesalePage/SearchFilterBar"));
const TopCategories = lazy(() => import("../../components/WholesalePage/TopCategories"));
const ProfitOpportunities = lazy(() => import("../../components/WholesalePage/ProfitOpportunities"));
const TrendingBulkProducts = lazy(() => import("../../components/WholesalePage/TrendingBulkProducts"));
const FeaturedSuppliers = lazy(() => import("../../components/WholesalePage/FeaturedSuppliers"));
const ProcurementProcess = lazy(() => import("../../components/WholesalePage/ProcurementProcess"));
const LiveBulkDeals = lazy(() => import("../../components/WholesalePage/LiveBulkDeals"));
const ComparisonSection = lazy(() => import("../../components/WholesalePage/ComparisonSection"));
const WhyIndiafy = lazy(() => import("../../components/WholesalePage/WhyIndiafy"));
const BusinessTestimonials = lazy(() => import("../../components/WholesalePage/BusinessTestimonials"));
const CatalogueDownload = lazy(() => import("../../components/WholesalePage/CatalogueDownload"));
const PostRequirement = lazy(() => import("../../components/WholesalePage/PostRequirement"));

const SectionLoader = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-brand-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 rounded-full border-4 border-brand-accent/20 border-t-brand-accent animate-spin" />
      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">Loading Module...</p>
    </div>
  </div>
);

export default function WholesalePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-background font-sans selection:bg-brand-accent selection:text-white">
      <WebsiteNavbar />
      
      <main className="w-full flex flex-col">
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SupplierNetwork />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SearchFilterBar />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TopCategories />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProfitOpportunities />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TrendingBulkProducts />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FeaturedSuppliers />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProcurementProcess />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <LiveBulkDeals />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ComparisonSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <WhyIndiafy />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <BusinessTestimonials />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <CatalogueDownload />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PostRequirement />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}