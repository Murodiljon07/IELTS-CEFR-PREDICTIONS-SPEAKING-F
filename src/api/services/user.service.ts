// api/services/user.service.ts
import api from "../api";

const userService = {
  getUserPortfolio: async (token: string) => {
    try {
      const res = await api.get("/user/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend returns { success: true, data: { profile, stats, orders, materials } }
      return res.data.data;
    } catch (error: any) {
      console.error("Get user portfolio error:", error);
      throw error;
    }
  },
};

export default userService;
