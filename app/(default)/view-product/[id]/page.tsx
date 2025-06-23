"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Plus,
  Minus,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER;

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant]: any = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BASE_URL}/products/view/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const productData = data.data;
        setProduct(productData);

        // Set first variant as default
        if (productData?.variants?.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Handle variant selection
  const handleVariantSelect = (variant: any) => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0);
    setQuantity(1);
  };

  // Handle quantity change
  const handleQuantityChange = (change: any) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= selectedVariant.quantity) {
      setQuantity(newQuantity);
    }
  };

  // Get variant display text
  const getVariantDisplayText = (variant: any) => {
    return variant.selectedOptions
      .map((option: any) => `${option.optionName}: ${option.selectedValue}`)
      .join(", ");
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4">Product not found</div>;
  if (!selectedVariant) return <div className="p-4">No variants available</div>;

  const features = [
    { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "SSL encrypted checkout",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border">
              <img
                src={selectedVariant.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {selectedVariant.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {selectedVariant.images.map((image: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 bg-white rounded border-2 overflow-hidden ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Details */}
          <div className="space-y-6">
            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (4.8) • 124 reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{selectedVariant.salePrice || selectedVariant.price}
                </span>
                {selectedVariant.salePrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{selectedVariant.price}
                    </span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {Math.round(
                        ((selectedVariant.price - selectedVariant.salePrice) /
                          selectedVariant.price) *
                          100
                      )}
                      % off
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Select Variant
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant._id}
                      onClick={() => handleVariantSelect(variant)}
                      className={`p-3 text-left border rounded-lg transition-colors ${
                        selectedVariant._id === variant._id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {getVariantDisplayText(variant)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            SKU: {variant.sku}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{variant.salePrice || variant.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            {variant.quantity > 0
                              ? `${variant.quantity} left`
                              : "Out of stock"}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Current Variant Details */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Selected Variant
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>SKU: {selectedVariant.sku}</div>
                <div>Stock: {selectedVariant.quantity} available</div>
                <div>{getVariantDisplayText(selectedVariant)}</div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= selectedVariant.quantity}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {selectedVariant.quantity} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                disabled={selectedVariant.quantity === 0}
                className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {selectedVariant.quantity === 0
                  ? "Out of Stock"
                  : `Buy Now - ₹${(
                      (selectedVariant.salePrice || selectedVariant.price) *
                      quantity
                    ).toFixed(2)}`}
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="space-y-3">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {feature.title}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          {feature.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
