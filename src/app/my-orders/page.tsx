"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, Phone, Mail, Calendar, IndianRupee, Eye, X, Truck, RefreshCw } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Check if email is in URL params (from redirect after order)
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
      setSearchEmail(emailParam);
      fetchOrders(emailParam);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (userEmail: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSearchEmail(email);
      fetchOrders(email);
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleRefresh = () => {
    if (searchEmail) {
      fetchOrders(searchEmail);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
      case "out for delivery":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-orange-600 text-white py-16 pt-28">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Package className="w-12 h-12 mx-auto mb-4" />
              <h1 className="font-poetsen text-4xl md:text-5xl mb-3">
                My Orders
              </h1>
              <p className="font-poppins text-lg opacity-90">
                Track and view your order history
              </p>
            </motion.div>
          </div>
        </div>

        {/* Search Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to view orders"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-8 py-3 rounded-lg transition-all"
              >
                Search
              </button>
              {searchEmail && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-semibold px-4 py-3 rounded-lg transition-all flex items-center gap-2"
                  title="Refresh orders"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Orders List */}
        <div className="container mx-auto px-4 pb-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : searchEmail && orders.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-1">
                        {order.productName}
                      </h3>
                      <p className="font-poppins text-sm text-gray-500">
                        Order ID: {order._id}
                      </p>
                      {order.size && (
                        <p className="font-poppins text-sm text-gray-600">
                          Size: {order.size}
                        </p>
                      )}
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-poppins font-semibold text-gray-800">
                        ₹{order.productPrice?.toLocaleString()}
                      </span>
                      {order.quantity && order.quantity > 1 && (
                        <span className="text-gray-500">× {order.quantity}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="font-poppins">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span className="font-poppins font-medium">Payment:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      order.paymentMethod === "COD" 
                        ? "bg-orange-100 text-orange-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                    </span>
                    {order.paymentStatus && (
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        order.paymentStatus === "Paid" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.paymentStatus}
                      </span>
                    )}
                  </div>

                  {/* Tracking Info */}
                  {(order.trackingId || order.courierName || order.estimatedDeliveryDate) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <Truck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          {order.courierName && (
                            <p className="font-poppins text-sm text-blue-900 font-medium">
                              {order.courierName}
                            </p>
                          )}
                          {order.trackingId && (
                            <p className="font-poppins text-xs text-blue-700 font-mono">
                              Tracking: {order.trackingId}
                            </p>
                          )}
                          {order.estimatedDeliveryDate && (
                            <p className="font-poppins text-xs text-blue-700">
                              Est. Delivery: {new Date(order.estimatedDeliveryDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleViewDetails(order)}
                    className="w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-poppins font-medium px-6 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          ) : searchEmail ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-poppins text-gray-500">No orders found for this email</p>
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-poppins text-gray-500">Enter your email to view orders</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {showDetailsModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="font-poppins text-2xl font-bold text-gray-800">
                  Order Details
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Product Info */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Product Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Product Name</p>
                      <p className="font-poppins text-base font-semibold text-gray-800">
                        {selectedOrder.productName}
                      </p>
                      {selectedOrder.size && (
                        <p className="font-poppins text-sm text-gray-600 mt-1">
                          Size: {selectedOrder.size}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-poppins text-sm text-gray-500">Price</p>
                        <p className="font-poppins text-xl font-bold text-green-600">
                          ₹{selectedOrder.productPrice?.toLocaleString()}
                        </p>
                      </div>
                      {selectedOrder.quantity && (
                        <div>
                          <p className="font-poppins text-sm text-gray-500">Quantity</p>
                          <p className="font-poppins text-xl font-bold text-gray-800">
                            {selectedOrder.quantity}
                          </p>
                        </div>
                      )}
                    </div>
                    {selectedOrder.quantity && selectedOrder.quantity > 1 && (
                      <div>
                        <p className="font-poppins text-sm text-gray-500">Total Amount</p>
                        <p className="font-poppins text-2xl font-bold text-primary">
                          ₹{(selectedOrder.productPrice * selectedOrder.quantity).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Delivery Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Name</p>
                      <p className="font-poppins text-base text-gray-800">{selectedOrder.userName}</p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Email</p>
                      <p className="font-poppins text-base text-gray-800">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Phone</p>
                      <p className="font-poppins text-base text-gray-800">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Address</p>
                      <p className="font-poppins text-base text-gray-800 whitespace-pre-wrap">
                        {selectedOrder.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment & Status */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    Payment & Status
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Payment Method</p>
                      <p className="font-poppins text-base font-semibold text-gray-800">
                        {selectedOrder.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                      </p>
                    </div>
                    {selectedOrder.razorpayPaymentId && (
                      <div>
                        <p className="font-poppins text-sm text-gray-500">Payment ID</p>
                        <p className="font-poppins text-xs font-mono text-gray-800">
                          {selectedOrder.razorpayPaymentId}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Order Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status || "Pending"}
                      </span>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Order Date</p>
                      <p className="font-poppins text-base text-gray-800">
                        {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tracking Information */}
                {(selectedOrder.trackingId || selectedOrder.courierName || selectedOrder.estimatedDeliveryDate) && (
                  <div>
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Tracking Information
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                      {selectedOrder.courierName && (
                        <div>
                          <p className="font-poppins text-sm text-gray-500">Courier Partner</p>
                          <p className="font-poppins text-base font-semibold text-blue-900">
                            {selectedOrder.courierName}
                          </p>
                        </div>
                      )}
                      {selectedOrder.trackingId && (
                        <div>
                          <p className="font-poppins text-sm text-gray-500">Tracking ID</p>
                          <p className="font-poppins text-base font-mono text-blue-900">
                            {selectedOrder.trackingId}
                          </p>
                        </div>
                      )}
                      {selectedOrder.estimatedDeliveryDate && (
                        <div>
                          <p className="font-poppins text-sm text-gray-500">Estimated Delivery Date</p>
                          <p className="font-poppins text-base font-semibold text-blue-900">
                            {new Date(selectedOrder.estimatedDeliveryDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
