"use client";

import { useState } from "react";
import {
  Key,
  Copy,
  CheckCircle,
  DollarSign,
  Package,
  Calendar,
} from "lucide-react";

interface Material {
  id: number;
  title: string;
  price: number;
  category: string;
}

const availableMaterials: Material[] = [
  {
    id: 1,
    title: "IELTS Vocabulary Builder",
    price: 29.99,
    category: "Vocabulary",
  },
  { id: 2, title: "Grammar Fundamentals", price: 0, category: "Grammar" },
  { id: 3, title: "Complete IELTS Course", price: 299, category: "IELTS" },
  {
    id: 4,
    title: "Advanced Reading Strategies",
    price: 34.99,
    category: "Reading",
  },
  { id: 5, title: "Writing Task 2 Mastery", price: 99, category: "Writing" },
  {
    id: 6,
    title: "Speaking Confidence Kit",
    price: 49.99,
    category: "Speaking",
  },
];

interface GeneratedCode {
  id: string;
  code: string;
  materialIds: number[];
  totalPrice: number;
  createdAt: string;
  status: "active" | "used";
  usedBy?: string;
}

export default function GenerateCodesPage() {
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [generatedCodes, setGeneratedCodes] = useState<GeneratedCode[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const selectedMaterials = availableMaterials.filter((m) =>
    selectedMaterialIds.includes(m.id),
  );
  const totalPrice = selectedMaterials.reduce((sum, m) => sum + m.price, 0);

  const toggleMaterial = (id: number) => {
    setSelectedMaterialIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const generateCodes = () => {
    if (selectedMaterialIds.length === 0) {
      alert("Please select at least one material");
      return;
    }

    const newCodes: GeneratedCode[] = [];
    for (let i = 0; i < quantity; i++) {
      // Generate random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      newCodes.push({
        id: `CODE_${Date.now()}_${i}`,
        code,
        materialIds: [...selectedMaterialIds],
        totalPrice,
        createdAt: new Date().toLocaleString(),
        status: "active",
      });
    }

    setGeneratedCodes((prev) => [...newCodes, ...prev]);

    // Show summary alert
    alert(
      `✅ ${quantity} code(s) generated successfully!\n\nTotal Amount: $${(totalPrice * quantity).toFixed(2)}\nMaterials: ${selectedMaterials.map((m) => m.title).join(", ")}`,
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Generate Activation Codes
        </h1>
        <p className="text-gray-500 mt-1">
          Create 6-digit codes for material activation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Generate Codes */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select Materials
            </h2>

            <div className="space-y-2 mb-6">
              {availableMaterials.map((material) => (
                <label
                  key={material.id}
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterialIds.includes(material.id)}
                    onChange={() => toggleMaterial(material.id)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">
                        {material.title}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {material.price === 0 ? "Free" : `$${material.price}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{material.category}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Selected Summary */}
            {selectedMaterials.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Selected Items:
                </p>
                {selectedMaterials.map((m) => (
                  <div
                    key={m.id}
                    className="text-sm text-blue-800 flex justify-between"
                  >
                    <span>{m.title}</span>
                    <span>${m.price}</span>
                  </div>
                ))}
                <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between font-bold">
                  <span>Total per code:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Codes
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.min(100, Math.max(1, parseInt(e.target.value) || 1)),
                  )
                }
                className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateCodes}
              disabled={selectedMaterials.length === 0}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Key className="w-5 h-5" />
              Generate {quantity} Code{quantity > 1 ? "s" : ""}
            </button>

            {/* Summary Note */}
            {selectedMaterials.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700 text-center">
                  💡 Total value:{" "}
                  <strong>${(totalPrice * quantity).toFixed(2)}</strong> for{" "}
                  {quantity} code(s)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Generated Codes List */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Generated Codes
            </h2>

            {generatedCodes.length === 0 ? (
              <div className="text-center py-12">
                <Key className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No codes generated yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  Select materials and click generate
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {generatedCodes.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-bold text-red-600">
                          {item.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.code)}
                          className="p-1 text-gray-400 hover:text-green-600"
                        >
                          {copiedCode === item.code ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>
                          {availableMaterials
                            .filter((m) => item.materialIds.includes(m.id))
                            .map((m) => m.title)
                            .join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>Total: ${item.totalPrice}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created: {item.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
