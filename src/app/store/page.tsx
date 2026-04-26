"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Check, Plus, Minus, CreditCard, Banknote, ArrowRight, Package, ChevronLeft, ChevronRight, Play, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface MediaItem {
  type: "image" | "video";
  url: string;
}

export default function StorePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart, cartCount } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageProduct, setSelectedImageProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [actionType, setActionType] = useState<"cart" | "buy">("buy");
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
    if (!isAuthenticated) {
      setActionType("buy");
      setShowLoginPrompt(true);
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("");
    setShowModal(true);
  };

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      setActionType("cart");
      setShowLoginPrompt(true);
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("");
    setShowModal(true);
  };

  const handleAddToCartSubmit = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const media: MediaItem[] = selectedProduct.media || [{ type: "image", url: selectedProduct.image }];
    const mainImage = media.find(m => m.type === "image")?.url || media[0].url;

    addToCart({
      productId: selectedProduct._id,
      title: selectedProduct.title,
      price: selectedProduct.price,
      image: mainImage,
      quantity,
      size: selectedSize,
    });

    setShowModal(false);
    setShowCartSuccess(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowCartSuccess(false);
    }, 3000);
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
        setFormData({
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

  // Product Card Component with Carousel
  const ProductCard = ({ product, index }: { product: any; index: number }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const media: MediaItem[] = product.media || [{ type: "image", url: product.image }];

    const nextMedia = () => {
      setCurrentMediaIndex((prev) => (prev + 1) % media.length);
    };

    const prevMedia = () => {
      setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const handleImageClick = () => {
      setSelectedImageProduct(product);
      setCurrentImageIndex(currentMediaIndex);
      setShowImageModal(true);
    };

    return (
      <motion.div
        key={product._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
      >
        <div className="relative h-64 bg-gray-100 group cursor-pointer" onClick={handleImageClick}>
          {/* Media Display */}
          {media[currentMediaIndex].type === "image" ? (
            <Image
              src={media[currentMediaIndex].url}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : (
            <video
              src={media[currentMediaIndex].url}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              autoPlay
            />
          )}

          {/* Carousel Controls */}
          {media.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevMedia();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextMedia();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {media.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMediaIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentMediaIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Media Type Badge */}
          {media[currentMediaIndex].type === "video" && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded flex items-center gap-1">
              <Play className="w-3 h-3" />
              Video
            </div>
          )}
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
          <div className="flex gap-3">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-poppins font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(product)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-poppins font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <ShoppingBag className="w-5 h-5" />
              Buy Now
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

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
              className="flex items-center justify-center gap-3 mb-4"
            >
              <ShoppingBag className="w-12 h-12" />
              <h1 className="font-poetsen text-5xl md:text-6xl">
                Merchandise Store
              </h1>
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
              Every purchase helps us rescue and care for animals in need
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
                <ProductCard key={product._id} product={product} index={index} />
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

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleAddToCartSubmit}
                      disabled={!selectedSize}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedSize}
                      className="flex-1 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Buy Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
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

        {/* Login Prompt Modal */}
        <AnimatePresence>
          {showLoginPrompt && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="font-poppins text-2xl font-bold text-gray-800 mb-2">
                  {actionType === "cart" ? "Login to Add to Cart" : "Login to Continue"}
                </h3>
                <p className="font-poppins text-gray-600 mb-6">
                  Please login or create an account to {actionType === "cart" ? "add items to your cart" : "purchase products"}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-semibold py-3 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <Link
                    href="/login"
                    className="flex-1 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all text-center"
                  >
                    Login
                  </Link>
                </div>
                
                <p className="font-poppins text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary font-semibold hover:underline">
                    Sign Up
                  </Link>
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Cart Success Popup - Flipkart Style */}
        <AnimatePresence>
          {showCartSuccess && selectedProduct && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-24 right-4 z-50 bg-white rounded-xl shadow-2xl border-2 border-green-500 max-w-sm w-full"
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins text-lg font-bold text-gray-800 mb-1">
                      Added to Cart!
                    </h3>
                    <p className="font-poppins text-sm text-gray-600">
                      {selectedProduct.title} ({selectedSize})
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCartSuccess(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/user/dashboard"
                    onClick={() => setShowCartSuccess(false)}
                    className="flex-1 bg-white border-2 border-primary text-primary font-poppins font-semibold py-2.5 rounded-lg transition-all hover:bg-orange-50 text-center"
                  >
                    View Cart ({cartCount})
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setShowCartSuccess(false)}
                    className="flex-1 bg-primary text-white font-poppins font-semibold py-2.5 rounded-lg transition-all hover:bg-orange-600 text-center"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Lightbox Modal */}
        <AnimatePresence>
          {showImageModal && selectedImageProduct && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-7xl w-full h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section */}
                  <div className="flex-1 relative bg-gray-100 flex items-center justify-center p-4 md:p-8 min-h-[400px] md:min-h-[600px]">
                    {(() => {
                      const media: MediaItem[] = selectedImageProduct.media || [{ type: "image", url: selectedImageProduct.image }];
                      const currentMedia = media[currentImageIndex];
                      
                      return currentMedia.type === "image" ? (
                        <div className="relative w-full h-full max-h-[600px]">
                          <Image
                            src={currentMedia.url}
                            alt={selectedImageProduct.title}
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
                      ) : (
                        <video
                          src={currentMedia.url}
                          className="max-w-full max-h-[600px] w-auto h-auto"
                          controls
                          autoPlay
                          loop
                        />
                      );
                    })()}

                    {/* Navigation Arrows */}
                    {(() => {
                      const media: MediaItem[] = selectedImageProduct.media || [{ type: "image", url: selectedImageProduct.image }];
                      return media.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + media.length) % media.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg"
                          >
                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % media.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg"
                          >
                            <ChevronRight className="w-6 h-6 text-gray-800" />
                          </button>
                        </>
                      );
                    })()}
                  </div>

                  {/* Product Info Section */}
                  <div className="w-full md:w-96 p-6 overflow-y-auto">
                    <h2 className="font-poppins text-2xl font-bold text-gray-800 mb-3">
                      {selectedImageProduct.title}
                    </h2>
                    <p className="font-poppins text-3xl font-bold text-primary mb-4">
                      ₹{selectedImageProduct.price.toLocaleString()}
                    </p>
                    <p className="font-poppins text-gray-600 mb-6">
                      {selectedImageProduct.description}
                    </p>

                    {/* Thumbnail Gallery */}
                    {(() => {
                      const media: MediaItem[] = selectedImageProduct.media || [{ type: "image", url: selectedImageProduct.image }];
                      return media.length > 1 && (
                        <div className="mb-6">
                          <p className="font-poppins text-sm font-semibold text-gray-700 mb-2">
                            All Images ({media.length})
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {media.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`relative h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                                  idx === currentImageIndex
                                    ? "border-primary"
                                    : "border-transparent hover:border-gray-300"
                                }`}
                              >
                                {item.type === "image" ? (
                                  <Image
                                    src={item.url}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="relative w-full h-full">
                                    <video
                                      src={item.url}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <Play className="w-6 h-6 text-white" />
                                    </div>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowImageModal(false);
                          handleAddToCart(selectedImageProduct);
                        }}
                        className="flex-1 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-poppins font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          setShowImageModal(false);
                          handleBuyNow(selectedImageProduct);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-poppins font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <SiteFooter />
    </>
  );
}
