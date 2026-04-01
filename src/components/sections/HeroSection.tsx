"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, PawPrint } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-primary py-1.5 px-4 rounded-full font-medium text-sm">
              <PawPrint size={16} />
              🐾 ANIMAL RESCUE FOUNDATION
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[96px] lg:leading-[90px] font-poetsen text-[#4A5568] tracking-normal mt-2 lg:mt-4">
              Saving Lives
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                One Rescue
              </span>
              <br />
              at a Time.
            </h1>
            
            <p className="font-heading text-lg text-light max-w-lg leading-relaxed mt-4 text-balance">
              Rescue Routes rescues injured and abandoned animals, providing care, shelter, and love. Join our mission to create a compassionate world for all.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
              <Link
                href="#volunteer"
                className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 hover:bg-secondary shadow-md hover:shadow-lg"
              >
                Become a Volunteer
              </Link>
              <Link
                href="#donate"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 hover:bg-orange-50"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>

          {/* Right Content / Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg xl:max-w-xl aspect-square mx-auto">
              <Image
                src="/Pet adoption Post 1.png"
                alt="Pet Adoption"
                fill
                className="object-contain"
                priority
              />
              
              {/* Floating Custom Paw Print */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-4 md:top-12 md:right-12 xl:right-16 w-16 h-16 md:w-28 md:h-28 z-10"
              >
                <Image
                  src="/Lion_King_-_orange_paw_print-removebg-preview 9.png"
                  alt="Orange Paw Print Decoration"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
