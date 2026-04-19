"use client";

import {
  ArrowRight,
  BookOpen,
  Download,
  TrendingUp,
  Users,
  FileText,
  Award,
  Star,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// Types
interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FeatureItem {
  title: string;
  description: string;
  score?: string;
  duration?: string;
}

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats: StatItem[] = [
    { value: "5000+", label: "Students", icon: <Users className="w-4 h-4" /> },
    {
      value: "150+",
      label: "Materials",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      value: "95%",
      label: "Success Rate",
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  const features: FeatureItem[] = [
    {
      title: "IELTS Preparation",
      description: "Complete study guide",
      score: "8.5",
      duration: "12 Weeks",
    },
  ];

  const handleScrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-blue-50/20"
      aria-label="Hero section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500/5 to-blue-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div
            className={`
              space-y-6 lg:space-y-8 transition-all duration-700 transform
              ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
            `}
          >
            {/* Official Badge */}
            <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
              <Award className="w-4 h-4 text-black" />
              <span className="text-xs font-bold uppercase tracking-wider text-black">
                IELTS Official Test Center
              </span>
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              <span className="text-xs font-semibold text-red-600">
                Since 2015
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="text-gray-900">Master English with</span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Smart Materials
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed">
              Comprehensive IELTS preparation, vocabulary building, and practice
              tests designed to help you achieve your English learning goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleScrollToSection("materials")}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl 
                  hover:shadow-xl hover:shadow-red-200 hover:scale-105 transition-all duration-300 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  flex items-center gap-2 font-semibold text-base sm:text-lg overflow-hidden"
                aria-label="Start Learning"
              >
                <span className="relative z-10">Start Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => handleScrollToSection("materials")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl 
                  hover:border-red-600 hover:shadow-lg transition-all duration-300 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  flex items-center gap-2 font-semibold text-base sm:text-lg"
                aria-label="Browse Materials"
              >
                Browse Materials
                <BookOpen className="w-5 h-5" />
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-100">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center sm:text-left group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm mb-1">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-red-600 transition-colors">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9/5</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">10,000+ graduates</span>
              </div>
            </div>
          </div>

          {/* Right Column - Card Preview */}
          <div
            className={`
              relative transition-all duration-700 delay-200 transform
              ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating decorative elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-red-600/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-900/10 rounded-full blur-2xl animate-pulse delay-1000" />

            {/* Main Card */}
            <div
              className={`
              relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8
              transition-all duration-500 transform
              ${isHovered ? "scale-105 shadow-3xl" : "scale-100"}
            `}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg">
                      IELTS Preparation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Complete study guide
                    </p>
                  </div>
                </div>
                <div className="bg-red-50 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-red-600">
                    Bestseller
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="font-semibold text-gray-900">75%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-700 rounded-full transition-all duration-1000"
                    style={{ width: isHovered ? "85%" : "75%" }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 rounded-xl transition-all hover:scale-105">
                  <div className="text-2xl font-black text-red-600">8.5</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Avg. Band Score
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+15%</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl transition-all hover:scale-105">
                  <div className="text-2xl font-black text-blue-900">
                    12 Weeks
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Duration</div>
                  <div className="flex items-center gap-1 mt-2">
                    <Download className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-600">Full access</span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">40+ practice tests</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">
                    Video lessons & PDF materials
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">1-on-1 mentor support</span>
                </div>
              </div>

              {/* CTA inside card */}
              <button className="w-full mt-6 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group">
                Enroll Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Decorative floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 animate-bounce">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    Official
                  </div>
                  <div className="text-[10px] text-gray-500">Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-gray-400 text-xs">
          <span>Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-red-600 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
