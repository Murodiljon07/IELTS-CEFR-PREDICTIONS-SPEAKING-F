"use client";

import { ArrowRight, BookOpen, Award, Star, Users } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white pt-20 pb-16 lg:pt-24 lg:pb-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">
                Official IELTS Test Center
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Master English with{" "}
              <span className="text-red-600">Smart Materials</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Comprehensive IELTS preparation, vocabulary building, and practice
              tests designed to help you achieve your English learning goals.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/courses">
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center gap-2 shadow-md">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/materials">
                <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-red-600 hover:text-red-600 transition-all">
                  Browse Materials
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">240+</div>
                <div className="text-sm text-gray-500">Materials</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Image/Content */}
          <div
            className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">IELTS Preparation</h3>
                  <p className="text-sm text-gray-500">Complete study guide</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="font-semibold text-gray-900">75%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full w-3/4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">8.5</div>
                  <div className="text-xs text-gray-600">Avg. Band Score</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    12 Weeks
                  </div>
                  <div className="text-xs text-gray-600">Duration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
