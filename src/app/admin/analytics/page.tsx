"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { TrendingUp, Users, Heart, DollarSign } from "lucide-react";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeCampaigns: 0,
    totalVolunteers: 0,
    animalsRescued: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch donations
      const donationsRes = await fetch("/api/donations");
      const donationsData = await donationsRes.json();
      const totalDonations = donationsData.donations?.reduce((sum: number, d: any) => sum + parseFloat(d.amount || 0), 0) || 0;

      // Fetch campaigns
      const campaignsRes = await fetch("/api/campaigns");
      const campaignsData = await campaignsRes.json();
      const activeCampaigns = campaignsData.campaigns?.filter((c: any) => c.status === "Active").length || 0;

      // Fetch volunteers
      const volunteersRes = await fetch("/api/volunteers");
      const volunteersData = await volunteersRes.json();
      const totalVolunteers = volunteersData.volunteers?.filter((v: any) => v.role === "Volunteer").length || 0;

      // Fetch adoptions
      const adoptionsRes = await fetch("/api/adoptions");
      const adoptionsData = await adoptionsRes.json();
      const animalsRescued = adoptionsData.adoptions?.length || 0;

      setStats({
        totalDonations,
        activeCampaigns,
        totalVolunteers,
        animalsRescued,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="mb-10">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Analytics Dashboard
            </h1>
            <p className="font-poppins text-gray-600">
              Track performance and insights
            </p>
          </div>

          {/* Key Metrics */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-gray-600">Total Donations</p>
                    <p className="font-poppins text-2xl font-bold text-gray-800">₹{stats.totalDonations.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-gray-600">Active Campaigns</p>
                    <p className="font-poppins text-2xl font-bold text-gray-800">{stats.activeCampaigns}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-gray-600">Volunteers</p>
                    <p className="font-poppins text-2xl font-bold text-gray-800">{stats.totalVolunteers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-primary rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-gray-600">Animals Rescued</p>
                    <p className="font-poppins text-2xl font-bold text-gray-800">{stats.animalsRescued}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Note about charts */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-poppins text-sm text-blue-800">
              📊 Advanced analytics and charts will be available as you collect more data. The system tracks donations, campaigns, volunteers, and rescue activities in real-time.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
