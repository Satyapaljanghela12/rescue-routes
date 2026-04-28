"use client";

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdoptionPage() {
  const [adoptions, setAdoptions] = useState<any[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const fetchAdoptions = async () => {
    try {
      const response = await fetch("/api/adoptions");
      const data = await response.json();
      if (data.success) {
        // Only show available animals
        setAdoptions(data.adoptions.filter((a: any) => a.status === "Available"));
      }
    } catch (error) {
      console.error("Error fetching adoptions:", error);
    }
  };

  const handleAdoptClick = (animal: any) => {
    setSelectedAnimal(animal);
    setShowAdoptionForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/adoption-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          animalId: selectedAnimal._id,
          animalName: selectedAnimal.animalName,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert("Adoption application submitted successfully! We'll contact you soon.");
        setShowAdoptionForm(false);
        setFormData({ name: "", email: "", phone: "", address: "", reason: "" });
        setSelectedAnimal(null);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24" style={{ backgroundColor: '#fce4ec' }}>
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full px-6 py-2 mb-6" style={{ backgroundColor: '#f8bbd0' }}>
                <PawPrint className="w-5 h-5" style={{ color: '#e91e63' }} />
                <span className="font-fredoka text-sm uppercase tracking-wider" style={{ color: '#e91e63' }}>Adoption</span>
              </div>
              
              <h1 className="font-fredoka text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: '#e91e63' }}>
                Meet Your New Friend
              </h1>
              <p className="font-poppins text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                These rescued animals are looking for their forever homes. Give them the love and care they deserve.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Adoption Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adoptions.map((animal, index) => (
                <motion.div
                  key={animal._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                  style={{ border: '2px solid #fce4ec' }}
                >
                  {/* Animal Image */}
                  <div className="relative h-56 bg-gray-100">
                    <Image
                      src={animal.image}
                      alt={animal.animalName}
                      fill
                      className="object-cover"
                    />
                    {/* Gender Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-fredoka font-medium text-gray-700">
                        {animal.gender}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-poetsen text-2xl mb-2" style={{ color: '#e91e63' }}>
                      {animal.animalName}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-poppins text-sm text-gray-600">{animal.animalType}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-poppins text-sm text-gray-600">{animal.age}</span>
                    </div>

                    {animal.description && (
                      <p className="font-poppins text-sm text-gray-700 leading-relaxed mb-4 line-clamp-2">
                        {animal.description}
                      </p>
                    )}

                    <button 
                      onClick={() => handleAdoptClick(animal)}
                      className="w-full text-white font-fredoka py-2.5 rounded-xl transition-all hover:opacity-90"
                      style={{ backgroundColor: '#e91e63' }}
                    >
                      Adopt Me
                    </button>

                    {/* Paw decoration */}
                    <div className="absolute bottom-3 right-3 opacity-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#e91e63' }}>
                        <circle cx="12" cy="16" r="3" />
                        <circle cx="8" cy="12" r="2" />
                        <circle cx="16" cy="12" r="2" />
                        <circle cx="10" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {adoptions.length === 0 && (
              <div className="text-center py-12">
                <p className="font-poppins text-gray-500">No animals available for adoption at the moment</p>
              </div>
            )}
          </div>
        </section>

        {/* Emotional Connect */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-white">
          {/* Decorative paw prints background */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(8)].map((_, i) => (
              <svg
                key={i}
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: '#e91e63', position: 'absolute',
                  top: `${(i * 13 + 10) % 80}%`,
                  left: `${(i * 17 + 5) % 80}%`,
                  transform: `rotate(${i * 45}deg)` }}
              >
                <circle cx="12" cy="16" r="3" />
                <circle cx="8" cy="12" r="2" />
                <circle cx="16" cy="12" r="2" />
                <circle cx="10" cy="8" r="1.5" />
                <circle cx="14" cy="8" r="1.5" />
              </svg>
            ))}
          </div>
          
          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl"
              style={{ border: '4px solid #fce4ec' }}
            >
              <div className="inline-block px-6 py-2 rounded-full mb-6" style={{ backgroundColor: '#fce4ec' }}>
                <span className="font-fredoka text-lg" style={{ color: '#e91e63' }}>Your Impact</span>
              </div>
              
              <h2 className="font-fredoka text-4xl md:text-5xl mb-8" style={{ color: '#e91e63' }}>
                Why Your Support Matters
              </h2>
              
              <p className="font-poppins text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
                Every donation you make goes directly into saving lives. From medical care to shelter and 
                daily support, your contribution helps us reach animals in need and give them a second chance.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/donate"
                  className="text-white font-fredoka font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg hover:opacity-90"
                  style={{ backgroundColor: '#e91e63' }}
                >
                  Donate Now
                </Link>
                <Link
                  href="/volunteers"
                  className="bg-white font-fredoka font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  style={{ color: '#e91e63', border: '4px solid #e91e63' }}
                >
                  Become a Volunteer
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Adoption Form Modal */}
      {showAdoptionForm && selectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-fredoka text-2xl text-primary">
                  Adopt {selectedAnimal.animalName}
                </h3>
                <button
                  onClick={() => {
                    setShowAdoptionForm(false);
                    setSelectedAnimal(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                    Why do you want to adopt {selectedAnimal.animalName}? *
                  </label>
                  <textarea
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdoptionForm(false);
                      setSelectedAnimal(null);
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-fredoka rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-primary text-white font-fredoka rounded-lg hover:bg-orange-600 transition"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
