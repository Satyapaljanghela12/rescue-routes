"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Check if user has admin role
    if (user?.role !== "admin") {
      alert("Access denied. Admin privileges required.");
      router.push("/");
      return;
    }
  }, [isAuthenticated, user, router]);

  // Show loading or nothing while checking authentication
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-poppins text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
