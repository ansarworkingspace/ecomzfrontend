import BackNavigation from "@/app/(components)/BackToHome/BackToHome";
import Footer from "@/app/(components)/Footer/FooterSection";
import ProductsList from "@/app/(components)/ProductList/ProductList";
import React from "react";

const page = () => {
  return (
    <>
      <BackNavigation />
      <ProductsList />
      <Footer />
    </>
  );
};

export default page;
