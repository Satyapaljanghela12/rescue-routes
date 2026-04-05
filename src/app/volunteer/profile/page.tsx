"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VolunteerSidebar from "@/components/volunteer/VolunteerSidebar";
import VolunteerTopNav from "@/components/volunteer/VolunteerTopNav";
import { User, Mail, Phone, MapPin, Tag, Calendar, Save } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: ["Animal Handling", "First Aid", "Transportation"],
    availability: "Weekends",
    joinedDate: "January 2024",
  });

  useEffect(() => {
    // Load user data from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setProfile({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          location: user.location || "",
          skills: user.skills || ["Animal Handling", "First Aid", "Transportation"],
          availability: user.availability || "Weekends",
          joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "January 2024",
        });
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Update localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const updatedUser = { ...user, ...profile };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  const participationHistory = [
    { event: "Injured dog rescue", date: "2 days ago", type: "Rescue" },
    { event: "Weekend Feeding Drive", date: "1 week ago", type: "Campaign" },
    { event: "Adoption Fair", date: "2 weeks ago", type: "Event" },
    { event: "Cat rescue from tree", date: "3 weeks ago", type: "Rescue" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VolunteerSidebar />
      
      <div className="flex-1 ml-64">
        <VolunteerTopNav />
        
        <main className="pt-24 p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
                My Profile
              </h1>
              <p className="font-poppins text-gray-600">
                Manage your volunteer information
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-poppins font-medium rounded-lg transition-all hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="font-poppins text-lg font-semibold text-gray-800 mb-6">
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-poppins focus:outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-poppins focus:outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-poppins focus:outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-poppins focus:outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Skills & Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="font-poppins text-lg font-semibold text-gray-800 mb-6">
                  Skills & Availability
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4" />
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-orange-50 text-primary font-poppins text-sm font-medium rounded-lg border border-orange-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="px-3 py-2 border-2 border-dashed border-gray-300 text-gray-500 font-poppins text-sm font-medium rounded-lg hover:border-primary hover:text-primary transition-all">
                          + Add Skill
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      Availability
                    </label>
                    <select
                      value={profile.availability}
                      onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-poppins focus:outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-600"
                    >
                      <option value="Weekends">Weekends Only</option>
                      <option value="Weekdays">Weekdays Only</option>
                      <option value="Anytime">Anytime</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Member Since */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-poppins text-sm font-semibold text-gray-500 mb-2">
                  MEMBER SINCE
                </h3>
                <p className="font-poppins text-2xl font-bold text-gray-800">
                  {profile.joinedDate}
                </p>
              </motion.div>

              {/* Participation History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4">
                  Recent Participation
                </h3>
                <div className="space-y-3">
                  {participationHistory.map((item, index) => (
                    <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                      <p className="font-poppins text-sm font-medium text-gray-800 mb-1">
                        {item.event}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-poppins text-xs text-gray-500">{item.date}</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-poppins font-medium rounded">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
