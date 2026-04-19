"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Key,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Materials", href: "/admin/materials", icon: BookOpen },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Generate Codes", href: "/admin/codes", icon: Key },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">
              Admin<span className="text-red-600">Panel</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">GoodTesting Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
