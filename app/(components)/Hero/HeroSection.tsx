"use client";

import { ArrowRight, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
  ];

  return (
    <section className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                New Collection Available
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                Ecomz
                <span className="block text-green-600">Fashion</span>
                <span className="block">for Modern Life</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover our carefully curated collection of timeless pieces
                that blend comfort, style, and sustainability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/products")}
                className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-black hover:text-black transition-colors duration-200">
                View Lookbook
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&crop=center"
                alt="Fashion model wearing minimalist clothing"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-black">
                    10K+ Happy Customers
                  </p>
                  <p className="text-sm text-gray-600">5-star reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl"
              >
                <IconComponent className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-black">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
