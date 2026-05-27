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
      "/orders/",
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

    return res.data;
  },

  /* ========================================================
     GET MY ORDERS
  ======================================================== */
  getMyOrders: async (token: string) => {
    const res = await api.get("/orders/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  /* ========================================================
     GET ALL ORDERS (ADMIN)
  ======================================================== */
  getAllOrders: async (token: string) => {
    const res = await api.get("/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
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

    return res.data;
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

    return res.data;
  },
};

export default orderService;
