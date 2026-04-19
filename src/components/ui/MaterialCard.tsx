"use client";

import { Star, Download, BookOpen, Eye, TrendingUp } from "lucide-react";
import { useState, useCallback } from "react";

export interface MaterialCardProps {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  downloads: number;
  previewUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const levelColors = {
  Beginner: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    badge: "Beginner",
  },
  Intermediate: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    badge: "Intermediate",
  },
  Advanced: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    badge: "Advanced",
  },
};

export function MaterialCard({
  title,
  level,
  category,
  rating,
  downloads,
  previewUrl,
  isNew = false,
  isPopular = false,
}: MaterialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleViewDetails = useCallback(() => {
    console.log("View details:", title);
    // Navigate to material page
  }, [title]);

  const handleDownload = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("Download:", title);
      // Handle download logic
    },
    [title],
  );

  const levelStyle = levelColors[level];

  return (
    <div
      className={`
        group relative bg-white rounded-2xl border border-gray-100 overflow-hidden
        transition-all duration-300 cursor-pointer
        hover:shadow-xl hover:-translate-y-1
        ${isHovered ? "shadow-lg" : "shadow-md"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
      role="article"
      aria-label={`Material: ${title}, ${level} level, ${category}`}
    >
      {/* Image/Preview Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {!imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-red-600" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-700/90
          flex items-center justify-center gap-3 transition-all duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <button
            className="px-4 py-2 bg-white text-red-600 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
            onClick={handleViewDetails}
          >
            Quick View
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
              NEW
            </span>
          )}
          {isPopular && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              POPULAR
            </span>
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute bottom-3 right-3">
          <span
            className={`
            px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm
            ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border}
          `}
          >
            {levelStyle.badge}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-red-600 uppercase tracking-wider">
            {category}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
          {title}
        </h3>

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-900">
                {rating}
              </span>
            </div>
            <span className="text-xs text-gray-400">(128 reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Download className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">
              {downloads.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`
            w-full mt-4 px-4 py-2.5 rounded-xl font-semibold text-sm
            transition-all duration-300 flex items-center justify-center gap-2
            ${
              isHovered
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                : "bg-gray-50 text-gray-700 border border-gray-200"
            }
          `}
          onClick={handleDownload}
          aria-label={`Download ${title}`}
        >
          <Download className="w-4 h-4" />
          {isHovered ? "Download Now" : "Get Material"}
        </button>
      </div>
    </div>
  );
}
