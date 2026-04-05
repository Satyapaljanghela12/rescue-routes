"use client";

import { motion } from "framer-motion";

const organizations = [
  "World Animal Protection",
  "PETA India",
  "Blue Cross of India",
  "Animal Aid Unlimited",
  "Wildlife SOS",
  "Humane Society International",
  "SPCA India",
  "Friendicoes",
  "Red Paws Rescue",
  "Visakha SPCA",
  "Karuna Society for Animals",
  "Animal Rahat",
];

export default function OrganizationsCarousel() {
  // Duplicate the array for seamless infinite scroll
  const duplicatedOrgs = [...organizations, ...organizations];

  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center font-poppins text-sm text-gray-500 uppercase tracking-wider">
          Associated Organizations & Partners
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        {/* Scrolling container */}
        <motion.div
          className="flex gap-12"
          animate={{
            x: [0, -50 * organizations.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedOrgs.map((org, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <span className="font-fredoka text-lg font-normal text-gray-400 whitespace-nowrap">
                {org}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
