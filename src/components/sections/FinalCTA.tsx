"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, PawPrint, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Paws */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <PawPrint size={100} className="absolute top-10 left-[10%] rotate-12" />
        <PawPrint size={80} className="absolute bottom-20 left-[20%] -rotate-12" />
        <PawPrint size={120} className="absolute top-40 right-[15%] rotate-45" />
        <PawPrint size={90} className="absolute bottom-10 right-[5%] -rotate-6" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-briem font-bold leading-tight mb-8">
            <span className="text-dark/40 block md:inline font-fredoka uppercase text-2xl md:text-3xl tracking-[0.2em] mb-4 md:mb-0">
              Every paw deserves
            </span>{" "}
            <span className="text-primary block mt-2">a happy ending.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-dark/60 font-fredoka mb-14 max-w-2xl mx-auto leading-relaxed">
            Your love and support are the building blocks of their forever homes. Join our mission today! 🐾
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#donate"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white font-fredoka font-bold py-5 px-12 rounded-full text-xl shadow-[0_15px_30px_rgba(249,115,22,0.3)] hover:bg-secondary transition-all"
              >
                <span>Donate Now</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#volunteer"
                className="group inline-flex items-center justify-center gap-3 bg-white text-dark border-2 border-dark/10 font-fredoka font-bold py-5 px-12 rounded-full text-xl transition-all hover:bg-dark/5"
              >
                <span>Become a volunteer</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform text-primary" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
