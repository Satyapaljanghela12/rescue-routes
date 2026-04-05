"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const missionPillars = [
  {
    title: "Rescue",
    description: "We respond rapidly to distress calls and provide immediate help to animals in danger.",
  },
  {
    title: "Rehabilitate",
    description: "We ensure proper medical care, recovery support, and a safe environment for healing.",
  },
  {
    title: "Rehome",
    description: "We help rescued animals find loving homes where they can live safely and happily.",
  },
  {
    title: "Revive",
    description: "We give animals a second chance at life with dignity, care, and protection.",
  },
];

export default function MissionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="font-poetsen text-4xl md:text-5xl lg:text-6xl mb-4">
                <span className="text-primary">Rescue. Rehabilitate.</span>{" "}
                <span className="text-gray-600">Rehome. Revive.</span>
              </h1>
              <p className="font-poppins text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Every life deserves care, compassion, and a second chance.
              </p>
              <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              
              {/* Left Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-gray-700 text-base md:text-lg leading-relaxed font-poppins">
                  At Rescue Routes, our mission is to protect and uplift stray and abandoned animals 
                  by providing immediate rescue, medical care, and safe rehabilitation.
                </p>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed font-poppins">
                  Every day, countless animals suffer silently due to injury, neglect, and lack of support. 
                  We exist to change that reality — ensuring that no animal is left without care, compassion, 
                  or a chance to live with dignity.
                </p>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed font-poppins">
                  Through rescue operations, treatment, and community-driven initiatives, we are building 
                  a system where every life is valued and protected.
                </p>
              </motion.div>

              {/* Right Side - Image Grid */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/img1.jpg"
                    alt="Rescued dog"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/img2.jpg"
                    alt="Happy rescued animal"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Mission Pillars - Journey Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="font-fredoka text-3xl md:text-4xl text-dark mb-2">
                  How We Change Lives
                </h2>
                <p className="font-poetsen text-base md:text-lg text-gray-500">
                  Every rescue is a journey from pain to hope.
                </p>
              </div>

              {/* Journey Steps */}
              <div className="relative max-w-6xl mx-auto">
                {/* Connecting Path - Desktop */}
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
                  <svg className="w-full h-full" viewBox="0 0 100 2" preserveAspectRatio="none">
                    <path
                      d="M 0 1 Q 25 0, 50 1 T 100 1"
                      stroke="#F97316"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,2"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                  {missionPillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                      whileHover={{ 
                        y: -12, 
                        scale: 1.05,
                        transition: { duration: 0.3 } 
                      }}
                      className="relative"
                    >
                      {/* White Background Card */}
                      <div className="relative p-8 rounded-[2rem] bg-white shadow-md hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                        
                        {/* Step Number */}
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-fredoka text-sm shadow-lg">
                          {index + 1}
                        </div>

                        {/* Content */}
                        <h3 className="font-fredoka text-2xl text-primary mb-3 text-center">
                          {pillar.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-poppins font-semibold text-center">
                          {pillar.description}
                        </p>

                        {/* Decorative Paw Print */}
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
              </div>
            </motion.div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center py-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl"
            >
              <p className="font-poetsen text-2xl md:text-3xl text-dark max-w-2xl mx-auto px-4 mb-8">
                We ensure that no cry for help goes unheard.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <Link
                  href="/donate"
                  className="bg-primary hover:bg-secondary text-white font-semibold text-base py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-md"
                >
                  Donate Now
                </Link>
                <Link
                  href="#volunteer"
                  className="bg-white hover:bg-gray-50 text-primary border-2 border-primary font-semibold text-base py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-md"
                >
                  Become a Volunteer
                </Link>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
