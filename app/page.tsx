import React from "react";
import Header from "./(components)/Header/HeaderSection";
import HeroSection from "./(components)/Hero/HeroSection";
import Footer from "./(components)/Footer/FooterSection";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
   
      <Footer />
    </div>
  );
};

export default HomePage;
