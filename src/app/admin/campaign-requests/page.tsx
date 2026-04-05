"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Check, X, Mail, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function CampaignRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRequestId, setLoadingRequestId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/campaign-requests");
      const data = await response.json();
      if (data.success) {
        setRequests(data.requests);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, status: string, volunteerEmail: string, volunteerName: string, campaignTitle: string) => {
    setLoadingRequestId(requestId);
    try {
      const response = await fetch("/api/campaign-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          requestId, 
          status,
          volunteerEmail,
          volunteerName,
          campaignTitle
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchRequests();
        if (status === "Approved") {
          window.alert(`Request approved! Email sent to ${volunteerEmail}`);
        }
      }
    } catch (error) {
      console.error("Error updating request status:", error);
    } finally {
      setLoadingRequestId(null);
    }
  };

  const stats = {
    pending: requests.filter(r => r.status === "Pending").length,
    approved: requests.filter(r => r.status === "Approved").length,
    rejected: requests.filter(r => r.status === "Rejected").length,
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="mb-10">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Campaign Participation Requests
            </h1>
            <p className="font-poppins text-gray-600">
              Review and approve volunteer campaign participation requests
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Pending Requests</p>
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

          {/* Requests Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Volunteer</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Campaign</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    </td>
                  </tr>
                ) : requests.length > 0 ? (
                  requests.map((request) => (
                    <tr key={request._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-poppins text-sm">
                          <p className="text-gray-800 font-medium">{request.volunteerName}</p>
                          <p className="text-gray-500 text-xs">{request.volunteerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-800 font-medium">
                        {request.campaignTitle}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-poppins text-sm text-gray-600">
                          <p>{request.volunteerEmail}</p>
                          {request.volunteerPhone && (
                            <p className="text-xs">📞 {request.volunteerPhone}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        {new Date(request.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                          request.status === "Approved" ? "bg-green-100 text-green-700" :
                          request.status === "Rejected" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {request.status === "Pending" && (
                            <>
                              <button 
                                onClick={() => handleUpdateStatus(
                                  request._id, 
                                  "Approved",
                                  request.volunteerEmail,
                                  request.volunteerName,
                                  request.campaignTitle
                                )}
                                disabled={loadingRequestId === request._id}
                                className="p-2 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Approve"
                              >
                                {loadingRequestId === request._id ? (
                                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Check className="w-4 h-4 text-green-600" />
                                )}
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(
                                  request._id, 
                                  "Rejected",
                                  request.volunteerEmail,
                                  request.volunteerName,
                                  request.campaignTitle
                                )}
                                disabled={loadingRequestId === request._id}
                                className="p-2 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Reject"
                              >
                                {loadingRequestId === request._id ? (
                                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <X className="w-4 h-4 text-red-600" />
                                )}
                              </button>
                            </>
                          )}
                          <button 
                            className="p-2 hover:bg-blue-50 rounded-lg transition-all" 
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4 text-blue-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <p className="font-poppins text-gray-500">No campaign requests yet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
