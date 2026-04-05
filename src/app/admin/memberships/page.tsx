"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Trash2, Mail, User, Phone, MapPin, Crown, Calendar, DollarSign, Eye, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await fetch("/api/memberships");
      const data = await response.json();
      if (data.success) {
        setMemberships(data.memberships);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching memberships:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this membership?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/memberships?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        fetchMemberships();
      } else {
        alert("Failed to delete membership");
      }
    } catch (error) {
      console.error("Error deleting membership:", error);
      alert("Error deleting membership");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSendEmail = async (membership: any) => {
    setSendingEmailId(membership._id);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: membership.email,
          subject: "🎉 Welcome to Rescue Routes - Membership Confirmed!",
          type: "membership-confirmation",
          membershipData: {
            name: membership.name,
            email: membership.email,
            phone: membership.phone,
            address: membership.address,
            city: membership.city,
            state: membership.state,
            country: membership.country,
            pincode: membership.pincode,
            membershipType: membership.membershipType,
            amount: membership.amount,
            paymentId: membership.paymentId || "N/A",
            orderId: membership.orderId || "N/A",
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Update membership to mark email as sent
        await fetch("/api/memberships", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            membershipId: membership._id,
            emailSent: true,
          }),
        });

        alert(`Confirmation email sent successfully to ${membership.email}`);
        fetchMemberships(); // Refresh the list
      } else {
        alert("Failed to send email: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email. Please try again.");
    } finally {
      setSendingEmailId(null);
    }
  };

  const filteredMemberships = filter === "all" 
    ? memberships 
    : memberships.filter(m => m.membershipType.toLowerCase().includes(filter.toLowerCase()));

  const stats = {
    total: memberships.length,
    student: memberships.filter(m => m.membershipType.includes("Student")).length,
    silver: memberships.filter(m => m.membershipType.includes("Silver")).length,
    golden: memberships.filter(m => m.membershipType.includes("Golden")).length,
    platinum: memberships.filter(m => m.membershipType.includes("Platinum")).length,
    lifetime: memberships.filter(m => m.membershipType.includes("Lifetime")).length,
    totalRevenue: memberships.reduce((sum, m) => sum + (m.amount || 0), 0),
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="mb-10">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Premium Members
            </h1>
            <p className="font-poppins text-gray-600">
              Manage and track all membership subscriptions
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
                  <p className="font-poppins text-sm text-gray-600">Total Members</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Platinum Members</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.platinum}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Lifetime Members</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{stats.lifetime}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Total Revenue</p>
                  <p className="font-poppins text-2xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {["all", "student", "silver", "golden", "platinum", "lifetime"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-poppins text-sm font-medium transition-all whitespace-nowrap ${
                  filter === filterType
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType !== "all" && ` (${stats[filterType as keyof typeof stats] || 0})`}
              </button>
            ))}
          </div>

          {/* Memberships Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Member</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Membership Type</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Amount</th>
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
                ) : filteredMemberships.length > 0 ? (
                  filteredMemberships.map((membership) => (
                    <tr key={membership._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-poppins font-bold text-blue-600">
                              {membership.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-poppins text-sm font-medium text-gray-800">{membership.name}</p>
                            <p className="font-poppins text-xs text-gray-500">{membership.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-poppins text-sm text-gray-600">
                          <div className="flex items-center gap-1 mb-1">
                            <Phone className="w-3 h-3" />
                            {membership.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                          <div>
                            <p>{membership.city}, {membership.state}</p>
                            <p className="text-xs text-gray-500">{membership.country}</p>
                            {membership.address && (
                              <p className="text-xs text-gray-500 mt-1">{membership.address}</p>
                            )}
                            {membership.pincode && (
                              <p className="text-xs text-gray-500">PIN: {membership.pincode}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                          membership.membershipType.includes("Lifetime") ? "bg-orange-100 text-orange-700" :
                          membership.membershipType.includes("Platinum") ? "bg-purple-100 text-purple-700" :
                          membership.membershipType.includes("Golden") ? "bg-yellow-100 text-yellow-700" :
                          membership.membershipType.includes("Silver") ? "bg-gray-100 text-gray-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {membership.membershipType}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm font-semibold text-green-600">
                        ₹{membership.amount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(membership.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedMember(membership);
                              setShowDetailsModal(true);
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          {membership.emailSent ? (
                            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-poppins font-medium flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              Sent
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleSendEmail(membership)}
                              disabled={sendingEmailId === membership._id}
                              className="p-2 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Send Confirmation Email"
                            >
                              {sendingEmailId === membership._id ? (
                                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Mail className="w-4 h-4 text-green-600" />
                              )}
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(membership._id)}
                            disabled={deletingId === membership._id}
                            className="p-2 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {deletingId === membership._id ? (
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
                      <p className="font-poppins text-gray-500">No memberships found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedMember && (
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
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-poppins font-bold text-2xl text-blue-600">
                      {selectedMember.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-poppins text-2xl font-bold text-gray-800">{selectedMember.name}</h2>
                    <p className="font-poppins text-sm text-gray-600">{selectedMember.membershipType}</p>
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
                      <p className="font-poppins text-sm font-medium text-gray-800">{selectedMember.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Phone</p>
                      <p className="font-poppins text-sm font-medium text-gray-800">{selectedMember.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Address Details</h3>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    {selectedMember.address && (
                      <div>
                        <p className="font-poppins text-xs text-gray-600 mb-1">Street Address</p>
                        <p className="font-poppins text-sm text-gray-800">{selectedMember.address}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="font-poppins text-xs text-gray-600 mb-1">City</p>
                        <p className="font-poppins text-sm text-gray-800">{selectedMember.city}</p>
                      </div>
                      <div>
                        <p className="font-poppins text-xs text-gray-600 mb-1">State</p>
                        <p className="font-poppins text-sm text-gray-800">{selectedMember.state}</p>
                      </div>
                      <div>
                        <p className="font-poppins text-xs text-gray-600 mb-1">Country</p>
                        <p className="font-poppins text-sm text-gray-800">{selectedMember.country}</p>
                      </div>
                      <div>
                        <p className="font-poppins text-xs text-gray-600 mb-1">PIN Code</p>
                        <p className="font-poppins text-sm text-gray-800">{selectedMember.pincode || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership Details */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Membership Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Membership Type</p>
                      <p className="font-poppins text-sm font-semibold text-primary">{selectedMember.membershipType}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Amount Paid</p>
                      <p className="font-poppins text-lg font-bold text-green-600">₹{selectedMember.amount?.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Status</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-poppins font-medium">
                        {selectedMember.status}
                      </span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-xs text-gray-600 mb-1">Joined Date</p>
                      <p className="font-poppins text-sm text-gray-800">
                        {new Date(selectedMember.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                {(selectedMember.paymentId || selectedMember.orderId) && (
                  <div>
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-2">
                      {selectedMember.paymentId && (
                        <div>
                          <p className="font-poppins text-xs text-gray-600 mb-1">Payment ID</p>
                          <p className="font-poppins text-sm text-gray-800 font-mono">{selectedMember.paymentId}</p>
                        </div>
                      )}
                      {selectedMember.orderId && (
                        <div>
                          <p className="font-poppins text-xs text-gray-600 mb-1">Order ID</p>
                          <p className="font-poppins text-sm text-gray-800 font-mono">{selectedMember.orderId}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-medium rounded-lg transition-all"
                >
                  Close
                </button>
                {selectedMember.emailSent ? (
                  <div className="px-4 py-2 bg-green-100 text-green-700 font-poppins font-medium rounded-lg flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Already Sent
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSendEmail(selectedMember);
                    }}
                    disabled={sendingEmailId === selectedMember._id}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-poppins font-medium rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingEmailId === selectedMember._id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Send Confirmation Email
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
