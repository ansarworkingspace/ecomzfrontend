"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddOptionPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    optionName: "",
    values: [""],
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...formData.values];
    newValues[index] = value;
    setFormData((prev) => ({
      ...prev,
      values: newValues,
    }));
  };

  const addValue = () => {
    setFormData((prev) => ({
      ...prev,
      values: [...prev.values, ""],
    }));
  };

  const removeValue = (index: number) => {
    if (formData.values.length > 1) {
      const newValues = formData.values.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        values: newValues,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty values
    const filteredValues = formData.values.filter(
      (value) => value.trim() !== ""
    );

    const submitData = {
      ...formData,
      values: filteredValues,
    };

    // Simulate API call
    setTimeout(() => {
      console.log("Option created:", submitData);
      setLoading(false);
      router.push("/dashboard/options/list");
    }, 1000);
  };

  const isFormValid =
    formData.optionName.trim() !== "" &&
    formData.values.some((value) => value.trim() !== "");

  return (
    <div className="bg-white rounded-lg shadow-sm text-black">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-black">Add Option</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create a new product option with values
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Option Name */}
          <div>
            <label
              htmlFor="optionName"
              className="block text-sm font-medium text-black mb-2"
            >
              Option Name *
            </label>
            <input
              type="text"
              id="optionName"
              name="optionName"
              value={formData.optionName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Color, Size, Material"
            />
          </div>

          {/* Values */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Option Values *
            </label>
            <div className="space-y-3">
              {formData.values.map((value, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={`Value ${index + 1}`}
                  />
                  {formData.values.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeValue(index)}
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
              onClick={addValue}
              className="mt-3 text-green-600 hover:text-green-700 text-sm font-medium"
            >
              + Add Value
            </button>
          </div>

          {/* Preview */}
          {formData.optionName && formData.values.some((v) => v.trim()) && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Preview
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-black mb-2">
                  {formData.optionName}
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.values
                    .filter((value) => value.trim())
                    .map((value, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs font-medium bg-white text-gray-700 rounded-full border border-gray-200"
                      >
                        {value}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-black">Active</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Inactive options will not be available for product variants
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating..." : "Create Option"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOptionPage;
