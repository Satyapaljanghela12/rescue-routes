"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Shield, Users, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const roles = [
  { id: "admin", label: "Admin", icon: Shield, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: "volunteer", label: "Volunteer", icon: Users, color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: "user", label: "User", icon: Heart, color: "bg-green-50 text-green-600 border-green-200" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });

      const data = await response.json();

      if (response.ok) {
        // Use AuthContext to store user data
        login(data.user);
        
        // Redirect based on role
        if (selectedRole === "admin") {
          router.push("/admin/dashboard");
        } else if (selectedRole === "volunteer") {
          router.push("/volunteer/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="font-poetsen text-4xl text-primary mb-2">
            Rescue Routes
          </h1>
          <p className="font-poppins text-sm text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block font-poppins text-sm font-medium text-gray-700 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === role.id
                      ? role.color + " border-current"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <role.icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-poppins text-xs font-medium">{role.label}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="font-poppins text-gray-600">Remember me</span>
              </label>
              <Link href="#" className="font-poppins text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          <p className="font-poppins text-sm text-gray-600 text-center mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
