"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronLeft, ChevronRight, Heart, Sparkles, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Community Mega Adoption Drive",
    date: "April 15, 2026",
    location: "City Central Park",
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80",
    desc: "Join us to find your new furry best friend. Over 50 rescued dogs and cats are looking for their forever homes.",
  },
  {
    id: 2,
    title: "Free Vaccination Camp",
    date: "May 02, 2026",
    location: "Rescue Routes Shelter",
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=600&q=80",
    desc: "Protecting our community pets and strays. We are offering free anti-rabies and multi-vaccines.",
  },
  {
    id: 3,
    title: "Volunteer Training & Orientation",
    date: "May 20, 2026",
    location: "Community Center",
    image: "https://images.unsplash.com/photo-1553322378-eb94e5966b0c?auto=format&fit=crop&w=600&q=80",
    desc: "Want to learn how to handle rescues safely? Join our expert-led volunteer orientation session.",
  },
  {
    id: 4,
    title: "Paws & Paint Workshop",
    date: "June 10, 2026",
    location: "Art Studio Downtown",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    desc: "A creative afternoon where you and your pet can create art together! All proceeds go to our rescue fund.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.15,
      type: "spring" as any,
      stiffness: 260,
      damping: 20,
    },
  }),
};

export default function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
        <Sparkles size={120} className="text-primary" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary py-2 px-4 rounded-full font-fredoka font-bold text-sm uppercase tracking-wider mb-4">
              <Calendar size={16} />
              Don't Miss Out
            </div>
            <h2 className="text-5xl md:text-7xl font-briem font-bold leading-tight">
              <span className="text-gray-500">Our Upcoming</span>{" "}
              <span className="text-primary">Events</span>
            </h2>
            <p className="text-dark/60 text-lg font-fredoka max-w-md mt-4">
              Join our community and help us make a difference—one paw at a time! 🐾
            </p>
          </motion.div>

          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronLeft size={28} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronRight size={28} />
            </motion.button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="min-w-[320px] md:min-w-[400px] snap-center"
            >
              <motion.div
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="bg-white rounded-[3rem] overflow-hidden border-2 border-gray-100 hover:border-primary shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] group h-full flex flex-col transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-primary shadow-xl"
                    >
                      <Heart size={24} fill="currentColor" />
                    </motion.div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-primary text-white font-fredoka font-bold text-xs py-1.5 px-4 rounded-full flex items-center gap-2">
                      <Calendar size={14} />
                      {event.date}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-fredoka font-bold text-primary group-hover:text-secondary transition-colors mb-4 leading-tight">
                    {event.title}
                  </h3>
                  
                  <p className="text-dark/60 font-fredoka text-base mb-8 line-clamp-3">
                    {event.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-primary/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-fredoka font-bold text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin size={16} />
                      </div>
                      {event.location}
                    </div>
                    
                    <motion.div 
                      whileHover={{ x: 5, color: "#F97316" }}
                      whileTap={{ scale: 0.95 }}
                      className="group/btn flex items-center gap-2 text-secondary font-fredoka font-bold text-sm cursor-pointer"
                    >
                      <span className="border-b-2 border-secondary/20 group-hover/btn:border-primary/40 transition-colors">
                        Join Event
                      </span>
                      <motion.div
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-primary"
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
