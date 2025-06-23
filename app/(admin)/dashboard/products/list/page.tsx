"use client";

import { useEffect, useState } from "react";

const ProductsListPage = () => {
  const [products, setProducts]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          _id: "68582692e3e4798efc805e66",
          name: "Premium Cotton T-Shirt",
          category: "Clothing",
          isFeatured: true,
          mainImage: "https://example.com/images/tshirt-main.jpg",
          price: 29.99,
          stock: 150,
          status: "active",
          createdAt: "2025-06-20T10:30:00.000Z",
        },
        {
          _id: "68582692e3e4798efc805e67",
          name: "Wireless Bluetooth Headphones",
          category: "Electronics",
          isFeatured: false,
          mainImage: "https://example.com/images/headphones-main.jpg",
          price: 89.99,
          stock: 75,
          status: "active",
          createdAt: "2025-06-21T14:15:30.000Z",
        },
        {
          _id: "68582692e3e4798efc805e68",
          name: "Organic Green Tea",
          category: "Food & Beverages",
          isFeatured: true,
          mainImage: "https://example.com/images/tea-main.jpg",
          price: 15.99,
          stock: 200,
          status: "active",
          createdAt: "2025-06-19T09:45:20.000Z",
        },
        {
          _id: "68582692e3e4798efc805e69",
          name: "Leather Wallet",
          category: "Accessories",
          isFeatured: false,
          mainImage: "https://example.com/images/wallet-main.jpg",
          price: 45.99,
          stock: 0,
          status: "out-of-stock",
          createdAt: "2025-06-18T16:20:10.000Z",
        },
        {
          _id: "68582692e3e4798efc805e70",
          name: "Yoga Mat",
          category: "Sports & Fitness",
          isFeatured: true,
          mainImage: "https://example.com/images/yoga-mat-main.jpg",
          price: 34.99,
          stock: 120,
          status: "active",
          createdAt: "2025-06-22T11:30:45.000Z",
        },
        {
          _id: "68582692e3e4798efc805e71",
          name: "Ceramic Coffee Mug",
          category: "Home & Kitchen",
          isFeatured: false,
          mainImage: "https://example.com/images/mug-main.jpg",
          price: 12.99,
          stock: 300,
          status: "active",
          createdAt: "2025-06-17T13:15:00.000Z",
        },
        {
          _id: "68582692e3e4798efc805e72",
          name: "Smartphone Case",
          category: "Electronics",
          isFeatured: false,
          mainImage: "https://example.com/images/phone-case-main.jpg",
          price: 19.99,
          stock: 5,
          status: "low-stock",
          createdAt: "2025-06-16T08:45:30.000Z",
        },
        {
          _id: "68582692e3e4798efc805e73",
          name: "Running Shoes",
          category: "Sports & Fitness",
          isFeatured: true,
          mainImage: "https://example.com/images/shoes-main.jpg",
          price: 79.99,
          stock: 85,
          status: "active",
          createdAt: "2025-06-15T15:20:15.000Z",
        },
      ]);
    }, 300);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return "text-red-600";
    if (stock <= 10) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm text-black">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold text-black">Products</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your product inventory
          </p>
        </div>
        <div className="flex space-x-3">
          <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food & Beverages</option>
            <option value="accessories">Accessories</option>
            <option value="sports">Sports & Fitness</option>
            <option value="home">Home & Kitchen</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out-of-stock">Out Stock</option>
            <option value="low-stock">Low Stock</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product: any) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-lg object-cover bg-gray-100"
                        src={product.mainImage}
                        alt={product.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2IiByeD0iOCIvPgo8cGF0aCBkPSJNMjQgMThMMzAgMjRIMThMMjQgMThaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xOCAzMEgzMFYzMkgxOFYzMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-black">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {product._id.slice(-8)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-black">
                    ${product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`font-medium ${getStockStatusColor(
                      product.stock
                    )}`}
                  >
                    {product.stock} units
                  </div>
                  {product.stock <= 10 && product.stock > 0 && (
                    <div className="text-xs text-yellow-600">Low stock</div>
                  )}
                  {product.stock === 0 && (
                    <div className="text-xs text-red-600">Out stock</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {product.isFeatured ? (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Featured
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status.replace("-", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {new Date(product.createdAt).toLocaleDateString()}
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
            {currentProducts.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Loading products...
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
            Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of{" "}
            {products.length} results
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

export default ProductsListPage;
