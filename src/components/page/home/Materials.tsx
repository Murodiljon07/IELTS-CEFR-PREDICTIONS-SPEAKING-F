"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Download, BookOpen, Eye, TrendingUp, Award } from "lucide-react";
import { materialService } from "@/api/services/materials.service";
import { Material } from "@/types/Material.type";
import MaterialCard from "@/components/ui/materialCard";

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

        setMaterialsData(data);
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
          {materialsData &&
            materialsData.map((material, index) => (
              <MaterialCard key={index} material={material} />
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
