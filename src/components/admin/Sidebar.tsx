"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Megaphone, 
  DollarSign, 
  Users, 
  Heart, 
  Home,
  BarChart3, 
  Settings, 
  LogOut,
  AlertCircle,
  UserCheck,
  FileText,
  Crown,
  ShoppingBag,
  Package
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: AlertCircle, label: "Rescue Alerts", href: "/admin/alerts" },
  { icon: Megaphone, label: "Campaigns", href: "/admin/campaigns" },
  { icon: UserCheck, label: "Campaign Requests", href: "/admin/campaign-requests" },
  { icon: DollarSign, label: "Donations", href: "/admin/donations" },
  { icon: Users, label: "Volunteers", href: "/admin/volunteers" },
  { icon: Heart, label: "Rescue Cases", href: "/admin/rescue-cases" },
  { icon: Home, label: "Adoptions", href: "/admin/adoptions" },
  { icon: FileText, label: "Adoption Applications", href: "/admin/adoption-applications" },
  { icon: Crown, label: "Premium Members", href: "/admin/memberships" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="font-poppins text-xl font-bold text-gray-800">
          Rescue Routes
        </h1>
        <p className="font-poppins text-xs text-gray-500">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-poppins text-sm ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all font-poppins text-sm w-full">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
