"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Plus, X, Upload, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface Category {
  _id: string;
  name: string;
  // ...other fields if needed
}

interface Option {
  _id: string;
  optionName: string;
  values: string[];
  // ...other fields if needed
}

interface SelectedOption {
  optionId: string;
  optionName: string;
  selectedValue: string;
}

interface Variant {
  sku: string;
  price: number | string;
  salePrice?: number | string;
  cost?: number | string;
  quantity: number | string;
  lowStockThreshold?: number | string;
  images: string[];
  description: string;
  dimensions: {
    length: number | string;
    width: number | string;
    height: number | string;
  };
  selectedOptions: SelectedOption[];
  isActive: boolean;
}

interface BasicProduct {
  name: string;
  description: string;
  category: string;
  isFeatured: boolean;
  mainImage: string;
}

const ProductCreationPage = () => {
  // State for categories and options from API
  const [categories, setCategories] = useState<Category[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Basic product state
  const [basicProduct, setBasicProduct] = useState<BasicProduct>({
    name: "",
    description: "",
    category: "",
    isFeatured: false,
    mainImage: "",
  });

  // Main image file state
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const router = useRouter();
  // Variants state
  const [variants, setVariants] = useState<Variant[]>([]);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(
    null
  );

  // Current variant being created/edited
  const [currentVariant, setCurrentVariant] = useState<Variant>({
    sku: "",
    price: "",
    salePrice: "",
    cost: "",
    quantity: "",
    lowStockThreshold: "",
    images: [],
    description: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    selectedOptions: [],
    isActive: true,
  });

  // Variant image files state
  const [variantImageFiles, setVariantImageFiles] = useState<(File | null)[]>([
    null,
  ]);
  const [variantImagePreviews, setVariantImagePreviews] = useState<string[]>([
    "",
  ]);

  const [selectedOptionsForVariant, setSelectedOptionsForVariant] = useState<
    SelectedOption[]
  >([]);

  // Fetch categories and options on component mount
  useEffect(() => {
    fetchCategoriesAndOptions();
  }, []);

  const fetchCategoriesAndOptions = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const categoriesRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/category/list`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        if (categoriesData.success && Array.isArray(categoriesData.data.data)) {
          setCategories(categoriesData.data.data);
        } else {
          setCategories([]);
        }
      } else {
        setCategories([]);
      }
      // Fetch options
      const optionsRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/options/list`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (optionsRes.ok) {
        const optionsData = await optionsRes.json();
        if (optionsData.success && Array.isArray(optionsData.data.data)) {
          setOptions(optionsData.data.data);
        } else {
          setOptions([]);
        }
      } else {
        setOptions([]);
      }
    } catch (error) {
      setCategories([]);
      setOptions([]);
      console.error("Error fetching categories and options:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle main image file selection
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setMainImagePreview(previewUrl);
    }
  };

  // Handle variant image file selection
  const handleVariantImageChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFiles = [...variantImageFiles];
      const newPreviews = [...variantImagePreviews];
      newFiles[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setVariantImageFiles(newFiles);
      setVariantImagePreviews(newPreviews);
    }
  };

  const addVariantImage = () => {
    setVariantImageFiles([...variantImageFiles, null]);
    setVariantImagePreviews([...variantImagePreviews, ""]);
  };

  const removeVariantImage = (index: number) => {
    if (variantImageFiles.length > 1) {
      const newFiles = variantImageFiles.filter((_, i) => i !== index);
      const newPreviews = variantImagePreviews.filter((_, i) => i !== index);
      setVariantImageFiles(newFiles);
      setVariantImagePreviews(newPreviews);
    }
  };

  // Upload images helper function
  const uploadImages = async (files: (File | null)[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      if (file) {
        const imgForm = new FormData();
        imgForm.append("files", file);
        const imgRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_USER}/images`,
          {
            method: "POST",
            body: imgForm,
            credentials: "include",
          }
        );
        const imgData = await imgRes.json();
        if (imgData.success && imgData.data?.urls?.[0]) {
          uploadedUrls.push(imgData.data.urls[0]);
        } else {
          throw new Error("Image upload failed.");
        }
      }
    }
    return uploadedUrls;
  };

  // Handle basic product changes
  const handleBasicProductChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked }: any = e.target;
    setBasicProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle variant field changes
  const handleVariantChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  // Handle option selection for variant
  const addOptionToVariant = () => {
    setSelectedOptionsForVariant((prev) => [
      ...prev,
      { optionId: "", optionName: "", selectedValue: "" },
    ]);
  };

  const removeOptionFromVariant = (index: number) => {
    setSelectedOptionsForVariant((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOptionChange = (
    index: number,
    field: keyof SelectedOption,
    value: string
  ) => {
    const newOptions = [...selectedOptionsForVariant];
    if (field === "optionId") {
      const option = options.find((opt) => opt._id === value);
      newOptions[index] = {
        optionId: value,
        optionName: option ? option.optionName : "",
        selectedValue: "",
      };
    } else {
      newOptions[index] = {
        ...newOptions[index],
        [field]: value,
      };
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
      images: [],
      description: "",
      dimensions: { length: "", width: "", height: "" },
      selectedOptions: [],
      isActive: true,
    });
    setSelectedOptionsForVariant([]);
    setVariantImageFiles([null]);
    setVariantImagePreviews([""]);
    setEditingVariantIndex(null);
    setShowVariantForm(true);
  };

  // Edit existing variant
  const editVariant = (index: number) => {
    const variant = variants[index];
    setCurrentVariant(variant);
    setSelectedOptionsForVariant(variant.selectedOptions || []);
    setVariantImageFiles(new Array(variant.images?.length || 1).fill(null));
    setVariantImagePreviews(variant.images || [""]);
    setEditingVariantIndex(index);
    setShowVariantForm(true);
  };

  // Save variant
  const saveVariant = async () => {
    try {
      // Upload variant images
      const uploadedImageUrls = await uploadImages(variantImageFiles);
      const variantToSave: Variant = {
        ...currentVariant,
        images: uploadedImageUrls,
        selectedOptions: selectedOptionsForVariant.filter(
          (opt) => opt.optionId && opt.selectedValue
        ),
        price: Number(currentVariant.price),
        salePrice: currentVariant.salePrice
          ? Number(currentVariant.salePrice)
          : undefined,
        cost: currentVariant.cost ? Number(currentVariant.cost) : undefined,
        quantity: Number(currentVariant.quantity),
        lowStockThreshold: currentVariant.lowStockThreshold
          ? Number(currentVariant.lowStockThreshold)
          : undefined,
        dimensions: {
          length: Number(currentVariant.dimensions.length),
          width: Number(currentVariant.dimensions.width),
          height: Number(currentVariant.dimensions.height),
        },
      };
      if (editingVariantIndex !== null) {
        // Update existing variant
        const newVariants = [...variants];
        newVariants[editingVariantIndex] = variantToSave;
        setVariants(newVariants);
      } else {
        // Add new variant
        setVariants((prev) => [...prev, variantToSave]);
      }
      setShowVariantForm(false);
      setEditingVariantIndex(null);
    } catch (error) {
      console.error("Error saving variant:", error);
      alert("Error uploading variant images. Please try again.");
    }
  };

  // Remove variant
  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // Cancel variant form
  const cancelVariantForm = () => {
    setShowVariantForm(false);
    setEditingVariantIndex(null);
    setVariantImageFiles([null]);
    setVariantImagePreviews([""]);
  };

  // Submit complete product
  const handleSubmitProduct = async () => {
    setSubmitLoading(true);
    try {
      let mainImageUrl = "";
      // Step 1: Upload main image if selected
      if (mainImageFile) {
        const uploadedUrls = await uploadImages([mainImageFile]);
        mainImageUrl = uploadedUrls[0];
      }
      // Step 2: Prepare variants (all images already uploaded)
      const productData = {
        ...basicProduct,
        mainImage: mainImageUrl,
        variants: variants.map((variant) => ({
          ...variant,
          price: Number(variant.price),
          salePrice: variant.salePrice ? Number(variant.salePrice) : undefined,
          cost: variant.cost ? Number(variant.cost) : undefined,
          quantity: Number(variant.quantity),
          lowStockThreshold: variant.lowStockThreshold
            ? Number(variant.lowStockThreshold)
            : undefined,
          dimensions: {
            length: Number(variant.dimensions.length),
            width: Number(variant.dimensions.width),
            height: Number(variant.dimensions.height),
          },
        })),
      };
      // Step 3: Submit product
      const productRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/products/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(productData),
        }
      );
      const productResponseData = await productRes.json();
      if (productResponseData.success) {
        alert("Product created successfully!");
        router.push("/dashboard/products/list");
        console.log("Product Data:", JSON.stringify(productData, null, 2));
        // Reset form or redirect as needed
      } else {
        throw new Error("Product creation failed");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const getSelectedOptionDisplay = (options: SelectedOption[]) => {
    return options
      .map((opt) => `${opt.optionName}: ${opt.selectedValue}`)
      .join(", ");
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white text-black">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

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
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
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
              Main Image *
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {mainImagePreview && (
                <div className="relative">
                  <img
                    src={mainImagePreview}
                    alt="Main image preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
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
          {variants.map((variant, index) => (
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
                  {variantImageFiles.map((file, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleVariantImageChange(index, e)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {variantImageFiles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariantImage(index)}
                            className="px-3 py-2 text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      {variantImagePreviews[index] && (
                        <img
                          src={variantImagePreviews[index]}
                          alt={`Variant image ${index + 1} preview`}
                          className="w-20 h-20 object-cover rounded border"
                        />
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
                  {selectedOptionsForVariant.map(
                    (option: SelectedOption, index) => (
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
                            {options.map((opt) => (
                              <option key={opt._id} value={opt._id}>
                                {opt.optionName}
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
                              options
                                .find((opt) => opt._id === option.optionId)
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
                    )
                  )}
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
