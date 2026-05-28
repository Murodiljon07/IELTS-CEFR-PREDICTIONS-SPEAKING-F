// api/services/materials.service.ts
import api from "../api";

export const materialService = {
  getAllMaterials: async () => {
    const res = await api.get("/materials");
    // Backend: { success, count, data }
    return res.data.data; // ✅ To'g'ridan-to'g'ri materials arrayini qaytar
  },

  getMaterialById: async (token: string, id: string) => {
    const res = await api.get(`/materials/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data; // ✅ material object
  },

  createMaterial: async (token: string, data: FormData) => {
    const res = await api.post("/materials", data, {
      // ✅ URL to'g'ri
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  updateMaterial: async (token: string, id: string, data: FormData) => {
    const res = await api.put(`/materials/${id}`, data, {
      // ✅ URL to'g'ri
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  deleteMaterial: async (token: string, id: string) => {
    const res = await api.delete(`/materials/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },
};
