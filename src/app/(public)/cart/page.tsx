"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Shield,
  Truck,
  Gift,
  ArrowRight,
  X,
  Tag,
  AlertCircle,
  ChevronRight,
  Lock,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Types
interface CartItem {
  id: number;
  title: string;
  type: "course" | "material";
  category: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  instructor?: string;
  duration?: string;
  level?: string;
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
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "IELTS Vocabulary Builder",
    type: "material",
    category: "Vocabulary",
    price: 29.99,
    quantity: 1,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Writing Task 2 Mastery",
    type: "course",
    category: "Writing",
    price: 99,
    originalPrice: 199,
    quantity: 1,
    instructor: "James Lee",
    duration: "4 weeks",
    level: "Advanced",
  },
];

// Recommended items
const recommendedItems = [
  {
    id: 1,
    title: "Speaking Confidence Kit",
    type: "material",
    price: 0,
    isFree: true,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Grammar Fundamentals",
    type: "course",
    price: 149,
    originalPrice: 249,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Listening Practice Tests",
    type: "material",
    price: 24.99,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Advanced Reading Strategies",
    type: "course",
    price: 179,
    originalPrice: 299,
    rating: 4.8,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart");
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

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
  const promoDiscountAmount = (subtotal - discount) * (promoDiscount / 100);
  const total = (subtotal - discount - promoDiscountAmount).toFixed(2);
  const savings = (discount + promoDiscountAmount).toFixed(2);

  const updateQuantity = useCallback((id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const applyPromoCode = useCallback(async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setIsApplyingPromo(true);
    setPromoError("");
    setPromoSuccess("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock promo codes
    const validPromos: Record<string, number> = {
      WELCOME10: 10,
      SAVE20: 20,
      IELTS15: 15,
      STUDENT25: 25,
    };

    const code = promoCode.toUpperCase();
    if (validPromos[code]) {
      setPromoDiscount(validPromos[code]);
      setPromoSuccess(`Promo code applied! ${validPromos[code]}% discount`);
    } else {
      setPromoError("Invalid promo code");
      setPromoDiscount(0);
    }
    setIsApplyingPromo(false);
  }, [promoCode]);

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Checkout successful! Redirecting to payment...");
    setIsCheckingOut(false);
  }, [cartItems]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Shopping Cart</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Your Shopping Cart
            </h1>
            <p className="text-gray-300 mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added anything to your cart yet
              </p>
              <Link href="/courses">
                <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
                  Browse Courses
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-1 text-center">Total</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Product Info */}
                          <div className="md:col-span-6 flex gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              {item.type === "course" ? (
                                <div className="text-2xl">📚</div>
                              ) : (
                                <div className="text-2xl">📖</div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {item.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                  {item.category}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                  {item.type === "course"
                                    ? "Course"
                                    : "Material"}
                                </span>
                                {item.level && (
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                    {item.level}
                                  </span>
                                )}
                              </div>
                              {item.instructor && (
                                <p className="text-xs text-gray-500 mt-1">
                                  by {item.instructor}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="md:col-span-2 text-center">
                            {item.originalPrice ? (
                              <div>
                                <div className="text-lg font-semibold text-gray-900">
                                  ${item.price}
                                </div>
                                <div className="text-xs text-gray-400 line-through">
                                  ${item.originalPrice}
                                </div>
                              </div>
                            ) : (
                              <div className="text-lg font-semibold text-gray-900">
                                ${item.price}
                              </div>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="md:col-span-2">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="md:col-span-1 text-center">
                            <div className="text-lg font-bold text-red-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          {/* Remove */}
                          <div className="md:col-span-1 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link href="/courses">
                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                      Continue Shopping
                    </button>
                  </Link>
                </div>

                {/* Recommended Items */}
                <div className="mt-12">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-red-500" />
                    You Might Also Like
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recommendedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-all"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                          <div className="text-3xl">
                            {item.type === "course" ? "📚" : "📖"}
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-gray-500">
                            {item.type === "course" ? "Course" : "Material"}
                          </span>
                          <span className="text-xs text-gray-300">•</span>
                          <div className="flex items-center gap-0.5">
                            <span className="text-xs text-yellow-500">★</span>
                            <span className="text-xs text-gray-600">
                              {item.rating}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          {item.isFree ? (
                            <span className="text-sm font-bold text-green-600">
                              Free
                            </span>
                          ) : (
                            <div>
                              <span className="text-sm font-bold text-gray-900">
                                ${item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-gray-400 line-through ml-1">
                                  ${item.originalPrice}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <button className="w-full mt-2 py-1.5 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
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

                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount ({promoDiscount}%)</span>
                        <span>-${promoDiscountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-red-600">${total}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Including VAT
                      </p>
                    </div>
                  </div>

                  {/* Savings */}
                  {Number(savings) > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <Tag className="w-4 h-4" />
                        <span>You save ${savings}!</span>
                      </div>
                    </div>
                  )}

                  {/* Promo Code */}
                  <div className="mt-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                      <button
                        onClick={applyPromoCode}
                        disabled={isApplyingPromo}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
                      >
                        {isApplyingPromo ? "..." : "Apply"}
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {promoError}
                      </p>
                    )}
                    {promoSuccess && (
                      <p className="text-xs text-green-600 mt-1">
                        {promoSuccess}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-400">
                        Try: WELCOME10, SAVE20, IELTS15
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || cartItems.length === 0}
                    className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Proceed to Checkout
                      </>
                    )}
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span>30-Day Guarantee</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>Instant Access</span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-3">
                      <span className="text-2xl">💳</span>
                      <span className="text-2xl">🖱️</span>
                      <span className="text-2xl">⚡</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
