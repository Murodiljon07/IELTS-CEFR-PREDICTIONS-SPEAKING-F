"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Star,
  TrendingUp,
  User,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  Settings,
  LogOut,
  Video,
  Headphones,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

import userService from "@/api/services/user.service";

const levelColors = {
  Beginner: "bg-blue-100 text-blue-700",
  Intermediate: "bg-green-100 text-green-700",
  Advanced: "bg-purple-100 text-purple-700",
};

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

        setUser(profileData.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <User className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              My Portfolio
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back,
            <span className="text-red-600 ml-2">{user.fullName}</span>
          </h1>

          <p className="text-gray-600 mt-2">Track your learning progress</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Purchased Materials</span>

              <BookOpen className="w-5 h-5 text-red-600" />
            </div>

            <h2 className="text-2xl font-bold">
              {user.buyedMaterials?.length || 0}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">My Codes</span>

              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold">{user.myCodes?.length || 0}</h2>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Role</span>

              <Award className="w-5 h-5 text-yellow-600" />
            </div>

            <h2 className="text-2xl font-bold capitalize">{user.role}</h2>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Phone</span>

              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>

            <h2 className="text-lg font-bold">+{user.phone}</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="bg-red-600 p-6 text-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.fullName}`}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full mx-auto mb-3"
                />

                <h3 className="text-xl font-bold text-white">
                  {user.fullName}
                </h3>

                <p className="text-red-100">{user.role}</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>ID: {user._id}</span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <div className="flex gap-4 border-b mb-6">
              <button
                onClick={() => setActiveTab("materials")}
                className={`pb-2 ${
                  activeTab === "materials"
                    ? "border-b-2 border-red-600 text-red-600"
                    : ""
                }`}
              >
                My Materials
              </button>
            </div>

            {/* Materials */}
            {activeTab === "materials" && (
              <div className="space-y-4">
                {user.buyedMaterials?.length > 0 ? (
                  user.buyedMaterials.map((material: any, index: number) => {
                    const Icon =
                      typeIcons[material.type as keyof typeof typeIcons] ||
                      BookOpen;

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-5 shadow-sm"
                      >
                        <div className="flex justify-between">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-red-600" />
                            </div>

                            <div>
                              <h3 className="font-bold">
                                {material.title || "Untitled"}
                              </h3>

                              <p className="text-sm text-gray-500">
                                {material.category || "IELTS"}
                              </p>
                            </div>
                          </div>

                          <Link href={`/materials/${material._id}`}>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
                              Open
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-xl p-10 text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />

                    <h3 className="text-lg font-semibold text-gray-700">
                      No materials purchased yet
                    </h3>
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
