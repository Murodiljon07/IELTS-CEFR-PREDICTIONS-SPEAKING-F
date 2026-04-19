"use client";

import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-primary" style={{ fontWeight: 700 }}>
              Virtual Kitob
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-foreground hover:text-secondary transition-colors"
            >
              Home
            </a>
            <a
              href="#materials"
              className="text-foreground hover:text-secondary transition-colors"
            >
              Materials
            </a>
            <a
              href="#courses"
              className="text-foreground hover:text-secondary transition-colors"
            >
              Courses
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-secondary transition-colors"
            >
              About
            </a>
            <button className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a
              href="#home"
              className="block text-foreground hover:text-secondary transition-colors"
            >
              Home
            </a>
            <a
              href="#materials"
              className="block text-foreground hover:text-secondary transition-colors"
            >
              Materials
            </a>
            <a
              href="#courses"
              className="block text-foreground hover:text-secondary transition-colors"
            >
              Courses
            </a>
            <a
              href="#about"
              className="block text-foreground hover:text-secondary transition-colors"
            >
              About
            </a>
            <button className="w-full px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
