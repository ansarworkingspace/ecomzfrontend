"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoriesListPage = () => {
  const [categories, setCategories]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const router = useRouter();

  const fetchCategories = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/category/list?page=${page}&limit=10`,
        {
          credentials: "include",
        }
      );
      const result = await res.json();

      if (result.success) {
        setCategories(result.data.data);
        setPagination(result.data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(pagination.currentPage);
  }, [pagination.currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    }
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
        <button
          onClick={() => router.push("/dashboard/categories/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
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
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat: any) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-black">
                    {cat.name}
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
                  <td className="px-6 py-4 text-sm text-gray-600">
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
            to{" "}
            {Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  pagination.currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
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
