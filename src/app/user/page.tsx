"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Download,
  Star,
  TrendingUp,
  User,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  Settings,
  LogOut,
  FileText,
  Video,
  Headphones,
  ExternalLink,
} from "lucide-react";

// Mock user data - this would come from your auth system
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar:
    "https://ui-avatars.com/api/?name=John+Doe&background=dc2626&color=fff",
  joinDate: "2024-01-15",
  totalHours: 47,
  completedMaterials: 12,
  certificates: 5,
  streak: 7,
};

// Mock user's purchased materials
const userMaterials = [
  {
    id: 1,
    title: "Advanced Grammar Guide",
    level: "Advanced",
    category: "Grammar",
    progress: 75,
    lastAccessed: "2024-01-20",
    rating: 4.8,
    type: "ebook",
  },
  {
    id: 2,
    title: "IELTS Speaking Preparation",
    level: "Intermediate",
    category: "Speaking",
    progress: 40,
    lastAccessed: "2024-01-19",
    rating: 4.9,
    type: "video",
  },
  {
    id: 3,
    title: "Business English Essentials",
    level: "Intermediate",
    category: "Business",
    progress: 100,
    lastAccessed: "2024-01-15",
    rating: 4.7,
    type: "ebook",
  },
];

// Mock certificates
const certificates = [
  {
    id: 1,
    name: "English Grammar Mastery",
    date: "2024-01-10",
    score: "92%",
  },
  {
    id: 2,
    name: "IELTS Writing Task 2",
    date: "2024-01-05",
    score: "88%",
  },
  {
    id: 3,
    name: "Business Communication",
    date: "2023-12-20",
    score: "95%",
  },
];

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
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("materials");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <User className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              My Portfolio
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Welcome back, <span className="text-red-600">{mockUser.name}</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Track your learning progress and achievements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Total Hours</span>
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {mockUser.totalHours}
            </div>
            <div className="text-xs text-gray-400 mt-1">Hours learned</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Completed</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {mockUser.completedMaterials}
            </div>
            <div className="text-xs text-gray-400 mt-1">Materials finished</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Certificates</span>
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {mockUser.certificates}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Earned certificates
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Day Streak</span>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {mockUser.streak}
            </div>
            <div className="text-xs text-gray-400 mt-1">Days in a row</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Member Since</span>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">
              {new Date(mockUser.joinDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-xs text-gray-400 mt-1">Active member</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm sticky top-24">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
                <div className="inline-block p-1 bg-white rounded-full mb-3">
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-24 h-24 rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {mockUser.name}
                </h3>
                <p className="text-red-100 text-sm mt-1">Premium Member</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Joined {new Date(mockUser.joinDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("materials")}
                className={`px-4 py-2 font-medium transition-all ${
                  activeTab === "materials"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                My Materials
              </button>
              <button
                onClick={() => setActiveTab("certificates")}
                className={`px-4 py-2 font-medium transition-all ${
                  activeTab === "certificates"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Certificates
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-4 py-2 font-medium transition-all ${
                  activeTab === "stats"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Statistics
              </button>
            </div>

            {/* My Materials Tab */}
            {activeTab === "materials" && (
              <div className="space-y-4">
                {userMaterials.map((material, index) => {
                  const Icon =
                    typeIcons[material.type as keyof typeof typeIcons] ||
                    BookOpen;
                  return (
                    <div
                      key={material.id}
                      className={`bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${levelColors[material.level as keyof typeof levelColors]}`}
                              >
                                {material.level}
                              </span>
                              <span className="text-xs text-gray-500">
                                {material.category}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-semibold">
                                  {material.rating}
                                </span>
                              </div>
                            </div>
                            <h3 className="font-bold text-gray-900">
                              {material.title}
                            </h3>
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{material.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-red-600 rounded-full h-2 transition-all duration-500"
                                  style={{ width: `${material.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            Last:{" "}
                            {new Date(
                              material.lastAccessed,
                            ).toLocaleDateString()}
                          </span>
                          <Link href={`/materials/${material.id}`}>
                            <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                              Continue
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    className={`bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all flex items-center justify-between flex-wrap gap-4 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{cert.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {new Date(cert.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Score: {cert.score}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium">
                      View Certificate
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === "stats" && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Learning Statistics
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Overall Progress
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        65%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-600 rounded-full h-3"
                        style={{ width: "65%" }}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">24</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Hours this month
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">8</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Materials in progress
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
