"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Lock,
  Key,
  Sparkles,
  Send,
} from "lucide-react";

// Types
interface CartItem {
  id: number;
  title: string;
  type: "course" | "material";
  category: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  level?: string;
  isActivated?: boolean;
  accessCode?: string;
}

// Mock cart data
const initialCartItems: CartItem[] = [
  {
    id: 1,
    title: "Complete IELTS Preparation Course",
    type: "course",
    category: "IELTS",
    price: 299,
    originalPrice: 499,
    quantity: 1,
    level: "Intermediate",
    isActivated: false,
  },
  {
    id: 2,
    title: "IELTS Vocabulary Builder",
    type: "material",
    category: "Vocabulary",
    price: 29.99,
    quantity: 1,
    level: "Intermediate",
    isActivated: false,
  },
  {
    id: 3,
    title: "Writing Task 2 Mastery",
    type: "course",
    category: "Writing",
    price: 99,
    originalPrice: 199,
    quantity: 1,
    level: "Advanced",
    isActivated: false,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [codeSuccess, setCodeSuccess] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSendingToTelegram, setIsSendingToTelegram] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
  const total = (subtotal - discount).toFixed(2);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const openCodeModal = (item: CartItem) => {
    setSelectedItem(item);
    setVerificationCode("");
    setCodeError("");
    setCodeSuccess("");
    setShowCodeModal(true);
  };

  const verifyCode = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setCodeError("Please enter a valid 6-digit code");
      return;
    }

    setIsVerifying(true);
    setCodeError("");

    setTimeout(() => {
      const validCodes = ["123456", "789012", "654321", "111222", "333444"];

      if (validCodes.includes(verificationCode)) {
        setCodeSuccess("Code verified successfully! Material activated.");

        setCartItems((prev) =>
          prev.map((item) =>
            item.id === selectedItem?.id
              ? { ...item, isActivated: true, accessCode: verificationCode }
              : item,
          ),
        );

        setTimeout(() => {
          setShowCodeModal(false);
          setVerificationCode("");
          setCodeSuccess("");
        }, 1500);
      } else {
        setCodeError("Invalid code. Please check and try again.");
      }
      setIsVerifying(false);
    }, 1000);
  };

  const sendToTelegramAdmin = () => {
    if (pendingItems.length === 0) return;

    setIsSendingToTelegram(true);

    const selectedItems = pendingItems.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      total: (item.price * item.quantity).toFixed(2),
    }));

    const message = {
      user: {
        id: "user_" + Date.now(),
        name: "Demo User",
        email: "user@example.com",
      },
      order: {
        id: "ORDER_" + Date.now(),
        date: new Date().toLocaleString(),
        items: selectedItems,
        subtotal: subtotal.toFixed(2),
        discount: discount.toFixed(2),
        total: total,
        status: "pending_payment",
      },
    };

    console.log("📤 Sending to Telegram Admin:", message);

    setTimeout(() => {
      const generatedCodes = pendingItems.map((item) => ({
        id: item.id,
        code: Math.floor(100000 + Math.random() * 900000).toString(),
      }));

      alert(
        `✅ Order sent to Telegram Admin!\n\n` +
          `📦 Order ID: ${message.order.id}\n` +
          `💰 Total Amount: $${total}\n` +
          `📦 Items: ${pendingItems.length} items\n\n` +
          `👨‍💼 Admin will contact you shortly.\n` +
          `After payment confirmation, you will receive a 6-digit code for each material.\n\n` +
          `💬 Telegram: @GoodTestingAdmin`,
      );

      console.log("Generated codes:", generatedCodes);

      setIsSendingToTelegram(false);
      setShowPaymentModal(false);
    }, 2000);
  };

  const activatedItems = cartItems.filter((item) => item.isActivated);
  const pendingItems = cartItems.filter((item) => !item.isActivated);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything yet
          </p>
          <Link href="/courses">
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
              Browse Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
            <p className="text-gray-500 mt-1">
              {activatedItems.length} activated / {cartItems.length} total items
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              {/* Activated Items Section */}
              {activatedItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Activated Materials
                  </h2>
                  <div className="space-y-3">
                    {activatedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-green-200 p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">
                              {item.type === "course" ? "📚" : "📖"}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                Activated
                              </span>
                              <span className="text-xs text-gray-500">
                                Code: {item.accessCode}
                              </span>
                            </div>
                          </div>
                          <Link href={`/materials/${item.id}`}>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                              Start Learning
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pending Items Section */}
              {pendingItems.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Pending Activation
                  </h2>
                  <div className="space-y-3">
                    {pendingItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">
                                {item.type === "course" ? "📚" : "📖"}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {item.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                  {item.category}
                                </span>
                                {item.level && (
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                    {item.level}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              {item.originalPrice ? (
                                <div>
                                  <div className="font-bold text-gray-900">
                                    ${item.price}
                                  </div>
                                  <div className="text-xs text-gray-400 line-through">
                                    ${item.originalPrice}
                                  </div>
                                </div>
                              ) : (
                                <div className="font-bold text-gray-900">
                                  ${item.price}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => openCodeModal(item)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-2"
                            >
                              <Key className="w-4 h-4" />
                              Activate
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total to Pay</span>
                      <span className="text-red-600">${total}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Items List */}
                {pendingItems.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Selected Items:
                    </p>
                    {pendingItems.map((item) => (
                      <div
                        key={item.id}
                        className="text-xs text-gray-600 flex justify-between py-1"
                      >
                        <span>
                          {item.title} x{item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pay Button - Only Telegram */}
                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={pendingItems.length === 0}
                  className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send to Telegram
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🤖</span>
                      <span>Telegram</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🔐</span>
                      <span>6-Digit Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Verification Modal */}
      {showCodeModal && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setShowCodeModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Key className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Enter Activation Code
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Enter the 6-digit code received from admin to activate "
                  {selectedItem.title}"
                </p>
              </div>

              {/* Code Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setVerificationCode(value);
                    setCodeError("");
                  }}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                  autoFocus
                />
                {codeError && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {codeError}
                  </p>
                )}
                {codeSuccess && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {codeSuccess}
                  </p>
                )}
              </div>

              {/* Info Box */}
              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  💡 Don't have a code? Complete payment via Telegram to receive
                  your activation code from admin
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={verifyCode}
                  disabled={isVerifying || verificationCode.length !== 6}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Verify
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal - Telegram Only */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Send className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Send Order to Telegram
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Total amount:{" "}
                  <span className="font-bold text-red-600">${total}</span>
                </p>
              </div>

              <div className="mb-6">
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Telegram Admin
                      </p>
                      <p className="text-xs text-gray-500">@GoodTestingAdmin</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      1. Your order details will be sent to the admin
                    </p>
                    <p className="text-sm text-gray-700">
                      2. Admin will contact you via Telegram
                    </p>
                    <p className="text-sm text-gray-700">
                      3. After payment, you will receive a 6-digit code for each
                      material
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Your Order:
                  </p>
                  {pendingItems.map((item) => (
                    <div
                      key={item.id}
                      className="text-xs text-gray-600 flex justify-between py-1"
                    >
                      <span>
                        {item.title} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold text-sm">
                    <span>Total:</span>
                    <span className="text-red-600">${total}</span>
                  </div>
                </div>

                <button
                  onClick={sendToTelegramAdmin}
                  disabled={isSendingToTelegram}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSendingToTelegram ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send to Telegram Admin
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-4">
                Admin will review your order and contact you shortly
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
