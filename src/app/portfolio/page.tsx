"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Calendar,
  Phone,
  LogOut,
  Settings,
  BookOpen,
  ShoppingCart,
  Award,
  Video,
  Headphones,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

import userService from "@/api/services/user.service";

const typeIcons = {
  ebook: BookOpen,
  video: Video,
  audio: Headphones,
};

export default function PortfolioPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("materials");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/auth/login");
          return;
        }

        const profileData = await userService.getUserProfile(token);

        if (profileData.statusCode === 401) {
          router.push("/auth/login");
          return;
        }

        setUser(profileData.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

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

  if (!user) {
    return null;
  }

  if (user.role !== "user") {
    localStorage.clear();
    router.push("/auth/login");
    return null;
  }

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
                src={`https://ui-avatars.com/api/?name=${user.fullName}&background=ffffff&color=dc2626&size=200`}
                alt={user.fullName}
                className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg"
              />

              <div>
                <p className="text-red-100 text-sm mb-2">Welcome back 👋</p>

                <h1 className="text-4xl font-bold text-white">
                  {user.fullName}
                </h1>

                <div className="flex items-center gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                    {user.role}
                  </span>

                  <span className="text-red-100 text-sm">
                    Premium Dashboard
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white text-red-600 hover:bg-red-50 transition px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {/* Materials */}
          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Purchased Materials
                </p>

                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {user.buyedMaterials?.length || 0}
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

          {/* Cart */}
          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">My Cart</p>

                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {user.card?.length || 0}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition">
                <ShoppingCart className="w-7 h-7 text-blue-600" />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-blue-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              Ready to checkout
            </div>
          </div>

          {/* Role */}
          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Account Role
                </p>

                <h2 className="text-2xl font-bold capitalize text-gray-900 mt-3">
                  {user.role}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center group-hover:scale-110 transition">
                <Award className="w-7 h-7 text-yellow-600" />
              </div>
            </div>

            <div className="mt-6 text-yellow-600 text-sm font-medium">
              Verified account
            </div>
          </div>

          {/* Phone */}
          <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Phone Number
                </p>

                <h2 className="text-lg font-bold text-gray-900 mt-3">
                  {user.phone}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition">
                <Phone className="w-7 h-7 text-green-600" />
              </div>
            </div>

            <div className="mt-6 text-green-600 text-sm font-medium">
              Contact verified
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="space-y-6">
            {/* PROFILE CARD */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-red-600 to-red-500" />

              <div className="px-6 pb-6 relative">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.fullName}&background=ffffff&color=dc2626&size=200`}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg -mt-12"
                />

                <h2 className="text-2xl font-bold mt-4 text-gray-900">
                  {user.fullName}
                </h2>

                <p className="text-gray-500 capitalize">{user.role}</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-red-600" />
                    <span>{user.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span>{user.phone}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span>ID: {user._id.slice(0, 10)}...</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 transition rounded-2xl py-3 font-semibold flex items-center justify-center gap-2">
                    <Settings className="w-5 h-5" />
                    Edit Profile
                  </button>

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
            {/* TAB */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setActiveTab("materials")}
                className={`px-5 py-3 rounded-2xl font-semibold transition ${
                  activeTab === "materials"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                My Materials
              </button>
            </div>

            {/* MATERIALS */}
            {activeTab === "materials" && (
              <div className="space-y-5">
                {user.buyedMaterials?.length > 0 ? (
                  user.buyedMaterials.map((material: any, index: number) => {
                    const Icon =
                      typeIcons[material.type as keyof typeof typeIcons] ||
                      BookOpen;

                    return (
                      <div
                        key={index}
                        className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                          <div className="flex gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                              <Icon className="w-8 h-8 text-red-600" />
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {material.title || "Untitled Material"}
                              </h3>

                              <p className="text-gray-500 mt-1">
                                {material.category || "IELTS"}
                              </p>

                              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium">
                                <TrendingUp className="w-4 h-4" />
                                Purchased
                              </div>
                            </div>
                          </div>

                          <Link href={`/materials/${material._id}`}>
                            <button className="group bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg">
                              Open Material
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                            </button>
                          </Link>
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
          </div>
        </div>
      </div>
    </div>
  );
}
