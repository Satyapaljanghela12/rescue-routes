"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 xl:px-16 relative z-20">
        
        {/* Main Orange Pill Container */}
        <div className="relative bg-[#FA872B] rounded-[40px] md:rounded-[70px] px-8 py-16 md:px-20 md:py-16 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 shadow-xl mb-12">
          
          {/* Background Blobs inside pill (strictly contained using overflow-hidden on a pseudo-layer) */}
          <div className="absolute inset-0 overflow-hidden rounded-[40px] md:rounded-[70px] pointer-events-none">
            {/* Soft decorative shapes inside the pill */}
            <div className="absolute top-0 right-[20%] w-32 h-32 md:w-48 md:h-48 bg-[#FB9C4E] rounded-full -translate-y-1/2 opacity-90" />
            <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 bg-[#FB9C4E] rounded-tl-[100px] opacity-90" />
            <div className="absolute bottom-0 left-[25%] w-32 h-20 md:w-48 md:h-28 bg-[#FB9C4E] rounded-t-full opacity-90" />
            <div className="absolute top-1/2 left-0 w-16 h-28 md:w-24 md:h-40 bg-[#FB9C4E] rounded-r-full -translate-y-1/2 opacity-90" />
          </div>

          {/* Stat 1 */}
          <div className="relative z-10 flex flex-col items-center justify-center -space-y-1 text-white md:ml-12 lg:ml-24">
             <div className="text-[44px] md:text-[56px] font-fredoka leading-tight tracking-wide">3400+</div>
             <div className="text-xl md:text-[26px] font-fredoka">Beds Created</div>
          </div>

          {/* Stat 2 */}
          <div className="relative z-10 flex flex-col items-center justify-center -space-y-1 text-white">
             <div className="text-[44px] md:text-[56px] font-fredoka leading-tight tracking-wide">800+</div>
             <div className="text-xl md:text-[26px] font-fredoka">Animals Rescued</div>
          </div>

          {/* Stat 3 */}
          <div className="relative z-10 flex flex-col items-center justify-center -space-y-1 text-white md:mr-4 lg:mr-16">
             <div className="text-[44px] md:text-[56px] font-fredoka leading-tight tracking-wide">100+</div>
             <div className="text-xl md:text-[26px] font-fredoka">Water Pots</div>
          </div>

          {/* Floating Dog 1 (Left Image on Yellow Circle) */}
          <motion.div 
            initial={{ y: "-50%", x: "-50%" }}
            whileInView={{ y: ["-50%", "-55%", "-50%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-1/2 w-36 h-36 md:w-[220px] md:h-[220px] rounded-full overflow-hidden flex items-center justify-center z-30 drop-shadow-lg"
          >
            <div className="relative w-full h-full">
              {/* Assuming the image already has the yellow background baked in, if not it will render transparently. */}
              <Image 
                src="/assets/images/animals/dog2.png" 
                alt="Rescued Puppy" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>

          {/* Floating Dog 2 (Bottom Middle-Right Image) */}
          <motion.div 
            initial={{ y: "50%", x: "50%" }}
            whileInView={{ y: ["50%", "45%", "50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-[25%] lg:right-[28%] w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden drop-shadow-xl z-30"
          >
            <div className="relative w-full h-full">
              <Image 
                src="/assets/images/animals/dog1.png" 
                alt="Two dogs playing" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
