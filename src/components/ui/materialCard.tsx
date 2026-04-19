import Link from "next/link";

// Types
import { Material } from "@/types/Material.type";

import { BookOpen, Star, Download } from "lucide-react";

// Material Card Component
function MaterialCard({
  material,
  levelColors,
}: {
  material: Material;
  levelColors: any;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-gray-300" />
        {material.isFree && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
            FREE
          </span>
        )}
        {material.isPopular && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg">
            POPULAR
          </span>
        )}
        {material.isNew && !material.isFree && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg">
            NEW
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${levelColors[material.level]}`}
          >
            {material.level}
          </span>
          <span className="text-xs text-gray-500">{material.category}</span>
        </div>

        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
          {material.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">{material.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Download className="w-3.5 h-3.5" />
            <span>{material.downloads.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {material.isFree ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${material.price}
              </span>
            )}
          </div>
          <Link href={`/materials/${material.id}`}>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MaterialCard;
