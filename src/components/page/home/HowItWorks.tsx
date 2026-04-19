"use client";

import { UserPlus, Search, ShoppingCart, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up for free and create your learning profile",
    step: "01",
  },
  {
    icon: Search,
    title: "Choose Materials",
    description: "Browse our collection of courses and materials",
    step: "02",
  },
  {
    icon: ShoppingCart,
    title: "Purchase & Access",
    description: "Buy and get instant access to your chosen content",
    step: "03",
  },
  {
    icon: PlayCircle,
    title: "Start Learning",
    description: "Learn at your own pace and track your progress",
    step: "04",
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It <span className="text-red-600">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started with GoodTesting in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`relative text-center ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                    <Icon className="w-8 h-8 text-red-600" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2">
                    <div className="w-2 h-2 bg-red-600 rounded-full absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
