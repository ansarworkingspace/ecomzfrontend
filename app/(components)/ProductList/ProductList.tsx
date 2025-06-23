"use client";

import { Search, Filter, Heart, Star } from "lucide-react";
import { useState } from "react";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 3 rows × 4 products

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: "Minimalist Cotton Tee",
      price: 45,
      originalPrice: 60,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "T-Shirts",
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 120,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Jackets",
    },
    {
      id: 3,
      name: "Organic Linen Dress",
      price: 85,
      originalPrice: 110,
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 156,
      category: "Dresses",
    },
    {
      id: 4,
      name: "Tailored Chino Pants",
      price: 75,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 201,
      category: "Pants",
    },
    {
      id: 5,
      name: "Merino Wool Sweater",
      price: 95,
      originalPrice: 130,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 78,
      category: "Sweaters",
    },
    {
      id: 6,
      name: "Canvas Sneakers",
      price: 65,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 143,
      category: "Shoes",
    },
    {
      id: 7,
      name: "Silk Blouse",
      price: 110,
      originalPrice: 140,
      image:
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 67,
      category: "Blouses",
    },
    {
      id: 8,
      name: "Leather Belt",
      price: 35,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 92,
      category: "Accessories",
    },
    {
      id: 9,
      name: "Cashmere Scarf",
      price: 80,
      originalPrice: 100,
      image:
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 45,
      category: "Accessories",
    },
    {
      id: 10,
      name: "Athletic Shorts",
      price: 40,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1506629905607-ce19a96c0c87?w=400&h=500&fit=crop",
      rating: 4.4,
      reviews: 189,
      category: "Shorts",
    },
    {
      id: 11,
      name: "Button-up Shirt",
      price: 70,
      originalPrice: 90,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 112,
      category: "Shirts",
    },
    {
      id: 12,
      name: "Wool Coat",
      price: 180,
      originalPrice: 220,
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 34,
      category: "Coats",
    },
    {
      id: 13,
      name: "Summer Sundress",
      price: 55,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 167,
      category: "Dresses",
    },
    {
      id: 14,
      name: "Knit Cardigan",
      price: 85,
      originalPrice: 115,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 89,
      category: "Cardigans",
    },
    {
      id: 15,
      name: "Denim Jeans",
      price: 90,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "Jeans",
    },
    {
      id: 16,
      name: "Canvas Tote Bag",
      price: 25,
      originalPrice: 35,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 78,
      category: "Bags",
    },
  ];

  // Filter products based on search term
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">
              Ecomz <span className="text-green-600">Collection</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our complete range of sustainable fashion pieces designed
              for modern living
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-black hover:text-black">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative bg-gray-50 rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">
                      Sale
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-black group-hover:text-green-600">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">{product.category}</p>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-black">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    {product.reviews} reviews
                  </p>

                  <button className="w-full mt-3 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "border border-gray-300 text-gray-700 hover:border-black hover:text-black"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
