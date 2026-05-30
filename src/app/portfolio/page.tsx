"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/api/api";

import {
  User,
  Mail,
  Calendar,
  Phone,
  LogOut,
  BookOpen,
  ShoppingCart,
  Award,
  Video,
  Headphones,
  ArrowRight,
  TrendingUp,
  Eye,
  BaggageClaim,
} from "lucide-react";

import userService from "@/api/services/user.service";

interface Material {
  _id: string;
  name: string;
  category: string;
  level: string;
  price: number;
  file?: {
    fileName?: string;
    contentType?: string;
  };
}

interface Order {
  _id: string;
  status: string;
  totalPrice: number;
  date: string;
  materials: Material[];
}

interface PortfolioData {
  profile: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    isPremiumUser: boolean;
    createdAt: string;
  };
  stats: {
    totalOrders: number;
    completedOrders: number;
    totalMaterials: number;
    totalSpent: number;
  };
  orders: Order[];
  materials: Material[];
}

export default function PortfolioPage() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const [activeTab, setActiveTab] = useState("materials");
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/auth/login");
          return;
        }

        const portfolioData = await userService.getUserPortfolio(token);

        setPortfolio(portfolioData);
      } catch (error: any) {
        console.error("Error fetching portfolio:", error);
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
        }
        toast.error("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPortfolio();
  }, [router]);

  // ✅ Materialni brauzerda ochish (juda sodda)
  const handleOpenMaterial = async (materialId: string) => {
    setOpening(true);
    if (!materialId) return;

    try {
      setOpening(true);

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await api.get(`/materials/${materialId}/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Faylni blob sifatida olish
      });

      window.open(URL.createObjectURL(response.data), "_blank");
    } catch (err) {
      console.error(err);
    } finally {
      setOpening(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  const { profile, stats, orders, materials } = portfolio;

  if (profile.role !== "user") {
    localStorage.clear();
    router.push("/auth/login");
    return null;
  }

  // Fayl turiga qarab icon
  const getFileIcon = (file?: any) => {
    const fileName = file?.fileName;

    if (!fileName) return BookOpen;

    const ext = fileName.split(".").pop()?.toLowerCase();

    if (ext === "pdf") return BookOpen;
    if (ext === "mp4") return Video;
    if (ext === "mp3") return Headphones;

    return BookOpen;
  };

  const getPremium = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.email) {
      toast.error("User information not found. Please log in again.");
      router.push("/auth/login");
      return;
    }

    const message = `Hello I'm ${user.fullName}
    Email: ${user.email} and I want to upgrade to premium.  
    Thank you! 🙃`;

    const telegramUrl = `https://t.me/umarkhan_band8_admin2?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-8 mb-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={`https://ui-avatars.com/api/?name=${profile.fullName}&background=ffffff&color=dc2626&size=200`}
                alt={profile.fullName}
                className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg"
              />

              <div>
                <p className="text-red-100 text-sm mb-2">Welcome back 👋</p>
                <h1 className="text-4xl font-bold text-white">
                  {profile.fullName}
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                    {profile.role}
                  </span>
                  <span className="text-red-100 text-sm">
                    {profile.isPremiumUser ? "Premium" : "Standard"} Dashboard
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={getPremium}
              className="bg-white text-red-600 hover:bg-red-50 transition px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg"
            >
              <BaggageClaim className="w-5 h-5" />
              Get Premium
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Purchased Materials
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {stats.totalMaterials}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:scale-110 transition">
                <BookOpen className="w-7 h-7 text-red-600" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              Learning active
            </div>
          </div>

          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Orders
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {stats.totalOrders}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition">
                <ShoppingCart className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-blue-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              {stats.completedOrders} completed
            </div>
          </div>

          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Completed Orders
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-3">
                  {stats.completedOrders}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center group-hover:scale-110 transition">
                <Award className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
            <div className="mt-6 text-yellow-600 text-sm font-medium">
              Verified purchases
            </div>
          </div>

          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Spent</p>
                <h2 className="text-lg font-bold text-gray-900 mt-3">
                  {stats.totalSpent.toLocaleString()} UZS
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition">
                <Phone className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <div className="mt-6 text-green-600 text-sm font-medium">
              Lifetime value
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-red-600 to-red-500" />
              <div className="px-6 pb-6 relative">
                <img
                  src={`https://ui-avatars.com/api/?name=${profile.fullName}&background=ffffff&color=dc2626&size=200`}
                  alt={profile.fullName}
                  className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg -mt-12"
                />
                <h2 className="text-2xl font-bold mt-4 text-gray-900">
                  {profile.fullName}
                </h2>
                <p className="text-gray-500 capitalize">{profile.role}</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-red-600" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span>
                      Joined: {new Date(profile.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 transition rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2">
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setActiveTab("materials")}
                className={`px-5 py-3 rounded-2xl font-semibold transition ${
                  activeTab === "materials"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                My Materials ({materials.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-5 py-3 rounded-2xl font-semibold transition ${
                  activeTab === "orders"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                My Orders ({orders.length})
              </button>
            </div>

            {/* MATERIALS */}
            {activeTab === "materials" && (
              <div className="space-y-5">
                {materials.length > 0 ? (
                  materials.map((material: Material) => {
                    const Icon = getFileIcon(material.file);

                    return (
                      <div
                        key={material._id}
                        className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                          <div className="flex gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                              <Icon className="w-8 h-8 text-red-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {material.name}
                              </h3>
                              <p className="text-gray-500 mt-1">
                                {material.category} • {material.level}
                              </p>
                              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium">
                                <TrendingUp className="w-4 h-4" />
                                Purchased
                              </div>
                            </div>
                          </div>

                          {/* ✅ Oddiy Open tugmasi */}
                          <button
                            onClick={() => handleOpenMaterial(material._id)}
                            className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg"
                          >
                            {opening ? (
                              "Opening..."
                            ) : (
                              <>
                                <Eye className="w-5 h-5" />
                                Open material
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      No Materials Yet
                    </h3>
                    <p className="text-gray-500 mt-3 max-w-md mx-auto">
                      You haven't purchased any materials yet. Start learning by
                      exploring our premium IELTS resources.
                    </p>
                    <Link href="/materials">
                      <button className="mt-8 bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
                        Browse Materials
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  My Orders
                </h3>
                {orders.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 flex flex-col-reverse">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">
                              {order.materials && order.materials.length > 0
                                ? order.materials
                                    .map((m: Material) => m.name)
                                    .join(", ")
                                : "No materials"}
                            </h4>
                            <p className="text-gray-500 mt-1">
                              Total: {order.totalPrice?.toLocaleString()} UZS
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Order ID: {order._id.slice(0, 12)}...
                            </p>
                            <p className="text-xs text-gray-400">
                              Date: {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`text-sm font-medium px-3 py-1 rounded-full self-start ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : order.status === "cancelled"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {order.status === "completed"
                              ? "✅ Completed"
                              : order.status === "cancelled"
                                ? "❌ Cancelled"
                                : "⏳ Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      You haven't placed any orders yet.
                    </p>
                    <Link href="/materials">
                      <button className="mt-4 text-red-600 hover:text-red-700 font-medium">
                        Start Shopping →
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
