"use client";

import Link from "next/link";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  Shield,
  Send,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold">
                  Good<span className="text-red-500">Testing</span>
                </span>
                <p className="text-[10px] text-gray-400">
                  Official Test Center
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Master English with our comprehensive learning platform designed
              for IELTS success. Trusted by 10,000+ students worldwide.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/materials"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Materials
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/materials?category=grammar"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Grammar
                </Link>
              </li>
              <li>
                <Link
                  href="/materials?category=vocabulary"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link
                  href="/materials?category=listening"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Listening
                </Link>
              </li>
              <li>
                <Link
                  href="/materials?category=reading"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Reading
                </Link>
              </li>
              <li>
                <Link
                  href="/materials?category=writing"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/materials?category=speaking"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Speaking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-red-500" />
                <span>info@goodtesting.uz</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Tashkent, Uzbekistan</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-red-500" />
                <span>Mon-Fri: 9:00 - 18:00</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-sm text-gray-400 mb-3">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
              {isSubscribed && (
                <p className="text-xs text-green-500 mt-2">
                  ✓ Subscribed successfully!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} GoodTesting. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-gray-500 hover:text-red-500 transition"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="/terms"
                className="text-xs text-gray-500 hover:text-red-500 transition"
              >
                Terms of Service
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="/refund"
                className="text-xs text-gray-500 hover:text-red-500 transition"
              >
                Refund Policy
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] text-gray-500">
                  IELTS Official
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                <span className="text-[10px] text-gray-500">
                  Secure Payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
