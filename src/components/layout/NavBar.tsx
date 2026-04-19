"use client";

import { BookOpen, Menu, X, ShoppingCart, User, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

// Types
interface NavLink {
  href: string;
  label: string;
}

// Constants
const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/materials", label: "Materials" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
];

// Official Test Center badge
const OFFICIAL_BADGE = {
  text: "Official Test Center",
  color: "black",
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("/");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Handle link click
  const handleLinkClick = useCallback((href: string) => {
    setActiveLink(href);
    setIsMenuOpen(false);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, href: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleLinkClick(href);
      }
    },
    [handleLinkClick],
  );

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-white/98 backdrop-blur-md shadow-xl"
              : "bg-white shadow-md"
          }
          border-b-2
          ${isScrolled ? "border-gray-100" : "border-red-600/20"}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section - Dark Blue & IELTS Red theme */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
              onClick={() => handleLinkClick("/")}
              onKeyDown={(e) => handleKeyDown(e, "/")}
              aria-label="Go to homepage"
            >
              {/* IELTS Red accent box */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-105 group-hover:shadow-red-200">
                  <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                {/* Small IELTS badge */}
                <div className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">IELTS</span>
                </div>
              </div>

              {/* Text Logo with official colors */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-xl md:text-2xl font-extrabold tracking-tight"
                    style={{ color: "#0A1628" }}
                  >
                    Good
                  </span>
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight text-red-600">
                    Testing
                  </span>
                </div>
                {/* Official Test Center Badge - Black */}
                <div className="flex items-center gap-1 mt-0.5">
                  <Award className="w-3 h-3 text-black" />
                  <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-black">
                    Official Test Center
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 lg:gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-3 py-2 text-sm lg:text-base font-semibold
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg
                    ${
                      activeLink === link.href
                        ? "text-red-600"
                        : "text-gray-700 hover:text-red-600"
                    }
                  `}
                  onClick={() => handleLinkClick(link.href)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  aria-current={activeLink === link.href ? "page" : undefined}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                  )}
                </Link>
              ))}

              <div className="flex items-center gap-2 ml-4">
                <button
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="sr-only">Cart</span>
                </button>

                <button
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
                  aria-label="User account"
                >
                  <User className="w-5 h-5" />
                  <span className="sr-only">Account</span>
                </button>

                <button
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg 
                    hover:shadow-lg hover:shadow-red-200 hover:scale-105 transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    text-sm lg:text-base font-semibold"
                  aria-label="Get started"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            id="mobile-menu"
            className={`
              md:hidden fixed inset-x-0 top-16 bg-white shadow-xl
              transition-all duration-300 ease-in-out
              ${
                isMenuOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-4 invisible"
              }
            `}
            style={{
              height: isMenuOpen ? "auto" : "0",
              maxHeight: "calc(100vh - 64px)",
              overflowY: "auto",
            }}
            aria-hidden={!isMenuOpen}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Official Badge */}
              <div className="flex items-center justify-center gap-2 pb-4 border-b border-gray-200">
                <Award className="w-4 h-4 text-black" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  Official Test Center
                </span>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    block px-4 py-3 text-base font-semibold rounded-lg
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-red-500
                    ${
                      activeLink === link.href
                        ? "bg-red-50 text-red-600 border-l-4 border-red-600"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                    }
                  `}
                  onClick={() => handleLinkClick(link.href)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  aria-current={activeLink === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 space-y-3 border-t border-gray-200">
                <button
                  className="w-full px-4 py-3 flex items-center justify-center gap-3 text-gray-700 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Cart</span>
                </button>

                <button
                  className="w-full px-4 py-3 flex items-center justify-center gap-3 text-gray-700 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
                  aria-label="User account"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account</span>
                </button>

                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg 
                    hover:shadow-lg transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    font-semibold"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}
