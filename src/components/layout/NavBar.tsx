"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X, ShoppingCart } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Materials", href: "/materials" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                Good<span className="text-red-600">Testing</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition ${
                      isActive
                        ? "text-red-600 font-semibold"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-red-600 cursor-pointer" />
              </Link>
              <Link href="/auth/login">
                <button className="px-5 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block transition ${
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/cart"
              className="block text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
            <Link
              href="/auth/login"
              className="block text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link href="/auth/register" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-2 px-5 py-2 bg-red-600 text-white rounded-lg">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}
