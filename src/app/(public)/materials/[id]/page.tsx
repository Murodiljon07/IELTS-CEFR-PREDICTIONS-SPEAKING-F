"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Material } from "@/types/Material.type";
import { materialService } from "@/api/services/materials.service";

import { Star, Download, ArrowLeft, BookOpen, BadgeCheck } from "lucide-react";

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
  const params = useParams();
  const router = useRouter();

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

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

        setMaterial(response.material);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMaterial();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-b-2 border-red-500 animate-spin"></div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Material not found</h1>
      </div>
    );
  }

  const isFree = material.salary === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-red-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Banner */}
          <div className="relative h-[300px] w-full bg-gray-100">
            {material.banner ? (
              <Image
                src={material.banner}
                alt={material.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-gray-300" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Top */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[material.level]}`}
                  >
                    {material.level}
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

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {material.rate.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <Download className="w-5 h-5" />
                  <span>
                    {Math.floor(Math.random() * 5000).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
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

            {/* Price + Download */}
            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-6">
              <div>
                {isFree ? (
                  <span className="text-3xl font-bold text-green-600">
                    Free
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${material.salary.toFixed(2)}
                  </span>
                )}
              </div>

              {material.file && (
                <a
                  href={material.file}
                  target="_blank"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
                >
                  Download Material
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
