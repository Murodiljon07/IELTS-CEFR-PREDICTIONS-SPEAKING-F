"use client";

import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  Shield,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaLinkedin,
} from "react-icons/fa";
import { useState, useCallback, FormEvent, useEffect } from "react";
import Link from "next/link";

// Types
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}

interface ContactInfo {
  icon: React.ElementType;
  text: string;
  href?: string;
}

// Data
const quickLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Materials", href: "/materials" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQs", href: "/faqs" },
];

const categories: FooterLink[] = [
  { label: "Grammar", href: "/materials?category=grammar" },
  { label: "Vocabulary", href: "/materials?category=vocabulary" },
  { label: "Listening", href: "/materials?category=listening" },
  { label: "Reading", href: "/materials?category=reading" },
  { label: "Writing", href: "/materials?category=writing" },
  { label: "Speaking", href: "/materials?category=speaking" },
];

const socialLinks: SocialLink[] = [
  {
    icon: FaFacebook,
    href: "https://facebook.com/goodtesting",
    label: "Facebook",
    color: "hover:bg-[#1877f2]",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/goodtesting",
    label: "Instagram",
    color: "hover:bg-[#e4405f]",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com/@goodtesting",
    label: "YouTube",
    color: "hover:bg-[#ff0000]",
  },
  {
    icon: FaTelegram,
    href: "https://t.me/goodtesting",
    label: "Telegram",
    color: "hover:bg-[#0088cc]",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/company/goodtesting",
    label: "LinkedIn",
    color: "hover:bg-[#0077b5]",
  },
];

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    text: "info@goodtesting.uz",
    href: "mailto:info@goodtesting.uz",
  },
  { icon: Phone, text: "+998 90 123 45 67", href: "tel:+998901234567" },
  { icon: MapPin, text: "Tashkent, Uzbekistan" },
  { icon: Clock, text: "Mon-Fri: 9:00 - 18:00" },
];

const paymentMethods = [
  { name: "Visa", icon: "💳", bg: "bg-blue-500/10" },
  { name: "Mastercard", icon: "💳", bg: "bg-red-500/10" },
  { name: "Payme", icon: "⚡", bg: "bg-yellow-500/10" },
  { name: "Click", icon: "🖱️", bg: "bg-green-500/10" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  // Handle scroll visibility for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Email validation
      const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        setSubscribeStatus("error");
        setTimeout(() => setSubscribeStatus("idle"), 3000);
        return;
      }

      setIsSubmitting(true);
      setSubscribeStatus("idle");

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Subscribed:", email);
        setSubscribeStatus("success");
        setEmail("");

        setTimeout(() => setSubscribeStatus("idle"), 3000);
      } catch (error) {
        console.error("Subscription error:", error);
        setSubscribeStatus("error");
        setTimeout(() => setSubscribeStatus("idle"), 3000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email],
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer
      className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8 mt-auto"
      aria-label="Footer"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-600/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1 - Brand & About */}
          <div className="space-y-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-105">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight">
                  Good<span className="text-red-500">Testing</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Official Test Center
                </span>
              </div>
            </Link>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Master English with our comprehensive learning platform designed
              for IELTS success. Trusted by 10,000+ students worldwide.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-red-500" />
                <span className="text-xs text-gray-400">IELTS Official</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-400">Secure Payment</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center 
                      transition-all duration-300 hover:scale-110 hover:shadow-lg
                      ${social.color}
                    `}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-500 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <ChevronRight className="w-3 h-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-500 rounded-full" />
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <ChevronRight className="w-3 h-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{category.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-500 rounded-full" />
              Contact & Newsletter
            </h3>

            {/* Contact Info */}
            <ul className="space-y-3 mb-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index}>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group text-sm"
                      >
                        <Icon className="w-4 h-4 mt-0.5 text-red-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                        <span className="break-all">{info.text}</span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 text-gray-400 text-sm">
                        <Icon className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
                        <span>{info.text}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Newsletter Form */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 pr-12 bg-white/10 border border-white/20 rounded-xl 
                    text-white placeholder:text-gray-400 text-sm
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                    transition-all disabled:opacity-50"
                  aria-label="Email for newsletter"
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-red-600 rounded-lg 
                    hover:bg-red-700 transition-all disabled:opacity-50 disabled:hover:bg-red-600"
                  aria-label="Subscribe"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </form>

              {subscribeStatus === "success" && (
                <p className="text-xs text-green-400 animate-in fade-in">
                  ✓ Subscribed successfully!
                </p>
              )}
              {subscribeStatus === "error" && (
                <p className="text-xs text-red-400 animate-in fade-in">
                  ✗ Please enter a valid email address.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Methods & Badges */}
        <div className="flex flex-wrap justify-between items-center gap-4 py-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-gray-400">Secure payments with:</span>
            <div className="flex flex-wrap items-center gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className={`flex items-center gap-1 px-2 py-1 ${method.bg} rounded-lg text-gray-300 text-sm backdrop-blur-sm`}
                >
                  <span className="text-base">{method.icon}</span>
                  <span className="text-xs font-medium">{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-400">
              Trusted by 10,000+ students
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            &copy; {currentYear} GoodTesting. All rights reserved.
            <Link
              href="/privacy"
              className="hover:text-white transition-colors ml-1"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </p>

          {/* Official Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
              IELTS Official Test Center
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-red-600 rounded-full 
            flex items-center justify-center shadow-lg hover:bg-red-700 
            transition-all duration-300 hover:scale-110 z-50
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowRight className="w-4 h-4 text-white -rotate-90" />
        </button>
      )}
    </footer>
  );
}
