"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Users, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const roles = [
  { id: "volunteer", label: "Volunteer", icon: Users, color: "bg-blue-50 text-blue-600 border-blue-200", desc: "Help rescue animals" },
  { id: "user", label: "User", icon: Heart, color: "bg-green-50 text-green-600 border-green-200", desc: "Shop & support" },
];

export default function SignupPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  const [selectedRole, setSelectedRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "volunteer" || user.role === "Volunteer") {
        router.push("/volunteer/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Use AuthContext to store user data
        login(data.user);
        
        // Redirect based on role
        if (selectedRole === "volunteer") {
          if (data.requiresApproval) {
            alert("Account created successfully! Your account is pending admin approval.");
            router.push("/login");
          } else {
            router.push("/volunteer/dashboard");
          }
        } else {
          router.push("/user/dashboard");
        }
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="font-poetsen text-4xl text-primary mb-2">
            Rescue Routes
          </h1>
          <p className="font-poppins text-sm text-gray-600">Create your account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block font-poppins text-sm font-medium text-gray-700 mb-3">
              I want to join as
            </label>
            <div className="grid grid-cols-2 gap-3">
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
                  <role.icon className="w-7 h-7 mx-auto mb-2" />
                  <p className="font-poppins text-sm font-medium mb-1">{role.label}</p>
                  <p className="font-poppins text-xs opacity-75">{role.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Create Account
            </button>
          </form>

          <p className="font-poppins text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
