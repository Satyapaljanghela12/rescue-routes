"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { TrendingUp, Users, Heart, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeCampaigns: 0,
    totalVolunteers: 0,
    animalsRescued: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
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

      // Fetch adoptions (animals rescued)
      const adoptionsRes = await fetch("/api/adoptions");
      const adoptionsData = await adoptionsRes.json();
      const animalsRescued = adoptionsData.adoptions?.length || 0;

      setStats({
        totalDonations,
        activeCampaigns,
        totalVolunteers,
        animalsRescued,
      });

      // Build recent activity from latest donations and volunteers
      const activities = [];
      
      if (donationsData.donations && donationsData.donations.length > 0) {
        const latestDonations = donationsData.donations.slice(0, 2);
        latestDonations.forEach((d: any) => {
          activities.push({
            action: "New donation received",
            amount: `₹${d.amount}`,
            time: new Date(d.date).toLocaleString(),
          });
        });
      }

      if (volunteersData.volunteers && volunteersData.volunteers.length > 0) {
        const latestVolunteer = volunteersData.volunteers.find((v: any) => v.status === "approved");
        if (latestVolunteer) {
          activities.push({
            action: "Volunteer approved",
            amount: latestVolunteer.name,
            time: new Date(latestVolunteer.createdAt).toLocaleString(),
          });
        }
      }

      setRecentActivity(activities.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const statsConfig = [
    { label: "Total Donations", value: `₹${stats.totalDonations.toLocaleString()}`, icon: DollarSign, color: "bg-green-50 text-green-600" },
    { label: "Active Campaigns", value: stats.activeCampaigns.toString(), icon: TrendingUp, color: "bg-blue-50 text-blue-600" },
    { label: "Total Volunteers", value: stats.totalVolunteers.toString(), icon: Users, color: "bg-purple-50 text-purple-600" },
    { label: "Animals Rescued", value: stats.animalsRescued.toString(), icon: Heart, color: "bg-orange-50 text-primary" },
  ];
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              Dashboard Overview
            </h1>
            <p className="font-poppins text-gray-600">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsConfig.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="font-poppins text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </h3>
                  <p className="font-poppins text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Note about charts */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="font-poppins text-sm text-blue-800">
              📊 Charts and analytics will be populated as you collect more data through donations, campaigns, and volunteer activities.
            </p>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse py-3 border-b border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-poppins text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="font-poppins text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <span className="font-poppins text-sm font-semibold text-primary">
                      {activity.amount}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-poppins text-gray-500">No recent activity yet</p>
                <p className="font-poppins text-sm text-gray-400 mt-2">Activity will appear here as donations and volunteers are added</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
