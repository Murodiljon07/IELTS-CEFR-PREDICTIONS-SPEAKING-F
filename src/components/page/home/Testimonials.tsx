"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Award } from "lucide-react";

// Types
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  location: string;
  score?: string;
}

// Testimonial data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "IELTS Student",
    content:
      "GoodTesting helped me achieve a band 8.5 in IELTS! The materials are comprehensive and well-structured. The practice tests were incredibly accurate to the real exam.",
    rating: 5,
    avatar: "👩‍🎓",
    location: "London, UK",
    score: "Band 8.5",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    role: "University Student",
    content:
      "The vocabulary builder is amazing. I improved my English significantly in just 3 months. The flashcards system made learning fun and effective.",
    rating: 5,
    avatar: "👨‍🎓",
    location: "Dubai, UAE",
    score: "Band 7.5",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Professional",
    content:
      "Best platform for English learning. The practice tests are exactly like the real IELTS exam. I recommend it to all my colleagues.",
    rating: 5,
    avatar: "👩‍💼",
    location: "Madrid, Spain",
    score: "Band 8.0",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Medical Student",
    content:
      "The OET preparation materials were top-notch. I passed my exam on the first try! The instructors are very supportive.",
    rating: 5,
    avatar: "👨‍⚕️",
    location: "Seoul, Korea",
    score: "350+",
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "English Teacher",
    content:
      "As an English teacher, I find the resources here invaluable for my students. The structured approach really works.",
    rating: 5,
    avatar: "👩‍🏫",
    location: "Sydney, Australia",
    score: "CELTA Certified",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section
      className="py-20 bg-gray-50"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              Student Success Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-red-600">Students Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who achieved their goals with
            GoodTesting
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Quote Icon */}
            <div className="absolute opacity-5 right-6 top-6">
              <Quote className="w-16 h-16 text-gray-900" />
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              "{current.content}"
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-3xl">
                  {current.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {current.name}
                    </h4>
                    {current.score && (
                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        {current.score}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{current.role}</p>
                  <p className="text-xs text-gray-400">{current.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? "w-8 h-2 bg-red-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">10,000+</div>
            <div className="text-xs text-gray-500">Happy Students</div>
          </div>
          <div className="w-px h-8 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
          <div className="w-px h-8 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-gray-900">4.9/5</div>
            <div className="text-xs text-gray-500">Average Rating</div>
          </div>
          <div className="w-px h-8 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-xs text-gray-500">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
}
