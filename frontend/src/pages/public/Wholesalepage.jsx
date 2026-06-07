import { lazy, Suspense, useEffect } from "react";
import SEOHead from "../../components/seo/SEOHead";
import WebsiteNavbar from "../../components/WebsiteNavbar";
import Footer from "../../components/Footer";
import { WholesaleSkeleton } from "../../components/ui/skeletons/WholesaleSkeleton";

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
  <div className="py-12 max-w-7xl mx-auto px-4" role="status" aria-label="Loading section">
    <WholesaleSkeleton count={6} mode="product" />
  </div>
);

export default function WholesalePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-background font-sans selection:bg-brand-accent selection:text-white">
      <SEOHead 
        title="Wholesale Marketplace India | Verified Wholesale Suppliers in Gurugram"
        description="Join Indiafy's B2B marketplace in India. Start bulk product sourcing from verified wholesale suppliers and trusted manufacturers."
      />
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