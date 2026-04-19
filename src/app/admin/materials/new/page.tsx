"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload } from "lucide-react";

export default function AddMaterialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "IELTS",
    level: "Intermediate",
    type: "course",
    price: "",
    originalPrice: "",
    isFree: false,
    duration: "",
    lectures: "",
    instructor: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here
    console.log("Saving material:", formData);
    alert("Material saved successfully!");
    router.push("/admin/materials");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Material</h1>
          <p className="text-gray-500 mt-1">
            Create a new learning material or course
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>IELTS</option>
              <option>Grammar</option>
              <option>Vocabulary</option>
              <option>Reading</option>
              <option>Listening</option>
              <option>Writing</option>
              <option>Speaking</option>
              <option>Business</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="course">Course</option>
              <option value="material">Material</option>
            </select>
          </div>

          {/* Free Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Free Material
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, isFree: true, price: "0" })
                }
                className={`px-4 py-2 rounded-lg border ${formData.isFree ? "bg-green-500 text-white border-green-500" : "border-gray-200"}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, isFree: false, price: "" })
                }
                className={`px-4 py-2 rounded-lg border ${!formData.isFree ? "bg-red-500 text-white border-red-500" : "border-gray-200"}`}
              >
                No
              </button>
            </div>
          </div>

          {/* Price */}
          {!formData.isFree && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required={!formData.isFree}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </>
          )}

          {/* Duration & Lectures (for courses) */}
          {formData.type === "course" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 12 weeks"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lectures
                </label>
                <input
                  type="number"
                  placeholder="Number of lectures"
                  value={formData.lectures}
                  onChange={(e) =>
                    setFormData({ ...formData, lectures: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </>
          )}

          {/* File Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material File
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                Click or drag file to upload
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, EPUB, MP4, MP3 (Max 500MB)
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Material
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
