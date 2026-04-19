"use client";

import { MaterialCard } from "../ui/MaterialCard";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";

// Types
interface Material {
  id: number;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  downloads: number;
  isNew?: boolean;
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
    isNew: true,
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
    isNew: true,
  },
  {
    id: 6,
    title: "Speaking Confidence Kit",
    level: "Beginner",
    category: "Speaking",
    rating: 4.8,
    downloads: 1750,
  },
  {
    id: 7,
    title: "IELTS Full Mock Tests",
    level: "Advanced",
    category: "IELTS",
    rating: 4.9,
    downloads: 4200,
    isPopular: true,
  },
  {
    id: 8,
    title: "Business English Essentials",
    level: "Intermediate",
    category: "Business",
    rating: 4.7,
    downloads: 1950,
  },
  {
    id: 9,
    title: "Academic Writing Guide",
    level: "Advanced",
    category: "Writing",
    rating: 4.8,
    downloads: 2300,
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

export function Materials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Filter materials
  const filteredMaterials = useMemo(() => {
    return materialsData.filter((material) => {
      const matchesSearch = material.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || material.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || material.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Paginated materials
  const displayedMaterials = useMemo(() => {
    return filteredMaterials.slice(0, visibleCount);
  }, [filteredMaterials, visibleCount]);

  const hasMore = visibleCount < filteredMaterials.length;

  const loadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, filteredMaterials.length));
      setIsLoading(false);
    }, 500);
  }, [filteredMaterials.length]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setVisibleCount(6);
  }, []);

  // Close filter on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFilterOpen) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFilterOpen]);

  return (
    <section
      id="materials"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              Premium Resources
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Learning{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Materials
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of high-quality English learning resources
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials by title, category, or level..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                aria-label="Search materials"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setVisibleCount(6);
                }}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                aria-label="Filter by category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setVisibleCount(6);
                }}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                aria-label="Filter by level"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl === "All" ? "All Levels" : lvl}
                  </option>
                ))}
              </select>

              {/* Reset Button */}
              {(selectedCategory !== "All" ||
                selectedLevel !== "All" ||
                searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {isFilterOpen && (
            <div className="lg:hidden mt-4 p-4 bg-white rounded-xl border border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setVisibleCount(6);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        selectedCategory === cat
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setSelectedLevel(lvl);
                        setVisibleCount(6);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        selectedLevel === lvl
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {lvl === "All" ? "All Levels" : lvl}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== "All" || selectedLevel !== "All") && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:text-red-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedLevel !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                Level: {selectedLevel}
                <button
                  onClick={() => setSelectedLevel("All")}
                  className="hover:text-red-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {displayedMaterials.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {filteredMaterials.length}
            </span>{" "}
            materials
          </p>
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No materials found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedMaterials.map((material) => (
                <MaterialCard key={material.id} {...material} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="group px-8 py-3 border-2 border-red-600 text-red-600 rounded-xl 
                    hover:bg-red-600 hover:text-white transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center gap-2 mx-auto font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Materials
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* Trust Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-500">Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-500">Avg. Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-500">Expert Authors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
