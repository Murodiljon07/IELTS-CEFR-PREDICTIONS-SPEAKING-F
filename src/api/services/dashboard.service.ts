import api from "../api";

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalMaterials: number;
  totalUsers: number;
  activatedCodes: number;
  pendingOrders: number;
  monthlyRevenue: number;
  growth: number;
}

export interface RecentOrder {
  id: string;
  user: string;
  userName: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
  materials: string;
}

const dashboardService = {
  getStats: async (token: string): Promise<DashboardStats> => {
    const res = await api.get("/admin/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  getRecentOrders: async (token: string): Promise<RecentOrder[]> => {
    const res = await api.get("/admin/dashboard/recent-orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },
};

export default dashboardService;
