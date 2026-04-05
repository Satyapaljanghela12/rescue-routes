"use client";

import { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";

export default function VolunteerTopNav() {
  const [notifications] = useState(3);
  const [userName, setUserName] = useState("Volunteer");

  useEffect(() => {
    // Get logged-in user's name
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "Volunteer");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-white border-b border-gray-200 z-20">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search or Title */}
        <div>
          <h2 className="font-poppins text-xl font-semibold text-gray-800">
            Volunteer Dashboard
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-all">
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-xs font-poppins font-bold rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="font-poppins text-sm font-semibold text-gray-800">{userName}</p>
              <p className="font-poppins text-xs text-gray-500">Active Member</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
