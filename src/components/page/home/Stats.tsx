"use client";

import { Users, BookOpen, Award, Star, Globe, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  { value: "50,000+", label: "Students Trained", icon: Users },
  { value: "240+", label: "Learning Materials", icon: BookOpen },
  { value: "98%", label: "Success Rate", icon: Award },
  { value: "4.9/5", label: "Student Rating", icon: Star },
  { value: "50+", label: "Countries", icon: Globe },
  { value: "24/7", label: "Support Available", icon: Clock },
];

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`text-center transition-all duration-500 hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
