"use client";

import React from "react";
import { Star, Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
}

const ProductsSection = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299",
      originalPrice: "$399",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 2847,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199",
      originalPrice: "$279",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 1932,
      badge: "New",
    },
    {
      id: 3,
      name: "Ultra-Light Laptop",
      price: "$1,299",
      originalPrice: "$1,599",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 856,
      badge: "Hot Deal",
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: "$49",
      originalPrice: "$79",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 1247,
      badge: "Sale",
    },
  ];

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-yellow-500 text-black";
      case "New":
        return "bg-green-500 text-white";
      case "Hot Deal":
        return "bg-red-500 text-white";
      case "Sale":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <section id="products" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handpicked premium products that define quality and innovation
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeStyles(
                      product.badge
                    )}`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30">
                  <Heart className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-400 ml-2">
                      {product.rating} ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">
                      {product.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-semibold text-lg hover:bg-purple-500 hover:text-white transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
