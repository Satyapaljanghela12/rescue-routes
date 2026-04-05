"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, AlertCircle, Heart, Activity, User, LogOut, PawPrint } from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/volunteer/dashboard", icon: LayoutDashboard },
  { name: "Rescue Alerts", href: "/volunteer/alerts", icon: AlertCircle },
  { name: "Campaigns", href: "/volunteer/campaigns", icon: Heart },
  { name: "My Activity", href: "/volunteer/activity", icon: Activity },
  { name: "Profile", href: "/volunteer/profile", icon: User },
];

export default function VolunteerSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // Clear session and redirect to login
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-30">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <Link href="/volunteer/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-poppins font-bold text-lg text-gray-800">Rescue Routes</h1>
            <p className="font-poppins text-xs text-gray-500">Volunteer Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-poppins text-sm transition-all ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-poppins text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
