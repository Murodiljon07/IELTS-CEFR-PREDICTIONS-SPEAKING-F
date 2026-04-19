"use client";

import {
  BookOpen,
  Brain,
  FileText,
  Download,
  Award,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: BookOpen,
    title: "IELTS Preparation",
    description:
      "Comprehensive study materials and practice tests tailored for IELTS success.",
    color: "bg-red-600",
  },
  {
    icon: Brain,
    title: "Vocabulary Builder",
    description:
      "Learn and memorize essential English words with smart flashcard system.",
    color: "bg-blue-600",
  },
  {
    icon: FileText,
    title: "Practice Tests",
    description:
      "Real exam simulations with detailed feedback and scoring analysis.",
    color: "bg-green-600",
  },
  {
    icon: Download,
    title: "Downloadable Materials",
    description:
      "Access PDF books, audio files, and study guides offline anytime.",
    color: "bg-purple-600",
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to <span className="text-red-600">Excel</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools and resources you need to master
            English
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
