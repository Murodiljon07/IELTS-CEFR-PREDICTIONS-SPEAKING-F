"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  BookOpen,
  Star,
  Download,
  Eye,
  TrendingUp,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Types
interface Material {
  id: number;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  downloads: number;
  price: number;
  isFree?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  duration?: string;
  author?: string;
  previewUrl?: string;
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
    price: 29.99,
    isPopular: true,
    duration: "4 weeks",
    author: "Dr. Sarah Johnson",
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
    duration: "3 weeks",
    author: "Prof. Michael Brown",
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
    duration: "5 weeks",
    author: "Emma Wilson",
  },
  {
    id: 4,
    title: "Listening Practice Tests",
    level: "Intermediate",
    category: "Listening",
    rating: 4.6,
    downloads: 2560,
    price: 24.99,
    duration: "4 weeks",
    author: "David Kim",
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
    duration: "6 weeks",
    author: "Dr. James Lee",
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
    duration: "3 weeks",
    author: "Maria Garcia",
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
    duration: "8 weeks",
    author: "IELTS Experts",
  },
  {
    id: 8,
    title: "Business English Essentials",
    level: "Intermediate",
    category: "Business",
    rating: 4.7,
    downloads: 1950,
    price: 29.99,
    duration: "4 weeks",
    author: "John Smith",
  },
  {
    id: 9,
    title: "Academic Writing Guide",
    level: "Advanced",
    category: "Writing",
    rating: 4.8,
    downloads: 2300,
    price: 34.99,
    duration: "5 weeks",
    author: "Prof. Anna Taylor",
  },
  {
    id: 10,
    title: "Phrasal Verbs Masterclass",
    level: "Intermediate",
    category: "Vocabulary",
    rating: 4.6,
    downloads: 1450,
    price: 19.99,
    duration: "3 weeks",
    author: "Tom Harris",
  },
  {
    id: 11,
    title: "Pronunciation Perfection",
    level: "Beginner",
    category: "Speaking",
    rating: 4.7,
    downloads: 1680,
    price: 24.99,
    isNew: true,
    duration: "4 weeks",
    author: "Lisa Wong",
  },
  {
    id: 12,
    title: "Reading Speed Techniques",
    level: "Advanced",
    category: "Reading",
    rating: 4.8,
    downloads: 2100,
    price: 29.99,
    duration: "4 weeks",
    author: "Dr. Robert Chen",
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
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const ITEMS_PER_PAGE = 6;

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort materials
  const filteredAndSortedMaterials = useMemo(() => {
    let filtered = materialsData.filter((material) => {
      const matchesSearch = material.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || material.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || material.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedMaterials.length / ITEMS_PER_PAGE,
  );
  const paginatedMaterials = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedMaterials.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedMaterials, currentPage]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSortBy("popular");
    setCurrentPage(1);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Learning <span className="text-red-500">Materials</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of high-quality English
              learning resources
            </p>
            <div className="mt-6 flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-red-500" />
                <span>240+ Materials</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.8 Avg Rating</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4 text-green-500" />
                <span>50K+ Downloads</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filters Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials by title, category, or level..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 ${viewMode === "grid" ? "bg-red-500 text-white" : "bg-white text-gray-600"}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 ${viewMode === "list" ? "bg-red-500 text-white" : "bg-white text-gray-600"}`}
                >
                  ≡
                </button>
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
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {paginatedMaterials.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {filteredAndSortedMaterials.length}
              </span>{" "}
              materials
            </p>
          </div>

          {/* Materials Grid/List */}
          {filteredAndSortedMaterials.length === 0 ? (
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
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  levelColors={levelColors}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedMaterials.map((material) => (
                <MaterialListItem
                  key={material.id}
                  material={material}
                  levelColors={levelColors}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-all ${
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Material Card Component (Grid View)
function MaterialCard({
  material,
  levelColors,
}: {
  material: Material;
  levelColors: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-gray-300" />
        {material.isFree && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
            FREE
          </span>
        )}
        {material.isNew && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg">
            NEW
          </span>
        )}
        {material.isPopular && !material.isFree && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            POPULAR
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${levelColors[material.level]}`}
          >
            {material.level}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">{material.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
          {material.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">By {material.author}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{material.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Download className="w-3 h-3" />
            <span>{material.downloads.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            {material.isFree ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${material.price}
              </span>
            )}
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Material List Item Component (List View)
function MaterialListItem({
  material,
  levelColors,
}: {
  material: Material;
  levelColors: any;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-8 h-8 text-gray-300" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${levelColors[material.level]}`}
            >
              {material.level}
            </span>
            <span className="text-xs text-gray-500">{material.category}</span>
            {material.isFree && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
                FREE
              </span>
            )}
            {material.isNew && (
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg">
                NEW
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            {material.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            By {material.author} • {material.duration}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{material.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{material.downloads.toLocaleString()} downloads</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="text-right">
            {material.isFree ? (
              <span className="text-2xl font-bold text-green-600">Free</span>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${material.price}
              </span>
            )}
          </div>
          <button className="mt-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
