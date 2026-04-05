"use client";

import { motion } from "framer-motion";
import { Heart, Users, Calendar, Megaphone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function VolunteersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section - Clean & Centered (No Image) */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block bg-primary px-6 py-2 rounded-full mb-8 shadow-lg"
              >
                <span className="font-fredoka text-white text-sm">Compassion in Every Mile</span>
              </motion.div>
              
              <h1 className="font-poetsen text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">
                <span className="text-primary">Join Our Rescue</span><br />
                <span className="text-gray-600">Family</span>
              </h1>
              
              <p className="font-poppins text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                At Rescue Routes, every volunteer plays a vital role in saving lives, providing care, and spreading hope. 
                Whether you have a few hours or want to be deeply involved, your compassion makes all the difference.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Volunteer - Creative Flowing Layout */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                <span className="text-primary">Why </span>
                <span className="text-gray-600">Volunteer?</span>
              </h2>
            </motion.div>

            {/* Creative staggered layout with connecting elements */}
            <div className="relative max-w-5xl mx-auto">
              
              {/* Decorative connecting line */}
              <div className="hidden lg:block absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 20 20 Q 40 15, 50 25 T 80 30 Q 70 50, 60 60 T 30 80"
                    stroke="#F97316"
                    strokeWidth="0.3"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.2"
                  />
                </svg>
              </div>

              <div className="space-y-8">
                
                {/* Row 1 - Two items */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden"
                  >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
                    
                    <div className="relative z-10">
                      <h3 className="font-fredoka text-2xl mb-3">
                        <span className="text-primary">Make an</span> <span className="text-gray-600">Impact</span>
                      </h3>
                      <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                        Every action you take directly saves and improves lives. Your time and effort create real, lasting change.
                      </p>
                    </div>
                    
                    {/* Large paw background */}
                    <div className="absolute bottom-2 right-2 opacity-5">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                        <circle cx="12" cy="16" r="3" />
                        <circle cx="8" cy="12" r="2" />
                        <circle cx="16" cy="12" r="2" />
                        <circle cx="10" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden md:mt-12"
                  >
                    <div className="absolute top-0 left-0 w-20 h-20 bg-primary/5 rounded-br-full" />
                    
                    <div className="relative z-10">
                      <h3 className="font-fredoka text-2xl mb-3">
                        <span className="text-primary">Join a</span> <span className="text-gray-600">Community</span>
                      </h3>
                      <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                        Be part of a team of like-minded animal lovers who share your passion for making a difference.
                      </p>
                    </div>
                    
                    {/* Large paw background */}
                    <div className="absolute bottom-2 left-2 opacity-5">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                        <circle cx="12" cy="16" r="3" />
                        <circle cx="8" cy="12" r="2" />
                        <circle cx="16" cy="12" r="2" />
                        <circle cx="10" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Row 2 - Two items offset */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden md:ml-12"
                  >
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full" />
                    
                    <div className="relative z-10">
                      <h3 className="font-fredoka text-2xl mb-3">
                        <span className="text-primary">Gain</span> <span className="text-gray-600">Experience</span>
                      </h3>
                      <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                        Learn about animal care, rescue operations, and develop skills that last a lifetime.
                      </p>
                    </div>
                    
                    {/* Large paw background */}
                    <div className="absolute top-2 right-2 opacity-5">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                        <circle cx="12" cy="16" r="3" />
                        <circle cx="8" cy="12" r="2" />
                        <circle cx="16" cy="12" r="2" />
                        <circle cx="10" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden md:mr-12 md:mt-12"
                  >
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full" />
                    
                    <div className="relative z-10">
                      <h3 className="font-fredoka text-2xl mb-3">
                        <span className="text-primary">Feel the</span> <span className="text-gray-600">Love</span>
                      </h3>
                      <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                        Experience the joy and fulfillment of making a real difference in innocent lives.
                      </p>
                    </div>
                    
                    {/* Large paw background */}
                    <div className="absolute top-2 left-2 opacity-5">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
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
            </div>
          </div>
        </section>

        {/* Ways to Help - Horizontal Journey Flow */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                <span className="text-primary">Ways to </span>
                <span className="text-gray-600">Help</span>
              </h2>
            </motion.div>

            {/* Horizontal step flow */}
            <div className="space-y-12">
              
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-8"
              >
                <div className="flex-shrink-0 relative">
                  {/* Dog sitting on top */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">
                    🐕
                  </div>
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="font-poetsen text-3xl text-white">1</span>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 shadow-md">
                  <h3 className="font-fredoka text-2xl mb-3">
                    <span className="text-primary">Rescue</span> <span className="text-gray-600">Operations</span>
                  </h3>
                  <p className="font-poppins text-sm text-gray-700 leading-relaxed">
                    Join emergency rescue teams and help save animals in distress. Be the first responder when lives are at stake.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-8 flex-row-reverse"
              >
                <div className="flex-shrink-0 relative">
                  {/* Dog sitting on top */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">
                    🐕
                  </div>
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="font-poetsen text-3xl text-white">2</span>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 shadow-md">
                  <h3 className="font-fredoka text-2xl mb-3">
                    <span className="text-primary">Foster</span> <span className="text-gray-600">Care</span>
                  </h3>
                  <p className="font-poppins text-sm text-gray-700 leading-relaxed">
                    Provide temporary homes for rescued animals during their recovery and rehabilitation journey.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-8"
              >
                <div className="flex-shrink-0 relative">
                  {/* Dog sitting on top */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">
                    🐕
                  </div>
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="font-poetsen text-3xl text-white">3</span>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 shadow-md">
                  <h3 className="font-fredoka text-2xl mb-3">
                    <span className="text-primary">Event</span> <span className="text-gray-600">Support</span>
                  </h3>
                  <p className="font-poppins text-sm text-gray-700 leading-relaxed">
                    Help organize adoption drives, awareness campaigns, and fundraising events that bring communities together.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-8 flex-row-reverse"
              >
                <div className="flex-shrink-0 relative">
                  {/* Dog sitting on top */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">
                    🐕
                  </div>
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="font-poetsen text-3xl text-white">4</span>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 shadow-md">
                  <h3 className="font-fredoka text-2xl mb-3">
                    <span className="text-primary">Digital</span> <span className="text-gray-600">Advocacy</span>
                  </h3>
                  <p className="font-poppins text-sm text-gray-700 leading-relaxed">
                    Spread awareness online, create content, and help amplify our mission to reach more people.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Stats - Circular Design */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                <span className="text-primary">Our Volunteer</span> <span className="text-gray-600">Impact</span>
              </h2>
            </motion.div>

            {/* Three circular stat cards - Clean & Cute */}
            <div className="flex flex-wrap justify-center items-center gap-12">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="w-52 h-52 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-primary/20 relative"
              >
                {/* Decorative paw in background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <circle cx="12" cy="16" r="3" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <circle cx="10" cy="8" r="1.5" />
                    <circle cx="14" cy="8" r="1.5" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <div className="font-poetsen text-5xl text-primary mb-2">50+</div>
                  <div className="font-fredoka text-sm text-gray-600 px-4">Active Volunteers</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -8 }}
                className="w-52 h-52 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-primary/20 relative"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <circle cx="12" cy="16" r="3" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <circle cx="10" cy="8" r="1.5" />
                    <circle cx="14" cy="8" r="1.5" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <div className="font-poetsen text-5xl text-primary mb-2">100+</div>
                  <div className="font-fredoka text-sm text-gray-600 px-4">Lives Saved</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8 }}
                className="w-52 h-52 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-primary/20 relative"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <circle cx="12" cy="16" r="3" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <circle cx="10" cy="8" r="1.5" />
                    <circle cx="14" cy="8" r="1.5" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <div className="font-poetsen text-5xl text-primary mb-2">∞</div>
                  <div className="font-fredoka text-sm text-gray-600 px-4">Endless Impact</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ready to Help - CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Left - CTA Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-12 shadow-lg text-center md:text-left"
              >
                <h2 className="font-poetsen text-3xl md:text-4xl mb-6">
                  <span className="text-primary">Ready to </span>
                  <span className="text-gray-600">Help?</span>
                </h2>
                
                <p className="font-poppins text-lg text-gray-700 leading-relaxed mb-8">
                  Join our volunteer community and start making a difference today. Sign up to get started on your journey of compassion.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="bg-primary hover:bg-orange-600 text-white font-fredoka text-base py-3 px-8 rounded-full transition-all shadow-lg text-center hover:scale-105"
                  >
                    Sign Up Now
                  </Link>
                  <Link
                    href="/login"
                    className="bg-white hover:bg-gray-50 text-primary border-3 border-primary font-fredoka text-base py-3 px-8 rounded-full transition-all shadow-lg text-center hover:scale-105"
                  >
                    Login
                  </Link>
                </div>
              </motion.div>

              {/* Right - Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Info card 1 */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="font-fredoka text-xl mb-3">
                    <span className="text-primary">Who Can</span> <span className="text-gray-600">Join?</span>
                  </h3>
                  <p className="font-poppins text-sm text-gray-700 leading-relaxed">
                    Anyone with compassion and willingness to help. No prior experience needed — just bring your heart and dedication.
                  </p>
                </div>

                {/* Info card 2 */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="font-fredoka text-xl mb-3">
                    <span className="text-primary">Need Quick</span> <span className="text-gray-600">Answers?</span>
                  </h3>
                  <p className="font-poppins text-sm text-gray-700 leading-relaxed mb-4">
                    Have questions about volunteering? We're here to help you get started.
                  </p>
                  
                  <Link
                    href="#contact"
                    className="inline-block bg-primary hover:bg-orange-600 text-white font-fredoka text-sm py-3 px-6 rounded-xl transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
