"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

const donationMessages = [
  { name: "Priya Sharma", amount: 500, location: "Mumbai" },
  { name: "Rahul Verma", amount: 1000, location: "Delhi" },
  { name: "Anjali Patel", amount: 750, location: "Bangalore" },
  { name: "Vikram Singh", amount: 2000, location: "Pune" },
  { name: "Sneha Reddy", amount: 1500, location: "Hyderabad" },
  { name: "Amit Kumar", amount: 500, location: "Chennai" },
  { name: "Neha Gupta", amount: 1200, location: "Kolkata" },
  { name: "Rohan Mehta", amount: 800, location: "Ahmedabad" },
];

export default function DonationNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(donationMessages[0]);

  useEffect(() => {
    // Show notification every 3 minutes (180000 ms)
    const interval = setInterval(() => {
      // Pick a random donation message
      const randomDonation = donationMessages[Math.floor(Math.random() * donationMessages.length)];
      setCurrentDonation(randomDonation);
      setIsVisible(true);

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    }, 180000); // 3 minutes

    // Show first notification after 10 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary/20 p-4 flex items-center gap-4">
            {/* Heart Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-fredoka text-sm text-gray-900 mb-1">
                <span className="font-bold text-primary">{currentDonation.name}</span> from {currentDonation.location}
              </p>
              <p className="font-poppins text-xs text-gray-600">
                just donated <span className="font-bold text-primary">₹{currentDonation.amount}</span>
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
