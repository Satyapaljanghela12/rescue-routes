"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Check, X, Eye, Mail, User, Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdoptionApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingApplicationId, setLoadingApplicationId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/adoption-applications");
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (applicationId: string, newStatus: string, applicantName: string, email: string) => {
    setLoadingApplicationId(applicationId);
    try {
      const response = await fetch("/api/adoption-applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          status: newStatus,
          applicantName,
          email,
        }),
      });

      const data = await response.json();
      if (data.success) {
        window.alert(`Application ${newStatus.toLowerCase()}! Email sent to ${email}`);
        fetchApplications();
      } else {
        window.alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      window.alert("Error updating status");
    } finally {
      setLoadingApplicationId(null);
    }
  };

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "Pending").length,
    approved: applications.filter(a => a.status === "Approved").length,
    rejected: applications.filter(a => a.status === "Rejected").length,
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="mb-10">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Adoption Applications
            </h1>
            <p className="font-poppins text-gray-600">
              Review and manage adoption applications from potential adopters
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
                  <p className="font-poppins text-sm text-gray-600">Total Applications</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Pending</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.pending}</p>
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
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                  <X className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Rejected</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.rejected}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Applicant</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Preference</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Status</th>
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
                ) : applications.length > 0 ? (
                  applications.map((application) => (
                    <tr key={application._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-poppins font-bold text-primary">
                              {application.applicantName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-poppins text-sm font-medium text-gray-800">{application.applicantName}</p>
                            <p className="font-poppins text-xs text-gray-500">{application.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {application.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        {application.city || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        {application.animalPreference}
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        {new Date(application.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                          application.status === "Approved" ? "bg-green-100 text-green-700" :
                          application.status === "Rejected" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewDetails(application)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          {application.status === "Pending" && (
                            <>
                              <button 
                                onClick={() => handleUpdateStatus(application._id, "Approved", application.applicantName, application.email)}
                                disabled={loadingApplicationId === application._id}
                                className="p-2 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Approve"
                              >
                                {loadingApplicationId === application._id ? (
                                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Check className="w-4 h-4 text-green-600" />
                                )}
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(application._id, "Rejected", application.applicantName, application.email)}
                                disabled={loadingApplicationId === application._id}
                                className="p-2 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Reject"
                              >
                                {loadingApplicationId === application._id ? (
                                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <X className="w-4 h-4 text-red-600" />
                                )}
                              </button>
                            </>
                          )}
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Send Email">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <p className="font-poppins text-gray-500">No adoption applications yet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Application Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-poppins font-bold text-2xl text-primary">
                      {selectedApplication.applicantName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-poppins text-2xl font-bold text-gray-800">{selectedApplication.applicantName}</h2>
                    <p className="font-poppins text-sm text-gray-600">Adoption Application</p>
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
                {/* Contact Information */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Email</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">{selectedApplication.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Phone</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">{selectedApplication.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Address</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-poppins text-sm text-gray-800 mb-2">{selectedApplication.address}</p>
                    <p className="font-poppins text-sm text-gray-600">
                      {selectedApplication.city && `${selectedApplication.city}, `}
                      {selectedApplication.state && `${selectedApplication.state} `}
                      {selectedApplication.pincode}
                    </p>
                  </div>
                </div>

                {/* Adoption Details */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Adoption Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Animal Preference</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">{selectedApplication.animalPreference}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Experience</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">{selectedApplication.experience}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Home Type</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">{selectedApplication.homeType}</p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                {selectedApplication.reason && (
                  <div>
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Why They Want to Adopt</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-sm text-gray-700 leading-relaxed">{selectedApplication.reason}</p>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Application Status</h3>
                  <div className="flex items-center gap-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-poppins font-medium ${
                      selectedApplication.status === "Approved" ? "bg-green-100 text-green-700" :
                      selectedApplication.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {selectedApplication.status}
                    </span>
                    
                    {selectedApplication.status === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleUpdateStatus(
                              selectedApplication._id,
                              "Approved",
                              selectedApplication.applicantName,
                              selectedApplication.email
                            );
                            setShowDetailsModal(false);
                          }}
                          disabled={loadingApplicationId === selectedApplication._id}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-poppins font-medium rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingApplicationId === selectedApplication._id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            handleUpdateStatus(
                              selectedApplication._id,
                              "Rejected",
                              selectedApplication.applicantName,
                              selectedApplication.email
                            );
                            setShowDetailsModal(false);
                          }}
                          disabled={loadingApplicationId === selectedApplication._id}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-poppins font-medium rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingApplicationId === selectedApplication._id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
