"use client";

import { useState } from "react";
import { Eye, CheckCircle, XCircle, Search, Download } from "lucide-react";

interface Order {
  id: string;
  user: string;
  email: string;
  items: { id: number; title: string; price: number }[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    user: "John Doe",
    email: "john@example.com",
    items: [{ id: 1, title: "IELTS Course", price: 299 }],
    total: 299,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    user: "Sarah Smith",
    email: "sarah@example.com",
    items: [{ id: 2, title: "Vocabulary Builder", price: 29.99 }],
    total: 29.99,
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    user: "Mike Brown",
    email: "mike@example.com",
    items: [
      { id: 1, title: "IELTS Course", price: 299 },
      { id: 3, title: "Writing Mastery", price: 99 },
    ],
    total: 398,
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    user: "Emma Wilson",
    email: "emma@example.com",
    items: [{ id: 4, title: "Speaking Kit", price: 49.99 }],
    total: 49.99,
    status: "pending",
    date: "2024-01-13",
  },
  {
    id: "ORD-005",
    user: "David Lee",
    email: "david@example.com",
    items: [{ id: 2, title: "Vocabulary Builder", price: 29.99 }],
    total: 29.99,
    status: "cancelled",
    date: "2024-01-12",
  },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (id: string, status: "completed" | "cancelled") => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.user}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {order.items.length} item(s)
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-900">
                    ${order.total}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{order.date}</td>
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
                              updateOrderStatus(order.id, "completed")
                            }
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "cancelled")
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
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Order Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-medium">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span>{selectedOrder.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>{selectedOrder.email}</span>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium mb-2">Items:</p>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span>${selectedOrder.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date:</span>
                <span>{selectedOrder.date}</span>
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
