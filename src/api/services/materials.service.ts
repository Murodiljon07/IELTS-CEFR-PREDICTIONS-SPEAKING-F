// api/services/materials.service.ts
import api from "../api";

export const materialService = {
  getAllMaterials: async () => {
    let res = await api.get("/materials");
    return res.data;
  },

  createMaterial: async (token: string, data: FormData) => {
    let res = await api.post("/materials/create-material", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Agar kerak bo'lsa update va delete uchun ham
  updateMaterial: async (token: string | null, id: string, data: FormData) => {
    let res = await api.put(`/materials/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  deleteMaterial: async (token: string | null, id: string) => {
    let res = await api.delete(`/materials/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
