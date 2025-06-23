"use client";

import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/products/list?page=${page}&limit=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await res.json();

      if (json.success) {
        setProducts(json.data.data);
        setPagination(json.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(pagination.currentPage);
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
          <h2 className="text-2xl font-semibold text-black">Products</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your products</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/products/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Loading products...
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-black">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-600">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.isFeatured ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/products/view/${product._id}`}
                        className="text-gray-600 hover:text-black"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </Link>
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
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-1 text-sm border rounded-lg bg-white disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 text-sm border rounded-lg ${
                  i + 1 === pagination.currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-1 text-sm border rounded-lg bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;
