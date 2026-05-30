import api from "../api";

export const materialService = {
  getAllMaterials: async () => {
    const res = await api.get("/materials");

    // backend: { success, count, data }
    return res.data.data; // 👈 ALWAYS array
  },

  getMaterialById: async (token: string, id: string) => {
    const res = await api.get(`/materials/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // backend: { success, data: {...} }
    return res.data.data;
  },

  createMaterial: async (token: string, data: FormData) => {
    console.log(data);

    const res = await api.post("/materials", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.data;
  },

  updateMaterial: async (token: string, id: string, data: FormData) => {
    const res = await api.put(`/materials/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.data;
  },

  deleteMaterial: async (token: string, id: string) => {
    const res = await api.delete(`/materials/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.success; // ❗ delete uchun data emas success yaxshi
  },
};
