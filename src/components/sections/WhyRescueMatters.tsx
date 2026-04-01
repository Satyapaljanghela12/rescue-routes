"use client";

import { motion } from "framer-motion";
import { PawPrint, Bone, Heart, Sparkles, Home } from "lucide-react";
import Image from "next/image";

export default function WhyRescueMatters() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Creative Background Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-[10%] text-orange-200 pointer-events-none"
      >
        <Heart size={80} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-[15%] text-teal-200 pointer-events-none"
      >
        <PawPrint size={100} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/2 right-[5%] text-yellow-200 opacity-20 pointer-events-none"
      >
        <Sparkles size={60} />
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 mt-4 relative z-10">
        
        {/* Title Area */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex items-center justify-center gap-3">
          <PawPrint className="w-10 h-10 md:w-12 md:h-12 text-[#f97316] mb-2 -rotate-12" strokeWidth={3} />
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-fredoka font-medium tracking-wide">
            <span className="text-[#f97316]">Why Animal Rescue</span> <span className="text-gray-700">Matters</span>
          </h2>
        </div>

        {/* 2x2 Grid Container with Absolute Central Badge */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            
            {/* Card 1: Pink */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.02, rotate: -1, zIndex: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#FF6B8B] text-white p-8 md:p-14 rounded-[40px] border-[1.5px] border-gray-800 shadow-xl relative overflow-hidden group cursor-pointer min-h-[280px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 animate-pulse" fill="white" />
                <h3 className="text-2xl font-fredoka font-semibold relative z-10">
                  Every Life Deserves a Chance
                </h3>
              </div>
              <p className="text-white/95 font-medium leading-relaxed pr-8 relative z-10">
                Stray animals are often hit by vehicles and left injured on the street without immediate help and medical care. Our rapid response team is their only hope.
              </p>
            </motion.div>

            {/* Card 2: Yellow */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.02, rotate: 1, zIndex: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F1B929] text-white p-8 md:p-14 rounded-[40px] shadow-xl relative overflow-hidden group cursor-pointer min-h-[280px]"
            >
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center gap-2 mb-4">
                <PawPrint className="w-6 h-6" fill="white" />
                <h3 className="text-2xl font-fredoka font-semibold leading-tight relative z-10">
                  Controlling<br/>Overpopulation
                </h3>
              </div>
              <p className="text-white/95 font-medium leading-relaxed mb-4 pl-[1px] relative z-10">
                Systematic sterilization drives to humanely manage street animal populations and prevent future suffering.
              </p>
            </motion.div>

            {/* Card 3: White / Orange */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.02, rotate: 1, zIndex: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white text-[#F38C3B] p-8 md:p-14 rounded-[40px] border-2 border-[#F38C3B] shadow-xl relative overflow-hidden group cursor-pointer min-h-[280px]"
            >
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-6 h-6" />
                <h3 className="text-2xl font-fredoka font-semibold relative z-10">
                  Abandonment
                </h3>
              </div>
              <p className="text-[#F38C3B] font-medium leading-relaxed pr-10 relative z-10">
                Giving shelter and emotional healing to pets left behind by their owners. We provide the love they lost.
              </p>
            </motion.div>

            {/* Card 4: Teal */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.02, rotate: -1, zIndex: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#3FA09A] text-white p-8 md:p-14 rounded-[40px] shadow-xl relative overflow-hidden group cursor-pointer min-h-[280px]"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center gap-2 mb-4">
                <Bone className="w-6 h-6" fill="white" />
                <h3 className="text-2xl font-fredoka font-semibold relative z-10">
                  Starvation
                </h3>
              </div>
              <p className="text-white/95 font-medium leading-relaxed pl-6 relative z-10">
                Nutritional rehabilitation programs for severely malnourished rescues who have spent weeks without a stable source of food.
              </p>
            </motion.div>
          </div>

          {/* Central 'Stay Pawsitive' Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5
            }}
            className="absolute top-1/2 left-1/2 z-40 hidden md:flex flex-col items-center justify-center w-48 h-48 bg-white rounded-full shadow-2xl border-4 border-white"
          >
            <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[#f97316] animate-[spin_10s_linear_infinity]" />
            <span className="font-briem text-2xl font-bold tracking-wide mt-2 text-gray-800">Stay</span>
            <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-orange-100 mb-1">
               <Image 
                src="/dog2.png" 
                alt="Pawsitive Dog" 
                fill 
                className="object-cover" 
              />
            </div>
            <span className="font-briem text-2xl font-bold tracking-wide text-[#f97316]">Pawsitive</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
