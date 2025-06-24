// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const navItems = [
//   { label: "Products", href: "/dashboard/products/list" },
//   { label: "Order", href: "/dashboard/orders/list" },
//   { label: "Categories", href: "/dashboard/categories/list" },
//   { label: "Options", href: "/dashboard/options/list" },
//   { label: "Logout", href: "#" },
//   // Add other management modules here...
// ];

// export default function AdminDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar */}
//       <aside className="w-60 bg-white border-r border-gray-200 p-6">
//         <h1 className="text-xl font-semibold text-black mb-8">Admin Panel</h1>
//         <nav className="space-y-2">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 pathname === item.href
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 bg-gray-50">{children}</main>
//     </div>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "@/constant";

const navItems = [
  { label: "Products", href: "/dashboard/products/list" },
  { label: "Order", href: "/dashboard/orders/list" },
  { label: "Categories", href: "/dashboard/categories/list" },
  { label: "Options", href: "/dashboard/options/list" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/logout`, {
        method: "POST",
        credentials: "include",
      });
       deleteCookie('authToken');
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-semibold text-black mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
