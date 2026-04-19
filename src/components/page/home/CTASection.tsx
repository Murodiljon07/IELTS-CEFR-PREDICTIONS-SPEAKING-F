"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-red-400" />
          <span className="text-sm font-semibold text-red-400">
            Limited Time Offer
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Start Your <span className="text-red-500">Journey?</span>
        </h2>

        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of successful students who achieved their English goals
          with GoodTesting
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/courses">
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center gap-2">
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all">
              Get Started Free
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
