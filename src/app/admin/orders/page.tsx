"use client";

import { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle, Search, Download } from "lucide-react";
import orderService from "@/api/services/order.service";

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
}

interface Material {
  _id: string;
  name: string;
  price: number;
}

interface Order {
  _id: string;
  user: User | string; // Can be either populated object or just ID
  email?: string; // Make optional since it's now inside user
  materials: Material[] | string[];
  totalPrice: number; // Note: you have totalPrice, not total
  status: "pending" | "completed" | "cancelled";
  date: string | Date;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await orderService.getAllOrders(token);

        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Helper function to get user name
  const getUserName = (order: Order): string => {
    if (typeof order.user === "object" && order.user !== null) {
      return order.user.fullName || order.user.email || "Unknown User";
    }
    return "Loading...";
  };

  // Helper function to get user email
  const getUserEmail = (order: Order): string => {
    if (typeof order.user === "object" && order.user !== null) {
      return order.user.email || "";
    }
    return order.email || "";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.includes(search) ||
      getUserName(order).toLowerCase().includes(search.toLowerCase()) ||
      getUserEmail(order).toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = async (
    id: string,
    status: "completed" | "cancelled",
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Call API to update status
      if (status === "completed") {
        await orderService.approveOrder(id, token);
      } else {
        await orderService.cancelOrder(id, token);
      }

      // Update local state
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status } : order)),
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  // Format date properly
  const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
        <p className="text-gray-500 mt-1">View and manage customer orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Items
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 overflow-y-auto max-h-[400px]">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {order._id.slice(-8)} {/* Show last 8 chars of ID */}
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {getUserName(order)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getUserEmail(order)}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {order.materials.length} item(s)
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-900">
                    {order.totalPrice} uzs
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {formatDate(order.date)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "completed")
                            }
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "cancelled")
                            }
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Order Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-medium">{selectedOrder._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span>{getUserName(selectedOrder)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>{getUserEmail(selectedOrder)}</span>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium mb-2">Materials:</p>
                {selectedOrder.materials.map((material) => (
                  <div
                    key={typeof material === "object" ? material._id : material}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {typeof material === "object"
                        ? material.name
                        : "Loading..."}
                    </span>
                    <span>
                      {typeof material === "object" ? material.price : "0"} uzs
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span>{selectedOrder.totalPrice} uzs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date:</span>
                <span>{formatDate(selectedOrder.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${statusColors[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
