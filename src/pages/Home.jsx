import React from "react";

// Layout Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Home Sections
import StoreModeToggle from "../components/HomePage/StoreModeToggle";
import Hero from "../components/HomePage/Hero";
import BrowseCategories from "../components/HomePage/BrowseCategories";
import TrustSection from "../components/HomePage/TrustSection";
import VerifiedStores from "../components/HomePage/VerifiedStores";

const Home = () => {
  return (
    <>
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <StoreModeToggle />
        <Hero />
        <BrowseCategories />
        <VerifiedStores />
        <TrustSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;