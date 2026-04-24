"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Function to check if campaign is active based on current date
const getCampaignStatus = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) return "Upcoming";
  if (now > end) return "Completed";
  return "Active";
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    startDate: "",
    endDate: "",
    address: "",
    image: "/About1.png",
  });

  // Fetch campaigns
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (campaignId: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/campaigns?id=${campaignId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        fetchCampaigns();
      } else {
        window.alert("Failed to delete campaign");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      window.alert("Error deleting campaign");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingCampaign ? `/api/campaigns?id=${editingCampaign._id}` : "/api/campaigns";
      const method = editingCampaign ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowModal(false);
        setEditingCampaign(null);
        setFormData({
          title: "",
          description: "",
          targetAmount: "",
          startDate: "",
          endDate: "",
          address: "",
          image: "/About1.png",
        });
        setImagePreview("");
        setImageFile(null);
        fetchCampaigns();
      } else {
        alert(editingCampaign ? "Failed to update campaign" : "Failed to create campaign");
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Error saving campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (campaign: any) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      targetAmount: campaign.targetAmount.toString(),
      startDate: campaign.startDate.split('T')[0],
      endDate: campaign.endDate.split('T')[0],
      address: campaign.address || "",
      image: campaign.image,
    });
    setImagePreview(campaign.image);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
                Campaign Management
              </h1>
              <p className="font-poppins text-gray-600">
                Manage all fundraising campaigns
              </p>
            </div>
            <button 
              onClick={() => {
                setEditingCampaign(null);
                setFormData({
                  title: "",
                  description: "",
                  targetAmount: "",
                  startDate: "",
                  endDate: "",
                  address: "",
                  image: "/About1.png",
                });
                setImagePreview("");
                setImageFile(null);
                setShowModal(true);
              }}
              className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </button>
          </div>

          {/* Campaigns Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => {
              const status = getCampaignStatus(campaign.startDate, campaign.endDate);
              return (
              <motion.div
                key={campaign._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Campaign Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                      status === "Active" ? "bg-green-100 text-green-700" :
                      status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="font-poppins text-sm text-gray-600 mb-4">
                    {campaign.description}
                  </p>

                  {/* Campaign Dates */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-poppins text-xs text-gray-600">Start Date</span>
                      <span className="font-poppins text-xs font-medium text-gray-800">
                        {new Date(campaign.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-xs text-gray-600">End Date</span>
                      <span className="font-poppins text-xs font-medium text-gray-800">
                        {new Date(campaign.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  {campaign.address && (
                    <div className="mb-4">
                      <span className="font-poppins text-xs text-gray-600">Location: </span>
                      <span className="font-poppins text-xs text-gray-800">{campaign.address}</span>
                    </div>
                  )}

                  {/* Donation Info */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-sm text-gray-600">Amount Raised</span>
                      <span className="font-poppins text-sm font-bold text-primary">
                        ₹{campaign.raisedAmount?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(campaign)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-poppins font-medium py-2 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(campaign._id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Campaign"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>

          {/* Create Campaign Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                  <h2 className="font-poppins text-2xl font-bold text-gray-800">
                    {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingCampaign(null);
                      setImagePreview("");
                      setImageFile(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Campaign Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      placeholder="e.g., Emergency Medical Care Fund"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins resize-none"
                      placeholder="Brief description of the campaign..."
                    />
                  </div>

                  {/* Target Amount */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Target Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      placeholder="50000"
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Campaign Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      placeholder="e.g., 123 Main Street, City, State"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Campaign Image *
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-gray-300 hover:border-primary hover:bg-gray-50"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {imagePreview ? (
                        <div className="space-y-3">
                          <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-poppins text-sm text-gray-600">
                            Click or drag to change image
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-8 h-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-poppins text-sm font-medium text-gray-700 mb-1">
                              Drop your image here, or click to browse
                            </p>
                            <p className="font-poppins text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingCampaign(null);
                        setImagePreview("");
                        setImageFile(null);
                      }}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-poppins font-medium rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all disabled:opacity-50"
                    >
                      {loading ? (editingCampaign ? "Updating..." : "Creating...") : (editingCampaign ? "Update Campaign" : "Create Campaign")}
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
