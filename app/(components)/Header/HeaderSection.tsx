"use client";
import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="));

      setIsLoggedIn(!!authToken);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // Call logout API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_USER}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
        }
      );

      if (response.ok) {
        // Clear auth token from cookies
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Update state
        setIsLoggedIn(false);

        // Redirect to home or login page
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "Orders", href: "/orders" },
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
  ];

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-black">Ecomz</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!isLoading && (
              <button
                onClick={
                  isLoggedIn ? handleLogout : () => router.push("/login")
                }
                disabled={isLoading}
                className="hidden md:block px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggedIn ? "Logout" : "Sign In"}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-700 hover:text-black transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {!isLoading && (
              <button
                className="w-full mt-4 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={
                  isLoggedIn ? handleLogout : () => router.push("/login")
                }
                disabled={isLoading}
              >
                {isLoggedIn ? "Logout" : "Sign In"}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
