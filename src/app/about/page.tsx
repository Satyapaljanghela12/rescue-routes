"use client";

import { motion } from "framer-motion";
import { Heart, Users, Droplet, BedDouble } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: BedDouble, number: "3400+", label: "Beds Created" },
  { icon: Heart, number: "830+", label: "Animals Rescued" },
  { icon: Droplet, number: "100+", label: "Water Pots Installed" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <span className="font-fredoka text-primary text-sm">Who We Are</span>
                </div>
                <h1 className="font-poetsen text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                  <span className="text-primary">About</span> <span className="text-gray-600">Rescue Routes</span>
                </h1>
                <p className="font-fredoka text-2xl md:text-3xl text-primary mb-6 leading-snug">
                  From the streets of Bhopal to a journey of compassion and care 🐾
                </p>
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  What started as a small effort to help injured stray animals in Bhopal has grown 
                  into a mission to rescue, heal, and protect those who cannot speak for themselves.
                </p>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Warm gradient background effect */}
                <div className="absolute -inset-6 bg-gradient-to-br from-orange-200/40 via-orange-300/30 to-primary/20 rounded-3xl blur-2xl" />
                
                <div className="relative w-full h-[500px] bg-white p-4 rounded-2xl shadow-xl">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src="/About1.png"
                      alt="Rescue Routes mission"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                {/* Paw badge */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="16" r="3" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <circle cx="10" cy="8" r="1.5" />
                    <circle cx="14" cy="8" r="1.5" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left - Image with playful styling */}
              <motion.div
                initial={{ opacity: 0, rotate: -3 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
                className="relative order-2 lg:order-1"
              >
                <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 to-orange-200/20 rounded-[3rem] blur-2xl" />
                <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/About2.jpg"
                    alt="Our story"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating paw prints */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="16" r="3" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <circle cx="10" cy="8" r="1.5" />
                    <circle cx="14" cy="8" r="1.5" />
                  </svg>
                </div>
              </motion.div>

              {/* Right - Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <span className="font-fredoka text-primary text-sm">Our Beginning</span>
                </div>
                <h2 className="font-poetsen text-4xl md:text-5xl mb-6 leading-tight">
                  <span className="text-primary">Our</span> <span className="text-gray-600">Story</span>
                </h2>
                <div className="space-y-5 font-poppins text-lg text-gray-700 leading-relaxed">
                  <p>
                    Rescue Routes began in Bhopal with a simple yet powerful purpose — to help animals in pain.
                  </p>
                  <p>
                    Every day, stray animals were seen struggling with injuries, hunger, and neglect. 
                    What others ignored, we chose to act on. From picking up injured dogs from roadsides 
                    to arranging urgent medical care, our journey started with compassion and a willingness 
                    to step in when it mattered most.
                  </p>
                  <p className="font-fredoka text-xl text-primary">
                    Over time, this small effort turned into a growing movement — supported by volunteers, 
                    driven by empathy, and focused on saving lives.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values - Creative Wave/Flow Layout */}
        <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
          {/* Decorative floating elements */}
          <div className="absolute top-10 right-20 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                <span className="text-primary">Our Core</span> <span className="text-gray-600">Values</span>
              </h2>
              <p className="font-fredoka text-xl md:text-2xl text-gray-600">
                The principles that guide every rescue, every decision, every life we touch.
              </p>
            </motion.div>

            {/* Flowing Timeline Layout */}
            <div className="relative max-w-6xl mx-auto">
              
              {/* Connecting curved line */}
              <div className="hidden lg:block absolute top-0 left-0 right-0 bottom-0">
                <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                  <path
                    d="M 50 100 Q 250 50, 450 100 T 950 100"
                    stroke="#F97316"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Values in flowing layout */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Value 1 - Top Left */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative"
                >
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-gray-100 relative overflow-hidden">
                    {/* Number badge */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                      <span className="font-fredoka text-white text-2xl">1</span>
                    </div>
                    
                    {/* Decorative blob */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                    
                    <div className="relative pt-6">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-md mx-auto transform -rotate-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </div>
                      <h3 className="font-poetsen text-3xl text-primary mb-3 text-center">
                        Compassion First
                      </h3>
                      <p className="font-poppins text-base text-gray-700 text-center leading-relaxed">
                        We lead with empathy in every action we take. Every decision is rooted in care and understanding.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Value 2 - Top Right */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: 5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative lg:mt-16"
                >
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-gray-100 relative overflow-hidden">
                    {/* Number badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                      <span className="font-fredoka text-white text-2xl">2</span>
                    </div>
                    
                    {/* Decorative blob */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                    
                    <div className="relative pt-6">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-md mx-auto transform rotate-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                      </div>
                      <h3 className="font-poetsen text-3xl text-primary mb-3 text-center">
                        Immediate Action
                      </h3>
                      <p className="font-poppins text-base text-gray-700 text-center leading-relaxed">
                        When an animal needs help, we respond without delay. Time matters when lives are at stake.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Value 3 - Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: 5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative lg:mt-8"
                >
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-gray-100 relative overflow-hidden">
                    {/* Number badge */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                      <span className="font-fredoka text-white text-2xl">3</span>
                    </div>
                    
                    {/* Decorative blob */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                    
                    <div className="relative pt-6">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-md mx-auto transform -rotate-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <h3 className="font-poetsen text-3xl text-primary mb-3 text-center">
                        Community Driven
                      </h3>
                      <p className="font-poppins text-base text-gray-700 text-center leading-relaxed">
                        Together with volunteers, we create lasting change. Our strength lies in unity and shared purpose.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Value 4 - Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative lg:mt-24"
                >
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-gray-100 relative overflow-hidden">
                    {/* Number badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                      <span className="font-fredoka text-white text-2xl">4</span>
                    </div>
                    
                    {/* Decorative blob */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                    
                    <div className="relative pt-6">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-md mx-auto transform rotate-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                      <h3 className="font-poetsen text-3xl text-primary mb-3 text-center">
                        Lifelong Care
                      </h3>
                      <p className="font-poppins text-base text-gray-700 text-center leading-relaxed">
                        We stay committed from rescue to recovery and beyond. Our responsibility doesn't end at rescue.
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

        {/* What Drives Us Section */}
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
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border-8 border-gray-100 relative overflow-hidden"
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="inline-block bg-white px-6 py-2 rounded-full mb-6 shadow-md">
                  <span className="font-fredoka text-primary text-lg">Our Purpose</span>
                </div>
                <h2 className="font-poetsen text-4xl md:text-5xl mb-8 leading-tight">
                  <span className="text-primary">What</span> <span className="text-gray-700">Drives</span> <span className="text-primary">Us</span>
                </h2>
                <p className="font-fredoka text-2xl md:text-3xl text-primary leading-relaxed mb-6">
                  At Rescue Routes, we are driven by one simple belief — every life matters.
                </p>
                <p className="font-poppins text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  We don't just rescue animals; we stand by them through recovery, care, and transformation. 
                  Our work is fueled by compassion and strengthened by community support.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact Stats Section - Redesigned */}
        <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
          
          <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-4">
                <span className="font-fredoka text-primary text-base">Our Impact</span>
              </div>
              <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                <span className="text-primary">Our Journey</span> <span className="text-gray-600">So Far</span>
              </h2>
            </motion.div>

            {/* Cute Pill-Shaped Stats Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-gradient-to-br from-primary to-orange-600 rounded-[40px] md:rounded-[60px] px-8 py-12 md:px-16 md:py-16 shadow-2xl"
            >
              
              {/* Decorative blobs inside */}
              <div className="absolute inset-0 overflow-hidden rounded-[40px] md:rounded-[60px] pointer-events-none">
                <div className="absolute top-0 right-[20%] w-32 h-32 md:w-48 md:h-48 bg-orange-400/30 rounded-full -translate-y-1/2" />
                <div className="absolute bottom-0 left-[25%] w-32 h-20 md:w-48 md:h-28 bg-orange-400/30 rounded-t-full" />
                <div className="absolute top-1/2 left-0 w-16 h-28 md:w-24 md:h-40 bg-orange-400/30 rounded-r-full -translate-y-1/2" />
              </div>

              {/* Stats Grid */}
              <div className="relative z-10 grid sm:grid-cols-3 gap-8 md:gap-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-white">
                      <div className="font-poetsen text-5xl md:text-6xl leading-tight mb-2">
                        {stat.number}
                      </div>
                      <div className="font-fredoka text-lg md:text-xl">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-10 pt-8 border-t-2 border-white/20 relative z-10"
              >
                <p className="font-fredoka text-xl md:text-2xl text-white text-center">
                  Behind every number is a life we were able to save. 💛
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border-4 border-gray-100 relative overflow-hidden"
            >
              {/* Decorative paw in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                  <circle cx="12" cy="16" r="3" />
                  <circle cx="8" cy="12" r="2" />
                  <circle cx="16" cy="12" r="2" />
                  <circle cx="10" cy="8" r="1.5" />
                  <circle cx="14" cy="8" r="1.5" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-6">
                  <span className="font-fredoka text-primary text-base">Join Us</span>
                </div>
                <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                  <span className="text-primary">Be a Part</span> <span className="text-gray-600">of the Change</span> 🐾
                </h2>
                <p className="font-fredoka text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Your support can help us rescue, treat, and protect animals in need.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/donate"
                    className="bg-primary hover:bg-orange-600 text-white font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="#volunteer"
                    className="bg-white hover:bg-gray-50 text-primary border-4 border-primary font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  >
                    Become a Volunteer
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
