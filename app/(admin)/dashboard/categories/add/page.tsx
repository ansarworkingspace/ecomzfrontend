"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddCategoryPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "", // will hold URL after upload
    isActive: true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // Step 1: Upload image if selected
      if (selectedFile) {
        const imgForm = new FormData();
        imgForm.append("files", selectedFile);

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
          imageUrl = imgData.data.urls[0];
        } else {
          throw new Error("Image upload failed.");
        }
      }

      // Step 2: Submit category
      const payload = {
        name: formData.name,
        description: formData.description,
        image: imageUrl, // from upload step
        isActive: formData.isActive,
      };

      const catRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/category/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const catData = await catRes.json();
      if (catData.success) {
        router.push("/dashboard/categories/list");
      } else {
        console.error("Category creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm text-black">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Add Category</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create a new product category
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-black text-sm font-medium"
          >
            ← Back
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category Name *
          </label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter category name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter category description"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="block w-full text-sm text-gray-600"
          />
          {selectedFile && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium">Active</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Inactive categories will not be visible to customers
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 border-t pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.name.trim() || !selectedFile}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
