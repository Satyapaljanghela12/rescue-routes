"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Plus, Edit, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RescueCasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    animalType: "",
    location: "",
    description: "",
    medicalUpdates: "",
    assignedVolunteer: "",
    status: "In Treatment",
  });

  useEffect(() => {
    fetchCases();
    fetchVolunteers();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch("/api/rescue-cases");
      const data = await response.json();
      if (data.success) {
        setCases(data.cases);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await fetch("/api/volunteers?approved=true");
      const data = await response.json();
      if (data.success) {
        setVolunteers(data.volunteers);
      }
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/rescue-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowModal(false);
        setFormData({
          animalType: "",
          location: "",
          description: "",
          medicalUpdates: "",
          assignedVolunteer: "",
          status: "In Treatment",
        });
        fetchCases();
      } else {
        alert("Failed to create rescue case");
      }
    } catch (error) {
      console.error("Error creating rescue case:", error);
      alert("Error creating rescue case");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
                Rescue Cases
              </h1>
              <p className="font-poppins text-gray-600">
                Track and manage all rescue operations
              </p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Case
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Animal Type</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Volunteer Details</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-poppins text-sm text-gray-800">{caseItem.animalType}</td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">{caseItem.location}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                        caseItem.status === "In Treatment" ? "bg-yellow-100 text-yellow-700" :
                        caseItem.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        caseItem.status === "Recovered" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {caseItem.volunteerName ? (
                        <div className="font-poppins text-sm">
                          <p className="text-gray-800 font-medium">{caseItem.volunteerName}</p>
                          {caseItem.volunteerEmail && (
                            <p className="text-gray-500 text-xs">{caseItem.volunteerEmail}</p>
                          )}
                          {caseItem.volunteerPhone && (
                            <p className="text-gray-600 text-xs font-medium">📞 {caseItem.volunteerPhone}</p>
                          )}
                        </div>
                      ) : (
                        <span className="font-poppins text-sm text-gray-500">
                          {caseItem.assignedVolunteer || "Unassigned"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                      {new Date(caseItem.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Case Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                  <h2 className="font-poppins text-2xl font-bold text-gray-800">Add New Rescue Case</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Animal Type */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Animal Type *
                    </label>
                    <select
                      required
                      value={formData.animalType}
                      onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    >
                      <option value="">Select animal type</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Puppy">Puppy</option>
                      <option value="Kitten">Kitten</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Rescue Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      placeholder="e.g., Andheri West, Mumbai"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Case Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins resize-none"
                      placeholder="Describe the rescue situation..."
                    />
                  </div>

                  {/* Medical Updates */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Medical Updates
                    </label>
                    <textarea
                      value={formData.medicalUpdates}
                      onChange={(e) => setFormData({ ...formData, medicalUpdates: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins resize-none"
                      placeholder="Any medical updates or treatment details..."
                    />
                  </div>

                  {/* Assign Volunteer */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Assign Volunteer
                    </label>
                    <select
                      value={formData.assignedVolunteer}
                      onChange={(e) => setFormData({ ...formData, assignedVolunteer: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    >
                      <option value="">Unassigned</option>
                      {volunteers.map((volunteer) => (
                        <option key={volunteer._id} value={volunteer.name}>
                          {volunteer.name} - {volunteer.location}
                        </option>
                      ))}
                    </select>
                    <p className="font-poppins text-xs text-gray-500 mt-1">
                      Only approved volunteers are shown
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    >
                      <option value="In Treatment">In Treatment</option>
                      <option value="Recovered">Recovered</option>
                      <option value="Adopted">Adopted</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-poppins font-medium rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Creating..." : "Create Case"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
