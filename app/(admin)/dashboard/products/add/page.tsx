"use client";

import React, { useState } from "react";
import { Plus, X, Upload, Eye, EyeOff } from "lucide-react";

const ProductCreationPage = () => {
  // Mock data for categories and options (normally from API)
  const mockCategories = [
    { id: "60f1b2b3c4d5e6f7a8b9c0d1", name: "T-Shirts" },
    { id: "60f1b2b3c4d5e6f7a8b9c0d2", name: "Jeans" },
    { id: "60f1b2b3c4d5e6f7a8b9c0d3", name: "Shoes" },
  ];

  const mockOptions = [
    {
      id: "60f1b2b3c4d5e6f7a8b9c0d2",
      name: "Color",
      values: ["Black", "White", "Red", "Blue", "Green"],
    },
    {
      id: "60f1b2b3c4d5e6f7a8b9c0d3",
      name: "Size",
      values: ["XS", "Small", "Medium", "Large", "XL", "XXL"],
    },
    {
      id: "60f1b2b3c4d5e6f7a8b9c0d4",
      name: "Material",
      values: ["Cotton", "Polyester", "Blend", "Wool"],
    },
  ];

  // Basic product state
  const [basicProduct, setBasicProduct]: any = useState({
    name: "",
    description: "",
    category: "",
    isFeatured: false,
    mainImage: "",
  });

  // Variants state
  const [variants, setVariants]: any = useState([]);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);

  // Current variant being created/edited
  const [currentVariant, setCurrentVariant] = useState({
    sku: "",
    price: "",
    salePrice: "",
    cost: "",
    quantity: "",
    lowStockThreshold: "",
    images: [""],
    description: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    selectedOptions: [],
    isActive: true,
  });

  const [selectedOptionsForVariant, setSelectedOptionsForVariant]: any =
    useState([]);

  // Handle basic product changes
  const handleBasicProductChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setBasicProduct((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle variant field changes
  const handleVariantChange = (e: any) => {
    const { name, value } = e.target;
    if (name.includes("dimensions.")) {
      const dimensionField = name.split(".")[1];
      setCurrentVariant((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimensionField]: value,
        },
      }));
    } else {
      setCurrentVariant((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle variant image changes
  const handleVariantImageChange = (index: any, value: any) => {
    const newImages = [...currentVariant.images];
    newImages[index] = value;
    setCurrentVariant((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addVariantImage = () => {
    setCurrentVariant((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeVariantImage = (index: any) => {
    if (currentVariant.images.length > 1) {
      const newImages = currentVariant.images.filter((_, i) => i !== index);
      setCurrentVariant((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  // Handle option selection for variant
  const addOptionToVariant: any = () => {
    setSelectedOptionsForVariant((prev: any) => [
      ...prev,
      { optionId: "", selectedValue: "" },
    ]);
  };

  const removeOptionFromVariant = (index: any) => {
    setSelectedOptionsForVariant((prev: any) =>
      prev.filter((_: any, i: any) => i !== index)
    );
  };

  const handleOptionChange = (index: any, field: any, value: any) => {
    const newOptions: any = [...selectedOptionsForVariant];
    newOptions[index] = { ...newOptions[index], [field]: value };

    if (field === "optionId") {
      const option = mockOptions.find((opt) => opt.id === value);
      newOptions[index].optionName = option ? option.name : "";
      newOptions[index].selectedValue = "";
    }

    setSelectedOptionsForVariant(newOptions);
  };

  // Start creating new variant
  const startCreateVariant = () => {
    setCurrentVariant({
      sku: "",
      price: "",
      salePrice: "",
      cost: "",
      quantity: "",
      lowStockThreshold: "",
      images: [""],
      description: "",
      dimensions: { length: "", width: "", height: "" },
      selectedOptions: [],
      isActive: true,
    });
    setSelectedOptionsForVariant([]);
    setEditingVariantIndex(null);
    setShowVariantForm(true);
  };

  // Edit existing variant
  const editVariant = (index: any) => {
    const variant = variants[index];
    setCurrentVariant(variant);
    setSelectedOptionsForVariant(variant.selectedOptions || []);
    setEditingVariantIndex(index);
    setShowVariantForm(true);
  };

  // Save variant
  const saveVariant = () => {
    const variantToSave = {
      ...currentVariant,
      selectedOptions: selectedOptionsForVariant.filter(
        (opt: any) => opt.optionId && opt.selectedValue
      ),
    };

    if (editingVariantIndex !== null) {
      // Update existing variant
      const newVariants = [...variants];
      newVariants[editingVariantIndex] = variantToSave;
      setVariants(newVariants);
    } else {
      // Add new variant
      setVariants((prev: any) => [...prev, variantToSave]);
    }

    setShowVariantForm(false);
    setEditingVariantIndex(null);
  };

  // Remove variant
  const removeVariant = (index: any) => {
    setVariants((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };

  // Cancel variant form
  const cancelVariantForm = () => {
    setShowVariantForm(false);
    setEditingVariantIndex(null);
  };

  // Submit complete product
  const handleSubmitProduct = () => {
    const productData = {
      ...basicProduct,
      variants: variants,
    };

    console.log("Product Data:", JSON.stringify(productData, null, 2));
    alert("Product created successfully! Check console for data.");
  };

  const getSelectedOptionDisplay = (options: any) => {
    return options
      .map((opt: any) => `${opt.optionName}: ${opt.selectedValue}`)
      .join(", ");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white text-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Product
        </h1>
        <p className="text-gray-600">
          Add a new product with variants and options
        </p>
      </div>

      {/* Basic Product Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={basicProduct.name}
              onChange={handleBasicProductChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={basicProduct.category}
              onChange={handleBasicProductChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {mockCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={basicProduct.description}
              onChange={handleBasicProductChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image URL
            </label>
            <input
              type="url"
              name="mainImage"
              value={basicProduct.mainImage}
              onChange={handleBasicProductChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={basicProduct.isFeatured}
                onChange={handleBasicProductChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured Product
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Variants Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Product Variants
          </h2>
          <button
            onClick={startCreateVariant}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Variant</span>
          </button>
        </div>

        {/* Existing Variants List */}
        <div className="space-y-4">
          {variants.map((variant: any, index: any) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {variant.sku || `Variant ${index + 1}`}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Price: ${variant.price} | Quantity: {variant.quantity}
                  </p>
                  {variant.selectedOptions &&
                    variant.selectedOptions.length > 0 && (
                      <p className="text-sm text-blue-600 mt-1">
                        {getSelectedOptionDisplay(variant.selectedOptions)}
                      </p>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => editVariant(index)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeVariant(index)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Form Modal */}
      {showVariantForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingVariantIndex !== null
                    ? "Edit Variant"
                    : "Add New Variant"}
                </h3>
                <button
                  onClick={cancelVariantForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Variant Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={currentVariant.sku}
                    onChange={handleVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., TSHIRT-BLK-S"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentVariant.price}
                    onChange={handleVariantChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="25.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    name="salePrice"
                    value={currentVariant.salePrice}
                    onChange={handleVariantChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="19.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={currentVariant.cost}
                    onChange={handleVariantChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12.50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={currentVariant.quantity}
                    onChange={handleVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    name="lowStockThreshold"
                    value={currentVariant.lowStockThreshold}
                    onChange={handleVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10"
                  />
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <input
                    type="number"
                    name="dimensions.length"
                    value={currentVariant.dimensions.length}
                    onChange={handleVariantChange}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="28"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width
                  </label>
                  <input
                    type="number"
                    name="dimensions.width"
                    value={currentVariant.dimensions.width}
                    onChange={handleVariantChange}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height
                  </label>
                  <input
                    type="number"
                    name="dimensions.height"
                    value={currentVariant.dimensions.height}
                    onChange={handleVariantChange}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={currentVariant.isActive}
                      onChange={(e) =>
                        setCurrentVariant((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Active
                    </span>
                  </label>
                </div>
              </div>

              {/* Variant Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variant Description
                </label>
                <textarea
                  name="description"
                  value={currentVariant.description}
                  onChange={handleVariantChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe this variant"
                />
              </div>

              {/* Variant Images */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variant Images
                </label>
                <div className="space-y-3">
                  {currentVariant.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) =>
                          handleVariantImageChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      {currentVariant.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariantImage(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addVariantImage}
                  className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Image
                </button>
              </div>

              {/* Options Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Variant Options
                  </label>
                  <button
                    type="button"
                    onClick={addOptionToVariant}
                    className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Option</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedOptionsForVariant.map((option: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <select
                          value={option.optionId}
                          onChange={(e) =>
                            handleOptionChange(
                              index,
                              "optionId",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Option</option>
                          {mockOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <select
                          value={option.selectedValue}
                          onChange={(e) =>
                            handleOptionChange(
                              index,
                              "selectedValue",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={!option.optionId}
                        >
                          <option value="">Select Value</option>
                          {option.optionId &&
                            mockOptions
                              .find((opt) => opt.id === option.optionId)
                              ?.values.map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeOptionFromVariant(index)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={cancelVariantForm}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveVariant}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {editingVariantIndex !== null
                  ? "Update Variant"
                  : "Add Variant"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmitProduct}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default ProductCreationPage;
