"use client";

import { Material } from "@/types/Material.type";

import MaterialCard from "@/components/ui/materialCard";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  Download,
  BookOpen,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";

// Mock data
const materialsData: Material[] = [
  {
    id: 1,
    title: "IELTS Vocabulary Builder",
    level: "Intermediate",
    category: "Vocabulary",
    rating: 4.8,
    downloads: 2340,
    price: 29.99,
    isPopular: true,
  },
  {
    id: 2,
    title: "Grammar Fundamentals",
    level: "Beginner",
    category: "Grammar",
    rating: 4.9,
    downloads: 3120,
    price: 0,
    isFree: true,
    isNew: true,
  },
  {
    id: 3,
    title: "Advanced Reading Strategies",
    level: "Advanced",
    category: "Reading",
    rating: 4.7,
    downloads: 1890,
    price: 34.99,
    isPopular: true,
  },
  {
    id: 4,
    title: "Listening Practice Tests",
    level: "Intermediate",
    category: "Listening",
    rating: 4.6,
    downloads: 2560,
    price: 24.99,
  },
  {
    id: 5,
    title: "Writing Task 2 Mastery",
    level: "Advanced",
    category: "Writing",
    rating: 4.9,
    downloads: 2100,
    price: 39.99,
    isNew: true,
  },
  {
    id: 6,
    title: "Speaking Confidence Kit",
    level: "Beginner",
    category: "Speaking",
    rating: 4.8,
    downloads: 1750,
    price: 0,
    isFree: true,
  },
  {
    id: 7,
    title: "IELTS Full Mock Tests",
    level: "Advanced",
    category: "IELTS",
    rating: 4.9,
    downloads: 4200,
    price: 49.99,
    isPopular: true,
  },
  {
    id: 8,
    title: "Business English Essentials",
    level: "Intermediate",
    category: "Business",
    rating: 4.7,
    downloads: 1950,
    price: 29.99,
  },
  {
    id: 9,
    title: "Academic Writing Guide",
    level: "Advanced",
    category: "Writing",
    rating: 4.8,
    downloads: 2300,
    price: 34.99,
  },
];

const categories = [
  "All",
  "Vocabulary",
  "Grammar",
  "Reading",
  "Listening",
  "Writing",
  "Speaking",
  "IELTS",
  "Business",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const ITEMS_PER_PAGE = 6;

// Level badge colors
const levelColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter materials
  const filteredMaterials = materialsData.filter((material) => {
    const matchesSearch = material.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || material.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || material.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLevel]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setCurrentPage(1);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Learning <span className="text-red-500">Materials</span>
            </h1>
            <p className="text-gray-300">
              Explore our collection of high-quality English learning resources
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCategory === cat
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedLevel === level
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {(selectedCategory !== "All" ||
                selectedLevel !== "All" ||
                searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-red-500 text-sm hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedCategory === cat
                            ? "bg-red-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedLevel === level
                            ? "bg-red-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={resetFilters} className="text-red-500 text-sm">
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              Showing {paginatedMaterials.length} of {filteredMaterials.length}{" "}
              materials
            </p>
          </div>

          {/* Materials Grid */}
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No materials found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  levelColors={levelColors}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
