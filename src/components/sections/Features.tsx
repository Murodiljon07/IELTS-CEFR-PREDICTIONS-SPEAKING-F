"use client";

import {
  BookOpen,
  Brain,
  FileText,
  Download,
  Award,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// Types
interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  stats?: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

// Feature data with enhanced details
const features: Feature[] = [
  {
    id: 1,
    icon: BookOpen,
    title: "IELTS Preparation",
    description:
      "Comprehensive study materials and practice tests tailored for IELTS success with 8.5+ avg band score.",
    stats: "95% success rate",
    gradient: "from-red-50 to-red-100/50",
    iconBg: "bg-gradient-to-br from-red-500 to-red-600",
    iconColor: "text-white",
  },
  {
    id: 2,
    icon: Brain,
    title: "Vocabulary Builder",
    description:
      "Learn and memorize essential English words with our smart flashcard system featuring spaced repetition.",
    stats: "5000+ words",
    gradient: "from-blue-50 to-blue-100/50",
    iconBg: "bg-gradient-to-br from-blue-700 to-blue-800",
    iconColor: "text-white",
  },
  {
    id: 3,
    icon: FileText,
    title: "Practice Tests",
    description:
      "Real exam simulations with detailed feedback, scoring analysis, and personalized improvement plans.",
    stats: "150+ tests",
    gradient: "from-red-50 to-red-100/50",
    iconBg: "bg-gradient-to-br from-red-500 to-red-600",
    iconColor: "text-white",
  },
  {
    id: 4,
    icon: Download,
    title: "Downloadable Materials",
    description:
      "Access PDF books, audio files, and study guides offline anytime, anywhere on any device.",
    stats: "24/7 access",
    gradient: "from-blue-50 to-blue-100/50",
    iconBg: "bg-gradient-to-br from-blue-700 to-blue-800",
    iconColor: "text-white",
  },
];

// Additional features for carousel/second row
const additionalFeatures = [
  {
    icon: Award,
    title: "Official Partner",
    description: "Recognized IELTS test center with certified instructors",
    color: "red",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Self-paced courses with lifetime access",
    color: "blue",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join 10,000+ successful students worldwide",
    color: "red",
  },
  {
    icon: Shield,
    title: "Money-back Guarantee",
    description: "100% satisfaction or full refund within 30 days",
    color: "blue",
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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

  const handleFeatureClick = useCallback((featureId: number, title: string) => {
    console.log(`Feature clicked: ${title}`);
    // Add analytics or navigation logic here
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white"
      aria-label="Features section"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-500/5 to-blue-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-in fade-in slide-in-from-top-5 duration-500">
            <Award className="w-4 h-4 text-black" />
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              Official IELTS Test Center
            </span>
            <div className="w-1 h-1 bg-red-600 rounded-full" />
            <span className="text-xs font-semibold text-red-600">
              Premium Features
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools and resources you need to master
            English and ace your IELTS exam.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredId === feature.id;

            return (
              <div
                key={feature.id}
                className={`
                  group relative bg-white rounded-2xl border border-gray-100 p-6 lg:p-8
                  transition-all duration-500 cursor-pointer
                  hover:shadow-2xl hover:-translate-y-2
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleFeatureClick(feature.id, feature.title)}
                role="article"
                aria-label={`Feature: ${feature.title}`}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient}
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                `}
                />

                {/* Icon Container */}
                <div className="relative">
                  <div
                    className={`
                    w-14 h-14 lg:w-16 lg:h-16 rounded-xl 
                    ${feature.iconBg} shadow-lg
                    flex items-center justify-center mb-5
                    transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl
                    relative z-10
                  `}
                  >
                    <Icon
                      className={`w-7 h-7 lg:w-8 lg:h-8 ${feature.iconColor}`}
                    />
                  </div>

                  {/* Decorative ring */}
                  <div
                    className={`
                    absolute -top-1 -left-1 w-16 h-16 lg:w-18 lg:h-18 
                    rounded-xl border-2 border-red-200/50
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    scale-0 group-hover:scale-100
                  `}
                  />
                </div>

                {/* Title */}
                <h3 className="relative text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm lg:text-base text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                {feature.stats && (
                  <div className="relative inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full group-hover:bg-white transition-colors">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-semibold text-gray-700">
                      {feature.stats}
                    </span>
                  </div>
                )}

                {/* Hover Arrow Indicator */}
                <div
                  className={`
                  absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 
                  transition-all duration-300 transform translate-x-2 group-hover:translate-x-0
                `}
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features Row */}
        <div
          className={`
          grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6
          transition-all duration-700 delay-400
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isRed = feature.color === "red";

            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 lg:p-5 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div
                  className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${
                    isRed
                      ? "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white"
                      : "bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white"
                  }
                  transition-all duration-300
                `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4
                    className={`font-bold text-gray-900 mb-1 ${isRed ? "group-hover:text-red-600" : "group-hover:text-blue-900"} transition-colors`}
                  >
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          className={`
          mt-12 lg:mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 lg:p-8
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
                <h4 className="text-white font-bold text-lg">
                  Ready to start your journey?
                </h4>
                <p className="text-gray-300 text-sm">
                  Join 10,000+ successful students today
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2 group">
              Get Started Now
              <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div
          className={`
          flex flex-wrap justify-center gap-6 lg:gap-12 mt-12 pt-8 border-t border-gray-200
          transition-all duration-700 delay-800
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">50K+</div>
            <div className="text-xs text-gray-500">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-xs text-gray-500">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-xs text-gray-500">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-xs text-gray-500">Expert Instructors</div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes (add to globals.css if needed) */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
