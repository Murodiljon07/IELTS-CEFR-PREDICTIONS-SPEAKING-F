"use client";

import {
  BookText,
  Brain,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const categories = [
  {
    icon: BookText,
    name: "Grammar",
    count: "45 materials",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/materials?category=grammar",
  },
  {
    icon: Brain,
    name: "Vocabulary",
    count: "38 materials",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    href: "/materials?category=vocabulary",
  },
  {
    icon: Headphones,
    name: "Listening",
    count: "52 materials",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    href: "/materials?category=listening",
  },
  {
    icon: BookOpen,
    name: "Reading",
    count: "41 materials",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    href: "/materials?category=reading",
  },
  {
    icon: PenTool,
    name: "Writing",
    count: "29 materials",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    href: "/materials?category=writing",
  },
  {
    icon: Mic,
    name: "Speaking",
    count: "35 materials",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    href: "/materials?category=speaking",
  },
];

export function Categories() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              Learning Categories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse by <span className="text-red-600">Category</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your focus area and start learning today
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`group transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="bg-white rounded-xl p-5 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${category.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {category.name}
                  </h3>

                  {/* Count */}
                  <p className="text-xs text-gray-500">{category.count}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link href="/materials">
            <button className="px-6 py-2.5 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all">
              View All Materials
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
