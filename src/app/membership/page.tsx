"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Gift, Award, Crown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const membershipTiers = [
  {
    id: "student",
    name: "Student Rescue Circle",
    price: 500,
    icon: Award,
    color: "orange",
    benefits: [
      "Access to all rescue events",
      "Monthly newsletter",
      "Student ID card",
      "Community forum access"
    ]
  },
  {
    id: "silver",
    name: "Silver Rescue Circle",
    price: 1000,
    icon: Star,
    color: "gray",
    benefits: [
      "All Student benefits",
      "Using laws to save animals book",
      "Priority event registration",
      "Volunteer opportunities",
      "10% discount on merchandise"
    ]
  },
  {
    id: "golden",
    name: "Golden Rescue Circle",
    price: 2500,
    icon: Gift,
    color: "yellow",
    benefits: [
      "All Silver benefits",
      "Rescue Routes T-Shirt",
      "Keep Your Dog Vegetarian Book",
      "Exclusive webinars access",
      "Recognition on website"
    ]
  },
  {
    id: "platinum",
    name: "Platinum Rescue Circle",
    price: 5000,
    icon: Crown,
    color: "purple",
    benefits: [
      "All Golden benefits",
      "Wrist Band",
      "Keep Your Dog Vegetarian Book",
      "Heads & Tails Book",
      "Receipt & Tax Exemption Certificate",
      "VIP event access",
      "Personal consultation"
    ]
  },
  {
    id: "lifetime",
    name: "Lifetime Rescue Circle",
    price: 10000,
    icon: Crown,
    color: "orange",
    benefits: [
      "All Platinum benefits",
      "Complete book set",
      "Lifetime recognition",
      "Advisory board invitation",
      "Legacy donor status",
      "Exclusive lifetime perks"
    ]
  }
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState("golden");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    panCard: ""
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedMembership = membershipTiers.find(t => t.id === selectedTier);
      
      if (!selectedMembership) {
        alert("Please select a membership tier");
        setLoading(false);
        return;
      }

      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedMembership.price,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert("Failed to create payment order");
        setLoading(false);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: selectedMembership.price * 100,
        currency: "INR",
        name: "Rescue Routes",
        description: selectedMembership.name,
        order_id: orderData.order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          membershipType: selectedMembership.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
        },
        theme: {
          color: "#F97316",
        },
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Save membership to database
            const membershipResponse = await fetch("/api/memberships", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formData,
                membershipType: selectedMembership.name,
                amount: selectedMembership.price,
                status: "Active",
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              }),
            });

            const membershipData = await membershipResponse.json();

            if (membershipData.success) {
              // Send confirmation email
              try {
                const emailResponse = await fetch("/api/send-email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    to: formData.email,
                    subject: "🎉 Welcome to Rescue Routes - Membership Confirmed!",
                    type: "membership-confirmation",
                    membershipData: {
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      address: formData.address,
                      city: formData.city,
                      state: formData.state,
                      country: formData.country,
                      pincode: formData.pincode,
                      membershipType: selectedMembership.name,
                      amount: selectedMembership.price,
                      paymentId: response.razorpay_payment_id,
                      orderId: response.razorpay_order_id,
                    },
                  }),
                });

                const emailResult = await emailResponse.json();
                console.log("Email send result:", emailResult);
                
                if (!emailResult.success) {
                  console.error("Failed to send email:", emailResult.error);
                }
              } catch (emailError) {
                console.error("Error sending confirmation email:", emailError);
                // Don't fail the whole process if email fails
              }

              setShowSuccessModal(true);
              setFormData({
                name: "",
                email: "",
                phone: "",
                country: "",
                state: "",
                city: "",
                address: "",
                pincode: "",
                panCard: ""
              });
            } else {
              alert("Failed to save membership data");
            }
          } else {
            alert("Payment verification failed");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      
      razorpay.on("payment.failed", function (response: any) {
        alert("Payment failed. Please try again.");
        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Error processing membership:", error);
      alert("Error processing membership. Please try again.");
      setLoading(false);
    }
  };

  const selectedMembership = membershipTiers.find(t => t.id === selectedTier);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-primary to-orange-600 text-white py-20 pt-32">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-poetsen text-5xl md:text-6xl mb-4"
            >
              Join Our <span className="text-gray-100">Community</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-poppins text-lg md:text-xl max-w-2xl mx-auto opacity-90"
            >
              Become a member and help us rescue, rehabilitate, and rehome animals in need
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="font-fredoka text-3xl text-gray-800 mb-6">Become a Supporter</h2>
              
              <div className="space-y-4">
                {membershipTiers.map((tier) => {
                  const Icon = tier.icon;
                  const isSelected = selectedTier === tier.id;
                  
                  return (
                    <motion.button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-orange-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg ${
                            tier.color === "orange" ? "bg-orange-100" :
                            tier.color === "gray" ? "bg-gray-100" :
                            tier.color === "yellow" ? "bg-yellow-100" :
                            tier.color === "purple" ? "bg-purple-100" :
                            "bg-orange-100"
                          } flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${
                              tier.color === "orange" ? "text-primary" :
                              tier.color === "gray" ? "text-gray-600" :
                              tier.color === "yellow" ? "text-yellow-600" :
                              tier.color === "purple" ? "text-purple-600" :
                              "text-primary"
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-fredoka text-xl text-gray-800">{tier.name}</h3>
                            <p className="font-poppins text-2xl font-bold text-primary">
                              ₹{tier.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="font-poppins text-sm text-gray-600 flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </motion.button>
                  );
                })}
              </div>

              {selectedMembership && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <h3 className="font-fredoka text-xl text-gray-800 mb-4">
                    {selectedMembership.name} Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedMembership.benefits.map((benefit, idx) => (
                      <li key={idx} className="font-poppins text-sm text-gray-700 flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24 border border-gray-200">
                <h2 className="font-fredoka text-2xl text-gray-800 mb-6">Contact Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone No."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Enter Your Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Enter Your Zip/Pin Code"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  />

                  <input
                    type="text"
                    placeholder="PAN Card Number (Optional)"
                    value={formData.panCard}
                    onChange={(e) => setFormData({ ...formData, panCard: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    maxLength={10}
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-blue-900 mb-1">Your Data is Secure</p>
                      <p className="font-poppins text-xs text-blue-800">
                        Your personal details and PAN information are encrypted and securely stored. We use this information solely for tax relaxation purposes and issuing 80G certificates.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-4 p-4 bg-orange-50 rounded-lg">
                      <span className="font-poppins text-gray-700">Selected Plan:</span>
                      <span className="font-fredoka text-xl text-primary">{selectedMembership?.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                      <span className="font-poppins text-gray-700 font-semibold">Total Amount:</span>
                      <span className="font-fredoka text-2xl text-primary">₹{selectedMembership?.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Join Now"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-fredoka text-3xl text-gray-800 mb-8 text-center">Terms & Conditions</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  <span className="font-semibold">Note:</span> For International Residents
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  No freebies applicable for Foreign members, but guess what you have the access to our e-books
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  Membership Cards and Kit will reach to the members in 20-25 days.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  All Categories of Memberships are considered to be active working members of Rescue Routes. They can be contacted in case of any help required for animal welfare.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  If you are facing any errors/glitches while doing membership payments and donations, please clear Cache, Temporary Files and History.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  If even after that you are facing the same issues, kindly transfer the money directly into our bank account through NEFT/RTGS.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  Cheque / DD can also be sent at Bhopal, Madhya Pradesh.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-poppins text-gray-700">
                  <span className="font-semibold">CHEQUE SHOULD BE MADE IN NAME OF "RESCUE ROUTES"</span>
                </p>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-poppins text-sm text-gray-700 italic">
                  Rescue Routes is a registered organization in India and all donations are entitled to exemption under section 80G of the Income Tax Act, 1961 INDIA.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-orange-600" />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>

                <h3 className="font-fredoka text-2xl text-gray-800 mb-3">
                  Welcome to Rescue Routes!
                </h3>
                <p className="font-poppins text-gray-600 mb-6">
                  Thank you for joining our community! Your membership has been successfully registered.
                  We will send you a confirmation email shortly.
                </p>

                <div className="flex gap-2 justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [-10, 0] }}
                      transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                      className="text-2xl"
                    >
                      🐾
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-4 px-6 py-2 bg-primary hover:bg-orange-600 text-white font-poppins font-medium rounded-lg transition-all"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
