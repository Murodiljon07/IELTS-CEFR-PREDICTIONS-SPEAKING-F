"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, Loader2, Trash2 } from "lucide-react";
import { materialService } from "@/api/services/materials.service";

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
  price: number | "";
  oldPrice: number | "";
}

export default function AddMaterialPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isFree, setIsFree] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (!storedToken) router.push("/auth/login");
  }, [router]);

  const [formData, setFormData] = useState<MaterialFormData>({
    name: "",
    category: "IELTS",
    level: "beginner",
    rate: "",
    price: 0,
    oldPrice: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (!formData.name.trim()) {
      setError("Material nomini kiriting");
      return;
    }

    // ✅ Free material uchun file majburiy emas
    if (!isFree && !selectedFile) {
      setError("Material faylini yuklang (free bo'lmagan material uchun)");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name.trim());
      submitData.append("category", formData.category);
      submitData.append("level", formData.level);
      submitData.append("price", isFree ? "0" : formData.price.toString());

      if (formData.rate !== "" && formData.rate !== null) {
        submitData.append("rate", formData.rate.toString());
      }

      if (formData.oldPrice !== "" && formData.oldPrice !== null) {
        submitData.append("oldPrice", formData.oldPrice.toString());
      }

      if (selectedFile) {
        submitData.append("file", selectedFile);
      }

      for (let pair of submitData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await materialService.createMaterial(token, submitData);

      router.push("/admin/materials");
    } catch (err: any) {
      console.error("Create error:", err);
      console.error("Response:", err.response?.data);

      if (err.response?.status === 401) {
        setError("Sessiya tugagan. Qayta kiring.");
        localStorage.clear();
        router.push("/auth/login");
      } else if (err.response?.status === 403) {
        setError("Ruxsat yo'q. Admin huquqi talab etiladi.");
      } else {
        setError(err.response?.data?.message || "Xatolik yuz berdi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "file",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (type === "file" && file.size > 5 * 1024 * 1024) {
      setError("Fayl 5MB dan kichik bo'lishi kerak");
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Yangi material qo'shish
          </h1>
          <p className="text-gray-500 mt-1">Yangi o'quv materiali yarating</p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          disabled={isLoading}
        >
          <X className="w-4 h-4" />
          Bekor qilish
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
              Material nomi *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Masalan: IELTS Vocabulary Builder"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategoriya *
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
              <option value="IELTS">IELTS</option>
              <option value="grammar">Grammar</option>
              <option value="vocabulary">Vocabulary</option>
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
              <option value="writing">Writing</option>
              <option value="speaking">Speaking</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daraja *
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

          {/* Free Material Checkbox */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => {
                  setIsFree(e.target.checked);
                  if (e.target.checked) {
                    setFormData({ ...formData, price: 0 });
                  }
                }}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Bepul material
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Bepul materiallarni hamma ko'ra oladi va fayl yuklash shart emas
            </p>
          </div>

          {/* Price - faqat free bo'lmaganda */}
          {!isFree && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Narx (so'm) *
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number(e.target.value) || "",
                  })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required={!isFree}
                disabled={isLoading}
              />
            </div>
          )}

          {/* Old Price */}
          {!isFree && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eski narx (ixtiyoriy)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.oldPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oldPrice:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reyting (0–5, ixtiyoriy)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rate: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            />
          </div>

          {/* File Upload - free bo'lmaganda majburiy */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material fayli{" "}
              {!isFree && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-red-300 transition">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e, "file")}
                accept=".pdf,.epub,.mp4,.mp3,.docx,.txt,.jpg,.png,.html,.zip"
                disabled={isLoading}
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {selectedFile ? (
                    <span className="text-green-600 font-medium">
                      ✓ {selectedFile.name}
                    </span>
                  ) : (
                    "Faylni tanlang yoki bu yerga tashlang"
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  html, PDF, EPUB, MP4, MP3, DOCX, TXT, Rasmlar (max 5MB)
                </p>
              </label>
            </div>
            {selectedFile && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="text-green-600">
                  Fayl tanlandi: {selectedFile.name}
                </span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            {isFree && !selectedFile && (
              <p className="text-xs text-gray-400 mt-1">
                Bepul material uchun fayl yuklash shart emas
              </p>
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
                Saqlanmoqda...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Saqlash
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
}
