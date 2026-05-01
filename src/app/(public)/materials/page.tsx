// app/materials/page.tsx
"use client";

import { Material } from "@/types/Material.type";
import { materialService } from "@/api/services/materials.service";
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

const categories = [
  "All",
  "IELTS",
  "Grammar",
  "Vocabulary",
  "Reading",
  "Listening",
  "Writing",
  "Speaking",
];

const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const ITEMS_PER_PAGE = 6;

// Level badge colors - type dagi qiymatlarga mos
const levelColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-red-100 text-red-700",
};

// Category ni formatlash
const formatCategoryForFilter = (category: string) => {
  const map: Record<string, string> = {
    ielts: "IELTS",
    grammar: "Grammar",
    vocabulary: "Vocabulary",
    reading: "Reading",
    listening: "Listening",
    writing: "Writing",
    speaking: "Speaking",
  };
  return map[category.toLowerCase()] || category;
};

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [materialsData, setMaterialsData] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllMaterials() {
      try {
        setIsLoading(true);
        let data = await materialService.getAllMaterials();
        setMaterialsData(data.materials);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getAllMaterials();
  }, []);

  // Filter materials - type ga mos
  const filteredMaterials = materialsData.filter((material) => {
    const matchesSearch = material.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const materialCategoryFormatted = formatCategoryForFilter(
      material.category,
    );
    const matchesCategory =
      selectedCategory === "All" ||
      materialCategoryFormatted === selectedCategory;

    const materialLevelFormatted =
      material.level.charAt(0).toUpperCase() + material.level.slice(1);
    const matchesLevel =
      selectedLevel === "All" || materialLevelFormatted === selectedLevel;

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

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading materials...</p>
            </div>
          ) : filteredMaterials.length === 0 ? (
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
              {paginatedMaterials.map((material, index) => (
                <MaterialCard key={index} material={material} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !isLoading && (
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
