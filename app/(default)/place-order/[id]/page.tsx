"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Plus,
  Minus,
  Edit,
  Check,
  ArrowLeft,
  Lock,
} from "lucide-react";

const PlaceOrderPage = () => {
  const [quantities, setQuantities]: any = useState({
    item1: 2,
    item2: 1,
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "John Doe",
    phone: "9923456780",
    addressLine1: "123 Main Street, Apartment 4B",
    addressLine2: "Near Central Park",
    city: "New York",
    state: "New York",
    pincode: "10001",
    country: "United States",
  });

  // Sample cart items
  const cartItems = [
    {
      id: "item1",
      productName: "iPhone 15 Pro",
      sku: "IPH15PRO-128-BLK",
      price: 999.99,
      salePrice: 949.99,
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
      variant: "128GB - Black",
      inStock: true,
    },
    {
      id: "item2",
      productName: "AirPods Pro",
      sku: "AIRPODS-PRO-WHT",
      price: 249.99,
      salePrice: null,
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
      variant: "White",
      inStock: true,
    },
  ];

  const updateQuantity = (itemId: any, change: any) => {
    setQuantities((prev: any) => ({
      ...prev,
      [itemId]: Math.max(1, prev[itemId] + change),
    }));
  };

  const calculateItemTotal = (item: any) => {
    const price = item.salePrice || item.price;
    return price * quantities[item.id];
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 25;
  const tax = subtotal * 0.1;
  const discount = subtotal > 500 ? 50 : 0;
  const totalAmount = subtotal + shippingCost + tax - discount;

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    // Simulate API call
    setTimeout(() => {
      alert("Order placed successfully! Redirecting to order confirmation...");
      setIsPlacingOrder(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-black transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-black mb-2">
              Complete Your Order
            </h1>
            <p className="text-gray-600">
              Review your items and shipping details before placing your order
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-black">
                    Order Items
                  </h2>
                </div>
                <span className="text-sm text-gray-500">
                  {cartItems.length} items
                </span>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-black truncate">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600">{item.variant}</p>
                      <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                      {item.inStock ? (
                        <span className="inline-block text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full mt-1">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-block text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full mt-1">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                          disabled={quantities[item.id] <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">
                          {quantities[item.id]}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.salePrice ? (
                        <div>
                          <span className="text-lg font-semibold text-black">
                            ${item.salePrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${item.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-semibold text-black">
                          ${item.price}
                        </span>
                      )}
                      <p className="text-sm text-gray-600">
                        Total: ${calculateItemTotal(item).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-black">
                    Shipping Address
                  </h2>
                </div>
                <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.addressLine1}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          addressLine1: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.addressLine2}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          addressLine2: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          state: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.pincode}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          pincode: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-black">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-300 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === "cod"
                        ? "border-green-600 bg-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-black">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Pay when your order is delivered
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-300 transition-colors opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    disabled
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-400">
                        Credit/Debit Card
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Pay securely with your card
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold text-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-black">
                    {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-black">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -${discount}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-black">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-black">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Free Shipping</p>
                    <p className="text-sm text-green-700">
                      On orders over $100
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Expected delivery: 2-3 business days
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Secure & encrypted checkout</span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full mt-6 px-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPlacingOrder ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Place Order - ${totalAmount.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing your order, you agree to our Terms & Conditions and
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
