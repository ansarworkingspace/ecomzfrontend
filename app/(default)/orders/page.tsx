"use client";

import React, { useState } from "react";
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

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Sample orders data
  const ordersData = [
    {
      orderNumber: "ORD2506230001",
      status: "delivered",
      totalAmount: 2339.96,
      itemCount: 3,
      orderDate: "2025-06-23T11:19:51.728Z",
      deliveryDate: "2025-06-25T11:19:51.715Z",
      items: [
        {
          productName: "iPhone 15 Pro",
          image:
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
          quantity: 2,
        },
        {
          productName: "AirPods Pro",
          image:
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: "ORD2506220002",
      status: "shipped",
      totalAmount: 1299.99,
      itemCount: 2,
      orderDate: "2025-06-22T09:30:15.420Z",
      deliveryDate: "2025-06-24T09:30:15.420Z",
      items: [
        {
          productName: "MacBook Air M2",
          image:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
          quantity: 1,
        },
        {
          productName: "Magic Mouse",
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: "ORD2506210003",
      status: "processing",
      totalAmount: 799.99,
      itemCount: 1,
      orderDate: "2025-06-21T14:45:32.156Z",
      deliveryDate: "2025-06-26T14:45:32.156Z",
      items: [
        {
          productName: "Apple Watch Series 9",
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: "ORD2506200004",
      status: "placed",
      totalAmount: 1549.98,
      itemCount: 2,
      orderDate: "2025-06-20T16:22:18.890Z",
      deliveryDate: "2025-06-27T16:22:18.890Z",
      items: [
        {
          productName: "iPad Pro 12.9",
          image:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
          quantity: 1,
        },
        {
          productName: "Apple Pencil 2",
          image:
            "https://images.unsplash.com/photo-1625765806152-e9e5aa3e4575?w=300&h=300&fit=crop",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: "ORD2506190005",
      status: "cancelled",
      totalAmount: 999.99,
      itemCount: 1,
      orderDate: "2025-06-19T10:15:45.234Z",
      deliveryDate: null,
      items: [
        {
          productName: "iPhone 14 Pro Max",
          image:
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
          quantity: 1,
        },
      ],
    },
  ];

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

  const handleOrderClick = (orderNumber: string) => {
    // Navigate to order details page
    console.log(`Navigate to order details: ${orderNumber}`);
    // In real app: router.push(`/orders/${orderNumber}`)
  };

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
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
          {filteredOrders.length === 0 ? (
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
            filteredOrders.map((order) => (
              <div
                key={order.orderNumber}
                onClick={() => handleOrderClick(order.orderNumber)}
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
                      {order.items.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-white rounded-lg border-2 border-white shadow-sm overflow-hidden"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
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
                      ${order.totalAmount}
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
                        handleOrderClick(order.orderNumber);
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
        {filteredOrders.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-black hover:text-black transition-colors">
              Load More Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
