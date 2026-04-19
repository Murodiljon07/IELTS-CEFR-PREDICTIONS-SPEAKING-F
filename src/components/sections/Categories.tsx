"use client";

import {
  BookText,
  Brain,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  Award,
  TrendingUp,
  Star,
  Clock,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// Types
interface Category {
  id: number;
  icon: React.ElementType;
  name: string;
  count: string;
  totalMaterials: number;
  color: string;
  gradient: string;
  badge?: string;
  popular?: boolean;
  description: string;
}

// Category data with enhanced details
const categories: Category[] = [
  {
    id: 1,
    icon: BookText,
    name: "Grammar",
    count: "45 materials",
    totalMaterials: 45,
    color: "from-blue-600 to-blue-700",
    gradient: "from-blue-50 to-blue-100/50",
    badge: "Bestseller",
    popular: true,
    description: "Master English grammar rules",
  },
  {
    id: 2,
    icon: Brain,
    name: "Vocabulary",
    count: "38 materials",
    totalMaterials: 38,
    color: "from-purple-600 to-purple-700",
    gradient: "from-purple-50 to-purple-100/50",
    popular: true,
    description: "Build your word power",
  },
  {
    id: 3,
    icon: Headphones,
    name: "Listening",
    count: "52 materials",
    totalMaterials: 52,
    color: "from-emerald-600 to-emerald-700",
    gradient: "from-emerald-50 to-emerald-100/50",
    badge: "Most Popular",
    popular: true,
    description: "Improve listening skills",
  },
  {
    id: 4,
    icon: BookOpen,
    name: "Reading",
    count: "41 materials",
    totalMaterials: 41,
    color: "from-amber-600 to-amber-700",
    gradient: "from-amber-50 to-amber-100/50",
    description: "Enhance reading comprehension",
  },
  {
    id: 5,
    icon: PenTool,
    name: "Writing",
    count: "29 materials",
    totalMaterials: 29,
    color: "from-rose-600 to-rose-700",
    gradient: "from-rose-50 to-rose-100/50",
    description: "Perfect your writing",
  },
  {
    id: 6,
    icon: Mic,
    name: "Speaking",
    count: "35 materials",
    totalMaterials: 35,
    color: "from-red-600 to-red-700",
    gradient: "from-red-50 to-red-100/50",
    badge: "IELTS Focus",
    popular: true,
    description: "Speak with confidence",
  },
];

// Stats data
const stats = [
  { value: "240+", label: "Total Materials", icon: BookOpen },
  { value: "50K+", label: "Students Enrolled", icon: Users },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "98%", label: "Success Rate", icon: TrendingUp },
];

// Import Users icon (add to lucide-react imports if needed)
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function Categories() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = useCallback(
    (categoryId: number, name: string) => {
      setSelectedCategory(categoryId);
      console.log(`Category clicked: ${name}`);
      // Add navigation or filter logic here
      // Example: router.push(`/materials?category=${name.toLowerCase()}`)

      // Reset selection after animation
      setTimeout(() => setSelectedCategory(null), 300);
    },
    [],
  );

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      aria-label="Categories section"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-red-500/3 to-blue-900/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-in fade-in slide-in-from-top-5 duration-500">
            <Award className="w-4 h-4 text-black" />
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              IELTS Official Test Center
            </span>
            <div className="w-1 h-1 bg-red-600 rounded-full" />
            <span className="text-xs font-semibold text-red-600">
              Categories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Browse by{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your focus area and start learning today with our curated
            materials
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredId === category.id;
            const isSelected = selectedCategory === category.id;

            return (
              <div
                key={category.id}
                className={`
                  group relative bg-white rounded-2xl p-5 sm:p-6 text-center
                  transition-all duration-400 cursor-pointer
                  hover:shadow-2xl hover:-translate-y-2
                  border border-gray-100
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  ${isSelected ? "scale-95" : "scale-100"}
                `}
                style={{ transitionDelay: `${index * 80}ms` }}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleCategoryClick(category.id, category.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCategoryClick(category.id, category.name);
                  }
                }}
                aria-label={`Category: ${category.name}, ${category.count}`}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient}
                  opacity-0 group-hover:opacity-100 transition-opacity duration-400
                `}
                />

                {/* Badge */}
                {category.badge && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full shadow-lg">
                      {category.badge}
                    </div>
                  </div>
                )}

                {/* Popular Indicator */}
                {category.popular && !category.badge && (
                  <div className="absolute top-2 right-2">
                    <TrendingUp className="w-3 h-3 text-red-500" />
                  </div>
                )}

                {/* Icon Container */}
                <div className="relative mb-4">
                  <div
                    className={`
                    w-16 h-16 mx-auto rounded-xl 
                    bg-gradient-to-br ${category.color}
                    flex items-center justify-center
                    transition-all duration-300 
                    group-hover:scale-110 group-hover:shadow-xl
                    relative z-10
                  `}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Decorative Ring */}
                  <div
                    className={`
                    absolute -top-1 -left-1 right-0 bottom-0 mx-auto
                    w-18 h-18 rounded-xl border-2 border-red-200/50
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    scale-0 group-hover:scale-100
                  `}
                  />
                </div>

                {/* Category Name */}
                <h3 className="relative text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                  {category.name}
                </h3>

                {/* Material Count */}
                <p className="relative text-xs sm:text-sm text-gray-500 mb-3">
                  {category.count}
                </p>

                {/* Description (visible on hover) */}
                <div
                  className={`
                  relative overflow-hidden transition-all duration-300
                  ${isHovered ? "max-h-12 opacity-100 mt-2" : "max-h-0 opacity-0"}
                `}
                >
                  <p className="text-xs text-gray-600">
                    {category.description}
                  </p>
                </div>

                {/* View Link */}
                <div
                  className={`
                  relative mt-3 transition-all duration-300
                  ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                `}
                >
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                    View materials
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div
          className={`
          grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12
          transition-all duration-700 delay-400
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          className={`
          bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8
          transition-all duration-700 delay-600
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg">
                  Not sure where to start?
                </h4>
                <p className="text-gray-300 text-sm">
                  Take our free placement test to find your level
                </p>
              </div>
            </div>
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2 group text-sm sm:text-base">
              Start Placement Test
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`
          flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-gray-200
          transition-all duration-700 delay-800
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              4.9/5 from 5,000+ reviews
            </span>
          </div>
          <div className="w-px h-6 bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">
              Lifetime access to all materials
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
