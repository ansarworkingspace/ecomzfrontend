"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Package,
  Calendar,
  Truck,
  ChevronRight,
  Search,
  Filter,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import BackNavigation from "@/app/(components)/BackToHome/BackToHome";

const OrdersPage = () => {
  const [orders, setOrders]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER;

  const fetchOrders = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/orders/list?page=${page}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const result = await response.json();

      if (result.success) {
        if (page === 1) {
          setOrders(result.data.data);
        } else {
          // Append new orders for pagination
          setOrders((prev: any) => [...prev, ...result.data.data]);
        }
        setCurrentPage(result.data.pagination.currentPage);
        setTotalPages(result.data.pagination.totalPages);
        setHasNextPage(result.data.pagination.hasNextPage);
      } else {
        throw new Error(result.message || "Failed to fetch orders");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      case "placed":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
      case "placed":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const transformOrderData = (apiOrder: any) => {
    return {
      _id: apiOrder._id,
      orderNumber: apiOrder.orderNumber,
      status: apiOrder.status,
      totalAmount: apiOrder.totalAmount,
      itemCount: apiOrder.items.length,
      orderDate: apiOrder.createdAt,
      deliveryDate: apiOrder.expectedDeliveryDate,
      paymentMethod: apiOrder.paymentMethod,
      paymentStatus: apiOrder.paymentStatus,
      shippingAddress: apiOrder.shippingAddress,
      items: apiOrder.items.map((item: any) => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        salePrice: item.salePrice,
        totalPrice: item.totalPrice,
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
      })),
    };
  };

  const handleOrderClick = (order: any) => {
    if (order.items && order.items.length === 1) {
      const productId = order.items[0].productId;
      router.push(`/view-product/${productId}`);
    } else {
      router.push(`/orders/${order.orderNumber}`);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage && !loading) {
      fetchOrders(currentPage + 1);
    }
  };

  const getFilteredAndSortedOrders = () => {
    let filtered = orders.map(transformOrderData);

    // Simple search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order: any) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item: any) =>
            item.productName.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order: any) => order.status === statusFilter);
    }

    // Simple sorting
    switch (sortBy) {
      case "oldest":
        filtered.sort(
          (a: any, b: any) =>
            new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
        );
        break;
      case "amount-high":
        filtered.sort((a: any, b: any) => b.totalAmount - a.totalAmount);
        break;
      case "amount-low":
        filtered.sort((a: any, b: any) => a.totalAmount - b.totalAmount);
        break;
      case "newest":
      default:
        filtered.sort(
          (a: any, b: any) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        break;
    }

    return filtered;
  };

  const filteredOrders = getFilteredAndSortedOrders();

  return (
    <>
      <BackNavigation />

      <div className="min-h-screen bg-gray-50 py-8 text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your order history</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white min-w-[140px]"
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="shipped">Shipped</option>
                  <option value="processing">Processing</option>
                  <option value="placed">Placed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Sort */}
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white min-w-[120px]"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="amount-high">Highest Amount</option>
                  <option value="amount-low">Lowest Amount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {loading && orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-gray-500">Loading your orders...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
                <Package className="w-16 h-16 text-red-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  Error Loading Orders
                </h3>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => fetchOrders()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
              </div>
            ) : (
              filteredOrders.map((order: any) => (
                <div
                  key={order.orderNumber}
                  onClick={() => handleOrderClick(order)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-black group-hover:text-gray-700 transition-colors">
                          {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.orderDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Product Images */}
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {order.items
                          .slice(0, 3)
                          .map((item: any, index: any) => (
                            <div
                              key={index}
                              className="w-12 h-12 bg-gray-200 rounded-lg border-2 border-white shadow-sm flex items-center justify-center text-xs font-semibold text-gray-700"
                            >
                              {item.productName.slice(0, 2).toUpperCase()}
                            </div>
                          ))}
                        {order.items.length > 3 && (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-white shadow-sm flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              +{order.items.length - 3}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-black">
                          {order.itemCount}{" "}
                          {order.itemCount === 1 ? "item" : "items"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.items[0].productName}
                          {order.items.length > 1 &&
                            ` +${order.items.length - 1} more`}
                        </p>
                      </div>
                    </div>

                    {/* Order Total and Actions */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-black">
                        ₹{order.totalAmount}
                      </p>
                      {order.status !== "cancelled" && order.deliveryDate && (
                        <p className="text-sm text-gray-600">
                          {order.status === "delivered"
                            ? "Delivered"
                            : "Expected"}{" "}
                          {formatDate(order.deliveryDate)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (order.items.length === 1) {
                            router.push(
                              `/view-product/${order.items[0].productId}`
                            );
                          } else {
                            router.push(`/orders/${order.orderNumber}`);
                          }
                        }}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {(order.status === "shipped" ||
                        order.status === "processing") && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Track order: ${order.orderNumber}`);
                          }}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                        >
                          <Truck className="w-4 h-4" />
                          Track Order
                        </button>
                      )}
                    </div>

                    {order.status === "delivered" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`Reorder: ${order.orderNumber}`);
                        }}
                        className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          {filteredOrders.length > 0 && hasNextPage && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-black hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Load More Orders"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
