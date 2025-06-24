"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  Truck,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import BackNavigation from "@/app/(components)/BackToHome/BackToHome";

interface OrderItem {
  _id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  salePrice?: number;
  totalPrice: number;
  variantId?: {
    _id: string;
    sku: string;
    images: string[];
    selectedOptions: Array<{
      optionId: string;
      optionName: string;
      selectedValue: string;
      _id: string;
    }>;
  };
}

interface OrderData {
  _id: string;
  orderNumber: string;
  customerId: {
    _id: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  status: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    note: string;
    _id: string;
  }>;
  expectedDeliveryDate: string;
  createdAt: string;
  updatedAt: string;
}
const OrderViewPage = () => {
  const { id } = useParams();

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/orders/view/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const result = await response.json();
      if (result.success) {
        setOrderData(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch order details");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      placed: "bg-blue-100 text-blue-800",
      confirmed: "bg-green-100 text-green-800",
      processing: "bg-yellow-100 text-yellow-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      pending: "bg-orange-100 text-orange-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BackNavigation title="Order Details" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BackNavigation title="Order Details" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Order
            </h2>
            <p className="text-red-600">{error || "Order not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order #{orderData.orderNumber}
              </h1>
              <p className="text-gray-600">
                Placed on {formatDate(orderData.createdAt)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  orderData.status
                )}`}
              >
                {orderData.status.charAt(0).toUpperCase() +
                  orderData.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Items
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {item.variantId?.images?.[0] && (
                        <img
                          src={item.variantId.images[0]}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                        {item.variantId?.selectedOptions && (
                          <div className="mt-1">
                            {item.variantId.selectedOptions.map((option) => (
                              <span
                                key={option._id}
                                className="text-sm text-gray-600 mr-3"
                              >
                                {option.optionName}: {option.selectedValue}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </span>
                          <div className="text-right">
                            {item.salePrice &&
                              item.salePrice !== item.price && (
                                <span className="text-sm text-gray-500 line-through mr-2">
                                  {formatCurrency(item.price)}
                                </span>
                              )}
                            <span className="font-medium text-gray-900">
                              {formatCurrency(item.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Order Status History
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {orderData.statusHistory.map((history, index) => (
                    <div
                      key={history._id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 capitalize">
                            {history.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(history.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {history.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {orderData.customerId.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {orderData.customerId.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h2>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-900 space-y-1">
                  <p className="font-medium">
                    {orderData.shippingAddress.fullName}
                  </p>
                  <p>{orderData.shippingAddress.phone}</p>
                  <p>{orderData.shippingAddress.addressLine1}</p>
                  {orderData.shippingAddress.addressLine2 && (
                    <p>{orderData.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {orderData.shippingAddress.city},{" "}
                    {orderData.shippingAddress.state}{" "}
                    {orderData.shippingAddress.pincode}
                  </p>
                  <p>{orderData.shippingAddress.country}</p>
                </div>
              </div>
            </div>

            {/* Payment & Delivery */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment & Delivery
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <span className="text-sm text-gray-900 capitalize">
                    {orderData.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Status:</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${getStatusColor(
                      orderData.paymentStatus
                    )}`}
                  >
                    {orderData.paymentStatus.charAt(0).toUpperCase() +
                      orderData.paymentStatus.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Expected Delivery:
                  </span>
                  <span className="text-sm text-gray-900">
                    {formatDate(orderData.expectedDeliveryDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm text-gray-900">
                    {formatCurrency(orderData.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping:</span>
                  <span className="text-sm text-gray-900">
                    {formatCurrency(orderData.shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax:</span>
                  <span className="text-sm text-gray-900">
                    {formatCurrency(orderData.tax)}
                  </span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Discount:</span>
                    <span className="text-sm text-green-600">
                      -{formatCurrency(orderData.discount)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total:</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(orderData.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderViewPage;
