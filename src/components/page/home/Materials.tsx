"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Download, BookOpen, Eye, TrendingUp, Award } from "lucide-react";

// Types
interface Material {
  id: number;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  downloads: number;
  isFree?: boolean;
  isPopular?: boolean;
}

// Mock data
const materialsData: Material[] = [
  {
    id: 1,
    title: "IELTS Vocabulary Builder",
    level: "Intermediate",
    category: "Vocabulary",
    rating: 4.8,
    downloads: 2340,
    isPopular: true,
  },
  {
    id: 2,
    title: "Grammar Fundamentals",
    level: "Beginner",
    category: "Grammar",
    rating: 4.9,
    downloads: 3120,
    isFree: true,
  },
  {
    id: 3,
    title: "Advanced Reading Strategies",
    level: "Advanced",
    category: "Reading",
    rating: 4.7,
    downloads: 1890,
    isPopular: true,
  },
  {
    id: 4,
    title: "Listening Practice Tests",
    level: "Intermediate",
    category: "Listening",
    rating: 4.6,
    downloads: 2560,
  },
  {
    id: 5,
    title: "Writing Task 2 Mastery",
    level: "Advanced",
    category: "Writing",
    rating: 4.9,
    downloads: 2100,
  },
  {
    id: 6,
    title: "Speaking Confidence Kit",
    level: "Beginner",
    category: "Speaking",
    rating: 4.8,
    downloads: 1750,
    isFree: true,
  },
];

// Level badge colors
const levelColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-red-100 text-red-700",
};

export function Materials() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              Premium Resources
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Learning <span className="text-red-600">Materials</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of high-quality English learning resources
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialsData.map((material, index) => (
            <div
              key={material.id}
              className={`bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image/Preview */}
              <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-300" />

                {/* Badges */}
                {material.isFree && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
                    FREE
                  </span>
                )}
                {material.isPopular && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    POPULAR
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Level and Category */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${levelColors[material.level]}`}
                  >
                    {material.level}
                  </span>
                  <span className="text-xs text-gray-500">
                    {material.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                  {material.title}
                </h3>

                {/* Rating and Downloads */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-900">
                      {material.rating}
                    </span>
                    <span className="text-xs text-gray-400">(128 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Download className="w-3.5 h-3.5" />
                    <span className="text-xs">
                      {material.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Link href={`/materials/${material.id}`}>
                  <button className="w-full py-2.5 bg-gray-50 text-gray-700 rounded-lg font-medium text-sm hover:bg-red-600 hover:text-white transition-all">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/materials">
            <button className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all">
              View All Materials
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
