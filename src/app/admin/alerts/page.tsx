"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Plus, AlertCircle, MapPin, Clock, X } from "lucide-react";

export default function AdminAlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    animalType: "",
    location: "",
    description: "",
    urgency: "High",
    contactPerson: "",
    contactPhone: "",
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/rescue-alerts");
      const data = await response.json();

      if (data.success) {
        setAlerts(data.alerts || []);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/rescue-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Rescue alert created successfully!");
        setShowModal(false);
        setFormData({
          title: "",
          animalType: "",
          location: "",
          description: "",
          urgency: "High",
          contactPerson: "",
          contactPhone: "",
        });
        fetchAlerts();
      } else {
        alert(data.error || "Failed to create alert");
      }
    } catch (error) {
      console.error("Error creating alert:", error);
      alert("Error creating alert");
    }
  };

  const handleDelete = async (alertId: string) => {
    if (!confirm("Are you sure you want to delete this alert?")) return;

    try {
      const response = await fetch(`/api/rescue-alerts?id=${alertId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Alert deleted successfully!");
        fetchAlerts();
      } else {
        alert(data.error || "Failed to delete alert");
      }
    } catch (error) {
      console.error("Error deleting alert:", error);
      alert("Error deleting alert");
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
                Rescue Alerts
              </h1>
              <p className="font-poppins text-gray-600">
                Create and manage rescue alerts for volunteers
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Alert
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 text-primary rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Total Alerts</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{alerts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">High Priority</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">
                    {alerts.filter(a => a.urgency === "High").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Active Alerts</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">
                    {alerts.filter(a => a.status === "Active").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <motion.div
                  key={alert._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
                    alert.urgency === "High" ? "border-primary" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-poppins text-xl font-semibold text-gray-800">
                          {alert.title}
                        </h3>
                        {alert.urgency === "High" && (
                          <span className="px-3 py-1 bg-primary text-white text-xs font-poppins font-bold rounded-full">
                            URGENT
                          </span>
                        )}
                        <span className={`px-3 py-1 text-xs font-poppins font-semibold rounded-full ${
                          alert.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {alert.status}
                        </span>
                      </div>

                      <p className="font-poppins text-gray-600 mb-3">
                        <span className="font-semibold">Animal:</span> {alert.animalType}
                      </p>

                      <p className="font-poppins text-gray-600 mb-4">
                        {alert.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm mb-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-poppins font-medium">{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="font-poppins">{getTimeAgo(alert.createdAt)}</span>
                        </div>
                      </div>

                      {alert.contactPerson && (
                        <div className="text-sm text-gray-600">
                          <span className="font-poppins font-semibold">Contact:</span>{" "}
                          <span className="font-poppins">{alert.contactPerson}</span>
                          {alert.contactPhone && (
                            <span className="font-poppins"> - {alert.contactPhone}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(alert._id)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-poppins text-xl font-semibold text-gray-800 mb-2">
                No Rescue Alerts
              </h3>
              <p className="font-poppins text-gray-600 mb-6">
                Create your first rescue alert to notify volunteers
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all"
              >
                Create Alert
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Create Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="font-poppins text-2xl font-bold text-gray-800">Create Rescue Alert</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                  Alert Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                  placeholder="e.g., Injured dog needs immediate help"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Animal Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.animalType}
                    onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="e.g., Dog, Cat, Bird"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                  >
                    <option value="High">High - Urgent</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                  placeholder="e.g., Sector 21, Katara Hills"
                />
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                  placeholder="Describe the situation, animal condition, and any immediate needs..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-poppins font-medium rounded-lg transition-all hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all"
                >
                  Create Alert
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
