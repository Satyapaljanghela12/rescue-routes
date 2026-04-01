"use client";

import { motion } from "framer-motion";
import { Ambulance, HeartHandshake, ShieldCheck, Stethoscope, PawPrint, Heart, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Emergency Rescue",
    desc: "We’re on the ground for street animals in distress, providing immediate first aid and survival care.",
    icon: Ambulance,
  },
  {
    title: "Healing & Homes",
    desc: "A safe, temporary haven for recovery, preparing every animal for their loving forever family.",
    icon: HeartHandshake,
  },
  {
    title: "Population Control",
    desc: "Humane sterilization programs to ensure fewer animals are born into hardship on the streets.",
    icon: Stethoscope,
  },
  {
    title: "Health & Safety",
    desc: "Free rabies shots and vaccinations because every life deserves protection and health.",
    icon: ShieldCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "circOut" as any }
  },
};

export default function WhatWeDo() {
  return (
    <section className="relative py-24 bg-[#F1F5F9] overflow-hidden">
      {/* Creative Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3" />

      {/* Decorative Paw Print Path */}
      <div className="absolute top-10 left-10 opacity-10 rotate-[-15deg] pointer-events-none">
        <PawPrint size={140} className="text-secondary" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-10 rotate-[20deg] pointer-events-none">
        <PawPrint size={180} className="text-primary" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Header Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 sticky top-24"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-secondary font-fredoka font-medium tracking-[0.2em] uppercase text-sm border-l-4 border-primary pl-4">
                  Our Impact
                </span>
                <h2 className="text-6xl md:text-7xl font-briem font-bold text-primary leading-[0.9]">
                  What We Do
                </h2>
                <p className="text-lg text-dark/70 font-fredoka max-w-sm leading-relaxed mt-4">
                  We believe in a <span className="text-secondary font-semibold italic">holistic approach</span> to welfare. From emergency response to long-term community health.
                </p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-between bg-primary text-white font-fredoka font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/20 transition-all w-max gap-4"
              >
                <span>Explore Our Programs</span>
                <div className="bg-white/20 p-2 rounded-full transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </div>
              </motion.button>

              <div className="flex items-center gap-2 text-primary/40 font-fredoka text-xs animate-pulse">
                <Heart size={14} fill="currentColor" />
                <span>Join our mission today</span>
              </div>
            </div>
          </motion.div>

          {/* Staggered Services Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{ 
                  marginTop: index % 2 !== 0 ? "2rem" : "0", 
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="group relative bg-white p-8 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
              >
                {/* Cute Floating Heart Animation */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  whileHover={{ opacity: [0, 1, 0.8, 1, 0.5], scale: [0, 1.2, 1, 1.5, 0], y: -50 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 pointer-events-none text-primary"
                >
                  <Heart size={24} fill="currentColor" />
                </motion.div>

                <div className="flex flex-col gap-6 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <service.icon size={32} />
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-fredoka font-bold text-primary group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-dark/60 text-sm font-fredoka leading-relaxed group-hover:text-dark/80 transition-colors">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-2 group-hover:gap-4 transition-all">
                    <div className="w-10 h-10 rounded-full bg-secondary/5 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </div>
                    <span className="text-xs font-bold text-secondary/40 group-hover:text-secondary uppercase tracking-widest transition-colors font-fredoka">
                      Read Stories
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
