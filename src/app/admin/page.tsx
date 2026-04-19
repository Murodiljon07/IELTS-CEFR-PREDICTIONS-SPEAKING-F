"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  BookOpen,
  Key,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalMaterials: number;
  totalUsers: number;
  activatedCodes: number;
  pendingOrders: number;
  monthlyRevenue: number;
  growth: number;
}

interface RecentOrder {
  id: string;
  user: string;
  amount: number;
  status: "pending" | "completed";
  date: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 12450,
    totalOrders: 156,
    totalMaterials: 24,
    totalUsers: 2340,
    activatedCodes: 89,
    pendingOrders: 12,
    monthlyRevenue: 3450,
    growth: 15,
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    {
      id: "ORD-001",
      user: "john@example.com",
      amount: 299,
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      user: "sarah@example.com",
      amount: 149,
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      user: "mike@example.com",
      amount: 89,
      status: "completed",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      user: "emma@example.com",
      amount: 299,
      status: "pending",
      date: "2024-01-13",
    },
    {
      id: "ORD-005",
      user: "david@example.com",
      amount: 49,
      status: "completed",
      date: "2024-01-13",
    },
  ]);

  const statsCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: "bg-green-500",
      change: "+12%",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-500",
      change: "+8%",
    },
    {
      title: "Total Materials",
      value: stats.totalMaterials,
      icon: BookOpen,
      color: "bg-purple-500",
      change: "+3",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-orange-500",
      change: "+15%",
    },
    {
      title: "Activated Codes",
      value: stats.activatedCodes,
      icon: Key,
      color: "bg-red-500",
      change: "+23%",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      change: "-2",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-semibold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
            <select className="text-sm border rounded-lg px-2 py-1">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Chart Component Here</p>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Monthly Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                ${stats.monthlyRevenue}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Growth</p>
              <p className="text-xl font-bold text-green-600">
                +{stats.growth}%
              </p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <Link
              href="/admin/orders"
              className="text-sm text-red-600 hover:text-red-700"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.user}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${order.amount}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/materials/new">
            <button className="w-full p-4 bg-blue-50 rounded-xl text-blue-700 font-medium hover:bg-blue-100 transition">
              + Add Material
            </button>
          </Link>
          <Link href="/admin/codes">
            <button className="w-full p-4 bg-green-50 rounded-xl text-green-700 font-medium hover:bg-green-100 transition">
              Generate Codes
            </button>
          </Link>
          <Link href="/admin/orders">
            <button className="w-full p-4 bg-yellow-50 rounded-xl text-yellow-700 font-medium hover:bg-yellow-100 transition">
              View Orders
            </button>
          </Link>
          <Link href="/admin/settings">
            <button className="w-full p-4 bg-gray-50 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition">
              Settings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
