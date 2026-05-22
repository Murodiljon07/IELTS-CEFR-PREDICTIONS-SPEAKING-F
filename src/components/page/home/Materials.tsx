"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Download, BookOpen, Eye, TrendingUp, Award } from "lucide-react";
import { materialService } from "@/api/services/materials.service";
import { Material } from "@/types/Material.type";

// Level badge colors
const levelColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-red-100 text-red-700",
};

export function Materials() {
  const [isVisible, setIsVisible] = useState(false);
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
              key={material._id}
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
                {material.salary === 0 && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
                    FREE
                  </span>
                )}
                {Number(material.rate) > 4.5 && (
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
                  {material.name}
                </h3>

                {/* Rating and Downloads */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-900">
                      {material.rate.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">(128 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Download className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Button */}
                <Link href={`/materials/${material._id}`}>
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
