import api from "../api";

const authService = {
  login: async (data: any) => {
    let res = await api.post("/auth/login", data);
    return res.data;
  },
  register: async (data: any) => {
    let res = await api.post("/auth/register", data);

    return res.data;
  },
};

export default authService;
