"use client";

import { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  Maximize2,
  X,
  Send,
  Sparkles,
} from "lucide-react";

import Araa from "@/imgs/telegram-cloud-photo-size-2-5447573056546083341-y.jpg";
import Leila from "@/imgs/telegram-cloud-photo-size-2-5433761025837700443-y.jpg";
import JohnTarasov from "@/imgs/telegram-cloud-photo-size-2-5406782549545129714-y.jpg";
import XomidovaShahzoda from "@/imgs/telegram-cloud-photo-size-2-5350759524417082312-y.jpg";
import Princessa from "@/imgs/telegram-cloud-photo-size-2-5305586896643756595-y.jpg";

// Types
interface Testimonial {
  id: number;
  motivationalTextID: number;
  name: string;
  screenshot: string;
}

// Lightbox Component
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <X className="w-8 h-8" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

const motivationTexts = [
  {
    id: 1,
    text: "Congratulations on your incredible IELTS success! Your dedication and hard work have paid off brilliantly. We're honored that our prediction service could help you achieve your goals. May this achievement open new doors and bring you endless opportunities. Keep shining! 🌟",
    motivationalQuote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  },
  {
    id: 2,
    text: "Outstanding work on passing your IELTS exam! Your result proves that with the right preparation and determination, nothing is impossible. We're thrilled to have been part of your journey. Wishing you all the best in your future endeavors. You're destined for greatness! 🚀",
    motivationalQuote:
      "The future belongs to those who believe in the beauty of their dreams.",
  },
  {
    id: 3,
    text: "Bravo on your amazing IELTS score! Your success story inspires us and other students. We're so happy our materials appeared in your exam and helped you succeed. May your path be filled with more achievements and victories. The best is yet to come! 💪",
    motivationalQuote: "Believe you can and you're halfway there.",
  },
  {
    id: 4,
    text: "Congratulations on conquering the IELTS exam! Your hard work, combined with our accurate predictions, created the perfect formula for success. We're proud of what you've accomplished. May this be the first of many great achievements in your life! ✨",
    motivationalQuote: "The only way to do great work is to love what you do.",
  },
  {
    id: 5,
    text: "What a fantastic achievement! Your IELTS success shows that with persistence and the right guidance, anything is possible. We're delighted our service helped you excel. May your future be as bright as your determination. Keep reaching for the stars! 🌈",
    motivationalQuote: "Dream it. Wish it. Do it.",
  },
];

// Testimonial data - 5 different students with screenshots
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Araa",
    screenshot: Araa.src,
    motivationalTextID: 1,
  },
  {
    id: 2,
    name: "Leila",
    screenshot: Leila.src,
    motivationalTextID: 2,
  },
  {
    id: 3,
    name: "John Tarasov",
    screenshot: JohnTarasov.src,
    motivationalTextID: 3,
  },
  {
    id: 4,
    name: "Xomidova Shahzoda",
    screenshot: XomidovaShahzoda.src,
    motivationalTextID: 4,
  },
  {
    id: 5,
    name: "Princessa",
    screenshot: Princessa.src,
    motivationalTextID: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
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
  const motivationalText = motivationTexts.find(
    (item) => item.id === current?.motivationalTextID,
  );

  return (
    <section
      className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4">
            <Award className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
            <span className="text-xs md:text-sm font-semibold text-red-600">
              Student Success Stories
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            What Our <span className="text-red-600">Students Say</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who achieved their goals with
            GoodTesting
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <div
            className={`bg-white rounded-xl md:rounded-2xl shadow-xl transition-all duration-500 overflow-hidden ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {current && motivationalText ? (
              <div className="grid md:grid-cols-2">
                {/* LEFT SIDE - Screenshot */}
                <div
                  className="bg-gray-900 p-4 cursor-pointer group relative flex flex-col"
                  onClick={() =>
                    current.screenshot && setLightboxImage(current.screenshot)
                  }
                >
                  {current.screenshot ? (
                    <div className="relative">
                      <img
                        src={current.screenshot}
                        alt={`Telegram chat screenshot from ${current.name}`}
                        className="w-full max-h-[450px] object-contain rounded-lg shadow-md transition-all group-hover:brightness-95"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                      {/* Student name overlay */}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-medium">
                          💬 {current.name}'s Chat
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[350px] text-gray-400 text-sm">
                      No screenshot available
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE - Motivational Message from GoodTesting */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-red-50 to-orange-50 relative flex flex-col justify-between">
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Sparkles className="w-16 h-16 text-red-600" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                        GoodTesting Team
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                      Congratulations, {current.name}! 🎉
                    </h3>

                    <div className="space-y-4 text-gray-700">
                      {/* Dynamic motivation text from motivationTexts */}
                      <p className="text-sm md:text-base leading-relaxed">
                        {motivationalText.text}
                      </p>

                      {/* Quote */}
                      <div className="bg-white/60 rounded-lg p-4 my-3 border border-red-200">
                        <div className="flex items-start gap-2">
                          <span className="text-red-400 text-2xl">"</span>
                          <p className="text-red-700 font-medium italic text-sm md:text-base">
                            {motivationalText.motivationalQuote}
                          </p>
                          <span className="text-red-400 text-2xl self-end">
                            "
                          </span>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-xs text-gray-500 ml-2">
                          5/5 rating
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Join Telegram Channel Button */}
                  <div className="mt-6 pt-4 border-t border-red-200">
                    <a
                      href="https://t.me/ielts_speaking_free"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      Join Telegram Channel
                    </a>
                    <p className="text-xs text-center text-gray-500 mt-3">
                      📚 IELTS materials, updates & free lessons
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-12 text-center">
                <h3 className="flex justify-center items-center font-bold text-red-400 text-xl md:text-2xl">
                  Your comment will be here
                </h3>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {current && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-12 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all z-10"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-12 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all z-10"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? "w-6 md:w-8 h-1.5 md:h-2 bg-red-600"
                  : "w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">
            Showing {currentIndex + 1} of {testimonials.length} success stories
          </span>
        </div>

        {/* Stats */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-center">
          <div>
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              10,000+
            </div>
            <div className="text-[10px] md:text-xs text-gray-500">
              Happy Students
            </div>
          </div>
          <div className="w-px h-6 md:h-8 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              98%
            </div>
            <div className="text-[10px] md:text-xs text-gray-500">
              Success Rate
            </div>
          </div>
          <div className="w-px h-6 md:h-8 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              4.9/5
            </div>
            <div className="text-[10px] md:text-xs text-gray-500">
              Average Rating
            </div>
          </div>
          <div className="w-px h-6 md:h-8 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              50+
            </div>
            <div className="text-[10px] md:text-xs text-gray-500">
              Countries
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          src={lightboxImage}
          alt="Telegram chat screenshot"
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
}
