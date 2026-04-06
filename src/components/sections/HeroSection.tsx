"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, X, CheckCircle, Heart, Home, User } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    animalPreference: "Any",
    experience: "No",
    homeType: "Apartment",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/adoption-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowAdoptModal(false);
        setShowThankYouModal(true);
        setFormData({
          applicantName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          animalPreference: "Any",
          experience: "No",
          homeType: "Apartment",
          reason: "",
        });
        
        // Auto close thank you modal after 5 seconds
        setTimeout(() => {
          setShowThankYouModal(false);
        }, 5000);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-primary py-1.5 px-4 rounded-full font-medium text-sm">
              <PawPrint size={16} />
              🐾 Parwati Seva Foundation 
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[96px] lg:leading-[90px] font-poetsen tracking-normal mt-2 lg:mt-4">
              <span className="text-gray-600">Saving Lives</span>
              <br />
              <span className="text-primary">
                One Rescue
              </span>
              <br />
              <span className="text-gray-600">at a Time.</span>
            </h1>
            
            <p className="font-heading text-lg text-light max-w-lg leading-relaxed mt-4 text-balance">
              Rescue Routes rescues injured and abandoned animals, providing care, shelter, and love. Join our mission to create a compassionate world for all.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
              <Link
                href="#volunteer"
                className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 hover:bg-secondary shadow-md hover:shadow-lg"
              >
                Become a Volunteer
              </Link>
              <button
                onClick={() => setShowAdoptModal(true)}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 hover:bg-orange-50"
              >
                Adopt a Dog 
              </button>
            </div>
          </motion.div>

          {/* Right Content / Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex flex-col justify-center items-center gap-3"
          >
            <div className="relative w-full max-w-lg xl:max-w-xl aspect-square mx-auto">
              <Image
                src="/Pet adoption Post 1.png"
                alt="Pet Adoption"
                fill
                className="object-contain"
                priority
              />
              
              {/* Floating Custom Paw Print */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-4 md:top-12 md:right-12 xl:right-16 w-16 h-16 md:w-28 md:h-28 z-10"
              >
                <Image
                  src="/Lion_King_-_orange_paw_print-removebg-preview 9.png"
                  alt="Orange Paw Print Decoration"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </motion.div>
            </div>
            
            {/* Registration Numbers */}
            <div className="text-center space-y-1">
              <p className="text-gray-400 text-sm font-medium tracking-wide">
                Registration No.: HI/01/01/01/33445/18
              </p>
              <p className="text-gray-400 text-sm font-medium tracking-wide">
                NITI Ayog/NGO Registration No.: MP/2018/0188360
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Adoption Application Modal */}
      <AnimatePresence>
        {showAdoptModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-poppins text-2xl font-bold text-gray-800">Adopt a Dog</h2>
                    <p className="font-poppins text-sm text-gray-600">Fill in your details to start the adoption process</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAdoptModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.applicantName}
                        onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
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
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    Address Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <textarea
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins resize-none"
                        placeholder="Street address, apartment, suite, etc."
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                          placeholder="Maharashtra"
                        />
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adoption Preferences */}
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <PawPrint className="w-5 h-5 text-primary" />
                    Adoption Preferences
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Animal Preference
                      </label>
                      <select
                        value={formData.animalPreference}
                        onChange={(e) => setFormData({ ...formData, animalPreference: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      >
                        <option value="Any">Any</option>
                        <option value="Puppy">Puppy</option>
                        <option value="Adult Dog">Adult Dog</option>
                        <option value="Senior Dog">Senior Dog</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Previous Pet Experience
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      >
                        <option value="No">No Experience</option>
                        <option value="Yes">Yes, I have experience</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Home Type
                      </label>
                      <select
                        value={formData.homeType}
                        onChange={(e) => setFormData({ ...formData, homeType: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="House with Yard">House with Yard</option>
                        <option value="Villa">Villa</option>
                        <option value="Farmhouse">Farmhouse</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Why do you want to adopt?
                      </label>
                      <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins resize-none"
                        placeholder="Tell us why you want to adopt a dog..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdoptModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-poppins font-medium rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYouModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100 rounded-full -ml-12 -mb-12"></div>

              {/* Close Button */}
              <button
                onClick={() => setShowThankYouModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 relative z-10"
              >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-poppins text-3xl font-bold text-gray-800 text-center mb-3 relative z-10"
              >
                Thank You! 🎉
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-poppins text-gray-600 text-center mb-6 leading-relaxed relative z-10"
              >
                Your adoption application has been submitted successfully! Our team will review your application and contact you soon.
              </motion.p>

              {/* Paw Prints Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-3 mb-6 relative z-10"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  >
                    <PawPrint className="w-6 h-6 text-primary" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-orange-50 rounded-lg p-4 relative z-10"
              >
                <p className="font-poppins text-sm text-gray-700 text-center">
                  <strong>What's next?</strong><br />
                  We'll verify your details and reach out within 2-3 business days to discuss the next steps.
                </p>
              </motion.div>

              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => setShowThankYouModal(false)}
                className="w-full mt-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all relative z-10"
              >
                Got it!
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
