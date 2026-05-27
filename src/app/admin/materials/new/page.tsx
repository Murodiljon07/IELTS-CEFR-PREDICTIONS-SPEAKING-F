"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, Loader2 } from "lucide-react";
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
  price: number | ""; // ✅ salary → price
  oldPrice: number | ""; // ✅ oldPrice qo'shildi
}

export default function AddMaterialPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
    price: "", // ✅
    oldPrice: "", // ✅
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // ✅ Majburiy fieldlarni tekshirish
    if (Number(formData.price) < 0) {
      setError("Narxni kiriting");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("category", formData.category);
      submitData.append("level", formData.level);

      if (formData.rate !== "") {
        submitData.append("rate", formData.rate.toString());
      }

      submitData.append("price", formData.price.toString()); // ✅ price

      if (formData.oldPrice !== "") {
        submitData.append("oldPrice", formData.oldPrice.toString()); // ✅ oldPrice
      }

      if (selectedFile) {
        submitData.append("file", selectedFile);
      }

      if (selectedBanner) {
        submitData.append("banner", selectedBanner);
      }

      await materialService.createMaterial(token, submitData);

      router.push("/admin/materials");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Sessiya tugagan. Qayta kiring.");
        localStorage.removeItem("token");
        router.push("/admin/login");
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
    type: "file" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (type === "file" && file.size > 100 * 1024 * 1024) {
      setError("Fayl 100MB dan kichik bo'lishi kerak");
      return;
    }
    if (type === "banner" && file.size > 5 * 1024 * 1024) {
      setError("Banner 5MB dan kichik bo'lishi kerak");
      return;
    }

    if (type === "file") {
      setSelectedFile(file);
    } else {
      setSelectedBanner(file);
      // ✅ Preview URL — avvalgisini tozalash
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

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
          {/* Nom */}
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

          {/* Kategoriya */}
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
              {categoryOptions.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Daraja */}
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

          {/* Narx */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Narx (so'm) *
            </label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onFocus={() => {
                if (formData.price === 0)
                  setFormData({ ...formData, price: "" });
              }}
              onBlur={() => {
                if (formData.price === "")
                  setFormData({ ...formData, price: 0 });
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">Bepul bo'lsa 0 qiling</p>
          </div>

          {/* Eski narx */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eski narx (ixtiyoriy)
            </label>
            <input
              type="number"
              min="0"
              value={formData.oldPrice}
              placeholder="Chegirma ko'rsatish uchun"
              onFocus={() => {
                if (formData.oldPrice === 0)
                  setFormData({ ...formData, oldPrice: "" });
              }}
              onBlur={() => {
                if (formData.oldPrice === "")
                  setFormData({ ...formData, oldPrice: "" });
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  oldPrice: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Chegirma ko'rsatish uchun eski narxni kiriting
            </p>
          </div>

          {/* Reyting */}
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
              placeholder="0.0"
              onFocus={() => {
                if (formData.rate === 0) setFormData({ ...formData, rate: "" });
              }}
              onBlur={() => {
                if (formData.rate === "")
                  setFormData({ ...formData, rate: "" });
              }}
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

          {/* Material fayli */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material fayli
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
                  PDF, EPUB, MP4, MP3, DOCX (max 100MB)
                </p>
              </label>
            </div>
          </div>

          {/* Banner */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner rasmi
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
              <label htmlFor="banner-upload" className="cursor-pointer block">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {selectedBanner ? (
                    <span className="text-green-600 font-medium">
                      ✓ {selectedBanner.name}
                    </span>
                  ) : (
                    "Rasmni tanlang yoki bu yerga tashlang"
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, WEBP (max 5MB)
                </p>
              </label>
            </div>

            {/* ✅ Banner preview */}
            {bannerPreview && (
              <div className="mt-3 relative inline-block">
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBanner(null);
                    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
                    setBannerPreview(null);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ✕
                </button>
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
