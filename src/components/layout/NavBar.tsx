"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Menu, X, User, Award, ShoppingCart } from "lucide-react";

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
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      // setUser(JSON.parse(userData));
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
    localStorage.removeItem("token");
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
              <div className="flex flex-col">
                <span className="font-bold text-xl ">
                  Good<span className="text-red-600">Testing</span>
                </span>
                <span className="text-[13px] font-bold flex gap-0">
                  Muhammadumarkhon <Award className="text-red-500 size-4" />
                </span>
              </div>
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
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  {/* Cart */}
                  <Link href="/portfolio/cart">
                    <button className="relative flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all">
                      <ShoppingCart className="w-5 h-5 text-gray-700" />

                      {/* Badge */}
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold">
                        {JSON.parse(localStorage.getItem("cart") || "[]")
                          ?.length || 0}
                      </span>
                    </button>
                  </Link>

                  {/* Portfolio */}
                  <Link href="/portfolio">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-sm">
                      <User className="w-4 h-4" />
                      <span>Portfolio</span>
                    </button>
                  </Link>
                </div>
              ) : (
                <Link href="/auth/login">
                  <button className="px-5 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Get Started
                  </button>
                </Link>
              )}

              {/* Mobile button */}
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
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

            {isAuthenticated && (
              <div className="flex items-center gap-3">
                {/* Portfolio */}
                <Link href="/portfolio">
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-sm">
                    <User className="w-4 h-4" />
                    <span>Portfolio</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}
