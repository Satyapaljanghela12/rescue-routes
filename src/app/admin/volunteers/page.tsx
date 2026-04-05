"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Check, X, Mail, Eye, User, Calendar, Award, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [rescueCases, setRescueCases] = useState<any[]>([]);
  const [campaignRequests, setCampaignRequests] = useState<any[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loadingVolunteerId, setLoadingVolunteerId] = useState<string | null>(null);

  useEffect(() => {
    fetchVolunteers();
    fetchRescueCases();
    fetchCampaignRequests();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await fetch("/api/volunteers");
      const data = await response.json();
      if (data.success) {
        setVolunteers(data.volunteers);
      }
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const fetchRescueCases = async () => {
    try {
      const response = await fetch("/api/rescue-cases");
      const data = await response.json();
      if (data.success) {
        setRescueCases(data.cases || data.rescueCases || []);
      }
    } catch (error) {
      console.error("Error fetching rescue cases:", error);
    }
  };

  const fetchCampaignRequests = async () => {
    try {
      const response = await fetch("/api/campaign-requests");
      const data = await response.json();
      if (data.success) {
        setCampaignRequests(data.requests || []);
      }
    } catch (error) {
      console.error("Error fetching campaign requests:", error);
    }
  };

  const updateVolunteerStatus = async (volunteerId: string, newStatus: string) => {
    setLoadingVolunteerId(volunteerId);
    try {
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        if (newStatus === "Approved") {
          alert("Volunteer approved successfully! An approval email has been sent.");
        } else {
          alert(`Volunteer status updated to ${newStatus}`);
        }
        fetchVolunteers();
      }
    } catch (error) {
      console.error("Error updating volunteer status:", error);
      alert("Failed to update volunteer status");
    } finally {
      setLoadingVolunteerId(null);
    }
  };

  const getVolunteerParticipation = (volunteerEmail: string) => {
    const rescueCount = rescueCases.filter(
      (rc) => rc.volunteerEmail === volunteerEmail
    ).length;
    
    const campaignCount = campaignRequests.filter(
      (cr) => cr.volunteerEmail === volunteerEmail && cr.status === "Approved"
    ).length;

    const recentActivity = rescueCases
      .filter((rc) => rc.volunteerEmail === volunteerEmail)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);

    return { rescueCount, campaignCount, recentActivity };
  };

  const handleViewDetails = (volunteer: any) => {
    const participation = getVolunteerParticipation(volunteer.email);
    setSelectedVolunteer({ ...volunteer, ...participation });
    setShowDetailsModal(true);
  };

  const stats = {
    total: volunteers.length,
    approved: volunteers.filter(v => v.status === "Approved").length,
    pending: volunteers.filter(v => v.status === "Pending").length,
    active: volunteers.filter(v => {
      const participation = getVolunteerParticipation(v.email);
      return participation.rescueCount > 0 || participation.campaignCount > 0;
    }).length,
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="mb-10">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Volunteer Management
            </h1>
            <p className="font-poppins text-gray-600">
              Manage volunteer applications, track participation, and view details
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Total Volunteers</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Approved</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.approved}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Pending</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Active</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.active}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Volunteer</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Participation</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => {
                  const participation = getVolunteerParticipation(volunteer.email);
                  return (
                  <tr key={volunteer._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-poppins font-bold text-primary">
                            {volunteer.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins text-sm font-medium text-gray-800">{volunteer.name}</p>
                          <p className="font-poppins text-xs text-gray-500">
                            Joined {new Date(volunteer.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-poppins text-sm">
                        <p className="text-gray-800">{volunteer.email}</p>
                        {volunteer.phone && (
                          <p className="text-gray-600 text-xs">📞 {volunteer.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">{volunteer.location || "N/A"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-primary" />
                          <span className="font-poppins text-sm font-semibold text-gray-800">
                            {participation.rescueCount}
                          </span>
                          <span className="font-poppins text-xs text-gray-500">rescues</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <span className="font-poppins text-sm font-semibold text-gray-800">
                            {participation.campaignCount}
                          </span>
                          <span className="font-poppins text-xs text-gray-500">campaigns</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                        volunteer.status === "Approved" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(volunteer)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        {volunteer.status !== "Approved" && (
                          <button 
                            onClick={() => updateVolunteerStatus(volunteer._id, "Approved")}
                            disabled={loadingVolunteerId === volunteer._id}
                            className="p-2 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
                            title="Approve"
                          >
                            {loadingVolunteerId === volunteer._id ? (
                              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Check className="w-4 h-4 text-green-600" />
                            )}
                          </button>
                        )}
                        {volunteer.status !== "Rejected" && (
                          <button 
                            onClick={() => updateVolunteerStatus(volunteer._id, "Rejected")}
                            disabled={loadingVolunteerId === volunteer._id}
                            className="p-2 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
                            title="Reject"
                          >
                            {loadingVolunteerId === volunteer._id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <X className="w-4 h-4 text-red-600" />
                            )}
                          </button>
                        )}
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Send Email">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Volunteer Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedVolunteer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-poppins font-bold text-2xl text-primary">
                      {selectedVolunteer.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-poppins text-2xl font-bold text-gray-800">{selectedVolunteer.name}</h2>
                    <p className="font-poppins text-sm text-gray-600">{selectedVolunteer.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Phone</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">
                        {selectedVolunteer.phone || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Location</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">
                        {selectedVolunteer.location || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Availability</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">
                        {selectedVolunteer.availability || "Not specified"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                        selectedVolunteer.status === "Approved" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {selectedVolunteer.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {selectedVolunteer.skills && selectedVolunteer.skills.length > 0 && (
                  <div>
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVolunteer.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-poppins">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Participation Stats */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Participation Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-primary" />
                        <p className="font-poppins text-sm text-gray-600">Rescue Cases</p>
                      </div>
                      <p className="font-poppins text-3xl font-bold text-primary">{selectedVolunteer.rescueCount}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <p className="font-poppins text-sm text-gray-600">Campaigns Joined</p>
                      </div>
                      <p className="font-poppins text-3xl font-bold text-blue-600">{selectedVolunteer.campaignCount}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  {selectedVolunteer.recentActivity && selectedVolunteer.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {selectedVolunteer.recentActivity.map((activity: any, idx: number) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-primary" />
                              <p className="font-poppins text-sm font-semibold text-gray-800">
                                {activity.animalType} Rescue
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-poppins font-medium ${
                              activity.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                              activity.status === "Recovered" ? "bg-green-100 text-green-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                          <p className="font-poppins text-xs text-gray-600 mb-1">📍 {activity.location}</p>
                          <p className="font-poppins text-xs text-gray-500">
                            {new Date(activity.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-poppins text-sm text-gray-500 text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
