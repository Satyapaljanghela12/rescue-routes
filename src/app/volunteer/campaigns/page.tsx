"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VolunteerSidebar from "@/components/volunteer/VolunteerSidebar";
import VolunteerTopNav from "@/components/volunteer/VolunteerTopNav";
import { Heart, Users, Megaphone, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [campaignRequests, setCampaignRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
    fetchCampaignRequests();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns");
      const data = await response.json();

      if (data.success) {
        setCampaigns(data.campaigns || []);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setLoading(false);
    }
  };

  const fetchCampaignRequests = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      const response = await fetch("/api/campaign-requests");
      const data = await response.json();

      if (data.success) {
        // Filter requests for current user
        const userRequests = data.requests?.filter(
          (r: any) => r.volunteerEmail === user.email
        ) || [];
        setCampaignRequests(userRequests);
      }
    } catch (error) {
      console.error("Error fetching campaign requests:", error);
    }
  };

  const getRequestStatus = (campaignId: string) => {
    const request = campaignRequests.find(r => r.campaignId === campaignId);
    return request?.status || null;
  };

  const handleJoinCampaign = async (campaignId: string, campaignTitle: string) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);
      
      // Create campaign participation request
      const response = await fetch("/api/campaign-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId,
          campaignTitle,
          volunteerId: user._id || user.email,
          volunteerName: user.name,
          volunteerEmail: user.email,
          volunteerPhone: user.phone,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Your request to join "${campaignTitle}" has been sent to admin for approval!`);
        // Refresh campaign requests
        fetchCampaignRequests();
      } else {
        alert("Failed to send join request. Please try again.");
      }
    } catch (error) {
      console.error("Error joining campaign:", error);
      alert("Error sending join request. Please try again.");
    }
  };

  const getButtonConfig = (campaignId: string, campaignStatus: string) => {
    const requestStatus = getRequestStatus(campaignId);
    
    if (requestStatus === "Approved") {
      return {
        text: "Approved",
        className: "bg-green-100 text-green-700 cursor-default",
        disabled: true,
        icon: "✓"
      };
    }
    
    if (requestStatus === "Rejected") {
      return {
        text: "Rejected",
        className: "bg-red-100 text-red-700 cursor-default",
        disabled: true,
        icon: "✗"
      };
    }
    
    if (requestStatus === "Pending") {
      return {
        text: "Pending",
        className: "bg-yellow-100 text-yellow-700 cursor-default",
        disabled: true,
        icon: "⏳"
      };
    }
    
    if (campaignStatus === "Completed") {
      return {
        text: "Campaign Ended",
        className: "bg-gray-200 text-gray-500 cursor-not-allowed",
        disabled: true,
        icon: ""
      };
    }
    
    return {
      text: "Join Campaign",
      className: "bg-primary hover:bg-orange-600 text-white hover:scale-105",
      disabled: false,
      icon: ""
    };
  };

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("feed") || lowerTitle.includes("food")) return Heart;
    if (lowerTitle.includes("adoption") || lowerTitle.includes("adopt")) return Users;
    if (lowerTitle.includes("awareness") || lowerTitle.includes("campaign")) return Megaphone;
    return Heart;
  };

  const getColor = (index: number) => {
    const colors = [
      "bg-orange-50 text-primary",
      "bg-blue-50 text-blue-600",
      "bg-green-50 text-green-600",
      "bg-purple-50 text-purple-600",
    ];
    return colors[index % colors.length];
  };

  const getType = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("feed") || lowerTitle.includes("food")) return "Feeding";
    if (lowerTitle.includes("adoption") || lowerTitle.includes("adopt")) return "Adoption";
    if (lowerTitle.includes("awareness")) return "Awareness";
    if (lowerTitle.includes("medical") || lowerTitle.includes("vaccination")) return "Medical";
    return "General";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
              Campaigns
            </h1>
            <p className="font-poppins text-gray-600">
              Join ongoing campaigns and make an impact
            </p>
          </div>

          {/* Campaigns Grid */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : campaigns.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {campaigns.map((campaign, index) => {
                const Icon = getIcon(campaign.title);
                const color = getColor(index);
                const type = getType(campaign.title);
                const buttonConfig = getButtonConfig(campaign._id, campaign.status);

                return (
                  <motion.div
                    key={campaign._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  >
                    {/* Campaign Image */}
                    {campaign.image && (
                      <div className="relative w-full h-48">
                        <Image
                          src={campaign.image}
                          alt={campaign.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-poppins font-semibold rounded-full">
                              {type}
                            </span>
                            <span className={`px-3 py-1 text-xs font-poppins font-semibold rounded-full ${
                              campaign.status === "Active" ? "bg-green-100 text-green-700" :
                              campaign.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {campaign.status}
                            </span>
                          </div>
                          <h3 className="font-poppins text-xl font-semibold text-gray-800">
                            {campaign.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-poppins text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {campaign.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-poppins text-gray-700 font-medium">
                            {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                          </span>
                        </div>
                        {campaign.amountRaised !== undefined && (
                          <div className="flex items-center gap-2 text-sm">
                            <Heart className="w-4 h-4 text-primary" />
                            <span className="font-poppins text-gray-700">
                              ₹{campaign.amountRaised?.toLocaleString()} raised
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => !buttonConfig.disabled && handleJoinCampaign(campaign._id, campaign.title)}
                        disabled={buttonConfig.disabled}
                        className={`w-full py-3 font-poppins font-semibold rounded-lg transition-all ${buttonConfig.className}`}
                      >
                        {buttonConfig.icon && <span className="mr-2">{buttonConfig.icon}</span>}
                        {buttonConfig.text}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-poppins text-xl font-semibold text-gray-800 mb-2">
                No Active Campaigns
              </h3>
              <p className="font-poppins text-gray-600">
                There are no campaigns available at the moment. Check back soon!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
