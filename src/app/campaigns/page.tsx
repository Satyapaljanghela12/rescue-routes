"use client";

import { motion } from "framer-motion";
import { PawPrint, Stethoscope, Home, Droplet, Shield, CalendarDays } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Icon mapping for campaigns
const iconMap: any = {
  "Emergency": Stethoscope,
  "Medical": Stethoscope,
  "Shelter": Home,
  "Rehabilitation": Home,
  "Vaccination": Shield,
  "Sterilization": Shield,
  "Winter": Home,
  "Bed": Home,
  "Summer": Droplet,
  "Water": Droplet,
  "Food": PawPrint,
};

const getIconForCampaign = (title: string) => {
  for (const key in iconMap) {
    if (title.includes(key)) return iconMap[key];
  }
  return PawPrint;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
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
    fetchCampaigns();
    fetchAdoptions();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

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
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-white">
          <div className="absolute inset-0">
            <Image
              src="/Images/WhatsApp Image 2026-04-11 at 20.21.16.jpeg"
              alt="Campaigns hero"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-white/60" />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-fredoka text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-primary">
                Support Our Campaigns
              </h1>
              <p className="font-poppins text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Our campaigns are focused on rescuing, treating, and protecting animals in need. 
                Your support helps us bring care, safety, and hope to those who cannot ask for it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Past Campaigns Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
                Our Journey
              </p>
              <h2 className="font-fredoka text-4xl md:text-5xl mb-4 text-primary">
                Past Campaigns
              </h2>
              <p className="font-poppins text-lg text-gray-600 max-w-3xl mx-auto">
                Throughout all operations, we remain committed to community education regarding sterilization (ABC programs) and the critical importance of Rabies prevention to ensure a safe environment for both humans and animals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Adoption Mega-Camp",
                  date: "December 27–28, 2025",
                  description: "Organized in collaboration with the Ram Astha Mission",
                  impact: [
                    "55 puppies participated",
                    "22 successful adoptions",
                    "Partnered with Nagar Nigam for on-site pet license registration and rabies vaccinations"
                  ],
                  image: "/Camapigns/27-28dec.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Winter Bed Drive",
                  date: "November 27, 2025",
                  description: "Providing warmth for street dogs during harsh winter",
                  impact: [
                    "Produced 1,000 Boribeds (stubble-filled sacks)",
                    "Partnership with Parwati Sewa Foundation"
                  ],
                  image: "/Camapigns/Winterbeddrive.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Water Pot Drive",
                  date: "May 4, 2025",
                  description: "Ensuring stray animals have access to clean drinking water during summer heat",
                  impact: [
                    "Distributed 100 water pots across the city"
                  ],
                  image: "/Camapigns/WaterPotDrive.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Year-End Adoption Camp",
                  date: "December 28–29, 2024",
                  description: "Continued efforts in finding forever homes for local strays",
                  impact: [
                    "60 puppies participated",
                    "18 successful adoptions"
                  ],
                  image: "/Camapigns/yearend.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Annual Bed Drive",
                  date: "December 1, 2024",
                  description: "Scaled up production to create protective beds for street animals",
                  impact: [
                    "Created approximately 800 protective beds using stubble and sacks"
                  ],
                  image: "/Camapigns/Annualbeddrive.jpg",
                  objectPosition: "object-center"
                },
                {
                  title: "New Year Adoption Drive",
                  date: "January 27–28, 2024",
                  description: "Location: 10 Number Market",
                  impact: [
                    "50 puppies participated",
                    "21 successful adoptions"
                  ],
                  image: "/Camapigns/Adoptiondrive.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Adoption Camp at Olivers",
                  date: "December 25, 2023",
                  description: "Location: 10 Number",
                  impact: [
                    "20 puppies participated",
                    "3 successful adoptions"
                  ],
                  image: "/Camapigns/adoptionolivers.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Foundation Bed Drive",
                  date: "December 1, 2023",
                  description: "Initial winter drive for street dogs",
                  impact: [
                    "Created 600 beds using boris (sacks) and bhusa (stubble)"
                  ],
                  image: "/Camapigns/foundationbed.jpg",
                  objectPosition: "object-top"
                }
              ].map((campaign, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className={`object-cover ${campaign.objectPosition}`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/28 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#fac602]/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                      <CalendarDays className="h-4 w-4" />
                      {campaign.date}
                    </div>

                    <h3 className="font-fredoka text-2xl leading-tight text-primary mb-3">
                      {campaign.title}
                    </h3>
                    <p className="text-sm font-poppins leading-7 text-foreground/72 mb-4">
                      {campaign.description}
                    </p>

                    <div className="space-y-2">
                      {campaign.impact.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <PawPrint className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-xs font-poppins leading-6 text-foreground/68">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Campaign Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-fredoka text-4xl md:text-5xl mb-4 text-primary">
                Our Active Campaigns
              </h2>
              <p className="font-poppins text-lg text-gray-600">
                Choose a cause that speaks to your heart
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => {
                const CampaignIcon = getIconForCampaign(campaign.title);
                return (
                <motion.div
                  key={campaign._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                    {/* Icon badge overlay */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <CampaignIcon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    {/* Decorative blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                    
                    <div className="relative">
                      <h3 className="font-fredoka text-2xl mb-3 text-primary">
                        {campaign.title}
                      </h3>
                      
                      <p className="font-poppins text-sm text-gray-700 leading-relaxed mb-4">
                        {campaign.description}
                      </p>
                      
                      <Link
                        href="/donate"
                        className="inline-flex items-center font-fredoka text-primary hover:text-orange-600 transition-colors"
                      >
                        Donate Now
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Paw decoration */}
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                        <circle cx="12" cy="16" r="3" />
                        <circle cx="8" cy="12" r="2" />
                        <circle cx="16" cy="12" r="2" />
                        <circle cx="10" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Adoption Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-fredoka text-4xl md:text-5xl mb-4 text-primary">
                Meet Your New Friend
              </h2>
              <p className="font-poppins text-lg text-gray-600">
                These rescued animals are looking for their forever homes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adoptions.map((animal, index) => (
                <motion.div
                  key={animal._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 overflow-hidden"
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
                    <h3 className="font-poetsen text-2xl mb-2 text-primary">
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
                      className="w-full bg-primary hover:bg-orange-600 text-white font-fredoka py-2.5 rounded-xl transition-all"
                    >
                      Adopt Me
                    </button>

                    {/* Paw decoration */}
                    <div className="absolute bottom-3 right-3 opacity-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
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
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Decorative paw prints background */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(8)].map((_, i) => (
              <svg
                key={i}
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-primary absolute"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
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
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border-4 border-gray-100"
            >
              <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-6">
                <span className="font-fredoka text-primary text-lg">Your Impact</span>
              </div>
              
              <h2 className="font-fredoka text-4xl md:text-5xl mb-8 text-primary">
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
                  className="bg-primary hover:bg-orange-600 text-white font-fredoka font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                >
                  Donate Now
                </Link>
                <Link
                  href="/volunteers"
                  className="bg-white hover:bg-gray-50 text-primary border-4 border-primary font-fredoka font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
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
