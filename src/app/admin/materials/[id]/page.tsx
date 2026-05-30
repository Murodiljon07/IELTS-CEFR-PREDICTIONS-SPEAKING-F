"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Material } from "@/types/Material.type";
import { materialService } from "@/api/services/materials.service";
import api from "@/api/api";

import {
  Star,
  ArrowLeft,
  BookOpen,
  BadgeCheck,
  Loader2,
  Eye,
  ShoppingCart,
} from "lucide-react";

const levelColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-red-100 text-red-700",
};

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

export default function MaterialDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function fetchMaterial() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/auth/login");
          return;
        }

        const response = await materialService.getMaterialById(
          token,
          String(params.id),
        );

        let materialData = null;

        if (response?.data) {
          materialData = response.data;
        } else if (response) {
          materialData = response;
        }

        if (materialData) {
          setMaterial(materialData);

          // ✅ Access ni tekshirish:
          // 1. Agar material free bo'lsa -> true
          // 2. Agar materialda hasAccess fieldi bo'lsa -> o'sha qiymat
          // 3. Aks holda -> false
          const access =
            materialData.price === 0 || materialData.hasAccess === true;
          setHasAccess(access);
        } else {
          setError("Material not found");
        }
      } catch (error: any) {
        console.error("Error fetching material:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
        } else if (error.response?.status === 403) {
          setError(
            "You don't have access to this material. Please purchase it first.",
          );
        } else {
          setError(error.response?.data?.message || "Failed to load material");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMaterial();
  }, [params.id, router]);

  // ✅ Materialni ochish
  // ✅ Materialni brauzerda ochish (eng oddiy usul)
  const handleOpenMaterial = async (materialId: string) => {
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

  // ✅ Sotib olish sahifasiga o'tish
  const goToCheckout = () => {
    router.push(`/checkout?material=${material?._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-b-2 border-red-500 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => router.push("/materials")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
          >
            Browse Materials
          </button>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Material not found
          </h1>
          <button
            onClick={() => router.push("/materials")}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg"
          >
            Back to Materials
          </button>
        </div>
      </div>
    );
  }

  const isFree = material.price === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-red-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Banner */}
          <div className="relative h-[300px] w-full bg-gradient-to-r from-red-500 to-red-600">
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-white/50" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[material.level]}`}
                  >
                    {material.level.charAt(0).toUpperCase() +
                      material.level.slice(1)}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {formatCategory(material.category)}
                  </span>
                  {isFree && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      FREE
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {material.name}
                </h1>
              </div>

              {material.rate > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {material.rate.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Material Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold">Category</h3>
                  </div>
                  <p className="text-gray-600">
                    {formatCategory(material.category)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold">Level</h3>
                  </div>
                  <p className="text-gray-600 capitalize">{material.level}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-6">
              {/* Price */}
              <div>
                {isFree ? (
                  <span className="text-3xl font-bold text-green-600">
                    Free
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {material.price.toLocaleString()} so'm
                  </span>
                )}
              </div>

              {/* Actions */}
              {material.file && (
                <>
                  {hasAccess ? (
                    // ✅ Agar access bo'lsa -> Open tugmasi
                    <button
                      onClick={() => handleOpenMaterial(material._id)}
                      disabled={opening}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {opening ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                      {opening ? "Opening..." : "Open Material"}
                    </button>
                  ) : (
                    // ✅ Agar access bo'lmasa -> Purchase tugmasi
                    <button
                      onClick={goToCheckout}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Purchase to Access
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Access status message */}
            {!isFree && !hasAccess && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  ⚠️ You don't have access to this material. Please purchase it
                  to unlock.
                </p>
              </div>
            )}

            {hasAccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  ✅ You have full access to this material. Click "Open
                  Material" to start learning.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
