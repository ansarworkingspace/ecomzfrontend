"use client";

import { Search, Filter, Heart, Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const productsPerPage = 10; // Match API default

  // Fetch products from API
  const fetchProducts = async (page = 1, search = "") => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER || "http://localhost:3000";
      let url = `${baseUrl}/products/list?page=${page}&limit=${productsPerPage}`;

      // Add search parameter if search term exists
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setProducts(result.data.data || []);
        setPagination(
          result.data.pagination || {
            totalPages: 0,
            totalItems: 0,
            hasNextPage: false,
            hasPrevPage: false,
          }
        );
      } else {
        throw new Error(result.message || "Failed to fetch products");
      }
    } catch (err: any) {
      setError(err.message);
      setProducts([]);
      setPagination({
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1, "");
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== "") {
        setCurrentPage(1);
        fetchProducts(1, searchTerm);
      } else {
        setCurrentPage(1);
        fetchProducts(1, "");
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    fetchProducts(page, searchTerm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // Format product data to match the original structure
  const formatProduct = (product: any) => ({
    id: product._id,
    name: product.name,
    price: product.price || 0,
    originalPrice: product.originalPrice || null,
    image:
      product.mainImage ||
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    rating: product.rating || 4.5,
    reviews: product.reviewCount || 0,
    category: product.category?.name || product.category || "General",
    description: product.description,
    isFeatured: product.isFeatured,
    status: product.status,
  });

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
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-black hover:text-black">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <p className="text-gray-600">
                {loading
                  ? "Loading..."
                  : `${pagination.totalItems} products found`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg mb-4">Error: {error}</p>
            <button
              onClick={() => fetchProducts(currentPage, searchTerm)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => {
              const formattedProduct = formatProduct(product);
              return (
                <div key={formattedProduct.id} className="group cursor-pointer">
                  <div className="relative bg-gray-50 rounded-xl overflow-hidden mb-4">
                    <img
                      src={formattedProduct.image}
                      alt={formattedProduct.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e: any) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop";
                      }}
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    {formattedProduct.originalPrice && (
                      <div className="absolute top-4 left-4 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">
                        Sale
                      </div>
                    )}
                    {formattedProduct.isFeatured && (
                      <div className="absolute bottom-4 left-4 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-black group-hover:text-green-600 truncate">
                        {formattedProduct.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {formattedProduct.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      {formattedProduct.description}
                    </p>

                    <div className="flex items-center space-x-2">
                      {formattedProduct.price > 0 && (
                        <>
                          <span className="text-lg font-bold text-black">
                            ${formattedProduct.price}
                          </span>
                          {formattedProduct.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${formattedProduct.originalPrice}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {formattedProduct.reviews > 0 && (
                      <p className="text-xs text-gray-500">
                        {formattedProduct.reviews} reviews
                      </p>
                    )}

                    <button
                      className="w-full mt-3 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                      onClick={() =>
                        router.push(`/view-product/${product._id}`)
                      }
                    >
                      View Product
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(pagination.totalPages)].map((_, index) => {
              const page = index + 1;
              // Show only a few pages around current page for better UX
              const showPage =
                page === 1 ||
                page === pagination.totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2);

              if (!showPage) {
                // Show ellipsis for skipped pages
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

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
              disabled={!pagination.hasNextPage}
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
