"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in and is a volunteer
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      // No user logged in, redirect to login
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      
      // Check if user role is volunteer
      if (user.role !== "Volunteer" && user.role !== "volunteer") {
        // Not a volunteer, redirect to appropriate dashboard
        if (user.role === "Admin" || user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/login");
        }
        return;
      }

      // User is authenticated as volunteer
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router]);

  // Show loading or nothing while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-poppins text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
