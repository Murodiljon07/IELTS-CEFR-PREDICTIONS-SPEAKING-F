"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, Loader2 } from "lucide-react";
import { materialService } from "@/api/services/materials.service";

// Material type ga mos keladigan interface
interface MaterialFormData {
  name: string;
  category:
    | "IELTS"
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "writing"
    | "speaking";
  level: "beginner" | "intermediate" | "advanced";
  rate: number | "";
  salary: number | "";
  file?: string;
  banner?: string;
}

export default function AddMaterialPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Token ni localStorage dan olish
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);

    // Agar token bo'lmasa, login page ga redirect qilish
    if (!storedToken) {
      router.push("/auth/login");
    }
  }, [router]);

  const [formData, setFormData] = useState<MaterialFormData>({
    name: "",
    category: "IELTS",
    level: "beginner",
    rate: 0.1,
    salary: 0,
    file: "",
    banner: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // FormData yaratish (file uchun)
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("category", formData.category);
      submitData.append("level", formData.level);
      submitData.append("rate", formData.rate.toString());
      submitData.append("salary", formData.salary.toString());

      if (selectedFile) {
        submitData.append("file", selectedFile);
      }

      if (selectedBanner) {
        submitData.append("banner", selectedBanner);
      }

      console.log(submitData);

      // API ga so'rov yuborish (token headersda ketadi)
      await materialService.createMaterial(token, submitData);

      alert("Material created successfully!");
      router.push("/admin/materials");
    } catch (err: any) {
      console.error("Error creating material:", err);

      // Error handling
      if (err.response?.status === 401) {
        setError("Unauthorized! Please login again.");
        localStorage.removeItem("token");
        router.push("/admin/login");
      } else if (err.response?.status === 403) {
        setError(
          "You don't have permission to create materials. Admin access required.",
        );
      } else {
        setError(err.response?.data?.message || "Failed to create material");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "file" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // File size validation
      if (type === "file" && file.size > 100 * 1024 * 1024) {
        setError("File size should be less than 100MB");
        return;
      }
      if (type === "banner" && file.size > 5 * 1024 * 1024) {
        setError("Banner image size should be less than 5MB");
        return;
      }

      if (type === "file") {
        setSelectedFile(file);
      } else {
        setSelectedBanner(file);
      }
    }
  };

  // Category ni formatlash (UI uchun)
  const categoryOptions = [
    { value: "IELTS", label: "IELTS" },
    { value: "grammar", label: "Grammar" },
    { value: "vocabulary", label: "Vocabulary" },
    { value: "reading", label: "Reading" },
    { value: "listening", label: "Listening" },
    { value: "writing", label: "Writing" },
    { value: "speaking", label: "Speaking" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Material</h1>
          <p className="text-gray-500 mt-1">Create a new learning material</p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 "
          disabled={isLoading}
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., IELTS Vocabulary Builder"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as any })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={isLoading}
            >
              {categoryOptions.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level *
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value as any })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={isLoading}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (0-5) *
            </label>

            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rate}
              onFocus={() => {
                if (formData.rate === 0) {
                  setFormData({
                    ...formData,
                    rate: "",
                  });
                }
              }}
              onBlur={() => {
                if (formData.rate === "") {
                  setFormData({
                    ...formData,
                    rate: 0,
                  });
                }
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rate: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Price / Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.salary}
              onFocus={() => {
                if (formData.salary === 0) {
                  setFormData({
                    ...formData,
                    salary: "",
                  });
                }
              }}
              onBlur={() => {
                if (formData.salary === "") {
                  setFormData({
                    ...formData,
                    salary: 0,
                  });
                }
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={isLoading}
            />

            <p className="text-xs text-gray-500 mt-1">
              Set to 0 for free material
            </p>
          </div>

          {/* File Upload - Material file */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material File
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-red-300 transition">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e, "file")}
                accept=".pdf,.epub,.mp4,.mp3,.docx"
                disabled={isLoading}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {selectedFile
                    ? selectedFile.name
                    : "Click or drag file to upload"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, EPUB, MP4, MP3, DOCX (Max 100MB)
                </p>
              </label>
            </div>
          </div>

          {/* Banner Upload - Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-red-300 transition">
              <input
                type="file"
                id="banner-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e, "banner")}
                accept="image/*"
                disabled={isLoading}
              />
              <label htmlFor="banner-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {selectedBanner
                    ? selectedBanner.name
                    : "Click or drag image to upload"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, WEBP (Max 5MB)
                </p>
              </label>
            </div>
            {selectedBanner && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(selectedBanner)}
                  alt="Preview"
                  className="h-20 w-auto rounded border"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Material
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
