"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Send, Trash2 } from "lucide-react";
import { Material } from "@/types/Material.type";
import orderService from "@/api/services/order.service";
import { useRouter } from "next/navigation";

type CartItem = Material & {
  quantity: number;
  price: number;
  oldPrice?: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("User parse qilishda xatolik:", error);
      }
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const items = JSON.parse(stored);
      // ✅ Price ni Number ga o'girish
      const normalizedItems = items.map((item: any) => ({
        ...item,
        price: Number(item.price),
        oldPrice: item.oldPrice ? Number(item.oldPrice) : undefined,
      }));
      setCartItems(normalizedItems);
    }
  }, []);

  // ✅ Chegirma hisoblash - to'g'rilangan
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice || item.price),
    0,
  );

  const discount = subTotal > total ? subTotal - total : 0;

  const increase = total > subTotal ? total - subTotal : 0;

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ✅ Material IDs ni olish
  const getMaterialIds = () => {
    return cartItems.map((item) => item._id);
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      alert("Savatingiz bo'sh!");
      return;
    }

    if (!user) {
      alert("Iltimos, avval tizimga kiring!");
      router.push("/auth/login");
      return;
    }

    setIsSending(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Iltimos, qaytadan kiring!");
        router.push("/auth/login");
        return;
      }

      // 1️⃣ ORDERNI BACKENDGA SAQLASH
      const materialIds = getMaterialIds();
      const response = await orderService.createOrder(
        user._id,
        materialIds,
        total,
        token,
      );

      // 2️⃣ TELEGRAM MESSAGE TAYYORLASH
      const materialsList = cartItems
        .map(
          (item, i) =>
            `${i + 1}. ${item.name}
   Kategoriya: ${item.category || "Yo'q"}
   Daraja: ${item.level || "Yo'q"}
   Narx: ${item.price.toLocaleString()} so'm${item.oldPrice && item.oldPrice > item.price ? ` (Chegirma: ${(item.oldPrice - item.price).toLocaleString()} so'm)` : ""}`,
        )
        .join("\n\n");

      const orderId =
        response?.order?._id || response?._id || `ORD-${Date.now()}`;

      // ✅ User telefon raqamini tekshirish
      const userPhone =
        user.phone || user.phoneNumber || "Telefon ko'rsatilmagan";
      const userFullName = user.fullName || user.name || "Ism ko'rsatilmagan";
      const userEmail = user.email || "Email ko'rsatilmagan";

      const message =
        `🛒 YANGI BUYURTMA 🆔${orderId.slice(-6)}\n\n` +
        `👤 ${userFullName}\n` +
        `📞 ${userPhone}\n` +
        `📧 ${userEmail}\n\n` +
        `📦 BUYURTMA MAHSULOTLARI:\n${materialsList}\n\n` +
        `💰 ASL NARX: ${subTotal.toLocaleString()} so'm\n` +
        (discount > 0
          ? `🏷 CHEGIRMA: -${discount.toLocaleString()} so'm\n`
          : increase > 0
            ? `📈 QO'SHIMCHA: +${increase.toLocaleString()} so'm\n`
            : "") +
        `💵 JAMI TO'LOV: ${total.toLocaleString()} so'm\n\n` +
        `⏱ Vaqt: ${new Date().toLocaleString()}`;

      // 3️⃣ TELEGRAMGA YUBORISH
      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

      // ✅ Agar bot token bo'lsa, API orqali yuborish
      if (botToken && chatId) {
        try {
          const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
          const telegramResponse = await fetch(telegramApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "HTML",
            }),
          });

          if (telegramResponse.ok) {
            console.log("Telegram message sent via API");
          } else {
            // Fallback: link ochish
            const telegramUrl = `https://t.me/umarkhan_band8_admin2?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, "_blank");
          }
        } catch (error) {
          console.error("Telegram API error:", error);
          // Fallback: link ochish
          const telegramUrl = `https://t.me/umarkhan_band8_admin2?text=${encodeURIComponent(message)}`;
          window.open(telegramUrl, "_blank");
        }
      } else {
        // Link orqali yuborish
        const telegramUrl = `https://t.me/umarkhan_band8_admin2?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, "_blank");
      }

      // 4️⃣ CARTNI TOZALASH
      localStorage.removeItem("cart");
      setCartItems([]);
      setShowConfirmModal(false);

      router.push("/portfolio");
    } catch (error: any) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi: " + (error.message || "Qayta urinib ko'ring"));
    } finally {
      setIsSending(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Savat bo'sh</h2>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Savat</h1>
          <p className="text-gray-500 mt-1">{cartItems.length} ta material</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chap tomon - Materiallar ro'yxati */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Materiallar
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-xl">
                          📘
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                              {item.category || "Kategoriya"}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                              {item.level || "Daraja"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
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
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* O'ng tomon - Buyurtma xulosasi */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Buyurtma xulosasi
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Umumiy narx</span>
                  <span>{total.toLocaleString()} so'm</span>
                </div>
                {/* {discount &&  > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Chegirma</span>
                    <span>-{discount.toLocaleString()} so'm</span>
                  </div>
                )} */}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Jami to'lov</span>
                    <span className="text-green-600">
                      {total.toLocaleString()} so'm
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={isSending}
                className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Buyurtma berish
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">🛡 Xavfsiz</div>
                  <div className="flex items-center gap-1">🤖 Telegram</div>
                  <div className="flex items-center gap-1">
                    💳 To'lov admin bilan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Send className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Buyurtmani tasdiqlash
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Jami:{" "}
                  <span className="font-bold text-green-600">
                    {total.toLocaleString()} so'm
                  </span>
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold text-blue-900">
                    📌 Buyurtma jarayoni:
                  </p>
                  <p>1. Telegram ochiladi</p>
                  <p>2. Xabarni tekshirib "Send" tugmasini bosing</p>
                  <p>3. Admin siz bilan bog'lanadi</p>
                  <p>4. To'lovdan so'ng materiallar faollashtiriladi</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  📦 Buyurtmadagi materiallar:
                </p>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="text-xs text-gray-600 flex justify-between py-1"
                  >
                    <span>{item.name}</span>
                    <span>{item.price.toLocaleString()} so'm</span>
                  </div>
                ))}
                {increase > 0 ? (
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-xs text-green-600">
                    <span>Qo'shimcha:</span>
                    <span>+{increase.toLocaleString()} so'm</span>
                  </div>
                ) : discount > 0 ? (
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-xs text-red-600">
                    <span>Chegirma:</span>
                    <span>-{discount.toLocaleString()} so'm</span>
                  </div>
                ) : null}
                <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold text-sm">
                  <span>Jami:</span>
                  <span className="text-green-600">
                    {total.toLocaleString()} so'm
                  </span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={isSending}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Telegramga yuborish
                  </>
                )}
              </button>

              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full mt-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
