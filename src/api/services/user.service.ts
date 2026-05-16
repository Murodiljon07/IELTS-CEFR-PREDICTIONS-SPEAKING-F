import api from "../api";

const userService = {
  getUserProfile: async (token: string) => {
    try {
      const res = await api.get("/user/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};

export default userService;
