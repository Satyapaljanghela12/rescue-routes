"use client";

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#F9FAFB] relative overflow-hidden">
      {/* Decorative BG Paw Prints */}
      <PawPrint className="absolute -top-10 -left-10 text-orange-500/[0.03] w-96 h-96 -rotate-12" />
      <PawPrint className="absolute bottom-0 -right-20 text-orange-500/[0.03] w-[500px] h-[500px] rotate-45" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 leading-tight">
              <img src="/assets/images/brand/hindi.png" alt="Compassion towards all living beings" />
            </h2>
            <h3 className="text-3xl md:text-5xl lg:text-5xl font-briem font-bold mt-4">
              <span className="text-primary">Compassion</span> <span className="text-gray-500">towards all living beings</span>
            </h3>
          </motion.div>

         

          <div className="w-full flex flex-col gap-8 max-w-3xl mx-auto mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-[32px] p-8 md:p-12 shadow-lg shadow-gray-200/50 relative border-2 border-transparent hover:border-orange-100 transition-colors"
            >
              <PawPrint className="absolute -top-4 -left-4 w-12 h-12 text-orange-200 rotate-[-15deg] opacity-70" />
              <h4 className="text-2xl md:text-3xl font-heading font-bold mb-4 tracking-tight">
                <span className="text-primary">Our Mission of Care</span>
              </h4>
              <p className="text-xl md:text-2xl font-fredoka text-gray-600 leading-relaxed font-normal">
                Rescue Routes saves injured and abandoned animals by providing medical care, shelter, and rehabilitation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-[32px] p-8 md:p-12 shadow-lg shadow-gray-200/50 relative border-2 border-transparent hover:border-orange-100 transition-colors"
            >
              <PawPrint className="absolute -bottom-4 -right-4 w-12 h-12 text-orange-200 rotate-[15deg] opacity-70" />
              <h4 className="text-2xl md:text-3xl font-heading font-bold mb-4 tracking-tight">
                <span className="text-primary">A Community That Cares</span>
              </h4>
              <p className="text-xl md:text-2xl font-fredoka text-gray-600 leading-relaxed font-normal">
                Through adoption drives, awareness, and volunteer support, we are building a compassionate ecosystem where every life truly matters.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
