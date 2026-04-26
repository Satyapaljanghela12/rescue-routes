"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Heart } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    campaign: "General Donation",
  });

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: formData.amount }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert("Failed to create order");
        setLoading(false);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Rescue Routes",
        description: `Donation for ${formData.campaign}`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorData: formData,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            alert("Thank you for your donation! Payment successful.");
            setFormData({
              name: "",
              email: "",
              phone: "",
              amount: "",
              campaign: "General Donation",
            });
            onClose();
          } else {
            alert("Payment verification failed");
          }
          setLoading(false);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#F97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
      razorpay.on("payment.failed", function () {
        alert("Payment failed. Please try again.");
        setLoading(false);
      });
    } catch (error) {
      console.error("Error processing donation:", error);
      alert("Error processing donation");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
            <h2 className="font-poppins text-2xl font-bold text-gray-800">Make a Donation</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
              Campaign
            </label>
            <select
              value={formData.campaign}
              onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
            >
              <option value="General Donation">General Donation</option>
              <option value="Emergency Medical Care">Emergency Medical Care</option>
              <option value="Winter Bed Drive">Winter Bed Drive</option>
              <option value="Vaccination Campaign">Vaccination Campaign</option>
              <option value="Food Distribution">Food Distribution</option>
            </select>
          </div>

          <div>
            <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
              Donation Amount (₹) *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
              placeholder="Enter amount"
            />
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="font-poppins text-sm text-orange-800">
              Your donation will help us rescue, treat, and rehabilitate animals in need. Thank you for your support!
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
            <Heart className="w-5 h-5" fill="currentColor" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
