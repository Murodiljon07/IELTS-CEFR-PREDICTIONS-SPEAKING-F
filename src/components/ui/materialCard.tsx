// components/ui/materialCard.tsx
"use client";

import Link from "next/link";
import { Material } from "@/types/Material.type";
import { BookOpen, Star, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { materialService } from "@/api/services/materials.service";

// Level colors - type dagi qiymatlarga mos
const levelColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-red-100 text-red-700",
};

// Category ni chiroyli ko'rinishga o'tkazish
const formatCategory = (category: string) => {
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

function MaterialCard({ material }: { material: Material }) {
  const router = useRouter();

  // MaterialCard da ishlatiladigan qo'shimcha flaglar ( agar backenddan kelmasa, logic orqali aniqlaymiz)
  const isFree = material.salary === 0;
  const isPopular = material.rate >= 4.5; // 4.8 va undan yuqori bo'lsa popular
  const isNew =
    new Date(material.createdAt) >
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 kun ichida yaratilgan bo'lsa

  const handleViewDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await materialService.getMaterialById(material._id);

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();

      router.push(`/materials/${material._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
      {/* Image/Banner */}
      <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        {material.banner ? (
          <img
            src={material.banner as string}
            alt={material.name as string}
            className="w-full h-full object-cover"
          />
        ) : (
          <BookOpen className="w-12 h-12 text-gray-300" />
        )}

        {isFree && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
            FREE
          </span>
        )}

        <div className="absolute top-3 right-3 px-2 py-1">
          {isPopular && (
            <span className=" px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg">
              POPULAR
            </span>
          )}
          {isNew && !isPopular && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg">
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${levelColors[material.level]}`}
          >
            {material.level.charAt(0).toUpperCase() + material.level.slice(1)}
          </span>
          <span className="text-xs text-gray-500">
            {formatCategory(material.category as string)}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
          {material.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">
              {Number(material.rate).toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Download className="w-3.5 h-3.5" />
            <span>{Math.floor(Math.random() * 5000).toLocaleString()}</span>
            {/* Downloads backenddan kelmasa, placeholder yoki hisoblash mumkin */}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {isFree ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${Number(material.salary).toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaterialCard;
