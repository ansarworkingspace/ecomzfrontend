// "use client";

// import { useEffect, useState } from "react";

// const OrdersListPage = () => {
//   const [orders, setOrders]: any = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     setTimeout(() => {
//       setOrders([
//         {
//           _id: "68582692e3e4798efc805e66",
//           orderNumber: "ORD2506220001",
//           customerId: "6857df0914caa564c0b641e7",
//           items: [
//             {
//               productName: "iPhone 15 Pro",
//               quantity: 2,
//               totalPrice: 1899.98,
//             },
//             {
//               productName: "AirPods Pro",
//               quantity: 1,
//               totalPrice: 249.99,
//             },
//           ],
//           totalAmount: 2339.96,
//           paymentMethod: "cod",
//           paymentStatus: "pending",
//           status: "confirmed",
//           shippingAddress: {
//             fullName: "John Doe",
//             phone: "9923456780",
//             city: "New York",
//             state: "New York",
//           },
//           createdAt: "2025-06-22T15:51:46.699Z",
//         },
//         {
//           _id: "68582692e3e4798efc805e67",
//           orderNumber: "ORD2506220002",
//           customerId: "6857df0914caa564c0b641e8",
//           items: [
//             {
//               productName: "Samsung Galaxy S24",
//               quantity: 1,
//               totalPrice: 899.99,
//             },
//           ],
//           totalAmount: 924.99,
//           paymentMethod: "online",
//           paymentStatus: "paid",
//           status: "shipped",
//           shippingAddress: {
//             fullName: "Jane Smith",
//             phone: "9876543210",
//             city: "Los Angeles",
//             state: "California",
//           },
//           createdAt: "2025-06-22T16:51:46.699Z",
//         },
//         // Add more sample data for pagination demo
//       ]);
//     }, 300);
//   }, []);

//   // Pagination logic
//   const totalPages = Math.ceil(orders.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentOrders = orders.slice(startIndex, endIndex);

//   const goToPage = (page: number) => {
//     setCurrentPage(page);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "placed":
//         return "bg-blue-100 text-blue-800";
//       case "confirmed":
//         return "bg-green-100 text-green-800";
//       case "shipped":
//         return "bg-purple-100 text-purple-800";
//       case "delivered":
//         return "bg-emerald-100 text-emerald-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getPaymentStatusColor = (status: string) => {
//     switch (status) {
//       case "paid":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "failed":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm text-black">
//       {/* Header */}
//       <div className="flex justify-between items-center p-6 border-b border-gray-200">
//         <div>
//           <h2 className="text-2xl font-semibold text-black">Orders</h2>
//           <p className="text-sm text-gray-600 mt-1">Manage customer orders</p>
//         </div>
//         <div className="flex space-x-3">
//           <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
//             <option value="">All Status</option>
//             <option value="placed">Placed</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Order Number
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Customer
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Items
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Total
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Payment
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {currentOrders.map((order: any) => (
//               <tr key={order._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="font-medium text-black">
//                     {order.orderNumber}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div>
//                     <div className="font-medium text-black">
//                       {order.shippingAddress.fullName}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {order.shippingAddress.phone}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {order.shippingAddress.city},{" "}
//                       {order.shippingAddress.state}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm">
//                     {order.items.slice(0, 2).map((item: any, index: number) => (
//                       <div key={index} className="text-gray-700">
//                         {item.productName} (x{item.quantity})
//                       </div>
//                     ))}
//                     {order.items.length > 2 && (
//                       <div className="text-gray-500 text-xs">
//                         +{order.items.length - 2} more items
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="font-medium text-black">
//                     ${order.totalAmount.toFixed(2)}
//                   </div>
//                   <div className="text-sm text-gray-500 capitalize">
//                     {order.paymentMethod}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(
//                       order.paymentStatus
//                     )}`}
//                   >
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                       order.status
//                     )}`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-gray-600 text-sm">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-3">
//                     <button className="text-gray-600 hover:text-black text-sm font-medium">
//                       View
//                     </button>
//                     <button className="text-green-600 hover:text-green-700 text-sm font-medium">
//                       Update
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {currentOrders.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={8}
//                   className="px-6 py-12 text-center text-gray-500"
//                 >
//                   Loading orders...
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//           <div className="text-sm text-gray-600">
//             Showing {startIndex + 1} to {Math.min(endIndex, orders.length)} of{" "}
//             {orders.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => goToPage(i + 1)}
//                 className={`px-3 py-1 text-sm font-medium rounded-lg ${
//                   currentPage === i + 1
//                     ? "bg-green-600 text-white"
//                     : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersListPage;

"use client";

import { useEffect, useState } from "react";

const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/orders/list?page=${page}&limit=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await res.json();

      if (json.success) {
        setOrders(json.data.data);
        setPagination(json.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(pagination.currentPage);
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
          <h2 className="text-2xl font-semibold text-black">Orders</h2>
          <p className="text-sm text-gray-600 mt-1">Manage all orders</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Order #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Date
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
                  Loading orders...
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-black">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.shippingAddress.fullName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-600">
                    {order.paymentMethod} ({order.paymentStatus})
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
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
                    ? "bg-green-600 text-white"
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

export default OrdersListPage;
