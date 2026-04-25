"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Package, ShoppingCart, User, LogOut, ChevronRight, Trash2, Plus, Minus, X, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<"products" | "cart" | "orders">("products");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [actionType, setActionType] = useState<"cart" | "buy">("cart");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProducts();
    fetchOrders();
  }, [isAuthenticated]);

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

  const fetchOrders = async () => {
    if (!user?.email) return;
    
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setActionType("cart");
    setQuantity(1);
    setSelectedSize("");
    setShowModal(true);
  };

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setActionType("buy");
    setQuantity(1);
    setSelectedSize("");
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const media: MediaItem[] = selectedProduct.media || [{ type: "image", url: selectedProduct.image }];
    const mainImage = media.find((m: MediaItem) => m.type === "image")?.url || media[0].url;

    if (actionType === "cart") {
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
    } else {
      // Buy now - add to cart and go to checkout
      addToCart({
        productId: selectedProduct._id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: mainImage,
        quantity,
        size: selectedSize,
      });
      setShowModal(false);
      router.push("/checkout");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-orange-600 text-white py-12 pt-28">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-poetsen text-4xl mb-2">My Dashboard</h1>
                <p className="font-poppins text-white/90">
                  Welcome back, {user?.firstName || user?.email}!
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2 border border-white/30"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container mx-auto px-4 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Cart Items</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{cart.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Total Orders</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{orders.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Cart Total</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">₹{cartTotal.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("products")}
                className={`flex-1 px-6 py-4 font-poppins font-semibold transition-all ${
                  activeTab === "products"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ShoppingBag className="w-5 h-5 inline-block mr-2" />
                Products
              </button>
              <button
                onClick={() => setActiveTab("cart")}
                className={`flex-1 px-6 py-4 font-poppins font-semibold transition-all relative ${
                  activeTab === "cart"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ShoppingCart className="w-5 h-5 inline-block mr-2" />
                My Cart
                {cart.length > 0 && (
                  <span className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex-1 px-6 py-4 font-poppins font-semibold transition-all ${
                  activeTab === "orders"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Package className="w-5 h-5 inline-block mr-2" />
                My Orders
              </button>
            </div>

            <div className="p-6">
              {/* Products Tab */}
              {activeTab === "products" && (
                <div>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <div
                          key={product._id}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                        >
                          <div className="relative h-48 bg-gray-100">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
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
                                className="flex-1 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-poppins font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                              >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                              </button>
                              <button
                                onClick={() => handleBuyNow(product)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-poppins font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                              >
                                <ShoppingBag className="w-5 h-5" />
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="font-poppins text-gray-500">No products available</p>
                    </div>
                  )}
                </div>
              )}

              {/* Cart Tab */}
              {activeTab === "cart" && (
                <div>
                  {cart.length > 0 ? (
                    <div className="space-y-6">
                      {cart.map((item, index) => (
                        <motion.div
                          key={`${item.productId}-${item.size}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-4 bg-gray-50 rounded-xl p-4"
                        >
                          <div className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-1">
                              {item.title}
                            </h3>
                            {item.size && (
                              <p className="font-poppins text-sm text-gray-600 mb-2">
                                Size: {item.size}
                              </p>
                            )}
                            <p className="font-poppins text-xl font-bold text-primary">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button
                              onClick={() => removeFromCart(item.productId, item.size)}
                              className="text-red-600 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size)}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-all"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-poppins text-lg font-semibold text-gray-800 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size)}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-all"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-poppins text-xl font-semibold text-gray-800">Total:</span>
                          <span className="font-poppins text-3xl font-bold text-primary">
                            ₹{cartTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => clearCart()}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-semibold py-4 rounded-lg transition-all"
                          >
                            Clear Cart
                          </button>
                          <button
                            onClick={handleCheckout}
                            className="flex-1 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                          >
                            Proceed to Checkout
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="font-poppins text-gray-500 mb-4">Your cart is empty</p>
                      <button
                        onClick={() => setActiveTab("products")}
                        className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all"
                      >
                        Browse Products
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order, index) => (
                        <motion.div
                          key={order._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 rounded-xl p-6"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-1">
                                {order.productName}
                              </h3>
                              <p className="font-poppins text-sm text-gray-600">
                                Order ID: {order._id}
                              </p>
                              <p className="font-poppins text-sm text-gray-600">
                                Date: {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-poppins text-2xl font-bold text-primary mb-2">
                                ₹{(order.productPrice * order.quantity).toLocaleString()}
                              </p>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-poppins font-semibold ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-poppins text-gray-600">Quantity: {order.quantity}</p>
                              {order.size && <p className="font-poppins text-gray-600">Size: {order.size}</p>}
                            </div>
                            <div>
                              <p className="font-poppins text-gray-600">Payment: {order.paymentMethod}</p>
                              <p className="font-poppins text-gray-600">Status: {order.paymentStatus}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="font-poppins text-gray-500 mb-4">No orders yet</p>
                      <button
                        onClick={() => setActiveTab("products")}
                        className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Size Selection Modal */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-poppins text-2xl font-bold text-gray-800">
                  Select Size
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex gap-4 mb-6">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-2">
                      {selectedProduct.title}
                    </h3>
                    <p className="font-poppins text-2xl font-bold text-primary">
                      ₹{selectedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-4">
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Select Size:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 border rounded-lg font-poppins text-sm font-medium transition-all ${
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
                <div className="flex items-center gap-3 mb-6">
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

                <button
                  onClick={handleModalSubmit}
                  disabled={!selectedSize}
                  className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionType === "cart" ? (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Buy Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                {!selectedSize && (
                  <p className="text-center text-sm text-red-600 font-poppins">
                    Please select a size to continue
                  </p>
                )}
              </div>
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
                <button
                  onClick={() => {
                    setShowCartSuccess(false);
                    setActiveTab("cart");
                  }}
                  className="flex-1 bg-white border-2 border-primary text-primary font-poppins font-semibold py-2.5 rounded-lg transition-all hover:bg-orange-50"
                >
                  View Cart ({cart.length})
                </button>
                <button
                  onClick={() => {
                    setShowCartSuccess(false);
                    router.push("/checkout");
                  }}
                  className="flex-1 bg-primary text-white font-poppins font-semibold py-2.5 rounded-lg transition-all hover:bg-orange-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </>
  );
}
