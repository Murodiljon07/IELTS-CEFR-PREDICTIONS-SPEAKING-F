"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Shield,
  AlertCircle,
  CheckCircle,
  Lock,
  Key,
  Send,
  Star,
} from "lucide-react";
import { Material } from "@/types/Material.type";
import orderService from "@/api/services/order.service";

// ✅ CartItem = Material + qo'shimcha cart fieldlar
type CartItem = Material & {
  quantity: number;
  isActivated?: boolean;
  accessCode?: string;
  price: number;
  oldPrice?: number;
};

export default function CartPage() {
  const [frozen, setFrozen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [codeSuccess, setCodeSuccess] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSendingToTelegram, setIsSendingToTelegram] = useState(false);
  const [user, setUser] = useState<{
    _id: string;
    email: string;
    fullName: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    setCartItems(stored ? JSON.parse(stored) : []);
  }, []);

  // ✅ price ishlatiladi (salary emas)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  // ✅ oldPrice bor bo'lsa haqiqiy chegirma, yo'q bo'lsa 0
  const discount = cartItems.reduce((sum, item) => {
    if (item.oldPrice > item.price) {
      return sum + (item.oldPrice - item.price);
    }
    return sum;
  }, 0);

  const total = subtotal.toFixed(0);

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const openCodeModal = (item: CartItem) => {
    setSelectedItem(item);
    setVerificationCode("");
    setCodeError("");
    setCodeSuccess("");
    setShowCodeModal(true);
  };

  // ✅ Haqiqiy kod tekshiruvi — backendga so'rov yuboriladi
  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setCodeError("6 xonali kodni kiriting");
      return;
    }
    setIsVerifying(true);
    setCodeError("");

    try {
      const res = await fetch("/api/orders/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          materialId: selectedItem?._id,
          code: verificationCode,
        }),
      });

      if (res.ok) {
        setCodeSuccess("Kod tasdiqlandi! Material faollashtirildi.");
        const updated = cartItems.map((item) =>
          item._id === selectedItem?._id
            ? { ...item, isActivated: true, accessCode: verificationCode }
            : item,
        );
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        setTimeout(() => {
          setShowCodeModal(false);
          setCodeSuccess("");
        }, 1500);
      } else {
        setCodeError("Noto'g'ri kod. Qayta urinib ko'ring.");
      }
    } catch {
      setCodeError("Xatolik yuz berdi. Internet aloqasini tekshiring.");
    }

    setIsVerifying(false);
  };

  // ✅ t.me link orqali to'g'ridan-to'g'ri adminga yuboradi
  const sendToTelegramAdmin = async () => {
    if (pendingItems.length === 0 || !user) return;

    try {
      setIsSendingToTelegram(true);

      const token = localStorage.getItem("token");

      const orderId = "ORD-" + Date.now();

      // TG uchun
      const materialsList = pendingItems
        .map(
          (item, i) =>
            `${i + 1}. ${item.name}
Kategoriya: ${item.category}
Daraja: ${item.level}
Narx: ${item.price.toLocaleString()} so'm`,
        )
        .join("\n\n");

      // BACKENDGA ORDER SAVE

      const res = await orderService.createOrder(
        user._id,
        pendingItems.map((item) => item._id),
        Number(total),
        token!,
      );

      // TG MESSAGE
      const message =
        `🛒 YANGI BUYURTMA\n\n` +
        `👤 ${user.fullName}\n` +
        `📞 ${user.phone}\n` +
        `📧 ${user.email}\n` +
        `🆔 ${orderId}\n\n` +
        `📦 MATERIALS:\n${materialsList}\n\n` +
        `💰 JAMI: ${Number(total).toLocaleString()} so'm`;

      const telegramUrl = `https://t.me/umarkhan_band8_admin2/url?url=&text=${encodeURIComponent(message)}`;

      window.open(telegramUrl, "_blank");

      setShowPaymentModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSendingToTelegram(false);
      setFrozen(true);
      setTimeout(() => {
        setFrozen(false);
      }, 120000);
    }
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cart bo'sh</h2>
          <p className="text-gray-500 mb-8">Hali hech narsa qo'shilmagan</p>
          <Link href="/materials">
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
              Materiallarni ko'rish
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Mening kutubxonam
            </h1>
            <p className="text-gray-500 mt-1">
              {activatedItems.length} faollashtirilgan / {cartItems.length} jami
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Faollashtirilgan materiallar */}
              {activatedItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Faollashtirilgan
                  </h2>
                  <div className="space-y-3">
                    {activatedItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-xl border border-green-200 p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                            📗
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                Faol
                              </span>
                              <span className="text-xs text-gray-500">
                                Kod: {item.accessCode}
                              </span>
                            </div>
                          </div>
                          <Link href={`/materials/${item._id}`}>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                              O'rganishni boshlash
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kutayotgan materiallar */}
              {pendingItems.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5" /> Faollashtirish kutilmoqda
                  </h2>
                  <div className="space-y-3">
                    {pendingItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-xl border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                              📘
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {item.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                  {item.category}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                  {item.level}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              {/* ✅ price ishlatiladi */}
                              <div className="font-bold text-gray-900">
                                {item.price.toLocaleString()} so'm
                              </div>
                              {item.oldPrice && item.oldPrice > item.price && (
                                <div className="text-xs text-gray-400 line-through">
                                  {item.oldPrice.toLocaleString()} so'm
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="p-2 text-gray-400 hover:text-red-500"
                            >
                              ✕
                            </button>
                            <button
                              onClick={() => openCodeModal(item)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-2"
                            >
                              <Key className="w-4 h-4" /> Faollashtirish
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order xulosasi */}
            <div className="lg:w-96">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Buyurtma xulosasi
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Narx</span>
                    <span>{subtotal.toLocaleString()} so'm</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Chegirma</span>
                      <span className="line-through">
                        -{discount.toLocaleString()} so'm
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Jami</span>
                      <span className="text-green-600">
                        {Number(total).toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                </div>

                {pendingItems.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Tanlangan materiallar:
                    </p>
                    {pendingItems.map((item) => (
                      <div
                        key={item._id}
                        className="text-xs text-gray-600 flex justify-between py-1"
                      >
                        {/* ✅ item.name ishlatiladi */}
                        <span className="flex items-center gap-1">
                          {item.name} x{" "}
                          {item.rate && (
                            <span className="text-amber-400 flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {Number(item.rate).toFixed(1)}
                            </span>
                          )}
                        </span>
                        <span>{item.price.toLocaleString()} so'm</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={
                    pendingItems.length === 0 || isSendingToTelegram || frozen
                  }
                  className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Telegramga yuborish
                </button>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Xavfsiz
                    </div>
                    <div className="flex items-center gap-1">🤖 Telegram</div>
                    <div className="flex items-center gap-1">
                      🔐 6-xonali kod
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kod kiritish modali */}
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
                  Faollashtirish kodi
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  "{selectedItem.name}" uchun admindan kelgan 6 xonali kodni
                  kiriting
                </p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value.replace(/\D/g, ""));
                  setCodeError("");
                }}
                placeholder="000000"
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-mono mb-2"
                autoFocus
              />

              {codeError && (
                <p className="text-xs text-red-500 mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {codeError}
                </p>
              )}
              {codeSuccess && (
                <p className="text-xs text-green-600 mb-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {codeSuccess}
                </p>
              )}

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  💡 Kod yo'qmi? Avval Telegram orqali buyurtma yuboring va
                  to'lovni amalga oshiring
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Bekor qilish
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
                      <CheckCircle className="w-4 h-4" /> Tasdiqlash
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* To'lov modali */}
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
                  Telegramga yuborish
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Jami:{" "}
                  <span className="font-bold text-green-600">
                    {Number(total).toLocaleString()} so'm
                  </span>
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="text-xs text-red-500 font-semibold">
                    <span className="font-bold text-red-600">Eslatma</span>:{" "}
                    <br />
                    Buyurtmalarni toliq qiling keyingi buyurtmangizni 1soatdan
                    keyin amalga oshira olasiz!
                  </p>
                  <p>1. Buyurtma ma'lumotlari adminga yuboriladi</p>
                  <p>2. Admin siz bilan bog'lanadi</p>
                  <p>
                    3. To'lovdan so'ng har bir material uchun 6 xonali kod
                    olasiz
                  </p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Buyurtmangiz:
                </p>
                {pendingItems.map((item) => (
                  <div
                    key={item._id}
                    className="text-xs text-gray-600 flex justify-between py-1"
                  >
                    {/* ✅ item.name va item.price */}
                    <span className="flex items-center gap-1">
                      {item.name}{" "}
                      {item.rate && (
                        <span className="text-amber-400 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {Number(item.rate).toFixed(1)}
                        </span>
                      )}
                    </span>
                    <span>{item.price.toLocaleString()} so'm</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold text-sm">
                  <span>Jami:</span>
                  <span className="text-green-600">
                    {Number(total).toLocaleString()} so'm
                  </span>
                </div>
              </div>

              <button
                onClick={sendToTelegramAdmin}
                disabled={isSendingToTelegram || frozen}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSendingToTelegram ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Admin Telegramiga yuborish
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Admin buyurtmangizni ko'rib chiqib tez orada bog'lanadi
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
