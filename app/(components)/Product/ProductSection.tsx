import { Star, Heart } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "Essential White Tee",
      price: "$39",
      originalPrice: "$49",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Minimal Black Hoodie",
      price: "$89",
      originalPrice: "$109",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center",
      rating: 4.9,
      reviews: 89,
      badge: "New",
    },
    {
      id: 3,
      name: "Classic Denim Jacket",
      price: "$129",
      originalPrice: "$159",
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=500&fit=crop&crop=center",
      rating: 4.7,
      reviews: 156,
      badge: "Sale",
    },
    {
      id: 4,
      name: "Comfort Joggers",
      price: "$69",
      originalPrice: "$89",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&crop=center",
      rating: 4.6,
      reviews: 203,
      badge: "Popular",
    },
  ];

  const getBadgeStyles = (badge: any) => {
    switch (badge) {
      case "Best Seller":
        return "bg-green-100 text-green-800";
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Sale":
        return "bg-red-100 text-red-800";
      case "Popular":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: any) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully selected pieces that embody our commitment to quality,
            comfort, and timeless design
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyles(
                      product.badge
                    )}`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-50 shadow-md">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-black">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-black">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 border-2 border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
