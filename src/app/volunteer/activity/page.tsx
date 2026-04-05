"use client";

import { motion } from "framer-motion";
import VolunteerSidebar from "@/components/volunteer/VolunteerSidebar";
import VolunteerTopNav from "@/components/volunteer/VolunteerTopNav";
import { Heart, Calendar, Clock, CheckCircle, MapPin } from "lucide-react";

export default function ActivityPage() {
  const stats = [
    { label: "Rescues Participated", value: "12", icon: Heart, color: "bg-orange-50 text-primary" },
    { label: "Events Attended", value: "8", icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Hours Contributed", value: "45", icon: Clock, color: "bg-green-50 text-green-600" },
  ];

  const activities = [
    {
      id: 1,
      type: "Rescue",
      title: "Injured dog rescue",
      location: "Katara Hills",
      date: "2 days ago",
      status: "Completed",
    },
    {
      id: 2,
      type: "Campaign",
      title: "Weekend Feeding Drive",
      location: "Multiple Locations",
      date: "1 week ago",
      status: "Completed",
    },
    {
      id: 3,
      type: "Event",
      title: "Adoption Fair",
      location: "City Park",
      date: "2 weeks ago",
      status: "Completed",
    },
    {
      id: 4,
      type: "Rescue",
      title: "Cat rescue from tree",
      location: "Golf Course Road",
      date: "3 weeks ago",
      status: "Completed",
    },
    {
      id: 5,
      type: "Campaign",
      title: "Vaccination Camp",
      location: "Community Center",
      date: "1 month ago",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VolunteerSidebar />
      
      <div className="flex-1 ml-64">
        <VolunteerTopNav />
        
        <main className="pt-24 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
              My Activity
            </h1>
            <p className="font-poppins text-gray-600">
              Track your contributions and participation history
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-gray-600">{stat.label}</p>
                    <p className="font-poppins text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="font-poppins text-lg font-semibold text-gray-800 mb-6">
              Recent Participation
            </h2>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-orange-50 transition-all"
                >
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    {index < activities.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-poppins font-semibold rounded">
                        {activity.type}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-poppins font-semibold rounded">
                        {activity.status}
                      </span>
                    </div>
                    <h3 className="font-poppins font-semibold text-gray-800 mb-2">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="font-poppins">{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-poppins">{activity.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
