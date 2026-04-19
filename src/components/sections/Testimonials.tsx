"use client";

import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  Sparkles,
  User,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

// Types
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  location?: string;
  score?: string;
  date?: string;
  verified?: boolean;
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
    score: "8.5 Band",
    date: "March 2026",
    verified: true,
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
    score: "7.5 Band",
    date: "February 2026",
    verified: true,
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
    score: "8.0 Band",
    date: "January 2026",
    verified: true,
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
    date: "March 2026",
    verified: true,
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "Teacher",
    content:
      "As an English teacher, I find the resources here invaluable for my students. The structured approach really works.",
    rating: 5,
    avatar: "👩‍🏫",
    location: "Sydney, Australia",
    score: "CELTA Certified",
    date: "December 2025",
    verified: true,
  },
  {
    id: 6,
    name: "Raj Patel",
    role: "Software Engineer",
    content:
      "Finally found a platform that works! My speaking score improved from 6.0 to 7.5 in 2 months. Highly recommended!",
    rating: 5,
    avatar: "👨‍💻",
    location: "Bangalore, India",
    score: "7.5 Band",
    date: "February 2026",
    verified: true,
  },
];

// Stats data
const stats = [
  { value: "10,000+", label: "Happy Students", icon: User },
  { value: "98%", label: "Success Rate", icon: TrendingUp },
  { value: "4.9/5", label: "Average Rating", icon: Star },
  { value: "50+", label: "Countries", icon: Award },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Items per view based on screen size
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerView);

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

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalPages > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalPages, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView,
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      aria-label="Testimonials section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-red-500/3 to-blue-900/3 rounded-full blur-3xl" />

        {/* Quote decorations */}
        <div className="absolute top-20 left-10 opacity-5">
          <Quote className="w-32 h-32 text-gray-900" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 transform rotate-180">
          <Quote className="w-32 h-32 text-gray-900" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-in fade-in slide-in-from-top-5 duration-500">
            <Award className="w-4 h-4 text-black" />
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              Student Success Stories
            </span>
            <div className="w-1 h-1 bg-red-600 rounded-full" />
            <span className="text-xs font-semibold text-red-600">
              10,000+ Graduates
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who achieved their goals with
            GoodTesting
          </p>
        </div>

        {/* Stats Row */}
        <div
          className={`
          grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12
          transition-all duration-700
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-xl font-black text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 
                  w-10 h-10 bg-white border border-gray-200 rounded-full 
                  flex items-center justify-center shadow-lg
                  hover:bg-red-600 hover:border-red-600 hover:text-white
                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 
                  w-10 h-10 bg-white border border-gray-200 rounded-full 
                  flex items-center justify-center shadow-lg
                  hover:bg-red-600 hover:border-red-600 hover:text-white
                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="flex-shrink-0 w-full">
                    <div className={`grid md:grid-cols-${itemsPerView} gap-6`}>
                      {testimonials
                        .slice(
                          pageIndex * itemsPerView,
                          (pageIndex + 1) * itemsPerView,
                        )
                        .map((testimonial, idx) => (
                          <div
                            key={testimonial.id}
                            className={`
                              bg-white rounded-2xl p-6 sm:p-8 border border-gray-100
                              transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                            `}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                            onMouseEnter={() => setHoveredId(testimonial.id)}
                            onMouseLeave={() => setHoveredId(null)}
                          >
                            {/* Quote Icon */}
                            <div className="absolute opacity-5 right-6 top-6">
                              <Quote className="w-12 h-12 text-gray-900" />
                            </div>

                            {/* Rating Stars */}
                            <div className="flex gap-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-5 h-5 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>

                            {/* Verified Badge */}
                            {testimonial.verified && (
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full mb-3">
                                <Sparkles className="w-3 h-3 text-green-500" />
                                <span className="text-[10px] font-semibold text-green-600">
                                  Verified Graduate
                                </span>
                              </div>
                            )}

                            {/* Content */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                              "{testimonial.content}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center text-2xl shadow-md">
                                {testimonial.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="font-bold text-gray-900">
                                    {testimonial.name}
                                  </div>
                                  {testimonial.score && (
                                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                      {testimonial.score}
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {testimonial.role}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-400">
                                    {testimonial.location}
                                  </span>
                                  <span className="text-xs text-gray-300">
                                    •
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {testimonial.date}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Hover Effect Line */}
                            <div
                              className={`
                              absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-700
                              transition-all duration-300 rounded-b-2xl
                              ${hoveredId === testimonial.id ? "opacity-100" : "opacity-0"}
                            `}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    transition-all duration-300 rounded-full
                    ${
                      currentIndex === index
                        ? "w-8 h-2 bg-red-600"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trust CTA Banner */}
        <div
          className={`
          mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8
          transition-all duration-700 delay-400
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">
                  Ready to start your journey?
                </h4>
                <p className="text-gray-300 text-sm">
                  Join our community of successful students
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2 group">
              Start Learning Today
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
