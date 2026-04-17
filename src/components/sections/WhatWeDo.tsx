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
        {/* Header Area - Centered at Top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <span className="text-secondary font-fredoka font-medium tracking-[0.2em] uppercase text-sm">
            WHAT WE DO
          </span>
          <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-primary leading-tight mt-3 mb-4">
            We believe in a holistic approach to welfare.
          </h2>
          <p className="text-base text-dark/70 font-poppins leading-relaxed">
            From emergency response to long-term community health, we're committed to making a difference in every animal's life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="group relative bg-white p-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
              >
                {/* Cute Floating Heart Animation */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  whileHover={{ opacity: [0, 1, 0.8, 1, 0.5], scale: [0, 1.2, 1, 1.5, 0], y: -50 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 pointer-events-none text-primary"
                >
                  <Heart size={20} fill="currentColor" />
                </motion.div>

                <div className="flex flex-col gap-4 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <service.icon size={24} />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-poetsen font-bold text-primary group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-dark/60 text-sm font-poppins leading-relaxed group-hover:text-dark/80 transition-colors">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 group-hover:gap-3 transition-all">
                    <div className="w-8 h-8 rounded-full bg-secondary/5 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-xs font-bold text-secondary/40 group-hover:text-secondary uppercase tracking-widest transition-colors font-poppins">
                      Read Stories
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
