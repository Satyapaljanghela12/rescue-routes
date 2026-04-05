"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VolunteerSidebar from "@/components/volunteer/VolunteerSidebar";
import VolunteerTopNav from "@/components/volunteer/VolunteerTopNav";
import { MapPin, Clock, AlertCircle, CheckCircle, X, Users } from "lucide-react";

export default function RescueAlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [stats, setStats] = useState({
    openAlerts: 0,
    urgentCases: 0,
    yourResponses: 12,
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/rescue-alerts");
      const data = await response.json();

      if (data.success) {
        const rescueAlerts = data.alerts || [];
        setAlerts(rescueAlerts);

        // Calculate stats
        const activeCount = rescueAlerts.filter((a: any) => a.status === "Active").length;
        const urgentCount = rescueAlerts.filter((a: any) => a.urgency === "High").length;

        setStats({
          openAlerts: activeCount,
          urgentCases: urgentCount,
          yourResponses: 12, // TODO: Track actual volunteer responses
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setLoading(false);
    }
  };

  const handleAcceptTask = async (alertId: string) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);
      
      // Find the alert details
      const alertItem = alerts.find(a => a._id === alertId);
      if (!alertItem) return;

      // Check if volunteer already accepted this alert
      const alreadyAccepted = alertItem.acceptedVolunteers?.some(
        (v: any) => v.volunteerEmail === user.email
      );

      if (alreadyAccepted) {
        setSuccessMessage("You have already accepted this task!");
        setShowSuccessModal(true);
        return;
      }

      // Add volunteer to alert's acceptedVolunteers array
      await fetch("/api/rescue-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "accept",
          alertId,
          volunteerId: user._id || user.email,
          volunteerName: user.name,
          volunteerEmail: user.email,
          volunteerPhone: user.phone,
        }),
      });

      // Create rescue case with volunteer details
      const response = await fetch("/api/rescue-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animalType: alertItem.animalType,
          location: alertItem.location,
          description: alertItem.description,
          medicalUpdates: alertItem.contactPerson ? `Contact: ${alertItem.contactPerson}${alertItem.contactPhone ? ' - ' + alertItem.contactPhone : ''}` : "",
          assignedVolunteer: user._id || user.email,
          volunteerName: user.name,
          volunteerEmail: user.email,
          volunteerPhone: user.phone,
          status: "In Progress",
          alertId: alertId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Send email to volunteer
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: user.email,
            subject: "Rescue Task Assignment - Rescue Routes",
            alertDetails: {
              title: alertItem.title,
              animalType: alertItem.animalType,
              location: alertItem.location,
              description: alertItem.description,
              urgency: alertItem.urgency,
              contactPerson: alertItem.contactPerson,
              contactPhone: alertItem.contactPhone,
            },
            volunteerDetails: {
              name: user.name,
              email: user.email,
              phone: user.phone,
            },
          }),
        });

        setSuccessMessage(`Task accepted! Check your email (${user.email}) for complete details.`);
        setShowSuccessModal(true);
        // Refresh alerts
        fetchAlerts();
      } else {
        setSuccessMessage(data.error || "Failed to accept task");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error accepting task:", error);
      setSuccessMessage("Error accepting task. Please try again.");
      setShowSuccessModal(true);
    }
  };

  const handleViewLocation = (location: string) => {
    // Open Google Maps with the location
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, "_blank");
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
    <div className="flex min-h-screen bg-gray-50">
      <VolunteerSidebar />
      
      <div className="flex-1 ml-64">
        <VolunteerTopNav />
        
        <main className="pt-24 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Rescue Alerts
            </h1>
            <p className="font-poppins text-gray-600">
              Respond to urgent rescue requests in your area
            </p>
          </div>

          {/* Alert Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 text-primary rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Open Alerts</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.openAlerts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Urgent Cases</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.urgentCases}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Your Responses</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.yourResponses}</p>
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
              {alerts.map((alert, index) => {
                const userStr = localStorage.getItem("user");
                const user = userStr ? JSON.parse(userStr) : null;
                const hasAccepted = alert.acceptedVolunteers?.some(
                  (v: any) => v.volunteerEmail === user?.email
                );
                const volunteerCount = alert.acceptedVolunteers?.length || 0;

                return (
                <motion.div
                  key={alert._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
                    alert.urgency === "High" ? "border-primary" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-poppins text-xl font-semibold text-gray-800">
                          {alert.title}
                        </h3>
                        {alert.urgency === "High" && (
                          <span className="px-3 py-1 bg-primary text-white text-xs font-poppins font-bold rounded-full">
                            URGENT
                          </span>
                        )}
                        <span className={`px-3 py-1 text-xs font-poppins font-semibold rounded-full ${
                          alert.status === "Active" ? "bg-green-100 text-green-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {alert.status}
                        </span>
                        {hasAccepted && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-poppins font-bold rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            You Accepted
                          </span>
                        )}
                      </div>
                      
                      <p className="font-poppins text-sm text-gray-600 mb-3">
                        <span className="font-semibold">Animal:</span> {alert.animalType}
                      </p>

                      <p className="font-poppins text-gray-600 mb-4">
                        {alert.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm mb-3 flex-wrap">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-poppins font-medium">{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="font-poppins">{getTimeAgo(alert.createdAt)}</span>
                        </div>
                        {volunteerCount > 0 && (
                          <div className="flex items-center gap-2 text-primary">
                            <Users className="w-4 h-4" />
                            <span className="font-poppins font-semibold">
                              {volunteerCount} volunteer{volunteerCount > 1 ? 's' : ''} accepted
                            </span>
                          </div>
                        )}
                      </div>

                      {alert.contactPerson && (
                        <div className="text-sm text-gray-600 mb-3">
                          <span className="font-poppins font-semibold">Contact:</span>{" "}
                          <span className="font-poppins">{alert.contactPerson}</span>
                          {alert.contactPhone && (
                            <span className="font-poppins"> - {alert.contactPhone}</span>
                          )}
                        </div>
                      )}

                      {/* Show other volunteers who accepted */}
                      {volunteerCount > 0 && alert.acceptedVolunteers && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="font-poppins text-xs font-semibold text-gray-700 mb-2">
                            Volunteers on this task:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {alert.acceptedVolunteers.map((vol: any, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-poppins text-gray-700"
                              >
                                {vol.volunteerName}
                                {vol.volunteerEmail === user?.email && " (You)"}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <button
                        onClick={() => handleAcceptTask(alert._id)}
                        disabled={alert.status !== "Active" || hasAccepted}
                        className={`px-6 py-3 font-poppins font-semibold rounded-lg transition-all ${
                          hasAccepted
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : alert.status !== "Active"
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-primary hover:bg-orange-600 text-white hover:scale-105"
                        }`}
                      >
                        {hasAccepted ? "Accepted" : alert.status !== "Active" ? "Closed" : "Accept Task"}
                      </button>
                      <button
                        onClick={() => handleViewLocation(alert.location)}
                        className="px-6 py-3 border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-poppins font-medium rounded-lg transition-all"
                      >
                        View Location
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-poppins text-xl font-semibold text-gray-800 mb-2">
                No Rescue Alerts
              </h3>
              <p className="font-poppins text-gray-600">
                There are no rescue alerts at the moment. Check back later!
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-poppins text-2xl font-bold text-gray-800 text-center mb-3"
              >
                Task Accepted! 🎉
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-poppins text-gray-600 text-center mb-6 leading-relaxed"
              >
                {successMessage}
              </motion.p>

              {/* Paw Prints */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-2 mb-6"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                      <circle cx="12" cy="16" r="2" />
                      <circle cx="8" cy="12" r="1.5" />
                      <circle cx="16" cy="12" r="1.5" />
                      <circle cx="10" cy="8" r="1" />
                      <circle cx="14" cy="8" r="1" />
                    </svg>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all"
              >
                Got it!
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
