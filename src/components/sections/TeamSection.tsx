"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PawPrint, Globe, Mail, Link, Heart } from "lucide-react";

const team = [
  {
    name: "Sneha Saxena",
    role: "Founder & Director",
    bio: "With over 12 years of experience in animal rescue, Sneha founded Rescue Routes to create a safe path for every stray. Her mission is to build a world where every paw has a home.",
    image: "/sneha2.png",
    color: "bg-primary/10",
  },
];

export default function TeamSection() {
  return (
    <section className="relative py-28 bg-[#F1F5F9] overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-20 left-10 opacity-5 pointer-events-none rotate-45">
        <PawPrint size={150} className="text-primary" />
      </div>
      <div className="absolute bottom-10 right-0 opacity-5 pointer-events-none -rotate-12">
        <PawPrint size={200} className="text-secondary" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-primary font-fredoka font-bold text-sm uppercase tracking-[0.2em] bg-white py-2 px-6 rounded-full shadow-sm border border-primary/5">
              Meet the Hearts
            </span>
            <h2 className="text-5xl md:text-6xl font-fredoka font-bold text-primary leading-tight">
              Our Founding Team
            </h2>
          </motion.div>
        </div>

        <div className="flex justify-center max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
              className="group relative"
            >
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
                
                {/* Image Container */}
                <div className="relative w-full aspect-square max-w-[340px]">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    className="absolute inset-0 rounded-[3rem] bg-primary/10 transform rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-500"
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-xl border-4 border-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Cute Hover Socials */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500">
                    <motion.button whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-lg"><Globe size={18} /></motion.button>
                    <motion.button whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl bg-white text-secondary flex items-center justify-center shadow-lg"><Link size={18} /></motion.button>
                    <motion.button whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-lg"><Mail size={18} /></motion.button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-4 max-w-md px-4">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-briem font-bold text-primary group-hover:text-secondary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-secondary font-fredoka font-bold text-xs uppercase tracking-[0.2em]">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-dark/70 font-fredoka text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="inline-flex items-center gap-2 text-primary font-fredoka font-bold text-sm cursor-pointer border-b-2 border-primary/20 hover:border-primary pb-1 transition-all transition-colors"
                  >
                    <span>Our Journey</span>
                    <Heart size={16} fill="currentColor" className="text-secondary" />
                  </motion.div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
