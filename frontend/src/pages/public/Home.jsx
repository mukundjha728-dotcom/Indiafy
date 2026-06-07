import React, { lazy, Suspense, memo } from "react";
import SEOHead from "../../components/seo/SEOHead";

// Layout Components - eagerly loaded (always visible)
import WebsiteNavbar from "../../components/WebsiteNavbar";
import Footer from "../../components/Footer";

// Above-the-fold: eagerly loaded for fast LCP
import Hero from "../../components/HomePage/Hero";

// Below-the-fold: lazy loaded for performance
const BrowseCategories = lazy(() => import("../../components/HomePage/BrowseCategories"));
const TrendingProducts = lazy(() => import("../../components/HomePage/TrendingProducts"));
const FlashSale = lazy(() => import("../../components/HomePage/FlashSale"));
const VerifiedStores = lazy(() => import("../../components/HomePage/VerifiedStores"));
const QuickCommerceStrip = lazy(() => import("../../components/HomePage/QuickCommerceStrip"));
const WholesaleStrip = lazy(() => import("../../components/HomePage/WholesaleStrip"));
const RecentlyViewed = lazy(() => import("../../components/HomePage/RecentlyViewed"));
const NearbyStores = lazy(() => import("../../components/HomePage/NearbyStores"));
const TrustSection = lazy(() => import("../../components/HomePage/TrustSection"));
const Testimonials = lazy(() => import("../../components/HomePage/Testimonials"));
const AppDownload = lazy(() => import("../../components/HomePage/AppDownload"));

// Lightweight section fallback
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center" role="status" aria-label="Loading section">
    <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-accent rounded-full animate-spin" />
  </div>
);

const Home = memo(() => {
  const homeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Indiafy",
      "url": "https://india-fy.vercel.app/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://india-fy.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Indiafy",
      "url": "https://india-fy.vercel.app",
      "logo": "https://india-fy.vercel.app/logo.png",
      "sameAs": [
        "https://www.facebook.com/indiafy",
        "https://twitter.com/indiafy",
        "https://www.instagram.com/indiafy"
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="Indiafy | Hyperlocal Commerce & Verified Sellers Marketplace"
        description="Shop from verified local sellers, wholesale suppliers and quick commerce networks across India."
        schemas={homeSchemas}
      />
      <WebsiteNavbar />

      <main className="overflow-hidden">
        {/* 02 Hero */}
        <Hero />

        {/* 03 Categories */}
        <Suspense fallback={<SectionLoader />}>
          <BrowseCategories />
        </Suspense>

        {/* 04 Trending Products */}
        <Suspense fallback={<SectionLoader />}>
          <TrendingProducts />
        </Suspense>

        {/* 05 Flash Sale */}
        <Suspense fallback={<SectionLoader />}>
          <FlashSale />
        </Suspense>

        {/* 06 Featured Stores */}
        <Suspense fallback={<SectionLoader />}>
          <VerifiedStores />
        </Suspense>

        {/* 07 Quick Commerce */}
        <Suspense fallback={<SectionLoader />}>
          <QuickCommerceStrip />
        </Suspense>

        {/* 08 Wholesale */}
        <Suspense fallback={<SectionLoader />}>
          <WholesaleStrip />
        </Suspense>

        {/* 09 Recommended Products (Recently Viewed) */}
        <Suspense fallback={<SectionLoader />}>
          <RecentlyViewed />
        </Suspense>

        {/* 10 Nearby Stores */}
        <Suspense fallback={<SectionLoader />}>
          <NearbyStores />
        </Suspense>

        {/* 11 Trust Section */}
        <Suspense fallback={<SectionLoader />}>
          <TrustSection />
        </Suspense>

        {/* 12 Testimonials */}
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>

        {/* 13 App Download */}
        {/* <Suspense fallback={<SectionLoader />}>
          <AppDownload />
        </Suspense> */}
      </main>

      {/* 14 Footer */}
      <Footer />
    </>
  );
});

Home.displayName = 'Home';

export default Home;
