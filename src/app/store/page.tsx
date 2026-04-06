"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Check, Plus, Minus, CreditCard, Banknote, ArrowRight, Package } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function StorePage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("");
    setShowModal(true);
  };

  const handleProceedToBill = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setShowBillModal(true);
  };

  const handleProceedToPayment = () => {
    setShowBillModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentMethod = async (method: "COD" | "Online") => {
    if (method === "COD") {
      await createOrder(method, null, null);
    } else {
      await initiateRazorpayPayment();
    }
  };

  const initiateRazorpayPayment = async () => {
    setSubmitting(true);
    try {
      const totalAmount = selectedProduct.price * quantity;
      
      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
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
        description: `Purchase: ${selectedProduct.title}`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // Verify payment
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
            await createOrder("Online", response.razorpay_payment_id, response.razorpay_order_id);
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

  const createOrder = async (paymentMethod: string, paymentId: string | null, orderId: string | null) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: selectedProduct._id,
          productName: selectedProduct.title,
          productPrice: selectedProduct.price,
          quantity,
          size: selectedSize,
          paymentMethod,
          razorpayPaymentId: paymentId,
          razorpayOrderId: orderId,
          paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowPaymentModal(false);
        setShowSuccessModal(true);
        setFormData({ userName: "", email: "", phone: "", address: "" });
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push(`/my-orders?email=${encodeURIComponent(formData.email)}`);
        }, 3000);
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = selectedProduct ? selectedProduct.price * quantity : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-orange-600 text-white py-20 pt-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center gap-3 mb-4"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-12 h-12" />
                <h1 className="font-poetsen text-5xl md:text-6xl">
                  Merchandise Store
                </h1>
              </div>
              <Link
                href="/my-orders"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-poppins font-semibold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 border border-white/30"
              >
                <Package className="w-4 h-4" />
                My Orders
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-poppins text-lg md:text-xl max-w-2xl mx-auto opacity-90"
            >
              Support Our Cause Through Merchandise
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-poppins text-sm md:text-base max-w-xl mx-auto mt-2 opacity-80"
            >
              Every purchase helps us rescue and care for animals in need 🐾
            </motion.p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <p className="font-poppins text-2xl font-bold text-primary mb-3">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <p className="font-poppins text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-poppins text-gray-500">No products available yet</p>
            </div>
          )}
        </div>

        {/* Step 1: Order Details Modal */}
        <AnimatePresence>
          {showModal && selectedProduct && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-poppins text-2xl font-bold text-gray-800">
                    Order Details
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleProceedToBill} className="p-6 space-y-4 overflow-y-auto flex-1">
                  <div className="flex gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins text-xl font-semibold text-gray-800 mb-2">
                        {selectedProduct.title}
                      </h3>
                      <p className="font-poppins text-2xl font-bold text-primary mb-3">
                        ₹{selectedProduct.price.toLocaleString()}
                      </p>
                      
                      {/* Size Selector */}
                      <div className="mb-3">
                        <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                          Select Size:
                        </label>
                        <div className="flex gap-2">
                          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 border rounded-lg font-poppins text-sm font-medium transition-all ${
                                selectedSize === size
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <span className="font-poppins text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-poppins text-lg font-semibold text-gray-800 w-12 text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

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
                        placeholder="John"
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
                        placeholder="Doe"
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
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      placeholder="India"
                      required
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
                      placeholder="House number and street name"
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
                      placeholder="Apartment, suite, unit, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Town / City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                        placeholder="City"
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
                        placeholder="State"
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
                      placeholder="110001"
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
                      placeholder="+91 98765 43210"
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
                      placeholder="your@email.com"
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
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedSize}
                    className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Review
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  {!selectedSize && (
                    <p className="text-center text-sm text-red-600 font-poppins">
                      Please select a size to continue
                    </p>
                  )}
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Step 2: Bill Review Modal */}
        <AnimatePresence>
          {showBillModal && selectedProduct && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-poppins text-2xl font-bold text-gray-800">
                    Review Your Order
                  </h2>
                  <button
                    onClick={() => {
                      setShowBillModal(false);
                      setShowModal(true);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Product Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">
                      Product Details
                    </h3>
                    <div className="flex gap-4 mb-4">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={selectedProduct.image}
                          alt={selectedProduct.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-poppins text-base font-semibold text-gray-800">
                          {selectedProduct.title}
                        </p>
                        <p className="font-poppins text-sm text-gray-600">
                          ₹{selectedProduct.price.toLocaleString()} × {quantity}
                        </p>
                        {selectedSize && (
                          <p className="font-poppins text-sm text-gray-600">
                            Size: {selectedSize}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                      <span className="font-poppins text-base font-semibold text-gray-800">Total Amount:</span>
                      <span className="font-poppins text-2xl font-bold text-primary">
                        ₹{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">
                      Delivery Details
                    </h3>
                    <div className="space-y-2">
                      <p className="font-poppins text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Name:</span> {formData.firstName} {formData.lastName}
                      </p>
                      {formData.company && (
                        <p className="font-poppins text-sm text-gray-600">
                          <span className="font-medium text-gray-800">Company:</span> {formData.company}
                        </p>
                      )}
                      <p className="font-poppins text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Email:</span> {formData.email}
                      </p>
                      <p className="font-poppins text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Phone:</span> {formData.phone}
                      </p>
                      <p className="font-poppins text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Address:</span> {formData.streetAddress}
                        {formData.apartment && `, ${formData.apartment}`}, {formData.city}, {formData.state} - {formData.pinCode}, {formData.country}
                      </p>
                      {formData.orderNotes && (
                        <p className="font-poppins text-sm text-gray-600">
                          <span className="font-medium text-gray-800">Notes:</span> {formData.orderNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Step 3: Payment Method Modal */}
        <AnimatePresence>
          {showPaymentModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="font-poppins text-2xl font-bold text-gray-800">
                    Select Payment Method
                  </h2>
                  <p className="font-poppins text-sm text-gray-600 mt-1">
                    Total: ₹{totalAmount.toLocaleString()}
                  </p>
                </div>

                <div className="p-6 space-y-4">
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

                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setShowBillModal(true);
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-medium py-3 rounded-lg transition-all"
                  >
                    Go Back
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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
                  Order Placed Successfully!
                </h3>
                <p className="font-poppins text-gray-600 mb-6">
                  Redirecting to your orders page...
                </p>

                <div className="flex gap-2 justify-center mb-4">
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
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
