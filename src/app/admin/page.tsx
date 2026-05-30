"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

import dashboardService, {
  DashboardStats,
  RecentOrder,
} from "@/api/services/dashboard.service";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusIcons = {
  pending: Clock,
  completed: CheckCircle,
  cancelled: AlertCircle,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, ordersData] = await Promise.all([
          dashboardService.getStats(token),
          dashboardService.getRecentOrders(token),
        ]);

        setStats(statsData);
        setRecentOrders(ordersData);
      } catch (error: any) {
        console.error("Error fetching dashboard data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
        } else if (error.response?.status === 403) {
          toast.error("Admin access required");
          router.push("/");
        } else {
          toast.error("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "bg-green-500",
      change: `+${stats.growth}%`,
      changeUp: true,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-500",
      change: `+${Math.floor(stats.totalOrders * 0.08)}`,
      changeUp: true,
    },
    {
      title: "Total Materials",
      value: stats.totalMaterials,
      icon: BookOpen,
      color: "bg-purple-500",
      change: `+${Math.floor(stats.totalMaterials * 0.03)}`,
      changeUp: true,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-orange-500",
      change: `+${Math.floor(stats.totalUsers * 0.05)}%`,
      changeUp: true,
    },
    {
      title: "Activated Codes",
      value: stats.activatedCodes,
      icon: Key,
      color: "bg-red-500",
      change: `+${Math.floor(stats.activatedCodes * 0.1)}%`,
      changeUp: true,
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      change: `-${Math.floor(stats.pendingOrders * 0.1)}`,
      changeUp: false,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, Admin • Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {stat.changeUp ? (
                    <ArrowUp className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      stat.changeUp ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleString("default", { month: "long" })}
            </div>
          </div>

          {/* Simple stats display instead of chart */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.monthlyRevenue)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Growth</p>
                <p className="text-xl font-bold text-green-600">
                  +{stats.growth}%
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">
                  Total Revenue (All Time)
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Orders</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalOrders - stats.pendingOrders}
                </p>
              </div>
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

          {recentOrders.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {recentOrders.map((order) => {
                const StatusIcon = statusIcons[order.status];
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          #{order.id.slice(-8)}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.userName || order.user}
                      </p>
                      {order.materials && (
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">
                          {order.materials}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(order.amount)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent orders
            </div>
          )}
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
          <Link href="/admin/materials">
            <button className="w-full p-4 bg-purple-50 rounded-xl text-purple-700 font-medium hover:bg-purple-100 transition">
              Manage Materials
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
