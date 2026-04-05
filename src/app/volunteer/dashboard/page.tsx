"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VolunteerSidebar from "@/components/volunteer/VolunteerSidebar";
import VolunteerTopNav from "@/components/volunteer/VolunteerTopNav";
import { Heart, Calendar, Clock, AlertCircle, ArrowRight, MapPin, CheckCircle, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VolunteerDashboard() {
  const [stats, setStats] = useState({
    rescuesParticipated: 0,
    eventsJoined: 0,
    hoursContributed: 0,
  });
  const [recentAlerts, setRecentAlerts] = useState<any[]>([]);
  const [myCampaigns, setMyCampaigns] = useState<any[]>([]);
  const [myRescueCases, setMyRescueCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      // Fetch rescue alerts
      const alertsRes = await fetch("/api/rescue-alerts");
      const alertsData = await alertsRes.json();
      
      // Get only active alerts, sorted by date
      const activeAlerts = alertsData.alerts
        ?.filter((a: any) => a.status === "Active")
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3) || [];

      setRecentAlerts(activeAlerts);

      // Fetch approved campaign requests for this volunteer
      if (user) {
        const requestsRes = await fetch("/api/campaign-requests");
        const requestsData = await requestsRes.json();
        
        const approvedCampaigns = requestsData.requests
          ?.filter((r: any) => r.volunteerEmail === user.email && r.status === "Approved") || [];
        
        setMyCampaigns(approvedCampaigns);

        // Fetch rescue cases assigned to this volunteer
        const casesRes = await fetch("/api/rescue-cases");
        const casesData = await casesRes.json();
        
        const myCases = (casesData.cases || casesData.rescueCases || [])
          .filter((c: any) => c.volunteerEmail === user.email)
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        setMyRescueCases(myCases);

        // Calculate real stats from actual participation
        const rescuesParticipated = myCases.length;
        const eventsJoined = approvedCampaigns.length;
        
        // Calculate hours contributed (estimate: 2 hours per rescue case)
        const hoursContributed = rescuesParticipated * 2;

        setStats({
          rescuesParticipated,
          eventsJoined,
          hoursContributed,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const handleAcceptTask = async (alertId: string) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);
      
      // Find the alert details
      const alertItem = recentAlerts.find(a => a._id === alertId);
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
        fetchDashboardData();
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

  const handleUpdateCaseStatus = async (caseId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/rescue-cases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Case status updated to ${newStatus}!`);
        setShowSuccessModal(true);
        // Refresh dashboard data
        fetchDashboardData();
      } else {
        setSuccessMessage("Failed to update status");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error updating case status:", error);
      setSuccessMessage("Error updating status. Please try again.");
      setShowSuccessModal(true);
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

  const statsConfig = [
    { label: "Rescues Participated", value: stats.rescuesParticipated.toString(), icon: Heart, color: "bg-orange-50 text-primary" },
    { label: "Events Joined", value: stats.eventsJoined.toString(), icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Hours Contributed", value: stats.hoursContributed.toString(), icon: Clock, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VolunteerSidebar />
      
      <div className="flex-1 ml-64">
        <VolunteerTopNav />
        
        <main className="pt-24 p-8">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Welcome back! 👋
            </h1>
            <p className="font-poppins text-gray-600">
              Ready to make a difference today? 🐾
            </p>
          </motion.div>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statsConfig.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-gray-600">{stat.label}</p>
                      <p className="font-poppins text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <h2 className="font-poppins text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/volunteer/alerts"
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <span className="font-poppins font-medium text-gray-800">View Alerts</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/volunteer/campaigns"
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="font-poppins font-medium text-gray-800">Join Campaign</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/volunteer/profile"
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-poppins font-medium text-gray-800">Update Profile</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins text-lg font-semibold text-gray-800">
                Recent Rescue Alerts
              </h2>
              <Link
                href="/volunteer/alerts"
                className="font-poppins text-sm text-primary hover:text-orange-600 font-medium"
              >
                View All
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-lg border-2 border-gray-200 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentAlerts.length > 0 ? (
              <div className="space-y-4">
                {recentAlerts.map((alert) => {
                  const userStr = localStorage.getItem("user");
                  const user = userStr ? JSON.parse(userStr) : null;
                  const hasAccepted = alert.acceptedVolunteers?.some(
                    (v: any) => v.volunteerEmail === user?.email
                  );
                  const volunteerCount = alert.acceptedVolunteers?.length || 0;

                  return (
                  <div
                    key={alert._id}
                    className={`p-4 rounded-lg border-2 ${
                      alert.urgency === "High"
                        ? "border-primary bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-poppins font-semibold text-gray-800">
                            {alert.title}
                          </h3>
                          {alert.urgency === "High" && (
                            <span className="px-2 py-1 bg-primary text-white text-xs font-poppins font-bold rounded">
                              URGENT
                            </span>
                          )}
                          {hasAccepted && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-poppins font-bold rounded flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Accepted
                            </span>
                          )}
                        </div>
                        <p className="font-poppins text-sm text-gray-600 mb-2">
                          {alert.animalType} - {alert.description?.substring(0, 80)}...
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="font-poppins">{alert.location}</span>
                          </div>
                          <span className="font-poppins">{getTimeAgo(alert.createdAt)}</span>
                        </div>
                        {volunteerCount > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-poppins text-gray-600">
                              {volunteerCount} volunteer{volunteerCount > 1 ? 's' : ''} accepted
                            </span>
                            {volunteerCount > 1 && !hasAccepted && (
                              <span className="font-poppins text-primary text-xs">
                                (Join them!)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleAcceptTask(alert._id)}
                        disabled={hasAccepted}
                        className={`px-4 py-2 font-poppins font-medium text-sm rounded-lg transition-all ${
                          hasAccepted
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-primary hover:bg-orange-600 text-white"
                        }`}
                      >
                        {hasAccepted ? "Accepted" : "Accept Task"}
                      </button>
                    </div>
                  </div>
                );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-poppins text-gray-500">No rescue alerts at the moment</p>
                <p className="font-poppins text-sm text-gray-400 mt-2">Check back later for new rescue opportunities</p>
              </div>
            )}
          </motion.div>

          {/* My Campaigns Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins text-lg font-semibold text-gray-800">
                My Campaigns
              </h2>
              <Link
                href="/volunteer/campaigns"
                className="font-poppins text-sm text-primary hover:text-orange-600 font-medium"
              >
                Browse More
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-200 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : myCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myCampaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="p-4 rounded-lg border-2 border-green-200 bg-green-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-poppins font-semibold text-gray-800">
                            {campaign.campaignTitle}
                          </h3>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-poppins font-bold rounded flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </span>
                        </div>
                        <p className="font-poppins text-xs text-gray-600 mb-2">
                          Joined on {new Date(campaign.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4 text-primary" />
                      <span className="font-poppins text-gray-700">
                        You're making a difference!
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-poppins text-gray-500">No approved campaigns yet</p>
                <p className="font-poppins text-sm text-gray-400 mt-2">
                  Join campaigns and wait for admin approval
                </p>
                <Link
                  href="/volunteer/campaigns"
                  className="inline-block mt-4 px-6 py-2 bg-primary hover:bg-orange-600 text-white font-poppins font-medium rounded-lg transition-all"
                >
                  Browse Campaigns
                </Link>
              </div>
            )}
          </motion.div>

          {/* My Rescue Cases Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins text-lg font-semibold text-gray-800">
                My Rescue Cases
              </h2>
              <Link
                href="/volunteer/activity"
                className="font-poppins text-sm text-primary hover:text-orange-600 font-medium"
              >
                View All
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-200 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : myRescueCases.length > 0 ? (
              <div className="space-y-4">
                {myRescueCases.slice(0, 5).map((rescueCase) => (
                  <div
                    key={rescueCase._id}
                    className="p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-primary transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-poppins font-semibold text-gray-800">
                            {rescueCase.animalType} Rescue
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                            rescueCase.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                            rescueCase.status === "In Treatment" ? "bg-yellow-100 text-yellow-700" :
                            rescueCase.status === "Recovered" ? "bg-green-100 text-green-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {rescueCase.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-poppins">{rescueCase.location}</span>
                        </div>
                        <p className="font-poppins text-sm text-gray-600 mb-2">
                          {rescueCase.description?.substring(0, 100)}...
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Accepted on {new Date(rescueCase.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Status Update Buttons */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleUpdateCaseStatus(rescueCase._id, "In Progress")}
                        disabled={rescueCase.status === "In Progress"}
                        className={`flex-1 py-2 px-3 rounded-lg font-poppins text-xs font-medium transition-all ${
                          rescueCase.status === "In Progress"
                            ? "bg-blue-100 text-blue-700 cursor-default"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleUpdateCaseStatus(rescueCase._id, "In Treatment")}
                        disabled={rescueCase.status === "In Treatment"}
                        className={`flex-1 py-2 px-3 rounded-lg font-poppins text-xs font-medium transition-all ${
                          rescueCase.status === "In Treatment"
                            ? "bg-yellow-100 text-yellow-700 cursor-default"
                            : "bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"
                        }`}
                      >
                        In Treatment
                      </button>
                      <button
                        onClick={() => handleUpdateCaseStatus(rescueCase._id, "Recovered")}
                        disabled={rescueCase.status === "Recovered"}
                        className={`flex-1 py-2 px-3 rounded-lg font-poppins text-xs font-medium transition-all ${
                          rescueCase.status === "Recovered"
                            ? "bg-green-100 text-green-700 cursor-default"
                            : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                      >
                        Recovered
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-poppins text-gray-500">No rescue cases assigned yet</p>
                <p className="font-poppins text-sm text-gray-400 mt-2">
                  Accept rescue alerts to start helping animals
                </p>
                <Link
                  href="/volunteer/alerts"
                  className="inline-block mt-4 px-6 py-2 bg-primary hover:bg-orange-600 text-white font-poppins font-medium rounded-lg transition-all"
                >
                  View Alerts
                </Link>
              </div>
            )}
          </motion.div>
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
