"use client";
import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const BackNavigation = ({ title = "" }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 space-x-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleHome}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-black"
          >
            <Home className="w-5 h-5" />
          </button>

          {title && (
            <>
              <div className="w-px h-6 bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackNavigation;
