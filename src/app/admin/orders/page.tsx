"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Trash2, User, Phone, Mail, Package, Calendar, Search, MapPin, Eye, X, Edit, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: "",
    trackingId: "",
    courierName: "",
    estimatedDeliveryDate: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(
        (order) =>
          order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/orders?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        fetchOrders();
      } else {
        alert("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order");
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleOpenUpdateModal = (order: any) => {
    setSelectedOrder(order);
    setUpdateData({
      status: order.status || "Pending",
      trackingId: order.trackingId || "",
      courierName: order.courierName || "",
      estimatedDeliveryDate: order.estimatedDeliveryDate || "",
    });
    setShowUpdateModal(true);
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder._id,
          ...updateData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowUpdateModal(false);
        fetchOrders();
        alert("Order updated successfully!");
      } else {
        alert(data.error || "Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error updating order");
    } finally {
      setUpdating(false);
    }
  };

  const stats = {
    total: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.productPrice, 0),
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="mb-10">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Orders Management
            </h1>
            <p className="font-poppins text-gray-600">
              View and manage customer orders
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Total Orders</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Total Revenue</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or product..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Address</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-poppins font-bold text-blue-600">
                              {order.userName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-poppins text-sm font-medium text-gray-800">{order.userName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-poppins text-sm text-gray-600">
                          <div className="flex items-center gap-1 mb-1">
                            <Mail className="w-3 h-3" />
                            {order.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {order.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-poppins text-sm text-gray-600 max-w-xs">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{order.address || "N/A"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-800 font-medium">
                        <div>
                          <p>{order.productName}</p>
                          {order.size && (
                            <p className="text-xs text-gray-500">Size: {order.size}</p>
                          )}
                          {order.quantity && order.quantity > 1 && (
                            <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm font-semibold text-green-600">
                        <div>
                          <p>₹{order.productPrice?.toLocaleString()}</p>
                          {order.quantity && order.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              Total: ₹{(order.productPrice * order.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenUpdateModal(order)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-all"
                            title="Update Status & Tracking"
                          >
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => handleViewDetails(order)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(order._id)}
                            disabled={deletingId === order._id}
                            className="p-2 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {deletingId === order._id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-red-600" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="font-poppins text-gray-500">
                        {searchTerm ? "No orders found matching your search" : "No orders yet"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
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
                {/* Customer Information */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-poppins font-bold text-blue-600 text-lg">
                          {selectedOrder.userName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-poppins text-sm text-gray-500">Full Name</p>
                        <p className="font-poppins text-base font-semibold text-gray-800">
                          {selectedOrder.userName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-poppins text-sm text-gray-500">Email Address</p>
                        <p className="font-poppins text-base text-gray-800">{selectedOrder.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-poppins text-sm text-gray-500">Phone Number</p>
                        <p className="font-poppins text-base text-gray-800">{selectedOrder.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                      <div className="w-full">
                        <p className="font-poppins text-sm text-gray-500 mb-2">Delivery Address</p>
                        <div className="space-y-1">
                          {selectedOrder.streetAddress && (
                            <p className="font-poppins text-sm text-gray-800">
                              {selectedOrder.streetAddress}
                            </p>
                          )}
                          {selectedOrder.apartment && (
                            <p className="font-poppins text-sm text-gray-800">
                              {selectedOrder.apartment}
                            </p>
                          )}
                          {selectedOrder.city && selectedOrder.state && selectedOrder.pinCode && (
                            <p className="font-poppins text-sm text-gray-800">
                              {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pinCode}
                            </p>
                          )}
                          {selectedOrder.country && (
                            <p className="font-poppins text-sm text-gray-800">
                              {selectedOrder.country}
                            </p>
                          )}
                          {!selectedOrder.streetAddress && selectedOrder.address && (
                            <p className="font-poppins text-sm text-gray-800">
                              {selectedOrder.address}
                            </p>
                          )}
                        </div>
                        {selectedOrder.company && (
                          <p className="font-poppins text-xs text-gray-500 mt-2">
                            Company: {selectedOrder.company}
                          </p>
                        )}
                        {selectedOrder.orderNotes && (
                          <p className="font-poppins text-xs text-gray-500 mt-2">
                            Notes: {selectedOrder.orderNotes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Information */}
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
                    
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Price</p>
                      <p className="font-poppins text-2xl font-bold text-green-600">
                        ₹{selectedOrder.productPrice?.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="font-poppins text-sm text-gray-500">Order Status</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        {selectedOrder.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Order Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Order ID</p>
                      <p className="font-poppins text-base font-mono text-gray-800">
                        {selectedOrder._id}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-poppins text-sm text-gray-500">Order Date</p>
                      <p className="font-poppins text-base text-gray-800">
                        {new Date(selectedOrder.createdAt).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-semibold py-3 rounded-lg transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(selectedOrder._id);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-poppins font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Update Order Modal */}
      <AnimatePresence>
        {showUpdateModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-poppins text-2xl font-bold text-gray-800">
                  Update Order Status & Tracking
                </h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleUpdateOrder} className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-poppins text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Order ID:</span> {selectedOrder._id}
                  </p>
                  <p className="font-poppins text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Product:</span> {selectedOrder.productName}
                  </p>
                  <p className="font-poppins text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Customer:</span> {selectedOrder.userName}
                  </p>
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Order Status
                  </label>
                  <select
                    value={updateData.status}
                    onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Courier/Delivery Partner Name
                  </label>
                  <input
                    type="text"
                    value={updateData.courierName}
                    onChange={(e) => setUpdateData({ ...updateData, courierName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="e.g., Blue Dart, Delhivery, India Post"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Tracking ID
                  </label>
                  <input
                    type="text"
                    value={updateData.trackingId}
                    onChange={(e) => setUpdateData({ ...updateData, trackingId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="Enter tracking number"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Estimated Delivery Date
                  </label>
                  <input
                    type="date"
                    value={updateData.estimatedDeliveryDate}
                    onChange={(e) => setUpdateData({ ...updateData, estimatedDeliveryDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-semibold py-3 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Truck className="w-5 h-5" />
                        Update Order
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
