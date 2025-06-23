import React from "react";
import Header from "./(components)/Header/HeaderSection";
import HeroSection from "./(components)/Hero/HeroSection";
import ProductsSection from "./(components)/Product/ProductSection";
import Footer from "./(components)/Footer/FooterSection";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
  
      <HeroSection />
      <ProductsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
