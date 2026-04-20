"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import confetti from "canvas-confetti";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

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
            setShowSuccessModal(true);
            triggerConfetti();
            setTimeout(() => {
              window.location.href = "/";
            }, 5000);
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
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        theme: {
          color: "#F97316",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
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

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 md:px-8 max-w-2xl">
            
            {/* Back Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-poppins mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full mb-6">
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                <span className="font-fredoka text-primary text-lg font-bold">Make a Difference</span>
              </div>
              
              <h1 className="font-poetsen text-5xl md:text-6xl mb-4">
                <span className="text-gray-500">Support Our</span>{" "}
                <span className="text-primary">Mission</span>
              </h1>
              
              <p className="font-poppins text-lg text-gray-600 max-w-xl mx-auto">
                Your donation helps us rescue, treat, and rehabilitate animals in need. Every contribution makes a difference.
              </p>
            </motion.div>

            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block font-poppins text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary font-poppins transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary font-poppins transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary font-poppins transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-semibold text-gray-700 mb-2">
                    Select Campaign
                  </label>
                  <select
                    value={formData.campaign}
                    onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary font-poppins transition-colors"
                  >
                    <option value="General Donation">General Donation</option>
                    <option value="Emergency Medical Care">Emergency Medical Care</option>
                    <option value="Winter Bed Drive">Winter Bed Drive</option>
                    <option value="Vaccination Campaign">Vaccination Campaign</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Shelter Rehabilitation">Shelter Rehabilitation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-poppins text-sm font-semibold text-gray-700 mb-2">
                    Donation Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary font-poppins transition-colors text-lg font-semibold"
                    placeholder="Enter amount"
                  />
                  
                  {/* Quick Amount Buttons */}
                  <div className="flex gap-2 mt-3">
                    {[500, 1000, 2000, 5000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                        className="flex-1 py-2 px-3 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 rounded-lg font-poppins text-sm font-medium transition-all"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                  <p className="font-poppins text-sm text-orange-800 leading-relaxed">
                    💝 Your donation will help us rescue, treat, and rehabilitate animals in need. Thank you for your support!
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-bold text-lg py-4 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                  <Heart className="w-6 h-6" fill="currentColor" />
                </button>
              </form>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="font-poppins text-sm text-gray-500">
                🔒 Secure payment powered by Razorpay
              </p>
            </motion.div>

          </div>
        </section>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  >
                    <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
                  </motion.div>

                  {/* Sparkles Animation */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-8 right-12"
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-12 left-12"
                  >
                    <Sparkles className="w-5 h-5 text-green-500" />
                  </motion.div>

                  {/* Text Content */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-poetsen text-4xl text-gray-800 mb-3"
                  >
                    <span className="text-primary">Thank You!</span>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-poppins text-lg text-gray-600 mb-6"
                  >
                    Your donation of <span className="font-bold text-primary">₹{formData.amount}</span> has been received successfully! 🎉
                  </motion.p>

                  {/* Paw Prints */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-2 mb-6"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 0 }}
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                          <circle cx="12" cy="16" r="2" />
                          <circle cx="8" cy="12" r="1.5" />
                          <circle cx="16" cy="12" r="1.5" />
                          <circle cx="10" cy="8" r="1" />
                          <circle cx="14" cy="8" r="1" />
                        </svg>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6"
                  >
                    <p className="font-poppins text-sm text-orange-800 leading-relaxed">
                      Your kindness will help us rescue, treat, and give a second chance to animals in need. You're making a real difference! 💝
                    </p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="font-poppins text-sm text-gray-500"
                  >
                    Redirecting to home page...
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <SiteFooter />
    </>
  );
}
