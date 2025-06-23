"use client";

import { useEffect, useState } from "react";

const CategoriesListPage = () => {
  const [categories, setCategories]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setCategories([
        {
          _id: "685805e92f5c1387029607a4",
          name: "Womens Clothing",
          description: "All Womens items",
          image: "https://example.com/electronics.jpg",
          isActive: true,
          createdAt: "2025-06-22T13:32:25.174Z",
          updatedAt: "2025-06-22T13:32:25.174Z",
        },
        {
          _id: "685805e92f5c1387029607a5",
          name: "Mens Clothing",
          description: "All Mens items",
          image: "https://example.com/electronics.jpg",
          isActive: true,
          createdAt: "2025-06-22T13:32:25.174Z",
          updatedAt: "2025-06-22T13:32:25.174Z",
        },
        {
          _id: "685805e92f5c1387029607a6",
          name: "Electronics",
          description: "All Electronic items",
          image: "https://example.com/electronics.jpg",
          isActive: false,
          createdAt: "2025-06-22T13:32:25.174Z",
          updatedAt: "2025-06-22T13:32:25.174Z",
        },
        // Add more sample data for pagination demo
      ]);
    }, 300);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold text-black">Categories</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage product categories
          </p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCategories.map((cat: any) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-black">{cat.name}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{cat.description}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      cat.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className="text-gray-600 hover:text-black text-sm font-medium">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {currentCategories.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Loading categories...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, categories.length)}{" "}
            of {categories.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesListPage;
