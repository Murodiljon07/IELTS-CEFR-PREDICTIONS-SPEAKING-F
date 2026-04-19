"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Material {
  id: number;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  originalPrice?: number;
  type: "course" | "material";
  status: "active" | "inactive";
  createdAt: string;
  downloads: number;
  rating: number;
}

const mockMaterials: Material[] = [
  {
    id: 1,
    title: "IELTS Vocabulary Builder",
    category: "Vocabulary",
    level: "Intermediate",
    price: 29.99,
    type: "material",
    status: "active",
    createdAt: "2024-01-10",
    downloads: 2340,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Grammar Fundamentals",
    category: "Grammar",
    level: "Beginner",
    price: 0,
    type: "material",
    status: "active",
    createdAt: "2024-01-08",
    downloads: 3120,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Complete IELTS Course",
    category: "IELTS",
    level: "Intermediate",
    price: 299,
    originalPrice: 499,
    type: "course",
    status: "active",
    createdAt: "2024-01-05",
    downloads: 12500,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Advanced Reading",
    category: "Reading",
    level: "Advanced",
    price: 34.99,
    type: "material",
    status: "inactive",
    createdAt: "2024-01-03",
    downloads: 1890,
    rating: 4.7,
  },
];

const categories = [
  "All",
  "IELTS",
  "Grammar",
  "Vocabulary",
  "Reading",
  "Listening",
  "Writing",
  "Speaking",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function AdminMaterials() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || m.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleDelete = (id: number) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    setShowDeleteModal(null);
  };

  const handleToggleStatus = (id: number) => {
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m,
      ),
    );
  };

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Materials</h1>
          <p className="text-gray-500 mt-1">
            Create, edit, and manage learning materials
          </p>
        </div>
        <Link href="/admin/materials/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <Plus className="w-4 h-4" />
            Add New Material
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {levels.map((lvl) => (
              <option key={lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Title
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Level
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Downloads
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMaterials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm text-gray-600">#{material.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {material.title}
                      </p>
                      <p className="text-xs text-gray-500">{material.type}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {material.category}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${levelColors[material.level]}`}
                    >
                      {material.level}
                    </span>
                  </td>
                  <td className="p-4">
                    {material.price === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <div>
                        <span className="font-medium text-gray-900">
                          ${material.price}
                        </span>
                        {material.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-1">
                            ${material.originalPrice}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(material.id)}
                      className={`text-xs px-2 py-1 rounded-full ${
                        material.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {material.status}
                    </button>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {material.downloads.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/materials/${material.id}`}>
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/admin/materials/${material.id}/edit`}>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => setShowDeleteModal(material.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Delete Material
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this material? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
