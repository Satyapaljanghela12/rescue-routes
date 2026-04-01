"use client";

import { motion } from "framer-motion";
import { Heart, Stethoscope, Home, Droplet, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const campaigns = [
  {
    icon: Stethoscope,
    title: "Emergency Medical Care Fund",
    description: "Every day, injured animals are left helpless on the streets. This campaign helps us provide urgent surgeries, medicines, and life-saving treatment.",
    buttonText: "Donate Now",
    image: "/About1.jpg",
  },
  {
    icon: Home,
    title: "Shelter & Rehabilitation Drive",
    description: "Help provide safe shelter, food, and recovery care for rescued animals until they are healthy and ready for adoption.",
    buttonText: "Donate Now",
    image: "/About2.jpg",
  },
  {
    icon: Shield,
    title: "Vaccination & Sterilization Campaign",
    description: "Support programs that prevent diseases and help control the stray animal population in a humane way.",
    buttonText: "Donate Now",
    image: "/About1.jpg",
  },
  {
    icon: Home,
    title: "Winter Bed Drive",
    description: "Help us provide warm beds for stray animals during cold nights and protect them from harsh weather.",
    buttonText: "Support Now",
    image: "/About2.jpg",
  },
  {
    icon: Droplet,
    title: "Summer Water Pot Drive",
    description: "Support installation of water pots across the city so animals can survive extreme summer heat.",
    buttonText: "Support Now",
    image: "/About1.jpg",
  },
  {
    icon: Heart,
    title: "Food Distribution Program",
    description: "Help us provide daily meals to street animals who struggle to find food and often go hungry for days.",
    buttonText: "Support Now",
    image: "/About2.jpg",
  },
];

export default function CampaignsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
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
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="font-fredoka text-primary text-sm">Make a Difference</span>
              </div>
              <h1 className="font-poetsen text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                <span className="text-primary">Support Our</span> <span className="text-gray-600">Campaigns</span>
              </h1>
              <p className="font-fredoka text-2xl md:text-3xl mb-6 leading-snug">
                <span className="text-primary">Every small act of kindness</span> <span className="text-gray-600">can save a life</span> 🐾
              </p>
              <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Our campaigns are focused on rescuing, treating, and protecting animals in need. 
                Your support helps us bring care, safety, and hope to those who cannot ask for it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Campaign Grid */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                <span className="text-primary">Our Active</span> <span className="text-gray-600">Campaigns</span>
              </h2>
              <p className="font-fredoka text-xl text-gray-600">
                Choose a cause that speaks to your heart
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.title}
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
                      <campaign.icon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    {/* Decorative blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                    
                    <div className="relative">
                      <h3 className="font-poetsen text-xl mb-3">
                        <span className="text-primary">{campaign.title.split(' ')[0]}</span>{' '}
                        <span className="text-gray-600">{campaign.title.split(' ').slice(1).join(' ')}</span>
                      </h3>
                      
                      <p className="font-poppins text-sm text-gray-700 leading-relaxed mb-4">
                        {campaign.description}
                      </p>
                      
                      <Link
                        href="#donate"
                        className="inline-flex items-center font-fredoka text-primary hover:text-orange-600 transition-colors"
                      >
                        {campaign.buttonText}
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
              ))}
            </div>
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
              
              <h2 className="font-poetsen text-4xl md:text-5xl mb-8">
                <span className="text-primary">Why Your Support</span> <span className="text-gray-600">Matters</span> 
              </h2>
              
              <p className="font-poppins text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Every donation you make goes directly into saving lives. From medical care to shelter and 
                daily support, your contribution helps us reach animals in need and give them a second chance.
              </p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
