// api/services/order.service.ts
import api from "../api";

const orderService = {
  /* ========================================================
     CREATE ORDER
  ======================================================== */
  createOrder: async (
    userId: string,
    materialIds: string[],
    totalPrice: number,
    token: string,
  ) => {
    const res = await api.post(
      "/orders",
      {
        userId,
        materialIds,
        totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data; // { success, message, data }
  },

  /* ========================================================
     GET MY ORDERS (Current user)
  ======================================================== */
  getMyOrders: async (token: string) => {
    const res = await api.get("/orders/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data; // { success, count, data }
  },

  /* ========================================================
     GET ORDER BY ID
  ======================================================== */
  getOrderById: async (orderId: string, token: string) => {
    const res = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data; // { success, data }
  },

  /* ========================================================
     GET ALL ORDERS (ADMIN)
  ======================================================== */
  getAllOrders: async (token: string) => {
    const res = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data; // { success, count, data }
  },

  /* ========================================================
     APPROVE ORDER (ADMIN)
  ======================================================== */
  approveOrder: async (orderId: string, token: string) => {
    const res = await api.patch(
      `/orders/${orderId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data; // { success, message, data }
  },

  /* ========================================================
     CANCEL ORDER (ADMIN)
  ======================================================== */
  cancelOrder: async (orderId: string, token: string) => {
    const res = await api.patch(
      `/orders/${orderId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data; // { success, message, data }
  },
};

export default orderService;
