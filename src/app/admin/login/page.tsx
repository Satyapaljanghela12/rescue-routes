"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
            Rescue Routes
          </h1>
          <p className="font-poppins text-sm text-gray-600">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-poppins text-2xl font-semibold text-gray-800 mb-6">
            Admin Login
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                placeholder="admin@rescueroutes.org"
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

          <p className="font-poppins text-xs text-gray-500 text-center mt-6">
            Authorized personnel only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
