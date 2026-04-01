"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const stories = [
  {
    name: "Shampoo",
    subtitle: "A Second Chance",
    description: "Rescued with a fractured jaw and unable to eat, Shampoo was in critical condition when we found him. After emergency surgery and weeks of careful nursing, he made a full recovery. Today, he's healthy, playful, and living his best life. His journey reminds us that every animal deserves a chance to heal and thrive.",
    image: "/story1.jpg",
  },
  {
    name: "Mithi",
    subtitle: "Strength Beyond Loss",
    description: "Mithi lost a limb in a tragic accident, but her spirit remained unbroken. With proper medical care and rehabilitation, she adapted beautifully to her new life. She now runs, plays, and enjoys every moment with incredible resilience. Mithi's story is a testament to the strength and courage animals possess when given love and support.",
    image: "/story2.jpg",
  },
  {
    name: "Ladoo",
    subtitle: "Fighting Cancer",
    description: "When Ladoo was diagnosed with a tumor, we knew time was critical. Through multiple medical sessions, chemotherapy, and constant care, he fought bravely. Today, Ladoo is cancer-free and full of energy. His recovery shows that with timely intervention and dedication, even the toughest battles can be won.",
    image: "/story3.jpg",
  },
  {
    name: "Milky",
    subtitle: "Life Renewed",
    description: "Milky suffered from a large tumor that affected her quality of life. After a successful surgery and months of recovery care, she was given a second chance. Now she's active, healthy, and enjoying life to the fullest. Milky's transformation is a beautiful reminder of what compassionate care can achieve.",
    image: "/story4.jpg",
  },
  {
    name: "Damru",
    subtitle: "Recovery from Critical Condition",
    description: "Damru was rescued with severe swelling and breathing difficulties that put his life at risk. Emergency treatment and round-the-clock monitoring helped stabilize him. After weeks of intensive care, he made a remarkable recovery. Damru's story highlights the importance of immediate action in saving lives.",
    image: "/story5.jpg",
  },
  {
    name: "Sambhar",
    subtitle: "Saving a Vision",
    description: "Sambhar suffered a serious eye injury that threatened his sight. Thanks to early medical intervention and specialized treatment, his vision was saved. He can now see the world clearly and live without pain. Sambhar's recovery shows how crucial timely care is in preventing permanent damage.",
    image: "/story6.jpg",
  },
  {
    name: "Kismis",
    subtitle: "Surgery Success",
    description: "Kismis was diagnosed with a hernia that caused him constant discomfort. After a successful surgery and proper post-operative care, he recovered completely. Now he's pain-free and back to his playful self. Kismis's journey proves that even complex medical conditions can be treated with the right resources.",
    image: "/story7.jpg",
  },
  {
    name: "Sona",
    subtitle: "From Pain to Healing",
    description: "Sona was found with severe wound infections that were spreading rapidly. Immediate medical attention, antibiotics, and daily wound care saved her life. After months of treatment, she made a full recovery. Sona's transformation from suffering to healing is a powerful example of what rescue work can accomplish.",
    image: "/story8.jpg",
  },
];

export default function StoriesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="font-fredoka text-primary text-sm">Real Stories</span>
              </div>
              <h1 className="font-poetsen text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                <span className="text-primary">Stories of Hope</span> <span className="text-gray-600">& Recovery</span>
              </h1>
              <p className="font-fredoka text-2xl md:text-3xl mb-6 leading-snug">
                <span className="text-primary">Every rescue has a story</span> <span className="text-gray-600">— from pain to healing</span> 🐾
              </p>
              <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Behind every rescue is a life that was once struggling to survive. These stories reflect 
                courage, care, and the power of compassion.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stories Flow - Creative Storytelling Layout */}
        <section className="py-16 md:py-24 bg-gray-50 relative">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            {/* Section intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-poetsen text-3xl md:text-4xl mb-3">
                <span className="text-primary">Tales of</span> <span className="text-gray-600">Transformation</span>
              </h2>
              <p className="font-fredoka text-lg text-gray-600">
                Each journey from rescue to recovery
              </p>
            </motion.div>

            {/* Stories in creative layout */}
            <div className="space-y-24">
              {stories.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Alternating layout with creative positioning */}
                  <div className={`grid lg:grid-cols-12 gap-8 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Image Side - More creative */}
                    <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        {/* Main image */}
                        <div className="relative h-96 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                          <Image
                            src={story.image}
                            alt={story.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Cute badge with story number */}
                        <div className={`absolute ${index % 2 === 0 ? '-bottom-6 -right-6' : '-bottom-6 -left-6'} bg-gradient-to-br from-primary to-orange-600 rounded-3xl px-6 py-4 shadow-2xl transform ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'}`}>
                          <div className="text-center">
                            <div className="font-fredoka text-white text-sm">Story</div>
                            <div className="font-poetsen text-white text-3xl leading-none">#{index + 1}</div>
                          </div>
                        </div>

                        {/* Floating paws */}
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className={`absolute ${index % 2 === 0 ? '-top-4 -left-4' : '-top-4 -right-4'}`}
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                              <circle cx="12" cy="16" r="3" />
                              <circle cx="8" cy="12" r="2" />
                              <circle cx="16" cy="12" r="2" />
                              <circle cx="10" cy="8" r="1.5" />
                              <circle cx="14" cy="8" r="1.5" />
                            </svg>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content Side - More playful */}
                    <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div className="relative">
                        {/* Decorative blob behind */}
                        <div className={`absolute -inset-8 bg-primary/5 rounded-[4rem] blur-3xl ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}`} />
                        
                        <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl">
                          {/* Story name with cute styling */}
                          <div className="mb-6">
                            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-3">
                              <span className="font-fredoka text-primary text-sm">🐾 Rescued & Loved</span>
                            </div>
                            <h3 className="font-poetsen text-4xl md:text-5xl mb-2">
                              <span className="text-primary">{story.name}</span>
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-16 bg-primary rounded-full" />
                              <p className="font-fredoka text-xl text-gray-600">
                                {story.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                            {story.description}
                          </p>

                          {/* Decorative paw trail */}
                          <div className="absolute bottom-4 right-4 flex gap-2 opacity-10">
                            {[...Array(3)].map((_, i) => (
                              <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary" style={{ transform: `scale(${1 - i * 0.2})` }}>
                                <circle cx="12" cy="16" r="3" />
                                <circle cx="8" cy="12" r="2" />
                                <circle cx="16" cy="12" r="2" />
                                <circle cx="10" cy="8" r="1.5" />
                                <circle cx="14" cy="8" r="1.5" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Cute connecting element */}
                  {index < stories.length - 1 && (
                    <div className="flex justify-center my-12">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Emotional Impact */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Decorative paw prints background */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(8)].map((_, i) => (
              <svg
                key={i}
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-primary absolute"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                <circle cx="12" cy="16" r="3" />
                <circle cx="8" cy="12" r="2" />
                <circle cx="16" cy="12" r="2" />
                <circle cx="10" cy="8" r="1.5" />
                <circle cx="14" cy="8" r="1.5" />
              </svg>
            ))}
          </div>
          
          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border-4 border-gray-100"
            >
              <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-6">
                <span className="font-fredoka text-primary text-lg">Our Impact</span>
              </div>
              
              <h2 className="font-poetsen text-4xl md:text-5xl mb-8">
                <span className="text-primary">Every Story</span> <span className="text-gray-600">Matters</span> 💛
              </h2>
              
              <p className="font-poppins text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Each rescue is more than saving an animal — it's restoring hope, healing pain, 
                and giving life another chance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border-4 border-gray-100 relative overflow-hidden"
            >
              {/* Decorative heart */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                <Heart className="w-64 h-64 text-primary" fill="currentColor" />
              </div>

              <div className="relative z-10">
                <h2 className="font-poetsen text-4xl md:text-5xl mb-4">
                  <span className="text-primary">Be Part of More Stories</span> <span className="text-gray-600">Like These</span> 🐾
                </h2>
                <p className="font-fredoka text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Your support helps us rescue, treat, and protect animals in need.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="#donate"
                    className="bg-primary hover:bg-orange-600 text-white font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="#volunteer"
                    className="bg-white hover:bg-gray-50 text-primary border-4 border-primary font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  >
                    Become a Volunteer
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
