"use client";

import { useState } from "react";
import {
  Heart,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Plus,
  Minus,
} from "lucide-react";

const ProductDetailPage = () => {
  // Sample data with dynamic options structure
  const productData = {
    success: true,
    message: "Product details fetched successfully",
    data: {
      _id: "6858160cb37cd4aae6c9beaf",
      name: "Premium Cotton T-Shirt",
      description:
        "High-quality 100% cotton t-shirt with comfortable fit. Perfect for casual wear and everyday comfort. Made from sustainably sourced materials with a focus on durability and style.",
      category: "T-Shirts",
      isFeatured: true,
      mainImage:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      status: "active",
      variants: [
        {
          _id: "6858160cb37cd4aae6c9beb4",
          sku: "TSHIRT-BLK-M-COTTON",
          price: 25.99,
          salePrice: 19.99,
          quantity: 71,
          images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f37f5b6e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
          ],
          description: "Black color, Medium size, Cotton material",
          selectedOptions: [
            { optionName: "Color", selectedValue: "Black" },
            { optionName: "Size", selectedValue: "Medium" },
            { optionName: "Material", selectedValue: "Cotton" },
          ],
        },
        {
          _id: "6858160cb37cd4aae6c9beb7",
          sku: "TSHIRT-WHT-M-COTTON",
          price: 25.99,
          quantity: 60,
          images: [
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f37f5b6e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
          ],
          description: "White color, Medium size, Cotton material",
          selectedOptions: [
            { optionName: "Color", selectedValue: "White" },
            { optionName: "Size", selectedValue: "Medium" },
            { optionName: "Material", selectedValue: "Cotton" },
          ],
        },
        {
          _id: "6858160cb37cd4aae6c9beb1",
          sku: "TSHIRT-BLK-S-COTTON",
          price: 25.99,
          salePrice: 19.99,
          quantity: 48,
          images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f37f5b6e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
          ],
          description: "Black color, Small size, Cotton material",
          selectedOptions: [
            { optionName: "Color", selectedValue: "Black" },
            { optionName: "Size", selectedValue: "Small" },
            { optionName: "Material", selectedValue: "Cotton" },
          ],
        },
        {
          _id: "6858160cb37cd4aae6c9beb8",
          sku: "TSHIRT-RED-L-BLEND",
          price: 29.99,
          salePrice: 24.99,
          quantity: 35,
          images: [
            "https://images.unsplash.com/photo-1583743814966-8936f37f5b6e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
          ],
          description: "Red color, Large size, Cotton Blend material",
          selectedOptions: [
            { optionName: "Color", selectedValue: "Red" },
            { optionName: "Size", selectedValue: "Large" },
            { optionName: "Material", selectedValue: "Cotton Blend" },
            { optionName: "Style", selectedValue: "Regular Fit" },
          ],
        },
        {
          _id: "6858160cb37cd4aae6c9beb9",
          sku: "TSHIRT-RED-L-BLEND-SLIM",
          price: 29.99,
          quantity: 22,
          images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f37f5b6e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
          ],
          description: "Red color, Large size, Cotton Blend material, Slim Fit",
          selectedOptions: [
            { optionName: "Color", selectedValue: "Red" },
            { optionName: "Size", selectedValue: "Large" },
            { optionName: "Material", selectedValue: "Cotton Blend" },
            { optionName: "Style", selectedValue: "Slim Fit" },
          ],
        },
      ],
    },
  };

  const { data: product } = productData;

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    // Initialize with first variant's options
    const initialOptions: any = {};
    selectedVariant.selectedOptions.forEach((option: any) => {
      initialOptions[option.optionName] = option.selectedValue;
    });
    return initialOptions;
  });
  const [quantity, setQuantity] = useState(1);

  // Get all unique option names dynamically
  const getAllOptionNames = () => {
    const optionNames = new Set();
    product.variants.forEach((variant) => {
      variant.selectedOptions.forEach((option) => {
        optionNames.add(option.optionName);
      });
    });
    return Array.from(optionNames);
  };

  // Get unique values for a specific option
  const getUniqueOptionValues = (optionName: any) => {
    const values = new Set();
    product.variants.forEach((variant) => {
      const option = variant.selectedOptions.find(
        (opt) => opt.optionName === optionName
      );
      if (option) {
        values.add(option.selectedValue);
      }
    });
    return Array.from(values);
  };

  // Check if an option value is available with current selections
  const isOptionValueAvailable = (optionName: any, value: any) => {
    const tempOptions: any = { ...selectedOptions, [optionName]: value };
    return product.variants.some((variant) => {
      return Object.keys(tempOptions).every((key) => {
        const variantOption = variant.selectedOptions.find(
          (opt) => opt.optionName === key
        );
        return (
          variantOption && variantOption.selectedValue === tempOptions[key]
        );
      });
    });
  };

  // Handle option selection
  const handleOptionChange = (optionName: any, value: any) => {
    const newSelectedOptions: any = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newSelectedOptions);

    // Find matching variant
    const matchingVariant = product.variants.find((variant) => {
      return Object.keys(newSelectedOptions).every((key) => {
        const variantOption = variant.selectedOptions.find(
          (opt) => opt.optionName === key
        );
        return (
          variantOption &&
          variantOption.selectedValue === newSelectedOptions[key]
        );
      });
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  };

  const handleQuantityChange = (change: any) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= selectedVariant.quantity) {
      setQuantity(newQuantity);
    }
  };

  const allOptionNames: any = getAllOptionNames();

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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={selectedVariant.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {selectedVariant.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? "border-green-600"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="space-y-8">
            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  {product.category && (
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      {product.category}
                    </p>
                  )}
                  <h1 className="text-3xl font-bold text-black mt-1">
                    {product.name}
                  </h1>
                </div>
                <button className="p-3 border border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
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
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-black">
                  ${selectedVariant.salePrice || selectedVariant.price}
                </span>
                {selectedVariant.salePrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${selectedVariant.price}
                  </span>
                )}
                {selectedVariant.salePrice && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                    Save $
                    {(
                      selectedVariant.price - selectedVariant.salePrice
                    ).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Dynamic Options */}
            <div className="space-y-6">
              {allOptionNames.map((optionName: any) => {
                const values = getUniqueOptionValues(optionName);
                const currentValue = selectedOptions[optionName];

                return (
                  <div key={optionName}>
                    <h3 className="text-sm font-medium text-black mb-3">
                      {optionName}:{" "}
                      {currentValue && (
                        <span className="font-normal">{currentValue}</span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {values.map((value: any) => {
                        const isSelected = currentValue === value;
                        const isAvailable = isOptionValueAvailable(
                          optionName,
                          value
                        );

                        return (
                          <button
                            key={value}
                            onClick={() =>
                              handleOptionChange(optionName, value)
                            }
                            disabled={!isAvailable}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                              isSelected
                                ? "border-black bg-black text-white"
                                : isAvailable
                                ? "border-gray-300 text-gray-700 hover:border-black hover:text-black"
                                : "border-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-black mb-3">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-black font-medium min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= selectedVariant.quantity}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {selectedVariant.quantity} available
                  </span>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="space-y-4">
              <button
                disabled={selectedVariant.quantity === 0}
                className="w-full px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {selectedVariant.quantity === 0
                  ? "Out of Stock"
                  : `Buy Now - $${(
                      (selectedVariant.salePrice || selectedVariant.price) *
                      quantity
                    ).toFixed(2)}`}
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="font-medium text-black">
                          {feature.title}
                        </span>
                        <span className="text-gray-600 text-sm ml-2">
                          {feature.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 space-y-2">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-black">SKU:</span>{" "}
                {selectedVariant.sku}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-black">Variant:</span>{" "}
                {selectedVariant.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
