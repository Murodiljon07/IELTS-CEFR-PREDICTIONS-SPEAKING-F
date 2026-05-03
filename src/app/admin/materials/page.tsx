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

import { useEffect } from "react";
import { Material } from "@/types/Material.type";
import { materialService } from "@/api/services/materials.service";

// Categories - Material type dagi category larga mos
const categories = [
  "All",
  "IELTS",
  "grammar",
  "vocabulary",
  "reading",
  "listening",
  "writing",
  "speaking",
];

const levels = ["All", "beginner", "intermediate", "advanced"];

// Level colors - type dagi qiymatlarga mos
const levelColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-red-100 text-red-700",
};

// Category ni formatlash
const formatCategory = (category: string) => {
  const map: Record<string, string> = {
    ielts: "IELTS",
    grammar: "Grammar",
    vocabulary: "Vocabulary",
    reading: "Reading",
    listening: "Listening",
    writing: "Writing",
    speaking: "Speaking",
  };
  return map[category.toLowerCase()] || category;
};

const token = localStorage.getItem("token");
export default function AdminMaterials() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null); // _id uchun string
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllMaterials() {
      try {
        setIsLoading(true);
        let data = await materialService.getAllMaterials();
        // Backenddan kelgan ma'lumotlar strukturasi tekshirish
        setMaterials(data.materials || data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getAllMaterials();
  }, []);

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || m.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleDelete = async (id: string) => {
    try {
      // Agar backendda delete API bo'lsa
      await materialService.deleteMaterial(token, id);

      // Frontenddan o'chirish
      setMaterials((prev) =>
        prev.filter((m) => (m as any)._id !== id && (m as any).id !== id),
      );
      setShowDeleteModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Material ID ni olish (MongoDB _id yoki oddiy id)
  const getMaterialId = (material: Material): string => {
    return (material as any)._id;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

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
                  #
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Name
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
                  Rating
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Created At
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMaterials.map((material, index) => (
                <tr
                  key={getMaterialId(material)}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {material.name}
                      </p>
                      {material.file && (
                        <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                          {material.file}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {formatCategory(material.category)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${levelColors[material.level]}`}
                    >
                      {material.level.charAt(0).toUpperCase() +
                        material.level.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    {Number(material.salary) === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium text-gray-900">
                        ${Number(material.salary).toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Number(material.rate).toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {material.createdAt
                      ? new Date(material.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/materials/${getMaterialId(material)}`}
                      >
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link
                        href={`/admin/materials/${getMaterialId(material)}/edit`}
                      >
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          setShowDeleteModal(getMaterialId(material))
                        }
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

        {/* Empty state */}
        {filteredMaterials.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No materials found</p>
          </div>
        )}
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
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
