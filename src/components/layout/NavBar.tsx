"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Menu, X, User } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Materials", href: "/materials" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
];

// Mock auth hook - replace with your actual auth logic
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage, context, etc.)
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  return { isAuthenticated, user };
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/");
    window.location.reload();
  };

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

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link href="/portfolio">
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <User className="w-4 h-4" />
                      <span>Portfolio</span>
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1.5 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <button className="px-5 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Get Started
                  </button>
                </Link>
              )}
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

            {isAuthenticated ? (
              <div className="pt-2 space-y-2">
                <Link href="/portfolio" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Portfolio
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-5 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <button className="w-full px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}
