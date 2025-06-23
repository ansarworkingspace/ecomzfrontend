// app/403/page.tsx or pages/403.tsx (depending on your Next.js version)
"use client";

import { useRouter } from "next/navigation";
import { ShieldX, Home, ArrowLeft } from "lucide-react";

const ForbiddenPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <ShieldX className="mx-auto h-24 w-24 text-red-500" />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Forbidden
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, you don't have permission to access this page. This area is
          restricted to administrators only.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>

            <button
              onClick={handleGoHome}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">
              Need access? Contact your administrator or
            </p>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium text-sm underline transition-colors duration-200"
            >
              Login with different account
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-4 bg-white/50 rounded-lg border border-red-200">
          <p className="text-xs text-gray-500">
            If you believe this is an error, please contact your system
            administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
