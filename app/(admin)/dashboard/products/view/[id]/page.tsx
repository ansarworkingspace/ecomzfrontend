"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Star,
  Package,
  DollarSign,
  Ruler,
  Tag,
} from "lucide-react";

const ProductViewPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/products/view/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const json = await res.json();
        if (json.success) {
          setProduct(json.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Product Details
                </h1>
                <p className="text-sm text-gray-600">
                  View complete product information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  product.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {product.status}
              </span>
              {product.isFeatured && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Product Main Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Product Image */}
              <div className="lg:col-span-1">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Product Metadata */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Eye className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">Status:</span>
                      <span className="ml-2 capitalize">{product.status}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Star className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">Featured:</span>
                      <span className="ml-2">
                        {product.isFeatured ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">Created:</span>
                      <span className="ml-2">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Package className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">Variants:</span>
                      <span className="ml-2">
                        {product.variants.length} variant(s)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              Product Variants
            </h3>
            <p className="text-gray-600 mt-1">
              Detailed information for each variant
            </p>
          </div>

          <div className="p-8">
            <div className="space-y-8">
              {product.variants.map((variant: any, index: number) => (
                <div
                  key={variant._id}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  {/* Variant Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">
                      Variant #{index + 1}
                    </h4>
                    <p className="text-sm text-gray-600">SKU: {variant.sku}</p>
                  </div>

                  <div className="p-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Variant Images */}
                      <div className="lg:col-span-1">
                        <h5 className="font-medium text-gray-900 mb-4">
                          Images
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                          {variant.images.map((img: string, idx: number) => (
                            <div
                              key={idx}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                            >
                              <img
                                src={img}
                                alt={`Variant image ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Variant Details */}
                      <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Pricing & Inventory */}
                          <div className="space-y-4">
                            <h5 className="font-medium text-gray-900 flex items-center">
                              <DollarSign className="w-4 h-4 mr-2" />
                              Pricing & Inventory
                            </h5>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Regular Price:
                                </span>
                                <span className="font-medium">
                                  ${variant.price}
                                </span>
                              </div>
                              {variant.salePrice && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Sale Price:
                                  </span>
                                  <span className="font-medium text-green-600">
                                    ${variant.salePrice}
                                  </span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Stock Quantity:
                                </span>
                                <span className="font-medium">
                                  {variant.quantity}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Dimensions */}
                          <div className="space-y-4">
                            <h5 className="font-medium text-gray-900 flex items-center">
                              <Ruler className="w-4 h-4 mr-2" />
                              Dimensions
                            </h5>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Length:</span>
                                <span className="font-medium">
                                  {variant.dimensions.length}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Width:</span>
                                <span className="font-medium">
                                  {variant.dimensions.width}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Height:</span>
                                <span className="font-medium">
                                  {variant.dimensions.height}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                          <h5 className="font-medium text-gray-900 mb-2">
                            Description
                          </h5>
                          <p className="text-gray-600 text-sm">
                            {variant.description}
                          </p>
                        </div>

                        {/* Options */}
                        {variant.selectedOptions &&
                          variant.selectedOptions.length > 0 && (
                            <div className="mt-6">
                              <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                                <Tag className="w-4 h-4 mr-2" />
                                Selected Options
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {variant.selectedOptions.map((opt: any) => (
                                  <div
                                    key={opt._id}
                                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                                  >
                                    <span className="font-medium text-gray-700">
                                      {opt.optionName}:
                                    </span>
                                    <span className="text-gray-600 ml-1">
                                      {opt.selectedValue}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;
