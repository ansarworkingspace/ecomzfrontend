// "use client";

// import React, { useState } from "react";
// import {
//   CheckCircle,
//   Package,
//   Truck,
//   CreditCard,
//   MapPin,
//   Calendar,
//   Phone,
//   User,
//   ArrowLeft,
//   Copy,
//   Check,
// } from "lucide-react";
// import { useParams } from "next/navigation";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER;
// const sucsessOrderPage = () => {
//    const { id } = useParams();
//   const [copiedOrderNumber, setCopiedOrderNumber] = useState(false);

//   // Sample order data based on your API response
//   const orderData = {
//     orderNumber: "ORD2506230001",
//     customerId: "6857df0914caa564c0b641e7",
//     items: [
//       {
//         productId: "6858160cb37cd4aae6c9beaf",
//         variantId: "6858160cb37cd4aae6c9beb4",
//         productName: "iPhone 15 Pro",
//         sku: "IPH15PRO-128-BLK",
//         quantity: 2,
//         price: 999.99,
//         salePrice: 949.99,
//         totalPrice: 1899.98,
//         image:
//           "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
//       },
//       {
//         productId: "6858160cb37cd4aae6c9beaf",
//         variantId: "6858160cb37cd4aae6c9beb1",
//         productName: "AirPods Pro",
//         sku: "AIRPODS-PRO-WHT",
//         quantity: 1,
//         price: 249.99,
//         totalPrice: 249.99,
//         image:
//           "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
//       },
//     ],
//     subtotal: 2149.97,
//     shippingCost: 25,
//     tax: 214.99,
//     discount: 50,
//     totalAmount: 2339.96,
//     paymentMethod: "cod",
//     paymentStatus: "pending",
//     shippingAddress: {
//       fullName: "John Doe",
//       phone: "9923456780",
//       addressLine1: "123 Main Street, Apartment 4B",
//       addressLine2: "Near Central Park",
//       city: "New York",
//       state: "New York",
//       pincode: "10001",
//       country: "United States",
//     },
//     status: "placed",
//     expectedDeliveryDate: "2025-06-25T11:19:51.715Z",
//     createdAt: "2025-06-23T11:19:51.728Z",
//   };

//   const handleCopyOrderNumber = () => {
//     navigator.clipboard.writeText(orderData.orderNumber);
//     setCopiedOrderNumber(true);
//     setTimeout(() => setCopiedOrderNumber(false), 2000);
//   };

//   const formatDate = (dateString: any) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getStatusColor = (status: any) => {
//     switch (status.toLowerCase()) {
//       case "placed":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button className="flex items-center text-gray-600 hover:text-black transition-colors mb-4">
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Shopping
//           </button>

//           <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
//             <div className="flex items-center justify-center mb-6">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>
//             </div>

//             <div className="text-center">
//               <h1 className="text-3xl font-bold text-black mb-2">
//                 Order Placed Successfully!
//               </h1>
//               <p className="text-gray-600 mb-6">
//                 Thank you for your purchase. Your order has been confirmed and
//                 will be processed shortly.
//               </p>

//               <div className="flex items-center justify-center gap-2 mb-4">
//                 <span className="text-sm text-gray-500">Order Number:</span>
//                 <span className="font-semibold text-black">
//                   {orderData.orderNumber}
//                 </span>
//                 <button
//                   onClick={handleCopyOrderNumber}
//                   className="p-1 hover:bg-gray-100 rounded transition-colors"
//                 >
//                   {copiedOrderNumber ? (
//                     <Check className="w-4 h-4 text-green-600" />
//                   ) : (
//                     <Copy className="w-4 h-4 text-gray-400" />
//                   )}
//                 </button>
//               </div>

//               <div className="flex items-center justify-center gap-4 text-sm">
//                 <span
//                   className={`px-3 py-1 rounded-full font-medium ${getStatusColor(
//                     orderData.status
//                   )}`}
//                 >
//                   {orderData.status.charAt(0).toUpperCase() +
//                     orderData.status.slice(1)}
//                 </span>
//                 <span className="text-gray-500">•</span>
//                 <span className="text-gray-600">
//                   Placed on {formatDate(orderData.createdAt)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Order Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Order Items */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//               <div className="flex items-center gap-3 mb-6">
//                 <Package className="w-6 h-6 text-green-600" />
//                 <h2 className="text-xl font-semibold text-black">
//                   Order Items
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 {orderData.items.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
//                   >
//                     <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
//                       <img
//                         src={item.image}
//                         alt={item.productName}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="font-semibold text-black">
//                         {item.productName}
//                       </h3>
//                       <p className="text-sm text-gray-600">SKU: {item.sku}</p>
//                       <p className="text-sm text-gray-600">
//                         Quantity: {item.quantity}
//                       </p>
//                     </div>

//                     <div className="text-right">
//                       {item.salePrice && item.salePrice < item.price ? (
//                         <div>
//                           <span className="text-lg font-semibold text-black">
//                             ${item.salePrice}
//                           </span>
//                           <span className="text-sm text-gray-500 line-through ml-2">
//                             ${item.price}
//                           </span>
//                         </div>
//                       ) : (
//                         <span className="text-lg font-semibold text-black">
//                           ${item.price}
//                         </span>
//                       )}
//                       <p className="text-sm text-gray-600">
//                         Total: ${item.totalPrice}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Shipping Address */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//               <div className="flex items-center gap-3 mb-6">
//                 <MapPin className="w-6 h-6 text-green-600" />
//                 <h2 className="text-xl font-semibold text-black">
//                   Shipping Address
//                 </h2>
//               </div>

//               <div className="bg-gray-50 rounded-xl p-4">
//                 <div className="flex items-start gap-3">
//                   <User className="w-5 h-5 text-gray-400 mt-1" />
//                   <div>
//                     <p className="font-semibold text-black">
//                       {orderData.shippingAddress.fullName}
//                     </p>
//                     <p className="text-gray-600">
//                       {orderData.shippingAddress.addressLine1}
//                     </p>
//                     {orderData.shippingAddress.addressLine2 && (
//                       <p className="text-gray-600">
//                         {orderData.shippingAddress.addressLine2}
//                       </p>
//                     )}
//                     <p className="text-gray-600">
//                       {orderData.shippingAddress.city},{" "}
//                       {orderData.shippingAddress.state}{" "}
//                       {orderData.shippingAddress.pincode}
//                     </p>
//                     <p className="text-gray-600">
//                       {orderData.shippingAddress.country}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200">
//                   <Phone className="w-4 h-4 text-gray-400" />
//                   <span className="text-gray-600">
//                     {orderData.shippingAddress.phone}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary & Payment */}
//           <div className="space-y-6">
//             {/* Delivery Info */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//               <div className="flex items-center gap-3 mb-6">
//                 <Truck className="w-6 h-6 text-green-600" />
//                 <h2 className="text-xl font-semibold text-black">
//                   Delivery Info
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
//                   <Calendar className="w-5 h-5 text-green-600" />
//                   <div>
//                     <p className="font-medium text-black">Expected Delivery</p>
//                     <p className="text-sm text-gray-600">
//                       {formatDate(orderData.expectedDeliveryDate)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-xl">
//                   <p className="text-sm text-gray-600 mb-2">
//                     Tracking updates will be sent to your email and phone
//                     number.
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                     <span className="text-sm font-medium text-green-600">
//                       Order Placed
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Details */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//               <div className="flex items-center gap-3 mb-6">
//                 <CreditCard className="w-6 h-6 text-green-600" />
//                 <h2 className="text-xl font-semibold text-black">
//                   Payment Details
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium text-black">
//                     ${orderData.subtotal}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium text-black">
//                     ${orderData.shippingCost}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="font-medium text-black">
//                     ${orderData.tax}
//                   </span>
//                 </div>

//                 {orderData.discount > 0 && (
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Discount</span>
//                     <span className="font-medium text-green-600">
//                       -${orderData.discount}
//                     </span>
//                   </div>
//                 )}

//                 <div className="border-t border-gray-200 pt-4">
//                   <div className="flex justify-between">
//                     <span className="text-lg font-semibold text-black">
//                       Total
//                     </span>
//                     <span className="text-lg font-semibold text-black">
//                       ${orderData.totalAmount}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                     <span className="font-medium text-yellow-800">
//                       Cash on Delivery
//                     </span>
//                   </div>
//                   <p className="text-sm text-yellow-700 mt-1">
//                     Payment Status:{" "}
//                     {orderData.paymentStatus.charAt(0).toUpperCase() +
//                       orderData.paymentStatus.slice(1)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="space-y-3">
//               <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
//                 Track Your Order
//               </button>
//               <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-black hover:text-black transition-colors">
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default sucsessOrderPage;



// app/(default)/success-order/[id]/page.tsx
// CREATE: Basic success page structure

"use client";

import { useParams } from "next/navigation";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

const SuccessOrderPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Package className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-black">Order ID</span>
          </div>
          <span className="text-lg font-mono text-gray-800">#{id}</span>
        </div>

        <div className="space-y-3">
          <Link
            href="/orders"
            className="block w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            View Order Details
          </Link>
          
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrderPage;