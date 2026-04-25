"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Banknote, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    company: "",
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    email: user?.email || "",
    orderNotes: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      router.push("/user/dashboard");
      return;
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, [isAuthenticated, cart]);

  const handlePaymentMethod = async (method: "COD" | "Online") => {
    if (method === "COD") {
      await createOrders(method, null, null);
    } else {
      await initiateRazorpayPayment();
    }
  };

  const initiateRazorpayPayment = async () => {
    setSubmitting(true);
    try {
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          type: "product",
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert("Failed to create payment order");
        setSubmitting(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Rescue Routes",
        description: "Product Purchase",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          const verifyResponse = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              type: "product",
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            await createOrders("Online", response.razorpay_payment_id, response.razorpay_order_id);
          } else {
            alert("Payment verification failed");
            setSubmitting(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#F97316",
        },
        modal: {
          ondismiss: function() {
            setSubmitting(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment");
      setSubmitting(false);
    }
  };

  const createOrders = async (paymentMethod: string, paymentId: string | null, orderId: string | null) => {
    setSubmitting(true);
    try {
      const orderPromises = cart.map((item) =>
        fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            productId: item.productId,
            productName: item.title,
            productPrice: item.price,
            quantity: item.quantity,
            size: item.size,
            paymentMethod,
            razorpayPaymentId: paymentId,
            razorpayOrderId: orderId,
            paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
          }),
        })
      );

      const responses = await Promise.all(orderPromises);
      const results = await Promise.all(responses.map((r) => r.json()));

      // Log any failed orders for debugging
      const failedOrders = results.filter((r) => !r.success);
      if (failedOrders.length > 0) {
        console.error("Failed orders:", failedOrders);
        alert(`Some orders failed: ${failedOrders.map(r => r.error).join(", ")}`);
        setSubmitting(false);
        return;
      }

      if (results.every((r) => r.success)) {
        clearCart();
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/user/dashboard");
        }, 3000);
      } else {
        alert("Some orders failed to process");
      }
    } catch (error) {
      console.error("Error placing orders:", error);
      alert("Error placing orders. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated || cart.length === 0) {
    return null;
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>

          <h3 className="font-fredoka text-2xl text-gray-800 mb-3">
            Orders Placed Successfully!
          </h3>
          <p className="font-poppins text-gray-600 mb-6">
            Redirecting to your dashboard...
          </p>

          <div className="flex gap-2 justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [-10, 0] }}
                transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                className="text-2xl"
              >
                🐾
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 pt-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary font-poppins mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Billing Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-poppins text-2xl font-bold text-gray-800 mb-6">
                Billing Details
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Apartment, Suite, etc. (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Pin Code *
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    rows={3}
                  />
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="font-poppins text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-poppins text-sm font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        {item.size && (
                          <p className="font-poppins text-xs text-gray-600">Size: {item.size}</p>
                        )}
                        <p className="font-poppins text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-poppins text-sm font-bold text-gray-800">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-poppins text-sm text-gray-600">Subtotal:</span>
                    <span className="font-poppins text-sm font-semibold text-gray-800">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-poppins text-sm text-gray-600">Shipping:</span>
                    <span className="font-poppins text-sm font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <span className="font-poppins text-lg font-bold text-gray-800">Total:</span>
                    <span className="font-poppins text-2xl font-bold text-primary">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handlePaymentMethod("Online")}
                    disabled={submitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay Online (Razorpay)
                  </button>

                  <button
                    onClick={() => handlePaymentMethod("COD")}
                    disabled={submitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Banknote className="w-5 h-5" />
                        Cash on Delivery
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
