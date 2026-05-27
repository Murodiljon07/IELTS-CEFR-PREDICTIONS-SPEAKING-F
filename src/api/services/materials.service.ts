// api/services/materials.service.ts
import api from "../api";

export const materialService = {
  getAllMaterials: async () => {
    const res = await api.get("/materials");
    return res.data;
  },

  getMaterialById: async (token: string, id: string) => {
    const res = await api.get(`/materials/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  createMaterial: async (token: string, data: FormData) => {
    const res = await api.post("/materials/create-material", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // ✅ Content-Type ko'rsatmang — axios FormData ni o'zi aniqlaydi
        // "Content-Type": "multipart/form-data" ← BU MUAMMO YARATADI
      },
    });
    return res.data;
  },

  updateMaterial: async (token: string | null, id: string, data: FormData) => {
    const res = await api.put(`/materials/update-material/${id}`, data, {
      // ✅ /materials/ prefix qo'shildi
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  deleteMaterial: async (token: string | null, id: string) => {
    const res = await api.delete(`/materials/delete-material/${id}`, {
      // ✅ /materials/ prefix qo'shildi
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
